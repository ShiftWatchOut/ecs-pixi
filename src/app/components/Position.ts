import { Component, Types } from "ecsy";

class PositionComponent extends Component<any> {
  static create(x: number, y: number) {
    return {
      x,
      y,
    };
  }
  static schema = {
    x: { type: Types.Number },
    y: { type: Types.Number },
  };
  x = 0;
  y = 0;
}

export default PositionComponent;
