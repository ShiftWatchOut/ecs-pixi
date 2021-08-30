import { Component, Types } from "ecsy";

class VolumeComponent extends Component<any> {
  static create(width: number, height: number) {
    return {
      width,
      height,
    };
  }
  static schema = {
    width: { type: Types.Number },
    height: { type: Types.Number },
  };
  width = 0;
  height = 0;
}

export default VolumeComponent;
