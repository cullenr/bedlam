/**
 *  Abstraction to get input from a browser window.
 */

/**
 *  An object that represents the state of the keyboard.
 *
 *  This object is implemented as a proxy with only the get trap implemented,
 *  do not try to get a list of all the keys on the keyboard with it!
 */
export const keys = new Proxy({}, {
    get(target, name) {
        return target.hasOwnProperty(name) ? target[name] : false;
    }
});

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
