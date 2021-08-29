import "./style.css";
import { World } from "ecsy";
import RenderSystem from "./app/systems/RenderSystem";
import PositionComponent from "./app/components/Position";
import InputComponent from "./app/components/Input";
import InputSystem from "./app/systems/InputSystem";
import GLOBALS from "./app/config";

const world = new World();

const { interactWith } = GLOBALS;
world
  .registerComponent(PositionComponent)
  .registerComponent(InputComponent)
  .registerSystem(InputSystem)
  .registerSystem(RenderSystem);

const entity1 = world
  .createEntity()
  .addComponent(
    InputComponent,
    InputComponent.create([interactWith.w, interactWith.s])
  );

const entity2 = world
  .createEntity()
  .addComponent(
    InputComponent,
    InputComponent.create([interactWith.arrowdown, interactWith.arrowup])
  );

function loop(delta?: number) {
  world.execute(delta);
  requestAnimationFrame(loop);
}

loop();
