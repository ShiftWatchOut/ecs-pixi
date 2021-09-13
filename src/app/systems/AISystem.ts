import { System } from "ecsy";
import BounceComponent from "../components/Bouncing";
import FakeInputComponent from "../components/FakeInput";
import InputComponent from "../components/Input";
import PositionComponent from "../components/Position";
import VelocityComponent from "../components/Velocity";
import VolumeComponent from "../components/Volume";
import GLOBALS from "../config";
import { between, IPoint, lineIntersect, numberNear } from "../util";

let lastPos = 0;

const { interactWith, height, aiMoveGap } = GLOBALS

class AISystem extends System {
    static queries = {
        puppet: {
            components: [FakeInputComponent, InputComponent]
        },
        ball: {
            components: [BounceComponent, PositionComponent]
        },
    }
    execute() {
        let target: { vel: IPoint, pos: IPoint};
        this.queries.ball.results.forEach((entity) => {
            const Posc = entity.getComponent(PositionComponent)!;
            const VelC = entity.getComponent(VelocityComponent)!;
            target = {
                vel: {
                    x: VelC.x,
                    y: VelC.y,
                },
                pos: {
                    x: Posc.x,
                    y: Posc.y,
                }
            }
        })
        this.queries.puppet.results?.forEach((entity) => {
            const InputC = entity.getMutableComponent(InputComponent)!;
            const PosC = entity.getComponent(PositionComponent)!;
            const VoluC = entity.getComponent(VolumeComponent)!;
            const CurrentVelC = entity.getComponent(VelocityComponent)!;
            const targetP1 = target.pos;
            const targetP2 = {
                x: target.pos.x + target.vel.x,
                y: target.pos.y + target.vel.y,
            }
            const boardEnd = {
                x: PosC.x,
                y: PosC.y + VoluC.height
            }
            /** 反转 flag 在靠近角落或者 pong 的相交点附近反转 */
            let needReverse = numberNear(PosC.y, lastPos);
            const counter = target.vel.x > 0;
            const intersect = lineIntersect(targetP1, targetP2, PosC, boardEnd)
            if (counter && between(0, height, intersect.y)) {
                if (intersect.y - (PosC.y + VoluC.height / 2) > aiMoveGap && CurrentVelC.y < 0) {
                    needReverse = true
                }
                if ((PosC.y + VoluC.height / 2) - intersect.y > aiMoveGap && CurrentVelC.y > 0) {
                    needReverse = true
                }
            }
            if (needReverse) {
                InputC.key = InputC.key == interactWith.arrowup ? interactWith.arrowdown : interactWith.arrowup;
            }
            lastPos = PosC.y
        })
    }
}

export default AISystem