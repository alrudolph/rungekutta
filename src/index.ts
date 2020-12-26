import { rkItr, rkValues } from './rk';

interface param1 {
    t0: number;
    tn: number;
    N: number;
}

interface param2 {
    t0: number;
    N: number;
    h: number;
}

interface param3 {
    t0: number;
    tn: number;
    h: number;
}

interface param4 {
    t: Array<number>;
}

interface result {
    step: Function;
    steps: Function;
    end: Function;
}

const rungeKutta = (
    params: param1 | param2 | param3 | param4, 
    x0: Array<number>, 
    ...funcs: Array<Function>
): result => {
    let t: Array<number>;

    if ('t' in params) {
        t = params.t
    }
    else if ('t0' in params) {
        if ('N' in params) {
            if ('tn' in params) {
                const h = (params.tn - params.t0) / params.N;
                t = Array(params.N + 1).fill(0).map((_, i) => params.t0 + h * i);
            }
            else if ('h' in params) {
                t = Array(params.N + 1).fill(0).map((_, i) => params.t0 + params.h * i);
            }
            else {
                throw "Insufficient input parameters."
            }
        }
        else if ('tn' in params && 'h' in params) {
            const n = (params.tn - params.t0) / params.h;

            // n is integer

            t = Array(n + 1).fill(0).map((_, i) => params.t0 + i * params.h);
        }
        else {
            throw "Insufficient input parameters."
        }
    }
    else {
        throw "Insufficient input parameters."
    }

    const itr = rkItr(t, x0, ...funcs);

    return {
        step: () => rkValues(itr, 1),
        steps: (n:number) => rkValues(itr, n),
        end: () => { 
            const output = rkValues(itr, t.length); 
            return output.slice(output.length - 1);
        }
    }
}

export default rungeKutta;
