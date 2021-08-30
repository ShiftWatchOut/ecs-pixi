import { Component, Types } from "ecsy";

class VelocityComponent extends Component<any> {
  static schema = {
    x: { type: Types.Number },
    y: { type: Types.Number },
  };
  x = 0;
  y = 0;
}

export default VelocityComponent;
