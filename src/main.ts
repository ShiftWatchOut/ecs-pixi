import "./style.css";
import { World } from "ecsy";
import RenderSystem from "./app/systems/RenderSystem";
import PositionComponent from "./app/components/Position";
import InputComponent from "./app/components/Input";
import InputSystem from "./app/systems/InputSystem";
import GLOBALS from "./app/config";
import VelocitySystem from "./app/systems/VelocitySystem";
import VelocityComponent, { ReverseComponent } from "./app/components/Velocity";
import MoveSystem from "./app/systems/MoveSystem";
import VolumeComponent from "./app/components/Volume";
import SpriteComponent from "./app/components/Sprite";
import pixiApp from "./app/singletons/pixi";
import BounceComponent from "./app/components/Bouncing";
import ScoreSystem from "./app/systems/ScoreSystem";

const world = new World();

const { interactWith, initBallPos, ety1Pos, ety2Pos } = GLOBALS;
const startY = 10;
world
  .registerComponent(PositionComponent)
  .registerComponent(VelocityComponent)
  .registerComponent(InputComponent)
  .registerComponent(VolumeComponent)
  .registerComponent(SpriteComponent)
  .registerComponent(BounceComponent)
  .registerComponent(ReverseComponent)
  .registerSystem(InputSystem)
  .registerSystem(VelocitySystem)
  .registerSystem(ScoreSystem)
  .registerSystem(MoveSystem)
  .registerSystem(RenderSystem);

const entity1 = world
  .createEntity()
  .addComponent(PositionComponent, PositionComponent.create(ety1Pos, startY))
  .addComponent(VolumeComponent, VolumeComponent.create(20, 100))
  .addComponent(VelocityComponent)
  .addComponent(
    InputComponent,
    InputComponent.create([interactWith.w, interactWith.s])
  );

const entity2 = world
  .createEntity()
  .addComponent(PositionComponent, PositionComponent.create(ety2Pos, startY))
  .addComponent(VolumeComponent, VolumeComponent.create(20, 100))
  .addComponent(VelocityComponent)
  .addComponent(
    InputComponent,
    InputComponent.create([interactWith.arrowdown, interactWith.arrowup])
  );

const ball = world
  .createEntity()
  .addComponent(PositionComponent, PositionComponent.create(initBallPos.x, initBallPos.y))
  .addComponent(VolumeComponent, VolumeComponent.create(20, 20))
  .addComponent(VelocityComponent, { x: 2, y: 1 })
  .addComponent(BounceComponent)

pixiApp.ticker.add((delta) => {
  world.execute(delta);
});
