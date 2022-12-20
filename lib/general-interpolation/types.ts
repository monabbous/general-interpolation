import type BigNumber from "bignumber.js"



export type DataPoint = {
    x: BigNumber;
    y: BigNumber;
}

export type NumberDataPoint = {
    x: number;
    y: number;
}

export type DataSet = DataPoint[];

export type NumberDataSet = NumberDataPoint[];


type DeltaKey = `delta_${number}`
export type DifferenceSet = {
    h?: BigNumber;
    max_k: BigNumber;
    n: BigNumber;
    [i: number]: {
        x: BigNumber;
        [k: DeltaKey]: BigNumber;
        max_k: BigNumber;
    }
}

export type NumberDifferenceSet = {
    h?: number;
    max_k: number;
    n: number;
    [i: number]: {
        x: number;
        [k: DeltaKey]: number;
        max_k: number;
    }
}



export type StrategyKey =
    | 'NF'  // Newton's Forwards
    | 'NB'  // Newton's Backwards
    | 'GF'  // Gauss's Forwards
    | 'GB'  // Gauss's Backwards
    | 'S'   // Sterling's
    | 'L'   // lagrange's
    ;

export type StrategyParams = {
    yiShifter: BigNumber;
    yiFactor: BigNumber;
    kShifter: BigNumber;
    kFactor: BigNumber;
    kExponentFactor: BigNumber;
    dir: BigNumber;
    iAlternatingFactor: BigNumber;
    kAlternatingFactor: BigNumber;
}

export type DeltaYisArg =
    & { i: number }
    & Pick<StrategyParams, 'yiShifter' | 'yiFactor' | 'iAlternatingFactor'>


export type KProdSubArg =
    & { k: number, i: number }
    & Pick<StrategyParams, 'kShifter' | 'kFactor' | 'kExponentFactor' | 'kAlternatingFactor' | 'dir'>


export type InterpolateArg = {
    dataSet: NumberDataSet;
    xBar: number;
}