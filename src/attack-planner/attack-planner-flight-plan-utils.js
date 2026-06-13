class AttackPlannerFlightPlanUtils {
    constructor(mapDrawUtils, attackPlannerUtils, utils) {
        this.mapDrawUtils = mapDrawUtils;
        this.attackPlannerUtils = attackPlannerUtils;
        this.utils = utils;
    }

    arcAngleRad(t) {
        let d = t.endAngle - t.startAngle;
        if (t.clockwise) { if (d < 0) d += 2 * Math.PI; }
        else { if (d > 0) d -= 2 * Math.PI; }
        return Math.abs(d);
    }

    arcLengthNm(t, nmToCanvasPx) {
        return t ? t.R * this.arcAngleRad(t) / nmToCanvasPx : 0;
    }

    computeTurnTangents(navPoints, nmPerImagePixel, scale) {
        const turnTangents = {};
        if (!nmPerImagePixel) return turnTangents;

        for (let i = 0; i < navPoints.length; i++) {
            const navPoint = navPoints[i];
            const prevNavPoint = navPoints[i - 1];
            const nextNavPoint = navPoints[i + 1];
            if (!prevNavPoint || !nextNavPoint) continue;

            const prev = this.attackPlannerUtils.imageToCanvas(prevNavPoint.x, prevNavPoint.y);
            const curr = this.attackPlannerUtils.imageToCanvas(navPoint.x, navPoint.y);
            const next = this.attackPlannerUtils.imageToCanvas(nextNavPoint.x, nextNavPoint.y);

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
            const R = R_nm / nmPerImagePixel * scale;
            if (R <= 0) continue;

            const clockwise = delta > 0;
            const perpSign = clockwise ? 1 : -1;

            if (navPoint['overfly']) {
                const T1 = curr;
                const center = {
                    x: curr.x + (-dIn.y * perpSign) * R,
                    y: curr.y + (dIn.x * perpSign) * R,
                };

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
                        tangentLengthIn: 0, tangentLengthOut,
                        startAngle: Math.atan2(T1.y - center.y, T1.x - center.x),
                        endAngle: Math.atan2(T2.y - center.y, T2.x - center.x),
                        clockwise, overfly: true,
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
                        tangentLengthIn: rawTangentLength, tangentLengthOut: rawTangentLength,
                        startAngle: Math.atan2(T1.y - center.y, T1.x - center.x),
                        endAngle: Math.atan2(T2.y - center.y, T2.x - center.x),
                        clockwise, overfly: false,
                    };
                }
            }
        }

        return turnTangents;
    }

    // Returns { canvasPos, extraDistNm, extraTimeSec } — the effective navigation target for a leg
    // leading into one or more TURN nav points.  effectiveTarget is the first non-TURN nav point
    // after navPoints[i+1], or the last nav point when all remaining are TURN.
    // extraDistNm / extraTimeSec are route distance/time from legEnd through the TURN legs to that target.
    // Returns null when navPoints[i+1] is not TURN, or when no meaningful look-ahead exists.
    getEffectiveLegTarget(navPoints, turnTangents, i, nmPerImagePixel, scale) {
        const nextNavPoint = navPoints[i + 1];
        if (!nextNavPoint || nextNavPoint.type !== NavPointType.TURN) return null;
        if (!nmPerImagePixel) return null;

        const nmToCanvasPx = scale / nmPerImagePixel;

        let j = i + 2;
        while (j < navPoints.length && navPoints[j].type === NavPointType.TURN) j++;
        if (j >= navPoints.length) j = navPoints.length - 1;
        if (j <= i + 1) return null;

        const effectiveTargetNavPoint = navPoints[j];
        const effectiveTargetCanvasPos = this.attackPlannerUtils.imageToCanvas(effectiveTargetNavPoint.x, effectiveTargetNavPoint.y);

        let extraDistNm = 0;
        let extraTimeSec = 0;

        for (let k = i + 1; k < j; k++) {
            const kNavPoint = navPoints[k];
            const kNextNavPoint = navPoints[k + 1];
            const kTangent = turnTangents[k];

            if (kTangent) {
                const arcNm = this.arcLengthNm(kTangent, nmToCanvasPx);
                extraDistNm += arcNm;
                const gs = parseFloat(kNavPoint['ground-speed']) || 0;
                if (gs > 0) extraTimeSec += arcNm / gs * 3600;
            }

            const segStart = kTangent
                ? kTangent.T2
                : this.attackPlannerUtils.imageToCanvas(kNavPoint.x, kNavPoint.y);
            const segEnd = turnTangents[k + 1]
                ? turnTangents[k + 1].T1
                : this.attackPlannerUtils.imageToCanvas(kNextNavPoint.x, kNextNavPoint.y);
            const segDistNm = Math.hypot(segEnd.x - segStart.x, segEnd.y - segStart.y) / nmToCanvasPx;
            extraDistNm += segDistNm;
            const gsNext = parseFloat(kNextNavPoint['ground-speed']) || 0;
            if (gsNext > 0) extraTimeSec += segDistNm / gsNext * 3600;
        }

        const targetTangent = turnTangents[j];
        if (targetTangent && !targetTangent.overfly) {
            const halfArcNm = this.arcLengthNm(targetTangent, nmToCanvasPx) * 0.5;
            extraDistNm += halfArcNm;
            const gs = parseFloat(effectiveTargetNavPoint['ground-speed']) || 0;
            if (gs > 0) extraTimeSec += halfArcNm / gs * 3600;
        }

        return { canvasPos: effectiveTargetCanvasPos, extraDistNm, extraTimeSec };
    }

    // Returns the accumulated flight time from the last non-TURN nav point (exclusive) up to the
    // timeBarStart of leg legIndex.  "timeBarStart" is the midpoint of the incoming arc at legIndex,
    // i.e. legStart shifted back by startArcNm.
    // This is used to phase-shift the time bar so it reads as a continuous count from the origin.
    getAccumulatedTimeFromOrigin(navPoints, turnTangents, legIndex, nmPerImagePixel, scale) {
        if (!nmPerImagePixel) return 0;
        const nmToCanvasPx = scale / nmPerImagePixel;

        // Walk backward to find the last non-TURN nav point before legIndex
        let origin = legIndex - 1;
        while (origin > 0 && navPoints[origin].type === NavPointType.TURN) origin--;

        let accTimeSec = 0;

        for (let k = origin; k < legIndex; k++) {
            const kNavPoint = navPoints[k];
            const kNextNavPoint = navPoints[k + 1];
            const kTangent = turnTangents[k];
            const kNextTangent = turnTangents[k + 1];

            // Straight leg from T2[k] to T1[k+1]
            const segStart = kTangent
                ? kTangent.T2
                : this.attackPlannerUtils.imageToCanvas(kNavPoint.x, kNavPoint.y);
            const segEnd = kNextTangent
                ? kNextTangent.T1
                : this.attackPlannerUtils.imageToCanvas(kNextNavPoint.x, kNextNavPoint.y);
            const segDistNm = Math.hypot(segEnd.x - segStart.x, segEnd.y - segStart.y) / nmToCanvasPx;
            const gs = parseFloat(kNextNavPoint['ground-speed']) || 0;
            if (gs > 0) accTimeSec += segDistNm / gs * 3600;

            if (k + 1 < legIndex && kNextTangent) {
                // Full arc at intermediate nav point k+1
                const arcNm = this.arcLengthNm(kNextTangent, nmToCanvasPx);
                const gsNext = parseFloat(kNextNavPoint['ground-speed']) || 0;
                if (gsNext > 0) accTimeSec += arcNm / gsNext * 3600;
            } else if (k + 1 === legIndex && kNextTangent) {
                // Half arc at legIndex (the inbound half that timeBarStart sits in the middle of)
                const halfArcNm = this.arcLengthNm(kNextTangent, nmToCanvasPx) * (kNextTangent.overfly ? 1 : 0.5);
                const gsNext = parseFloat(kNextNavPoint['ground-speed']) || 0;
                if (gsNext > 0) accTimeSec += halfArcNm / gsNext * 3600;
            }
        }

        return accTimeSec;
    }

    drawLeg(legStart, legEnd) {
        this.mapDrawUtils.drawLine(legStart.x, legStart.y, legEnd.x, legEnd.y, 'black', 4);
    }

    // navPoints and legIndex are required to support the continuation time bar and
    // the accumulated-time phase-shift across TURN legs.
    drawLegInfo(legStart, legEnd, navPoints, legIndex, turnTangents, nmPerImagePixel, scale, effectiveTarget = null) {
        const navPoint = navPoints[legIndex];
        const nextNavPoint = navPoints[legIndex + 1];
        const turnTangentCurr = turnTangents[legIndex];
        const turnTangentNext = turnTangents[legIndex + 1];

        if (!nextNavPoint['leg-information'] || nextNavPoint['leg-information'] === 'none') return;
        if (!nmPerImagePixel) return;

        const nmToCanvasPx = scale / nmPerImagePixel;
        const sliderValue = parseInt(nextNavPoint['leg-information-scale'] ?? 50);
        const targetPxPerTick = 300 * Math.pow(20 / 300, sliderValue / 100);
        const showDistance = ['distance', 'both'].includes(nextNavPoint['leg-information']);
        const showTime = ['time', 'both'].includes(nextNavPoint['leg-information']);

        const startArcNm = turnTangentCurr
            ? this.arcLengthNm(turnTangentCurr, nmToCanvasPx) * (turnTangentCurr.overfly ? 1 : 0.5)
            : 0;
        const endArcNm = (turnTangentNext && !turnTangentNext.overfly)
            ? this.arcLengthNm(turnTangentNext, nmToCanvasPx) * 0.5
            : 0;

        const legDx = legEnd.x - legStart.x;
        const legDy = legEnd.y - legStart.y;
        const legLenPx = Math.hypot(legDx, legDy);
        const nx = legLenPx > 0 ? legDx / legLenPx : 0;
        const ny = legLenPx > 0 ? legDy / legLenPx : 0;

        const symbolPad = 8;
        const startSymbolMarginPx = (navPoint?.size ?? 0) / 2 + symbolPad;
        const endSymbolMarginPx = (nextNavPoint?.size ?? 0) / 2 + symbolPad;

        if (showDistance) {
            const idealStepNm = targetPxPerTick / nmToCanvasPx;
            const stepNm = this.attackPlannerUtils.nearestStep(DISTANCE_STEPS_NM, idealStepNm);
            const stepPx = stepNm * nmToCanvasPx;

            if (effectiveTarget) {
                // Ticks placed at exact positions on the leg where straight-line distance
                // to the effective target equals k * stepNm.  side=+1 puts them on the
                // same physical side of the leg as the normal distance bar (which goes
                // legEnd→legStart with side=-1, giving the same perpendicular direction).
                this.mapDrawUtils.drawDirectDistanceMarkers(
                    legStart.x, legStart.y,
                    legEnd.x, legEnd.y,
                    effectiveTarget.canvasPos.x, effectiveTarget.canvasPos.y,
                    stepNm, nmToCanvasPx,
                    'black', +1, startSymbolMarginPx, 0
                );
            } else {
                const distOffsetPx = endArcNm * nmToCanvasPx;
                const distBarStart = { x: legEnd.x + nx * distOffsetPx, y: legEnd.y + ny * distOffsetPx };
                this.mapDrawUtils.drawLegMarkers(
                    distBarStart.x, distBarStart.y,
                    legStart.x, legStart.y,
                    stepPx,
                    (i) => `${i * stepNm}`,
                    'black', -1, distOffsetPx, startSymbolMarginPx
                );
            }
        }

        if (showTime) {
            const groundSpeed = parseFloat(nextNavPoint['ground-speed']);
            if (groundSpeed > 0) {
                const idealStepSec = (targetPxPerTick / nmToCanvasPx) / groundSpeed * 3600;
                const stepSec = this.attackPlannerUtils.nearestStep(TIME_STEPS_SEC, idealStepSec);
                const stepNm = stepSec * groundSpeed / 3600;
                const stepPx = stepNm * nmToCanvasPx;

                if (navPoint.type === NavPointType.TURN) {
                    // This is a leg between two TURN points.  The time bar continues from
                    // the last non-TURN origin without resetting: compute accumulated time
                    // from origin to this leg's timeBarStart and phase-shift the grid.
                    const accTimeSec = this.getAccumulatedTimeFromOrigin(navPoints, turnTangents, legIndex, nmPerImagePixel, scale);
                    const phaseTimeSec = ((accTimeSec % stepSec) + stepSec) % stepSec;
                    const phaseTimePx = (phaseTimeSec / 3600 * groundSpeed) * nmToCanvasPx;
                    const k0t = Math.floor(accTimeSec / stepSec);
                    const totalSkipPx = startArcNm * nmToCanvasPx + phaseTimePx;
                    const timeBarStart = { x: legStart.x - nx * totalSkipPx, y: legStart.y - ny * totalSkipPx };
                    this.mapDrawUtils.drawLegMarkers(
                        timeBarStart.x, timeBarStart.y,
                        legEnd.x, legEnd.y,
                        stepPx,
                        (i) => this.utils.formatTimeLabel((i + k0t) * stepSec),
                        'black', -1, totalSkipPx, endSymbolMarginPx
                    );
                } else {
                    // Normal time bar (also used for the first leg entering a TURN sequence).
                    const timeOffsetPx = startArcNm * nmToCanvasPx;
                    const timeBarStart = { x: legStart.x - nx * timeOffsetPx, y: legStart.y - ny * timeOffsetPx };
                    this.mapDrawUtils.drawLegMarkers(
                        timeBarStart.x, timeBarStart.y,
                        legEnd.x, legEnd.y,
                        stepPx,
                        (i) => this.utils.formatTimeLabel(i * stepSec),
                        'black', -1, timeOffsetPx, endSymbolMarginPx
                    );
                }
            }
        }
    }

    computeLegHeadingText(legStart, legEnd, mapOrientation, magneticDeclination, trueNorth) {
        const dx = legEnd.x - legStart.x;
        const dy = legEnd.y - legStart.y;
        if (Math.hypot(dx, dy) < 20) return null;

        const screenAngleDeg = Math.atan2(dx, -dy) * (180 / Math.PI);
        const trueHeading = ((screenAngleDeg - mapOrientation) % 360 + 360) % 360;
        const heading = trueNorth ? trueHeading : ((trueHeading - magneticDeclination) % 360 + 360) % 360;
        const headingRounded = Math.round(heading / 5) * 5 % 360;
        return String(headingRounded).padStart(3, '0');
    }

    drawTurnArc(turnTangent) {
        if (!turnTangent) return;
        const { center, R, startAngle, endAngle, clockwise } = turnTangent;
        this.mapDrawUtils.drawTurnArc(center.x, center.y, R, startAngle, endAngle, clockwise, 'black', 4);
    }
}
