defaultBullseyeRingsRange = 20;
defaultBullseyeLinesAngle = 30;


class BullseyeMapGenerator {
  constructor() {
    this.drawUtils = new DrawUtils();

    this.cap = {}; // Cap point
    this.areaPoints = []; // List of area points

    this.displayBullseye = true;
    this.bullseyeName = '';
    this.limitBullseyeToArea = true;
    this.ringsRange = 0;
    this.linesAngle = 0;
    this.halfAnglesLines = true;

    this.furthestPoint = 0;
    this.furthestPointMargin = 1.2;
    this.defaultScale = 100; // Default scale (width in NM)

    this.initDownloadButton();
    $('.update-field').on('input', () => this.updateMap());
    this.initAddAreaPoint();
    this.updateMap(); // Initial map rendering
  }

  initDownloadButton() {
    $('.download-map-button').on('click', () => {
      const link = document.createElement('a');
      link.download = 'bullseye_map.png';
      link.href = $('.map-canvas')[0].toDataURL('image/png');
      link.click();
    });
  }

  initAddAreaPoint() {
    // Add event listener to the "Add Area Point" button
    $('.add-area-point-button').on('click', () => {
      const newPoint = $('.area-point').first().clone(); // Clone the first area point
      newPoint.find('input').val(''); // Clear input values
      $('.area-points-subcontainer').append(newPoint); // Add the cloned point to the container

      // Add input listeners to the new area point
      newPoint.find('.update-field').on('input', () => this.updateMap());
    });
  }

  getInputParameters() {
    this.displayBullseye = $('.display-bullseye').is(':checked');
    this.limitBullseyeToArea = $('.limit-bullseye-to-area').is(':checked');
    this.bullseyeName = $('.bullseye-name').val();
    this.ringsRange = $('.rings-range').val() != '' ? parseFloat($('.rings-range').val()) : defaultBullseyeRingsRange;
    this.linesAngle = $('.lines-angle').val() != '' ? parseInt($('.lines-angle').val()) : defaultBullseyeLinesAngle;
    this.halfAnglesLines = $('.half-angle-lines').is(':checked');

    // Get values from CAP input fields
    const capPointName = $('.cap-point-name').val();
    const capName = $('.cap-name').val();
    const capDistance = parseFloat($('.cap-distance').val());
    const capAzimuth = parseFloat($('.cap-azimuth').val());
    const racetrackLength = parseFloat($('.cap-length').val());
    const racetrackWidth = parseFloat($('.cap-width').val());
    const racetrackOrientation = parseFloat($('.cap-orientation').val());
    const racetrackSide = parseInt($('.cap-side').val());

    // Update CAP parameters if valid, otherwise set to null
    this.cap = {
      pointName: capPointName,
      name: capName,
      distance: isNaN(capDistance) ? null : capDistance,
      azimuth: isNaN(capAzimuth) ? null : capAzimuth,
      length: isNaN(racetrackLength) ? null : racetrackLength,
      width: isNaN(racetrackWidth) ? null : racetrackWidth,
      orientation: isNaN(racetrackOrientation) ? null : racetrackOrientation,
      leftSide: racetrackSide == 1,
    };

    const angleToCap = (this.cap.azimuth - 90) * Math.PI / 180;
    this.cap.x = this.cap.distance * Math.cos(angleToCap);
    this.cap.y = this.cap.distance * Math.sin(angleToCap);

    this.cap.corners = [];
    this.cap.corners.push({
      x: this.cap.x + ((this.cap.width / 2) * Math.cos((this.cap.orientation - 90) * Math.PI / 180)),
      y: this.cap.y - ((this.cap.width / 2) * Math.cos(this.cap.orientation * Math.PI / 180))
    });

    this.cap.corners.push({
      x: this.cap.corners[0].x - (this.cap.length * Math.cos((this.cap.orientation - 90) * Math.PI / 180)),
      y: this.cap.corners[0].y + (this.cap.length * Math.cos(this.cap.orientation * Math.PI / 180))
    });

    let thirdCornerX, thirdCornerY, fourthCornerX, fourthCornerY;
    if (this.cap.leftSide) {
      this.cap.corners.push({
        x: this.cap.corners[0].x - (this.cap.length * Math.cos((this.cap.orientation - 90) * Math.PI / 180)) - (this.cap.width * Math.cos(this.cap.orientation * Math.PI / 180)),
        y: this.cap.corners[0].y + (this.cap.length * Math.cos(this.cap.orientation * Math.PI / 180)) - (this.cap.width * Math.cos((this.cap.orientation - 90) * Math.PI / 180))
      });

      this.cap.corners.push({
        x: this.cap.corners[0].x - (this.cap.width * Math.cos(this.cap.orientation * Math.PI / 180)),
        y: this.cap.corners[0].y - (this.cap.width * Math.cos((this.cap.orientation - 90) * Math.PI / 180))
      });
    } else {
      this.cap.corners.push({
        x: this.cap.corners[0].x - (this.cap.length * Math.cos((this.cap.orientation - 90) * Math.PI / 180)) + (this.cap.width * Math.cos(this.cap.orientation * Math.PI / 180)),
        y: this.cap.corners[0].y + (this.cap.length * Math.cos(this.cap.orientation * Math.PI / 180)) + (this.cap.width * Math.cos((this.cap.orientation - 90) * Math.PI / 180))
      });

      this.cap.corners.push({
        x: this.cap.corners[0].x + (this.cap.width * Math.cos(this.cap.orientation * Math.PI / 180)),
        y: this.cap.corners[0].y + (this.cap.width * Math.cos((this.cap.orientation - 90) * Math.PI / 180))
      });
    }

    // Get values from area points
    this.areaPoints = [];
    $('.area-point').each((index, element) => {
      const name = $(element).find('.area-point-name').val();
      const azimuth = parseFloat($(element).find('.area-point-azimuth').val());
      const distance = parseFloat($(element).find('.area-point-distance').val());

      if (!isNaN(azimuth) && !isNaN(distance)) {
        this.areaPoints.push({ name, azimuth, distance });
      }
    });

    this.areaPoints.map((point, index) => {
      const angleRad = (point.azimuth - 90) * Math.PI / 180; // Convert azimuth to canvas coordinates
      this.areaPoints[index].x = point.distance * Math.cos(angleRad); // Convert distance to x-coordinate
      this.areaPoints[index].y = point.distance * Math.sin(angleRad); // Convert distance to y-coordinate
    });
  }

