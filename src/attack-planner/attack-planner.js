const AttackPlannerMode = {
  SELECT: 'select',
  PLACE: 'place',
  EDIT: 'edit',
  DRAG: 'drag',
  MAP: 'map',
  RULER: 'ruler',
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
                  id: 'type',
                  label: 'Type',
                  type: 'select',
                  options: AttackPlannerNavPointText,
                  default: NavPointType.TURN,
                },
                {
                  id: 'ground-speed',
                  label: 'Ground speed (kt)',
                  type: 'number',
                  default: 400
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
                    'duration': 'Duration',
                    'distance-time': 'Distance & time',
                    'distance-duration': 'Distance & duration',
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
      pageToggleFunction: (open) => { this.showTurnPoints = open; this.update(); },
    }, // Flight plan
    {
      id: 'popup-plan',
      label: 'Popup plan',
      fields: [
        {
          id: 'popup-plan',
          label: 'Popup plan',
          type: 'multiple',
          options: {
            deletable: true,
          },
          fields: [
            {
              id: 'offset-turn-distance',
              label: 'Offset turn distance (nm)',
              type: 'number',
            },
            {
              id: 'initiate-popup-distance',
              label: 'Initiate popup distance (nm)',
              type: 'number',
            },
            {
              id: 'start-altitude',
              label: 'Start altitude (kft)',
              type: 'number',
            },
            {
              id: 'roll-over-altitude',
              label: 'Roll over altitude (kft)',
              type: 'number',
            },
            {
              id: 'apogee-altitude',
              label: 'Apogee altitude (kft)',
              type: 'number',
            },
            {
              id: 'designate-minimum-altitude',
              label: 'Designate minimum altitude (kft)',
              type: 'number',
            },
            {
              id: 'minimum-release-altitude',
              label: 'Minimum release altitude (kft)',
              type: 'number',
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
          ]
        },
        {
          id: 'add-popup-plan',
          label: 'Add popup plan',
          type: 'button',
          clickFunction: this.placeComponentItem.bind(this)
        }
      ],
      drawFunction: this.drawPopupPlan.bind(this)
    }, // Popup plan
    {
      id: 'blast-indicator',
      label: 'Blast indicator',
      fields: [
        {
          id: 'blast-indicator',
          label: 'Blast indicator',
          type: 'multiple',
          options: {
            deletable: true,
          },
          fields: [
            {
              id: 'weapon-name',
              label: 'Weapon name',
              type: 'text',
            },
            {
              id: 'blast-height',
              label: 'Blast height (ft)',
              type: 'number',
            },
            {
              id: 'blast-radius',
              label: 'Blast radius (ft)',
              type: 'number',
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
          ]
        },
        {
          id: 'add-blast-indicator',
          label: 'Add blast indicator',
          type: 'button',
          clickFunction: this.placeComponentItem.bind(this)
        }
      ],
      drawFunction: this.drawBlastIndicator.bind(this)
    }, // Blast indicator
    {
      id: 'arrow',
      label: 'Arrow',
      fields: [
        {
          id: 'arrow',
          label: 'Arrow',
          type: 'multiple',
          options: {
            deletable: true,
          },
          fields: [
            {
              id: 'type',
              label: 'Type',
              type: 'select',
              options: {
                'single-arrow': 'Single arrow',
                'double-arrow': 'Double arrow',
                'single-arrow-distance': 'Single arrow & distance',
                'double-arrow-distance': 'Double arrow & distance',
              },
              default: 'double-arrow-distance',
            },
            {
              id: 'x-start',
              label: 'x-start',
              type: 'hidden',
            },
            {
              id: 'y-start',
              label: 'y-start',
              type: 'hidden',
            },
            {
              id: 'x-end',
              label: 'x-end',
              type: 'hidden',
            },
            {
              id: 'y-end',
              label: 'y-end',
              type: 'hidden',
            },
          ]
        },
        {
          id: 'add-arrow',
          label: 'Add arrow',
          type: 'button',
          clickFunction: this.placeArrow.bind(this)
        }
      ],
      drawFunction: this.drawArrow.bind(this),
      pageToggleFunction: (open) => { this.showArrowPoints = open; this.update(); },
    }, // Arrow
    {
      id: 'fuel-plan',
      label: 'Fuel plan',
      fields: [
        {
          id: 'fuel-plan',
          label: 'Fuel plan',
          type: 'multiple',
          options: {
            deletable: true,
          },
          fields: [
            {
              id: 'estimated-fuel',
              label: 'Estimated fuel',
              type: 'text',
            },
            {
              id: 'minimum-fuel',
              label: 'Minimum fuel',
              type: 'text',
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
          ]
        },
        {
          id: 'add-fuel-plan',
          label: 'Add fuel plan',
          type: 'button',
          clickFunction: this.placeComponentItem.bind(this)
        }
      ],
      drawFunction: this.drawFuelPlan.bind(this),
    }, // Arrow
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
    this.defaultLineColor = ['#000000', '#e9e9e9'];

    this.attackPlannerDataKey = 'attack-planner-data';
    this.attackPlannerBackgroundImageKey = 'attack-planner-background-image';
    this.attackPlannerDarkModeKey = 'attack-planner-dark-mode';

    this.backgroundImageObject = null;

    this.darkMode = false;
    this.attackPlannerMode = AttackPlannerMode.SELECT;
    this.activeMode = null;
    this.selectedTarget = null;
    this.interactiveTargets = [];
    this.nmPerImagePixel = null;
    this.showTurnPoints = false;
    this.showArrowPoints = false;

    this.init();

    $('.import-attack-planner-button').off('click').on('click', async () => this.importData());
    $('.show-export-attack-planner-modal-button').off('click').on('click', () => this.showExportModal());
    $('.show-download-attack-planner-modal-button').off('click').on('click', () => this.showDownloadModal());
    $('.reset-attack-planner-button').off('click').on('click', () => this.resetMap());
  }

  async init() {
    this.getDarkMode();

    $(this.attackPlannerBackgroundCanvas).css('background', this.darkMode ? this.backgroundColor[1] : this.backgroundColor[0])

    // Update attack planner data when dark mode is changed.
    $('.attack-planner-dark-mode').on('change', () => this.updateDarkMode());

    const backgroundImage = localStorage.getItem(this.attackPlannerBackgroundImageKey);
    if (backgroundImage) {
      this.backgroundImageObject = await this.backgroundMapDrawUtils.getImage(backgroundImage);
      this.drawBackgroundMap();
    }

    this.bindCanvasEvents();
    this.setMode(new SelectMode(this));

    this.mapFieldsUtils.displayComponentListButtons();
  }

  getDarkMode() {
    this.darkMode = localStorage.getItem(this.attackPlannerDarkModeKey) === 'true';
    $('.attack-planner-dark-mode').prop('checked', this.darkMode);
  }

  bindCanvasEvents() {
    const canvas = $(this.attackPlannerCanvas);
    const posOf = (event) => this.utils.getCanvasClickPosition(event.clientX, event.clientY, canvas[0]);
    canvas.on('mousedown', (event) => this.activeMode?.onMouseDown?.(posOf(event), event));
    canvas.on('mousemove', (event) => this.activeMode?.onMouseMove?.(posOf(event), event));
    canvas.on('mouseup', (event) => this.activeMode?.onMouseUp?.(posOf(event), event));
    canvas.on('click', (event) => this.activeMode?.onClick?.(posOf(event), event));
    canvas.on('wheel', (event) => this.activeMode?.onWheel?.(event));
  }

  setMode(mode) {
    this.activeMode?.onExit?.();
    this.activeMode = mode;
    this.attackPlannerMode = mode.id;
    mode.onEnter?.();
    this.update();
  }

  setSelectMode() {
    this.setMode(new SelectMode(this));
  }

  hitTest(pos) {
    const priority = ['heading-label', 'name-label', 'nav-point', 'popup-plan', 'blast-indicator', 'fuel-plan', 'arrow-start', 'arrow-end'];
    for (const kind of priority) {
      for (let i = this.interactiveTargets.length - 1; i >= 0; i--) {
        const target = this.interactiveTargets[i];
        if (target.kind !== kind) continue;
        const bounds = target.getBounds();
        if (bounds.length && this.utils.isPointWithinArea(pos, bounds)) return target;
      }
    }
    return null;
  }

  beginDrag(target, pos) {
    this.selectedTarget = { kind: target.kind, componentPath: target.componentPath };
    target.onDragStart?.(pos);
    this.setMode(new DragMode(this, target));
  }

  samePath(a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => v === b[i]);
  }

  resolveSelectedTarget() {
    if (!this.selectedTarget) return null;
    return this.interactiveTargets.find(t =>
      t.kind === this.selectedTarget.kind && this.samePath(t.componentPath, this.selectedTarget.componentPath)
    ) ?? null;
  }

  updateHoverCursor(pos) {
    const selected = this.resolveSelectedTarget();
    if (selected) {
      const bounds = selected.getBounds();
      if (bounds.length && this.utils.isPointWithinArea(pos, bounds)) {
        $(this.attackPlannerCanvas).css('cursor', 'pointer');
        return;
      }
    }
    const hovering = this.hitTest(pos);
    $(this.attackPlannerCanvas).css('cursor', hovering ? 'pointer' : 'default');
  }

  drawSelectedTargetOutline() {
    const target = this.resolveSelectedTarget();
    if (!target) return;
    const bounds = target.getBounds();
    if (bounds.length) {
      this.mapDrawUtils.drawSelectionOutline(bounds, target.outlineWidth, '#4af', target.outlineFilled, this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0]);
    }
  }

  persistTarget(target) {
    const rootKey = target.componentPath[0];
    let root = this.getComponentData(rootKey);
    const recurse = (node, pathIndex) => {
      if (target.componentPath[pathIndex] === undefined) return target.navPoint;
      const key = target.componentPath[pathIndex];
      if (node[key] !== undefined) node[key] = recurse(node[key], pathIndex + 1);
      return node;
    };
    root = recurse(root, 1);
    this.saveComponentData(rootKey, root);
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

    this.interactiveTargets = [];

    this.mapComponentList.forEach(mapComponent => {
      if (mapComponent.id != 'background-map') {
        mapComponent.drawFunction(mapComponent, mapOrientation, magneticDeclination, trueNorth);
      }
    });

    // Interactive labels (names, leg headings) draw on top of all other content.
    for (const target of this.interactiveTargets) {
      target.draw?.();
    }

    // Mode-specific chrome (selection outline, ruler, map bounds).
    this.activeMode?.drawOverlay?.();


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

  editBackgroundMap() {
    if (this.activeMode instanceof MapMode) {
      this.setMode(new SelectMode(this));
      return;
    }
    this.setMode(new MapMode(this));
  }

  editBackgroundScale() {
    if (this.activeMode instanceof RulerMode) {
      this.setMode(new SelectMode(this));
      return;
    }
    this.setMode(new RulerMode(this, this.mapDrawUtils));
  }

  placeNavPoint(field, data, component, fieldId) {
    this.setMode(new PlaceMode(this, {
      place: (imagePos) => {
        const navPointsField = component.fields.find(f => f.id === 'nav-points');
        if (!navPointsField) return;

        const mapComponent = this.mapComponentList.find(mc => mc.id === fieldId.split('.')[0]);

        const dataFieldId = fieldId.split('.');
        dataFieldId.pop();
        dataFieldId.push('nav-points');

        const flightPlanIndex = $(`[data-field-id= '${dataFieldId.join('.')}']`).parent('.multiple-field-item').attr('data-index');

        this.mapFieldsUtils.addField(
          mapComponent,
          navPointsField,
          [component.id, flightPlanIndex, 'nav-points'],
          { x: imagePos.x, y: imagePos.y, size: 30 }
        );

        this.mapFieldsUtils.displayComponent(mapComponent);
      }
    }));
  }

  placeComponentItem(field, data, component) {
    this.setMode(new PlaceMode(this, {
      place: (imagePos) => {
        const itemField = component.fields.find(f => f.id === component.id);
        if (!itemField) return;

        this.mapFieldsUtils.addField(
          component,
          itemField,
          [component.id],
          { x: imagePos.x, y: imagePos.y }
        );

        this.mapFieldsUtils.displayComponent(component);
      }
    }));
  }

  drawBackgroundMap() {
    this.backgroundMapDrawUtils.clearCanvas();
    if (this.backgroundImageObject) {
      const { x, y, scale, rotation } = this.attackPlannerUtils.getBackgroundTransform(this.getComponentData(this.mapComponentList.find(mc => mc.id === 'background-map')), this.backgroundImageObject);
      this.backgroundMapDrawUtils.drawImage(this.backgroundImageObject, x, y, scale, rotation);
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

    const color = this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0]

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

        this.interactiveTargets.push(this.attackPlannerUtils.makeNavPointTarget(navPoint, ['flight-plans', 'flight-plans', fpIdx, 'nav-points', i]));

        if (nextNavPoint) {
          const nextNavPointCanvasPosition = this.attackPlannerUtils.imageToCanvas(nextNavPoint.x, nextNavPoint.y);
          const legStart = turnTangents[i] ? turnTangents[i].T2 : navPointCanvasPosition;
          const legEnd = turnTangents[i + 1] ? turnTangents[i + 1].T1 : nextNavPointCanvasPosition;
          this.flightPlanUtils.drawLeg(legStart, legEnd, color);
          if (nextNavPoint['show-leg-heading']) {
            const headingText = this.flightPlanUtils.computeLegHeadingText(legStart, legEnd, mapOrientation, magneticDeclination, trueNorth);
            if (headingText) {
              this.interactiveTargets.push(this.attackPlannerUtils.makeHeadingLabelTarget(
                nextNavPoint,
                ['flight-plans', 'flight-plans', fpIdx, 'nav-points', i + 1],
                { x: legStart.x, y: legStart.y },
                { x: legEnd.x, y: legEnd.y },
                headingText
              ));
            }
          }
          const effectiveTarget = this.flightPlanUtils.getEffectiveLegTarget(navPoints, turnTangents, i, this.nmPerImagePixel, scale);
          this.flightPlanUtils.drawLegInfo(legStart, legEnd, navPoints, i, turnTangents, this.nmPerImagePixel, scale, effectiveTarget, color);
        }

        switch (navPoint.type) {
          case NavPointType.TURN:
            this.flightPlanUtils.drawTurnArc(turnTangents[i], color);
            if (this.showTurnPoints) {
              this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.TURNING_POINT, 12, 3, color);
            }
            break;
          case NavPointType.TURNING_POINT:
            this.flightPlanUtils.drawTurnArc(turnTangents[i], color);
            this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.TURNING_POINT, navPoint.size, 4, color);
            break;
          case NavPointType.INITIAL_POINT:
            this.flightPlanUtils.drawTurnArc(turnTangents[i], color);
            this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.INITIAL_POINT, navPoint.size, 4, color);
            break;
          case NavPointType.TARGET_POINT:
            this.flightPlanUtils.drawTurnArc(turnTangents[i], color);
            this.mapDrawUtils.drawNavPoint(navPointCanvasPosition.x, navPointCanvasPosition.y, NavPointType.TARGET_POINT, navPoint.size, 4, color);
            break;
        }

        if (navPoint.type !== NavPointType.TURN && navPoint.name) {
          this.interactiveTargets.push(this.attackPlannerUtils.makeNameLabelTarget(navPoint, ['flight-plans', 'flight-plans', fpIdx, 'nav-points', i]));
        }
      }

      this.mapDrawUtils.unclipCanvas();
    });
  }

  drawPopupPlan(component, mapOrientation, magneticDeclination, trueNorth) {
    const popupPlansData = this.getComponentData(component);
    if (!popupPlansData?.['popup-plan']?.length) return;

    const color = this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0];

    popupPlansData['popup-plan'].forEach((popupPlan, index) => {
      // Skip un-placed entries (e.g. the empty placeholder the form re-inserts
      // after the last item is deleted) — only draw plans with a position.
      if (popupPlan.x === undefined || popupPlan.y === undefined) return;

      this.interactiveTargets.push(this.attackPlannerUtils.makePopupPlanTarget(popupPlan, ['popup-plan', 'popup-plan', index]));

      const origin = this.attackPlannerUtils.imageToCanvas(popupPlan.x, popupPlan.y);
      this.mapDrawUtils.drawPopupPlan(origin.x, origin.y, {
        offsetTurnDistance: popupPlan['offset-turn-distance'],
        initiatePopupDistance: popupPlan['initiate-popup-distance'],
        startAltitude: popupPlan['start-altitude'],
        rollOverAltitude: popupPlan['roll-over-altitude'],
        apogeeAltitude: popupPlan['apogee-altitude'],
        designateMinAltitude: popupPlan['designate-minimum-altitude'],
        minReleaseAltitude: popupPlan['minimum-release-altitude'],
      }, color);
    });
  }

  drawBlastIndicator(component, mapOrientation, magneticDeclination, trueNorth) {
    const blastIndicatorData = this.getComponentData(component);
    if (!blastIndicatorData?.['blast-indicator']?.length) return;

    const color = this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0];

    blastIndicatorData['blast-indicator'].forEach((blastIndicator, index) => {
      // Skip un-placed entries (e.g. the empty placeholder the form re-inserts
      // after the last item is deleted) — only draw plans with a position.
      if (blastIndicator.x === undefined || blastIndicator.y === undefined) return;

      this.interactiveTargets.push(this.attackPlannerUtils.makeBlastIndicatorTarget(blastIndicator, ['blast-indicator', 'blast-indicator', index]));

      const origin = this.attackPlannerUtils.imageToCanvas(blastIndicator.x, blastIndicator.y);
      this.mapDrawUtils.drawBlastIndicator(origin.x, origin.y, blastIndicator['weapon-name'], blastIndicator['blast-height'], blastIndicator['blast-radius'], color);
    });
  }

  drawFuelPlan(component, mapOrientation, magneticDeclination, trueNorth) {
    const fuelPlanData = this.getComponentData(component);
    if (!fuelPlanData?.['fuel-plan']?.length) return;

    const color = this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0];

    fuelPlanData['fuel-plan'].forEach((fuelPlan, index) => {
      if (fuelPlan.x === undefined || fuelPlan.y === undefined) return;

      this.interactiveTargets.push(this.attackPlannerUtils.makeFuelPlanTarget(fuelPlan, ['fuel-plan', 'fuel-plan', index]));

      const origin = this.attackPlannerUtils.imageToCanvas(fuelPlan.x, fuelPlan.y);
      this.mapDrawUtils.drawFuelPlan(origin.x, origin.y, fuelPlan['estimated-fuel'], fuelPlan['minimum-fuel'], color);
    });
  }

  placeArrow(field, data, component, fieldId) {
    this.setMode(new PlaceMode(this, {
      place: (imagePos) => {
        const arrowField = component.fields.find(f => f.id === 'arrow');
        if (!arrowField) return;
        this.mapFieldsUtils.addField(
          component,
          arrowField,
          [component.id],
          { 'x-start': imagePos.x - 100, 'y-start': imagePos.y, 'x-end': imagePos.x + 100, 'y-end': imagePos.y }
        );
        this.mapFieldsUtils.displayComponent(component);
      }
    }));
  }

  drawArrow(component, mapOrientation, magneticDeclination, trueNorth) {
    const arrowData = this.getComponentData(component);
    if (!arrowData?.['arrow']?.length) return;

    const color = this.darkMode ? this.defaultLineColor[1] : this.defaultLineColor[0];

    arrowData['arrow'].forEach((arrow, index) => {
      if (arrow['x-start'] === undefined || arrow['y-start'] === undefined ||
        arrow['x-end'] === undefined || arrow['y-end'] === undefined) return;

      this.interactiveTargets.push(this.attackPlannerUtils.makeArrowEndpointTarget(arrow, ['arrow', 'arrow', index], 'start'));
      this.interactiveTargets.push(this.attackPlannerUtils.makeArrowEndpointTarget(arrow, ['arrow', 'arrow', index], 'end'));

      const start = this.attackPlannerUtils.imageToCanvas(arrow['x-start'], arrow['y-start']);
      const end = this.attackPlannerUtils.imageToCanvas(arrow['x-end'], arrow['y-end']);

      let distanceLabel = null;
      if (arrow.type?.includes('distance') && this.nmPerImagePixel) {
        const dist = Math.hypot(arrow['x-end'] - arrow['x-start'], arrow['y-end'] - arrow['y-start']) * this.nmPerImagePixel;
        distanceLabel = dist < 100 ? `${dist.toFixed(1)} NM` : `${Math.round(dist)} NM`;
      }

      this.mapDrawUtils.drawMapArrow(start.x, start.y, end.x, end.y, arrow.type ?? 'double-arrow', distanceLabel, color);

      const selectedPath = this.resolveSelectedTarget()?.componentPath;
      const arrowSelected = selectedPath?.[0] === 'arrow' && selectedPath?.[2] === index;
      if (this.showArrowPoints || arrowSelected) {
        this.mapDrawUtils.drawNavPoint(start.x, start.y, NavPointType.TURNING_POINT, 12, 3, color);
        this.mapDrawUtils.drawNavPoint(end.x, end.y, NavPointType.TURNING_POINT, 12, 3, color);
      }
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
    // Persist into a single object under 'attack-planner-data'
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
      this.mapFieldsUtils.displayComponentListButtons();

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
}