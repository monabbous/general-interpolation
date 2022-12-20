import BigNumber from "bignumber.js";
import { MINUS_ONE, ONE, TWO } from "../consts";
import type { KProdSubArg } from "../types";

export function alternate(c: BigNumber, i: BigNumber) {
    return (
        new BigNumber(-1)
            .pow(new BigNumber(i))
            .plus(ONE)
            .div(TWO)
            .multipliedBy(new BigNumber(c))
    )
}