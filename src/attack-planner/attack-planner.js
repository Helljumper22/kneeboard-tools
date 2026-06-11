const AttackPlannerMode = {
  SELECT: 'select',
  PLACE: 'place',
  EDIT: 'edit',
  DRAG: 'drag',
  EDIT_MAP: 'edit-map',
  DRAG_MAP: 'drag-map',
  EDIT_RULER: 'edit-ruler',
  DRAG_RULER: 'drag-ruler',
};

const NavPointType = {
  TURN: 'turn',
  TURNING_POINT: 'turning-point',
  INITIAL_POINT: 'initial-point',
  TARGET_POINT: 'target-point',
};

const MapObjectType = { ...NavPointType }

const AttackPlannerNavPointText = {
  [NavPointType.TURN]: 'Turn',
  [NavPointType.TURNING_POINT]: 'Tunning point',
  [NavPointType.INITIAL_POINT]: 'Initial point',
  [NavPointType.TARGET_POINT]: 'Target point',
};

const DISTANCE_STEPS_NM = [0.5, 1, 2, 5, 10, 20, 50, 100];
const TIME_STEPS_SEC = [5, 10, 20, 30, 60, 120, 300, 600, 1200, 1800, 3600];

class AttackPlanner {
  mapComponentList = [
    {
      id: 'background-map',
      label: 'Background map',
      description: '',
      fields: [
        {
          id: 'x',
          label: 'x',
          type: 'hidden',
        },
        {
          id: 'y',
          label: 'y',
          type: 'hidden',
        },
        {
          id: 'scale',
          label: 'scale',
          type: 'hidden',
        },
        {
          id: 'rotation',
          label: 'rotation',
          type: 'hidden',
        },
        {
          id: 'rule-scale',
          label: 'Rule scale (nm)',
          type: 'number',
        },
        {
          id: 'ruler-point-1',
          label: 'ruler-point-1',
          type: 'hidden',
        },
        {
          id: 'ruler-point-2',
          label: 'ruler-point-2',
          type: 'hidden',
        },
        {
          id: 'nm-per-image-pixel',
          label: 'nm-per-image-pixel',
          type: 'hidden',
        },
        {
          id: 'upload-map',
          label: 'Upload map',
          type: 'button',
          clickFunction: this.uploadBackgroundMap.bind(this)
        },
        {
          id: 'edit-map',
          label: 'Edit map',
          type: 'button',
          clickFunction: this.editBackgroundMap.bind(this)
        },
        {
          id: 'edit-scale',
          label: 'Edit scale',
          type: 'button',
          clickFunction: this.editBackgroundScale.bind(this)
        }
      ],
      drawFunction: this.drawBackgroundMap.bind(this)
    }, // Background map
    {
      id: 'flight-plans',
      label: 'Flight plans',
      description: '',
      fields: [
        {
          id: 'flight-plans',
          label: 'Flight plans',
          type: 'multiple',
          options: {
            addSubComponentButton: 'Add flight plan',
          },
          fields: [
            {
              id: 'name',
              label: 'Name',
              type: 'text',
            },
            {
              id: 'nav-points',
              label: 'Nav points',
              type: 'multiple',
              options: {
                deletable: true,
                sortable: true
              },
              fields: [
                {
                  id: 'ground-speed',
                  label: 'Ground speed (kt)',
                  type: 'number',
                  default: 400
                },
                {
                  id: 'type',
                  label: 'Type',
                  type: 'select',
                  options: AttackPlannerNavPointText,
                  default: NavPointType.TURN,
                },
                {
                  id: 'overfly',
                  label: 'Overfly',
                  type: 'checkbox',
                },
                {
                  id: 'bank-angle',
                  label: 'Bank angle (°)',
                  type: 'number',
                  default: 60,
                  onChangeFunction: this.syncBankAngleLoadFactor.bind(this),
                },
                {
                  id: 'load-factor',
                  label: 'Load factor (G)',
                  type: 'number',
                  default: 2,
                  onChangeFunction: this.syncBankAngleLoadFactor.bind(this),
                },
                {
                  id: 'leg-information',
                  label: 'Leg information',
                  type: 'select',
                  options: {
                    'none': 'None',
                    'distance': 'Distance',
                    'time': 'Time',
                    'both': 'Both',
                  },
                  default: 'none',
                },
                {
                  id: 'leg-information-scale',
                  label: 'Leg information scale',
                  type: 'range',
                  options: {
                    min: 0,
                    max: 100
                  },
                  default: 50,
                },
                {
                  id: 'x',
                  label: 'x',
                  type: 'hidden',
                },
                {
                  id: 'y',
                  label: 'y',
                  type: 'hidden',
                },
                {
                  id: 'size',
                  label: 'size',
                  type: 'hidden',
                },
              ]
            },
            {
              id: 'add-nav-point',
              label: 'Add nav point',
              type: 'button',
              clickFunction: this.placeNavPoint.bind(this)
            }
          ],
        }
      ],
      drawFunction: this.drawFlightPlan.bind(this)
    }, // Flight plan
  ]

