class AttackPlannerUtils {
    constructor(attackPlanner, mapDrawUtils, backgroundMapDrawUtils) {
        this.attackPlanner = attackPlanner;
        this.mapDrawUtils = mapDrawUtils;
        this.backgroundMapDrawUtils = backgroundMapDrawUtils;
    }

    getBackgroundTransform(backgroundData, backgroundImageObject) {
        const canvasW = this.backgroundMapDrawUtils.canvas.width;
        const canvasH = this.backgroundMapDrawUtils.canvas.height;

        if (backgroundData?.x !== undefined) {
            return {
                x: backgroundData.x,
                y: backgroundData.y,
                scale: backgroundData.scale,
                rotation: backgroundData.rotation ?? 0,
            };
        }

        // Default: scale to fit canvas, centered
        const fitScale = backgroundImageObject
            ? Math.min(canvasW / backgroundImageObject.width, canvasH / backgroundImageObject.height)
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

    currentTransform() {
        const bgMapComponent = this.attackPlanner.mapComponentList.find(mc => mc.id === 'background-map');
        const bgData = this.attackPlanner.getComponentData(bgMapComponent);
        return this.getBackgroundTransform(bgData, this.attackPlanner.backgroundImageObject);
    }

    canvasToImage(cx, cy) {
        const { x, y, scale, rotation } = this.currentTransform();
        const dx = cx - x, dy = cy - y;
        const cos = Math.cos(-rotation), sin = Math.sin(-rotation);
        return { x: (dx * cos - dy * sin) / scale, y: (dx * sin + dy * cos) / scale };
    }

    imageToCanvas(ix, iy) {
        const { x, y, scale, rotation } = this.currentTransform();
        const cos = Math.cos(rotation), sin = Math.sin(rotation);
        const dx = ix * scale, dy = iy * scale;
        return { x: x + dx * cos - dy * sin, y: y + dx * sin + dy * cos };
    }

    nearestStep(steps, idealInterval) {
        return steps.reduce((best, step) =>
            Math.abs(Math.log(step / idealInterval)) < Math.abs(Math.log(best / idealInterval)) ? step : best
        );
    }

    getInstructionText(mode) {
        switch (mode) {
            case AttackPlannerMode.EDIT_MAP:
            case AttackPlannerMode.DRAG_MAP:
                return 'Drag to move the map. Scroll to zoom, Alt+Scroll to rotate.';
            case AttackPlannerMode.EDIT_RULER:
            case AttackPlannerMode.DRAG_RULER:
                return 'Drag an endpoint to set the scale reference.';
            case AttackPlannerMode.EDIT:
            case AttackPlannerMode.DRAG:
                return 'Drag to move the nav point.';
            case AttackPlannerMode.EDIT_LABEL:
            case AttackPlannerMode.DRAG_LABEL:
                return 'Drag to reposition the label around the nav point.';
            default:
                return null;
        }
    }
}