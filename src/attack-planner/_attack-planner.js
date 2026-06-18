
const NavPointType = {
  TURN: 'turn',
  TURNING_POINT: 'turning-point',
  INITIAL_POINT: 'initial-point',
  TARGET_POINT: 'target-point',
};

const DataType = {
  WEAPON_OPTIONS: 'weapon-options',
};

const objectType = { ...NavPointType }

const ComponentType = {
  FLIGHT_PLAN: 'flight-plan',
  ADDITIONAL_DATA: 'additional-data',
}

const FlightPlanType = {
  NAV_POINTS: 'nav-points',
}

const AttackPlannerMode = {
  SELECT: 'select',
  PLACE: 'place',
  EDIT: 'edit',
  DRAG: 'drag',
  EDIT_MAP: 'edit-map',
  DRAG_MAP: 'drag-map',
};

const AttackPlannerModeTipText = {
  [AttackPlannerMode.SELECT]: '',
  [AttackPlannerMode.PLACE]: 'Click on the map to place the element.',
  [AttackPlannerMode.EDIT]: 'Click and drag the element to move it.',
  [AttackPlannerMode.DRAG]: 'Click and drag the element to move it.',
  [AttackPlannerMode.EDIT_MAP]: 'Click and drag over the map to move it.',
  [AttackPlannerMode.DRAG_MAP]: 'Click and drag over the map to move it.',
};

const AttackPlannerNavPointText = {
  [NavPointType.TURN]: 'Turn',
  [NavPointType.TURNING_POINT]: 'Tunning point',
  [NavPointType.INITIAL_POINT]: 'Initial point',
  [NavPointType.TARGET_POINT]: 'Target point',
};

class AttackPlanner {

  constructor() {
    this.attackPlannerCanvas = '.attack-planner-canvas';
    this.attackPlannerDataKey = 'attack-planner-data';
    this.attackPlannerDarkModeKey = 'attack-planner-dark-mode';

    this.utils = new Utils();
    this.mapDrawUtils = new MapDrawUtils(this.attackPlannerCanvas);

    this.darkMode = false;
    this.attackPlannerMode = AttackPlannerMode.SELECT;

    this.furthestPoint = 400;
    this.defaultScale = 400;

    this.selectedObject = null;

    this.dragComponent = null;
    this.dragOffset = null;

    this.getDarkMode();

    // Update attack-planner data when dark mode is changed.
    $('.attack-planner-dark-mode').on('change', () => this.updateDarkMode());

    this.setSelectMode();

    $('.attack-planner-tip-back-button').off('click').on('click', () => this.setSelectMode())

    /*$('.import-attack-planner-button').off('click').on('click', async () => this.importData());
    $('.show-export-attack-planner-modal-button').off('click').on('click', () => this.showExportModal());
    $('.show-download-attack-planner-modal-button').off('click').on('click', () => this.showDownloadModal());
    $('.reset-attack-planner-button').off('click').on('click', () => this.resetMap());*/
  }

  getDarkMode() {
    this.darkMode = localStorage.getItem(this.attackPlannerDarkModeKey) === 'true';
    $('.attack-planner-dark-mode').prop('checked', this.darkMode);
  }

