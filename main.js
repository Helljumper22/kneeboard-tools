defaultBullseyeRingsRange = 20;
defaultBullseyeLinesAngle = 30;

bullseyeDataKey = 'bullseye-data';
capPointsDataKey = 'cap-points-data';
areaPointsDataKey = 'area-points-data';
bordersDataKey = 'borders-data';
ringsDataKey = 'rings-data';

class BullseyeMapGenerator {
  constructor() {
    this.utils = new Utils();
    this.drawUtils = new DrawUtils();

    // Bullseye
    this.bullseye = {};

    this.capPoints = [];
    this.areaPoints = [];
    this.borders = [];
    this.rings = [];

    this.furthestPoint = 0;
    this.furthestPointMargin = 1.2;
    this.defaultScale = 100;

    $('.color-picker').each((index, element) => {
      new JSColor(element, {
        value: '#000000',
        onInput: () => this.updateMap()
      });
    });

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

    $('.sortable-container').sortable({
      cursor: 'grabbing',
      axis: 'y',
      classes: { 'ui-sortable-helper': 'dragged' },
      scrollSpeed: 5,
      stop: (event, ui) => {
        // Reset inline styles to prevent misalignment
        $(ui.item).css({
          left: '',
          top: '',
          position: ''
        });

        this.updateMap()
      }
    });

    $('.add-cap-point-button, .add-area-point-button, .add-border-button, .add-ring-button').on('click', (event) => {
      const elementContainer = $(event.target).siblings('.element-container').first();
      const newPoint = $(elementContainer).find('.element').first().clone();
      newPoint.find('input').val('');
      $(elementContainer).append(newPoint);

      newPoint.find('.update-field').on('input', () => this.updateMap());
      newPoint.find('.delete-button').on('click', (event) => this.deleteElement(event));

      const colorPicker = newPoint.find('.color-picker');
      if (colorPicker) {
        new JSColor(colorPicker[0], {
          value: '#000000',
          onInput: () => this.updateMap()
        });
      }
    });

    $('.delete-cap-point-button, .delete-area-point-button, .delete-border-button, .delete-ring-button').on('click', (event) => this.deleteElement(event));

    $('.update-field').on('input', () => this.updateMap());

    $('.toggle-fieldset').on('click', function () {
      $(this).closest('fieldset').toggleClass('collapsed');
    });

    this.updateMap();
  }

  deleteElement(event) {
    console.log('ici')
    if ($(event.target).closest('.element-container').find('.element').length > 1) {
      $(event.target).closest('.element').remove();
    } else {
      $(event.target).closest('.element').find('.update-field').val('');
    }

    this.updateMap();
  }

