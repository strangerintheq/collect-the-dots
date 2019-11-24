class TouchControls {
    constructor(game) {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            game.move();
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown )
                return;
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
                game.move(0,-Math.sign(xDiff));
            else
                game.move(-Math.sign(yDiff), 0);
            xDown = null;
            yDown = null;
            evt.preventDefault()
        }
    }
}