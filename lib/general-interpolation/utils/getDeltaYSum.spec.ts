import { describe, expect, it } from "vitest";
import { STRATEGIES } from "../consts";
import { dataSetToBigNumber } from "./convert";
import { generateDifferenceSet } from "./generateDifferenceSet";
import { getDeltaYi, getYis } from "./getDeltaYSum";





describe('getYis()', () => {

    it('should yield an accurate delta yi for a NF', () => {

        const n = 5;
        const strategy = STRATEGIES.NF
        const expectedYiParts = new Array(n).fill([0])


        const yiParts: any[] = [];
        for (let i = 0; i < n; i++) {
            yiParts[i] = getYis({ i, ...strategy })
        }


        expect(yiParts).toEqual(expectedYiParts)
    })


    it('should yield an accurate delta yi for a NB', () => {

        const n = 5;
        const strategy = STRATEGIES.NB
        const expectedYiParts = [[0], [-1], [-2], [-3], [-4]]


        const yiParts: any[] = [];
        for (let i = 0; i < n; i++) {
            yiParts[i] = getYis({ i, ...strategy })
        }


        expect(yiParts).toEqual(expectedYiParts)
    })

    it('should yield an accurate delta yi for a GF', () => {

        const n = 5;
        const strategy = STRATEGIES.GF
        const expectedYiParts = [[0], [0], [-1], [-1], [-2]]


        const yiParts: any[] = [];
        for (let i = 0; i < n; i++) {
            yiParts[i] = getYis({ i, ...strategy })
        }


        expect(yiParts).toEqual(expectedYiParts)
    })


    it('should yield an accurate delta yi for a GB', () => {

        const n = 5;
        const strategy = STRATEGIES.GB
        const expectedYiParts = [[0], [-1], [-1], [-2], [-2]]


        const yiParts: any[] = [];
        for (let i = 0; i < n; i++) {
            yiParts[i] = getYis({ i, ...strategy })
        }


        expect(yiParts).toEqual(expectedYiParts)
    })

    it('should yield an accurate delta yi for a S', () => {

        const n = 5;
        const strategy = STRATEGIES.S
        const expectedYiParts = [[0], [-1, 0], [-1], [-2, -1], [-2]]


        const yiParts: any[] = [];
        for (let i = 0; i < n; i++) {
            yiParts[i] = getYis({ i, ...strategy })
        }


        expect(yiParts).toEqual(expectedYiParts)
    })
})

describe('getDeltaYi()', () => {


    it('should yield accurate delta yis for NF', () => {

        const dataSet = [
            { x: 0, y: 1 },
            { x: 2, y: 19 },
            { x: 4, y: 125 },
            { x: 3, y: 55 },
            { x: 1, y: 5 },
            { x: 5, y: 241 },
        ];
        const zeroIndex = 0;
        const strategy = STRATEGIES.NF
        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const expectedDeltaYiParts = [1, 4, 10, 12]



        const deltaYiParts: any[] = [];
        for (let i = 0; i <= differenceSet.max_k.toNumber(); i++) {
            deltaYiParts[i] = getDeltaYi(differenceSet, { i, ...strategy }, zeroIndex).toNumber()
        }

        expect(deltaYiParts).toEqual(expectedDeltaYiParts)
    })


    it('should yield accurate delta yis for NB', () => {

        const dataSet = [
            { x: 0, y: 1 },
            { x: 2, y: 19 },
            { x: 4, y: 125 },
            { x: 3, y: 55 },
            { x: 1, y: 5 },
            { x: 5, y: 241 },
        ];

        const n = dataSet.length;
        const zeroIndex = n - 1;
        const strategy = STRATEGIES.NB
        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const expectedDeltaYiParts = [241, 116, 46, 12]



        const deltaYiParts: any[] = [];
        for (let i = 0; i <= differenceSet.max_k.toNumber(); i++) {
            deltaYiParts[i] = getDeltaYi(differenceSet, { i, ...strategy }, zeroIndex).toNumber()
        }

        expect(deltaYiParts).toEqual(expectedDeltaYiParts)
    })


    it('should yield accurate delta yis for GF', () => {

        const dataSet = [
            { x: 0, y: 1 },
            { x: 2, y: 19 },
            { x: 4, y: 125 },
            { x: 3, y: 55 },
            { x: 1, y: 5 },
            { x: 5, y: 241 },
        ];

        const n = dataSet.length;
        const zeroIndex = Math.floor(n / 2);
        const strategy = STRATEGIES.GF
        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const expectedDeltaYiParts = [55, 70, 34, 12]



        const deltaYiParts: any[] = [];
        for (let i = 0; i <= differenceSet.max_k.toNumber(); i++) {
            deltaYiParts[i] = getDeltaYi(differenceSet, { i, ...strategy }, zeroIndex).toNumber()
        }

        expect(deltaYiParts).toEqual(expectedDeltaYiParts)
    })

    it('should yield accurate delta yis for GB', () => {

        const dataSet = [
            { x: 0, y: 1 },
            { x: 2, y: 19 },
            { x: 4, y: 125 },
            { x: 3, y: 55 },
            { x: 1, y: 5 },
            { x: 5, y: 241 },
        ];

        const n = dataSet.length;
        const zeroIndex = Math.floor(n / 2);
        const strategy = STRATEGIES.GB
        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const expectedDeltaYiParts = [55, 36, 34, 12]



        const deltaYiParts: any[] = [];
        for (let i = 0; i <= differenceSet.max_k.toNumber(); i++) {
            deltaYiParts[i] = getDeltaYi(differenceSet, { i, ...strategy }, zeroIndex).toNumber()
        }

        expect(deltaYiParts).toEqual(expectedDeltaYiParts)
    })

    it('should yield accurate delta yis for S', () => {

        const dataSet = [
            { x: 0, y: 1 },
            { x: 2, y: 19 },
            { x: 4, y: 125 },
            { x: 3, y: 55 },
            { x: 1, y: 5 },
            { x: 5, y: 241 },
        ];

        const n = dataSet.length;
        const zeroIndex = Math.floor(n / 2);
        const strategy = STRATEGIES.S
        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))

        const expectedDeltaYiParts = [55, (36 + 70) / 2, 34, (12 + 12) / 2]



        const deltaYiParts: any[] = [];
        for (let i = 0; i <= differenceSet.max_k.toNumber(); i++) {
            deltaYiParts[i] = getDeltaYi(differenceSet, { i, ...strategy }, zeroIndex).toNumber()
        }

        expect(deltaYiParts).toEqual(expectedDeltaYiParts)
    })
})