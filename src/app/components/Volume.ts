import { Component, Types } from 'ecsy';

class VolumeComponent extends Component<any> {
    public static schema = {
        width: { type: Types.Number },
        height: { type: Types.Number }
    };
    public static create(width: number, height: number) {
        return {
            width,
            height
        };
    }
    public width = 0;
    public height = 0;
}

export default VolumeComponent;
