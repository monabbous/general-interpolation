import BigNumber from "bignumber.js";
import type { DataSet, DifferenceSet, NumberDataSet, NumberDifferenceSet } from "../types";



export function dataSetToBigNumber(dataSet: DataSet | NumberDataSet) {

    return dataSet
        .map(dataPoint => ({
            x: new BigNumber(dataPoint.x),
            y: new BigNumber(dataPoint.y),
        }))
}

export function dataSetToNumber(dataSet: DataSet) {
    return dataSet.map(dataPoint => ({
        x: dataPoint.x.toNumber(),
        y: dataPoint.y.toNumber(),
    }))
}

export function differenceSetToDataSet(differenceSet: DifferenceSet): DataSet {
    return Object.values(differenceSet)
        .reduce((set, point) => ('x' in point && 'delta_0' in point ? set.concat([{ x: point.x, y: point['delta_0'] }]) : set), [] as DataSet)
}


export function differenceSetToNumber(differenceSet: DifferenceSet) {
    const numberDifferenceSet: NumberDifferenceSet = {
        n: differenceSet.n.toNumber(),
        max_k: differenceSet.max_k.toNumber(),
        h: differenceSet.h?.toNumber(),
    }

    for (let i = 0; i < numberDifferenceSet.n; i++) {
        numberDifferenceSet[i] = {
            x: differenceSet[i].x.toNumber(),
            max_k: differenceSet[i].max_k.toNumber(),
        };

        for (let k = 0; k < numberDifferenceSet.n; k++) {
            if (differenceSet[i][`delta_${k}`]) {
                numberDifferenceSet[i][`delta_${k}`] = differenceSet[i][`delta_${k}`]?.toNumber();
            }
        }
    }


    return numberDifferenceSet;
}