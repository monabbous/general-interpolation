import { describe, expect, it } from "vitest";
import { STRATEGIES } from "../consts";
import { getKProdSub } from "./getKProdSub";


describe('getKProdSub()', () => {

    it('should get correct c value in p - C() for Newton\'s Forward interpolation', () => {

        const n = 8
        const strategy = STRATEGIES.NF
        const expectedProds = [
            [],
            [0],
            [0, 1],
            [0, 1, 2],
            [0, 1, 2, 3],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4, 5],
            [0, 1, 2, 3, 4, 5, 6],
        ]


        let pProds: number[][] = [];
        for (let i = 0; i < n; i++) {
            pProds[i] = [];
            for (let k = 0; k < i; k++) {
                pProds[i].push(getKProdSub({ k, i, ...strategy }).toNumber())
            }
        }

        expect(pProds).toEqual(expectedProds)
    })

    it('should get correct c value in p - C() for Newton\'s Backward interpolation', () => {

        const n = 8
        const strategy = STRATEGIES.NB
        const expectedProds = [
            [],
            [-0],
            [-0, -1],
            [-0, -1, -2],
            [-0, -1, -2, -3],
            [-0, -1, -2, -3, -4],
            [-0, -1, -2, -3, -4, -5],
            [-0, -1, -2, -3, -4, -5, -6],
        ]


        let pProds: number[][] = [];
        for (let i = 0; i < n; i++) {
            pProds[i] = [];
            for (let k = 0; k < i; k++) {
                pProds[i].push(getKProdSub({ k, i, ...strategy }).toNumber())
            }
        }

        expect(pProds).toEqual(expectedProds)
    })

    it('should get correct c value in p - C() for Gauss\'s Forward interpolation', () => {

        const n = 8
        const strategy = STRATEGIES.GF
        const expectedProds = [
            [],
            [-0],
            [-0, 1],
            [-0, 1, -1],
            [-0, 1, -1, 2],
            [-0, 1, -1, 2, -2],
            [-0, 1, -1, 2, -2, 3],
            [-0, 1, -1, 2, -2, 3, -3],
        ]


        let pProds: number[][] = [];
        for (let i = 0; i < n; i++) {
            pProds[i] = [];
            for (let k = 0; k < i; k++) {
                pProds[i].push(getKProdSub({ k, i, ...strategy }).toNumber())
            }
        }




        expect(pProds).toEqual(expectedProds)
    })

    it('should get correct c value in p - C() for Gauss\'s Backward interpolation', () => {

        const n = 8
        const strategy = STRATEGIES.GB
        const expectedProds = [
            [],
            [0],
            [0, -1],
            [0, -1, 1],
            [0, -1, 1, -2],
            [0, -1, 1, -2, 2],
            [0, -1, 1, -2, 2, -3],
            [0, -1, 1, -2, 2, -3, 3],
        ]


        let pProds: number[][] = [];
        for (let i = 0; i < n; i++) {
            pProds[i] = [];
            for (let k = 0; k < i; k++) {
                pProds[i].push(getKProdSub({ k, i, ...strategy }).toNumber())
            }
        }




        expect(pProds).toEqual(expectedProds)
    })

    it('should get correct c value in p - C() for Sterlings interpolation', () => {

        const n = 8
        const strategy = STRATEGIES.S
        const expectedProds = [
            [],
            [-0],
            [-0, 0],
            [-0, 1, -1],
            [-0, 0, -1, 1],
            [-0, 1, -1, 2, -2],
            [-0, 0, -1, 1, -2, 2],
            [-0, 1, -1, 2, -2, 3, -3],
        ]


        let pProds: number[][] = [];
        for (let i = 0; i < n; i++) {
            pProds[i] = [];
            for (let k = 0; k < i; k++) {
                pProds[i].push(getKProdSub({ k, i, ...strategy }).toNumber())
            }
        }




        expect(pProds).toEqual(expectedProds)
    })
})