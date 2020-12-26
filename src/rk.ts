import { combine, getNext } from './utility';

export interface output {
    t: number;
    xn: Array<number>;
}

export function* rkItr (
    ts: Array<number>,
    x0: Array<number>,
    ...funcs: Array<Function>
): Generator<output, output, boolean> {
    if (x0.length !== funcs.length) {
        throw "There needs to be the same number of initial values as number of functions."
    }

    const ORDER = funcs.length;
    let xn = x0;

    yield {
        t: ts[0],
        xn: x0
    }

    for (let n = 1; n < ts.length; ++n) {
        const h = ts[n] - ts[n - 1];
        const t = ts[n - 1];
        const k = [Array(ORDER), Array(ORDER), Array(ORDER), Array(ORDER)];

        // k1
        for (let o = 0; o < ORDER; ++o) {
            k[0][o] = funcs[o](t, ...xn);
        }

        // k2
        for (let o = 0; o < ORDER; ++o) {
            k[1][o] = funcs[o](t + h/2, ...combine(xn, k[0], h/2));
        }

        // k3
        for (let o = 0; o < ORDER; ++o) {
            k[2][o] = funcs[o](t + h/2, ...combine(xn, k[1], h/2));
        }

        // k4
        for (let o = 0; o < ORDER; ++o) {
            k[3][o] = funcs[o](t + h, ...combine(xn, k[2], h));
        }

        xn = getNext(xn, h, k);

        yield {
            t: ts[n],
            xn
        };
    }

    return {
        t: ts[ts.length - 1],
        xn
    };
}

export const rkValues = (
    itr: Generator<output, output, boolean>,
    num: number
): Array<output>  => {
    let n: IteratorResult<output, output>;
    let output: Array<output> = []
    
    for (let i = 0; i < num && !(n = itr.next()).done; ++i) {
        output = [...output, n.value];
    }
    return output;
}
