class BullseyeMap {
  mapComponentList = [
    {
      id: 'bullseye',
      label: 'Bullseye options',
      description: '',
      fields: [
        {
          id: 'display',
          label: 'Display',
          type: 'checkbox',
          default: 'checked',
        },
        {
          id: 'limit-to-area',
          label: 'Limit to area',
          type: 'checkbox',
          default: 'checked',
        },
        {
          id: 'name',
          label: 'Bullseye name',
          type: 'text',
        },
        {
          id: 'name-position',
          label: 'Name position',
          type: 'range',
          options: {
            min: 0,
            max: 360
          },
          default: 180,
        },
        {
          id: 'map-orientation',
          label: 'Map orientation (°)',
          type: 'number',
          default: 0,
        },
        {
          id: 'line-angles',
          label: 'Line angles (°)',
          type: 'number',
          default: 30,
        },
        {
          id: 'half-lines',
          label: 'Half lines',
          type: 'checkbox',
          default: 'checked',
        },
        {
          id: 'ring-ranges',
          label: 'Ring ranges (nm)',
          type: 'number',
          default: 20,
        },
        {
          id: 'ring-range-positions',
          label: 'Ring range positions',
          type: 'multiple',
          options: {
            repeatable: true
          },
          fields: [
            {
              id: 'ring-range-position',
              label: 'Ring range position',
              type: 'range',
              options: {
                min: 0,
                max: 360
              },
              default: 180,
            }
          ]
        },
      ],
      drawFunction: this.drawBullseye.bind(this)
    },
    {
      id: 'base-lines',
      label: 'Base Lines',
      fields: [
        {
          id: 'display',
          label: 'Display',
          type: 'checkbox',
        },
        {
          id: 'location',
          label: 'Location',
          type: 'select',
          options: {
            'top-left': 'Top left',
            'top-right': 'Top right',
            'bottom-right': 'Bottom right',
            'bottom-left': 'Bottom left',
          },
          default: 'top-left',
        },
        {
          id: 'magnetic-declination',
          label: 'Magnetic declination',
          type: 'number',
          default: 0,
        },
      ],
      drawFunction: this.drawBaseLines.bind(this)
    },
    {
      id: 'map-area-points',
      label: 'Map Area Points',
      fields: [
        {
          id: 'points',
          label: 'Points',
          type: 'multiple',
          options: {
            repeatable: true,
            sortable: true
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              default: '',
            },
            {
              id: 'azimuth',
              label: 'Azimuth (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'distance',
              label: 'Distance (°)',
              type: 'number',
              default: '',
            },
          ]
        },
      ],
      drawFunction: this.drawMapArea.bind(this)
    },
    {
      id: 'lines',
      label: 'Lines',
      fields: [
        {
          id: 'lines',
          label: 'Lines',
          type: 'multiple',
          options: {
            repeatable: true
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              default: '',
            },
            {
              id: 'type',
              label: 'Type',
              type: 'select',
              options: {
                'simple': 'Simple',
                'double': 'Double',
                'dashed': 'Dashed',
                'border': 'Border',
                'coastline': 'Coastline',
              },
              default: 'simple',
            },
            {
              id: 'color',
              label: 'Color',
              type: 'color',
              default: '#000000',
            },
            /*{
              id: 'name-position',
              label: 'Name position',
              type: 'range',
              options: {
                min: 0,
                max: 360
              },
              default: 180,
            },*/
            {
              id: 'points',
              label: 'Points',
              type: 'multiple',
              options: {
                repeatable: true,
                sortable: true
              },
              fields: [
                {
                  id: 'azimuth',
                  label: 'Azimuth (°)',
                  type: 'number',
                  default: '',
                },
                {
                  id: 'distance',
                  label: 'Distance (°)',
                  type: 'number',
                  default: '',
                },
              ]
            }
          ]
        },
      ],
      drawFunction: this.drawLines.bind(this)
    },
    {
      id: 'areas',
      label: 'Areas',
      fields: [
        {
          id: 'areas',
          label: 'Areas',
          type: 'multiple',
          options: {
            repeatable: true
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              default: '',
            },
            {
              id: 'type',
              label: 'Type',
              type: 'select',
              options: {
                'simple': 'Simple',
                'double': 'Double',
                'dashed': 'Dashed',
                'border': 'Border',
                'coastline': 'Coastline',
                'no-border': 'No border',
              },
              default: 'simple',
            },
            {
              id: 'color',
              label: 'Color',
              type: 'color',
              default: '#000000',
            },
            {
              id: 'fill',
              label: 'Fill',
              type: 'color',
              default: '#00000000',
              options: {
                transparency: true,
              }
            },
            /*{
              id: 'name-position',
              label: 'Name position',
              type: 'range',
              options: {
                min: 0,
                max: 360
              },
              default: 180,
            },*/
            {
              id: 'points',
              label: 'Points',
              type: 'multiple',
              options: {
                repeatable: true,
                sortable: true
              },
              fields: [
                {
                  id: 'name',
                  label: 'Name',
                  type: 'text',
                  default: '',
                },
                {
                  id: 'azimuth',
                  label: 'Azimuth (°)',
                  type: 'number',
                  default: '',
                },
                {
                  id: 'distance',
                  label: 'Distance (°)',
                  type: 'number',
                  default: '',
                },
              ]
            }
          ]
        },
      ],
      drawFunction: this.drawAreas.bind(this)
    },
    {
      id: 'rings',
      label: 'Rings',
      fields: [
        {
          id: 'rings',
          label: 'Rings',
          type: 'multiple',
          options: {
            repeatable: true,
            sortable: true
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              default: '',
            },
            {
              id: 'type',
              label: 'Type',
              type: 'select',
              options: {
                'area': 'Area',
                'threat': 'Threat',
              },
              default: 'area',
            },
            /*{
              id: 'name-position',
              label: 'Name position',
              type: 'range',
              options: {
                min: 0,
                max: 360
              },
              default: 180,
            },*/
            {
              id: 'azimuth',
              label: 'Azimuth (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'distance',
              label: 'Distance (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'radius',
              label: 'Radius (nm)',
              type: 'number',
              default: '',
            },
            {
              id: 'color',
              label: 'Color',
              type: 'color',
              default: '#000000',
            },
            {
              id: 'fill',
              label: 'Fill',
              type: 'color',
              default: '#00000000',
              options: {
                transparency: true,
              }
            },
          ]
        },
      ],
      drawFunction: this.drawRings.bind(this)
    },
    {
      id: 'racetracks',
      label: 'Racetracks',
      fields: [
        {
          id: 'racetracks',
          label: 'Racetracks',
          type: 'multiple',
          options: {
            repeatable: true
          },
          fields: [
            {
              id: 'point-name',
              label: 'Point name',
              type: 'text',
              default: '',
            },
            {
              id: 'racetrack-name',
              label: 'Racetrack name',
              type: 'text',
              default: '',
            },
            {
              id: 'azimuth',
              label: 'Azimuth (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'distance',
              label: 'Distance (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'length',
              label: 'Length (nm)',
              type: 'number',
              default: '',
            },
            {
              id: 'width',
              label: 'Width (nm)',
              type: 'number',
              default: '',
            },
            {
              id: 'orientation',
              label: 'Orientation (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'side',
              label: 'Side',
              type: 'select',
              options: {
                'left': 'Left',
                'right': 'Right',
              },
              default: 'left',
            },
            {
              id: 'color',
              label: 'Color',
              type: 'color',
              default: '#000000',
            },
          ]
        }
      ],
      drawFunction: this.drawRacetracks.bind(this)
    },
    {
      id: 'objects',
      label: 'Objects',
      fields: [
        {
          id: 'objects',
          label: 'Objects',
          type: 'multiple',
          options: {
            repeatable: true
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              default: '',
            },
            {
              id: 'name-position',
              label: 'Name position',
              type: 'range',
              options: {
                min: 0,
                max: 360
              },
              default: 180,
            },
            {
              id: 'type',
              label: 'Type',
              type: 'select',
              options: {
                'airfield': 'Airfield',
                'gate': 'Gate',
                'arrow': 'Arrow',
                '1-aircraft': '1 Aircraft',
                '2-aircraft': '2 Aircraft',
                '3-aircraft': '3 Aircraft',
                '4-aircraft': '4 Aircraft',
              },
              default: 'airfield',
            },
            {
              id: 'azimuth',
              label: 'Azimuth (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'distance',
              label: 'Distance (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'orientation',
              label: 'Orientation (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'color',
              label: 'Color',
              type: 'color',
              default: '#000000',
            },
          ]
        }
      ],
      drawFunction: this.drawObjects.bind(this)
    },
    {
      id: 'points',
      label: 'Points',
      fields: [
        {
          id: 'points',
          label: 'Points',
          type: 'multiple',
          options: {
            repeatable: true
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              default: '',
            },
            {
              id: 'type',
              label: 'Type',
              type: 'select',
              options: {
                'square': 'Square',
                'triangle': 'Triangle',
                'no-border': 'No border',
                'clear': 'Clear',
              },
              default: 'square',
            },
            {
              id: 'azimuth',
              label: 'Azimuth (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'distance',
              label: 'Distance (°)',
              type: 'number',
              default: '',
            },
            {
              id: 'fill',
              label: 'Fill',
              type: 'color',
              default: '#FFFFFF',
            },
          ]
        }
      ],
      drawFunction: this.drawPoints.bind(this)
    },
  ]

  constructor() {
    this.utils = new Utils();
    this.mapDrawUtils = new MapDrawUtils('.map-canvas');
    this.mapFieldsUtils = new MapFieldsUtils(this, $('.tab[attr-tab="bullseye-map-tab"]'));

    this.furthestPoint = 0;
    this.furthestPointMargin = 1.25;
    this.defaultScale = 100;

    this.boundingBoxPoints = [];
    this.pointNamesData = [];

    this.mapFieldsUtils.displayComponentListButtons();

    this.updateMap();


    $('.import-map-button').off('click').on('click', async () => this.importData());
    $('.show-export-map-modal-button').off('click').on('click', () => this.showExportModal());
    $('.show-download-map-modal-button').off('click').on('click', () => this.showDownloadModal());
    $('.reset-map-map-button').off('click').on('click', () => this.resetMap());
  }

  updateMap() {
    this.furthestPoint = 0;

    this.mapDrawUtils.clearCanvas();
    this.mapDrawUtils.setToForeground();

    // Recalculate scale and redraw map
    this.runScale();

    const bullseyeData = this.getComponentData(this.mapComponentList.find(mapComponent => mapComponent.id == 'bullseye'));
    const limitToArea = bullseyeData['limit-to-area'] ?? true;
    const mapOrientation = bullseyeData['map-orientation'] ?? 0;

    const mapAreaPointsData = this.getComponentData(this.mapComponentList.find(mapComponent => mapComponent.id == 'map-area-points'));
    const areaPoints = [];
    if (Array.isArray(mapAreaPointsData.points) && mapAreaPointsData.points.length > 0) {
      mapAreaPointsData.points.forEach(areaPoint => {
        if (this.utils.isNumber(areaPoint['azimuth']) && this.utils.isNumber(areaPoint['distance'])) {
          const angleRad = ((areaPoint['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
          const x = areaPoint['distance'] * Math.cos(angleRad);
          const y = areaPoint['distance'] * Math.sin(angleRad);

          areaPoints.push({ x, y })
        }
      });
    }

    this.pointNamesData = [];
    this.mapComponentList.forEach(mapComponent => {
      mapComponent.drawFunction(mapComponent, limitToArea, mapOrientation, areaPoints);
    });

    this.drawPointNames(areaPoints);
  }

  runScale() {
    // Determine the furthest graphic distance
    this.furthestPoint = 0;

    // Initialize bounding box variables
    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    // Rebuild boundingBoxPoints from stored component data (azimuth/distance => x,y)
    this.boundingBoxPoints = [];

    // Iterate components and scan stored data iteratively (no nested functions)
    this.mapComponentList.forEach(component => {
      const stored = this.getComponentData(component);
      if (!stored) return;

      // Use a stack to traverse objects/arrays without recursion
      const stack = [];
      if (Array.isArray(stored)) {
        for (let i = 0; i < stored.length; i++) stack.push(stored[i]);
      } else if (stored && typeof stored === 'object') {
        stack.push(stored);
      }

      while (stack.length) {
        const obj = stack.pop();
        if (!obj || typeof obj !== 'object') continue;

        // If this object looks like a polar point, parse and push
        if (Object.prototype.hasOwnProperty.call(obj, 'azimuth') && Object.prototype.hasOwnProperty.call(obj, 'distance')) {
          const az = obj['azimuth'];
          const dist = obj['distance'];

          if (az !== '' && az != null && dist !== '' && dist != null) {
            const a = parseFloat(az);
            const d = parseFloat(dist);
            if (this.utils.isNumber(a) && this.utils.isNumber(d)) {
              // Convert azimuth (degrees) to radians. Assume azimuth 0 = north, clockwise positive.
              const rad = a * Math.PI / 180;

              // x = -d * sin(rad), y = -d * cos(rad)
              const x = d * Math.sin(rad);
              const y = -d * Math.cos(rad);

              this.boundingBoxPoints.push({ x, y });
            }
          }
        }

        // Push child objects/arrays onto the stack for further processing
        Object.values(obj).forEach(val => {
          if (Array.isArray(val)) {
            for (let i = 0; i < val.length; i++) stack.push(val[i]);
          } else if (val && typeof val === 'object') {
            stack.push(val);
          }
        });
      }
    });

    // Use collected bounding points to compute box; if none, fall back to defaults below
    if (this.boundingBoxPoints.length > 0) {
      for (let i = 0; i < this.boundingBoxPoints.length; i++) {
        const boundingBoxPoint = this.boundingBoxPoints[i];
        minX = Math.min(minX, boundingBoxPoint.x);
        maxX = Math.max(maxX, boundingBoxPoint.x);
        minY = Math.min(minY, boundingBoxPoint.y);
        maxY = Math.max(maxY, boundingBoxPoint.y);
      }
    }

    // Calculate the center of the bounding box
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const maxDistance = Math.max(maxX - centerX, maxY - centerY, minX - centerX, minY - centerY);

    this.furthestPoint = maxDistance * this.furthestPointMargin;

    if (this.furthestPoint == 0) this.furthestPoint = this.defaultScale;

    // Update the scale in DrawUtils
    this.mapDrawUtils.setScale(this.furthestPoint);

    // Update DrawUtils center
    this.mapDrawUtils.setCenter(centerX, centerY);
  }

  drawBullseye(component, limitToArea, mapOrientation, areaPoints) {
    const bullseyeData = this.getComponentData(component);

    bullseyeData['display'] = bullseyeData['display'] ?? component.fields.find(field => field.id == 'display').default == 'checked';
    bullseyeData['limit-to-area'] = bullseyeData['limit-to-area'] ?? component.fields.find(field => field.id == 'limit-to-area').default == 'checked';
    bullseyeData['name'] = bullseyeData['name'] ?? component.fields.find(field => field.id == 'name').default;
    bullseyeData['name-position'] = bullseyeData['name-position'] ?? component.fields.find(field => field.id == 'name-position').default;
    bullseyeData['map-orientation'] = bullseyeData['map-orientation'] ?? component.fields.find(field => field.id == 'map-orientation').default;
    bullseyeData['line-angles'] = bullseyeData['line-angles'] ?? component.fields.find(field => field.id == 'line-angles').default;
    bullseyeData['half-lines'] = bullseyeData['half-lines'] ?? component.fields.find(field => field.id == 'half-lines').default == 'checked';
    bullseyeData['ring-ranges'] = bullseyeData['ring-ranges'] ?? component.fields.find(field => field.id == 'ring-ranges').default;
    bullseyeData['ring-range-positions'] = bullseyeData['ring-range-positions'] ?? [{ 'ring-range-position': component.fields.find(field => field.id == 'ring-range-positions').fields.find(field => field.id == 'ring-range-position').default }];

    if (bullseyeData['display']) {
      const bullseyeInArea = (bullseyeData['limit-to-area']) && this.utils.isPointWithinArea({ x: 0, y: 0 }, areaPoints);

      if (limitToArea && areaPoints.length > 2 && bullseyeInArea) {
        this.mapDrawUtils.clipCanvas(areaPoints);
      }

      // Draw cardinal lines
      const linesAngle = bullseyeData['half-lines'] ? this.utils.getClosestDivisorTo90(bullseyeData['line-angles']) / 2 : this.utils.getClosestDivisorTo90(bullseyeData['line-angles']);

      let dashed = false;
      const displayedAngles = [];
      let displayText = true;

      for (let angle = 0; angle < 360; angle += linesAngle) {
        if (angle < 180) {
          const angleRad = (angle * Math.PI / 180) + (bullseyeData['map-orientation'] * Math.PI / 180);
          this.mapDrawUtils.drawInfiniteLine(0, 0, angleRad, '#555', dashed); // Draw lines at specified angles
        }

        if (displayText) {
          const intersections = [];
          if (bullseyeInArea) {
            // Display the bullseye angle text at the intersection between the angle lines and the area borders.
            // Calculate intersection points with area point lines
            areaPoints.forEach((point, index) => {
              const nextPoint = areaPoints[(index + 1) % areaPoints.length];

              const intersection = this.utils.getIntersectionWithLine({ x: 0, y: 0, angle: (angle * Math.PI / 180) + (bullseyeData['map-orientation'] * Math.PI / 180) }, { start: point, end: nextPoint });
              if (intersection) {
                intersections.push(intersection);
              }
            });
          } else {
            // Display the bullseye angle text at the border of the canvas 
            const corners = this.mapDrawUtils.getCanvasCorners(20);
            corners.forEach((corner, index) => {
              const nextCorner = corners[(index + 1) % corners.length];

              const intersection = this.utils.getIntersectionWithLine({ x: 0, y: 0, angle: (angle * Math.PI / 180) + (bullseyeData['map-orientation'] * Math.PI / 180) }, { start: corner, end: nextCorner });
              if (intersection) {
                intersections.push(intersection);
              }
            });
          }

          if (intersections.length > 0) {
            const farthestIntersection = intersections.reduce((a, b) => a['distance'] > b['distance'] ? a : b);

            const textAngle = (angle + 90) % 360;
            if (!displayedAngles.includes(textAngle)) {
              this.pointNamesData.push({
                limitToArea: false,
                x: farthestIntersection.x,
                y: farthestIntersection.y,
                text: `${textAngle}°`,
                type: 'clear',
                fontSize: 14,
                offsetDistance: bullseyeInArea ? 15 : 0,
                offsetAngle: (angle * Math.PI / 180) + (bullseyeData['map-orientation'] * Math.PI / 180),
                textAngle: 0,
                padding: 0
              });

              displayedAngles.push(textAngle);
            }
          }
        }

        if (bullseyeData['half-lines']) {
          dashed = !dashed;
          displayText = !displayText;
        }
      }

      // Draw rings
      if (bullseyeData['ring-ranges'] > 0) {
        const maxRadius = this.furthestPoint * this.furthestPointMargin; // Furthest point determines the maximum radius
        const ringCount = Math.ceil(maxRadius / bullseyeData['ring-ranges']); // Calculate how many rings to draw
        for (let i = 1; i <= ringCount + 1; i++) {
          const radius = i * bullseyeData['ring-ranges'];

          this.mapDrawUtils.drawRing(0, 0, radius, '#555'); // Draw each ring

          // Add rings range to drawPoints array
          if (bullseyeData['ring-range-positions']?.length > 0) {
            bullseyeData['ring-range-positions'].forEach((rangePosition) => {
              const ringsRangeAngle = Math.round(rangePosition['ring-range-position'] / linesAngle) * linesAngle;
              const angleRad = ((ringsRangeAngle - 90) * Math.PI / 180) + (bullseyeData['map-orientation'] * Math.PI / 180);
              const ringTextX = radius * Math.cos(angleRad);
              const ringTextY = radius * Math.sin(angleRad);

              if (!bullseyeInArea || this.utils.isPointWithinArea({ x: ringTextX, y: ringTextY }, areaPoints)) {
                this.pointNamesData.push({
                  limitToArea: false,
                  x: ringTextX,
                  y: ringTextY,
                  text: radius,
                  type: 'clear',
                  fontSize: 14,
                  offsetDistance: 8,
                  offsetAngle: angleRad,
                  textAngle: 0,
                  padding: 0
                });
              }
            });
          }
        }
      }

      // Draw bullseye dot
      this.mapDrawUtils.drawBullseye(0, 0, 'black');

      if (bullseyeData['name'] != '' && bullseyeData['name'] != undefined && bullseyeData['display']) {
        const angleRad = ((bullseyeData['name-position'] - 90) * Math.PI / 180) + (bullseyeData['map-orientation'] * Math.PI / 180);
        this.pointNamesData.push({
          limitToArea: bullseyeInArea,
          x: 0,
          y: 0,
          text: bullseyeData['name'],
          type: 'clear',
          fontSize: 16,
          offsetDistance: 25,
          offsetAngle: angleRad,
          textAngle: 0,
          padding: 0
        });
      }

      this.mapDrawUtils.unclipCanvas();
    }
  }

  drawBaseLines(component, limitToArea, mapOrientation) {
    const baselineData = this.getComponentData(component);

    if (baselineData && baselineData.display) {
      this.mapDrawUtils.drawBaseLines(baselineData['location'] ?? 'top-left', this.utils.isNumber(baselineData['magnetic-declination']) ? baselineData['magnetic-declination'] : 0, mapOrientation);
    }
  }

  drawMapArea(component, limitToArea, mapOrientation) {
    const mapAreaData = this.getComponentData(component);

    if (mapAreaData && mapAreaData.points?.length > 0) {
      for (let i = 0; i < mapAreaData.points.length; i++) {
        const nextAreaPointIndex = (i + 1) % mapAreaData.points.length;

        if (this.utils.isNumber(mapAreaData.points[i]['azimuth']) && this.utils.isNumber(mapAreaData.points[i]['distance'])) {
          const startAngleRad = ((mapAreaData.points[i]['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
          const startX = mapAreaData.points[i]['distance'] * Math.cos(startAngleRad);
          const startY = mapAreaData.points[i]['distance'] * Math.sin(startAngleRad);

          if (mapAreaData.points[i]['name'] != '' && mapAreaData.points[i]['name'] != undefined) {
            this.pointNamesData.push({
              limitToArea: false,
              x: startX,
              y: startY,
              text: mapAreaData.points[i]['name'],
              type: 'square',
              fontSize: 16,
              offsetDistance: 0,
              offsetAngle: 0,
              textAngle: 0,
              padding: 2
            });
          }

          if (this.utils.isNumber(mapAreaData.points[nextAreaPointIndex]['azimuth']) && this.utils.isNumber(mapAreaData.points[nextAreaPointIndex]['distance'])) {
            const endAngleRad = ((mapAreaData.points[nextAreaPointIndex]['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
            const endX = mapAreaData.points[nextAreaPointIndex]['distance'] * Math.cos(endAngleRad);
            const endY = mapAreaData.points[nextAreaPointIndex]['distance'] * Math.sin(endAngleRad);

            this.mapDrawUtils.drawLine(startX, startY, endX, endY, 'black', 3, 'simple');
          }
        }
      };
    }
  }

  drawLines(component, limitToArea, mapOrientation, areaPoints) {
    const linesData = this.getComponentData(component);

    if (linesData && linesData.lines?.length > 0) {
      if (limitToArea && areaPoints.length > 2) {
        this.mapDrawUtils.clipCanvas(areaPoints);
      }

      linesData.lines.forEach(lineData => {
        if (lineData.points) {
          for (let i = 1; i < lineData.points.length; i++) {
            if (this.utils.isNumber(lineData.points[i - 1]['azimuth']) && this.utils.isNumber(lineData.points[i - 1]['distance'])
              && this.utils.isNumber(lineData.points[i]['azimuth']) && this.utils.isNumber(lineData.points[i]['distance'])) {
              const startAngleRad = ((lineData.points[i - 1]['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
              const startX = lineData.points[i - 1]['distance'] * Math.cos(startAngleRad);
              const startY = lineData.points[i - 1]['distance'] * Math.sin(startAngleRad);

              const endAngleRad = ((lineData.points[i]['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
              const endX = lineData.points[i]['distance'] * Math.cos(endAngleRad);
              const endY = lineData.points[i]['distance'] * Math.sin(endAngleRad);

              const color = lineData['color'] ?? component.fields.find(field => field.id == 'lines').fields.find(field => field.id == 'color').default;
              const type = lineData['type'] ?? component.fields.find(field => field.id == 'lines').fields.find(field => field.id == 'type').default;

              this.mapDrawUtils.drawLine(startX, startY, endX, endY, color, 3, type);
            }
          };
        }
      });
    }

    this.mapDrawUtils.unclipCanvas();
  }

  drawRings(component, limitToArea, mapOrientation, areaPoints) {
    const ringsData = this.getComponentData(component);

    if (ringsData && ringsData.rings?.length > 0) {
      if (limitToArea && areaPoints.length > 2) {
        this.mapDrawUtils.clipCanvas(areaPoints);
      }

      ringsData.rings.forEach((ring) => {
        const angleRad = ((ring['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
        const x = ring['distance'] * Math.cos(angleRad);
        const y = ring['distance'] * Math.sin(angleRad);

        const color = ring['color'] ?? component.fields.find(field => field.id == 'rings').fields.find(field => field.id == 'color').default;
        const fill = ring['fill'] ?? component.fields.find(field => field.id == 'rings').fields.find(field => field.id == 'fill').default;

        this.mapDrawUtils.drawRing(x, y, ring.radius, color, 2, fill);

        if (ring['name'] != '' && ring['name'] != undefined) {
          let type = '';
          switch (ring['type']) {
            case 'area':
              type = 'clear';
              break;
            case 'threat':
              type = "plus-bottom";
              break;
          }

          this.pointNamesData.push({
            limitToArea: false,
            x,
            y,
            text: ring['name'],
            type,
            fontSize: 16,
            offsetDistance: 0,
            offsetAngle: 0,
            textAngle: 0,
            padding: 2
          });
        }
      });

      this.mapDrawUtils.unclipCanvas();
    }
  }

  drawAreas(component, limitToArea, mapOrientation, areaPoints) {
    const areasData = this.getComponentData(component);

    if (areasData.areas && areasData.areas?.length > 0) {
      if (limitToArea && areaPoints.length > 2) {
        this.mapDrawUtils.clipCanvas(areaPoints);
      }

      areasData.areas.forEach(area => {
        if (area && area.points?.length > 0) {
          const corners = [];

          const color = area['color'] ?? component.fields.find(field => field.id == 'areas').fields.find(field => field.id == 'color').default;
          const type = area['type'] ?? component.fields.find(field => field.id == 'areas').fields.find(field => field.id == 'type').default;
          const fill = area['fill'] ?? component.fields.find(field => field.id == 'areas').fields.find(field => field.id == 'fill').default;

          area.points.forEach(areaPoint => {
            const angleRad = ((areaPoint['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
            const x = areaPoint['distance'] * Math.cos(angleRad);
            const y = areaPoint['distance'] * Math.sin(angleRad);

            corners.push({ x, y });
          });

          this.mapDrawUtils.drawPolygon(corners, color, 3, type, fill);

          if (area['name'] != '' && area['name'] != undefined) {
            const { x: areaNameX, y: areaNameY } = this.utils.getCenter(corners);

            this.pointNamesData.push({
              limitToArea: false,
              x: areaNameX,
              y: areaNameY,
              text: area['name'],
              type: 'clear',
              fontSize: 16,
              offsetDistance: 0,
              offsetAngle: 0,
              textAngle: 0,
              padding: 2
            });
          }
        }
      });
    }

    this.mapDrawUtils.unclipCanvas();
  }

  drawRacetracks(component, limitToArea, mapOrientation, areaPoints) {
    const racetracksData = this.getComponentData(component);

    if (racetracksData && racetracksData.racetracks?.length > 0) {
      if (limitToArea && areaPoints.length > 2) {
        this.mapDrawUtils.clipCanvas(areaPoints);
      }

      racetracksData.racetracks.forEach(racetrack => {
        racetrack['orientation'] = this.utils.isNumber(racetrack['orientation']) ? racetrack['orientation'] : 0
        if (
          this.utils.isNumber(racetrack['azimuth'])
          && this.utils.isNumber(racetrack['distance'])
          && this.utils.isNumber(racetrack['length']) && racetrack['length'] >= 0
          && this.utils.isNumber(racetrack['width']) && racetrack['width'] >= 0
        ) {
          const angleRad = ((racetrack['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
          const x = racetrack['distance'] * Math.cos(angleRad);
          const y = racetrack['distance'] * Math.sin(angleRad);

          const side = racetrack['side'] ? racetrack['side'] == 'left' : component.fields.find(field => field.id == 'racetracks').fields.find(field => field.id == 'side').default == 'left';
          const color = racetrack['color'] ?? component.fields.find(field => field.id == 'racetracks').fields.find(field => field.id == 'color').default;

          this.mapDrawUtils.drawRacetrack(x, y, racetrack['length'], racetrack['width'], (racetrack['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), side, color);

          if (racetrack['racetrack-name'] != '' && racetrack['racetrack-name'] != undefined) {
            const corners = this.utils.getRacetrackCorners(x, y, racetrack['length'], racetrack['width'], racetrack['orientation'], racetrack.side == 'left', mapOrientation);

            const { x: racetrackNamex, y: racetrackNameY } = this.utils.getCenter(corners);

            let racetrackNameAngle = (((racetrack['orientation'] + 90) * (Math.PI / 180)) % 360) + (mapOrientation * Math.PI / 180);
            if (racetrackNameAngle <= Math.PI * 1.5 && racetrackNameAngle >= Math.PI / 2) {
              racetrackNameAngle -= Math.PI;
            }

            this.pointNamesData.push({
              limitToArea: false,
              x: racetrackNamex,
              y: racetrackNameY,
              text: racetrack['racetrack-name'],
              type: 'clear',
              fontSize: 16,
              offsetDistance: 0,
              offsetAngle: 0,
              textAngle: racetrackNameAngle,
              padding: 0
            });
          }

          if (racetrack['point-name'] != '' && racetrack['point-name'] != undefined) {
            this.pointNamesData.push({
              limitToArea: false,
              x,
              y,
              text: racetrack['point-name'],
              type: 'square',
              fontSize: 16,
              offsetDistance: 0,
              offsetAngle: 0,
              textAngle: 0,
              padding: 2
            });
          }
        }
      });
    }

    this.mapDrawUtils.unclipCanvas();
  }

  drawObjects(component, limitToArea, mapOrientation, areaPoints) {
    const objectsData = this.getComponentData(component);

    if (objectsData && objectsData.objects?.length > 0) {
      objectsData.objects.forEach((object) => {
        if (this.utils.isNumber(object['azimuth']) && this.utils.isNumber(object['distance'])) {
          const angleRad = ((object['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
          const x = object['distance'] * Math.cos(angleRad);
          const y = object['distance'] * Math.sin(angleRad);

          const color = object['color'] ?? component.fields.find(field => field.id == 'objects').fields.find(field => field.id == 'color').default;

          switch (object.type) {
            case 'airfield':
              this.mapDrawUtils.drawAirbase(x, y, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), color);
              break;
            case 'gate':
              this.mapDrawUtils.drawGate(x, y, 15, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), color)
              break;
            case 'arrow':
              this.mapDrawUtils.drawArrow(x, y, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), 10, 5, color);
              break;
            case '1-aircraft':
              this.mapDrawUtils.drawAircraft(x, y, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), 1, color);
              break;
            case '2-aircraft':
              this.mapDrawUtils.drawAircraft(x, y, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), 2, color);
              break;
            case '3-aircraft':
              this.mapDrawUtils.drawAircraft(x, y, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), 3, color);
              break;
            case '4-aircraft':
              this.mapDrawUtils.drawAircraft(x, y, (object['orientation'] * Math.PI / 180) + (mapOrientation * Math.PI / 180), 4, color);
              break;
          }
          if (object['name'] != '' && object['name'] != undefined) {
            const nameAngleRad = ((object['name-position'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
            this.pointNamesData.push({
              limitToArea: false,
              x,
              y,
              text: object['name'],
              type: 'clear',
              fontSize: 14,
              offsetDistance: 20,
              offsetAngle: nameAngleRad,
              textAngle: 0,
              padding: 0
            });
          }
        }
      });
    }
  }

  drawPoints(component, limitToArea, mapOrientation, areaPoints) {
    const pointsData = this.getComponentData(component);

    if (pointsData && pointsData.points?.length > 0) {
      pointsData.points.forEach((point) => {
        if (this.utils.isNumber(point['azimuth']) && this.utils.isNumber(point['distance'])) {
          const angleRad = ((point['azimuth'] - 90) * Math.PI / 180) + (mapOrientation * Math.PI / 180);
          const x = point['distance'] * Math.cos(angleRad);
          const y = point['distance'] * Math.sin(angleRad);

          const type = point['type'] ?? component.fields.find(field => field.id == 'points').fields.find(field => field.id == 'type').default;
          const fill = point['fill'] ?? component.fields.find(field => field.id == 'points').fields.find(field => field.id == 'fill').default;

          if (point['name'] != '' && point['name'] != undefined) {
            this.pointNamesData.push({
              limitToArea: false,
              x,
              y,
              text: point['name'],
              type,
              fill,
              fontSize: 16,
              offsetDistance: 0,
              offsetAngle: 0,
              textAngle: 0,
              padding: 2
            });
          }
        }
      });
    }
  }

  drawPointNames(areaPoints) {
    this.pointNamesData.forEach(pointNameData => {
      if (pointNameData.limitToArea) {
        this.mapDrawUtils.clipCanvas(areaPoints);
      }

      this.mapDrawUtils.drawText(pointNameData.x, pointNameData.y, pointNameData.text, pointNameData.type, pointNameData.fontSize, pointNameData.offsetDistance, pointNameData.offsetAngle, pointNameData.textAngle, pointNameData.padding, pointNameData.fill);

      this.mapDrawUtils.unclipCanvas();
    });
  }

  getComponentData(mapComponent) {
    let store = null;
    try {
      store = JSON.parse(localStorage.getItem('bullseye-map-data')) || {};
    } catch (e) {
      store = {};
    }

    if (typeof mapComponent === 'object') {
      const data = store[mapComponent.id];
      if (data === undefined || data === null) {
        return mapComponent['type'] == 'multiple' ? [] : {};
      }
      return data;
    } else if (typeof mapComponent === 'string') {
      return store[mapComponent];
    }

    return null;
  }

  saveComponentData(mapComponent, componentData) {
    // Persist into a single object under 'bullseye-map-data'
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem('bullseye-map-data')) || {};
    } catch (e) {
      store = {};
    }

    const key = typeof mapComponent === 'object' ? mapComponent.id : mapComponent;
    if (!key) return;

    store[key] = componentData;
    localStorage.setItem('bullseye-map-data', JSON.stringify(store));
  }

  async importData() {
    const mapData = await this.utils.importData('.json');

    if (mapData) {
      localStorage.setItem('bullseye-map-data', JSON.stringify(mapData));

      this.updateMap();
    }
  }

  showExportModal() {
    const exportModal = $('.export-options-modal');

    $(exportModal).find('.file-name').val('');
    $(exportModal).addClass('show');

    $(exportModal).off('click').on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
        $(exportModal).removeClass('show');
      }
    });

    $(exportModal).find('.export-data-button').off('click').on('click', () => {
      const mapData = localStorage.getItem('bullseye-map-data');

      const fileName = $(exportModal).find('.file-name').val();
      this.utils.exportData(mapData, fileName != '' ? fileName : 'bullseye_map');

      $(exportModal).removeClass('show');
    });
  }

  showDownloadModal() {
    const downloadModal = $('.download-options-modal');

    $(downloadModal).find('.format-a4').prop('checked', false);
    $(downloadModal).find('.transparent-background').prop('checked', false);
    $(downloadModal).find('.file-name').val('');
    $(downloadModal).addClass('show');

    $(downloadModal).off('click').on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
        $(downloadModal).removeClass('show');
      }
    });

    $(downloadModal).find('.download-map-button').off('click').on('click', () => {
      if ($(downloadModal).find('.format-a4').is(':checked')) {
        this.mapDrawUtils.canvas.width = 800;
        this.mapDrawUtils.canvas.height = 1131;

        this.updateMap();
      }

      if (!$(downloadModal).find('.transparent-background').is(':checked')) {
        this.mapDrawUtils.drawBackground('white');
      }

      const fileName = $(downloadModal).find('.file-name').val();
      this.utils.downloadMap($('.map-canvas')[0], fileName != '' ? fileName : 'bullseye_map');

      $(downloadModal).removeClass('show');

      this.mapDrawUtils.canvas.width = 800;
      this.mapDrawUtils.canvas.height = 800;

      this.updateMap();
    });
  }

  resetMap() {
    if (window.confirm('Are you sure ? All data will be lost.')) {
      this.mapFieldsUtils.displayComponentListButtons();

      localStorage.removeItem('bullseye-map-data');

      this.updateMap();
    }
  }
}