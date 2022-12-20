import BigNumber from "bignumber.js";
import { describe, expect, it } from "vitest";
import { STRATEGIES } from "./consts";
import { generalInterpolation, lagrangeInterpolation } from "./interpolations";
import { dataSetToBigNumber } from "./utils/convert";
import { generateDifferenceSet } from "./utils/generateDifferenceSet";



describe('generalInterpolation()', () => {

    it('should get an accurate interpolation for NF', () => {
        const xBar = 1895;
        const expected = 54.8528;
        const zeroIndex = 0;
        const strategy = STRATEGIES.NF;
        const rounding = 4;

        const dataSet = [
            { "x": 1891, "y": 46 },
            { "x": 1901, "y": 66 },
            { "x": 1911, "y": 81 },
            { "x": 1921, "y": 93 },
            { "x": 1931, "y": 101 },
        ]


        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet));

        const interpolation = generalInterpolation(BigNumber(xBar), differenceSet, zeroIndex, strategy)

        expect(interpolation.toNumber().toFixed(rounding)).toEqual(expected.toFixed(rounding))
    })


    it('should get an accurate interpolation for NB', () => {
        const xBar = 1925;
        const expected = 96.8368;
        const zeroIndex = 4;
        const rounding = 5;

        const strategy = STRATEGIES.NB;
        const dataSet = [
            { "x": 1891, "y": 46 },
            { "x": 1901, "y": 66 },
            { "x": 1911, "y": 81 },
            { "x": 1921, "y": 93 },
            { "x": 1931, "y": 101 },
        ]


        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet));

        const interpolation = generalInterpolation(BigNumber(xBar), differenceSet, zeroIndex, strategy)

        expect(interpolation.toNumber().toFixed(rounding)).toEqual(expected.toFixed(rounding))
    })

    it('should get an accurate interpolation for GF', () => {
        const xBar = 3.5;
        const expected = 0.375;
        const zeroIndex = 2;
        const rounding = 3;

        const strategy = STRATEGIES.GF;
        const dataSet = [
            { "x": 1, "y": 1 },
            { "x": 2, "y": -1 },
            { "x": 3, "y": 1 },
            { "x": 4, "y": -1 },
            { "x": 5, "y": 1 },
        ];


        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet));

        const interpolation = generalInterpolation(BigNumber(xBar), differenceSet, zeroIndex, strategy)

        expect(interpolation.toNumber().toFixed(rounding)).toEqual(expected.toFixed(rounding))
    })

    it('should get an accurate interpolation for GB', () => {
        const xBar = 1976;
        const expected = 34.43437;
        const zeroIndex = 3;
        const rounding = 5;

        const strategy = STRATEGIES.GB;
        const dataSet = [
            { "x": 1940, "y": 17 },
            { "x": 1950, "y": 20 },
            { "x": 1960, "y": 27 },
            { "x": 1970, "y": 32 },
            { "x": 1980, "y": 36 },
            { "x": 1990, "y": 38 },
        ]


        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet));

        const interpolation = generalInterpolation(BigNumber(xBar), differenceSet, zeroIndex, strategy)

        expect(interpolation.toNumber().toFixed(rounding)).toEqual(expected.toFixed(rounding))
    })

    it('should get an accurate interpolation for S', () => {
        const xBar = 28;
        const expected = 47691.8256;
        const zeroIndex = 2;
        const rounding = 4;

        const strategy = STRATEGIES.S;
        const dataSet = [
            { "x": 20, "y": 49225 },
            { "x": 25, "y": 48316 },
            { "x": 30, "y": 47236 },
            { "x": 35, "y": 45926 },
            { "x": 40, "y": 44306 },
        ]


        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet));

        const interpolation = generalInterpolation(BigNumber(xBar), differenceSet, zeroIndex, strategy)

        expect(interpolation.toNumber().toFixed(rounding)).toEqual(expected.toFixed(rounding))
    })
})


describe('lagrangeInterpolation()', () => {

    it('should get an accurate interpolation for L', () => {
        const xBar = 301;
        const expected = 2.4786;
        const rounding = 4;

        const dataSet = [
            { "x": 300, "y": 2.4771 },
            { "x": 304, "y": 2.4829 },
            { "x": 305, "y": 2.4843 },
            { "x": 307, "y": 2.4871 },
        ]

        const interpolation = lagrangeInterpolation(BigNumber(xBar), dataSetToBigNumber(dataSet));

        expect(interpolation.toNumber().toFixed(rounding)).toEqual(expected.toFixed(rounding))
    })
})
