defaultBullseyeRingsRange = 20;
defaultBullseyeLinesAngle = 30;

bullseyeDataKey = 'bullseye-data';
capPointDataKey = 'cap-point-data';
areaPointsDataKey = 'area-points-data';
bordersDataKey = 'borders-data';
ringsDataKey = 'rings-data';

class BullseyeMapGenerator {
  constructor() {
    this.utils = new Utils();
    this.drawUtils = new DrawUtils();

    // Bullseye
    this.bullseye = {};

    this.capPoint = {};
    this.areaPoints = [];
    this.borders = [];
    this.rings = [];

    this.furthestPoint = 0;
    this.furthestPointMargin = 1.2;
    this.defaultScale = 100;

    this.getData();

    $('.download-map-button').on('click', () => {
      const link = document.createElement('a');
      link.download = 'bullseye_map.png';
      link.href = $('.map-canvas')[0].toDataURL('image/png');
      link.click();
    });

    $('.reset-fields-button').on('click', () => {
      if (window.confirm('Are you sure ? All data will be lost.')) {
        $('input[type=text].update-field').val('');
        $('input[type=number].update-field').val('');

        $('.display-bullseye').prop('checked', true);
        $('.limit-bullseye-to-area').prop('checked', true);
        $('.half-angle-lines').prop('checked', true);

        $('.bullseye-name-angle').val($('.bullseye-name-angle').prop('max') / 2);
        $('.ring-range-angle').val($('.ring-range-angle').prop('max') / 2);

        $('.cap-side').val(1);

        $('.area-point:not(:first)').remove();
        $('.border:not(:first)').remove();
        $('.ring:not(:first)').remove();

        this.updateMap();
      }
    });

    $('.add-area-point-button, .add-border-button, .add-ring-button').on('click', (event) => {
      const elementContainer = $(event.target).siblings('.element-container').first();
      const newPoint = $(elementContainer).find('.element').first().clone();
      newPoint.find('input').val('');
      $(elementContainer).append(newPoint);

      newPoint.find('.update-field').on('input', () => this.updateMap());

      newPoint.find('button').on('click', (event) => this.deleteElement(event));
    });

    $('.delete-area-point-button, .delete-border-button, .delete-ring-button').on('click', (event) => this.deleteElement(event));

    $('.update-field').on('input', () => this.updateMap());

    this.updateMap();
  }

  deleteElement(event) {
    if ($(event.target).closest('.element-container').find('.element').length > 1) {
      $(event.target).closest('.element').remove();
    } else {
      $(event.target).closest('.element').find('.update-field').val('');
    }

    this.updateMap();
  }

  updateMap() {
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

    // Draw borders
    this.runBorders();

    // Draw rings
    this.runRings();

    // Draw bullseye
    if (this.bullseye.display) this.runBullseye();

    this.drawUtils.drawBackground('white');

    this.saveData();
  }

