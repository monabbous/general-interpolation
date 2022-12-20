import BigNumber from "bignumber.js";
import type { DataSet, DifferenceSet } from "../types";



export function generateDifferenceSet(dataSet: DataSet): DifferenceSet {

    const sortedSet = dataSet.sort((a, b) => a.x.minus(b.x).toNumber())

    const differenceSet: DifferenceSet = {
        n: new BigNumber(dataSet.length),
        max_k: new BigNumber(0),
    };

    for (let i = 0; i < sortedSet.length; i++) {
        const dataPoint = sortedSet[i];
        differenceSet[i] = {
            x: dataPoint.x,
            delta_0: dataPoint.y,
            max_k: new BigNumber(0)
        }
    }
    // checking h value
    if (sortedSet.length > 3) {
        let hInit: BigNumber | undefined = sortedSet[1].x.minus(sortedSet[0].x);
        for (let i = 1; i < sortedSet.length - 1; i++) {
            const h = sortedSet[i + 1].x.minus(sortedSet[i].x)
            if (!h.isEqualTo(hInit)) {
                hInit = undefined;
                break;
            }
        }

        if (hInit) {
            differenceSet.h = hInit
        }
    }

    for (let k = 1; k < sortedSet.length; k++) {
        for (let i = 0; i < sortedSet.length + 1; i++) {
            const current: DifferenceSet[number] = differenceSet[i];
            const next: DifferenceSet[number] = differenceSet[i + 1];
            if (next?.[`delta_${k - 1}`]) {
                const delta = next[`delta_${k - 1}`].minus(current[`delta_${k - 1}`])
                if (!delta.isZero()) {
                    current[`delta_${k}`] = delta;
                    if (differenceSet.max_k.isLessThan(k)) {
                        differenceSet.max_k = new BigNumber(k);
                    }
                    if (current.max_k.isLessThanOrEqualTo(k)) {
                        current.max_k = new BigNumber(k);
                    }
                }
            }
        }
    }

    return differenceSet;
}