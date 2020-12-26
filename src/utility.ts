// adds arrays element wise by multiplying seocnd arrary by fctr
export const combine = (
    arr1: Array<number>, 
    arr2: Array<number>, 
    fctr: number
): Array<number> => {
    if (arr1.length !== arr2.length) {
        throw "Arrays need to be same length.";
    }

    return arr1.map((value, i) => {
        return value + fctr * arr2[i];
    })
}

// calculates x_{n+1} - x_{n}
const delta = (
    h: number, 
    k: Array<number>
): number => {
    if (k.length !== 4) {
        throw 'k array needs to be of length 4.'
    }

    return h/6 * (k[0] + 2*k[1] + 2*k[2] + k[3]);
}

// gets x_{n+1} from x_{n}
export const getNext = (
    xn: Array<number>, 
    h: number, 
    k: Array<Array<number>>
): Array<number> => {
    return xn.map((x, i) => {
        return x + delta(h, k.map(ks => ks[i]));
    });
}
