
class KeyboardControls {
    constructor(game) {
        addEventListener('click', e => game.move());
        addEventListener('keydown', e => {
            game.move();
            e.keyCode === 65 && game.move(0, -1);
            e.keyCode === 68 && game.move(0, 1);
            e.keyCode === 87 && game.move(-1, 0);
            e.keyCode === 83 && game.move(1, 0);
        });
    }
}