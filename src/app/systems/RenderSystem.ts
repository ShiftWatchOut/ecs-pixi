import { Entity, System } from 'ecsy';
import PositionComponent from '../components/Position';
import SpriteComponent from '../components/Sprite';
import VolumeComponent from '../components/Volume';
import pixiApp, { PIXI } from '../singletons/pixi';

class RenderSystem extends System {
    public static queries = {
        movings: {
            components: [PositionComponent, VolumeComponent],
            listen: {
                added: true,
                removed: true
            }
        }
    };
    private pixiApp: PIXI.Application | undefined;
    public init() {
        this.pixiApp = pixiApp;
    }
    public execute() {
        this.queries.movings.added?.forEach((entity) => {
            const g = new PIXI.Graphics();
            g.name = `${entity.id}-volume`;
            entity.addComponent(SpriteComponent, SpriteComponent.create(g));
            this.updateVolumeGraph(g, entity);
            this.pixiApp!.stage.addChild(g);
        });
        this.queries.movings.results.forEach((entity) => {
            const Gref = entity.getComponent(SpriteComponent);
            this.updateVolumeGraph(Gref?.ref, entity);
        });
    }

    private updateVolumeGraph(graphic: PIXI.Graphics | undefined, entity: Entity) {
        if (graphic) {
            const PosC = entity.getComponent(PositionComponent)!;
            const VolC = entity.getComponent(VolumeComponent)!;
            graphic
                .clear()
                .beginFill(0xffffff)
                .drawRect(PosC.x, PosC.y, VolC.width, VolC.height)
                .endFill();
        }
    }
}

export default RenderSystem;
