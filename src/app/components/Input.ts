import { Component, Types } from 'ecsy';
// ArrowDown
// ArrowUp
class InputComponent extends Component<any> {
    public static schema = {
        key: { type: Types.String },
        subscribe: { type: Types.Array }
    };
    public static create(subscribe: string[], key?: string) {
        return {
            key,
            subscribe
        };
    }
    public key: any;
    public subscribe: string[] = [];
}

export default InputComponent;
