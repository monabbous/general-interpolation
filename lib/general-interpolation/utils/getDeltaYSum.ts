import BigNumber from "bignumber.js";
import { ONE, ZERO } from "../consts";
import type { DeltaYisArg, DifferenceSet } from "../types";
import { alternate } from "./alternate";


export function getYis({ i, yiFactor, yiShifter, iAlternatingFactor }: DeltaYisArg) {
    let yi = (
        (new BigNumber(i)
            .plus(yiShifter))
            .multipliedBy(yiFactor)
            .integerValue(BigNumber.ROUND_FLOOR)
            .toNumber()
    )


    const yis = new Set([yi]);



    yis.add(alternate(ONE, iAlternatingFactor.multipliedBy(i).plus(ONE)).plus(yi).toNumber())

    return Array.from(yis)
}





export function getDeltaYi(differenceSet: DifferenceSet, yiArgs: DeltaYisArg, zeroIndex: number) {
    const yis = getYis(yiArgs)
        .map(yi => differenceSet[yi + zeroIndex]?.[`delta_${yiArgs.i}`] ?? ZERO);

    if (!yis.every(y => !y.isZero())) {
        return ZERO;
    }

    return (
        yis
            .reduce((acc, dyi) => acc.plus(dyi), ZERO)
            .dividedBy(yis.length)
    )
}