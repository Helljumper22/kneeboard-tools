const AttackPlannerMode = {
  SELECT: 'select',
  PLACE: 'place',
  EDIT: 'edit',
  DRAG: 'drag',
  EDIT_MAP: 'edit-map',
  DRAG_MAP: 'drag-map',
  EDIT_RULER: 'edit-ruler',
  DRAG_RULER: 'drag-ruler',
  EDIT_LABEL: 'edit-label',
  DRAG_LABEL: 'drag-label',
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
          id: 'map-north-offset',
          label: 'Map north offset (°)',
          type: 'number',
          default: 0,
        },
        {
          id: 'magnetic-declination',
          label: 'Magnetic declination (°)',
          type: 'number',
          default: 0,
        },
        {
          id: 'map-north',
          label: 'Map north',
          type: 'select',
          options: {
            'magnetic': 'Magnetic',
            'true': 'True',
          },
          default: 'magnetic',
        },
        {
          id: 'overlay-opacity',
          label: 'Overlay opacity',
          type: 'range',
          options: {
            min: 0,
            max: 50
          },
          default: 0,
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
          id: 'rule-scale',
          label: 'Rule scale (nm)',
          type: 'number',
        },
        {
          id: 'edit-scale',
          label: 'Edit scale',
          type: 'button',
          clickFunction: this.editBackgroundScale.bind(this)
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
      ],
      drawFunction: this.drawBackgroundMap.bind(this),
    }, // Background map
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
      ],
      drawFunction: this.drawBaseLines.bind(this)
    }, // Base Lines
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
            deletable: true,
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
                  id: 'name',
                  label: 'Name',
                  type: 'text',
                },
                {
                  id: 'name-position',
                  label: 'name-position',
                  type: 'hidden',
                  default: Math.PI,
                },
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
                  id: 'show-leg-heading',
                  label: 'Show leg heading',
                  type: 'checkbox',
                },
                {
                  id: 'leg-heading-position',
                  label: 'leg-heading-position',
                  type: 'hidden',
                  default: 0.5,
                },
                {
                  id: 'leg-heading-side',
                  label: 'leg-heading-side',
                  type: 'hidden',
                  default: 1,
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
      drawFunction: this.drawFlightPlan.bind(this),
    }, // Flight plan
  ]

  constructor() {
    this.attackPlannerCanvas = '.attack-planner-canvas';
    this.attackPlannerBackgroundCanvas = '.attack-planner-background-canvas';

    this.utils = new Utils();
    this.mapDrawUtils = new MapDrawUtils(this.attackPlannerCanvas);
    this.backgroundMapDrawUtils = new MapDrawUtils(this.attackPlannerBackgroundCanvas);
    this.attackPlannerUtils = new AttackPlannerUtils(this, this.mapDrawUtils, this.backgroundMapDrawUtils);
    this.flightPlanUtils = new AttackPlannerFlightPlanUtils(this.mapDrawUtils, this.attackPlannerUtils, this.utils);
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
    this.selectedLabel = null;
    this.selectedLabelPath = null;
    this.pendingLabels = [];
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
    this.selectedLabel = null;

    this.attackPlannerMode = AttackPlannerMode.SELECT;
    this.mapFieldsUtils.hideEditInstructions();

    console.log('SELECT MODE');

    $(this.attackPlannerCanvas).off('wheel').css('cursor', 'default');

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', async (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      this.setEditMode(clickPosition.x, clickPosition.y)
    });

    this.update();

    const selectableComponents = this.getMapComponents(this.getComponentData()).flatMap(mc => {
      const cp = this.attackPlannerUtils.imageToCanvas(mc.component.x, mc.component.y);
      const items = [{ x: cp.x, y: cp.y, size: mc.component.size / 1.5 }];
      if (mc.component.type !== NavPointType.TURN && mc.component.name) {
        const labelBounds = this.getComponentLabelBounds(mc.component);
        if (labelBounds.length) items.push({ points: labelBounds });
      }
      return items;
    });

    const headingHoverables = this.pendingLabels
      .filter(l => l.type === 'heading-label')
      .flatMap(l => {
        const t = l.navPoint['leg-heading-position'] ?? 0.5;
        const side = l.navPoint['leg-heading-side'] ?? 1;
        const bounds = this.mapDrawUtils.getLegHeadingBounds(l.legStart.x, l.legStart.y, l.legEnd.x, l.legEnd.y, l.headingText, t, side);
        return bounds.length ? [{ points: bounds }] : [];
      });

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      this.updateCursor(pos.x, pos.y, [...selectableComponents, ...headingHoverables]);
    });
  }

  setEditMode(clickX, clickY) {
    for (let i = this.pendingLabels.length - 1; i >= 0; i--) {
      const label = this.pendingLabels[i];
      if (label.type !== 'heading-label') continue;
      const t = label.navPoint['leg-heading-position'] ?? 0.5;
      const side = label.navPoint['leg-heading-side'] ?? 1;
      const bounds = this.mapDrawUtils.getLegHeadingBounds(label.legStart.x, label.legStart.y, label.legEnd.x, label.legEnd.y, label.headingText, t, side);
      if (bounds.length && this.utils.isPointWithinArea({ x: clickX, y: clickY }, bounds)) {
        this.setLabelDragMode(label, label.componentPath, clickX, clickY);
        return;
      }
    }

    const mapComponents = this.getMapComponents(this.getComponentData());

    for (let i = mapComponents.length - 1; i >= 0; i--) {
      const { component, path } = mapComponents[i];
      if (component.type === NavPointType.TURN || !component.name) continue;
      const labelBounds = this.getComponentLabelBounds(component);
      if (labelBounds.length && this.utils.isPointWithinArea({ x: clickX, y: clickY }, labelBounds)) {
        this.setLabelDragMode(component, path, clickX, clickY);
        return;
      }
    }

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
    if (this.attackPlannerMode != AttackPlannerMode.SELECT && this.attackPlannerMode != AttackPlannerMode.EDIT && this.attackPlannerMode != AttackPlannerMode.EDIT_LABEL) {
      return;
    }

    this.attackPlannerMode = AttackPlannerMode.DRAG;

    console.log('DRAG MODE');

    $(this.attackPlannerCanvas).css('cursor', 'grabbing');

    const dragMapComponent = this.mapComponentList.find(mapComponent => mapComponent.id == componentPath[0]);
    this.mapFieldsUtils.displayComponent(dragMapComponent);
    this.mapFieldsUtils.selectField(this.selectedComponentPath);
    const dragInstructions = this.attackPlannerUtils.getInstructionText(AttackPlannerMode.DRAG);
    if (dragInstructions) {
      this.mapFieldsUtils.showEditInstructions(dragInstructions);
    }

    let lastCanvasPos = { x: startX, y: startY };

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const canvasPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      const curr = this.attackPlannerUtils.canvasToImage(canvasPos.x, canvasPos.y);
      const last = this.attackPlannerUtils.canvasToImage(lastCanvasPos.x, lastCanvasPos.y);

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
        const cp = this.attackPlannerUtils.imageToCanvas(mc.component.x, mc.component.y);
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

  setLabelDragMode(component, componentPath, startX, startY) {
    this.attackPlannerMode = AttackPlannerMode.DRAG_LABEL;
    this.selectedLabel = component;
    this.selectedLabelPath = componentPath;

    const labelMapComponent = this.mapComponentList.find(mc => mc.id === 'flight-plans');
    this.mapFieldsUtils.displayComponent(labelMapComponent);
    this.mapFieldsUtils.selectField(componentPath);

    $(this.attackPlannerCanvas).css('cursor', 'grabbing');

    if (component.type === 'heading-label') {
      const instructions = 'Drag to reposition the leg heading along the leg and across sides.';
      this.mapFieldsUtils.showEditInstructions(instructions);

      const { legStart, legEnd, navPoint } = component;
      const dx = legEnd.x - legStart.x;
      const dy = legEnd.y - legStart.y;
      const legLen = Math.hypot(dx, dy);
      const ux = dx / legLen;
      const uy = dy / legLen;

      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        const canvasPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
        const mx = canvasPos.x - legStart.x;
        const my = canvasPos.y - legStart.y;
        navPoint['leg-heading-position'] = Math.max(0.05, Math.min(0.95, (mx * ux + my * uy) / legLen));
        navPoint['leg-heading-side'] = (mx * uy - my * ux) >= 0 ? 1 : -1;

        let mapComponent = this.getComponentData(componentPath[0]);
        const recurse = (currentComponent, pathIndex) => {
          if (componentPath[pathIndex] !== undefined) {
            const key = componentPath[pathIndex];
            if (currentComponent[key] !== undefined) {
              currentComponent[key] = recurse(currentComponent[key], pathIndex + 1);
            }
            return currentComponent;
          }
          return navPoint;
        };
        mapComponent = recurse(mapComponent, 1);
        this.saveComponentData(componentPath[0], mapComponent);
        this.update();
      });
    } else {
      this.mapFieldsUtils.showEditInstructions(this.attackPlannerUtils.getInstructionText(AttackPlannerMode.DRAG_LABEL));

      const navPointCanvasPos = this.attackPlannerUtils.imageToCanvas(component.x, component.y);

      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        const canvasPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
        const mouseAngle = Math.atan2(canvasPos.y - navPointCanvasPos.y, canvasPos.x - navPointCanvasPos.x);
        component['name-position'] = ((mouseAngle * 180 / Math.PI) + 90 + 360) % 360;

        let mapComponent = this.getComponentData(componentPath[0]);
        const recurse = (currentComponent, pathIndex) => {
          if (componentPath[pathIndex] !== undefined) {
            const key = componentPath[pathIndex];
            if (currentComponent[key] !== undefined) {
              currentComponent[key] = recurse(currentComponent[key], pathIndex + 1);
            }
            return currentComponent;
          }
          return component;
        };
        mapComponent = recurse(mapComponent, 1);
        this.saveComponentData(componentPath[0], mapComponent);
        this.update();
      });
    }

    $(this.attackPlannerCanvas).off('mouseup').on('mouseup', () => {
      $(this.attackPlannerCanvas).off('mousemove').off('mouseup');
      this.editLabel(component, componentPath);
    });
  }

  editLabel(component, componentPath) {
    this.attackPlannerMode = AttackPlannerMode.EDIT_LABEL;

    this.update();

    const getBounds = () => {
      if (component.type === 'heading-label') {
        const t = component.navPoint['leg-heading-position'] ?? 0.5;
        const side = component.navPoint['leg-heading-side'] ?? 1;
        return this.mapDrawUtils.getLegHeadingBounds(component.legStart.x, component.legStart.y, component.legEnd.x, component.legEnd.y, component.headingText, t, side);
      }
      return this.getComponentLabelBounds(component);
    };

    const getOtherHoverables = () => [
      ...this.getMapComponents(this.getComponentData()).flatMap(mc => {
        const cp = this.attackPlannerUtils.imageToCanvas(mc.component.x, mc.component.y);
        const items = [{ x: cp.x, y: cp.y, size: mc.component.size / 1.5 }];
        if (mc.component.type !== NavPointType.TURN && mc.component.name) {
          const lb = this.getComponentLabelBounds(mc.component);
          if (lb.length) items.push({ points: lb });
        }
        return items;
      }),
      ...this.pendingLabels
        .filter(l => l.type === 'heading-label')
        .flatMap(l => {
          const t = l.navPoint['leg-heading-position'] ?? 0.5;
          const side = l.navPoint['leg-heading-side'] ?? 1;
          const bounds = this.mapDrawUtils.getLegHeadingBounds(l.legStart.x, l.legStart.y, l.legEnd.x, l.legEnd.y, l.headingText, t, side);
          return bounds.length ? [{ points: bounds }] : [];
        }),
    ];

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      const labelBounds = getBounds();
      if (labelBounds.length && this.utils.isPointWithinArea({ x: pos.x, y: pos.y }, labelBounds)) {
        $(this.attackPlannerCanvas).css('cursor', 'pointer');
      } else {
        this.updateCursor(pos.x, pos.y, getOtherHoverables());
      }
    });

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
      const clickPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      const labelBounds = getBounds();
      if (labelBounds.length && this.utils.isPointWithinArea({ x: clickPos.x, y: clickPos.y }, labelBounds)) {
        this.setLabelDragMode(component, componentPath, clickPos.x, clickPos.y);
      } else {
        this.setEditMode(clickPos.x, clickPos.y);
      }
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
    this.nmPerImagePixel = this.attackPlannerUtils.computeRulerCalibration(bgData['ruler-point-1'], bgData['ruler-point-2'], bgData['rule-scale']);

    const mapNorthOffset = bgData['map-north-offset'] ?? 0;
    const imageRotationDeg = (bgData.rotation ?? 0) * (180 / Math.PI);
    const mapOrientation = mapNorthOffset + imageRotationDeg;
    const magneticDeclination = bgData['magnetic-declination'] ?? 0;
    const trueNorth = bgData['map-north'] === 'true';

    this.pendingLabels = [];

    this.mapComponentList.forEach(mapComponent => {
      if (mapComponent.id != 'background-map') {
        mapComponent.drawFunction(mapComponent, mapOrientation, magneticDeclination, trueNorth);
      }
    });

    const fillColor = this.darkMode ? this.backgroundColor[1] : this.backgroundColor[0];
    const textColor = this.darkMode ? this.backgroundColor[0] : this.backgroundColor[1];
    const borderColor = this.darkMode ? this.backgroundColor[0] : this.backgroundColor[1];
    const lineColor = this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0];
    for (const label of this.pendingLabels) {
      if (label.type === 'heading-label') {
        const t = label.navPoint['leg-heading-position'] ?? 0.5;
        const side = label.navPoint['leg-heading-side'] ?? 1;
        this.mapDrawUtils.drawLegHeading(label.legStart.x, label.legStart.y, label.legEnd.x, label.legEnd.y, label.headingText, t, side, lineColor);
      } else {
        const { x, y, navPoint } = label;
        const offsetAngle = this.getComponentLabelOffsetAngle(navPoint);
        const offsetDistance = (navPoint.size ?? 30) / 2 + 12;
        this.mapDrawUtils.drawText(x, y, navPoint.name, 'square', 18, offsetDistance, offsetAngle, 0, 2, fillColor, textColor, borderColor);
      }
    }

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
          const { x, y, scale, rotation } = this.attackPlannerUtils.getBackgroundTransform(bgData, this.backgroundImageObject);
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
        const rulerPoint1 = bgData['ruler-point-1'] ? this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y) : null;
        const rulerPoint2 = bgData['ruler-point-2'] ? this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y) : null;
        this.drawRuler(rulerPoint1, rulerPoint2);

        break;
      case AttackPlannerMode.EDIT_LABEL:
      case AttackPlannerMode.DRAG_LABEL:
        if (this.selectedLabel) {
          if (this.selectedLabel.type === 'heading-label') {
            const { legStart, legEnd, headingText, navPoint } = this.selectedLabel;
            const t = navPoint['leg-heading-position'] ?? 0.5;
            const side = navPoint['leg-heading-side'] ?? 1;
            const bounds = this.mapDrawUtils.getLegHeadingBounds(legStart.x, legStart.y, legEnd.x, legEnd.y, headingText, t, side);
            if (bounds.length) {
              this.mapDrawUtils.drawSelectionOutline(bounds, 2, '#4af', false);
            }
          } else {
            const labelBounds = this.getComponentLabelBounds(this.selectedLabel);
            if (labelBounds.length) {
              this.mapDrawUtils.drawSelectionOutline(labelBounds, 2, '#4af', false);
            }
          }
        }
        break;
    }


    const backgroundMapData = this.getComponentData(this.mapComponentList.find(mapComponent => mapComponent.id == 'background-map'));
    if (backgroundMapData['overlay-opacity'] && backgroundMapData['overlay-opacity'] > 0) {
      const alpha = (backgroundMapData['overlay-opacity']) / 100;
      const backgroundColor = this.darkMode
        ? `rgba(0, 0, 0, ${alpha})`
        : `rgba(255, 255, 255, ${alpha})`;

      this.mapDrawUtils.drawBackground(backgroundColor);
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
    this.mapFieldsUtils.displayComponent(bgMapComponent);
    this.mapFieldsUtils.showEditInstructions(this.attackPlannerUtils.getInstructionText(AttackPlannerMode.EDIT_MAP));

    const bindMapHoverCursor = () => {
      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        if (this.attackPlannerMode !== AttackPlannerMode.EDIT_MAP) return;
        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

        const { x, y, scale, rotation } = this.attackPlannerUtils.getBackgroundTransform(this.getComponentData(bgMapComponent), this.backgroundImageObject);
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
      const bgData = this.getComponentData(bgMapComponent) || {};

      const transform = this.attackPlannerUtils.getBackgroundTransform(bgData, this.backgroundImageObject);
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

      const bgData = this.getComponentData(bgMapComponent) || {};

      const clickPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      const transform = this.attackPlannerUtils.getBackgroundTransform(bgData, this.backgroundImageObject);
      const dragOffset = { x: clickPos.x - transform.x, y: clickPos.y - transform.y };

      $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
        console.log('DRAG MAP MODE');

        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

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

        const bgData = this.getComponentData(bgMapComponent) || {};

        const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
        const { x, y, scale, rotation } = this.attackPlannerUtils.getBackgroundTransform(bgData, this.backgroundImageObject);
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
    this.mapFieldsUtils.displayComponent(bgMapComponent);
    this.mapFieldsUtils.showEditInstructions(this.attackPlannerUtils.getInstructionText(AttackPlannerMode.EDIT_RULER));
    const bgData = this.getComponentData(bgMapComponent) || {};

    // Initialize the points to their default positions.
    if (!bgData['ruler-point-1'] || !bgData['ruler-point-2']) {
      bgData['ruler-point-1'] = bgData['ruler-point-1'] ?? this.attackPlannerUtils.canvasToImage(this.width / 2, this.height / 2 - 50);
      bgData['ruler-point-2'] = bgData['ruler-point-2'] ?? this.attackPlannerUtils.canvasToImage(this.width / 2, this.height / 2 + 50);

      this.saveComponentData(bgMapComponent, bgData);
    }

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      if (this.attackPlannerMode !== AttackPlannerMode.EDIT_RULER) return;
      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      const ruler1CanvasPosition = this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
      const ruler2CanvasPosition = this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);

      this.updateCursor(pos.x, pos.y, [{ ...ruler1CanvasPosition, size: 12 }, { ...ruler2CanvasPosition, size: 12 }]);
    });

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
      const clickPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      const hitPoint = this.attackPlannerUtils.getRulerPointHit(clickPos.x, clickPos.y, bgData['ruler-point-1'], bgData['ruler-point-2']);

      let lastCanvasPos = { x: clickPos.x, y: clickPos.y };

      if (hitPoint) {
        this.attackPlannerMode = AttackPlannerMode.DRAG_RULER;

        console.log('DRAG RULER MODE');

        $(this.attackPlannerCanvas).css('cursor', 'grabbing');

        $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
          const canvasPos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

          const curr = this.attackPlannerUtils.canvasToImage(canvasPos.x, canvasPos.y);
          const last = this.attackPlannerUtils.canvasToImage(lastCanvasPos.x, lastCanvasPos.y);

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

          bgData['nm-per-image-pixel'] = this.attackPlannerUtils.computeRulerCalibration(bgData['ruler-point-1'], bgData['ruler-point-2'], bgData['rule-scale']);

          this.saveComponentData(bgMapComponent, bgData);

          this.update();

          const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
          const ruler1CanvasPosition = this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
          const ruler2CanvasPosition = this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);
          this.updateCursor(pos.x, pos.y, [{ ...ruler1CanvasPosition, size: 12 }, { ...ruler2CanvasPosition, size: 12 }]);

          $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
            if (this.attackPlannerMode !== AttackPlannerMode.EDIT_RULER) return;
            const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

            const ruler1CanvasPosition = this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
            const ruler2CanvasPosition = this.attackPlannerUtils.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);

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

      const imageRelativePosition = this.attackPlannerUtils.canvasToImage(clickPosition.x, clickPosition.y)

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
      const { x, y, scale, rotation } = this.attackPlannerUtils.getBackgroundTransform(this.getComponentData(this.mapComponentList.find(mc => mc.id === 'background-map')), this.backgroundImageObject);
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

  drawBaseLines(component, mapOrientation, magneticDeclination, trueNorth) {
    const baselineData = this.getComponentData(component);

    if (baselineData && baselineData.display) {
      this.mapDrawUtils.drawBaseLines(
        baselineData['location'] ?? 'top-left',
        this.utils.isNumber(magneticDeclination) ? magneticDeclination : 0,
        mapOrientation,
        this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0],
        1.2
      );
    }
  }

  drawFlightPlan(component, mapOrientation, magneticDeclination, trueNorth) {
    const flightPlansData = this.getComponentData(component);
    if (!flightPlansData?.['flight-plans']?.length) return;

    flightPlansData['flight-plans'].forEach((flightPlanData, fpIdx) => {
      const navPoints = flightPlanData['nav-points'];
      if (!navPoints?.length) return;

      const bgData = this.getComponentData(this.mapComponentList.find(mc => mc.id === 'background-map'));
      const { scale } = this.attackPlannerUtils.getBackgroundTransform(bgData, this.backgroundImageObject);
      const turnTangents = this.flightPlanUtils.computeTurnTangents(navPoints, this.nmPerImagePixel, scale);

      for (let i = 0; i < navPoints.length; i++) {
        const navPoint = navPoints[i];
        const nextNavPoint = navPoints[i + 1];
        const navPointCanvasPosition = this.attackPlannerUtils.imageToCanvas(navPoint.x, navPoint.y);

        if (nextNavPoint) {
          const nextNavPointCanvasPosition = this.attackPlannerUtils.imageToCanvas(nextNavPoint.x, nextNavPoint.y);
          const legStart = turnTangents[i] ? turnTangents[i].T2 : navPointCanvasPosition;
          const legEnd = turnTangents[i + 1] ? turnTangents[i + 1].T1 : nextNavPointCanvasPosition;
          this.flightPlanUtils.drawLeg(legStart, legEnd);
          if (nextNavPoint['show-leg-heading']) {
            const headingText = this.flightPlanUtils.computeLegHeadingText(legStart, legEnd, mapOrientation, magneticDeclination, trueNorth);
            if (headingText) {
              this.pendingLabels.push({
                type: 'heading-label',
                legStart: { x: legStart.x, y: legStart.y },
                legEnd: { x: legEnd.x, y: legEnd.y },
                headingText,
                navPoint: nextNavPoint,
                componentPath: ['flight-plans', 'flight-plans', fpIdx, 'nav-points', i + 1],
              });
            }
          }
          const effectiveTarget = this.flightPlanUtils.getEffectiveLegTarget(navPoints, turnTangents, i, this.nmPerImagePixel, scale);
          this.flightPlanUtils.drawLegInfo(legStart, legEnd, navPoints, i, turnTangents, this.nmPerImagePixel, scale, effectiveTarget);
        }

        switch (navPoint.type) {
          case NavPointType.TURN:
            this.flightPlanUtils.drawTurnArc(turnTangents[i]);
            break;
          case NavPointType.TURNING_POINT:
            this.flightPlanUtils.drawTurnArc(turnTangents[i]);
            this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.TURNING_POINT, navPoint.size, 4, 'black');
            break;
          case NavPointType.INITIAL_POINT:
            this.flightPlanUtils.drawTurnArc(turnTangents[i]);
            this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.INITIAL_POINT, navPoint.size, 4, 'black');
            break;
          case NavPointType.TARGET_POINT:
            this.flightPlanUtils.drawTurnArc(turnTangents[i]);
            this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.TARGET_POINT, navPoint.size, 4, 'black');
            break;
        }

        if (navPoint.type !== NavPointType.TURN && navPoint.name) {
          this.pendingLabels.push({ x: navPointCanvasPosition.x, y: navPointCanvasPosition.y, navPoint });
        }
      }

      this.mapDrawUtils.unclipCanvas();
    });
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

    const canvasRelativePosition = this.attackPlannerUtils.imageToCanvas(object.x, object.y)

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

  syncBankAngleLoadFactor(value, navPointData, fieldId, target) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return;

    const navPointItem = $(target).closest('.multiple-field-item');

    if (fieldId.endsWith('bank-angle')) {
      const loadFactor = Math.min(Math.max(Math.round((1 / Math.cos(parsed * Math.PI / 180)) * 10) / 10, 1), 10);
      navPointData['load-factor'] = loadFactor;
      navPointItem.find('[id$=".load-factor"]').val(loadFactor);
    } else {
      const bankAngle = Math.min(Math.max(Math.round(Math.acos(1 / parsed) * 180 / Math.PI), 0), 90);
      navPointData['bank-angle'] = bankAngle;
      navPointItem.find('[id$=".bank-angle"]').val(bankAngle);
    }
  }

  getComponentLabelOffsetAngle(component) {
    return ((component['name-position'] ?? 270) - 90) * Math.PI / 180;
  }

  getComponentLabelBounds(component) {
    if (!component.name) return [];
    const pos = this.attackPlannerUtils.imageToCanvas(component.x, component.y);
    const offsetAngle = this.getComponentLabelOffsetAngle(component);
    const offsetDistance = (component.size ?? 30) / 2 + 12;
    return this.mapDrawUtils.getTextBounds(pos.x, pos.y, component.name, 18, offsetDistance, offsetAngle, 2);
  }
}