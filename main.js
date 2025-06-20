defaultBullseyeRingsRange = 20;
defaultBullseyeLinesAngle = 30;

capPointsDataKey = 'cap-points-data';
gatesDataKey = 'gates-data';
areaPointsDataKey = 'area-points-data';
ringsDataKey = 'rings-data';
bordersDataKey = 'borders-data';
bullseyeDataKey = 'bullseye-data';

fieldsetsDataKey = 'fieldsets-data';

class BullseyeMapGenerator {
  constructor() {
    this.utils = new Utils();
    this.drawUtils = new DrawUtils();

    this.capPoints = [];
    this.gates = [];
    this.areaPoints = [];
    this.rings = [];
    this.borders = [];
    this.bullseye = {};

    this.furthestPoint = 0;
    this.furthestPointMargin = 1.2;
    this.defaultScale = 100;

    // Initialize color pickers
    $('.color-picker').each((index, element) => {
      new JSColor(element, {
        value: '#000000',
        onInput: () => this.updateMap()
      });
    });

    // Get saved data from local storage.
    this.getData();

    // Import data from JSON file
    $('.import-map-button').on('click', async () => {
      const mapData = await this.utils.importMap();

      if (mapData) {
        this.resetFields();

        localStorage.setItem(capPointsDataKey, JSON.stringify(mapData.capPoints));
        localStorage.setItem(gatesDataKey, JSON.stringify(mapData.gates));
        localStorage.setItem(areaPointsDataKey, JSON.stringify(mapData.areaPoints));
        localStorage.setItem(ringsDataKey, JSON.stringify(mapData.rings));
        localStorage.setItem(bordersDataKey, JSON.stringify(mapData.borders));
        localStorage.setItem(bullseyeDataKey, JSON.stringify(mapData.bullseye));

        this.getData();

        this.updateMap();
      }
    });

    // Export data to JSON file.
    $('.export-map-button').on('click', () => {
      const mapData = {
        'capPoints': this.capPoints,
        'gates': this.gates,
        'areaPoints': this.areaPoints,
        'rings': this.rings,
        'borders': this.borders,
        'bullseye': this.bullseye,
      };

      this.utils.exportMap(mapData)
    });

    // Export map as png.
    $('.download-map-button').on('click', () => this.utils.downloadMap($('.map-canvas')[0]));

    // Reset all fields.
    $('.reset-fields-button').on('click', () => {
      if (window.confirm('Are you sure ? All data will be lost.')) {
        this.resetFields();

        this.updateMap();
      }
    });

    // Initialize the area point sorting.
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

    // Add element to list.
    $('.add-button').on('click', (event) => this.addElement(event));

    // Delete element from list.
    $('.delete-button').on('click', (event) => this.deleteElement(event));

    // Update map when a field is changed.
    $('.update-field').on('input', () => this.updateMap());

    // Get the current state of the fieldsets.
    this.fieldsetsData = [];
    $('fieldset').each((index, element) => {
      this.fieldsetsData.push({
        id: $(element).attr('id'),
        collapsed: $(element).hasClass('collapsed')
      })
    });

    // Display or hide the fieldsets.
    $('.toggle-fieldset').on('click', (event) => {
      const fieldset = $(event.target).closest('fieldset');
      fieldset.toggleClass('collapsed');

      const fieldsetData = this.fieldsetsData.find((fieldsetData) => fieldsetData.id == $(fieldset).attr('id'))
      fieldsetData.collapsed = $(fieldset).hasClass('collapsed');

      localStorage.setItem(fieldsetsDataKey, JSON.stringify(this.fieldsetsData));
    });

    // First drawing of the map.
    this.updateMap();
  }

  resetFields() {
    $('input[type=text].update-field').val('');
    $('input[type=number].update-field').val('');

    $('.display-bullseye').prop('checked', true);
    $('.limit-bullseye-to-area').prop('checked', true);
    $('.half-angle-lines').prop('checked', true);

    $('.bullseye-name-angle').val($('.bullseye-name-angle').prop('max') / 2);
    $('.ring-range-angle').val($('.ring-range-angle').prop('max') / 2);
    $('.gate-name-angle').val($('.gate-name-angle').prop('max') / 2);

    $('.cap-side').val(1);

    $('.area-point:not(:first)').remove();
    $('.border:not(:first)').remove();
    $('.ring:not(:first)').remove();
    $('.gate:not(:first)').remove();
  }

  addElement(event) {
    const elementContainer = $(event.target).siblings('.element-container').first();
    const newPoint = $(elementContainer).find('.element').first().clone();
    newPoint.find('input').val('');
    $(elementContainer).append(newPoint);

    newPoint.find('.update-field').on('input', () => this.updateMap());
    newPoint.find('.delete-button').on('click', (event) => this.deleteElement(event));

    const colorPicker = newPoint.find('.color-picker');
    if (colorPicker.length > 0) {
      new JSColor(colorPicker[0], {
        value: '#000000',
        onInput: () => this.updateMap()
      });
    }
  }