  updateMap() {
    console.log('updateMap');
    this.furthestPoint = 0;

    this.getInputParameters();

    this.drawUtils.clearCanevas();
    this.drawUtils.setToForeground();

    // Recalculate scale and redraw map
    this.runScale();

    this.drawUtils.drawBackground('white');

    // Draw bullseye
    if (this.bullseye.display) this.runBullseye();

    // Draw borders
    this.runBorders();

    // Draw rings
    this.runRings();

    // Draw area points
    this.runAreaPoints();

    // Draw CAP point
    this.runCapPoints();

    // Draw all points names
    this.runPointNames();

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

    // CAP points
    this.capPoints = [];
    $('.cap-point').each((index, element) => {
      const pointName = $(element).find('.cap-point-name').val();
      const name = $(element).find('.cap-name').val();
      const azimuth = parseFloat($(element).find('.cap-point-azimuth').val());
      const distance = parseFloat($(element).find('.cap-point-distance').val());
      const length = parseFloat($(element).find('.cap-length').val());
      const width = parseFloat($(element).find('.cap-width').val());
      const orientation = parseFloat($(element).find('.cap-orientation').val());
      const leftSide = $(element).find('.cap-side').val() == 1;
      const color = $(element).find('.cap-color').attr('data-current-color');

      if (!isNaN(azimuth) && !isNaN(distance)) {
        const angleRad = (azimuth - 90) * Math.PI / 180;
        const x = distance * Math.cos(angleRad);
        const y = distance * Math.sin(angleRad);

        const corners = [];
        if (!isNaN(length) && !isNaN(width) && !isNaN(orientation)) {
          corners.push({
            x: x + ((width / 2) * Math.cos((orientation - 90) * Math.PI / 180)),
            y: y - ((width / 2) * Math.cos(orientation * Math.PI / 180))
          });

          corners.push({
            x: corners[0].x - (length * Math.cos((orientation - 90) * Math.PI / 180)),
            y: corners[0].y + (length * Math.cos(orientation * Math.PI / 180))
          });

          if (leftSide) {
            corners.push({
              x: corners[0].x - (length * Math.cos((orientation - 90) * Math.PI / 180)) - (width * Math.cos(orientation * Math.PI / 180)),
              y: corners[0].y + (length * Math.cos(orientation * Math.PI / 180)) - (width * Math.cos((orientation - 90) * Math.PI / 180))
            });

            corners.push({
              x: corners[0].x - (width * Math.cos(orientation * Math.PI / 180)),
              y: corners[0].y - (width * Math.cos((orientation - 90) * Math.PI / 180))
            });
          } else {
            corners.push({
              x: corners[0].x - (length * Math.cos((orientation - 90) * Math.PI / 180)) + (width * Math.cos(orientation * Math.PI / 180)),
              y: corners[0].y + (length * Math.cos(orientation * Math.PI / 180)) + (width * Math.cos((orientation - 90) * Math.PI / 180))
            });

            corners.push({
              x: corners[0].x + (width * Math.cos(orientation * Math.PI / 180)),
              y: corners[0].y + (width * Math.cos((orientation - 90) * Math.PI / 180))
            });
          }
        }

        this.capPoints.push({ pointName, name, azimuth, distance, length, width, orientation, leftSide, color, x, y, corners });
      }
    });

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
      const color = $(element).find('.border-color').attr('data-current-color');

      if (!isNaN(startAzimuth) && !isNaN(startDistance) && !isNaN(endAzimuth) && !isNaN(endDistance)) {
        const startAngleRad = (startAzimuth - 90) * Math.PI / 180;
        const startX = startDistance * Math.cos(startAngleRad);
        const startY = startDistance * Math.sin(startAngleRad);

        const endAngleRad = (endAzimuth - 90) * Math.PI / 180;
        const endX = endDistance * Math.cos(endAngleRad);
        const endY = endDistance * Math.sin(endAngleRad);

        this.borders.push({ name, startAzimuth, startDistance, endAzimuth, endDistance, color, startX, startY, endX, endY });
      }
    });

    // Rings
    this.rings = [];
    $('.ring').each((index, element) => {
      const name = $(element).find('.ring-name').val();
      const azimuth = parseFloat($(element).find('.ring-azimuth').val());
      const distance = parseFloat($(element).find('.ring-distance').val());
      const radius = parseFloat($(element).find('.ring-radius').val());
      const color = $(element).find('.ring-color').attr('data-current-color');

      if (!isNaN(azimuth) && !isNaN(distance)) {
        const angleRad = (azimuth - 90) * Math.PI / 180;
        const x = distance * Math.cos(angleRad);
        const y = distance * Math.sin(angleRad);

        this.rings.push({ name, azimuth, distance, radius, color, x, y });
      }
    });
  }

  runScale() {
    // Determine the furthest graphic distance
    this.furthestPoint = 0;

    // Initialize bounding box variables
    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    // Include CAP point and racetrack in bounding box
    this.capPoints.forEach((capPoint) => {
      if (capPoint.azimuth !== null && capPoint.distance !== null) {
        minX = Math.min(minX, capPoint.x);
        maxX = Math.max(maxX, capPoint.x);
        minY = Math.min(minY, capPoint.y);
        maxY = Math.max(maxY, capPoint.y);

        if (capPoint.length !== null && capPoint.width !== null && capPoint.orientation !== null) {
          capPoint.corners.forEach((corner) => {
            minX = Math.min(minX, corner.x);
            maxX = Math.max(maxX, corner.x);
            minY = Math.min(minY, corner.y);
            maxY = Math.max(maxY, corner.y);
          });
        }
      }
    });

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

  runBullseye() {
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

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
    const maxRadius = this.furthestPoint * this.furthestPointMargin; // Furthest point determines the maximum radius
    const ringCount = Math.ceil(maxRadius / this.bullseye.ringsRange); // Calculate how many rings to draw
    for (let i = 1; i <= ringCount + 1; i++) {
      const radius = i * this.bullseye.ringsRange;

      const ringsRangeAngle = Math.round(this.bullseye.ringsRangeAngle / linesAngle) * linesAngle;

      const angleRad = (ringsRangeAngle - 90) * Math.PI / 180;
      const ringTextX = radius * Math.cos(angleRad);
      const ringTextY = radius * Math.sin(angleRad);

      this.drawUtils.drawText(ringTextX, ringTextY, radius, 10, angleRad);

      this.drawUtils.drawRing(0, 0, radius, '#555'); // Draw each ring
    }

    // Draw bullseye dot
    this.drawUtils.drawBullseye(0, 0, 'black');

    this.drawUtils.unclipCanevas();

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

  runBorders() {
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    this.borders.forEach((border) => {
      this.drawUtils.drawBorder(border.startX, border.startY, border.endX, border.endY, border.color, 3);
    });

    this.drawUtils.unclipCanevas();
  }

  runRings() {
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    this.rings.forEach((ring) => {
      this.drawUtils.drawRing(ring.x, ring.y, ring.radius, ring.color, 2);
    });

    this.drawUtils.unclipCanevas();
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
  }

  runCapPoints() {
    // Check for valid CAP parameters
    this.capPoints.forEach((capPoint) => {
      if (!isNaN(capPoint.x) && !isNaN(capPoint.y)) {
        if (!isNaN(capPoint.length) && !isNaN(capPoint.width) && !isNaN(capPoint.orientation)) {
          // Draw CAP racetrack.
          this.drawUtils.drawRacetrack(capPoint.x, capPoint.y, capPoint.length, capPoint.width, capPoint.orientation, capPoint.leftSide, capPoint.color)
        }
      }
    });
  }

  runPointNames() {
    if (this.bullseye.limitToArea) this.drawUtils.clipCanevas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    // Draw bullseye name
    if (this.bullseye.name != '') {
      const angleRad = (this.bullseye.nameAngle - 90) * Math.PI / 180;
      this.drawUtils.drawText(0, 0, this.bullseye.name, 30, angleRad);
    }

    this.drawUtils.unclipCanevas();

    // Draw ring names
    this.rings.forEach((ring) => {
      if (ring.name != '') this.drawUtils.drawFamedText(ring.x, ring.y, ring.name);
    });

    // Draw area points name
    this.areaPoints.forEach((point) => {
      if (point.name != '') this.drawUtils.drawFamedText(point.x, point.y, point.name);
    });

    // Draw CAP names and CAP points name.
    this.capPoints.forEach((capPoint) => {
      if (!isNaN(capPoint.x) && !isNaN(capPoint.y)) {
        if (!isNaN(capPoint.length) && !isNaN(capPoint.width) && !isNaN(capPoint.orientation)) {
          if (capPoint.name != '') {
            const { x: capNameX, y: capNameY } = this.utils.getCenter(capPoint.corners);

            let capNameAngle = (capPoint.orientation + 90);
            if (capNameAngle >= 270) {
              capNameAngle -= 180;
            } else if (capNameAngle >= 90) {
              capNameAngle -= 180;
            }

            this.drawUtils.drawText(capNameX, capNameY, capPoint.name, 0, 0, capNameAngle * Math.PI / 180, 10);
          }
        }

        if (capPoint.pointName != '') {
          this.drawUtils.drawFamedText(capPoint.x, capPoint.y, capPoint.pointName);
        }
      }
    });
  }

  getData() {
    // Bullseye
    try {
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
    } catch (error) {
      $('.display-bullseye').prop('checked', true);
      $('.limit-bullseye-to-area').prop('checked', true);
      $('.bullseye-name').val('');
      $('.bullseye-name-angle').val(180);
      $('.rings-range').val(20);
      $('.ring-range-angle').val(180)
      $('.lines-angle').val(30);
      $('.half-angle-lines').prop('checked', true);
    }

    // Cap point
    try {
      const capPointsData = JSON.parse(localStorage.getItem(capPointsDataKey));
      if (capPointsData) {
        capPointsData.forEach((capPointData, index) => {
          let capPointElement;
          if (index == 0) {
            capPointElement = $('.cap-point').first();
          } else {
            capPointElement = $('.cap-point').first().clone();
            $('.cap-points-container').append(capPointElement);

            const colorPicker = capPointElement.find('.color-picker');
            if (colorPicker) {
              new JSColor(colorPicker[0], {
                value: '#000000',
                onInput: () => this.updateMap()
              });
            }
          }

          $(capPointElement).find('.cap-point-name').val(capPointData.pointName);
          $(capPointElement).find('.cap-name').val(capPointData.name);
          $(capPointElement).find('.cap-point-azimuth').val(capPointData.azimuth);
          $(capPointElement).find('.cap-point-distance').val(capPointData.distance);
          $(capPointElement).find('.cap-length').val(capPointData.length);
          $(capPointElement).find('.cap-width').val(capPointData.width);
          $(capPointElement).find('.cap-orientation').val(capPointData.orientation);
          $(capPointElement).find('.cap-side').val(capPointData.leftSide ? 1 : 0).change();
          $(capPointElement).find('.cap-color')[0].jscolor.fromString(capPointData.color);
        });
      }
    } catch (error) {
      const capPoints = $('.cap-point:not(:first)');
      const firstCapPoint = $('.cap-point').first();

      $(firstCapPoint).find('.cap-point-name').val('');
      $(firstCapPoint).find('.cap-name').val('');
      $(firstCapPoint).find('.cap-point-azimuth').val('');
      $(firstCapPoint).find('.cap-point-distance').val('');
      $(firstCapPoint).find('.cap-length').val('');
      $(firstCapPoint).find('.cap-width').val('');
      $(firstCapPoint).find('.cap-orientation').val('');
      $(firstCapPoint).find('.cap-side').val(1).change();
      $(firstCapPoint).find('.cap-color')[0].jscolor.fromString('#000000');

      capPoints.remove();
    }

    // Area points
    try {
      const areaPointsData = JSON.parse(localStorage.getItem(areaPointsDataKey));
      if (areaPointsData) {
        areaPointsData.forEach((areaPointData, index) => {
          let areaPointElement;
          if (index == 0) {
            areaPointElement = $('.area-point').first();
          } else {
            areaPointElement = $('.area-point').first().clone();
            $('.area-points-container').append(areaPointElement);
          }

          $(areaPointElement).find('.area-point-name').val(areaPointData.name);
          $(areaPointElement).find('.area-point-azimuth').val(areaPointData.azimuth);
          $(areaPointElement).find('.area-point-distance').val(areaPointData.distance);
        });
      }
    } catch (error) {
      const areaPoints = $('.area-point:not(:first)');
      const firstAreaPoint = $('.area-point').first();

      $(firstAreaPoint).find('.area-point-name').val('');
      $(firstAreaPoint).find('.area-point-azimuth').val('');
      $(firstAreaPoint).find('.area-point-distance').val('');

      areaPoints.remove();
    }

    // Borders
    try {
      const bordersData = JSON.parse(localStorage.getItem(bordersDataKey));
      if (bordersData) {
        bordersData.forEach((borderData, index) => {
          let borderElement;
          if (index == 0) {
            borderElement = $('.border').first();
          } else {
            borderElement = $('.border').first().clone();
            $('.borders-container').append(borderElement);

            const colorPicker = borderElement.find('.color-picker');
            if (colorPicker) {
              new JSColor(colorPicker[0], {
                value: '#000000',
                onInput: () => this.updateMap()
              });
            }
          }

          $(borderElement).find('.border-name').val(borderData.name);
          $(borderElement).find('.border-start-azimuth').val(borderData.startAzimuth);
          $(borderElement).find('.border-start-distance').val(borderData.startDistance);
          $(borderElement).find('.border-end-azimuth').val(borderData.endAzimuth);
          $(borderElement).find('.border-end-distance').val(borderData.endDistance);
          $(borderElement).find('.border-color')[0].jscolor.fromString(borderData.color);
        });
      }
    } catch (error) {
      const borders = $('.border:not(:first)');
      const firstBorder = $('.border').first();

      $(firstBorder).find('.border-name').val('');
      $(firstBorder).find('.border-start-azimuth').val('');
      $(firstBorder).find('.border-start-distance').val('');
      $(firstBorder).find('.border-end-azimuth').val('');
      $(firstBorder).find('.border-end-distance').val('');
      $(firstBorder).find('.border-color')[0].jscolor.fromString('#000000');

      borders.remove();
    }

    // Rings
    try {
      const ringsData = JSON.parse(localStorage.getItem(ringsDataKey));
      if (ringsData) {
        ringsData.forEach((ringData, index) => {
          let ringElement;
          if (index == 0) {
            ringElement = $('.ring').first();
          } else {
            ringElement = $('.ring').first().clone();
            $('.rings-container').append(ringElement);

            const colorPicker = ringElement.find('.color-picker');
            if (colorPicker) {
              new JSColor(colorPicker[0], {
                value: '#000000',
                onInput: () => this.updateMap()
              });
            }
          }

          $(ringElement).find('.ring-name').val(ringData.name);
          $(ringElement).find('.ring-azimuth').val(ringData.azimuth);
          $(ringElement).find('.ring-distance').val(ringData.distance);
          $(ringElement).find('.ring-radius').val(ringData.radius);
          $(ringElement).find('.ring-color')[0].jscolor.fromString(ringData.color);
        });
      }
    } catch (error) {
      const rings = $('.ring:not(:first)');
      const firstRing = $('.ring').first();

      $(firstRing).find('.ring-name').val('');
      $(firstRing).find('.ring-azimuth').val('');
      $(firstRing).find('.ring-distance').val('');
      $(firstRing).find('.ring-radius').val('');
      $(firstRing).find('.ring-color')[0].jscolor.fromString('#000000');

      rings.remove();
    }
  }

  saveData() {
    localStorage.setItem(bullseyeDataKey, JSON.stringify(this.bullseye));
    localStorage.setItem(capPointsDataKey, JSON.stringify(this.capPoints));
    localStorage.setItem(areaPointsDataKey, JSON.stringify(this.areaPoints));
    localStorage.setItem(bordersDataKey, JSON.stringify(this.borders));
    localStorage.setItem(ringsDataKey, JSON.stringify(this.rings));
  }
}

$(document).ready(function () {
  const bullseyeMap = new BullseyeMapGenerator();
});