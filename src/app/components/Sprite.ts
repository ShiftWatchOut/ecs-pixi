import { Component, Types } from 'ecsy';

class SpriteComponent extends Component<any> {
    public static schema = {
        ref: { type: Types.Ref }
    };
    public static create(ref: any) {
        return {
            ref
        };
    }
    public ref: any;
}

export default SpriteComponent;
