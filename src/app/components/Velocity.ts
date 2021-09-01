import { Component, TagComponent, Types } from "ecsy";

export class ReverseComponent extends TagComponent { }
class VelocityComponent extends Component<any> {
  static schema = {
    x: { type: Types.Number },
    y: { type: Types.Number },
  };
  x = 0;
  y = 0;
}

export default VelocityComponent;
