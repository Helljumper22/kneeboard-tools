// --- Interaction mode handlers ------------------------------------------------
// Exactly one handler is active at a time (AttackPlanner.activeMode). The canvas
// pointer events are bound once (AttackPlanner.bindCanvasEvents) and routed to the
// active handler, so changing behaviour is just swapping the handler object — no
// per-method off()/on() rebinding.
//
// Each handler receives the AttackPlanner instance as `ap` and may implement any
// of: onEnter, onExit, onMouseDown, onMouseMove, onMouseUp, onClick, onWheel,
// drawOverlay. `id` is the AttackPlannerMode string used for instruction lookups.

class SelectMode {
  constructor(attackPlanner) {
    this.attackPlanner = attackPlanner;
    this.id = AttackPlannerMode.SELECT;
  }

  onEnter() {
    this.attackPlanner.selectedTarget = null;
    this.attackPlanner.mapFieldsUtils.hideEditInstructions();
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'default');
  }

  onMouseMove(pos) { this.attackPlanner.updateHoverCursor(pos); }

  onMouseDown(pos) {
    const target = this.attackPlanner.hitTest(pos);
    if (target) this.attackPlanner.beginDrag(target, pos);
  }
}

class EditMode {
  constructor(attackPlanner) {
    this.attackPlanner = attackPlanner;
    this.id = AttackPlannerMode.EDIT;
  }

  onEnter() {
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'default');
    const target = this.attackPlanner.resolveSelectedTarget();
    if (!target) return;
    const mapComponent = this.attackPlanner.mapComponentList.find(mc => mc.id === target.componentPath[0]);
    this.attackPlanner.mapFieldsUtils.displayComponent(mapComponent);
    this.attackPlanner.mapFieldsUtils.selectField(target.componentPath);
    if (target.instructions) this.attackPlanner.mapFieldsUtils.showEditInstructions(target.instructions);
  }

  onMouseMove(pos) { this.attackPlanner.updateHoverCursor(pos); }

  onMouseDown(pos) {
    const selected = this.attackPlanner.resolveSelectedTarget();
    if (selected) {
      const bounds = selected.getBounds();
      if (bounds.length && this.attackPlanner.utils.isPointWithinArea(pos, bounds)) {
        this.attackPlanner.beginDrag(selected, pos);
        return;
      }
    }
    const target = this.attackPlanner.hitTest(pos);
    if (target) this.attackPlanner.beginDrag(target, pos);
    else this.attackPlanner.setMode(new SelectMode(this.attackPlanner));
  }

  drawOverlay() { this.attackPlanner.drawSelectedTargetOutline(); }
}

class DragMode {
  constructor(attackPlanner, target) {
    this.attackPlanner = attackPlanner;
    this.target = target;
    this.id = AttackPlannerMode.DRAG;
  }

  onEnter() {
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'grabbing');
    const mapComponent = this.attackPlanner.mapComponentList.find(mc => mc.id === this.target.componentPath[0]);
    this.attackPlanner.mapFieldsUtils.displayComponent(mapComponent);
    this.attackPlanner.mapFieldsUtils.selectField(this.target.componentPath);
    if (this.target.instructions) this.attackPlanner.mapFieldsUtils.showEditInstructions(this.target.instructions);
  }

  onMouseMove(pos, event) {
    this.target.applyDrag(pos, event);
    this.attackPlanner.persistTarget(this.target);
    this.attackPlanner.update();
  }

  onMouseUp() { this.attackPlanner.setMode(new EditMode(this.attackPlanner)); }

  drawOverlay() { this.attackPlanner.drawSelectedTargetOutline(); }
}

class PlaceMode {
  constructor(attackPlanner, context) {
    this.attackPlanner = attackPlanner;
    this.context = context;
    this.id = AttackPlannerMode.PLACE;
  }

