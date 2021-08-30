import "./style.css";
import { World } from "ecsy";
import RenderSystem from "./app/systems/RenderSystem";
import PositionComponent from "./app/components/Position";
import InputComponent from "./app/components/Input";
import InputSystem from "./app/systems/InputSystem";
import GLOBALS from "./app/config";
import VelocitySystem from "./app/systems/VelocitySystem";
import VelocityComponent from "./app/components/Velocity";
import MoveSystem from "./app/systems/MoveSystem";

const world = new World();

const { interactWith } = GLOBALS;
world
  .registerComponent(PositionComponent)
  .registerComponent(VelocityComponent)
  .registerComponent(InputComponent)
  .registerSystem(InputSystem)
  .registerSystem(VelocitySystem)
  .registerSystem(MoveSystem)
  .registerSystem(RenderSystem);

const entity1 = world
  .createEntity()
  .addComponent(VelocityComponent)
  .addComponent(
    InputComponent,
    InputComponent.create([interactWith.w, interactWith.s])
  );

const entity2 = world
  .createEntity()
  .addComponent(VelocityComponent)
  .addComponent(
    InputComponent,
    InputComponent.create([interactWith.arrowdown, interactWith.arrowup])
  );

function loop(delta?: number) {
  world.execute(delta);
  requestAnimationFrame(loop);
}

loop();