  setSelectMode() {
    this.selectedObject = null;

    this.attackPlannerMode = AttackPlannerMode.SELECT;

    console.log('SELECT MODE');

    $('.add-turning-point-component-button').off('click').on('click', async () => this.setPlaceMode(NavPointType.TURNING_POINT));
    $('.add-initial-point-component-button').off('click').on('click', async () => this.setPlaceMode(NavPointType.INITIAL_POINT));

    $(this.attackPlannerCanvas).off('click').on('click', async (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      this.setEditMode(clickPosition.x, clickPosition.y)
    });

    this.updateSideBar()

    this.updateAttackPlanner();

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const pos = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);
      this.updateCursor(pos.x, pos.y);
    });
  }

  setPlaceMode(navPointType) {
    if (this.attackPlannerMode != AttackPlannerMode.SELECT) {
      return;
    }

    console.log('PLACE MODE');

    this.attackPlannerMode = AttackPlannerMode.PLACE;

    this.updateSideBar()

    $(this.attackPlannerCanvas).off('click').on('click', (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      this.placeComponent(navPointType, clickPosition.x, clickPosition.y);

      this.setSelectMode()
    });
  }

  placeComponent(navPointType, posX, posY) {
    let components = {};
    switch (navPointType) {
      case NavPointType.TURN:
        break;
      case NavPointType.TURNING_POINT:
        const newTurningPoint = { type: NavPointType.TURNING_POINT, x: posX, y: posY, size: 30 };

        components = this.getComponentData(ComponentType.FLIGHT_PLAN);
        if (components[FlightPlanType.NAV_POINTS]) {
          components[FlightPlanType.NAV_POINTS].push(newTurningPoint)
        } else {
          components[FlightPlanType.NAV_POINTS] = [newTurningPoint]
        }

        this.saveComponentData(ComponentType.FLIGHT_PLAN, components);
        break;
      case NavPointType.INITIAL_POINT:
        const newInitialPoint = { type: NavPointType.INITIAL_POINT, x: posX, y: posY, size: 30 };

        components = this.getComponentData(ComponentType.FLIGHT_PLAN);
        if (components[FlightPlanType.NAV_POINTS]) {
          components[FlightPlanType.NAV_POINTS].push(newInitialPoint)
        } else {
          components[FlightPlanType.NAV_POINTS] = [newInitialPoint]
        }

        this.saveComponentData(ComponentType.FLIGHT_PLAN, components);
        break;
      case NavPointType.TARGET_POINT:
        const newTargetPoint = { type: NavPointType.TARGET_POINT, x: posX, y: posY, size: 30 };

        components = this.getComponentData(ComponentType.FLIGHT_PLAN);
        if (components[FlightPlanType.NAV_POINTS]) {
          components[FlightPlanType.NAV_POINTS].push(newTunewTargetPointrningPoint)
        } else {
          components[FlightPlanType.NAV_POINTS] = [newTargetPoint]
        }

        this.saveComponentData(ComponentType.FLIGHT_PLAN, components);
        break;
    }

    this.updateAttackPlanner()
  }

  setEditMode(clickX, clickY) {
    const components = this.getComponentData();

    for (const [componentType, component] of Object.entries(components)) {
      const storePath = [componentType];
      let objects = []
      switch (componentType) {
        case ComponentType.FLIGHT_PLAN:
          storePath.push(FlightPlanType.NAV_POINTS)
          objects = component[FlightPlanType.NAV_POINTS];
          break;
      }

      for (let i = objects.length - 1; i >= 0; i--) {
        const objectBounds = this.getObjectBounds(objects[i]);
        if (this.utils.isPointWithinArea({ x: clickX, y: clickY }, objectBounds)) {
          this.selectedObject = objects[i];

          this.attackPlannerMode = AttackPlannerMode.EDIT;

          this.editObject(objects[i], i, storePath);

          this.updateSideBar()

          this.updateAttackPlanner();

          $(this.attackPlannerCanvas).off('click').on('click', (event) => {
            const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

            if (!this.utils.isPointWithinArea({ x: clickPosition.x, y: clickPosition.y }, objectBounds)) {
              this.setEditMode(clickPosition.x, clickPosition.y);
            }
          });

          return;
        } else {
          this.setSelectMode();
        }
      }
    }
  }

  editObject(object, index, storePath) {
    if (this.attackPlannerMode != AttackPlannerMode.EDIT) {
      return;
    }

    console.log('EDIT MODE');

    const objectBounds = this.getObjectBounds(object);

    $(this.attackPlannerCanvas).off('mousedown').on('mousedown', (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      if (this.utils.isPointWithinArea({ x: clickPosition.x, y: clickPosition.y }, objectBounds)) {
        this.setDragMode(object, index, storePath, clickPosition.x, clickPosition.y);
      }
    });
  }

  setDragMode(object, index, storePath, startX, startY) {
    if (this.attackPlannerMode != AttackPlannerMode.EDIT) {
      return;
    }

    this.attackPlannerMode = AttackPlannerMode.DRAG;

    console.log('DRAG MODE');

    this.updateSideBar();

    $(this.attackPlannerCanvas).css('cursor', 'grabbing');

    // Record the offset between click position and object center
    this.dragOffset = {
      x: startX - object.x,
      y: startY - object.y,
    };

    $(this.attackPlannerCanvas).off('mousemove').on('mousemove', (event) => {
      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      // Subtract the offset so the component doesn't snap to the mouse center
      object.x = clickPosition.x - this.dragOffset.x;
      object.y = clickPosition.y - this.dragOffset.y;

      const components = this.getComponentData(storePath[0]);

      if (storePath[1]) {
        components[storePath[1]][index] = object
      } else {
        components[index] = object
      }

      this.saveComponentData(storePath[0], components);

      this.updateAttackPlanner();
    });

    $(this.attackPlannerCanvas).off('mouseup').on('mouseup', (event) => {
      $(this.attackPlannerCanvas).css('cursor', 'pointer');
      this.dragOffset = null;

      $(this.attackPlannerCanvas).off('mousemove').off('mouseup');

      const clickPosition = this.utils.getCanvasClickPosition(event.clientX, event.clientY, $(this.attackPlannerCanvas)[0]);

      this.setEditMode(clickPosition.x, clickPosition.y);
    });
  }

  updateCursor(x, y) {
    const components = this.getComponentData();
    let hovering = false;

    for (const [componentType, component] of Object.entries(components)) {
      let objects = [];
      switch (componentType) {
        case ComponentType.FLIGHT_PLAN:
          objects = component[FlightPlanType.NAV_POINTS] ?? [];
          break;
      }

      for (const object of objects) {
        const bounds = this.getObjectBounds(object);
        if (this.utils.isPointWithinArea({ x, y }, bounds)) {
          hovering = true;
          break;
        }
      }

      if (hovering) break;
    }

    $(this.attackPlannerCanvas).css('cursor', hovering ? 'pointer' : 'default');
  }

  updateSideBar() {
    $('.flight-plan-object-container').html('');

    const flightPlanData = this.getComponentData(ComponentType.FLIGHT_PLAN);

    flightPlanData[FlightPlanType.NAV_POINTS].forEach((navPoint, index) => {
      const objectContainer = $(`<div class="attack-planner-object" data-index="${index}"></div>`);
      objectContainer.append($('<div class="drag-handle">:::</div>'))

      const field = $(`<div class="field"></div>`);
      field.append($(`<label>${index}</label>`))
      const input = $(`<select class="field-input"></select>`);
      Object.entries(NavPointType).forEach(([navPointIndex, navPointType]) => {
        input.append(`<option value="${navPointType}" ${navPoint.type === navPointType ? 'selected' : ''}>${AttackPlannerNavPointText[navPointType]}</option>`);
      });
      field.append(input)

      objectContainer.append(field)
      objectContainer.append($('<button class="delete-button">−</button>'))
      $('.flight-plan-object-container').append(objectContainer)
    });

    switch (this.attackPlannerMode) {
      case AttackPlannerMode.SELECT:
        $('.attack-planner-mode-tip').addClass('hide');
        $('.attack-planner-tip-content').html(AttackPlannerModeTipText[this.attackPlannerMode]);
        $('.component-list-buttons').removeClass('hide');
        break;
      case AttackPlannerMode.PLACE:
      case AttackPlannerMode.EDIT:
      case AttackPlannerMode.DRAG:
      case AttackPlannerMode.EDIT_MAP:
      case AttackPlannerMode.DRAG_MAP:
        $('.attack-planner-mode-tip').removeClass('hide');
        $('.attack-planner-tip-content').html(AttackPlannerModeTipText[this.attackPlannerMode]);
        $('.component-list-buttons').addClass('hide');
        break;
    }
  }

  updateAttackPlanner() {
    this.mapDrawUtils.clearCanvas();

    // Update the scale in DrawUtils
    this.mapDrawUtils.setScale(this.furthestPoint);

    // Update DrawUtils center
    this.mapDrawUtils.setCenter(400, 400);

    const flightPlanComponents = this.getComponentData(ComponentType.FLIGHT_PLAN)
    const navPointTypes = flightPlanComponents[FlightPlanType.NAV_POINTS];

    this.drawLines(flightPlanComponents[FlightPlanType.NAV_POINTS]);
    this.drawNavPoints(flightPlanComponents[FlightPlanType.NAV_POINTS]);

    if (this.selectedObject) {
      const bounds = this.getObjectBounds(this.selectedObject);
      if (bounds.length !== 0) {
        this.mapDrawUtils.drawSelectionOutline(bounds);
      }
    }
  }

  drawLines(navPointObjects) {
    if (navPointObjects) {
      for (let i = 0; i < navPointObjects.length - 1; i++) {
        this.mapDrawUtils.drawLine(navPointObjects[i].x, navPointObjects[i].y, navPointObjects[i + 1].x, navPointObjects[i + 1].y, 'black', 2)
      }
    }
  }

  drawNavPoints(navPointObjects) {
    if (navPointObjects) {
      navPointObjects.forEach(navPointObject => {
        switch (navPointObject.type) {
          case NavPointType.TURNING_POINT:
            this.mapDrawUtils.drawCircle(navPointObject.x, navPointObject.y, navPointObject.size, 2, 'black', true)
            break;
          case NavPointType.INITIAL_POINT:
            this.mapDrawUtils.drawSquare(navPointObject.x, navPointObject.y, navPointObject.size, 2, 'black', true)
            break;
        }
      });
    }
  }

  getComponentData(componentType) {
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem(this.attackPlannerDataKey) ?? '') || {};
    } catch (e) {
      store = {};
    }

    if (componentType) {
      return store[componentType] ?? {};
    } else {
      return store
    }
  }

  saveComponentData(componentType, component) {
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem(this.attackPlannerDataKey) ?? '') || {};
    } catch (e) {
      store = {};
    }

    store[componentType] = component;

    localStorage.setItem(this.attackPlannerDataKey, JSON.stringify(store));
  }

  updateDarkMode() {
    this.darkMode = $('.attack-planner-dark-mode').is(':checked');

    localStorage.setItem(this.attackPlannerDarkModeKey, this.darkMode.toString());

    this.updateAttackPlanner();
  }

  getObjectBounds(object) {
    const points = []

    switch (object.type) {
      case objectType.TURNING_POINT:
        const radius = object.size / 2;
        points.push({ x: object.x - radius, y: object.y - radius });
        points.push({ x: object.x + radius, y: object.y - radius });
        points.push({ x: object.x + radius, y: object.y + radius });
        points.push({ x: object.x - radius, y: object.y + radius });
        break;
      case objectType.INITIAL_POINT:
        const half = object.size / 2;
        points.push({ x: object.x - half, y: object.y - half });
        points.push({ x: object.x + half, y: object.y - half });
        points.push({ x: object.x + half, y: object.y + half });
        points.push({ x: object.x - half, y: object.y + half });
        break;
      case objectType.TARGET_POINT:
        break;
    }

    return points
  }
}