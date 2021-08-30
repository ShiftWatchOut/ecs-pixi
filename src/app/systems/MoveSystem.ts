import { System } from "ecsy";
import PositionComponent from "../components/Position";
import VelocityComponent from "../components/Velocity";
import GLOBALS from "../config";

class MoveSystem extends System {
  static queries = {
    moving: {
      components: [VelocityComponent, PositionComponent],
    },
  };
  execute() {
    this.queries.moving.results.forEach((entity) => {
      const PosC = entity.getMutableComponent(PositionComponent)!;
      const VelC = entity.getComponent(VelocityComponent)!;
      PosC.x += VelC.x;
      PosC.y += VelC.y;

      if (PosC.x > GLOBALS.width) {
        PosC.x = GLOBALS.width;
      }
      if (PosC.y > GLOBALS.height) {
        PosC.y = GLOBALS.height;
      }
      if (PosC.x < 0) {
        PosC.x = 0;
      }
      if (PosC.y < 0) {
        PosC.y = 0;
      }
    });
  }
}

export default MoveSystem;
