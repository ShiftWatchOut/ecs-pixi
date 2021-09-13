import { Component, Types } from 'ecsy';

class PositionComponent extends Component<any> {
    public static schema = {
        x: { type: Types.Number },
        y: { type: Types.Number }
    };
    public static create(x: number, y: number) {
        return {
            x,
            y
        };
    }
    public x = 0;
    public y = 0;
}

export default PositionComponent;
