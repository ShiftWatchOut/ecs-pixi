import { System } from "ecsy";
import InputComponent from "../components/Input";

class InputSystem extends System {
  static queries = {
    keyboard: {
      components: [InputComponent],
    },
  };
  keys: string[] = [];
  init() {
    window.addEventListener("keydown", (e) => {
      if (this.keys.includes(e.key.toLowerCase())) {
        return;
      } else {
        this.keys.push(e.key.toLowerCase());
      }
    });

    window.addEventListener("keyup", (e) => {
      const idx = this.keys.indexOf(e.key.toLowerCase());
      if (idx !== -1) {
        this.keys.splice(idx, 1);
      }
    });
  }
  execute() {
    this.queries.keyboard.results.forEach((entity) => {
      const input = entity.getMutableComponent(InputComponent)!;
      const findKey = this.keys.find((key) => input.subscribe.includes(key));
      if (findKey) {
        input.key = findKey;
        console.log("keydown", findKey);
      }
    });
  }
}

export default InputSystem;
