import { System } from "ecsy";
import FakeInputComponent from "../components/FakeInput";
import InputComponent from "../components/Input";
import PositionComponent from "../components/Position";
import GLOBALS from "../config";
import { numberNear } from "../util";

let upped = false;
let lastPos = 0;

const { interactWith } = GLOBALS

class AISystem extends System {
    static queries = {
        puppet: {
            components: [FakeInputComponent, InputComponent]
        }
    }
    execute() {
        this.queries.puppet.results?.forEach((entity) => {
            const InputC = entity.getMutableComponent(InputComponent)!;
            const PosC = entity.getComponent(PositionComponent)!;
            if (numberNear(PosC.y, lastPos)) {
                InputC.key = upped ? interactWith.arrowdown : interactWith.arrowup;
                upped = !upped
            }
            lastPos = PosC.y
        })
    }
}

export default AISystem