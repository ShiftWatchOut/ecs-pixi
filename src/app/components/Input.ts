import { Component, Types } from "ecsy";
// ArrowDown
// ArrowUp
class InputComponent extends Component<any> {
  static schema = {
    key: { type: Types.String },
    subscribe: { type: Types.Array },
  };
  static create(subscribe: string[], key?: string) {
    return {
      key,
      subscribe,
    };
  }
  key: any;
  subscribe: string[] = [];
}

export default InputComponent;