  updateMap() {
    console.log('updateMap');

    this.furthestPoint = 0;

    this.getInputParameters();

    this.drawUtils.clearCanevas();
    this.drawUtils.setToForeground();

    // Recalculate scale and redraw map
    this.runScale();

    // Draw CAP point
    this.runCapPoint();

    // Draw area points
    this.runAreaPoints();

    // Draw bullseye
    if (this.displayBullseye) this.runBullseye();

    this.drawUtils.drawBackground('white');
  }

  runScale() {
    // Determine the furthest graphic distance
    this.furthestPoint = this.defaultScale;

    // Initialize bounding box variables
    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    // Include CAP point and racetrack in bounding box
    if (this.cap.azimuth !== null && this.cap.distance !== null) {
      minX = Math.min(minX, this.cap.x);
      maxX = Math.max(maxX, this.cap.x);
      minY = Math.min(minY, this.cap.y);
      maxY = Math.max(maxY, this.cap.y);

      if (this.cap.length !== null && this.cap.width !== null && this.cap.orientation !== null) {
        this.cap.corners.forEach((corner) => {
          minX = Math.min(minX, corner.x);
          maxX = Math.max(maxX, corner.x);
          minY = Math.min(minY, corner.y);
          maxY = Math.max(maxY, corner.y);
        });
      }
    }

    // Include area points in bounding box
    this.areaPoints.forEach((point, index) => {
      minX = Math.min(minX, this.areaPoints[index].x);
      maxX = Math.max(maxX, this.areaPoints[index].x);
      minY = Math.min(minY, this.areaPoints[index].y);
      maxY = Math.max(maxY, this.areaPoints[index].y);
    });

    // Calculate the center of the bounding box
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const maxDistance = Math.max(maxX - centerX, maxY - centerY, minX - centerX, minY - centerY);

    this.furthestPoint = maxDistance * this.furthestPointMargin;

    if (this.furthestPoint == 0) this.furthestPoint = this.defaultScale;

    // Update the scale in DrawUtils
    this.drawUtils.setScale(this.furthestPoint);

    // Update DrawUtils center
    this.drawUtils.setCenter(centerX, centerY);
  }

  runCapPoint() {
    // Check for valid CAP parameters
    if (this.cap.azimuth != null && this.cap.distance != null) {
      const angleToCap = (this.cap.azimuth - 90) * Math.PI / 180;
      const capX = this.cap.distance * Math.cos(angleToCap);
      const capY = this.cap.distance * Math.sin(angleToCap);

      if (this.cap.length != null && this.cap.width != null && this.cap.orientation != null) {
        // Draw CAP racetrack.
        this.drawUtils.drawRacetrack(capX, capY, this.cap.length, this.cap.width, this.cap.orientation, this.cap.leftSide, 'black')


        if (this.cap.name != '') {
          const { x: capNameX, y: capNameY } = this.getCenter(this.cap.corners);

          let capNameAngle = (this.cap.orientation + 90);
          if (capNameAngle >= 270) {
            capNameAngle -= 180;
          } else if (capNameAngle >= 90) {
            capNameAngle -= 180;
          }

          // Draw CAP name.
          this.drawUtils.drawText(capNameX, capNameY, this.cap.name, 0, 0, capNameAngle * Math.PI / 180, 10);
        }
      }

      if (this.cap.pointName != '') {
        // Draw CAP point name.
        this.drawUtils.drawFamedText(capX, capY, this.cap.pointName);
      }
    }
  }

