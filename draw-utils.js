class DrawUtils {
  constructor() {
    this.canvas = $('.map-canvas')[0];
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.defaultScale = 100;
    this.nmToPixels = (this.width / 2) / this.defaultScale;
  }

  clearCanvas() {
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

  setScale(furthestPoint) {
    // Ensure the furthest point fits within the canvas
    const maxRadius = Math.min(this.width, this.height) / 2;
    this.nmToPixels = maxRadius / furthestPoint;
  }

  setCenter(x, y) {
    this.centerX = (this.width / 2) - (x * this.nmToPixels);
    this.centerY = (this.height / 2) - (y * this.nmToPixels);
  }

  setToBackground() {
    this.ctx.globalCompositeOperation = 'destination-over';
  }

  setToForeground() {
    this.ctx.globalCompositeOperation = 'source-over';
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
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
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

  drawFullSquare(x, y, color, length = 10) {
    const xPx = (x * this.nmToPixels) + this.centerX - (length / 2);
    const yPx = (y * this.nmToPixels) + this.centerY - (length / 2);

    this.ctx.fillStyle = color;

    this.ctx.fillRect(xPx, yPx, length, length);
  }

  drawLine(startX, startY, endX, endY, color, strokeWidth = 1) {
    const startXPx = (startX * this.nmToPixels) + this.centerX;
    const startYPx = (startY * this.nmToPixels) + this.centerY;
    const endXPx = (endX * this.nmToPixels) + this.centerX;
    const endYPx = (endY * this.nmToPixels) + this.centerY;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(startXPx, startYPx);
    this.ctx.lineTo(endXPx, endYPx);
    this.ctx.stroke();
  }

  drawBorder(startX, startY, endX, endY, color, strokeWidth = 1, crossSpacing = 40, crossSize = 15) {
    const startXPx = (startX * this.nmToPixels) + this.centerX;
    const startYPx = (startY * this.nmToPixels) + this.centerY;
    const endXPx = (endX * this.nmToPixels) + this.centerX;
    const endYPx = (endY * this.nmToPixels) + this.centerY;

    const ctx = this.ctx;

    // Draw the main border line
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.moveTo(startXPx, startYPx);
    ctx.lineTo(endXPx, endYPx);
    ctx.stroke();

    // Calculate the angle of the line
    const angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);

    // Calculate the length of the line
    const lineLength = Math.sqrt((endXPx - startXPx) ** 2 + (endYPx - startYPx) ** 2);

    // If the line is shorter than half the crossSpacing, don't draw any crosses
    if (lineLength < crossSpacing / 2) {
      return;
    }

    // Calculate the starting point for crosses (middle of the line)
    const middleX = startXPx + (endXPx - startXPx) / 2;
    const middleY = startYPx + (endYPx - startYPx) / 2;

    // Draw crosses along the line
    for (let i = -Math.floor(lineLength / (2 * crossSpacing)) * crossSpacing; i <= Math.floor(lineLength / (2 * crossSpacing)) * crossSpacing; i += crossSpacing) {
      const crossX = middleX + i * Math.cos(angle);
      const crossY = middleY + i * Math.sin(angle);

      ctx.save();
      ctx.translate(crossX, crossY);
      ctx.rotate(angle + Math.PI / 4);

      // Draw the cross
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;

      ctx.beginPath();
      ctx.moveTo(-crossSize / 2, 0);
      ctx.lineTo(crossSize / 2, 0);
      ctx.moveTo(0, -crossSize / 2);
      ctx.lineTo(0, crossSize / 2);
      ctx.stroke();

      ctx.restore();
    }
  }

  drawInfiniteLine(x, y, angle, color, isDashed = false) {
    const ctx = this.ctx;

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
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    if (isDashed) {
      ctx.setLineDash([5, 5]); // Set dashed line pattern (5px dash, 5px gap)
    } else {
      ctx.setLineDash([]); // Reset to solid line
    }

    ctx.beginPath();
    ctx.moveTo(endXPx1, endYPx1);
    ctx.lineTo(endXPx2, endYPx2);
    ctx.stroke();

    // Reset line dash to default (solid) after drawing
    ctx.setLineDash([]);
  }

  drawRing(x, y, radius, color, strokeWidth = 1) {
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;
    const radiusPx = radius * this.nmToPixels

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

    this.ctx.beginPath();
    this.ctx.arc(xPx, yPx, radiusPx, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawText(x, y, text, offsetDistance = 0, offsetAngle = 0, textAngle = 0, fontSize = 12) {
    let xPx = (x * this.nmToPixels) + this.centerX;
    let yPx = (y * this.nmToPixels) + this.centerY;

    // Apply offset distance and angle
    xPx += offsetDistance * Math.cos(offsetAngle);
    yPx += offsetDistance * Math.sin(offsetAngle);

    const ctx = this.ctx;

    // Save the current canvas state
    ctx.save();

    // Translate to the text position
    ctx.translate(xPx, yPx);

    // Rotate the canvas to the specified text angle
    ctx.rotate(textAngle);

    // Measure text dimensions
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize;

    if (this.ctx.globalCompositeOperation == 'destination-over') {
      // Draw the text
      ctx.fillStyle = 'black';
      ctx.fillText(text, 0, 0);

      // Draw white background rectangle
      ctx.fillStyle = "white";
      ctx.fillRect((-textWidth / 2), (-textHeight / 2) - 1, textWidth, textHeight);
    } else {
      // Draw white background rectangle
      ctx.fillStyle = "white";
      ctx.fillRect((-textWidth / 2), (-textHeight / 2) - 1, textWidth, textHeight);

      // Draw the text
      ctx.fillStyle = 'black';
      ctx.fillText(text, 0, 0);
    }

    // Restore the canvas state
    ctx.restore();
  }

  drawFamedText(x, y, text, offsetDistance = 0, offsetAngle = 0) {
    const padding = 2;
    let xPx = (x * this.nmToPixels) + this.centerX - padding;
    let yPx = (y * this.nmToPixels) + this.centerY - padding;

    this.ctx.font = "12px sans-serif";
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const metrics = this.ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = 12;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = textHeight + padding * 2;

    xPx += offsetDistance * Math.cos(offsetAngle);
    yPx += offsetDistance * Math.sin(offsetAngle);

    // Draw white background rectangle
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(xPx - textWidth / 2, yPx - textHeight / 2, boxWidth, boxHeight);

    // Draw black line
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(xPx - textWidth / 2, yPx - textHeight / 2, boxWidth, boxHeight);

    // Draw the text centered in the rectangle
    this.ctx.fillStyle = "black";
    this.ctx.fillText(text, xPx + padding - 1, yPx + padding + 1);
  }

  drawRacetrack(x, y, length, width, orientation, leftSide, color) {
    /*
        const racetrackX = capX - ((6 / this.drawUtils.nmToPixels) * Math.cos((this.cap.orientation + 90) * Math.PI / 180));
        const racetrackY = capY - ((6 / this.drawUtils.nmToPixels) * Math.cos((this.cap.orientation) * Math.PI / 180));;
   
        console.log(((6 / this.drawUtils.nmToPixels) * Math.max(0.0, Math.cos((this.cap.orientation + 90) * Math.PI / 180))))*/

    const nmToPx = this.nmToPixels;
    const lengthPx = length * nmToPx;
    const widthPx = width * nmToPx;
    const radius = widthPx / 2;
    const straight = lengthPx - widthPx;
    const angle = (orientation - 90) * Math.PI / 180;

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

    const ctx = this.ctx;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.save();
    ctx.translate(xPx, yPx);
    ctx.rotate(angle);
    ctx.beginPath();

    if (leftSide) {
      // First turn left (top semi-circle)
      ctx.moveTo(-straight / 2, radius);
      ctx.arc(-straight / 2, 0, radius, Math.PI / 2, -Math.PI / 2, false);
      ctx.lineTo(straight / 2, -radius);
      ctx.arc(straight / 2, 0, radius, -Math.PI / 2, Math.PI / 2, false);
    } else {
      // First turn right (bottom semi-circle)
      ctx.moveTo(-straight / 2, -radius);
      ctx.arc(-straight / 2, 0, radius, -Math.PI / 2, Math.PI / 2, true);
      ctx.lineTo(straight / 2, radius);
      ctx.arc(straight / 2, 0, radius, Math.PI / 2, -Math.PI / 2, true);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawGate(x, y, length, angle, color) {
    const lengthPx = length;
    const widthPx = (length / 2.5);
    const obliquePx = (length / 3);

    const halfLength = lengthPx / 2;
    const halfWidth = widthPx / 2;

    const angleRad = angle * Math.PI / 180;

    // Calculate the center position in pixels
    const xPx = (x * this.nmToPixels) + this.centerX;
    const yPx = (y * this.nmToPixels) + this.centerY;

    // Save the canvas state
    this.ctx.save();

    // Translate and rotate the canvas
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(angleRad);

    // Draw the white background
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(-halfWidth, -halfLength, widthPx, lengthPx);

    // Draw the parallel lines
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = '2';

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
}