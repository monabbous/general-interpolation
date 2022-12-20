import BigNumber from 'bignumber.js';
import type { NumberDataSet } from './types';
import { dataSetToBigNumber } from './utils/convert';
import { generateDifferenceSet } from './utils/generateDifferenceSet';
import { getFormulaStrategy } from './utils/getForumlaStrategy';
import { generalInterpolation, lagrangeInterpolation } from './interpolations';
import { STRATEGIES } from './consts';




export function interpolate(args: {
    dataSet: NumberDataSet,
    xBar: number,
}) {
    const dataSet = dataSetToBigNumber(args.dataSet);
    const xBar = BigNumber(args.xBar);


    const differenceSet = generateDifferenceSet(dataSet);
    const strategy = getFormulaStrategy(xBar, differenceSet);

    if (strategy?.strategy === 'L') {
        return {
            value: lagrangeInterpolation(xBar, dataSet).toNumber(),
            ...strategy
        };
    } else if (strategy) {
        return {
            value: generalInterpolation(xBar, differenceSet, strategy!.index, STRATEGIES[strategy!.strategy]).toNumber(),
            ...strategy,
        };
    }


    return {
        value: NaN,
        index: NaN,
        strategy: undefined,
    };
}



export * from './interpolations'
export * from './types'