import { Bodies, Body, Vector } from "matter-js";
import { GameObject } from "../engine";

// a block is a simple component of the map, and it's simply a rectengle
export class Block extends GameObject {
    color: string
    width: number
    height: number
    isMapBlock: boolean

    constructor(loc: Vector, width: number, height: number, id: BigInt, isMapBlock = true) {
        super(loc, id)

        this.width = width
        this.height = height
        this.isMapBlock = isMapBlock

        if (isMapBlock) {
            this.color = '#444'
        } else {
            this.color = '#8c8c8cd9'
        }
    }

    createBody(loc: Vector): Body {
        return Bodies.rectangle(loc.x + this.width / 2, loc.y + this.height / 2, this.width, this.height, { isStatic: this.isMapBlock })
    }
}