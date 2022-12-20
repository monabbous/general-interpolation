<script lang="ts">
    import {
        interpolate,
        type DifferenceSet,
        type NumberDataSet,
    } from "../lib/general-interpolation";
    import { STRATEGIES } from "../lib/general-interpolation/consts";
    import { dataSetToBigNumber } from "../lib/general-interpolation/utils/convert";
    import { displayDifferenceSet } from "../lib/general-interpolation/utils/displayDifferenceSet";
    import { generateDifferenceSet } from "../lib/general-interpolation/utils/generateDifferenceSet";
    import { getYis } from "../lib/general-interpolation/utils/getDeltaYSum";

    let xBar: number = 16.1;

    // let dataSet = [{ x: undefined, y: undefined }];
    let dataSet = [
        { x: 15, y: 17.609 },
        { x: 16, y: 20.412 },
        { x: 17, y: 23.045 },
        { x: 18, y: 25.527 },
        { x: 19, y: 27.875 },
        { x: undefined, y: undefined },
    ];

    $: differenceSet = generateDifferenceSet(dataSetToBigNumber(dataSet));

    $: displaySet = displayDifferenceSet(differenceSet);

    $: deltaHeaders = new Array(Math.max(0, +differenceSet.max_k - 1)).fill(0);

    $: interpolation = interpolate({
        xBar,
        dataSet: dataSet.filter((d) => !isNaN(d.x) && !isNaN(d.y)),
    });

    $: yis =
        interpolation.strategy && interpolation.strategy !== "L"
            ? new Array(Math.max(0, +differenceSet.max_k - 1))
                  .fill(0)
                  .map((_, i) =>
                      getYis({
                          i: i + 1,
                          ...STRATEGIES[interpolation.strategy],
                      }).map((yi) => yi + interpolation.index)
                  )
            : [];

    const getDisplaySetColumns = (row: Partial<DifferenceSet[number]>) => {
        console.log(yis);

        const cols: (number | "")[] = [];
        for (let i = 1; i < +differenceSet.max_k; i++) {
            cols.push(row[`delta_${i}`]?.toNumber() || "");
        }
        return cols;
    };

    const handleKeypress = (event) => {
        const [, _i, p] = /(\d+)_(\w)/.exec(event.target.name);
        const index = +_i;
        const lastRow = dataSet[dataSet.length - 1];
        const currentRow = dataSet[index];

        if (dataSet.length > 1) {
            if (
                isNaN(currentRow?.x) &&
                isNaN(currentRow?.y) &&
                ["Backspace", "Delete"].includes(event.key)
            ) {
                if (
                    index === dataSet.length - 1 &&
                    (!isNaN(lastRow.x) || !isNaN(lastRow.y))
                )
                    return;

                dataSet.splice(index, 1);
                dataSet = [...dataSet];
                event.preventDefault();
            }
        }
    };
    const handleInput = (event) => {
        const [, _i, p] = /(\d+)_(\w)/.exec(event.target.name);

        const index = +_i;
        const value = event.target.value ? +event.target.value : undefined;
        const lastRow = dataSet[dataSet.length - 1];
        dataSet[index] ??= { x: undefined, y: undefined };
        dataSet[index][p] = value;

        if (!isNaN(lastRow.x) || !isNaN(lastRow.y)) {
            dataSet.push({ x: undefined, y: undefined });
        }
    };

    const Formulas = {
        NF: "Newton's Forward Interpolation",
        NB: "Newton's Backward Interpolation",
        GF: "Gauss's Forward Interpolation",
        GB: "Gauss's Backward Interpolation",
        S: "Sterling's",
        L: "L'rrange",
    };
</script>

