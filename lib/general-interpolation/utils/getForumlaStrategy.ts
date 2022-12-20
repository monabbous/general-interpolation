import type BigNumber from "bignumber.js";
import { STRATEGIES } from "../consts";
import type { DifferenceSet, StrategyKey } from "../types";
import { getYis } from "./getDeltaYSum";

function checkYiValidity(differenceSet: DifferenceSet, i: number, zeroIndex: number, yis: number[]): boolean {
    return yis.every(yi => {
        if (differenceSet[yi + zeroIndex]?.[`delta_${i}`] === undefined) return false;
        return !differenceSet[yi + zeroIndex]?.[`delta_${i}`].isZero();
    })
}

export function getFormulaStrategy(xBar: BigNumber, differenceSet: DifferenceSet): { strategy: StrategyKey, index: number } | undefined {
    if (differenceSet.h === undefined || differenceSet.n.isLessThanOrEqualTo(3)) return { strategy: 'L', index: NaN };

    if (xBar.isLessThanOrEqualTo(differenceSet[0].x)) return { strategy: 'NF', index: 0 }
    if (xBar.isGreaterThanOrEqualTo(differenceSet[differenceSet.n.minus(1)?.toNumber()].x)) return { strategy: 'NB', index: differenceSet.n?.toNumber() - 1 }



    let zeroIndex;
    for (zeroIndex = -1; zeroIndex < differenceSet.n.toNumber(); zeroIndex++) {
        if (xBar.isLessThan(differenceSet[zeroIndex + 1]?.x)) break;
    }

    let closestIndex =
        differenceSet[zeroIndex + 1]?.x.minus(differenceSet[zeroIndex]?.x).isLessThan(differenceSet.h.multipliedBy(0.5))
            ? zeroIndex
            : zeroIndex + 1

    let furthestIndex = closestIndex === zeroIndex + 1 ? zeroIndex : zeroIndex + 1;

    for (let i = differenceSet.max_k.toNumber(); i >= 0; i--) {

        const GFdeltaYis = getYis({ i, ...STRATEGIES.GF });
        const GBdeltaYis = getYis({ i, ...STRATEGIES.GB });
        const SdeltaYis = getYis({ i, ...STRATEGIES.S });



        // if (!!SdeltaYis.length && !!SdeltaYis.every(yi => !differenceSet[yi + closestIndex]?.[`delta_${i}`]?.isZero())) {
        if (!!SdeltaYis.length && checkYiValidity(differenceSet, i, closestIndex, SdeltaYis)) {
            return { strategy: "S", index: closestIndex }
        }

        // if (!!GFdeltaYis.length && !!GFdeltaYis.every(yi => !differenceSet[yi + closestIndex]?.[`delta_${i}`]?.isZero())) {
        if (!!GFdeltaYis.length && checkYiValidity(differenceSet, i, closestIndex, GFdeltaYis)) {
            return { strategy: "GF", index: closestIndex }
        }

        // if (!!GBdeltaYis.length && !!GBdeltaYis.every(yi => !differenceSet[yi + closestIndex]?.[`delta_${i}`]?.isZero())) {
        if (!!GBdeltaYis.length && checkYiValidity(differenceSet, i, closestIndex, GBdeltaYis)) {
            return { strategy: "GB", index: closestIndex }
        }

        // if (!!SdeltaYis.length && !!SdeltaYis.every(yi => !differenceSet[yi + closestIndex]?.[`delta_${i}`]?.isZero())) {
        if (!!SdeltaYis.length && checkYiValidity(differenceSet, i, furthestIndex, SdeltaYis)) {
            return { strategy: "S", index: furthestIndex }
        }

        // if (!!GFdeltaYis.length && !!GFdeltaYis.every(yi => !differenceSet[yi + furthestIndex]?.[`delta_${i}`]?.isZero())) {
        if (!!GFdeltaYis.length && checkYiValidity(differenceSet, i, furthestIndex, GFdeltaYis)) {
            return { strategy: "GF", index: furthestIndex }
        }

        // if (!!GBdeltaYis.length && !!GBdeltaYis.every(yi => !differenceSet[yi + furthestIndex]?.[`delta_${i}`]?.isZero())) {
        if (!!GBdeltaYis.length && checkYiValidity(differenceSet, i, furthestIndex, GBdeltaYis)) {
            return { strategy: "GB", index: furthestIndex }
        }
    }
}
