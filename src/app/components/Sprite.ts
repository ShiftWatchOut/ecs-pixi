import { Component, Types } from "ecsy";

class SpriteComponent extends Component<any> {
  static create(ref: any) {
    return {
      ref,
    };
  }
  static schema = {
    ref: { type: Types.Ref },
  };
  ref: any;
}

export default SpriteComponent;
