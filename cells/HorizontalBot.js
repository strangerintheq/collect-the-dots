class HorizontalBot extends Cell {
    constructor(x, y, type, game) {
        super(x, y, type, game);
    }

    initCell() {
        super.initCell();
        this.addDanger(new BotDanger([1,0]))
    }

}