class Audio {
    constructor(){
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
        this.context.resume();

    }

    coin() {

        let gain = this.context.createGain();
        gain.connect(this.context.destination);
        gain.gain.value = 0.1
        let oscillator = this.context.createOscillator();
        oscillator.type="sine";
        oscillator.connect(gain);
        oscillator.frequency.value=830;
        oscillator.start();
        oscillator.stop(this.context.currentTime + 0.01);


    }
}