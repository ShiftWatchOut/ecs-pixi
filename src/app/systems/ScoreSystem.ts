import { System } from "ecsy";
import BounceComponent from "../components/Bouncing";
import PositionComponent from "../components/Position";
import GLOBALS from "../config";
import { between } from "../util";

const { initBallPos, ety1Pos, ety2Pos } = GLOBALS
class ScoreSystem extends System {
    static queries = {
        ball: {
            components: [BounceComponent],
        },
    }
    relativeXs = [ety1Pos, ety2Pos]
    execute() {
        this.queries.ball.results.forEach((entity) => {
            const PosC = entity.getMutableComponent(PositionComponent)!;
            // 以两边为界，越过即重置球的位置
            if (this.relativeXs.length > 0 && !between(this.relativeXs[0], this.relativeXs[1], PosC.x)) {
                PosC.x = initBallPos.x;
                PosC.y = initBallPos.y;
            }
        })
    }

    resetBall() {

    }
}

export default ScoreSystem