<main class="main">
    <header class="main__header section">
        <h1>Interpolation</h1>
        <h5>By Mohamed Nabous</h5>
    </header>
    <section class="section">
        <table>
            <tbody>
                <tr>
                    <td style="text-align: end;"><span>X:</span></td>
                    <td
                        style="text-align: start; padding-inline-start: 0 !important"
                        ><input
                            style="text-align: start; width: 100%"
                            type="number"
                            bind:value={xBar}
                            placeholder="0"
                        />
                    </td>
                </tr>
                <tr />
                <tr />
                <tr />
                <tr>
                    <td colspan={2}
                        ><button
                            on:click={() => {
                                xBar = null;
                                dataSet = [{ x: undefined, y: undefined }];
                            }}>Reset</button
                        ></td
                    >
                </tr>
            </tbody>
        </table>
        <br />
        <table>
            <thead>
                <tr>
                    <td>
                        <span>i</span>
                    </td>
                    <td>
                        <span>x</span>
                    </td>
                    <td>
                        <span>y</span>
                    </td>
                    {#if interpolation.strategy !== "L"}
                        {#each deltaHeaders as _, delta}
                            <td>
                                <span>&Delta;<sup>{delta + 1}</sup>y</span>
                            </td>
                        {/each}
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#each displaySet as row, i}
                    <tr
                        class={`${
                            Math.floor(i / 2) === interpolation.index
                                ? "active"
                                : ""
                        }`}
                    >
                        {#if (i + 1) % 2}
                            <td>
                                <span>{Math.floor(i / 2)}</span>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="0"
                                    name={`${Math.floor(i / 2)}_x`}
                                    on:input={handleInput}
                                    on:keydown={handleKeypress}
                                    on:blur={() =>
                                        (dataSet = dataSet.sort(
                                            (a, b) => +a.x - +b.x
                                        ))}
                                    value={dataSet[Math.floor(i / 2)].x ||
                                        undefined}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="0"
                                    name={`${Math.floor(i / 2)}_y`}
                                    on:input={handleInput}
                                    on:keydown={handleKeypress}
                                    on:blur={() =>
                                        (dataSet = dataSet.sort(
                                            (a, b) => +a.x - +b.x
                                        ))}
                                    value={dataSet[Math.floor(i / 2)].y ||
                                        undefined}
                                />
                            </td>
                        {:else}
                            <td />
                            <td />
                            <td />
                        {/if}

                        {#if interpolation.strategy !== "L"}
                            {#each getDisplaySetColumns(row) as delta, j}
                                <td
                                    class={`${
                                        yis[j]?.includes((i - j - 1) / 2)
                                            ? "active"
                                            : ""
                                    }`}
                                    ><span
                                        >{delta?.toLocaleString("fullwide", {
                                            maximumFractionDigits: 18,
                                        }) || ""}</span
                                    ></td
                                >
                            {/each}
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
        <br />
        <table>
            <tbody>
                <tr>
                    <td style="text-align: end; width: 5em"
                        ><span>Formula:</span></td
                    >
                    <td style="text-align: start;">
                        <span style="text-align: start; width: 100%"
                            >{Formulas[interpolation.strategy] || " "}</span
                        >
                    </td>
                </tr>
                <tr>
                    <td style="text-align: end; width: 5em"><h3>f(x) =</h3></td>
                    <td style="text-align: start;">
                        <h3 style="text-align: start; width: 100%">
                            <b
                                >{interpolation.value?.toLocaleString(
                                    "fullwide",
                                    {
                                        maximumFractionDigits: 18,
                                    }
                                )}</b
                            >
                        </h3>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</main>

<style lang="scss">
    .main {
        padding: clamp(0.25em, 1vw, 1em);
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-size: 13px;

        &__header {
            font-size: 1.5em;
            letter-spacing: 0.2em;
            text-align: center;
        }
    }

    .section {
        max-width: 1020px;
        width: 100%;
        margin: 0 auto;
    }

    table {
        /* width: 100%; */
        background: rgba(0 0 0 / 0.1);
        padding: 1em;
        min-width: 50%;
        margin: auto;

        td {
            text-align: center;
            vertical-align: bottom;
            font-family: monospace;
            font-size: 1.25em;

            &:not(:has(input)),
            input {
                padding: 0.5em;
            }
        }

        thead tr {
            background: rgba(0 0 0 / 0.1);
            font-size: 1.25em;
            td {
                padding: 0.5em;
            }
        }

        tbody tr td:has(:not(span:empty)) {
            background: rgba(255 255 255 / 0.1);
            border-radius: 10px;
        }

        tbody tr td:has(span:empty) {
            height: 2em;
        }

        td > * {
            min-width: 8em;
            height: 100%;
        }

        td input {
            border: 0;
            font-size: inherit;
            background: none;
            text-align: center;
            min-width: unset;
            text-decoration: underline rgb(144 238 144 / 0.5) 2px;
            border-radius: inherit;
            font-weight: bold;
        }
    }

    tr.active td:not(:empty):is(:nth-child(1), :nth-child(2), :nth-child(3)),
    td.active:not(:empty) {
        background-color: hsl(0 79% 72% / 0.3) !important;
    }

    button {
        background: rgba(0 0 0 / 0.15);
        border: white 1px solid;
        padding: 0.5em;
        cursor: pointer;
        border-radius: 0.5em;
    }
</style>
