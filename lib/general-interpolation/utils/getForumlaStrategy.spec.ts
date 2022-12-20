import BigNumber from "bignumber.js";
import { describe, expect, it } from "vitest";
import { dataSetToBigNumber, differenceSetToNumber } from "./convert";
import { generateDifferenceSet } from "./generateDifferenceSet";
import { getFormulaStrategy } from "./getForumlaStrategy";


describe('getFormulaStrategy()', () => {


    it('Should get accurate strategy for S', () => {
        const xBar = new BigNumber(1.69);
        const expected = { strategy: 'S', index: 2 }
        const dataSet = [
            { x: 1.5, y: 17.609 },
            { x: 1.6, y: 20.412 },
            { x: 1.7, y: 23.045 },
            { x: 1.8, y: 25.527 },
            { x: 1.9, y: 27.875 },
        ];
        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))


        const strategy = getFormulaStrategy(xBar, differenceSet);


        expect(strategy).toEqual(expected)
    })

    it('Should get accurate strategy for NF', () => {
        const xBar = new BigNumber(1.49);
        const expected = { strategy: 'NF', index: 0 }

        const dataSet = [
            { x: 1.5, y: 17.609 },
            { x: 1.6, y: 20.412 },
            { x: 1.7, y: 23.045 },
            { x: 1.8, y: 25.527 },
            { x: 1.9, y: 27.875 },
        ];

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const strategy = getFormulaStrategy(xBar, differenceSet);


        expect(strategy).toEqual(expected)

    })

    it('Should get accurate strategy for NB', () => {
        const xBar = new BigNumber(2.0);
        const expected = { strategy: 'NB', index: 4 }

        const dataSet = [
            { x: 1.5, y: 17.609 },
            { x: 1.6, y: 20.412 },
            { x: 1.7, y: 23.045 },
            { x: 1.8, y: 25.527 },
            { x: 1.9, y: 27.875 },
        ];

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const strategy = getFormulaStrategy(xBar, differenceSet);


        expect(strategy).toEqual(expected)
    })

    it('Should get accurate strategy for GF', () => {
        const xBar = new BigNumber(1.59);
        const expected = { strategy: 'GF', index: 1 }

        const dataSet = [
            { x: 1.5, y: 17.609 },
            { x: 1.6, y: 20.412 },
            { x: 1.7, y: 23.045 },
            { x: 1.8, y: 25.527 },
            { x: 1.9, y: 27.875 },
        ];

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const strategy = getFormulaStrategy(xBar, differenceSet);


        expect(strategy).toEqual(expected)
    })


    it('Should get accurate strategy for GB', () => {
        const xBar = new BigNumber(1.81);
        const expected = { strategy: 'GB', index: 3 }

        const dataSet = [
            { x: 1.5, y: 17.609 },
            { x: 1.6, y: 20.412 },
            { x: 1.7, y: 23.045 },
            { x: 1.8, y: 25.527 },
            { x: 1.9, y: 27.875 },
        ];

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const strategy = getFormulaStrategy(xBar, differenceSet);


        expect(strategy).toEqual(expected)
    })

    it('Should get accurate strategy for GB', () => {
        const xBar = new BigNumber(1.81);
        const expected = { strategy: 'L', index: NaN }

        const dataSet = [
            { x: 1.5, y: 17.609 },
            { x: 1.7, y: 23.045 },
            { x: 1.9, y: 27.875 },
        ];

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const strategy = getFormulaStrategy(xBar, differenceSet);


        expect(strategy).toEqual(expected)
    })

})
