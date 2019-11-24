class Coin extends Cell {
    constructor(x, y, type, game) {
        super(x, y, type, game, '#ffe15a', 0.3);
        this.active = true;
    }

    activate(t) {
        super.activate(t);
        if (!this.active)
            return;
        this.activatedAt = t||Date.now();
        this.active = false;
        this.game.coins++;
    }

    tick(t) {
        super.tick(t);
        if (!this.activatedAt)
            return;
        let dt = t - this.activatedAt;
        this.renderSize = 0.3-0.3*(dt )/500;


        if (dt > 0 && !this.soundPlayed) {
            this.soundPlayed = true;
            this.game.audio.coin()
        }
        if (dt>500) {
            this.activatedAt = 0;
            this.renderSize = 0;

        }
    }
}