  onEnter() { $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'pointer'); }

  onClick(pos) {
    // context.place(imagePos) adds the item; each placeable defines its own.
    const imagePos = this.attackPlanner.attackPlannerUtils.canvasToImage(pos.x, pos.y);
    this.context.place?.(imagePos);
    this.attackPlanner.setMode(new SelectMode(this.attackPlanner));
  }
}

class MapMode {
  constructor(attackPlanner) {
    this.attackPlanner = attackPlanner;
    this.id = AttackPlannerMode.MAP;
    this.isPanning = false;
    this.dragOffset = null;
  }

  get bgComponent() { return this.attackPlanner.mapComponentList.find(mc => mc.id === 'background-map'); }

  onEnter() {
    this.attackPlanner.mapFieldsUtils.displayComponent(this.bgComponent);
    this.attackPlanner.mapFieldsUtils.showEditInstructions('Drag to move the map. Use scroll tor zoom and ALT+Scroll to rotate.');
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'pointer');
  }

  onMouseDown(pos) {
    if (!this.attackPlanner.backgroundImageObject) return;
    const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
    const transform = this.attackPlanner.attackPlannerUtils.getBackgroundTransform(bgData, this.attackPlanner.backgroundImageObject);
    this.isPanning = true;
    this.dragOffset = { x: pos.x - transform.x, y: pos.y - transform.y };
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'grabbing');
  }

  onMouseMove(pos) {
    if (this.isPanning) {
      const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
      const transform = this.attackPlanner.attackPlannerUtils.getBackgroundTransform(bgData, this.attackPlanner.backgroundImageObject);
      bgData.x = pos.x - this.dragOffset.x;
      bgData.y = pos.y - this.dragOffset.y;
      bgData.scale = bgData.scale ?? transform.scale;
      bgData.rotation = bgData.rotation ?? transform.rotation;
      this.attackPlanner.saveComponentData(this.bgComponent, bgData);
      this.attackPlanner.drawBackgroundMap();
      this.attackPlanner.update();
      return;
    }
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'pointer');
  }

  onMouseUp(pos) {
    this.isPanning = false;
    $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'pointer');
  }

  onWheel(event) {
    event.preventDefault();
    const oe = event.originalEvent ?? event;
    const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
    const transform = this.attackPlanner.attackPlannerUtils.getBackgroundTransform(bgData, this.attackPlanner.backgroundImageObject);
    bgData.x = transform.x;
    bgData.y = transform.y;
    if (oe.altKey) {
      bgData.scale = transform.scale;
      bgData.rotation = transform.rotation + (oe.deltaY < 0 ? -Math.PI / 180 : Math.PI / 180);
    } else {
      bgData.scale = Math.max(0.01, transform.scale * (oe.deltaY < 0 ? 1.025 : 1 / 1.025));
      bgData.rotation = transform.rotation;
    }
    this.attackPlanner.saveComponentData(this.bgComponent, bgData);
    this.attackPlanner.drawBackgroundMap();
    this.attackPlanner.update();
  }

  drawOverlay() {
    const corners = this.getBackgroundImageCorners();
    if (corners) this.attackPlanner.mapDrawUtils.drawSelectionOutline(corners, 4, '#4af');
  }

  getBackgroundImageCorners() {
    if (!this.backgroundImageObject) return null;
    const bgData = this.getComponentData(this.mapComponentList.find(mc => mc.id === 'background-map'));
    const { x, y, scale, rotation } = this.attackPlannerUtils.getBackgroundTransform(bgData, this.backgroundImageObject);
    const halfW = (this.backgroundImageObject.width * scale) / 2;
    const halfH = (this.backgroundImageObject.height * scale) / 2;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const corner = (lx, ly) => ({ x: x + lx * cos - ly * sin, y: y + lx * sin + ly * cos });
    return [corner(-halfW, -halfH), corner(halfW, -halfH), corner(halfW, halfH), corner(-halfW, halfH)];
  }
}

