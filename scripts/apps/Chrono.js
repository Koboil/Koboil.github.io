let sec = 0;
let min = 0;
let hrs = 0;

export default class Chrono
{
    constructor({ node }) {
		this.node = node;

		this.screen = node.querySelector('[data-chrono-screen]');

		this.reset = node.querySelector('[data-chrono-reset]');
		this.start = node.querySelector('[data-chrono-start]');
		this.stop = node.querySelector('[data-chrono-stop]');
		
		// add mouse event listeners
		this.reset.addEventListener('click', this.onReset.bind(this));
		this.start.addEventListener('click', this.onStart.bind(this));
		this.stop.addEventListener('click', this.onStop.bind(this));

	}

    add() {
        tick();
        this.screen.textContent = 
            (hrs > 9 ? hrs : "0" + hrs) 
            + ":" + (min > 9 ? min : "0" + min)
            + ":" + (sec > 9 ? sec : "0" + sec);
        timer();
    }

    tick(){
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                hrs++;
            }
        }
    }

    timer() {
        t = setTimeout(this.add(), 1000);
    }
    
    onStart()
    {
        timer();
        this.disableButton(startB);
        this.enableButton(stopB);
        this.enableButton(resetB);
    }

    onStop()
    {
        this.clearTimeout(t);
        this.enableButton(startB);
        this.disableButton(stopB);
    }

    onReset()
    {
        this.screen.textContent = "00:00:00";
        this.sec = 0; 
        this.min = 0; 
        this.hrs = 0;
        this.clearTimeout(t);
        this.enableButton(startB);
        this.disableButton(resetB);
        this.disableButton(stopB);
    }

    disableButton(btn)
    {
        btn.disabled = true; 
    }


    enableButton(btn)
    {
        btn.disabled = false; 
    }
    
}