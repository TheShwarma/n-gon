import { engine } from './engine'
import { fpsInterval, state, loop } from './simulation'

export var canvas: HTMLCanvasElement
export var ctx   : CanvasRenderingContext2D

window.onload = () => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement
    ctx    = canvas.getContext("2d")
}

// hack to glue start game to window
(window as any).startGame = () => {
    requestAnimationFrame(cycle)
}

function cycle() {
    if (!state.paused) requestAnimationFrame(cycle);
    const now = Date.now();
    const elapsed = now - state.lastFrame; // calc elapsed time since last loop
    if (elapsed > fpsInterval) { // if enough time has elapsed, draw the next frame
        state.lastFrame = now - (elapsed % fpsInterval); // Get ready for next frame by setting then=now.   Also, adjust for fpsInterval not being multiple of 16.67

        state.cycle++; //tracks game cycles

        loop();
    }
}
