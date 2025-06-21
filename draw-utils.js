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

  drawLine(startX, startY, endX, endY, color, strokeWidth = 1, type = 'simple') {
    const startXPx = (startX * this.nmToPixels) + this.centerX;
    const startYPx = (startY * this.nmToPixels) + this.centerY;
    const endXPx = (endX * this.nmToPixels) + this.centerX;
    const endYPx = (endY * this.nmToPixels) + this.centerY;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;

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
        const angle = Math.atan2(endYPx - startYPx, endXPx - startXPx);

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

  drawText(x, y, text, type = 'square', offsetDistance = 0, offsetAngle = 0, textAngle = 0, padding = 2) {
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

    this.ctx.save();
    this.ctx.translate(xPx, yPx);
    this.ctx.rotate(textAngle);

    let textX = 0, textY = 0;
    switch (type) {
      case 'square':
        // Draw black square with white background
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(-textWidth / 2, (-padding / 2) - textHeight / 2, boxWidth, boxHeight);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(-textWidth / 2, (-padding / 2) - textHeight / 2, boxWidth, boxHeight);

        textX = padding;
        textY = padding;
        break;
      case 'triangle':
        // Draw black triangle with white background
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(padding, (-boxHeight / 2) + (padding / 2));
        this.ctx.lineTo((boxHeight / 2) + padding, (boxHeight / 2) + (padding / 2));
        this.ctx.lineTo((-boxHeight / 2) + padding, (boxHeight / 2) + (padding / 2));
        this.ctx.fill();

        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, (-boxHeight / 2) + (padding / 2));
        this.ctx.lineTo((boxHeight / 2) + padding, (boxHeight / 2) + (padding / 2));
        this.ctx.lineTo((-boxHeight / 2) + padding, (boxHeight / 2) + (padding / 2));
        this.ctx.closePath();
        this.ctx.stroke();

        textX = padding;
        textY = padding * 1.3;

        if (text.length > 2) {
          this.ctx.fillStyle = "white";
          this.ctx.fillRect(textX - (textWidth / 2), textY - (textHeight / 2), textWidth, textHeight);
        }
        break;
      case 'no-border':
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
    this.ctx.fillStyle = "black";
    this.ctx.fillText(text, textX, textY);

    this.ctx.restore();
  }

  drawRacetrack(x, y, length, width, orientation, leftSide, color) {
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

    // Remove elements behind the text to ensure its readable.
    this.ctx.clearRect(-halfWidth, -halfLength, widthPx, lengthPx);

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