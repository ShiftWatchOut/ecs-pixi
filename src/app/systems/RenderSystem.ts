import { System } from "ecsy";
import pixiApp from "../singletons/pixi";

class RenderSystem extends System {
  pixiApp: any;
  init() {
    this.pixiApp = pixiApp;
  }
  execute() {}
}

export default RenderSystem;
