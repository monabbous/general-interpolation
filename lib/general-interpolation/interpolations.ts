import type BigNumber from "bignumber.js";
import type { DataSet, DifferenceSet, StrategyParams } from "./types";
import { ONE, ZERO } from "./consts";
import { getKProdSub } from "./utils/getKProdSub";
import { getDeltaYi } from "./utils/getDeltaYSum";






export function generalInterpolation(xBar: BigNumber, differenceSet: DifferenceSet, zeroIndex: number, strategy: StrategyParams) {
    const p = xBar.minus(differenceSet[zeroIndex].x).div(differenceSet.h!);

    const n = differenceSet.n.toNumber();

    let interpolation = ZERO
    for (let i = 0; i < n; i++) {

        let kProds = ONE;
        for (let k = 0; k < i; k++) {

            const kProdSub = getKProdSub({ k, i, ...strategy });
            let kProd = p.minus(kProdSub);

            kProd = kProd.dividedBy(k + 1)

            if (!kProd.isZero()) {
                kProds = kProds.multipliedBy(kProd)
            }

        }

        const deltaY = getDeltaYi(differenceSet, { i, ...strategy }, zeroIndex)
        const segmentY = deltaY.multipliedBy(kProds)

        if (segmentY.isZero()) {
            break;
        }

        interpolation = interpolation.plus(segmentY)
    }


    return interpolation;
}


export function lagrangeInterpolation(xBar: BigNumber, dataSet: DataSet) {

    const n = dataSet.length

    let sum = ZERO;
    for (let i = 0; i < n; i++) {

        let prod = dataSet[i].y;
        for (let j = 0; j < n; j++) {
            if (j != i) {
                prod = prod.multipliedBy(
                    xBar
                        .minus(dataSet[j].x)
                        .dividedBy(
                            dataSet[i].x.minus(dataSet[j].x)
                        )
                )
            }
        }

        sum = sum.plus(prod);
    }

    return sum;
}