  constructor() {
    this.attackPlannerCanvas = '.attack-planner-canvas';
    this.attackPlannerBackgroundCanvas = '.attack-planner-background-canvas';

    this.utils = new Utils();
    this.mapDrawUtils = new MapDrawUtils(this.attackPlannerCanvas);
    this.backgroundMapDrawUtils = new MapDrawUtils(this.attackPlannerBackgroundCanvas);
    this.mapFieldsUtils = new MapFieldsUtils(this, $('.tab[attr-tab="attack-planner-tab"]'), false);

    this.height = 1056;
    this.width = 760;
    this.furthestPoint = this.width / 2;

    this.backgroundColor = ['#FFFFFF', '#000000'];
    this.bullseyeLinesColor = ['#555555', '#AAAAAA'];
    this.defaultLineColor = ['#000000', '#e9e9e9'];

    this.attackPlannerDataKey = 'attack-planner-data';
    this.attackPlannerBackgroundImageKey = 'attack-planner-background-image';
    this.attackPlannerDarkModeKey = 'attack-planner-dark-mode';

    this.backgroundImageObject = null;

    this.darkMode = false;
    this.attackPlannerMode = AttackPlannerMode.SELECT;
    this.selectedComponentPath = null;
    this.nmPerImagePixel = null;

    this.init();

    $('.import-attack-planner-button').off('click').on('click', async () => this.importData());
    $('.show-export-attack-planner-modal-button').off('click').on('click', () => this.showExportModal());
    $('.show-download-attack-planner-modal-button').off('click').on('click', () => this.showDownloadModal());
    $('.reset-attack-planner-button').off('click').on('click', () => this.resetMap());
  }

  async init() {
    this.getDarkMode();

    $(this.attackPlannerBackgroundCanvas).css('background', this.darkMode ? this.backgroundColor[1] : this.backgroundColor[0])

    // Update bullseye data when dark mode is changed.
    $('.attack-planner-dark-mode').on('change', () => this.updateDarkMode());

    const backgroundImage = localStorage.getItem(this.attackPlannerBackgroundImageKey);
    if (backgroundImage) {
      this.backgroundImageObject = await this.backgroundMapDrawUtils.getImage(backgroundImage);
      this.drawBackgroundMap();
    }

    this.setSelectMode()

    this.mapFieldsUtils.displayComponentListButtons();
  }

  getDarkMode() {
    this.darkMode = localStorage.getItem(this.attackPlannerDarkModeKey) === 'true';
    $('.bullseye-dark-mode').prop('checked', this.darkMode);
  }

