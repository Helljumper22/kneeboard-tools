class MapDrawUtils {
  constructor(canvas) {
    this.canvas = $(canvas)[0];
    this.ctx = this.canvas.getContext('2d');

    this.height = 700;
    this.width = 700;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.defaultScale = 100;
    this.nmToPixels = (this.width / 2) / this.defaultScale;
  }

  clearCanvas() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  getCanvasCorners(padding = 0) {
    return [
      { x: (-this.centerX + padding) / this.nmToPixels, y: (-this.centerY + padding) / this.nmToPixels },
      { x: (this.width - this.centerX - padding) / this.nmToPixels, y: (-this.centerY + padding) / this.nmToPixels },
      { x: (this.width - this.centerX - padding) / this.nmToPixels, y: (this.height - this.centerY - padding) / this.nmToPixels },
      { x: (-this.centerX + padding) / this.nmToPixels, y: (this.height - this.centerY - padding) / this.nmToPixels },
    ];
  }

  getImage(imageBase64) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.onerror = reject;

      img.src = imageBase64;
    });
  }

  setToBackground() {
    this.ctx.globalCompositeOperation = 'destination-over';
  }

  setToForeground() {
    this.ctx.globalCompositeOperation = 'source-over';
  }

  setScale(furthestPoint) {
    // Ensure the furthest point fits within the canvas
    const maxRadius = Math.min(this.width, this.height) / 2;
    this.nmToPixels = maxRadius / furthestPoint;
  }

  setCenter(x, y) {
    this.centerX = (this.width / 2) - (x * this.nmToPixels);
    this.centerY = (this.height / 2) - (y * this.nmToPixels);
  }

  clipCanvas(points) {
    if (points.length < 3) {
      return;
    }

    this.ctx.save();
    this.ctx.beginPath();

    const firstPoint = points[0];
    const firstX = (firstPoint.x * this.nmToPixels) + this.centerX;
    const firstY = (firstPoint.y * this.nmToPixels) + this.centerY;
    this.ctx.moveTo(firstX, firstY);

    points.forEach((point) => {
      const x = (point.x * this.nmToPixels) + this.centerX;
      const y = (point.y * this.nmToPixels) + this.centerY;
      this.ctx.lineTo(x, y);
    });

    this.ctx.closePath();
    this.ctx.clip();
  }

  unclipCanvas() {
    this.ctx.restore();
  }

  drawBackground(color) {
    this.setToBackground();

    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.setToForeground();
  }

  drawPoint(x, y, color, radius = 5) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawBaseLines(location, magneticDeclination, mapOrientation, color = false, size = 1) {
    const base_xPx = 60 * size;
    const base_yPx = 60 * size;
    const height = 60 * size;

    let xPx = 0, yPx = 0;
    switch (location) {
      case 'top-left':
        xPx = base_xPx
        yPx = base_yPx;
        break;
      case 'top-right':
        xPx = this.width - base_xPx
        yPx = base_yPx;
        break;
      case 'bottom-left':
        xPx = base_xPx
        yPx = this.height - base_yPx;
        break;
      case 'bottom-right':
        xPx = this.width - base_xPx
        yPx = this.height - base_yPx;
        break;
    }

    this.ctx.font = `${12 * size}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.strokeStyle = color ?? 'black';
    this.ctx.fillStyle = color ?? 'black';
    this.ctx.lineWidth = 2 * size;

    this.ctx.save();

    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(mapOrientation * (Math.PI / 180));

    // True north line
    this.ctx.beginPath();
    this.ctx.moveTo(0, (height / 2));
    this.ctx.lineTo(0, -(height / 2));
    this.ctx.stroke();

    // True north line star
    const spikes = 5;
    const outerRadius = 3;
    const innerRadius = 1.5;
    const step = Math.PI / spikes;
    var rot = Math.PI / 2 * 3;
    const starPositionX = 0;
    const starPositionY = -(height / 2) - 7
    var x = starPositionX;
    var y = starPositionY;

    this.ctx.beginPath();
    this.ctx.moveTo(starPositionX, starPositionY - outerRadius)
    for (var i = 0; i < spikes; i++) {
      x = starPositionX + Math.cos(rot) * outerRadius;
      y = starPositionY + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y)
      rot += step

      x = starPositionX + Math.cos(rot) * innerRadius;
      y = starPositionY + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y)
      rot += step
    }

    this.ctx.lineTo(starPositionX, starPositionY - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();

    // Magnetic north line
    this.ctx.translate(0, (height / 2));
    this.ctx.moveTo(0, 0);
    this.ctx.rotate(magneticDeclination * (Math.PI / 180) + Math.PI);
    this.ctx.lineTo(0, height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(1, height - 1);
    this.ctx.lineTo(5, height - 10);
    this.ctx.lineTo(1, height - 10);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();

    this.ctx.save();

    // Magnetic declinaison text
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(mapOrientation * (Math.PI / 180));

    let magneticDeclinationText = '';
    if (magneticDeclination > 0) {
      magneticDeclinationText = `+${magneticDeclination}°`;
    } else if (magneticDeclination == 0) {
      magneticDeclinationText = `+0°`;
    } else {
      magneticDeclinationText = `${magneticDeclination}°`;
    }

    this.ctx.fillText(magneticDeclinationText, 0, + (height / 2) + 10);

    this.ctx.restore();
  }

  drawBullseye(x, y, color, radius = 8) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, radius / 2, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawSquare(x, y, length, strokeWidth = 2, color = 'black') {
    const xPx = (x * this.nmToPixels) + this.centerX - (length / 2);
    const yPx = (y * this.nmToPixels) + this.centerY - (length / 2);

    this.ctx.lineWidth = strokeWidth;
    this.ctx.strokeStyle = color;

    this.ctx.strokeRect(xPx, yPx, length, length);
  }

  drawFullSquare(x, y, length, color = 'black') {
    const xPx = (x * this.nmToPixels) + this.centerX - (length / 2);
    const yPx = (y * this.nmToPixels) + this.centerY - (length / 2);

    this.ctx.fillStyle = color;

    this.ctx.fillRect(xPx, yPx, length, length);
  }

  drawCircle(x, y, diameter, strokeWidth = 2, color = 'black') {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.lineWidth = strokeWidth;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, diameter / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawNavPoint(x, y, type, size, strokeWidth = 4, color = 'black', cornerRadius = 4) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    if (type === 'turning-point') {
      const r = size / 2;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(xPx, yPx, r, 0, 2 * Math.PI);
      this.ctx.clip();
      this.ctx.clearRect(xPx - r, yPx - r, size, size);
      this.ctx.restore();

      this.ctx.lineWidth = strokeWidth;
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(xPx, yPx, r, 0, 2 * Math.PI);
      this.ctx.stroke();
      return;
    }

    const cr = Math.min(cornerRadius, size * 0.25);

    const buildPath = () => {
      this.ctx.beginPath();
      if (type === 'initial-point') {
        const half = size / 2;
        this.ctx.roundRect(xPx - half, yPx - half, size, size, cr);
      } else {
        const h = size;
        const triTop = { x: xPx, y: yPx - (2 * h / 3) };
        const triBotR = { x: xPx + h / Math.sqrt(3), y: yPx + h / 3 };
        const triBotL = { x: xPx - h / Math.sqrt(3), y: yPx + h / 3 };

        this.ctx.moveTo((triBotL.x + triTop.x) / 2, (triBotL.y + triTop.y) / 2);
        this.ctx.arcTo(triTop.x, triTop.y, triBotR.x, triBotR.y, cr);
        this.ctx.arcTo(triBotR.x, triBotR.y, triBotL.x, triBotL.y, cr);
        this.ctx.arcTo(triBotL.x, triBotL.y, triTop.x, triTop.y, cr);
        this.ctx.closePath();
      }
    };

    this.ctx.save();
    buildPath();
    this.ctx.clip();
    this.ctx.clearRect(xPx - size, yPx - size, size * 2, size * 2);
    this.ctx.restore();

    this.ctx.lineWidth = strokeWidth;
    this.ctx.strokeStyle = color;
    buildPath();
    this.ctx.stroke();
  }

  drawPolygon(corners, color, strokeWidth = 1, type = 'simple', fillColor = false) {
    this.ctx.fillStyle = fillColor;

    this.ctx.beginPath();

    const lines = [];
    for (let i = 0; i < corners.length; i++) {
      const nextCornerIndex = (i + 1) % corners.length;

      const cornerX = (corners[i].x * this.nmToPixels) + this.centerX;
      const cornerY = (corners[i].y * this.nmToPixels) + this.centerY;

      lines.push({
        startX: corners[i].x,
        startY: corners[i].y,
        endX: corners[nextCornerIndex].x,
        endY: corners[nextCornerIndex].y,
      })

      if (i == 0) {
        this.ctx.moveTo(cornerX, cornerY)
      } else {
        this.ctx.lineTo(cornerX, cornerY)
      }
    }

    this.ctx.closePath();
    this.ctx.fill();

    if (type != 'no-border') {
      lines.forEach(line => {
        this.drawLine(line.startX, line.startY, line.endX, line.endY, color, strokeWidth, type);
      });
    }
  }

  drawLine(startX, startY, endX, endY, color, strokeWidth = 1, type = 'simple') {
    const startXPx = (startX * this.nmToPixels) + this.centerX;
    const startYPx = (startY * this.nmToPixels) + this.centerY;
    const endXPx = (endX * this.nmToPixels) + this.centerX;
    const endYPx = (endY * this.nmToPixels) + this.centerY;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

    let angle, lineLength, middleX, middleY;

    switch (type) {
      case 'simple':
        this.ctx.beginPath();
        this.ctx.moveTo(startXPx, startYPx);
        this.ctx.lineTo(endXPx, endYPx);
        this.ctx.stroke();
        break;
      case 'double':
        const lineSpacing = 3;
        // Calculate the angle of the line
        angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);

        // Calculate the offset for the parallel lines
        const offsetX = lineSpacing * Math.sin(angle);
        const offsetY = lineSpacing * Math.cos(angle);

        const dx = endXPx - startXPx;
        const dy = endYPx - startYPx;
        const distance = Math.sqrt(dx * dx + dy * dy)

        this.ctx.save();
        this.ctx.translate(startXPx + offsetX, startYPx - offsetY);
        this.ctx.rotate(angle);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, -1, distance, lineSpacing + (strokeWidth * 2));
        this.ctx.restore();

        // Draw the first parallel line
        this.ctx.beginPath();
        this.ctx.moveTo(startXPx - offsetX, startYPx + offsetY);
        this.ctx.lineTo(endXPx - offsetX, endYPx + offsetY);
        this.ctx.stroke();

        // Draw the second parallel line
        this.ctx.beginPath();
        this.ctx.moveTo(startXPx + offsetX, startYPx - offsetY);
        this.ctx.lineTo(endXPx + offsetX, endYPx - offsetY);
        this.ctx.stroke();
        break;
      case 'dashed':
        const length = Math.hypot(endXPx - startXPx, endYPx - startYPx); // Get the Euclidean distance

        const desiredDashLength = 5;
        const dashCount = Math.floor(length / (desiredDashLength * 2)) || 1;
        const dashLength = Math.round(length / (dashCount * 2));

        this.ctx.setLineDash([dashLength, dashLength]);

        this.ctx.beginPath();
        this.ctx.moveTo(startXPx, startYPx);
        this.ctx.lineTo(endXPx, endYPx);
        this.ctx.stroke();

        this.ctx.setLineDash([]);
        break;
      case 'border':
        const crossSpacing = 40;
        const crossSize = 15;

        this.ctx.beginPath();
        this.ctx.moveTo(startXPx, startYPx);
        this.ctx.lineTo(endXPx, endYPx);
        this.ctx.stroke();

        // Calculate the angle of the line
        angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);

        // Calculate the length of the line
        lineLength = Math.sqrt((endXPx - startXPx) ** 2 + (endYPx - startYPx) ** 2);

        // If the line is shorter than half the crossSpacing, don't draw any crosses
        if (lineLength < crossSpacing / 2) return;

        // Calculate the starting point for crosses (middle of the line)
        middleX = startXPx + (endXPx - startXPx) / 2;
        middleY = startYPx + (endYPx - startYPx) / 2;

        // Draw crosses along the line
        for (let i = -Math.floor(lineLength / (2 * crossSpacing)) * crossSpacing; i <= Math.floor(lineLength / (2 * crossSpacing)) * crossSpacing; i += crossSpacing) {
          const crossX = middleX + i * Math.cos(angle);
          const crossY = middleY + i * Math.sin(angle);

          this.ctx.save();
          this.ctx.translate(crossX, crossY);
          this.ctx.rotate(angle + Math.PI / 4);

          // Draw the cross
          this.ctx.strokeStyle = color;
          this.ctx.lineWidth = strokeWidth;

          this.ctx.beginPath();
          this.ctx.moveTo(-crossSize / 2, 0);
          this.ctx.lineTo(crossSize / 2, 0);
          this.ctx.moveTo(0, -crossSize / 2);
          this.ctx.lineTo(0, crossSize / 2);
          this.ctx.stroke();

          this.ctx.restore();
        }
        break;
      case 'coastline':
        const tickSpacing = 10;
        const tickLength = 10;
        const tickDirection = 1;

        this.ctx.beginPath();
        this.ctx.moveTo(startXPx, startYPx);
        this.ctx.lineTo(endXPx, endYPx);
        this.ctx.stroke();

        // Calculate angle and line length
        angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);
        const normalAngle = angle - (Math.PI / 4); // Perpendicular direction
        lineLength = Math.sqrt((endXPx - startXPx) ** 2 + (endYPx - startYPx) ** 2);

        if (lineLength < tickSpacing / 2) return;

        // Draw ticks along the line, centered
        middleX = startXPx + (endXPx - startXPx) / 2;
        middleY = startYPx + (endYPx - startYPx) / 2;

        for (let i = -Math.floor(lineLength / (2 * tickSpacing)) * tickSpacing;
          i <= Math.floor(lineLength / (2 * tickSpacing)) * tickSpacing;
          i += tickSpacing) {
          const baseX = middleX + i * Math.cos(angle);
          const baseY = middleY + i * Math.sin(angle);

          // Tick start and end points, pointing to one side (e.g., water side)
          const tickStartX = baseX;
          const tickStartY = baseY;
          const tickEndX = baseX + tickDirection * tickLength * Math.cos(normalAngle);
          const tickEndY = baseY + tickDirection * tickLength * Math.sin(normalAngle);

          this.ctx.beginPath();
          this.ctx.moveTo(tickStartX, tickStartY);
          this.ctx.lineTo(tickEndX, tickEndY);
          this.ctx.stroke();
        }
        break;
    }
  }

  drawBorder(startX, startY, endX, endY, color, strokeWidth = 1, crossSpacing = 40, crossSize = 15) {
    const startXPx = (startX * this.nmToPixels) + this.centerX;
    const startYPx = (startY * this.nmToPixels) + this.centerY;
    const endXPx = (endX * this.nmToPixels) + this.centerX;
    const endYPx = (endY * this.nmToPixels) + this.centerY;

    // Draw the main border line
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(startXPx, startYPx);
    this.ctx.lineTo(endXPx, endYPx);
    this.ctx.stroke();

    // Calculate the angle of the line
    const angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);

    // Calculate the length of the line
    const lineLength = Math.sqrt((endXPx - startXPx) ** 2 + (endYPx - startYPx) ** 2);

    // If the line is shorter than half the crossSpacing, don't draw any crosses
    if (lineLength < crossSpacing / 2) return;

    // Calculate the starting point for crosses (middle of the line)
    const middleX = startXPx + (endXPx - startXPx) / 2;
    const middleY = startYPx + (endYPx - startYPx) / 2;

    // Draw crosses along the line
    for (let i = -Math.floor(lineLength / (2 * crossSpacing)) * crossSpacing; i <= Math.floor(lineLength / (2 * crossSpacing)) * crossSpacing; i += crossSpacing) {
      const crossX = middleX + i * Math.cos(angle);
      const crossY = middleY + i * Math.sin(angle);

      this.ctx.save();
      this.ctx.translate(crossX, crossY);
      this.ctx.rotate(angle + Math.PI / 4);

      // Draw the cross
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = strokeWidth;

      this.ctx.beginPath();
      this.ctx.moveTo(-crossSize / 2, 0);
      this.ctx.lineTo(crossSize / 2, 0);
      this.ctx.moveTo(0, -crossSize / 2);
      this.ctx.lineTo(0, crossSize / 2);
      this.ctx.stroke();

      this.ctx.restore();
    }
  }

  drawCoastline(startX, startY, endX, endY, color, strokeWidth = 2, tickSpacing = 10, tickLength = 10, tickDirection = 1) {
    const startXPx = (startX * this.nmToPixels) + this.centerX;
    const startYPx = (startY * this.nmToPixels) + this.centerY;
    const endXPx = (endX * this.nmToPixels) + this.centerX;
    const endYPx = (endY * this.nmToPixels) + this.centerY;

    // Draw the main coastline line
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(startXPx, startYPx);
    this.ctx.lineTo(endXPx, endYPx);
    this.ctx.stroke();

    // Calculate angle and line length
    const angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);
    const normalAngle = angle - (Math.PI / 4); // Perpendicular direction
    const lineLength = Math.sqrt((endXPx - startXPx) ** 2 + (endYPx - startYPx) ** 2);

    if (lineLength < tickSpacing / 2) return;

    // Draw ticks along the line, centered
    const middleX = startXPx + (endXPx - startXPx) / 2;
    const middleY = startYPx + (endYPx - startYPx) / 2;

    for (let i = -Math.floor(lineLength / (2 * tickSpacing)) * tickSpacing;
      i <= Math.floor(lineLength / (2 * tickSpacing)) * tickSpacing;
      i += tickSpacing) {
      const baseX = middleX + i * Math.cos(angle);
      const baseY = middleY + i * Math.sin(angle);

      // Tick start and end points, pointing to one side (e.g., water side)
      const tickStartX = baseX;
      const tickStartY = baseY;
      const tickEndX = baseX + tickDirection * tickLength * Math.cos(normalAngle);
      const tickEndY = baseY + tickDirection * tickLength * Math.sin(normalAngle);

      this.ctx.beginPath();
      this.ctx.moveTo(tickStartX, tickStartY);
      this.ctx.lineTo(tickEndX, tickEndY);
      this.ctx.stroke();
    }
  }

  drawInfiniteLine(x, y, angle, color, isDashed = false) {
    // Convert the starting point from nautical miles to pixels
    const startXPx = (x * this.nmToPixels) + this.centerX;
    const startYPx = (y * this.nmToPixels) + this.centerY;

    // Calculate the direction vector for the line
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    // Determine the endpoints of the infinite line based on canvas dimensions
    const canvasDiagonal = Math.sqrt(this.width * this.width + this.height * this.height);
    const endXPx1 = startXPx + dx * canvasDiagonal; // Extend in one direction
    const endYPx1 = startYPx + dy * canvasDiagonal;
    const endXPx2 = startXPx - dx * canvasDiagonal; // Extend in the opposite direction
    const endYPx2 = startYPx - dy * canvasDiagonal;

    // Draw the infinite line
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;

    if (isDashed) {
      this.ctx.setLineDash([5, 5]); // Set dashed line pattern (5px dash, 5px gap)
    } else {
      this.ctx.setLineDash([]); // Reset to solid line
    }

    this.ctx.beginPath();
    this.ctx.moveTo(endXPx1, endYPx1);
    this.ctx.lineTo(endXPx2, endYPx2);
    this.ctx.stroke();

    // Reset line dash to default (solid) after drawing
    this.ctx.setLineDash([]);
  }

  drawLegMarkers(startX, startY, endX, endY, tickIntervalPx, labelFn, color = 'black', side = 1, startMargin = 0, endMargin = 0) {
    const dx = endX - startX;
    const dy = endY - startY;
    const legLengthPx = Math.hypot(dx, dy);
    if (legLengthPx < tickIntervalPx) return;

    const ux = dx / legLengthPx;
    const uy = dy / legLengthPx;
    const rx = uy * side;
    const ry = -ux * side;

    const tickLength = 15;
    let labelOffset = 19;

    let textAngle = Math.atan2(ry, rx);
    let textAlign = 'left';
    const P4 = Math.PI / 4;
    if (Math.abs(textAngle) > 3 * P4) {
      textAngle -= Math.PI;
      textAlign = 'right';
    } else if (textAngle > P4) {
      textAngle -= Math.PI / 2;
      textAlign = 'center';
      labelOffset = 26;
    } else if (textAngle > -P4) {
      textAlign = 'left';
    } else {
      textAngle += Math.PI / 2;
      textAlign = 'center';
      labelOffset = 26;
    }

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = color;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = 'middle';

    let d = tickIntervalPx;
    let tickIndex = 1;

    while (d < legLengthPx) {
      if (d < startMargin || d > legLengthPx - endMargin) {
        d += tickIntervalPx;
        tickIndex++;
        continue;
      }
      const tx = startX + ux * d;
      const ty = startY + uy * d;

      this.ctx.beginPath();
      this.ctx.moveTo(tx, ty);
      this.ctx.lineTo(tx + rx * tickLength, ty + ry * tickLength);
      this.ctx.stroke();

      this.ctx.save();
      this.ctx.translate(tx + rx * labelOffset, ty + ry * labelOffset);
      this.ctx.rotate(textAngle);
      this.ctx.fillText(labelFn(tickIndex), 0, 0);
      this.ctx.restore();

      d += tickIntervalPx;
      tickIndex++;
    }

    this.ctx.restore();
  }

  drawLegDuration(legStartX, legStartY, legEndX, legEndY, durationText, color = 'black', side = -1) {
    const dx = legEndX - legStartX;
    const dy = legEndY - legStartY;
    const legLenPx = Math.hypot(dx, dy);
    if (legLenPx < 20) return;

    const ux = dx / legLenPx;
    const uy = dy / legLenPx;
    const rx = uy * side;
    const ry = -ux * side;

    // Same text-angle orientation rules as drawLegMarkers, but applied to the leg
    // direction (ux, uy) so the label reads along the arrow, not perpendicular to it.
    let textAngle = Math.atan2(uy, ux);
    if (textAngle > Math.PI / 2) textAngle -= Math.PI;
    else if (textAngle < -Math.PI / 2) textAngle += Math.PI;

    const offsetPx = 20;
    const arrowSize = 10;
    const ax1 = legStartX + rx * offsetPx;
    const ay1 = legStartY + ry * offsetPx;
    const ax2 = legEndX + rx * offsetPx;
    const ay2 = legEndY + ry * offsetPx;
    const mx = (ax1 + ax2) / 2;
    const my = (ay1 + ay2) / 2;

    this.ctx.save();
    this.ctx.font = '20px sans-serif';
    const textWidth = this.ctx.measureText(durationText).width;
    const halfClear = textWidth / 2 + 5;

    if (legLenPx < halfClear * 2 + arrowSize * 2 + 4) { this.ctx.restore(); return; }

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;

    // Line body runs between the two arrow bases so tips land exactly at ax1/ax2.
    const legAngle = Math.atan2(uy, ux);
    this.ctx.beginPath();
    this.ctx.moveTo(ax1 + ux * arrowSize, ay1 + uy * arrowSize);
    this.ctx.lineTo(ax2 - ux * arrowSize, ay2 - uy * arrowSize);
    this.ctx.stroke();

    // Erase the centre section so the text reads clearly against the arrow line.
    this.ctx.save();
    this.ctx.translate(mx, my);
    this.ctx.rotate(textAngle);
    this.ctx.clearRect(-halfClear, -12, halfClear * 2, 24);
    this.ctx.restore();

    // Arrowhead at legEnd end — tip at ax2 (same filled-triangle pattern as drawLegHeading).
    this.ctx.save();
    this.ctx.translate(ax2, ay2);
    this.ctx.rotate(legAngle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-arrowSize, -arrowSize * 0.5);
    this.ctx.lineTo(-arrowSize, arrowSize * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();

    // Arrowhead at legStart end — tip at ax1 (flipped 180°).
    this.ctx.save();
    this.ctx.translate(ax1, ay1);
    this.ctx.rotate(legAngle + Math.PI);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-arrowSize, -arrowSize * 0.5);
    this.ctx.lineTo(-arrowSize, arrowSize * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.save();
    this.ctx.translate(mx, my);
    this.ctx.rotate(textAngle);
    this.ctx.fillText(durationText, 0, 0);
    this.ctx.restore();

    this.ctx.restore();
  }

  drawLegMarkerAt(legStartX, legStartY, legEndX, legEndY, markerX, markerY, label, color = 'black', side = 1) {
    const dx = legEndX - legStartX;
    const dy = legEndY - legStartY;
    const legLenPx = Math.hypot(dx, dy);
    if (legLenPx < 1) return;

    const ux = dx / legLenPx;
    const uy = dy / legLenPx;
    const rx = uy * side;
    const ry = -ux * side;

    const tickLength = 15;
    let labelOffset = 19;
    let textAngle = Math.atan2(ry, rx);
    let textAlign = 'left';
    const P4 = Math.PI / 4;
    if (Math.abs(textAngle) > 3 * P4) {
      textAngle -= Math.PI; textAlign = 'right';
    } else if (textAngle > P4) {
      textAngle -= Math.PI / 2; textAlign = 'center'; labelOffset = 26;
    } else if (textAngle > -P4) {
      textAlign = 'left';
    } else {
      textAngle += Math.PI / 2; textAlign = 'center'; labelOffset = 26;
    }

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = color;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = 'middle';

    this.ctx.beginPath();
    this.ctx.moveTo(markerX, markerY);
    this.ctx.lineTo(markerX + rx * tickLength, markerY + ry * tickLength);
    this.ctx.stroke();

    this.ctx.save();
    this.ctx.translate(markerX + rx * labelOffset, markerY + ry * labelOffset);
    this.ctx.rotate(textAngle);
    this.ctx.fillText(label, 0, 0);
    this.ctx.restore();

    this.ctx.restore();
  }

  // values = { offsetTurnDistance, initiatePopupDistance, startAltitude, rollOverAltitude,
  //            apogeeAltitude, designateMinAltitude, minReleaseAltitude }
  drawPopupPlan(x, y, values, color = 'black') {
    const apex = { x: x + 10, y: y - 30 };
    const leftFoot = { x: x - 30, y: y + 10 };
    const rightFoot = { x: x + 45, y: y + 5 };
    const bracketLeft = { x: x - 78, y: y + 10 };
    const bracketRight = leftFoot; // popup-initiate point coincides with the tent's left foot

    const fmt = (v) => (v === undefined || v === null || v === '') ? '' : `${v}`;

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.font = `${15}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Left measurement bracket.
    this.ctx.beginPath();
    this.ctx.moveTo(bracketLeft.x, bracketLeft.y);
    this.ctx.lineTo(bracketRight.x, bracketRight.y);
    this.ctx.moveTo(bracketLeft.x + 8, bracketLeft.y + 5);
    this.ctx.lineTo(bracketLeft.x + 8, bracketLeft.y + 10);
    this.ctx.moveTo(bracketRight.x, bracketRight.y + 5);
    this.ctx.lineTo(bracketRight.x, bracketRight.y + 10);
    this.ctx.stroke();

    // Tent.
    this.ctx.beginPath();
    this.ctx.moveTo(leftFoot.x, leftFoot.y);
    this.ctx.lineTo(apex.x, apex.y);
    this.ctx.lineTo(rightFoot.x, rightFoot.y);
    this.ctx.stroke();

    // Ground
    this.ctx.beginPath();
    this.ctx.moveTo(bracketLeft.x - 1, bracketLeft.y + 15);
    this.ctx.lineTo(rightFoot.x + 9, bracketLeft.y + 15);
    for (let i = (rightFoot.x + 8 - bracketLeft.x) / 8; i < (rightFoot.x + 8 - bracketLeft.x); i += (rightFoot.x + 8 - bracketLeft.x) / 8) {
      this.ctx.moveTo(bracketLeft.x + i, bracketLeft.y + 15);
      this.ctx.lineTo(bracketLeft.x + i - 7, bracketLeft.y + 22);
    }
    this.ctx.stroke();

    // Roll over altitude tick
    this.ctx.beginPath();
    this.ctx.moveTo(leftFoot.x + ((apex.x - leftFoot.x) / 1.75), leftFoot.y + ((apex.y - leftFoot.y) / 1.75));
    this.ctx.lineTo(leftFoot.x + ((apex.x - leftFoot.x) / 1.75) - 8, leftFoot.y + ((apex.y - leftFoot.y) / 1.75));
    this.ctx.stroke();

    // Min designation altitude tick
    this.ctx.beginPath();
    this.ctx.moveTo(apex.x + ((rightFoot.x - apex.x) / 2), apex.y + ((rightFoot.y - apex.y) / 2));
    this.ctx.lineTo(apex.x + ((rightFoot.x - apex.x) / 2) + 8, apex.y + ((rightFoot.y - apex.y) / 2));
    this.ctx.stroke();

    // Min release altitude tick
    this.ctx.beginPath();
    this.ctx.moveTo(rightFoot.x, rightFoot.y);
    this.ctx.lineTo(rightFoot.x + 8, rightFoot.y);
    this.ctx.stroke();

    // Distance labels under the bracket ends.
    this.ctx.fillText(fmt(values.offsetTurnDistance), bracketLeft.x + 8, bracketLeft.y + 32);
    this.ctx.fillText(fmt(values.initiatePopupDistance), bracketRight.x, bracketRight.y + 32);

    // Start altitude.
    this.ctx.fillText(fmt(values.startAltitude), bracketLeft.x - 16, bracketLeft.y);

    // Roll-over altitude.
    this.ctx.fillText(fmt(values.rollOverAltitude), leftFoot.x + ((apex.x - leftFoot.x) / 1.75) - 25, leftFoot.y + ((apex.y - leftFoot.y) / 1.75));

    // Apex altitude.
    this.ctx.fillText(fmt(values.apogeeAltitude), apex.x, apex.y - 10);

    // Designate altitude.
    this.ctx.fillText(fmt(values.designateMinAltitude), apex.x + ((rightFoot.x - apex.x) / 2) + 25, apex.y + ((rightFoot.y - apex.y) / 2));

    // Release altitude.
    this.ctx.fillText(fmt(values.minReleaseAltitude), rightFoot.x + 25, rightFoot.y);

    this.ctx.restore();
  }

  drawBlastIndicator(x, y, weaponName, blastHeight, blastRadius, color = 'black') {
    const impactPoint = { x: x, y: y + 15 };
    const height = { x: x, y: y - 35 };
    const radiusLeft = { x: x - 50, y: y + 15 };
    const radiusRight = { x: x + 50, y: y + 15 };

    const fmt = (v, addFt = false) => (v === undefined || v === null || v === '') ? '' : addFt ? `${v} ft` : `${v}`;

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.font = `12px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Scale.
    this.ctx.beginPath();
    this.ctx.moveTo(impactPoint.x, impactPoint.y);
    this.ctx.lineTo(height.x, height.y);
    this.ctx.moveTo(radiusLeft.x, radiusLeft.y);
    this.ctx.lineTo(radiusRight.x, radiusRight.y);
    this.ctx.stroke();

    // Top arrow
    this.ctx.beginPath();
    this.ctx.moveTo(height.x - 4, height.y);
    this.ctx.lineTo(height.x + 4, height.y);
    this.ctx.lineTo(height.x, height.y - 7);
    this.ctx.closePath();
    this.ctx.fill();

    // Left arrow
    this.ctx.beginPath();
    this.ctx.moveTo(radiusLeft.x, radiusLeft.y - 4);
    this.ctx.lineTo(radiusLeft.x, radiusLeft.y + 4);
    this.ctx.lineTo(radiusLeft.x - 7, radiusLeft.y);
    this.ctx.closePath();
    this.ctx.fill();

    // Right arrow
    this.ctx.beginPath();
    this.ctx.moveTo(radiusRight.x, radiusRight.y - 4);
    this.ctx.lineTo(radiusRight.x, radiusRight.y + 4);
    this.ctx.lineTo(radiusRight.x + 7, radiusRight.y);
    this.ctx.closePath();
    this.ctx.fill();

    // Arcs
    const arcHalfAngle = 40 * (Math.PI / 180);
    const arcDistance = 45;
    for (let i = 3 * (Math.PI / 2); i < 2 * Math.PI; i += (Math.PI / 2) / 4) {
      const midAngle = i + (11.25 * (Math.PI / 180));

      const arcXLeft = x + arcDistance * Math.sin(midAngle)
      const arcXRight = x - arcDistance * Math.sin(midAngle)
      const arcY = impactPoint.y - arcDistance * Math.cos(midAngle)

      const arcMidAngleLeft = midAngle - (Math.PI / 2);
      const arcMidAngleRight = 3 * Math.PI / 2 - midAngle;
      this.ctx.beginPath();
      this.ctx.arc(arcXLeft, arcY, 10, arcMidAngleLeft - arcHalfAngle, arcMidAngleLeft + arcHalfAngle)
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(arcXRight, arcY, 10, arcMidAngleRight - arcHalfAngle, arcMidAngleRight + arcHalfAngle)
      this.ctx.stroke();
    }

    // Bomb name.
    this.ctx.fillText(fmt(weaponName), height.x - 25, height.y - 14);

    // Blast height.
    this.ctx.fillText(fmt(blastHeight, true), impactPoint.x - 22, impactPoint.y - 25);

    // Blast radius.
    this.ctx.fillText(fmt(blastRadius, true), impactPoint.x + 25, impactPoint.y - 8);

    this.ctx.restore();
  }

  drawFuelPlan(x, y, estimatedFuel, minimumFuel, color = 'black') {
    y += 30
    const cellW = 55;
    const cellH = 20;
    const tableW = cellW * 2;
    const tableH = cellH * 3;
    const left = x - tableW / 2;
    const top = y - tableH;

    const fmt = (v) => (v === undefined || v === null || v === '') ? '' : `${v}`;

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 1.5;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Outer border
    this.ctx.strokeRect(left, top, tableW, tableH);

    // Row dividers
    this.ctx.beginPath();
    this.ctx.moveTo(left, top + cellH);
    this.ctx.lineTo(left + tableW, top + cellH);
    this.ctx.moveTo(left, top + cellH * 2);
    this.ctx.lineTo(left + tableW, top + cellH * 2);
    this.ctx.stroke();

    // Vertical divider for rows 2 and 3
    this.ctx.beginPath();
    this.ctx.moveTo(left + cellW, top + cellH);
    this.ctx.lineTo(left + cellW, top + tableH);
    this.ctx.stroke();

    // Row 1: "FUEL"
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.fillText('FUEL', x, top + cellH / 1.75);

    // Row 2: headers
    this.ctx.font = 'bold 14px sans-serif';
    this.ctx.fillText('EST.', left + cellW / 2, top + cellH * 1.55);
    this.ctx.fillText('MIN.', left + cellW * 1.5, top + cellH * 1.55);

    // Row 3: values
    this.ctx.font = '12px sans-serif';
    this.ctx.fillText(fmt(estimatedFuel), left + cellW / 2, top + cellH * 2.55);
    this.ctx.fillText(fmt(minimumFuel), left + cellW * 1.5, top + cellH * 2.55);

    this.ctx.restore();
  }

  drawMapArrow(x1, y1, x2, y2, type, distanceLabel, color = 'black') {
    const padding = 4;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const legLenPx = Math.hypot(dx, dy);
    if (legLenPx < 20) return;

    const ux = dx / legLenPx;
    const uy = dy / legLenPx;
    const rx = uy;
    const ry = -ux;

    // Same text-angle orientation rules as drawLegMarkers, but applied to the leg
    // direction (ux, uy) so the label reads along the arrow, not perpendicular to it.
    let textAngle = Math.atan2(uy, ux);
    if (textAngle > Math.PI / 2) textAngle -= Math.PI;
    else if (textAngle < -Math.PI / 2) textAngle += Math.PI;

    const arrowSize = 10;
    // padding pulls each tip inward along the shaft; label stays centred on the full span
    const ax1 = x1 + ux * padding + rx;
    const ay1 = y1 + uy * padding + ry;
    const ax2 = x2 - ux * padding + rx;
    const ay2 = y2 - uy * padding + ry;
    const mx = (ax1 + ax2) / 2;
    const my = (ay1 + ay2) / 2;

    this.ctx.save();
    this.ctx.font = '15px sans-serif';
    let textWidth = this.ctx.measureText(distanceLabel).width;
    let halfClear = textWidth / 2 + 4;

    const effectiveLenPx = legLenPx - 2 * padding;
    if (effectiveLenPx < halfClear * 2 + arrowSize * 2 + 4) {
      distanceLabel = distanceLabel.slice(0, -3)
      textWidth = this.ctx.measureText(distanceLabel).width;
      halfClear = textWidth / 2 + 5;
    }

    if (effectiveLenPx < halfClear * 2 + arrowSize * 2) {
      distanceLabel = null;
    }

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;

    // Line body runs between the two arrow bases so tips land exactly at ax1/ax2.
    const legAngle = Math.atan2(uy, ux);
    this.ctx.beginPath();
    this.ctx.moveTo(ax1 + ux * arrowSize, ay1 + uy * arrowSize);
    this.ctx.lineTo(ax2 - ux * arrowSize, ay2 - uy * arrowSize);
    this.ctx.stroke();

    if (type == 'double-arrow' || type == 'double-arrow-distance') {
      // Arrowhead at end/ax2.
      this.ctx.save();
      this.ctx.translate(ax2, ay2);
      this.ctx.rotate(legAngle);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(-arrowSize, -arrowSize * 0.5);
      this.ctx.lineTo(-arrowSize, arrowSize * 0.5);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    // Arrowhead at start/ax1.
    this.ctx.save();
    this.ctx.translate(ax1, ay1);
    this.ctx.rotate(legAngle + Math.PI);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-arrowSize, -arrowSize * 0.5);
    this.ctx.lineTo(-arrowSize, arrowSize * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();

    if (distanceLabel && (type == 'single-arrow-distance' || type == 'double-arrow-distance')) {
      // Erase the centre section so the text reads clearly against the arrow line.
      this.ctx.save();
      this.ctx.translate(mx, my);
      this.ctx.rotate(textAngle);
      this.ctx.clearRect(-halfClear, -12, halfClear * 2, 24);
      this.ctx.restore();

      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.save();
      this.ctx.translate(mx, my);
      this.ctx.rotate(textAngle);
      this.ctx.fillText(distanceLabel, 0, 0);
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  _legHeadingGeometry(legStartX, legStartY, legEndX, legEndY, t, side) {
    const dx = legEndX - legStartX;
    const dy = legEndY - legStartY;
    const legLen = Math.hypot(dx, dy);
    if (legLen < 20) return null;

    const ux = dx / legLen;
    const uy = dy / legLen;
    const rx = uy * side;
    const ry = -ux * side;

    let textAngle = Math.atan2(ry, rx);
    const P4 = Math.PI / 4;
    if (Math.abs(textAngle) > 3 * P4) textAngle -= Math.PI;
    else if (textAngle > P4) textAngle -= Math.PI / 2;
    else if (textAngle <= -P4) textAngle += Math.PI / 2;

    const lx = legStartX + t * dx;
    const ly = legStartY + t * dy;
    const offsetDist = 30;
    const px = lx + rx * offsetDist;
    const py = ly + ry * offsetDist;

    return { ux, uy, rx, ry, textAngle, px, py };
  }

  getLegHeadingBounds(legStartX, legStartY, legEndX, legEndY, headingText, t = 0.5, side = 1) {
    const g = this._legHeadingGeometry(legStartX, legStartY, legEndX, legEndY, t, side);
    if (!g) return [];

    const fontSize = 22;
    const pad = 4;

    this.ctx.save();
    this.ctx.font = `${fontSize}px sans-serif`;
    const textWidth = this.ctx.measureText(headingText).width;
    this.ctx.restore();

    const hw = textWidth / 2 + pad;
    const hh = fontSize / 2 + pad;
    const cos = Math.cos(g.textAngle);
    const sin = Math.sin(g.textAngle);

    return [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]].map(([lx, ly]) => ({
      x: g.px + lx * cos - ly * sin,
      y: g.py + lx * sin + ly * cos,
    }));
  }

  drawLegHeading(legStartX, legStartY, legEndX, legEndY, headingText, t = 0.5, side = 1, color = 'black') {
    const g = this._legHeadingGeometry(legStartX, legStartY, legEndX, legEndY, t, side);
    if (!g) return;

    const { ux, uy, textAngle, px, py } = g;

    const fontSize = 20;
    const arrowSize = 10;
    const gap = 4;

    this.ctx.save();
    this.ctx.translate(px, py);
    this.ctx.rotate(textAngle);

    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const textWidth = this.ctx.measureText(headingText).width;
    this.ctx.fillText(headingText, 0, 0);

    // Travel direction projected onto the rotated text frame
    const forwardX = ux * Math.cos(textAngle) + uy * Math.sin(textAngle);
    const forwardY = -ux * Math.sin(textAngle) + uy * Math.cos(textAngle);

    if (Math.abs(forwardX) >= Math.abs(forwardY)) {
      // Arrow at the leading end of text (along-leg case)
      const dir = forwardX > 0 ? 1 : -1;
      const baseX = dir * (textWidth / 2 + gap);
      const tipX = dir * (textWidth / 2 + gap + arrowSize);
      this.ctx.beginPath();
      this.ctx.moveTo(tipX, 0);
      this.ctx.lineTo(baseX, -arrowSize / 2);
      this.ctx.lineTo(baseX, arrowSize / 2);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      // Arrow above or below text (near-vertical leg case)
      const arrowDir = forwardY > 0 ? 1 : -1;
      const baseY = arrowDir * (fontSize / 2 + gap);
      const tipY = arrowDir * (fontSize / 2 + gap + arrowSize);
      this.ctx.beginPath();
      this.ctx.moveTo(0, tipY);
      this.ctx.lineTo(-arrowSize / 2, baseY);
      this.ctx.lineTo(arrowSize / 2, baseY);
      this.ctx.closePath();
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  drawRing(x, y, radius, color, strokeWidth = 1, fillColor = false) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;
    const radiusPx = Math.max(radius, 0) * this.nmToPixels

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, radiusPx, 0, 2 * Math.PI);
    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }
    this.ctx.stroke();
  }

  drawText(x, y, text, type = 'square', fontsize = 16, offsetDistance = 0, offsetAngle = 0, textAngle = 0, padding = 2, fillColor = false, textColor = false, borderColor = false) {
    let xPx = (x * this.nmToPixels) + this.centerX - padding;
    let yPx = (y * this.nmToPixels) + this.centerY - padding;

    this.ctx.font = `${fontsize}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const metrics = this.ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontsize;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = textHeight + padding * 2;
    const triangleWidth = textHeight + padding * 6;

    if (offsetDistance > 0) {
      const offsetX = offsetDistance * Math.cos(offsetAngle);
      const offsetY = offsetDistance * Math.sin(offsetAngle);

      let extraOffsetX = 0, extraOffsetY = 0;
      if (textAngle == 0) {
        extraOffsetX = (Math.abs(Math.cos(offsetAngle)) * (boxWidth / 2)) * Math.cos(offsetAngle);
        extraOffsetY = (Math.abs(Math.sin(offsetAngle)) * (boxHeight / 2)) * Math.sin(offsetAngle);
      }

      xPx += offsetX + extraOffsetX;
      yPx += offsetY + extraOffsetY;
    }

    this.ctx.save();
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(textAngle);

    this.ctx.fillStyle = fillColor ? fillColor : "white";
    this.ctx.strokeStyle = borderColor ? borderColor : "black";

    let textX = 0, textY = 0;
    switch (type) {
      case 'plus-top':
      case 'plus-bottom':
        this.ctx.beginPath();
        this.ctx.moveTo((textHeight / 2), padding);
        this.ctx.lineTo(-(textHeight / 2), padding);
        this.ctx.moveTo(0, (textHeight / 2) + padding);
        this.ctx.lineTo(0, -(textHeight / 2) + padding);
        this.ctx.stroke();

        if (type == 'plus-top') {
          textY -= textHeight - padding * 2;
        } else {
          textY += textHeight + padding * 2;
        }

        this.ctx.fillRect(textX - (textWidth / 2), textY - (textHeight / 2), textWidth, textHeight - padding);
        break;
      case 'octogone':
        const octo_x = -(padding) - ((textHeight * 1.2) / 2);
        const octo_y = (-padding * 2) - ((textHeight * 1.2) / 2);
        const octo_w = boxHeight * 1.2;
        const octo_h = boxHeight * 1.2;

        // Octagon "cut" size
        const octo_cut = Math.min(octo_w, octo_h) * 0.3; // adjust cut ratio as needed

        // Define 8 points of the octagon
        const points = [
          [octo_x + octo_cut, octo_y],                  // Top-left inner
          [octo_x + octo_w - octo_cut, octo_y],         // Top-right inner
          [octo_x + octo_w, octo_y + octo_cut],         // Right-top inner
          [octo_x + octo_w, octo_y + octo_h - octo_cut],// Right-bottom inner
          [octo_x + octo_w - octo_cut, octo_y + octo_h],// Bottom-right inner
          [octo_x + octo_cut, octo_y + octo_h],         // Bottom-left inner
          [octo_x, octo_y + octo_h - octo_cut],         // Left-bottom inner
          [octo_x, octo_y + octo_cut],                  // Left-top inner
        ];

        // Draw octagon
        this.ctx.beginPath();
        this.ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          this.ctx.lineTo(points[i][0], points[i][1]);
        }
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        if (text.length > 2) {
          this.ctx.fillRect(textX - (textWidth / 2) + padding, textY - (textHeight / 2) - (padding / 2), textWidth - padding, textHeight - padding);
        }
        break;
      case 'rounded-square':
        const rs_radius = 6; // Corner radius
        const rs_x = -textWidth / 2;
        const rs_y = -padding - textHeight / 2;
        const rs_w = boxWidth;
        const rs_h = boxHeight;

        // Begin rounded rectangle path
        this.ctx.beginPath();
        this.ctx.moveTo(rs_x + rs_radius, rs_y);
        this.ctx.lineTo(rs_x + rs_w - rs_radius, rs_y);
        this.ctx.quadraticCurveTo(rs_x + rs_w, rs_y, rs_x + rs_w, rs_y + rs_radius);
        this.ctx.lineTo(rs_x + rs_w, rs_y + rs_h - rs_radius);
        this.ctx.quadraticCurveTo(rs_x + rs_w, rs_y + rs_h, rs_x + rs_w - rs_radius, rs_y + rs_h);
        this.ctx.lineTo(rs_x + rs_radius, rs_y + rs_h);
        this.ctx.quadraticCurveTo(rs_x, rs_y + rs_h, rs_x, rs_y + rs_h - rs_radius);
        this.ctx.lineTo(rs_x, rs_y + rs_radius);
        this.ctx.quadraticCurveTo(rs_x, rs_y, rs_x + rs_radius, rs_y);
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        textX = padding;
        textY = padding;
        break;
      case 'square':
        // Draw black square with colored background
        this.ctx.fillRect(-textWidth / 2, (-padding / 2) - textHeight / 2, boxWidth, boxHeight);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(-textWidth / 2, (-padding / 2) - textHeight / 2, boxWidth, boxHeight);

        textX = padding;
        textY = padding;
        break;
      case 'triangle':
        // Draw black triangle with colored background
        this.ctx.beginPath();
        this.ctx.moveTo(padding, (-triangleWidth / 2) - (padding * 2));
        this.ctx.lineTo((triangleWidth * 0.6) + padding, (triangleWidth / 2) - (padding * 2));
        this.ctx.lineTo((-triangleWidth * 0.6) + padding, (triangleWidth / 2) - (padding * 2));
        this.ctx.fill();

        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, (-triangleWidth / 2) - (padding * 2));
        this.ctx.lineTo((triangleWidth * 0.6) + padding, (triangleWidth / 2) - (padding * 2));
        this.ctx.lineTo((-triangleWidth * 0.6) + padding, (triangleWidth / 2) - (padding * 2));
        this.ctx.closePath();
        this.ctx.stroke();

        textX = padding;
        textY = padding * 1.3;

        if (text.length > 2) {
          this.ctx.fillRect(textX - (textWidth / 2), textY - (textHeight / 2), textWidth, textHeight - (padding / 3));
        }
        break;
      case 'no-border':
        // Draw colored background
        this.ctx.fillRect(-textWidth / 2, (-padding / 2) - textHeight / 2, boxWidth, boxHeight);

        textX = padding;
        textY = padding;
        break;
      case 'clear':
        let heightFix = 0;
        if (padding == 0) {
          heightFix = 2
        }

        // Remove elements behind the text to ensure its readable.
        this.ctx.clearRect(-textWidth / 2, -textHeight / 2, boxWidth, boxHeight - heightFix);

        if (padding != 0) {
          textX = padding;
          textY = padding + 1;
        }
        break;
    }

    // Draw the text centered in the rectangle
    this.ctx.fillStyle = textColor ? textColor : "black";
    this.ctx.fillText(text, textX, textY);

    this.ctx.restore();
  }

  getTextBounds(x, y, text, fontSize, offsetDistance, offsetAngle, padding = 2) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.font = `${fontSize}px sans-serif`;
    const textWidth = this.ctx.measureText(text).width;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = fontSize + padding * 2;

    const offsetX = offsetDistance * Math.cos(offsetAngle) + Math.abs(Math.cos(offsetAngle)) * (boxWidth / 2) * Math.cos(offsetAngle);
    const offsetY = offsetDistance * Math.sin(offsetAngle) + Math.abs(Math.sin(offsetAngle)) * (boxHeight / 2) * Math.sin(offsetAngle);

    const cx = xPx + offsetX;
    const cy = yPx + offsetY;

    return [
      { x: cx - boxWidth / 2, y: cy - boxHeight / 2 },
      { x: cx + boxWidth / 2, y: cy - boxHeight / 2 },
      { x: cx + boxWidth / 2, y: cy + boxHeight / 2 },
      { x: cx - boxWidth / 2, y: cy + boxHeight / 2 },
    ];
  }

  drawRacetrack(x, y, length, width, orientation, leftSide, color) {
    const nmToPx = this.nmToPixels;
    const lengthPx = length * nmToPx;
    const widthPx = width * nmToPx;
    const radius = widthPx / 2;
    const straight = lengthPx - widthPx;
    const angle = (orientation - (Math.PI / 2));

    // Determine the local coordi}nates of the racetrack's endpoint
    // It is always at (straight/2, ±radius) depending on the turn direction
    const endLocalX = straight / 2;
    const endLocalY = leftSide ? radius : -radius;

    // Rotate to get the offset to align end point with (x, y)
    const offsetX = endLocalX * Math.cos(angle) - endLocalY * Math.sin(angle);
    const offsetY = endLocalX * Math.sin(angle) + endLocalY * Math.cos(angle);

    // Compute racetrack center so that final endpoint lands on (x, y)
    const xPx = (x * nmToPx) + this.centerX - offsetX;
    const yPx = (y * nmToPx) + this.centerY - offsetY;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;

    this.ctx.save();
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(angle);
    this.ctx.beginPath();

    if (leftSide) {
      // First turn left (top semi-circle)
      this.ctx.moveTo(-straight / 2, radius);
      this.ctx.arc(-straight / 2, 0, radius, Math.PI / 2, -Math.PI / 2, false);
      this.ctx.lineTo(straight / 2, -radius);
      this.ctx.arc(straight / 2, 0, radius, -Math.PI / 2, Math.PI / 2, false);
    } else {
      // First turn right (bottom semi-circle)
      this.ctx.moveTo(-straight / 2, -radius);
      this.ctx.arc(-straight / 2, 0, radius, -Math.PI / 2, Math.PI / 2, true);
      this.ctx.lineTo(straight / 2, radius);
      this.ctx.arc(straight / 2, 0, radius, Math.PI / 2, -Math.PI / 2, true);
    }

    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawDirectDistanceMarkers(legStartX, legStartY, legEndX, legEndY, targetX, targetY, stepNm, nmToCanvasPx, color = 'black', side = 1, startMarginPx = 0, endMarginPx = 0) {
    const dx = legEndX - legStartX;
    const dy = legEndY - legStartY;
    const legLenPx = Math.hypot(dx, dy);
    if (legLenPx < 1) return;

    const ux = dx / legLenPx;
    const uy = dy / legLenPx;
    const rx = uy * side;
    const ry = -ux * side;

    const tickLength = 15;
    let labelOffset = 19;
    let textAngle = Math.atan2(ry, rx);
    let textAlign = 'left';
    const P4 = Math.PI / 4;
    if (Math.abs(textAngle) > 3 * P4) {
      textAngle -= Math.PI; textAlign = 'right';
    } else if (textAngle > P4) {
      textAngle -= Math.PI / 2; textAlign = 'center'; labelOffset = 26;
    } else if (textAngle > -P4) {
      textAlign = 'left';
    } else {
      textAngle += Math.PI / 2; textAlign = 'center'; labelOffset = 26;
    }

    // Quadratic coefficients: |legStart + t*d - target|^2 = (k*stepNm*nmToCanvasPx)^2
    const ex = legStartX - targetX;
    const ey = legStartY - targetY;
    const a = dx * dx + dy * dy;
    const b2 = 2 * (ex * dx + ey * dy);

    const distStartNm = Math.hypot(legStartX - targetX, legStartY - targetY) / nmToCanvasPx;
    const distEndNm = Math.hypot(legEndX - targetX, legEndY - targetY) / nmToCanvasPx;
    const kMin = Math.ceil(Math.min(distStartNm, distEndNm) / stepNm);
    const kMax = Math.floor(Math.max(distStartNm, distEndNm) / stepNm);

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = color;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = 'middle';

    for (let k = kMin; k <= kMax; k++) {
      const rPx = k * stepNm * nmToCanvasPx;
      const c = ex * ex + ey * ey - rPx * rPx;
      const disc = b2 * b2 - 4 * a * c;
      if (disc < 0) continue;
      const sqrtD = Math.sqrt(disc);

      for (const t of [(-b2 - sqrtD) / (2 * a), (-b2 + sqrtD) / (2 * a)]) {
        if (t < 0 || t > 1) continue;
        const dFromStart = t * legLenPx;
        if (dFromStart < startMarginPx || dFromStart > legLenPx - endMarginPx) continue;

        const tx = legStartX + t * dx;
        const ty = legStartY + t * dy;

        this.ctx.beginPath();
        this.ctx.moveTo(tx, ty);
        this.ctx.lineTo(tx + rx * tickLength, ty + ry * tickLength);
        this.ctx.stroke();

        this.ctx.save();
        this.ctx.translate(tx + rx * labelOffset, ty + ry * labelOffset);
        this.ctx.rotate(textAngle);
        this.ctx.fillText(`${k * stepNm}`, 0, 0);
        this.ctx.restore();
      }
    }

    this.ctx.restore();
  }

  drawTurnArc(x, y, radius, startAngle, endAngle, clockwise, color = 'black', lineWidth = 2) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, radius, startAngle, endAngle, !clockwise);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawGate(x, y, length, angle, color) {
    const lengthPx = length;
    const widthPx = (length / 2.5);
    const obliquePx = (length / 3);

    const halfLength = lengthPx / 2;
    const halfWidth = widthPx / 2;

    // Calculate the center position in pixels
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    // Save the canvas state
    this.ctx.save();

    // Translate and rotate the canvas
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(angle);

    // Remove elements behind the text to ensure its readable.
    this.ctx.clearRect(-halfWidth, -halfLength, widthPx, lengthPx);

    // Draw the parallel lines
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;

    this.ctx.beginPath();
    this.ctx.moveTo(-halfWidth, -halfLength); // Left parallel line start
    this.ctx.lineTo(-halfWidth, halfLength); // Left parallel line end

    this.ctx.moveTo(halfWidth, -halfLength); // Right parallel line start
    this.ctx.lineTo(halfWidth, halfLength); // Right parallel line end

    // Draw the oblique lines at both ends
    this.ctx.moveTo(-halfWidth, -halfLength); // Top left oblique line start
    this.ctx.lineTo(-halfWidth - obliquePx, -halfLength - obliquePx); // Top left oblique line end

    this.ctx.moveTo(-halfWidth, halfLength); // Bottom left oblique line start
    this.ctx.lineTo(-halfWidth - obliquePx, halfLength + obliquePx); // Bottom left oblique line end

    this.ctx.moveTo(halfWidth, -halfLength); // Top right oblique line start
    this.ctx.lineTo(halfWidth + obliquePx, -halfLength - obliquePx); // Top right oblique line end

    this.ctx.moveTo(halfWidth, halfLength); // Bottom right oblique line start
    this.ctx.lineTo(halfWidth + obliquePx, halfLength + obliquePx); // Bottom right oblique line end

    this.ctx.stroke();

    // Restore the canvas state
    this.ctx.restore();
  }

  drawAirbase(x, y, angle, color) {
    const radius = 10;

    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;

    this.ctx.save();
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(angle - Math.PI / 2);

    // Clip canvas to circle and fill it.
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.clip();

    // Rectangle
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(-radius, -radius / 4, radius * 2, radius * 0.5);

    // Circle border.
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawAircraft(x, y, angle, quantity, color) {
    const length = 20;
    const width = 15;
    const offsetDistance = 8;
    const offsetAngle = Math.PI / 6;

    const aircraftOffsetX = offsetDistance * Math.cos(angle + offsetAngle);
    const aircraftOffsetY = offsetDistance * Math.sin(angle + offsetAngle);

    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    this.ctx.fillStyle = color;

    for (let i = quantity - 1; i >= 0; i--) {
      this.ctx.save();
      this.ctx.translate(xPx + (aircraftOffsetX * i), yPx + (aircraftOffsetY * i));
      this.ctx.rotate(angle - Math.PI);

      // Aircraft shape
      this.ctx.beginPath();
      this.ctx.moveTo(-width / 2, -length / 2);
      this.ctx.lineTo(0, length / 2);
      this.ctx.lineTo(width / 2, -length / 2);
      this.ctx.lineTo(0, -length / 4);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  drawArrow(x, y, angle, length, width, color) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;
    length *= this.nmToPixels;
    width *= this.nmToPixels;

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;

    this.ctx.save();
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(angle - Math.PI);


    this.ctx.beginPath();
    this.ctx.moveTo(width / 4, -length / 2);
    this.ctx.lineTo(width / 4, (length / 2) - (width / 1));
    this.ctx.lineTo(width / 2, (length / 2) - (width / 1));
    this.ctx.lineTo(0, length / 2);
    this.ctx.lineTo(-width / 2, (length / 2) - (width / 1));
    this.ctx.lineTo(-width / 4, (length / 2) - (width / 1));
    this.ctx.lineTo(-width / 4, -length / 2);
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.clearRect(-width / 2, -length / 2, width, length);

    this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(angle - Math.PI);

    this.ctx.beginPath();
    this.ctx.moveTo(width / 4, -length / 2);
    this.ctx.lineTo(width / 4, (length / 2) - (width / 1));
    this.ctx.lineTo(width / 2, (length / 2) - (width / 1));
    this.ctx.lineTo(0, length / 2);
    this.ctx.lineTo(-width / 2, (length / 2) - (width / 1));
    this.ctx.lineTo(-width / 4, (length / 2) - (width / 1));
    this.ctx.lineTo(-width / 4, -length / 2);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawImage(image, x, y, scale, rotation) {
    const drawW = image.width * scale;
    const drawH = image.height * scale;
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.drawImage(image, -drawW / 2, -drawH / 2, drawW, drawH);
    this.ctx.restore();
  }

  drawSelectionOutline(bounds, strokeWidth = 3, color = '#4af', drawAimingCross = false, aimingCrossColor = 'black') {
    bounds = bounds.slice(0, 4);
    const pixelBounds = bounds.map(bound => ({
      x: (bound.x * this.nmToPixels) + this.centerX,
      y: (bound.y * this.nmToPixels) + this.centerY
    }));

    const padding = 4;
    const cx = pixelBounds.reduce((sum, p) => sum + p.x, 0) / pixelBounds.length;
    const cy = pixelBounds.reduce((sum, p) => sum + p.y, 0) / pixelBounds.length;
    const paddedBounds = pixelBounds.map(p => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const len = Math.sqrt(dx * dx + dy * dy);
      return { x: p.x + (dx / len) * padding, y: p.y + (dy / len) * padding };
    });

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;
    this.ctx.setLineDash([2, 2]);
    this.ctx.beginPath();
    this.ctx.moveTo(paddedBounds[0].x, paddedBounds[0].y);
    for (let i = 1; i < paddedBounds.length; i++) {
      this.ctx.lineTo(paddedBounds[i].x, paddedBounds[i].y);
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();

    this.ctx.setLineDash([0]);

    if (drawAimingCross) {
      this.ctx.strokeStyle = aimingCrossColor;
      this.ctx.lineWidth = 1;

      this.ctx.beginPath();
      this.ctx.moveTo(pixelBounds[0].x, pixelBounds[0].y);
      this.ctx.lineTo(pixelBounds[2].x, pixelBounds[2].y);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(pixelBounds[1].x, pixelBounds[1].y);
      this.ctx.lineTo(pixelBounds[3].x, pixelBounds[3].y);
      this.ctx.stroke();
    }
  }
}