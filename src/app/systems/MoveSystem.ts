import { System } from 'ecsy';
import PositionComponent from '../components/Position';
import VelocityComponent from '../components/Velocity';
import VolumeComponent from '../components/Volume';
import GLOBALS from '../config';

class MoveSystem extends System {
    public static queries = {
        moving: {
            components: [VelocityComponent, PositionComponent]
        }
    };
    public execute() {
        this.queries.moving.results.forEach((entity) => {
            const PosC = entity.getMutableComponent(PositionComponent)!;
            const VelC = entity.getComponent(VelocityComponent)!;
            const VoluC = entity.getComponent(VolumeComponent)!;
            PosC.x += VelC.x;
            PosC.y += VelC.y;

            const maxX = GLOBALS.width - VoluC.width;
            const maxY = GLOBALS.height - VoluC.height;

            if (PosC.x > maxX) {
                PosC.x = maxX;
            }
            if (PosC.y > maxY) {
                PosC.y = maxY;
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
