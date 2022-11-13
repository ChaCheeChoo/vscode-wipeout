import * as THREE from "three";

export class World {
  scene: THREE.Scene;
  textures: { [id: number | string]: THREE.Texture };
  materials: { [id: number | string]: THREE.Material };

  private _layers: { [id: string]: number };
  private _layerIndex = 8;

  private _settings: any = {};

  constructor() {
    this.scene = new THREE.Scene();
    this.textures = {};
    this.materials = {};
    this._layers = {};
    this._settings = {};

    this.materials["_default"] = new THREE.MeshPhongMaterial({
      specular: 0x003000,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    this.materials["_defaultCollision"] = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
  }

  getLayer(name: string): number {
    if (!(name in this._layers)) {
      this._layers[name] = this._layerIndex;
      this._layerIndex++;
    }
    return this._layers[name];
  }

  getTextureByName(name: string): THREE.Texture | null {
    for (const index in this.textures) {
      const texture = this.textures[index];
      if (texture.name == name) return texture;
    }
    return null;
  }

  get layers(): { name: string; id: number }[] {
    const ret: { name: string; id: number }[] = [];
    for (const name in this._layers)
      ret.push({
        name,
        id: this._layers[name],
      });

    return ret;
  }

  get settings() {
    return this._settings;
  }
}