class RulerMode {
  constructor(attackPlanner, mapDrawUtils) {
    this.attackPlanner = attackPlanner;
    this.mapDrawUtils = mapDrawUtils;
    this.id = AttackPlannerMode.RULER;
    this.dragPoint = null;
    this.lastCanvas = null;
  }

  get bgComponent() { return this.attackPlanner.mapComponentList.find(mc => mc.id === 'background-map'); }

  onEnter() {
    this.attackPlanner.mapFieldsUtils.displayComponent(this.bgComponent);
    this.attackPlanner.mapFieldsUtils.showEditInstructions('Drag an endpoint to set the scale reference. Use ALT for finer adjustments.');

    const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
    if (!bgData['ruler-point-1'] || !bgData['ruler-point-2']) {
      bgData['ruler-point-1'] = bgData['ruler-point-1'] ?? this.attackPlanner.attackPlannerUtils.canvasToImage(this.attackPlanner.width / 2, this.attackPlanner.height / 2 - 50);
      bgData['ruler-point-2'] = bgData['ruler-point-2'] ?? this.attackPlanner.attackPlannerUtils.canvasToImage(this.attackPlanner.width / 2, this.attackPlanner.height / 2 + 50);
      this.attackPlanner.saveComponentData(this.bgComponent, bgData);
    }
  }

  hoverables() {
    const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
    if (!bgData['ruler-point-1'] || !bgData['ruler-point-2']) return [];
    const r1 = this.attackPlanner.attackPlannerUtils.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y);
    const r2 = this.attackPlanner.attackPlannerUtils.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y);
    return [{ ...r1, size: 12 }, { ...r2, size: 12 }];
  }

  onMouseDown(pos) {
    const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
    const hit = this.attackPlanner.attackPlannerUtils.getRulerPointHit(pos.x, pos.y, bgData['ruler-point-1'], bgData['ruler-point-2']);
    if (hit) {
      this.dragPoint = hit;
      this.lastCanvas = pos;
      $(this.attackPlanner.attackPlannerCanvas).css('cursor', 'grabbing');
    }
  }

  onMouseMove(pos, event) {
    if (this.dragPoint) {
      const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
      const curr = this.attackPlanner.attackPlannerUtils.canvasToImage(pos.x, pos.y);
      const last = this.attackPlanner.attackPlannerUtils.canvasToImage(this.lastCanvas.x, this.lastCanvas.y);
      const precision = event.altKey ? 0.1 : 1;
      const key = this.dragPoint === 1 ? 'ruler-point-1' : 'ruler-point-2';
      bgData[key].x += (curr.x - last.x) * precision;
      bgData[key].y += (curr.y - last.y) * precision;
      this.lastCanvas = pos;
      this.attackPlanner.saveComponentData(this.bgComponent, bgData);
      this.attackPlanner.update();
      return;
    }
    this.attackPlanner.updateCursor(pos.x, pos.y, this.hoverables());
  }

  onMouseUp(pos) {
    if (this.dragPoint) {
      const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
      bgData['nm-per-image-pixel'] = this.attackPlanner.attackPlannerUtils.computeRulerCalibration(bgData['ruler-point-1'], bgData['ruler-point-2'], bgData['rule-scale']);
      this.attackPlanner.saveComponentData(this.bgComponent, bgData);
      this.dragPoint = null;
      this.attackPlanner.update();
    }
    this.attackPlanner.updateCursor(pos.x, pos.y, this.hoverables());
  }

  drawOverlay() {
    const bgData = this.attackPlanner.getComponentData(this.bgComponent) || {};
    const r1 = bgData['ruler-point-1'] ? this.attackPlanner.attackPlannerUtils.imageToCanvas(bgData['ruler-point-1'].x, bgData['ruler-point-1'].y) : null;
    const r2 = bgData['ruler-point-2'] ? this.attackPlanner.attackPlannerUtils.imageToCanvas(bgData['ruler-point-2'].x, bgData['ruler-point-2'].y) : null;
    this.drawRuler(r1, r2);
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
}