  getInputParameters() {
    // Bullseye
    this.bullseye.display = $('.display-bullseye').is(':checked');
    this.bullseye.limitToArea = $('.limit-bullseye-to-area').is(':checked');
    this.bullseye.name = $('.bullseye-name').val();
    this.bullseye.nameAngle = parseInt($('.bullseye-name-angle').val());
    this.bullseye.ringsRange = $('.rings-range').val() != '' ? parseFloat($('.rings-range').val()) : defaultBullseyeRingsRange;
    this.bullseye.ringsRangeAngle = parseInt($('.ring-range-angle').val())
    this.bullseye.linesAngle = $('.lines-angle').val() != '' ? parseInt($('.lines-angle').val()) : defaultBullseyeLinesAngle;
    this.bullseye.halfAnglesLines = $('.half-angle-lines').is(':checked');

    const capPointName = $('.cap-point-name').val();
    const capName = $('.cap-name').val();
    const capDistance = parseFloat($('.cap-distance').val());
    const capAzimuth = parseFloat($('.cap-azimuth').val());
    const racetrackLength = parseFloat($('.cap-length').val());
    const racetrackWidth = parseFloat($('.cap-width').val());
    const racetrackOrientation = parseFloat($('.cap-orientation').val());
    const racetrackSide = parseInt($('.cap-side').val());

    // CAP point
    this.capPoint = {
      pointName: capPointName,
      name: capName,
      distance: isNaN(capDistance) ? null : capDistance,
      azimuth: isNaN(capAzimuth) ? null : capAzimuth,
      length: isNaN(racetrackLength) ? null : racetrackLength,
      width: isNaN(racetrackWidth) ? null : racetrackWidth,
      orientation: isNaN(racetrackOrientation) ? null : racetrackOrientation,
      leftSide: racetrackSide == 1,
    };

    const angleToCap = (this.capPoint.azimuth - 90) * Math.PI / 180;
    this.capPoint.x = this.capPoint.distance * Math.cos(angleToCap);
    this.capPoint.y = this.capPoint.distance * Math.sin(angleToCap);

    this.capPoint.corners = [];
    this.capPoint.corners.push({
      x: this.capPoint.x + ((this.capPoint.width / 2) * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180)),
      y: this.capPoint.y - ((this.capPoint.width / 2) * Math.cos(this.capPoint.orientation * Math.PI / 180))
    });

