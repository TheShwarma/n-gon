import { Engine } from "matter-js";
import { canvas, ctx } from "./clientMain";
import { engine } from "./engine";
import { unsorted } from "./level";

export function loop() {
    // loop is called every game tick
    Engine.update(engine, simulationInterval)
    for (let i = 0; i < unsorted.length; i++) {
        const element = unsorted[i];
        element.render()
    }
}

function wipe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCursor() {
    const size = 10;
    ctx.beginPath();
    ctx.moveTo(mouse.x - size, mouse.y);
    ctx.lineTo(mouse.x + size, mouse.y);
    ctx.moveTo(mouse.x, mouse.y - size);
    ctx.lineTo(mouse.x, mouse.y + size);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000"; //'rgba(0,0,0,0.4)'
    ctx.stroke(); // Draw it
}

// --- gameplay varibales ---
// holds mutable state for the simulation, as mutable variables cannot be exported.
export const state = {
    paused: false,
    lastFrame: Date.now(),
    cycle: 0
}

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

export const mouseInGame = {
    x: 0,
    y: 0
}

export const fpsInterval = 1000 / 60
export const simulationInterval = 1000 / 60

