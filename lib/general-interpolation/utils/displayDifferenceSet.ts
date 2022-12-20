import BigNumber from "bignumber.js";
import type { DifferenceSet } from "../types";


export function displayDifferenceSet(differenceSet: DifferenceSet) {
    const styledTable: Partial<DifferenceSet[number]>[] = Object.values(differenceSet).reduce((acc, p, i, collection) => {
        if (BigNumber.isBigNumber(p)) return acc;

        const k = i * 2
        acc[k] ??= {};
        acc[k].x = p.x;
        acc[k].delta_0 = p.delta_0;
        // acc[k]['index'] = i;


        for (let j = 1; j < collection.length - i - 2; j++) {
            const k2 = i * 2 + j
            acc[k2] ??= {};
            if (p[`delta_${j}`]) {
                acc[k2][`delta_${j}`] = p[`delta_${j}`]
            }
        }

        return acc;
    }, [] as Partial<DifferenceSet[number]>[]);

    return styledTable;
}