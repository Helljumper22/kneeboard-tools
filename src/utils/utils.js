class Utils {
    constructor() { }

    importData() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';

            input.onchange = (event) => {
                const file = event.target.files[0];
                if (!file) return reject(new Error('No file selected'));

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        resolve(data); // Resolve the promise with the parsed JSON data
                    } catch (err) {
                        reject(new Error('Invalid JSON file'));
                    }
                };
                reader.readAsText(file);
            };

            input.click();
        });
    }

    importMiz() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.miz';

            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (!file) return reject(new Error('No file selected'));

                const zip = await JSZip.loadAsync(file);

                if (zip.file('mission')) {
                    resolve(await zip.file('mission').async('string'));
                } else {
                    console.log('No "mission" file found in miz');
                }
            };

            input.click();
        });
    }

    exportData(data, fileName) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = `${fileName}.json`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    }

    downloadMap(canvas, fileName) {
        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    getFarthestAngle(angleToPrev, angleToNext) {
        // Normalize angles to the range [-π, π]
        angleToPrev = ((angleToPrev + Math.PI) % (2 * Math.PI)) - Math.PI;
        angleToNext = ((angleToNext + Math.PI) % (2 * Math.PI)) - Math.PI;

        // Calculate the midpoint angle between the previous and next points
        let midpointAngle = (angleToPrev + angleToNext) / 2;

        // If the angles are on opposite sides of the circle, adjust the midpoint
        if (Math.abs(angleToNext - angleToPrev) > Math.PI) {
            midpointAngle += Math.PI;
        }

        // Normalize the midpoint angle to the range [-π, π]
        midpointAngle = ((midpointAngle + Math.PI) % (2 * Math.PI)) - Math.PI;

        // Add 180 degrees (π radians) to find the farthest angle
        const farthestAngle = midpointAngle + Math.PI;

        // Normalize the farthest angle to the range [-π, π]
        return ((farthestAngle + Math.PI) % (2 * Math.PI)) - Math.PI;
    }

    getClosestDivisorTo90(number) {
        const divisors = [1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90];
        let closest = divisors[0];
        let minDiff = Math.abs(number - closest);

        for (const d of divisors) {
            const diff = Math.abs(number - d);
            if (diff < minDiff) {
                closest = d;
                minDiff = diff;
            }
        }

        return closest;
    }

    getIntersectionWithLine(line, segment) {
        const { x: x1, y: y1, angle } = line;
        const { start, end } = segment;

        const x2 = x1 + Math.cos(angle); // Extend the bullseye line infinitely
        const y2 = y1 + Math.sin(angle);

        const x3 = start.x;
        const y3 = start.y;
        const x4 = end.x;
        const y4 = end.y;

        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denom === 0) return null; // Lines are parallel, no intersection

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

        if (t >= 0 && u >= 0 && u <= 1) {
            // Intersection point is within the segment
            const intersectionX = x1 + t * (x2 - x1);
            const intersectionY = y1 + t * (y2 - y1);
            const intersectionAzimuth = Math.atan2(intersectionX, intersectionY);
            const intersectionDistance = Math.sqrt(intersectionX * intersectionX + intersectionY * intersectionY);

            return { x: intersectionX, y: intersectionY, azimuth: intersectionAzimuth < 0 ? intersectionAzimuth + (Math.PI * 2) : intersectionAzimuth, distance: intersectionDistance };
        }

        return null; // No valid intersection
    }

    getCenter(points) {
        if (points.length === 0) {
            return { x: 0, y: 0 };
        }

        if (points.length === 1) {
            return { x: points[0].x, y: points[0].y };
        }

        // Shoelace formula to get signed area and centroid
        let area = 0;
        let cx = 0;
        let cy = 0;

        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];

            const cross = (current.x * next.y) - (next.x * current.y);
            area += cross;
            cx += (current.x + next.x) * cross;
            cy += (current.y + next.y) * cross;
        }

        area /= 2;

        // Degenerate polygon (all points collinear), fall back to bounding box center
        if (Math.abs(area) < 1e-10) {
            let minX = points[0].x, maxX = points[0].x;
            let minY = points[0].y, maxY = points[0].y;
            points.forEach(p => {
                minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
                minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
            });
            return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
        }

        cx /= (6 * area);
        cy /= (6 * area);

        return { x: cx, y: cy };
    }

    isPointWithinArea(point, areaPoints) {
        if (areaPoints.length < 3) {
            // A polygon must have at least 3 points
            return false;
        }

        let isInside = false;
        const { x, y } = point;

        // Iterate through each edge of the polygon
        for (let i = 0, j = areaPoints.length - 1; i < areaPoints.length; j = i++) {
            const xi = areaPoints[i].x, yi = areaPoints[i].y;
            const xj = areaPoints[j].x, yj = areaPoints[j].y;

            // Check if the point is within the vertical bounds of the edge
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);

            if (intersect) {
                isInside = !isInside;
            }
        }

        return isInside;
    }

    getRacetrackCorners(x, y, length, width, orientation, leftSide, mapOrientation) {
        const corners = [];
        if (this.isNumber(length) && length >= 0 && this.isNumber(width) && width >= 0 && this.isNumber(orientation)) {
            const orienationRad = (orientation * Math.PI / 180) + (mapOrientation * Math.PI / 180)

            corners.push({
                x: x + ((width / 2) * Math.cos(orienationRad - Math.PI / 2)),
                y: y - ((width / 2) * Math.cos(orienationRad))
            });

            corners.push({
                x: corners[0].x - (length * Math.cos(orienationRad - Math.PI / 2)),
                y: corners[0].y + (length * Math.cos(orienationRad))
            });

            if (leftSide) {
                corners.push({
                    x: corners[0].x - (length * Math.cos(orienationRad - Math.PI / 2)) - (width * Math.cos(orienationRad)),
                    y: corners[0].y + (length * Math.cos(orienationRad)) - (width * Math.cos(orienationRad - Math.PI / 2))
                });

                corners.push({
                    x: corners[0].x - (width * Math.cos(orienationRad)),
                    y: corners[0].y - (width * Math.cos(orienationRad - Math.PI / 2))
                });
            } else {
                corners.push({
                    x: corners[0].x - (length * Math.cos(orienationRad - Math.PI / 2)) + (width * Math.cos(orienationRad)),
                    y: corners[0].y + (length * Math.cos(orienationRad)) + (width * Math.cos(orienationRad - Math.PI / 2))
                });

                corners.push({
                    x: corners[0].x + (width * Math.cos(orienationRad)),
                    y: corners[0].y + (width * Math.cos(orienationRad - Math.PI / 2))
                });
            }
        }

        return corners;
    }

    parseLuaMiz(lua) {
        const astData = luaparse.parse(lua, {
            comments: false,
            locations: true
        });

        const missionAssignment = astData.body.find(
            stmt => stmt.type === 'AssignmentStatement' &&
                stmt.variables[0]?.type === 'Identifier' &&
                stmt.variables[0]?.name === 'mission'
        );

        const luaTableNode = missionAssignment.init[0];
        return this.luaAstToJsObject(luaTableNode);
    }

    luaAstToJsObject(tableNode) {
        if (!tableNode || tableNode.type !== 'TableConstructorExpression') return null;

        const object = {};
        const array = [];

        let isArray = true;

        for (const field of tableNode.fields) {
            if (field.type === 'TableValue') {
                // Array-style value
                array.push(this.parseLuaValue(field.value));
            } else {
                // Keyed field
                let key = this.parseLuaValue(field.key);
                let value = this.parseLuaValue(field.value);

                if (typeof key !== 'undefined') {
                    object[key] = value;
                }
                isArray = false;
            }
        }

        return isArray ? array : object;
    }

    parseLuaValue(node) {
        if (!node) return null;

        switch (node.type) {
            case 'StringLiteral':
                // node.value should already contain the clean string
                if (node.value !== null) return node.value;

                // fallback: strip quotes and unescape manually
                if (typeof node.raw === 'string') {
                    return node.raw
                        .replace(/^"(.*)"$/, '$1')   // remove outer quotes
                        .replace(/\\n/g, '\n')       // unescape newlines
                        .replace(/\\"/g, '"')        // unescape quotes
                        .replace(/\\\\/g, '\\');     // unescape backslashes
                }
                return null;
            case 'NumericLiteral':
                return node.value;
            case 'BooleanLiteral':
                return node.value;
            case 'NilLiteral':
                return null;
            case 'TableConstructorExpression':
                return this.luaAstToJsObject(node);
            case 'Identifier':
                return node.name;
            case 'UnaryExpression':
                const value = this.parseLuaValue(node.argument);
                if (node.operator === '-') return -value;
                if (node.operator === '#') return `[Unsupported length operator]`;
                return `[Unsupported Unary: ${node.operator}]`;
            default:
                return `[Unsupported:${node.type}]`;
        }
    }

    dcsToGeo(lat0, lon0, x, y) {
        const lat = lat0 + (x / 111320);
        const lon = lon0 + (y / (40075000 * Math.cos(lat0 * Math.PI / 180) / 360));

        return [lat, lon];
    }

    toDegMin(value, isLat) {
        const dir = isLat
            ? value >= 0 ? 'N' : 'S'
            : value >= 0 ? 'E' : 'W';

        const abs = Math.abs(value);
        const deg = Math.floor(abs);
        const min = (abs - deg) * 60;

        return `${dir} ${isLat ? this.zeroPad(deg, 2) : this.zeroPad(deg, 3)}°${this.zeroPad(min.toFixed(3), 6)}'`;
    }

    zeroPad(num, places) {
        return String(num).padStart(places, '0');
    }

    fahrenheitToCelsius(f) {
        return (f - 32) * 5 / 9;
    }

    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    getContrailsRange(slTemp) {
        const minAlt = Math.max(0, (560 * slTemp) + 18400);
        const maxAlt = 39000;

        if (minAlt < maxAlt) {
            return [minAlt, maxAlt];
        } else {
            return false;
        }
    }

    getTextWidth(txt, fontSize) {
        var id = 'text-width-tester';
        let tag = $(`#${id}`);
        if (!$(tag).length) {
            tag = $('<span id="' + id + '" style="display:none;font-size:' + fontSize + ';">' + txt + '</span>');
            $('body').append(tag);
        } else {
            $(tag).css({ 'font-size': fontSize }).html(txt);
        }

        return $(tag).width();
    }

    getAbsoluteCellPosition(cell) {
        if (cell.type === 'path-field' && cell.internalPosition) {
            const [rowStart, rowEnd, colStart, colEnd] = cell.position;
            const [ix, iy, iw, ih] = cell.internalPosition;
            const cellHeight = rowEnd - rowStart;
            const cellWidth = colEnd - colStart;
            const absRowStart = rowStart + iy * cellHeight;
            const absColStart = colStart + ix * cellWidth;
            return [
                absRowStart,
                absRowStart + ih * cellHeight,
                absColStart,
                absColStart + iw * cellWidth,
            ];
        }
        return cell.position;
    };

    getCellColor(cellColor, darkMode, defaultColor) {
        if (!cellColor) {
            if (Array.isArray(defaultColor)) {
                if (defaultColor.length > 1) {
                    return darkMode ? defaultColor[1] : defaultColor[0];
                } else {
                    defaultColor = defaultColor[0];
                }
            }

            return darkMode ? this.invertHexColor(defaultColor) : defaultColor;
        }

        if (Array.isArray(cellColor)) {
            if (cellColor.length > 1) {
                return darkMode ? cellColor[1] : cellColor[0];
            } else {
                cellColor = cellColor[0];
            }
        }

        return darkMode ? this.invertHexColor(cellColor) : cellColor;
    }

    invertHexColor(hex) {
        // Remove the # if present
        hex = hex.replace('#', '');

        // Parse the hex string into RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Invert each channel
        const invertedR = (255 - r).toString(16).padStart(2, '0');
        const invertedG = (255 - g).toString(16).padStart(2, '0');
        const invertedB = (255 - b).toString(16).padStart(2, '0');

        return `#${invertedR}${invertedG}${invertedB}`.toUpperCase();
    }

    generateId() {
        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // fallback for non-secure contexts
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    getCanvasClickPosition(clickX, clickY, canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: Math.round((event.clientX - rect.left) * scaleX),
            y: Math.round((event.clientY - rect.top) * scaleY),
        };
    };

    formatTimeLabel(totalSeconds) {
        if (totalSeconds < 60) return `${totalSeconds}"`;
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return s === 0 ? `${m}'` : `${m}'${s}"`;
    }
}