    this.capPoint.corners.push({
      x: this.capPoint.corners[0].x - (this.capPoint.length * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180)),
      y: this.capPoint.corners[0].y + (this.capPoint.length * Math.cos(this.capPoint.orientation * Math.PI / 180))
    });

    if (this.capPoint.leftSide) {
      this.capPoint.corners.push({
        x: this.capPoint.corners[0].x - (this.capPoint.length * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180)) - (this.capPoint.width * Math.cos(this.capPoint.orientation * Math.PI / 180)),
        y: this.capPoint.corners[0].y + (this.capPoint.length * Math.cos(this.capPoint.orientation * Math.PI / 180)) - (this.capPoint.width * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180))
      });

      this.capPoint.corners.push({
        x: this.capPoint.corners[0].x - (this.capPoint.width * Math.cos(this.capPoint.orientation * Math.PI / 180)),
        y: this.capPoint.corners[0].y - (this.capPoint.width * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180))
      });
    } else {
      this.capPoint.corners.push({
        x: this.capPoint.corners[0].x - (this.capPoint.length * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180)) + (this.capPoint.width * Math.cos(this.capPoint.orientation * Math.PI / 180)),
        y: this.capPoint.corners[0].y + (this.capPoint.length * Math.cos(this.capPoint.orientation * Math.PI / 180)) + (this.capPoint.width * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180))
      });

      this.capPoint.corners.push({
        x: this.capPoint.corners[0].x + (this.capPoint.width * Math.cos(this.capPoint.orientation * Math.PI / 180)),
        y: this.capPoint.corners[0].y + (this.capPoint.width * Math.cos((this.capPoint.orientation - 90) * Math.PI / 180))
      });
    }

    // Area points
    this.areaPoints = [];
    $('.area-point').each((index, element) => {
      const name = $(element).find('.area-point-name').val();
      const azimuth = parseFloat($(element).find('.area-point-azimuth').val());
      const distance = parseFloat($(element).find('.area-point-distance').val());

      if (!isNaN(azimuth) && !isNaN(distance)) {
        const angleRad = (azimuth - 90) * Math.PI / 180;
        const x = distance * Math.cos(angleRad);
        const y = distance * Math.sin(angleRad);

        this.areaPoints.push({ name, azimuth, distance, x, y });
      }
    });

    // Borders
    this.borders = [];
    $('.border').each((index, element) => {
      const name = $(element).find('.border-name').val();
      const startAzimuth = parseFloat($(element).find('.border-start-azimuth').val());
      const startDistance = parseFloat($(element).find('.border-start-distance').val());
      const endAzimuth = parseFloat($(element).find('.border-end-azimuth').val());
      const endDistance = parseFloat($(element).find('.border-end-distance').val());

      if (!isNaN(startAzimuth) && !isNaN(startDistance) && !isNaN(endAzimuth) && !isNaN(endDistance)) {
        const startAngleRad = (startAzimuth - 90) * Math.PI / 180;
        const startX = startDistance * Math.cos(startAngleRad);
        const startY = startDistance * Math.sin(startAngleRad);

        const endAngleRad = (endAzimuth - 90) * Math.PI / 180;
        const endX = endDistance * Math.cos(endAngleRad);
        const endY = endDistance * Math.sin(endAngleRad);

        this.borders.push({ name, startAzimuth, startDistance, endAzimuth, endDistance, startX, startY, endX, endY });
      }
    });

    // Rings
    this.rings = [];
    $('.ring').each((index, element) => {
      const name = $(element).find('.ring-name').val();
      const azimuth = parseFloat($(element).find('.ring-azimuth').val());
      const distance = parseFloat($(element).find('.ring-distance').val());
      const radius = parseFloat($(element).find('.ring-radius').val());

      if (!isNaN(azimuth) && !isNaN(distance)) {
        const angleRad = (azimuth - 90) * Math.PI / 180;
        const x = distance * Math.cos(angleRad);
        const y = distance * Math.sin(angleRad);

        this.rings.push({ name, azimuth, distance, radius, x, y });
      }
    });
  }

  runScale() {
    // Determine the furthest graphic distance
    this.furthestPoint = 0;

    // Initialize bounding box variables
    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    // Include CAP point and racetrack in bounding box
    if (this.capPoint.azimuth !== null && this.capPoint.distance !== null) {
      minX = Math.min(minX, this.capPoint.x);
      maxX = Math.max(maxX, this.capPoint.x);
      minY = Math.min(minY, this.capPoint.y);
      maxY = Math.max(maxY, this.capPoint.y);

      if (this.capPoint.length !== null && this.capPoint.width !== null && this.capPoint.orientation !== null) {
        this.capPoint.corners.forEach((corner) => {
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
    if (this.capPoint.azimuth != null && this.capPoint.distance != null) {
      const angleToCap = (this.capPoint.azimuth - 90) * Math.PI / 180;
      const capX = this.capPoint.distance * Math.cos(angleToCap);
      const capY = this.capPoint.distance * Math.sin(angleToCap);

      if (this.capPoint.length != null && this.capPoint.width != null && this.capPoint.orientation != null) {
        // Draw CAP racetrack.
        this.drawUtils.drawRacetrack(capX, capY, this.capPoint.length, this.capPoint.width, this.capPoint.orientation, this.capPoint.leftSide, 'black')


        if (this.capPoint.name != '') {
          const { x: capNameX, y: capNameY } = this.utils.getCenter(this.capPoint.corners);

          let capNameAngle = (this.capPoint.orientation + 90);
          if (capNameAngle >= 270) {
            capNameAngle -= 180;
          } else if (capNameAngle >= 90) {
            capNameAngle -= 180;
          }

          // Draw CAP name.
          this.drawUtils.drawText(capNameX, capNameY, this.capPoint.name, 0, 0, capNameAngle * Math.PI / 180, 10);
        }
      }

      if (this.capPoint.pointName != '') {
        // Draw CAP point name.
        this.drawUtils.drawFamedText(capX, capY, this.capPoint.pointName);
      }
    }
  }

  runAreaPoints() {
    if (this.areaPoints.length > 1) {
      // Draw lines between points to form a polygon
      for (let i = 0; i < this.areaPoints.length; i++) {
        const startPoint = this.areaPoints[i];
        const endPoint = this.areaPoints[(i + 1) % this.areaPoints.length]; // Wrap around to the first point

        this.drawUtils.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 'black', 3);
      }
    }

    this.areaPoints.forEach((point) => {
      if (point.name != '') this.drawUtils.drawFamedText(point.x, point.y, point.name);
    });
  }

  runBorders() {
    this.drawUtils.setToBackground();
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    this.borders.forEach((border) => {
      this.drawUtils.drawBorder(border.startX, border.startY, border.endX, border.endY, 'black', 3);
    });

    this.drawUtils.unclipCanevas();
    this.drawUtils.setToForeground();
  }

  runRings() {
    this.drawUtils.setToBackground();
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    this.rings.forEach((ring) => {
      this.drawUtils.drawRing(ring.x, ring.y, ring.radius, 'black', 2);
    });

    this.drawUtils.unclipCanevas();
    this.drawUtils.setToForeground();

    this.rings.forEach((ring) => {
      if (ring.name != '') this.drawUtils.drawFamedText(ring.x, ring.y, ring.name);
    });
  }

  runBullseye() {
    this.drawUtils.setToBackground();
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    // Draw bullseye dot
    this.drawUtils.drawBullseye(0, 0, 'black');

    const maxRadius = this.furthestPoint * this.furthestPointMargin; // Furthest point determines the maximum radius
    const ringCount = Math.ceil(maxRadius / this.bullseye.ringsRange); // Calculate how many rings to draw

    // Draw cardinal lines
    const linesAngle = this.bullseye.halfAnglesLines ? this.utils.getClosestDivisorTo90(this.bullseye.linesAngle) / 2 : this.utils.getClosestDivisorTo90(this.bullseye.linesAngle);

    let dashed = false;
    for (let angle = 0; angle < 180; angle += linesAngle) {
      const angleRad = angle * Math.PI / 180;
      this.drawUtils.drawInfiniteLine(0, 0, angleRad, '#555', dashed); // Draw lines at specified angles

      if (this.bullseye.halfAnglesLines) {
        dashed = !dashed;
      }
    }

    // Draw rings
    for (let i = 1; i <= ringCount + 1; i++) {
      const radius = i * this.bullseye.ringsRange;
      this.drawUtils.drawRing(0, 0, radius, '#555'); // Draw each ring

      this.drawUtils.setToForeground();

      const ringsRangeAngle = Math.round(this.bullseye.ringsRangeAngle / linesAngle) * linesAngle;

      const angleRad = (ringsRangeAngle - 90) * Math.PI / 180;
      const ringTextX = radius * Math.cos(angleRad);
      const ringTextY = radius * Math.sin(angleRad);

      this.drawUtils.drawText(ringTextX, ringTextY, radius, 10, angleRad);

      this.drawUtils.setToBackground();
    }

    this.drawUtils.unclipCanevas();
    this.drawUtils.setToForeground();

    if (this.bullseye.name != '') {
      // Draw bullseye name
      const angleRad = (this.bullseye.nameAngle - 90) * Math.PI / 180;
      const textX = (maxRadius + 0.5) * Math.cos(angleRad);
      const textY = (maxRadius + 0.5) * Math.sin(angleRad);
      this.drawUtils.drawText(0, 0, this.bullseye.name, 30, angleRad);
    }

    const displayedAngles = [];
    let displayText = true;
    for (let angle = 0; angle < 360; angle += linesAngle) {
      if (displayText) {
        const angleRad = angle * Math.PI / 180;

        // Calculate intersection points with area point lines
        this.areaPoints.forEach((point, index) => {
          const nextPoint = this.areaPoints[(index + 1) % this.areaPoints.length];

          const intersection = this.utils.getIntersectionWithLine({ x: 0, y: 0, angle: angleRad }, { start: point, end: nextPoint });

          if (intersection) {
            const textAngle = (angle + 90) % 360;
            if (!displayedAngles.includes(textAngle)) {
              this.drawUtils.drawText(intersection.x, intersection.y, `${textAngle}°`, 20, angle * Math.PI / 180);

              displayedAngles.push(textAngle);
            }
          }
        });
      }

      if (this.bullseye.halfAnglesLines) {
        displayText = !displayText;
      }
    }
  }

  getData() {
    // Bullseye
    const bullseyeData = JSON.parse(localStorage.getItem(bullseyeDataKey));
    if (bullseyeData) {
      $('.display-bullseye').prop('checked', bullseyeData.display);
      $('.limit-bullseye-to-area').prop('checked', bullseyeData.limitToArea);
      $('.bullseye-name').val(bullseyeData.name);
      $('.bullseye-name-angle').val(bullseyeData.nameAngle);
      $('.rings-range').val(bullseyeData.ringsRange);
      $('.ring-range-angle').val(bullseyeData.ringsRangeAngle)
      $('.lines-angle').val(bullseyeData.linesAngle);
      $('.half-angle-lines').prop('checked', bullseyeData.halfAnglesLines);
    }

    // Cap point
    const capPointData = JSON.parse(localStorage.getItem(capPointDataKey));
    if (capPointData) {
      $('.cap-point-name').val(capPointData.pointName);
      $('.cap-name').val(capPointData.name);
      $('.cap-distance').val(capPointData.distance);
      $('.cap-azimuth').val(capPointData.azimuth);
      $('.cap-length').val(capPointData.length);
      $('.cap-width').val(capPointData.width);
      $('.cap-orientation').val(capPointData.orientation);
      $('.cap-side').val(capPointData.leftSide ? 1 : 0).change();
    }

    // Area points
    const areaPointsData = JSON.parse(localStorage.getItem(areaPointsDataKey));
    if (areaPointsData) {
      areaPointsData.forEach((areaPointData, index) => {
        let areaPointElement;
        if (index == 0) {
          areaPointElement = $('.area-point').first();
        } else {
          areaPointElement = $('.area-point').first().clone();
          $('.area-points-subcontainer').append(areaPointElement);
        }

        areaPointElement.find('.area-point-name').val(areaPointData.name);
        areaPointElement.find('.area-point-azimuth').val(areaPointData.azimuth);
        areaPointElement.find('.area-point-distance').val(areaPointData.distance);
      });
    }

    // Borders
    const bordersData = JSON.parse(localStorage.getItem(bordersDataKey));
    if (bordersData) {
      bordersData.forEach((borderData, index) => {
        let borderElement;
        if (index == 0) {
          borderElement = $('.border').first();
        } else {
          borderElement = $('.border').first().clone();
          $('.borders-subcontainer').append(borderElement);
        }

        borderElement.find('.border-name').val(borderData.name);
        borderElement.find('.border-start-azimuth').val(borderData.startAzimuth);
        borderElement.find('.border-start-distance').val(borderData.startDistance);
        borderElement.find('.border-end-azimuth').val(borderData.endAzimuth);
        borderElement.find('.border-end-distance').val(borderData.endDistance);
      });
    }

    // Rings
    const ringsData = JSON.parse(localStorage.getItem(ringsDataKey));
    if (ringsData) {
      ringsData.forEach((ringData, index) => {
        let ringElement;
        if (index == 0) {
          ringElement = $('.ring').first();
        } else {
          ringElement = $('.ring').first().clone();
          $('.rings-subcontainer').append(ringElement);
        }

        ringElement.find('.ring-name').val(ringData.name);
        ringElement.find('.ring-azimuth').val(ringData.azimuth);
        ringElement.find('.ring-distance').val(ringData.distance);
        ringElement.find('.ring-radius').val(ringData.radius);
      });
    }
  }

  saveData() {
    localStorage.setItem(bullseyeDataKey, JSON.stringify(this.bullseye));
    localStorage.setItem(capPointDataKey, JSON.stringify(this.capPoint));
    localStorage.setItem(areaPointsDataKey, JSON.stringify(this.areaPoints));
    localStorage.setItem(bordersDataKey, JSON.stringify(this.borders));
    localStorage.setItem(ringsDataKey, JSON.stringify(this.rings));
  }
}

$(document).ready(function () {
  const bullseyeMap = new BullseyeMapGenerator();
});