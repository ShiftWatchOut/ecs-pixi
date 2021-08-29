import { Component, Types } from "ecsy";

class PositionComponent extends Component<any> {
  static schema = {
    x: { type: Types.Number },
    y: { type: Types.Number },
  };
}

export default PositionComponent;
