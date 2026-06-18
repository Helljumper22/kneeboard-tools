class AttackPlannerUtils {
    constructor(attackPlanner, mapDrawUtils, backgroundMapDrawUtils) {
        this.attackPlanner = attackPlanner;
        this.mapDrawUtils = mapDrawUtils;
        this.backgroundMapDrawUtils = backgroundMapDrawUtils;
    }

    getBackgroundTransform(backgroundData, backgroundImageObject) {
        const canvasW = this.backgroundMapDrawUtils.canvas.width;
        const canvasH = this.backgroundMapDrawUtils.canvas.height;

        if (backgroundData?.x !== undefined) {
            return {
                x: backgroundData.x,
                y: backgroundData.y,
                scale: backgroundData.scale,
                rotation: backgroundData.rotation ?? 0,
            };
        }

        // Default: scale to fit canvas, centered
        const fitScale = backgroundImageObject
            ? Math.min(canvasW / backgroundImageObject.width, canvasH / backgroundImageObject.height)
            : 1;
        return { x: canvasW / 2, y: canvasH / 2, scale: fitScale, rotation: 0 };
    }

    getRulerPointHit(x, y, rulerPoint1, rulerPoint2) {
        const hitRadius = 12;
        if (rulerPoint1) {
            const cp1 = this.imageToCanvas(rulerPoint1.x, rulerPoint1.y);
            if (Math.hypot(x - cp1.x, y - cp1.y) <= hitRadius) return 1;
        }
        if (rulerPoint2) {
            const cp2 = this.imageToCanvas(rulerPoint2.x, rulerPoint2.y);
            if (Math.hypot(x - cp2.x, y - cp2.y) <= hitRadius) return 2;
        }
        return null;
    }

    computeRulerCalibration(rulerPoint1, rulerPoint2, ruleScale) {
        if (rulerPoint1 && rulerPoint2) {
            const rulerNm = parseFloat(ruleScale);
            if (rulerNm > 0) {
                const imagePixelDistance = Math.hypot(rulerPoint2.x - rulerPoint1.x, rulerPoint2.y - rulerPoint1.y);
                return rulerNm / imagePixelDistance;
            }
        }

        return null;
    }

    currentTransform() {
        const bgMapComponent = this.attackPlanner.mapComponentList.find(mc => mc.id === 'background-map');
        const bgData = this.attackPlanner.getComponentData(bgMapComponent);
        return this.getBackgroundTransform(bgData, this.attackPlanner.backgroundImageObject);
    }

    canvasToImage(cx, cy) {
        const { x, y, scale, rotation } = this.currentTransform();
        const dx = cx - x, dy = cy - y;
        const cos = Math.cos(-rotation), sin = Math.sin(-rotation);
        return { x: (dx * cos - dy * sin) / scale, y: (dx * sin + dy * cos) / scale };
    }

    imageToCanvas(ix, iy) {
        const { x, y, scale, rotation } = this.currentTransform();
        const cos = Math.cos(rotation), sin = Math.sin(rotation);
        const dx = ix * scale, dy = iy * scale;
        return { x: x + dx * cos - dy * sin, y: y + dx * sin + dy * cos };
    }

    nearestStep(steps, idealInterval) {
        return steps.reduce((best, step) =>
            Math.abs(Math.log(step / idealInterval)) < Math.abs(Math.log(best / idealInterval)) ? step : best
        );
    }

    getObjectBounds(object) {
        const points = []

        const canvasRelativePosition = this.imageToCanvas(object.x, object.y)

        switch (object.type) {
            case MapObjectType.TURN:
            case MapObjectType.TURNING_POINT:
            case MapObjectType.INITIAL_POINT:
            case MapObjectType.TARGET_POINT:
                const radius = object.size / 2;
                points.push({ x: canvasRelativePosition.x - radius, y: canvasRelativePosition.y - radius });
                points.push({ x: canvasRelativePosition.x + radius, y: canvasRelativePosition.y - radius });
                points.push({ x: canvasRelativePosition.x + radius, y: canvasRelativePosition.y + radius });
                points.push({ x: canvasRelativePosition.x - radius, y: canvasRelativePosition.y + radius });
                break;
        }

        return points
    }

    getComponentLabelOffsetAngle(component) {
        return ((component['name-position'] ?? 270) - 90) * Math.PI / 180;
    }

    getComponentLabelBounds(component) {
        if (!component.name) return [];
        const pos = this.imageToCanvas(component.x, component.y);
        const offsetAngle = this.getComponentLabelOffsetAngle(component);
        const offsetDistance = (component.size ?? 30) / 2 + 12;
        return this.mapDrawUtils.getTextBounds(pos.x, pos.y, component.name, 18, offsetDistance, offsetAngle, 2);
    }

    createBoundingBox(center, halfW, halfH) {
        return [
            { x: center.x - halfW, y: center.y - halfH },
            { x: center.x + halfW, y: center.y - halfH },
            { x: center.x + halfW, y: center.y + halfH },
            { x: center.x - halfW, y: center.y + halfH },
        ];
    }

    makeDragHandlers(object, xKey = 'x', yKey = 'y') {
        const apu = this;
        return {
            onDragStart(pos) { this.lastCanvas = pos; },
            applyDrag(pos, event) {
                const curr = apu.canvasToImage(pos.x, pos.y);
                const last = apu.canvasToImage(this.lastCanvas.x, this.lastCanvas.y);
                const precision = event.altKey ? 0.1 : 1;
                object[xKey] += (curr.x - last.x) * precision;
                object[yKey] += (curr.y - last.y) * precision;
                this.lastCanvas = pos;
            },
        };
    }

    getPopupPlanBounds(popupPlan) {
        if (popupPlan.x === undefined || popupPlan.y === undefined) return [];
        const center = this.imageToCanvas(popupPlan.x, popupPlan.y);
        return this.createBoundingBox({ x: center.x - 12, y: center.y }, 65, 30);
    }

    getBlastIndicatorBounds(blastIndicator) {
        if (blastIndicator.x === undefined || blastIndicator.y === undefined) return [];
        const center = this.imageToCanvas(blastIndicator.x, blastIndicator.y);
        return this.createBoundingBox({ x: center.x, y: center.y - 12 }, 60, 30);
    }

    getArrowEndpointBounds(arrow, endpoint) {
        const xKey = endpoint === 'start' ? 'x-start' : 'x-end';
        const yKey = endpoint === 'start' ? 'y-start' : 'y-end';
        if (arrow[xKey] === undefined || arrow[yKey] === undefined) return [];
        const p = this.imageToCanvas(arrow[xKey], arrow[yKey]);
        return this.createBoundingBox(p, 10, 10);
    }

    getFuelPlanBounds(fuelPlan) {
        if (fuelPlan.x === undefined || fuelPlan.y === undefined) return [];
        const center = this.imageToCanvas(fuelPlan.x, fuelPlan.y);
        return this.createBoundingBox(center, 55, 30);
    }

    makeNavPointTarget(navPoint, componentPath) {
        const apu = this;
        return {
            kind: 'nav-point',
            componentPath,
            navPoint,
            outlineWidth: 4,
            outlineFilled: true,
            instructions: 'Click and drag to move the nav-point. Use ALT for finer adjustments.',
            getBounds: () => apu.getObjectBounds(navPoint),
            ...apu.makeDragHandlers(navPoint),
        };
    }

    makeMovableTarget(kind, navPoint, componentPath, boundsGetter) {
        const apu = this;
        return {
            kind,
            componentPath,
            navPoint,
            outlineWidth: 2,
            outlineFilled: false,
            instructions: 'Click and drag to move. Use ALT for finer adjustments.',
            getBounds: boundsGetter,
            ...apu.makeDragHandlers(navPoint),
        };
    }

    makePopupPlanTarget(popupPlan, componentPath) {
        return this.makeMovableTarget('popup-plan', popupPlan, componentPath, () => this.getPopupPlanBounds(popupPlan));
    }

    makeBlastIndicatorTarget(blastIndicator, componentPath) {
        return this.makeMovableTarget('blast-indicator', blastIndicator, componentPath, () => this.getBlastIndicatorBounds(blastIndicator));
    }

    makeFuelPlanTarget(fuelPlan, componentPath) {
        return this.makeMovableTarget('fuel-plan', fuelPlan, componentPath, () => this.getFuelPlanBounds(fuelPlan));
    }

    makeArrowEndpointTarget(arrow, componentPath, endpoint) {
        const apu = this;
        const xKey = endpoint === 'start' ? 'x-start' : 'x-end';
        const yKey = endpoint === 'start' ? 'y-start' : 'y-end';
        return {
            kind: endpoint === 'start' ? 'arrow-start' : 'arrow-end',
            componentPath,
            navPoint: arrow,
            outlineWidth: 2,
            outlineFilled: false,
            instructions: 'Click and drag to move the arrow endpoints. Use ALT for finer adjustments.',
            getBounds: () => apu.getArrowEndpointBounds(arrow, endpoint),
            ...apu.makeDragHandlers(arrow, xKey, yKey),
        };
    }

    makeNameLabelTarget(navPoint, componentPath) {
        const apu = this;
        return {
            kind: 'name-label',
            componentPath,
            navPoint,
            outlineWidth: 2,
            outlineFilled: false,
            instructions: 'Click and drag to move the label around the nav point.',
            getBounds: () => apu.getComponentLabelBounds(navPoint),
            applyDrag(pos) {
                const center = apu.imageToCanvas(navPoint.x, navPoint.y);
                const angle = Math.atan2(pos.y - center.y, pos.x - center.x);
                navPoint['name-position'] = ((angle * 180 / Math.PI) + 90 + 360) % 360;
            },
            draw() {
                const center = apu.imageToCanvas(navPoint.x, navPoint.y);
                const offsetAngle = apu.getComponentLabelOffsetAngle(navPoint);
                const offsetDistance = (navPoint.size ?? 30) / 2 + 12;
                const fillColor = apu.attackPlanner.darkMode ? apu.attackPlanner.backgroundColor[1] : apu.attackPlanner.backgroundColor[0];
                const textColor = apu.attackPlanner.darkMode ? apu.attackPlanner.backgroundColor[0] : apu.attackPlanner.backgroundColor[1];
                const borderColor = textColor;
                apu.mapDrawUtils.drawText(center.x, center.y, navPoint.name, 'square', 18, offsetDistance, offsetAngle, 0, 2, fillColor, textColor, borderColor);
            },
        };
    }

    makeHeadingLabelTarget(navPoint, componentPath, legStart, legEnd, headingText) {
        const apu = this;
        const position = () => navPoint['leg-heading-position'] ?? 0.5;
        const side = () => navPoint['leg-heading-side'] ?? 1;
        return {
            kind: 'heading-label',
            componentPath,
            navPoint,
            outlineWidth: 2,
            outlineFilled: false,
            instructions: 'Click and drag to move the leg heading along the leg.',
            getBounds: () => apu.mapDrawUtils.getLegHeadingBounds(legStart.x, legStart.y, legEnd.x, legEnd.y, headingText, position(), side()),
            applyDrag(pos) {
                const dx = legEnd.x - legStart.x;
                const dy = legEnd.y - legStart.y;
                const legLen = Math.hypot(dx, dy);
                if (legLen === 0) return;
                const ux = dx / legLen;
                const uy = dy / legLen;
                const mx = pos.x - legStart.x;
                const my = pos.y - legStart.y;
                navPoint['leg-heading-position'] = Math.max(0.05, Math.min(0.95, (mx * ux + my * uy) / legLen));
                navPoint['leg-heading-side'] = (mx * uy - my * ux) >= 0 ? 1 : -1;
            },
            draw() {
                const lineColor = apu.attackPlanner.darkMode ? apu.attackPlanner.defaultLineColor[1] : apu.attackPlanner.defaultLineColor[0];
                apu.mapDrawUtils.drawLegHeading(legStart.x, legStart.y, legEnd.x, legEnd.y, headingText, position(), side(), lineColor);
            },
        };
    }
}