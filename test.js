//const rungeKutta = require('./dist/bundle')

import * as rungeKutta from 'rungeKutta'

const rk = rungeKutta({ t: [0, 0.5, 1, 1.5, 2] }, [0.5], (t, x) => {
    return x - t*t + 1;
});
console.log(rk.step());
console.log(rk.steps(3));
console.log(rk.end());