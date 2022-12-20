import { describe, expect, it } from "vitest";
import { dataSetToBigNumber, differenceSetToNumber } from "./convert";
import { generateDifferenceSet } from "./generateDifferenceSet";



describe('generateDifferenceSet()', () => {

    it('should generate a difference set of n=5, h=2 from an unordered set', () => {
        const dataSet = [
            { x: 0, y: 5 },
            { x: 6, y: 77 },
            { x: 4, y: 37 },
            { x: 8, y: 133 },
            { x: 2, y: 13 },
        ];

        const expectedDifferenceSet = {
            h: 2,
            n: 5,
            max_k: 2,
            0: { x: 0, delta_0: 5, delta_1: 8, delta_2: 16, max_k: 2 },
            1: { x: 2, delta_0: 13, delta_1: 24, delta_2: 16, max_k: 2 },
            2: { x: 4, delta_0: 37, delta_1: 40, delta_2: 16, max_k: 2 },
            3: { x: 6, delta_0: 77, delta_1: 56, max_k: 1 },
            4: { x: 8, delta_0: 133, max_k: 0 },
        }

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))
        const numberDifferenceSet = differenceSetToNumber(differenceSet);

        expect(numberDifferenceSet).toEqual(expectedDifferenceSet)

    })

    it('should generate a difference set of n=6, h=1 from an unordered set', () => {
        const dataSet = [
            { x: 0, y: 1 },
            { x: 2, y: 19 },
            { x: 4, y: 125 },
            { x: 3, y: 55 },
            { x: 1, y: 5 },
            { x: 5, y: 241 },
        ];

        const expectedDifferenceSet = {
            h: 1,
            n: 6,
            max_k: 3,
            0: { x: 0, delta_0: 1, delta_1: 4, delta_2: 10, delta_3: 12, max_k: 3 },
            1: { x: 1, delta_0: 5, delta_1: 14, delta_2: 22, delta_3: 12, max_k: 3 },
            2: { x: 2, delta_0: 19, delta_1: 36, delta_2: 34, delta_3: 12, max_k: 3 },
            3: { x: 3, delta_0: 55, delta_1: 70, delta_2: 46, max_k: 2 },
            4: { x: 4, delta_0: 125, delta_1: 116, max_k: 1 },
            5: { x: 5, delta_0: 241, max_k: 0 },
        }

        const differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet))
        const numberDifferenceSet = differenceSetToNumber(differenceSet);

        expect(numberDifferenceSet).toEqual(expectedDifferenceSet)

    })
})