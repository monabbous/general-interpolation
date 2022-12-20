import BigNumber from "bignumber.js";
import { describe, expect, it } from "vitest";
import { alternate } from "./alternate";


describe('alternate()', () => {
    it('should yield a value of c when i is even, otherwise it would yield 0', () => {

        const c = 5;
        const evenI = 44;
        const oddI = 763;

        const resultEven = alternate(new BigNumber(c), new BigNumber(evenI)).toNumber();
        const resultOdd = alternate(new BigNumber(c), new BigNumber(oddI)).toNumber();

        expect(resultEven).toBe(c);
        expect(resultOdd).toBe(0)
    })
})