import { System } from "ecsy";
import InputComponent from "../components/Input";
import VelocityComponent from "../components/Velocity";
import GLOBALS from "../config";

const { interactWith, boardVelocity } = GLOBALS;

class VelocitySystem extends System {
  static queries = {
    inputAndVelocity: {
      components: [InputComponent, VelocityComponent],
    },
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
  }
}

export default VelocitySystem;
