import { Not, System } from "ecsy";
import BounceComponent from "../components/Bouncing";
import InputComponent from "../components/Input";
import PositionComponent from "../components/Position";
import VelocityComponent, { ReverseComponent } from "../components/Velocity";
import VolumeComponent from "../components/Volume";
import GLOBALS from "../config";
import { between, contains, getVertexes, IPoint, ISize } from "../util";

const { interactWith, boardVelocity } = GLOBALS;

class VelocitySystem extends System {
  static queries = {
    inputAndVelocity: {
      components: [InputComponent, VelocityComponent],
    },
    bounce: {
      components: [VelocityComponent, BounceComponent]
    },
    hitbox: {
      components: [VolumeComponent, VelocityComponent, Not(BounceComponent)]
    }
  };
  execute() {
    this.queries.inputAndVelocity.results.forEach((entity) => {
      const inputC = entity.getComponent(InputComponent);
      const VelocityC = entity.getMutableComponent(VelocityComponent);
      if ([interactWith.w, interactWith.arrowup].includes(inputC?.key)) {
        VelocityC!.y = -boardVelocity;
      } else if (
        [interactWith.s, interactWith.arrowdown].includes(inputC?.key)
      ) {
        VelocityC!.y = +boardVelocity;
      } else {
        VelocityC!.y = 0;
      }
    });
    const hitboxs: Array<{ info: IPoint & ISize, velocity: number }> = [];
    this.queries.hitbox.results.forEach((entity) => {
      const PosC = entity.getComponent(PositionComponent)!;
      const VoluC = entity.getComponent(VolumeComponent)!;
      const VeloC = entity.getComponent(VelocityComponent)!;
      hitboxs.push({
        info: {
          x: PosC.x,
          y: PosC.y,
          w: VoluC.width,
          h: VoluC.height,
        },
        velocity: VeloC.y,
      })
    })

    this.queries.bounce.results.forEach((entity) => {
      const PosC = entity.getComponent(PositionComponent)!;
      const VelC = entity.getMutableComponent(VelocityComponent)!;
      const VoluC = entity.getComponent(VolumeComponent)!;
      const reversed = entity.getComponent(ReverseComponent)
      const futureX = PosC.x + VelC.x;
      const futureY = PosC.y + VelC.y;

      const ballBound = getVertexes(futureX, futureY, VoluC.width, VoluC.height);
      for (const box of hitboxs) {
        const { info } = box
        const anyInside = ballBound.some((bp) => contains(info.x, info.y, info.w, info.h, bp.x, bp.y))
        if (anyInside) {
          if (!reversed) {
            entity.addComponent(ReverseComponent);
            VelC.x = -VelC.x;
          }
          break;
        } else {
          entity.removeComponent(ReverseComponent);
        }
      }

      const maxX = GLOBALS.width - VoluC.width;
      const maxY = GLOBALS.height - VoluC.height;
      if (!between(0, maxX, futureX)) {
        VelC.x = -VelC.x;
      }
      if (!between(0, maxY, futureY)) {
        VelC.y = -VelC.y;
      }
    })

  }
}

export default VelocitySystem;