  setSelectMode() {
    this.selectedComponentPath = null;

    this.attackPlannerMode = AttackPlannerMode.SELECT;

    console.log('SELECT MODE');

    $(this.attackPlannerCanvas).off('wheel').css('cursor', 'default');

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', async (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      this.setEditMode(clickPosition.x, clickPosition.y)
    });

    this.update();

    const selectableComponents = this.getMapComponents(this.getComponentData()).map(mc => {
      const cp = this.imageToCanvas(mc.component.x, mc.component.y);
      return { x: cp.x, y: cp.y, size: mc.component.size / 1.5 };
    });

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);


      this.updateCursor(pos.x, pos.y, selectableComponents);
    });
  }

  setEditMode(clickX, clickY) {
    const mapComponents = this.getMapComponents(this.getComponentData());
    for (let i = mapComponents.length - 1; i >= 0; i--) {
      const componentBounds = this.getObjectBounds(mapComponents[i].component);
      if (this.utils.isPointWithinArea({ x: clickX, y: clickY }, componentBounds)) {
        this.selectedComponentPath = mapComponents[i].path;

        this.setDragMode(mapComponents[i].component, mapComponents[i].path, clickX, clickY);

        this.update();

        $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
          const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

          if (!this.utils.isPointWithinArea({ x: clickPosition.x, y: clickPosition.y }, componentBounds)) {
            this.setEditMode(clickPosition.x, clickPosition.y);
          }
        });
        return;
      }
    }

    this.setSelectMode();
  }

  editObject(component, componentPath) {
    if (this.attackPlannerMode != AttackPlannerMode.DRAG) {
      return;
    }

    this.attackPlannerMode = AttackPlannerMode.EDIT;

    console.log('EDIT MODE');

    const objectBounds = this.getObjectBounds(component);

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      if (this.utils.isPointWithinArea({ x: clickPosition.x, y: clickPosition.y }, objectBounds)) {
        this.setDragMode(component, componentPath, clickPosition.x, clickPosition.y);
      } else {
        this.setEditMode(clickPosition.x, clickPosition.y);
      }
    });
  }

  setDragMode(component, componentPath, startX, startY) {
    if (this.attackPlannerMode != AttackPlannerMode.SELECT && this.attackPlannerMode != AttackPlannerMode.EDIT) {
      return;
    }

    this.attackPlannerMode = AttackPlannerMode.DRAG;

    console.log('DRAG MODE');

    $(this.attackPlannerCanvas).css('cursor', 'grabbing');

    this.mapFieldsUtils.displayComponent(this.mapComponentList.find(mapComponent => mapComponent.id == componentPath[0]));
    this.mapFieldsUtils.selectField(this.selectedComponentPath);

    let lastCanvasPos = { x: startX, y: startY };

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const canvasPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      const curr = this.canvasToImage(canvasPos.x, canvasPos.y);
      const last = this.canvasToImage(lastCanvasPos.x, lastCanvasPos.y);

      const precision = event.altKey ? 0.1 : 1;
      component.x += (curr.x - last.x) * precision;
      component.y += (curr.y - last.y) * precision;

      lastCanvasPos = canvasPos;

      let mapComponent = this.getComponentData(componentPath[0]);

      const recurse = (currentComponent, pathIndex) => {
        if (componentPath[pathIndex] !== undefined) {
          const key = componentPath[pathIndex];

          if (currentComponent[key]) {
            currentComponent[key] = recurse(
              currentComponent[key],
              pathIndex + 1
            );
          }
          return currentComponent;
        }

        return component;
      };
      mapComponent = recurse(mapComponent, 1);

      this.saveComponentData(componentPath[0], mapComponent);

      this.update();
    });

    $(this.attackPlannerCanvas).off('mouseup').on('mouseup', (event) => {
      $(this.attackPlannerCanvas).off('mousemove').off('mouseup');

      this.editObject(component, componentPath);

      const hoverables = this.getMapComponents(this.getComponentData()).map(mc => {
        const cp = this.imageToCanvas(mc.component.x, mc.component.y);
        return { x: cp.x, y: cp.y, size: mc.component.size / 1.5 };
      });

      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      this.updateCursor(pos.x, pos.y, hoverables);

      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
        this.updateCursor(pos.x, pos.y, hoverables);
      });
    });
  }

  updateCursor(x, y, hoverables = []) {
    const hovering = hoverables.some(h =>
      h.points
        ? this.utils.isPointWithinArea({ x, y }, h.points)
        : Math.hypot(x - h.x, y - h.y) <= h.size
    );
    $(this.attackPlannerCanvas).css('cursor', hovering ? 'pointer' : 'default');
  }

  update() {
    this.mapDrawUtils.clearCanvas();
    this.mapDrawUtils.setToForeground();

    // Update the scale in DrawUtils
    this.mapDrawUtils.setScale(this.furthestPoint);

    // Update DrawUtils center
    this.mapDrawUtils.setCenter(this.width / 2, this.height / 2);

    const bgData = this.getComponentData(this.mapComponentList.find(mapComponent => mapComponent.id === 'background-map'))
    this.nmPerImagePixel = this.computeRulerCalibration(bgData['ruler-point-1'], bgData['ruler-point-2'], bgData['rule-scale']);

    this.mapComponentList.forEach(mapComponent => {
      if (mapComponent.id != 'background-map') {
        mapComponent.drawFunction(mapComponent);
      }
    });

    switch (this.attackPlannerMode) {
      case AttackPlannerMode.EDIT:
      case AttackPlannerMode.DRAG:
        if (this.selectedComponentPath) {
          const [fieldIdFirst, ...remainingPath] = this.selectedComponentPath;
          let component = this.getComponentData(this.mapComponentList.find(mapComponent => mapComponent.id === fieldIdFirst))

          remainingPath.forEach(path => {
            component = component[path];
          });

          const bounds = this.getObjectBounds(component);
          if (bounds.length !== 0) {
            this.mapDrawUtils.drawSelectionOutline(bounds, 4, '#4af', true);
          }
        }
        break;
      case AttackPlannerMode.EDIT_MAP:
      case AttackPlannerMode.DRAG_MAP:
        if (this.backgroundImageObject) {
          const { x, y, scale, rotation } = this.getBackgroundTransform();
          const halfW = (this.backgroundImageObject.width * scale) / 2;
          const halfH = (this.backgroundImageObject.height * scale) / 2;
          const cos = Math.cos(rotation);
          const sin = Math.sin(rotation);
          const toWorld = (lx, ly) => ({
            x: x + lx * cos - ly * sin,
            y: y + lx * sin + ly * cos,
          });

          this.mapDrawUtils.drawSelectionOutline([
            toWorld(-halfW, -halfH),
            toWorld(+halfW, -halfH),
            toWorld(+halfW, +halfH),
            toWorld(-halfW, +halfH),
          ], 4, '#4af');
        }
        break;
      case AttackPlannerMode.EDIT_RULER:
      case AttackPlannerMode.DRAG_RULER:
        const rulerPoint1 = bgData['ruler-point-1'] ? this.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y) : null;
        const rulerPoint2 = bgData['ruler-point-2'] ? this.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y) : null;
        this.drawRuler(rulerPoint1, rulerPoint2);

        break;
    }
  }

  uploadBackgroundMap(field, data, component, fieldId) {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.png,.jpg,.jpeg';

      input.onchange = (event) => {
        const file = event.target.files[0];

        if (!file) {
          reject(new Error('No file selected'));
          return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
          const base64 = e.target.result;

          localStorage.setItem(this.attackPlannerBackgroundImageKey, base64);

          this.backgroundImageObject = await this.mapDrawUtils.getImage(base64);

          this.drawBackgroundMap();

          resolve(base64);
        };

        reader.onerror = () => {
          reject(new Error('Failed to read image'));
        };

        reader.readAsDataURL(file);
      };

      input.click();
    });
  }

  editBackgroundMap(field, data, component, fieldId) {
    if (this.attackPlannerMode === AttackPlannerMode.EDIT_MAP) {
      this.setSelectMode();
      return;
    }

    console.log('EDIT MAP MODE');

    this.attackPlannerMode = AttackPlannerMode.EDIT_MAP;
    const bgMapComponent = this.mapComponentList.find(mc => mc.id === 'background-map');

    const bindMapHoverCursor = () => {
      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        if (this.attackPlannerMode !== AttackPlannerMode.EDIT_MAP) return;
        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

        const { x, y, scale, rotation } = this.getBackgroundTransform();
        const halfW = this.backgroundImageObject.width * scale / 2;
        const halfH = this.backgroundImageObject.height * scale / 2;
        const cos = Math.cos(rotation), sin = Math.sin(rotation);
        const corner = (lx, ly) => ({ x: x + lx * cos - ly * sin, y: y + lx * sin + ly * cos });

        this.updateCursor(pos.x, pos.y, [{ points: [corner(-halfW, -halfH), corner(+halfW, -halfH), corner(+halfW, +halfH), corner(-halfW, +halfH)] }]);
      });
    };
    bindMapHoverCursor();

    $(this.attackPlannerCanvas).off('wheel').on('wheel', (event) => {
      event.preventDefault();
      const transform = this.getBackgroundTransform();
      const bgData = this.getComponentData(bgMapComponent) || {};
      bgData.x = transform.x;
      bgData.y = transform.y;

      if (event.originalEvent.altKey) {
        bgData.scale = transform.scale;
        bgData.rotation = transform.rotation + (event.originalEvent.deltaY < 0 ? -0.025 : 0.025);
      } else {
        bgData.scale = Math.max(0.01, transform.scale * (event.originalEvent.deltaY < 0 ? 1.025 : 1 / 1.025));
        bgData.rotation = transform.rotation;
      }

      this.saveComponentData(bgMapComponent, bgData);
      this.drawBackgroundMap();
      this.update();
    });

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
      this.attackPlannerMode = AttackPlannerMode.DRAG_MAP;
      $(this.attackPlannerCanvas).css('cursor', 'grabbing');

      const clickPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      const transform = this.getBackgroundTransform();
      const dragOffset = { x: clickPos.x - transform.x, y: clickPos.y - transform.y };

      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        console.log('DRAG MAP MODE');

        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
        const bgData = this.getComponentData(bgMapComponent) || {};
        bgData.x = pos.x - dragOffset.x;
        bgData.y = pos.y - dragOffset.y;
        bgData.scale = bgData.scale ?? transform.scale;
        bgData.rotation = bgData.rotation ?? transform.rotation;
        this.saveComponentData(bgMapComponent, bgData);
        this.drawBackgroundMap();
        this.update();
      });

      $(this.attackPlannerCanvas).off('mouseup').on('mouseup', (event) => {
        $(this.attackPlannerCanvas).off('mousemove').off('mouseup');
        this.attackPlannerMode = AttackPlannerMode.EDIT_MAP;
        bindMapHoverCursor();
        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
        const { x, y, scale, rotation } = this.getBackgroundTransform();
        const halfW = this.backgroundImageObject.width * scale / 2;
        const halfH = this.backgroundImageObject.height * scale / 2;
        const cos = Math.cos(rotation), sin = Math.sin(rotation);
        const corner = (lx, ly) => ({ x: x + lx * cos - ly * sin, y: y + lx * sin + ly * cos });
        this.updateCursor(pos.x, pos.y, [{ points: [corner(-halfW, -halfH), corner(+halfW, -halfH), corner(+halfW, +halfH), corner(-halfW, +halfH)] }]);
      });
    });

    this.update();
  }

  editBackgroundScale(field, data, component, fieldId) {
    if (this.attackPlannerMode === AttackPlannerMode.EDIT_RULER) {
      this.setSelectMode();
      return;
    }

    this.attackPlannerMode = AttackPlannerMode.EDIT_RULER;
    const bgMapComponent = this.mapComponentList.find(mc => mc.id === 'background-map');
    const bgData = this.getComponentData(bgMapComponent) || {};

    // Initialize the points to their default positions.
    if (!bgData['ruler-point-1'] || !bgData['ruler-point-2']) {
      bgData['ruler-point-1'] = bgData['ruler-point-1'] ?? this.canvasToImage(this.width / 2, this.height / 2 - 50);
      bgData['ruler-point-2'] = bgData['ruler-point-2'] ?? this.canvasToImage(this.width / 2, this.height / 2 + 50);

      this.saveComponentData(bgMapComponent, bgData);
    }

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      if (this.attackPlannerMode !== AttackPlannerMode.EDIT_RULER) return;
      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      const ruler1CanvasPosition = this.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
      const ruler2CanvasPosition = this.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);

      this.updateCursor(pos.x, pos.y, [{ ...ruler1CanvasPosition, size: 12 }, { ...ruler2CanvasPosition, size: 12 }]);
    });

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
      const clickPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      const hitPoint = this.getRulerPointHit(clickPos.x, clickPos.y, bgData['ruler-point-1'], bgData['ruler-point-2']);

      let lastCanvasPos = { x: clickPos.x, y: clickPos.y };

      if (hitPoint) {
        this.attackPlannerMode = AttackPlannerMode.DRAG_RULER;

        console.log('DRAG RULER MODE');

        $(this.attackPlannerCanvas).css('cursor', 'grabbing');

        $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
          const canvasPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

          const curr = this.canvasToImage(canvasPos.x, canvasPos.y);
          const last = this.canvasToImage(lastCanvasPos.x, lastCanvasPos.y);

          const precision = event.altKey ? 0.1 : 1;
          if (hitPoint === 1) {
            bgData['ruler-point-1'].x += (curr.x - last.x) * precision;
            bgData['ruler-point-1'].y += (curr.y - last.y) * precision;
          } else {
            bgData['ruler-point-2'].x += (curr.x - last.x) * precision;
            bgData['ruler-point-2'].y += (curr.y - last.y) * precision;
          }

          lastCanvasPos = canvasPos;

          this.saveComponentData(bgMapComponent, bgData);

          this.update();
        });

        $(this.attackPlannerCanvas).off('mouseup').on('mouseup', (event) => {
          $(this.attackPlannerCanvas).off('mousemove').off('mouseup');
          this.attackPlannerMode = AttackPlannerMode.EDIT_RULER;

          bgData['nm-per-image-pixel'] = this.computeRulerCalibration(bgData['ruler-point-1'], bgData['ruler-point-2'], bgData['rule-scale']);

          this.saveComponentData(bgMapComponent, bgData);

          this.update();

          const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
          const ruler1CanvasPosition = this.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
          const ruler2CanvasPosition = this.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);
          this.updateCursor(pos.x, pos.y, [{ ...ruler1CanvasPosition, size: 12 }, { ...ruler2CanvasPosition, size: 12 }]);

          $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
            if (this.attackPlannerMode !== AttackPlannerMode.EDIT_RULER) return;
            const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

            const ruler1CanvasPosition = this.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
            const ruler2CanvasPosition = this.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);

            this.updateCursor(pos.x, pos.y, [{ ...ruler1CanvasPosition, size: 12 }, { ...ruler2CanvasPosition, size: 12 }]);
          });
        });
      }
    });

    this.update();
  }

  placeNavPoint(field, data, component, fieldId) {
    if (this.attackPlannerMode != AttackPlannerMode.SELECT) {
      return;
    }

    console.log('PLACE MODE');

    this.attackPlannerMode = AttackPlannerMode.PLACE;

    $(this.attackPlannerCanvas).css('cursor', 'pointer');

    $(this.attackPlannerCanvas).off('click').on('click', (event) => {
      $(this.attackPlannerCanvas).off('click');

      $(this.attackPlannerCanvas).css('cursor', 'default');

      const clickPosition = this.utils.getCanvasClickPosition(
        event.clientX,
        event.clientY,
        $(this.attackPlannerCanvas)[0]
      );

      const imageRelativePosition = this.canvasToImage(clickPosition.x, clickPosition.y)

      const navPointsField = component.fields.find(f => f.id === 'nav-points');
      if (!navPointsField) return;

      const mapComponent = this.mapComponentList.find(mc => mc.id === fieldId.split('.')[0]);

      const dataFieldId = fieldId.split('.');
      dataFieldId.pop();
      dataFieldId.push('nav-points');

      // Find the index of the current flight plan
      const flightPlanIndex = $(`[data-field-id= '${dataFieldId.join('.')}']`).parent('.multiple-field-item').attr('data-index');

      this.mapFieldsUtils.addField(
        mapComponent,
        navPointsField,
        [component.id, flightPlanIndex, 'nav-points'],
        { x: imageRelativePosition.x, y: imageRelativePosition.y, size: 30 }
      );

      this.mapFieldsUtils.displayComponent(mapComponent);

      this.setSelectMode();
    });
  }

  drawBackgroundMap() {
    this.backgroundMapDrawUtils.clearCanvas();
    if (this.backgroundImageObject) {
      const { x, y, scale, rotation } = this.getBackgroundTransform();
      this.backgroundMapDrawUtils.drawImage(this.backgroundImageObject, x, y, scale, rotation);
    }
  }

  drawRuler(rulerPoint1, rulerPoint2) {
    if (rulerPoint1 && rulerPoint2) {
      this.mapDrawUtils.drawLine(rulerPoint1.x, rulerPoint1.y, rulerPoint2.x, rulerPoint2.y, 'white', 6);
      this.mapDrawUtils.drawLine(rulerPoint1.x, rulerPoint1.y, rulerPoint2.x, rulerPoint2.y, 'black', 3);
    }
    if (rulerPoint1) {
      this.mapDrawUtils.drawCircle(rulerPoint1.x, rulerPoint1.y, 20, 6, 'white', true);
      this.mapDrawUtils.drawCircle(rulerPoint1.x, rulerPoint1.y, 20, 3, 'black');
    }
    if (rulerPoint2) {
      this.mapDrawUtils.drawCircle(rulerPoint2.x, rulerPoint2.y, 20, 6, 'white', true);
      this.mapDrawUtils.drawCircle(rulerPoint2.x, rulerPoint2.y, 20, 3, 'black');
    }
  }

  drawFlightPlan(component) {
    const flightPlansData = this.getComponentData(component);

    if (flightPlansData && flightPlansData['flight-plans']?.length > 0) {

      flightPlansData['flight-plans'].forEach(flightPlanData => {
        if (flightPlanData['nav-points'] && flightPlanData['nav-points'].length > 0) {
          const navPoints = flightPlanData['nav-points'];

          // Pass 1: pre-compute turn tangents for all TURN nav points.
          const turnTangents = {};
          if (this.nmPerImagePixel) {
            const { scale } = this.getBackgroundTransform();

            for (let i = 0; i < navPoints.length; i++) {
              const navPoint = navPoints[i];

              const prevNavPoint = navPoints[i - 1];
              const nextNavPoint = navPoints[i + 1];
              if (!prevNavPoint || !nextNavPoint) continue;

              const prev = this.imageToCanvas(prevNavPoint.x, prevNavPoint.y);
              const curr = this.imageToCanvas(navPoint.x, navPoint.y);
              const next = this.imageToCanvas(nextNavPoint.x, nextNavPoint.y);

              // If the previous nav point has a computed arc, the aircraft exits at T2 — use that as the effective incoming origin.
              const prevExit = turnTangents[i - 1] ? turnTangents[i - 1].T2 : prev;
              const lenIn = Math.hypot(curr.x - prevExit.x, curr.y - prevExit.y);
              const lenOut = Math.hypot(next.x - curr.x, next.y - curr.y);
              const dIn = { x: (curr.x - prevExit.x) / lenIn, y: (curr.y - prevExit.y) / lenIn };
              const dOut = { x: (next.x - curr.x) / lenOut, y: (next.y - curr.y) / lenOut };

              const delta = Math.atan2(
                dIn.x * dOut.y - dIn.y * dOut.x,
                dIn.x * dOut.x + dIn.y * dOut.y
              );

              const bankAngleDeg = Math.max(30, Math.min(90, parseFloat(navPoint['bank-angle']) || 60));
              const V = (navPoint['ground-speed'] ?? 0) * 0.5144;
              const R_nm = (V * V) / (9.81 * Math.tan(bankAngleDeg * Math.PI / 180)) / 1852;
              const R = R_nm / this.nmPerImagePixel * scale;
              if (R <= 0) continue;

              const clockwise = delta > 0;
              const perpSign = clockwise ? 1 : -1;

              if (navPoint['overfly']) {
                const T1 = curr;
                const center = {
                  x: curr.x + (-dIn.y * perpSign) * R,
                  y: curr.y + (dIn.x * perpSign) * R,
                };

                // Iteratively refine T2: start with dOut (curr→next), then correct using the
                // actual T2→next direction until convergence (removes the kink at the arc exit).
                let dOutIter = dOut;
                let T2 = { x: 0, y: 0 };
                for (let iter = 0; iter < 4; iter++) {
                  T2 = {
                    x: center.x + dOutIter.y * perpSign * R,
                    y: center.y - dOutIter.x * perpSign * R,
                  };
                  const dx2 = next.x - T2.x, dy2 = next.y - T2.y;
                  const len2 = Math.hypot(dx2, dy2);
                  if (len2 < 1e-6) break;
                  dOutIter = { x: dx2 / len2, y: dy2 / len2 };
                }

                const tangentLengthOut = Math.hypot(T2.x - curr.x, T2.y - curr.y);

                if (tangentLengthOut <= lenOut * 0.95) {
                  turnTangents[i] = {
                    T1, T2, center, R,
                    tangentLengthIn: 0,
                    tangentLengthOut,
                    startAngle: Math.atan2(T1.y - center.y, T1.x - center.x),
                    endAngle: Math.atan2(T2.y - center.y, T2.x - center.x),
                    clockwise,
                    overfly: true,
                  };
                }
              } else {
                const rawTangentLength = R * Math.abs(Math.tan(delta / 2));
                const maxTangent = Math.min(lenIn, lenOut) * 0.95;

                if (rawTangentLength <= maxTangent) {
                  const T1 = { x: curr.x - dIn.x * rawTangentLength, y: curr.y - dIn.y * rawTangentLength };
                  const T2 = { x: curr.x + dOut.x * rawTangentLength, y: curr.y + dOut.y * rawTangentLength };
                  const center = {
                    x: T1.x + (-dIn.y * perpSign) * R,
                    y: T1.y + (dIn.x * perpSign) * R,
                  };

                  turnTangents[i] = {
                    T1, T2, center, R,
                    tangentLengthIn: rawTangentLength,
                    tangentLengthOut: rawTangentLength,
                    startAngle: Math.atan2(T1.y - center.y, T1.x - center.x),
                    endAngle: Math.atan2(T2.y - center.y, T2.x - center.x),
                    clockwise,
                    overfly: false,
                  };
                }
              }
            }
          }

          // Pass 2: draw legs, markers and nav point symbols.
          for (let i = 0; i < navPoints.length; i++) {
            const navPoint = navPoints[i];
            const nextNavPoint = navPoints[i + 1];

            const navPointCanvasPosition = this.imageToCanvas(navPoint.x, navPoint.y);

            if (nextNavPoint) {
              const nextNavPointCanvasPosition = this.imageToCanvas(nextNavPoint.x, nextNavPoint.y);

              // Clip leg endpoints to turn arc tangent points where applicable.
              const legStart = turnTangents[i] ? turnTangents[i].T2 : navPointCanvasPosition;
              const legEnd = turnTangents[i + 1] ? turnTangents[i + 1].T1 : nextNavPointCanvasPosition;

              this.mapDrawUtils.drawLine(legStart.x, legStart.y, legEnd.x, legEnd.y, 'black', 4);

              if (nextNavPoint['leg-information'] && nextNavPoint['leg-information'] !== 'none') {
                if (this.nmPerImagePixel) {
                  const { scale } = this.getBackgroundTransform();
                  const nmToCanvasPx = scale / this.nmPerImagePixel;

                  const sliderValue = parseInt(nextNavPoint['leg-information-scale'] ?? 50);
                  const targetPxPerTick = 300 * Math.pow(20 / 300, sliderValue / 100);

                  const showDistance = ['distance', 'both'].includes(nextNavPoint['leg-information']);
                  const showTime = ['time', 'both'].includes(nextNavPoint['leg-information']);

                  const arcAngleRad = (t) => {
                    let d = t.endAngle - t.startAngle;
                    if (t.clockwise) { if (d < 0) d += 2 * Math.PI; }
                    else { if (d > 0) d -= 2 * Math.PI; }
                    return Math.abs(d);
                  };
                  const arcNm = (t) => t ? t.R * arcAngleRad(t) / nmToCanvasPx : 0;

                  // Outgoing arc for current point: full arc for overfly, half for standard.
                  const startArcNm = turnTangents[i]
                    ? arcNm(turnTangents[i]) * (turnTangents[i].overfly ? 1 : 0.5)
                    : 0;
                  // Incoming arc for next point: zero for overfly (arc is on the next outgoing leg), half for standard.
                  const endArcNm = (turnTangents[i + 1] && !turnTangents[i + 1].overfly)
                    ? arcNm(turnTangents[i + 1]) * 0.5
                    : 0;

                  // Unit vector along the leg (legStart → legEnd).
                  const legDx = legEnd.x - legStart.x;
                  const legDy = legEnd.y - legStart.y;
                  const legLenPx = Math.hypot(legDx, legDy);
                  const nx = legLenPx > 0 ? legDx / legLenPx : 0;
                  const ny = legLenPx > 0 ? legDy / legLenPx : 0;

                  if (showDistance) {
                    const idealStepNm = targetPxPerTick / nmToCanvasPx;
                    const stepNm = this.nearestStep(DISTANCE_STEPS_NM, idealStepNm);
                    // Extend start past legEnd toward B by endArcNm so the step grid is anchored at B.
                    const distOffsetPx = endArcNm * nmToCanvasPx;
                    const distBarStart = { x: legEnd.x + nx * distOffsetPx, y: legEnd.y + ny * distOffsetPx };
                    this.mapDrawUtils.drawLegMarkers(
                      distBarStart.x, distBarStart.y,
                      legStart.x, legStart.y,
                      stepNm * nmToCanvasPx,
                      (i) => `${i * stepNm}`,
                      'black', -1, distOffsetPx, 0
                    );
                  }

                  if (showTime) {
                    const groundSpeed = parseFloat(nextNavPoint['ground-speed']);
                    if (groundSpeed > 0) {
                      const idealStepSec = (targetPxPerTick / nmToCanvasPx) / groundSpeed * 3600;
                      const stepSec = this.nearestStep(TIME_STEPS_SEC, idealStepSec);
                      const stepNm = stepSec * groundSpeed / 3600;
                      // Extend start before legStart by startArcNm so the step grid is anchored at arc start.
                      const timeOffsetPx = startArcNm * nmToCanvasPx;
                      const timeBarStart = { x: legStart.x - nx * timeOffsetPx, y: legStart.y - ny * timeOffsetPx };
                      this.mapDrawUtils.drawLegMarkers(
                        timeBarStart.x, timeBarStart.y,
                        legEnd.x, legEnd.y,
                        stepNm * nmToCanvasPx,
                        (i) => this.utils.formatTimeLabel(i * stepSec),
                        'black', -1, timeOffsetPx, 0
                      );
                    }
                  }
                }
              }
            }

            switch (navPoint.type) {
              case NavPointType.TURN:
                if (turnTangents[i]) {
                  const { center, R, startAngle, endAngle, clockwise } = turnTangents[i];
                  this.mapDrawUtils.drawTurnArc(center.x, center.y, R, startAngle, endAngle, clockwise, 'black', 4);
                }
                break;
              case NavPointType.TURNING_POINT:
                if (turnTangents[i]) {
                  const { center, R, startAngle, endAngle, clockwise } = turnTangents[i];
                  this.mapDrawUtils.drawTurnArc(center.x, center.y, R, startAngle, endAngle, clockwise, 'black', 4);
                }

                this.mapDrawUtils.drawCircle(navPointCanvasPosition.x, navPointCanvasPosition.y, navPoint.size, 4, 'black', true);
                break;
              case NavPointType.INITIAL_POINT:
                if (turnTangents[i]) {
                  const { center, R, startAngle, endAngle, clockwise } = turnTangents[i];
                  this.mapDrawUtils.drawTurnArc(center.x, center.y, R, startAngle, endAngle, clockwise, 'black', 4);
                }

                this.mapDrawUtils.drawSquare(navPointCanvasPosition.x, navPointCanvasPosition.y, navPoint.size, 4, 'black', true);
                break;
            }
          };

          this.mapDrawUtils.unclipCanvas();
        }
      });
    }
  }

  updateDarkMode() {
    this.darkMode = $('.attack-planner-dark-mode').is(':checked');

    localStorage.setItem(this.attackPlannerDarkModeKey, this.darkMode);

    $(this.attackPlannerBackgroundCanvas).css('background', this.darkMode ? this.backgroundColor[1] : this.backgroundColor[0])

    this.update();
  }

  getComponentData(mapComponent) {
    let store = null;
    try {
      store = JSON.parse(localStorage.getItem(this.attackPlannerDataKey)) || {};
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

    return store;
  }

  saveComponentData(mapComponent, componentData) {
    // Persist into a single object under 'bullseye-map-data'
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem(this.attackPlannerDataKey)) || {};
    } catch (e) {
      store = {};
    }

    const key = typeof mapComponent === 'object' ? mapComponent.id : mapComponent;
    if (!key) return;

    store[key] = componentData;
    localStorage.setItem(this.attackPlannerDataKey, JSON.stringify(store));
  }

  async importData() {
    const attackPlannerData = await this.utils.importData();

    if (attackPlannerData) {
      const { mapData, backgroundData } = attackPlannerData;

      localStorage.setItem(this.attackPlannerDataKey, mapData);
      localStorage.setItem(this.attackPlannerBackgroundImageKey, backgroundData);

      if (backgroundData) {
        this.backgroundImageObject = await this.backgroundMapDrawUtils.getImage(backgroundData);
      } else {
        this.backgroundImageObject = null;
      }

      this.drawBackgroundMap();
      this.update();
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
      const mapData = localStorage.getItem(this.attackPlannerDataKey);
      const backgroundData = localStorage.getItem(this.attackPlannerBackgroundImageKey);

      const fileName = $(exportModal).find('.file-name').val();
      this.utils.exportData(JSON.stringify({ mapData, backgroundData }), fileName != '' ? fileName : 'attack_planner');

      $(exportModal).removeClass('show');
    });
  }

  showDownloadModal() {
    this.setSelectMode();

    const downloadModal = $('.download-attack-planner-modal');

    $(downloadModal).find('.file-name').val('');
    $(downloadModal).find('.keep-background').prop('checked', true)
    $(downloadModal).addClass('show');

    $(downloadModal).off('click').on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
        $(downloadModal).removeClass('show');
      }
    });

    $(downloadModal).find('.download-attack-planner-button').off('click').on('click', () => {
      const bgCanvas = $(this.attackPlannerBackgroundCanvas)[0];
      const fgCanvas = $(this.attackPlannerCanvas)[0];


      const offscreen = document.createElement('canvas');
      offscreen.width = fgCanvas.width;
      offscreen.height = fgCanvas.height;
      const ctx = offscreen.getContext('2d');

      ctx.fillStyle = this.darkMode ? this.backgroundColor[1] : this.backgroundColor[0];
      ctx.fillRect(0, 0, offscreen.width, offscreen.height);
      if ($(downloadModal).find('.keep-background').is(':checked')) {
        ctx.drawImage(bgCanvas, 0, 0);
      }
      ctx.drawImage(fgCanvas, 0, 0);

      const fileName = $(downloadModal).find('.file-name').val();
      const link = document.createElement('a');
      link.download = fileName != '' ? `${fileName}.png` : 'attack_planner.png';
      link.href = offscreen.toDataURL('image/png');
      link.click();

      $(downloadModal).removeClass('show');
    });
  }

  resetMap() {
    if (window.confirm('Are you sure ? All data will be lost.')) {
      this.mapFieldsUtils.displayComponentListButtons();

      localStorage.removeItem(this.attackPlannerDataKey);
      localStorage.removeItem(this.attackPlannerBackgroundImageKey);

      this.backgroundImageObject = null;

      this.update();
      this.drawBackgroundMap();
    }
  }

  getObjectBounds(object) {
    const points = []

    const canvasRelativePosition = this.imageToCanvas(object.x, object.y)

    switch (object.type) {
      case MapObjectType.TURN:
      case MapObjectType.TURNING_POINT:
      case MapObjectType.INITIAL_POINT:
        const radius = object.size / 2;
        points.push({ x: canvasRelativePosition.x - radius, y: canvasRelativePosition.y - radius });
        points.push({ x: canvasRelativePosition.x + radius, y: canvasRelativePosition.y - radius });
        points.push({ x: canvasRelativePosition.x + radius, y: canvasRelativePosition.y + radius });
        points.push({ x: canvasRelativePosition.x - radius, y: canvasRelativePosition.y + radius });
        break;
      case MapObjectType.TARGET_POINT:
        break;
    }

    return points
  }

  getMapComponents(components) {
    const objects = [];
    const recurse = (value, path) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          recurse(item, [...path, index]);
        });
      } else if (value && typeof value === 'object') {
        if (Object.values(NavPointType).includes(value.type)) {
          objects.push({ path: [...path], component: value });
        }
        for (const [key, child] of Object.entries(value)) {
          recurse(child, [...path, key]);
        }
      }
    };
    recurse(components, []);

    return objects;
  }

  getBackgroundTransform() {
    const canvasW = this.backgroundMapDrawUtils.canvas.width;
    const canvasH = this.backgroundMapDrawUtils.canvas.height;
    const bgData = this.getComponentData(this.mapComponentList.find(mc => mc.id === 'background-map'));

    if (bgData?.x !== undefined) {
      return {
        x: bgData.x,
        y: bgData.y,
        scale: bgData.scale,
        rotation: bgData.rotation ?? 0,
      };
    }

    // Default: scale to fit canvas, centered
    const fitScale = this.backgroundImageObject
      ? Math.min(canvasW / this.backgroundImageObject.width, canvasH / this.backgroundImageObject.height)
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

  canvasToImage(cx, cy) {
    const { x, y, scale, rotation } = this.getBackgroundTransform();
    const dx = cx - x, dy = cy - y;
    const cos = Math.cos(-rotation), sin = Math.sin(-rotation);
    return { x: (dx * cos - dy * sin) / scale, y: (dx * sin + dy * cos) / scale };
  }

  imageToCanvas(ix, iy) {
    const { x, y, scale, rotation } = this.getBackgroundTransform();
    const cos = Math.cos(rotation), sin = Math.sin(rotation);
    const dx = ix * scale, dy = iy * scale;
    return { x: x + dx * cos - dy * sin, y: y + dx * sin + dy * cos };
  }

  nearestStep(steps, idealInterval) {
    return steps.reduce((best, step) =>
      Math.abs(Math.log(step / idealInterval)) < Math.abs(Math.log(best / idealInterval)) ? step : best
    );
  }

  syncBankAngleLoadFactor(value, navPointData, fieldId) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return;

    if (fieldId.endsWith('bank-angle')) {
      const loadFactor = Math.min(Math.max(Math.round((1 / Math.cos(parsed * Math.PI / 180)) * 10) / 10, 1), 10);
      navPointData['load-factor'] = loadFactor;
      $(`#${CSS.escape(fieldId.replace(/[^.]+$/, 'load-factor'))}`).val(loadFactor);
    } else {
      const bankAngle = Math.min(Math.max(Math.round(Math.acos(1 / parsed) * 180 / Math.PI), 0), 90);
      navPointData['bank-angle'] = bankAngle;
      $(`#${CSS.escape(fieldId.replace(/[^.]+$/, 'bank-angle'))}`).val(bankAngle);
    }
  }
}