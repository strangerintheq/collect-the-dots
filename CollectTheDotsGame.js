class CollectTheDotsGame {
    constructor() {
        this.coins = 0;
        this.levelIndex = 0;
        this.renderer = new CanvasRenderer();
        this.player = new Player();

        new KeyboardControls(this);
        new TouchControls(this);

        this.startLevel();
//this.gameInProgress = true
        addEventListener('resize', e => {
            this.renderer.resizeRenderer();
            this.renderer.updateStaticImage(this.level);
        });

        setInterval(this.gameLogic.bind(this),30);
        this.gameLogic();
        this.drawFrame();
    }

    gameLogic() {
        let t = Date.now();
        this.level.iterateCells(c => c.tick(t));
        let cx = this.player.logicPosition[0];
        let cy = this.player.logicPosition[1];
        this.level.map[cy][cx].activate(t);
        if (this.player.death) {
            let dt = t - this.player.death;
            if(dt>300)
                this.player.enterToLevel(this.level);
        }
    }

    drawFrame() {
        requestAnimationFrame(this.drawFrame.bind(this));
        if (!this.gameInProgress)
            return this.renderer.renderLevelGui(this.levelIndex);
        this.renderer.menuDrawStartTimestamp = null;
        this.player.calcPlayerPosition(Date.now())
        this.renderer.drawFrame(this.player, this.level);
        this.renderer.renderGui(this.coins, this.player.keys)
    }

    startLevel(){
        this.level = new Level(maps[this.levelIndex], this);
        this.renderer.updateStaticImage(this.level);
        this.player.enterToLevel(this.level);
    }

    nextLevel() {
        this.levelIndex++;
        if (this.levelIndex === maps.length)
            this.levelIndex = 0;
        this.startLevel();
    }

    move(x, y) {
        if (this.gameInProgress){
            if (isFinite(x+y))
                this.player.move(x, y);
            return
        }
        this.gameInProgress = true;
        if (!this.audio)
            this.audio = new Audio();
        this.audio.context.resume();
    }
}

new CollectTheDotsGame();