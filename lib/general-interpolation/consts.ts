import BigNumber from "bignumber.js";
import type { StrategyKey, StrategyParams } from "./types";

export const STRATEGIES: Omit<Record<StrategyKey, StrategyParams>, 'L'> = {
    NF: {
        yiShifter: new BigNumber(0),
        yiFactor: new BigNumber(0),
        kShifter: new BigNumber(0),
        kFactor: new BigNumber(1),
        kExponentFactor: new BigNumber(0),
        dir: new BigNumber(1),
        iAlternatingFactor: new BigNumber(0),
        kAlternatingFactor: new BigNumber(0),
    },
    NB: {
        yiShifter: new BigNumber(0),
        yiFactor: new BigNumber(-1),
        kShifter: new BigNumber(0),
        kFactor: new BigNumber(1),
        kExponentFactor: new BigNumber(0),
        dir: new BigNumber(-1),
        iAlternatingFactor: new BigNumber(0),
        kAlternatingFactor: new BigNumber(0),
    },
    GF: {
        yiShifter: new BigNumber(-1),
        yiFactor: new BigNumber(-0.5),
        kShifter: new BigNumber(1),
        kFactor: new BigNumber(2),
        kExponentFactor: new BigNumber(1),
        dir: new BigNumber(1),
        iAlternatingFactor: new BigNumber(0),
        kAlternatingFactor: new BigNumber(0),
    },
    GB: {
        yiShifter: new BigNumber(0),
        yiFactor: new BigNumber(-0.5),
        kShifter: new BigNumber(1),
        kFactor: new BigNumber(2),
        kExponentFactor: new BigNumber(1),
        dir: new BigNumber(-1),
        iAlternatingFactor: new BigNumber(0),
        kAlternatingFactor: new BigNumber(0),
    },
    S: {
        yiShifter: new BigNumber(0),
        yiFactor: new BigNumber(-0.5),
        kShifter: new BigNumber(0),
        kFactor: new BigNumber(2),
        kExponentFactor: new BigNumber(1),
        dir: new BigNumber(-1),
        iAlternatingFactor: new BigNumber(1),
        kAlternatingFactor: new BigNumber(1),
    },
}

export const MINUS_ONE = new BigNumber(-1);
export const ZERO = new BigNumber(0);
export const HALF = new BigNumber(0.5);
export const ONE = new BigNumber(1);
export const TWO = new BigNumber(2);