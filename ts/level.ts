/// contains the current state of the level

import { GameObject } from "./engine";
import { Block } from "./objects/block";

export const unsorted: Array<GameObject> = []
// map blocks are constant and static
export const mapBlocks: Array<Block> = []
// body blocks can be interacted with
export const bodyBlocks: Array<Block> = []