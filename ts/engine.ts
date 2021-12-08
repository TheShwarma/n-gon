import { Engine, Vector, Body, World, Composite } from 'matter-js'
import { ctx } from './clientMain'

import { unsorted } from './level'

export const cat = {
    player: 0x1,
    map: 0x10,
    body: 0x100,
    bullet: 0x1000,
    powerUp: 0x10000,
    mob: 0x100000,
    mobBullet: 0x1000000,
    mobShield: 0x10000000,
    phased: 0x100000000,
}

enum Team {
    Mob,
    ControlledMob, // will probably not be used soon
    // players:
    Red, Green, Blue,
    Orange, Yellow, Black,
    Purple, LightBlue, Gray

}

/// Every object in the game contains a Matter.js object and other, various properties
export abstract class GameObject {

    body: Body // a Matter.JS body
    id: BigInt // a unique ID is associated with each game object

    abstract color: string | null // must be a hex string. Supply null if you also bypass the default renderer

    // the place where the object will be stored
    container: Array<GameObject> = unsorted

    constructor(loc: Vector, id: BigInt) {
        this.id = id

        // push this instance. First try and find an empty slot
        let emptyPlaceFound = false
        for (let i = 0; i < this.container.length; i++) {
            const element = this.container[i]
            if (element === null) {
                // check for an empty slot, and insert it
                this.container[i] = this
                emptyPlaceFound = true
                break
            }
        }
        // no empty place was found, grow the array
        if (!emptyPlaceFound) {
            this.container.push(this)
        }

        // finally, add the Matter.JS body
        World.addBody(world, this.body)
    }

    remove() {
        this.container.splice(this.container.indexOf(this), 1)
        Composite.remove(world, this.body)
    }

    render() {
        /// default renderer for game objects. You can override it for each custom object, if needed.
        const vertices = this.body.vertices
        ctx.beginPath()
        // jump to the first vertex
        ctx.moveTo(vertices[0].x, vertices[0].y)
        for (let i = 1; i < vertices.length; i++) {
            const vertex = vertices[i]
            // line for each following vertex
            ctx.lineTo(vertex.x, vertex.y)
        }
        // line to the first vertex to form a complete polygon
        ctx.lineTo(vertices[0].x, vertices[0].y)

        ctx.fillStyle   = this.color
        ctx.strokeStyle = '#000'
        // waiting for the day where I can supply a simple number in the form of 0x0 instead
        // of having to parse a hex string **each and every render**.
        ctx.fill()
        ctx.stroke()
    }
}

export abstract class Entity extends GameObject {
    /// when health goes under 0, the simulation engine will remove the mob from the game
    health: number
    /// "Team" is a classification controlling much of the entity's behavior.
    /// for players, team-friendly fire is disabled. For mobs, it simply provides
    /// a different damage group
    team: Team

    constructor(loc: Vector, id: BigInt, team: Team, health: number) {
        super(loc, id)
        this.team = team
        this.health = health
    }
    
    /// each entity must have an action method
    abstract do(): void
}

export const engine = Engine.create()
export const world = engine.world