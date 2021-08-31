export interface IPoint {
    x: number,
    y: number,
}

export interface ISize {
    w: number,
    h: number,
}


export function between(min: number, max: number, compare: number) {
    return compare < max && compare > min
}

export function getVertexes(x: number, y: number, w: number, h: number): IPoint[] {
    const down = y + h;
    const end = x + w;
    return [
        {
            x: x,
            y: y,
        },
        {
            x: end,
            y: y,
        },
        {
            x: end,
            y: down,
        },
        {
            x: x,
            y: down,
        },
    ]
}

export function contains(x: number, y: number, w: number, h: number, px: number, py: number) {
    return between(x, x + w, px) && between(y, y + h, py)
}