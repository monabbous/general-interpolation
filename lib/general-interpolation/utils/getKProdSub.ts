import BigNumber from "bignumber.js";
import { MINUS_ONE } from "../consts";
import type { KProdSubArg } from "../types";
import { alternate } from "./alternate";

export function getKProdSub({ k, i, kShifter, kFactor, kAlternatingFactor, kExponentFactor, dir }: KProdSubArg) {

    return (
        new BigNumber(k)
            .plus(kShifter)
            .plus(alternate(kAlternatingFactor, new BigNumber(k + i)))
            .dividedBy(kFactor)
            .integerValue(BigNumber.ROUND_FLOOR)
            .multipliedBy(
                MINUS_ONE.pow(kShifter.plus(k).multipliedBy(kExponentFactor))
            )
            .multipliedBy(dir)
    )
}