  runAreaPoints() {
    // Draw each point and its name
    this.areaPoints.forEach((point, index) => {
      if (point.name != '') {
        let farthestAngle = 0;
        if (this.areaPoints.length > 1) {
          // Determine the angle for placing the name
          const prevPoint = this.areaPoints[(index - 1 + this.areaPoints.length) % this.areaPoints.length];
          const nextPoint = this.areaPoints[(index + 1) % this.areaPoints.length];

          const angleToPrev = Math.atan2(prevPoint.y - point.y, prevPoint.x - point.x);
          const angleToNext = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);

          // Find the angle farthest from the previous and next points
          farthestAngle = this.getFarthestAngle(angleToPrev, angleToNext);
        }

        // Draw the name
        this.drawUtils.drawFamedText(point.x, point.y, point.name, 7, farthestAngle);
      }
    });

    if (this.areaPoints.length > 1) {
      // Draw lines between points to form a polygon
      for (let i = 0; i < this.areaPoints.length; i++) {
        const startPoint = this.areaPoints[i];
        const endPoint = this.areaPoints[(i + 1) % this.areaPoints.length]; // Wrap around to the first point

        this.drawUtils.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 'black', 3);
      }
    }
  }

  runBullseye() {
    this.drawUtils.setToBackground();
    if (this.limitBullseyeToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    // Draw bullseye dot
    this.drawUtils.drawBullseye(0, 0, 'black');

    const maxRadius = this.furthestPoint * this.furthestPointMargin; // Furthest point determines the maximum radius
    const ringCount = Math.ceil(maxRadius / this.ringsRange); // Calculate how many rings to draw

    // Draw rings
    for (let i = 1; i <= ringCount + 1; i++) {
      const radius = i * this.ringsRange;
      this.drawUtils.drawRing(0, 0, '#555', radius); // Draw each ring
    }

    // Draw cardinal lines
    const linesAngle = this.halfAnglesLines ? this.getClosestDivisorTo90(this.linesAngle) / 2 : this.getClosestDivisorTo90(this.linesAngle);

    let dashed = false;
    for (let angle = 0; angle < 180; angle += linesAngle) {
      const angleRad = angle * Math.PI / 180;
      this.drawUtils.drawInfiniteLine(0, 0, angleRad, '#555', dashed); // Draw lines at specified angles

      if (this.halfAnglesLines) {
        dashed = !dashed;
      }
    }

    this.drawUtils.unclipCanevas();
    this.drawUtils.setToForeground();

    const displayedAngles = [];
    let displayText = true;
    for (let angle = 0; angle < 360; angle += linesAngle) {
      if (displayText) {
        const angleRad = angle * Math.PI / 180;

        // Calculate intersection points with area point lines
        this.areaPoints.forEach((point, index) => {
          const nextPoint = this.areaPoints[(index + 1) % this.areaPoints.length]; // Wrap around to the first point

          const intersection = this.getIntersectionWithLine(
            { x: 0, y: 0, angle: angleRad }, // Bullseye line
            { start: point, end: nextPoint } // Area point line
          );

          if (intersection) {
            const textAngle = (angle + 90) % 360;
            if (!displayedAngles.includes(textAngle)) {
              this.drawUtils.drawText(intersection.x, intersection.y, `${textAngle}°`, 4.5, angle * Math.PI / 180);
              displayedAngles.push(textAngle);
            }
          }
        });
      }

      if (this.halfAnglesLines) {
        displayText = !displayText;
      }
    }
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
      return { x: intersectionX, y: intersectionY };
    }

    return null; // No valid intersection
  }

  getCenter(points) {
    if (points.length === 0) {
      return { x: 0, y: 0 };
    }

    let sumX = 0;
    let sumY = 0;

    // Sum up all x and y coordinates
    points.forEach((point) => {
      sumX += point.x;
      sumY += point.y;
    });

    // Calculate the average of x and y coordinates
    const centerX = sumX / points.length;
    const centerY = sumY / points.length;

    return { x: centerX, y: centerY };
  }
}

$(document).ready(function () {
  const bullseyeMap = new BullseyeMapGenerator();
});