  deleteElement(event) {
    const element = $(event.target).closest('.element');
    if ($(event.target).closest('.element-container').find('.element').length > 1) {
      $(element).remove();
    } else {
      $(element).find('.update-field').val('');

      const capSide = $(element).find('.cap-side');
      if (capSide.length > 0) {
        $(capSide).val(1);
      }

      const colorPicker = $(element).find('.color-picker');
      if (colorPicker.length > 0) {
        $(colorPicker)[0].jscolor.fromString('#000000');
      }
    }

    this.updateMap();
  }

  updateMap() {
    this.furthestPoint = 0;

    this.getInputParameters();

    this.drawUtils.clearCanvas();
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

    // Draw gates
    this.runGates();

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

    // Gates
    this.gates = [];
    $('.gate').each((index, element) => {
      const name = $(element).find('.gate-name').val();
      const nameAngle = parseInt($(element).find('.gate-name-angle').val());
      const azimuth = parseFloat($(element).find('.gate-azimuth').val());
      const distance = parseFloat($(element).find('.gate-distance').val());
      const orientation = parseFloat($(element).find('.gate-orientation').val());
      const color = $(element).find('.gate-color').attr('data-current-color');

      if (!isNaN(azimuth) && !isNaN(distance)) {
        const angleRad = (azimuth - 90) * Math.PI / 180;
        const x = distance * Math.cos(angleRad);
        const y = distance * Math.sin(angleRad);

        this.gates.push({ name, nameAngle, azimuth, distance, orientation, color, x, y });
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
    if (this.bullseye.limitToArea) this.drawUtils.clipCanvas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

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

      this.drawUtils.drawRing(0, 0, radius, '#555'); // Draw each ring
    }

    // Draw bullseye dot
    this.drawUtils.drawBullseye(0, 0, 'black');

    this.drawUtils.unclipCanvas();
  }

  runBorders() {
    this.borders.forEach((border) => {
      this.drawUtils.drawBorder(border.startX, border.startY, border.endX, border.endY, border.color, 3);
    });
  }

  runRings() {
    if (this.bullseye.limitToArea) this.drawUtils.clipCanvas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    this.rings.forEach((ring) => {
      this.drawUtils.drawRing(ring.x, ring.y, ring.radius, ring.color, 2);
    });

    this.drawUtils.unclipCanvas();
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

  runGates() {
    this.gates.forEach((gate) => {
      this.drawUtils.drawGate(gate.x, gate.y, 15, gate.orientation, gate.color)
    });
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
    const bullseyeInArea = this.bullseye.limitToArea && this.utils.isPointWithinArea({ x: 0, y: 0 }, this.areaPoints);
    const linesAngle = this.bullseye.halfAnglesLines ? this.utils.getClosestDivisorTo90(this.bullseye.linesAngle) / 2 : this.utils.getClosestDivisorTo90(this.bullseye.linesAngle);

    // Draw rings
    const maxRadius = this.furthestPoint * this.furthestPointMargin; // Furthest point determines the maximum radius
    const ringCount = Math.ceil(maxRadius / this.bullseye.ringsRange); // Calculate how many rings to draw
    for (let i = 1; i <= ringCount + 1; i++) {
      const radius = i * this.bullseye.ringsRange;

      const ringsRangeAngle = Math.round(this.bullseye.ringsRangeAngle / linesAngle) * linesAngle;

      const angleRad = (ringsRangeAngle - 90) * Math.PI / 180;
      const ringTextX = radius * Math.cos(angleRad);
      const ringTextY = radius * Math.sin(angleRad);

      if (!bullseyeInArea || this.utils.isPointWithinArea({ x: ringTextX, y: ringTextY }, this.areaPoints)) {
        this.drawUtils.drawText(ringTextX, ringTextY, radius, 10, angleRad);
      }
    }

    // Draw bullseye angles
    const displayedAngles = [];
    let displayText = true;
    for (let angle = 0; angle < 360; angle += linesAngle) {
      if (displayText) {
        const intersections = [];
        if (bullseyeInArea) {
          // Display the bullseye angle text at the intersection between the angle lines and the area borders.
          // Calculate intersection points with area point lines
          this.areaPoints.forEach((point, index) => {
            const nextPoint = this.areaPoints[(index + 1) % this.areaPoints.length];

            const intersection = this.utils.getIntersectionWithLine({ x: 0, y: 0, angle: angle * Math.PI / 180 }, { start: point, end: nextPoint });

            if (intersection) {
              intersections.push(intersection);
            }
          });

        } else {
          // Display the bullseye angle text at the border of the canvas 
          const corners = this.drawUtils.getCanvasCorners(20);
          corners.forEach((corner, index) => {
            const nextCorner = corners[(index + 1) % corners.length];

            const intersection = this.utils.getIntersectionWithLine({ x: 0, y: 0, angle: angle * Math.PI / 180 }, { start: corner, end: nextCorner });

            if (intersection) {
              intersections.push(intersection);
            }
          });
        }

        if (intersections.length > 0) {
          const farthestIntersection = intersections.reduce((a, b) => a.distance > b.distance ? a : b);

          const textAngle = (angle + 90) % 360;
          if (!displayedAngles.includes(textAngle)) {
            this.drawUtils.drawText(farthestIntersection.x, farthestIntersection.y, `${textAngle}°`, bullseyeInArea ? 20 : 0, angle * Math.PI / 180);

            displayedAngles.push(textAngle);
          }
        }
      }

      if (this.bullseye.halfAnglesLines) {
        displayText = !displayText;
      }
    }

    if (this.bullseye.limitToArea) this.drawUtils.clipCanvas(this.areaPoints.map((areaPoint) => ({ x: areaPoint.x, y: areaPoint.y })));

    // Draw bullseye name
    if (this.bullseye.name != '') {
      const angleRad = (this.bullseye.nameAngle - 90) * Math.PI / 180;
      this.drawUtils.drawText(0, 0, this.bullseye.name, 30, angleRad);
    }

    this.drawUtils.unclipCanvas();

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

    // Draw gate names
    this.gates.forEach((gate) => {
      if (gate.name != '') {
        const angleRad = (gate.nameAngle - 90) * Math.PI / 180;
        this.drawUtils.drawText(gate.x, gate.y, gate.name, 30, angleRad);
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

    // Gates
    try {
      const gatesData = JSON.parse(localStorage.getItem(gatesDataKey));
      if (gatesData) {
        gatesData.forEach((gateData, index) => {
          let gateElement;
          if (index == 0) {
            gateElement = $('.gate').first();
          } else {
            gateElement = $('.gate').first().clone();
            $('.gates-container').append(gateElement);

            const colorPicker = gateElement.find('.color-picker');
            if (colorPicker) {
              new JSColor(colorPicker[0], {
                value: '#000000',
                onInput: () => this.updateMap()
              });
            }
          }

          $(gateElement).find('.gate-name').val(gateData.name);
          $(gateElement).find('.gate-name-angle').val(gateData.nameAngle);
          $(gateElement).find('.gate-azimuth').val(gateData.azimuth);
          $(gateElement).find('.gate-distance').val(gateData.distance);
          $(gateElement).find('.gate-orientation').val(gateData.orientation);
          $(gateElement).find('.gate-color')[0].jscolor.fromString(gateData.color);
        });
      }
    } catch (error) {
      const gates = $('.gate:not(:first)');
      const firstGate = $('.gate').first();

      $(firstGate).find('.gate-name').val('');
      $(firstGate).find('.gate-name-angle').val(180);
      $(firstGate).find('.gate-azimuth').val('');
      $(firstGate).find('.gate-distance').val('');
      $(firstGate).find('.gate-orientation').val('');
      $(firstGate).find('.gate-color')[0].jscolor.fromString('#000000');

      gates.remove();
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

    // Collapse fieldsets
    try {
      const fieldsetsData = JSON.parse(localStorage.getItem(fieldsetsDataKey));

      if (fieldsetsData) {
        fieldsetsData.forEach((fieldsetData) => {
          const fieldset = $(`fieldset#${fieldsetData.id}`);
          const subcontainer = $(fieldset).find('.fieldset-subcontainer');

          $(fieldset).css('transition', 'none')
          $(subcontainer).css('transition', 'none');

          $(fieldset).toggleClass('collapsed', fieldsetData.collapsed);

          $(fieldset)[0].offsetHeight;
          $(fieldset).css('transition', '');
          $(subcontainer).css('transition', '');
        });
      }
    } catch (error) { }
  }

  saveData() {
    localStorage.setItem(bullseyeDataKey, JSON.stringify(this.bullseye));
    localStorage.setItem(capPointsDataKey, JSON.stringify(this.capPoints));
    localStorage.setItem(gatesDataKey, JSON.stringify(this.gates));
    localStorage.setItem(areaPointsDataKey, JSON.stringify(this.areaPoints));
    localStorage.setItem(bordersDataKey, JSON.stringify(this.borders));
    localStorage.setItem(ringsDataKey, JSON.stringify(this.rings));
  }
}

$(document).ready(function () {
  const bullseyeMap = new BullseyeMapGenerator();
});