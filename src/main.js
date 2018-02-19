import game from '/src/game.js';

let lastTime = 0;
const tick = time => {
    lastTime = time;

    game.tick(time - lastTime);

    window.requestAnimationFrame(tick);
};


window.requestAnimationFrame(tick);

