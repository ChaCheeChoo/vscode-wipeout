import { BufferRange } from "../../../core/range";
import { VexxNode } from "../node";
import { Vexx4NodeType } from "./type";
import { Flat } from "../flat";
import { mat4 } from "gl-matrix";

export class VexxNodeShipMuzzle extends VexxNode {
  matrix = mat4.create();

  constructor() {
    super(Vexx4NodeType.SHIP_MUZZLE);
  }

  load(data: BufferRange) : void  {
    if (data.size == 64) this.matrix = data.getFloat32Array(0, 16);
  }

  export(): Flat.Node {
    return {
      type: "SHIP_MUZZLE",
      name: this.name,
      matrix: Array.from(this.matrix)
    }
  }
}
