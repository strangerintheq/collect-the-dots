class BotDanger extends Danger {
    constructor() {
        super('bot_');
    }

    renderDanger(renderer, context,x,y) {
        renderer.drawRect(x, y, 0.2, 'red', context);
    }
}