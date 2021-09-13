import { Component, TagComponent, Types } from 'ecsy';

export class ReverseComponent extends TagComponent {}
class VelocityComponent extends Component<any> {
    public static schema = {
        x: { type: Types.Number },
        y: { type: Types.Number }
    };
    public x = 0;
    public y = 0;
}

export default VelocityComponent;
