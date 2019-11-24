class HorizontalBot extends Cell {
    constructor(x, y, type, game) {
        super(x, y, type, game);
        this.addDanger(new BotDanger())
    }

}