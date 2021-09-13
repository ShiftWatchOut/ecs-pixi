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

export function numberNear(n1:number, n2: number, e = 10e-7) {
    return Math.abs(n1 - n2) <= e;
}

export function lineIntersect(p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint): IPoint {
    const A1 = p1.y - p0.y
    const B1 = p0.x - p1.x
    const C1 = A1 * p0.x + B1 * p0.y
    const A2 = p3.y - p2.y
    const B2 = p2.x - p3.x
    const C2 = A2 * p2.x + B2 * p2.y
    const denominator = A1 * B2 - A2 * B1

    return {
        x: (B2 * C1 - B1 * C2) / denominator,
        y: (A1 * C2 - A2 * C1) / denominator
    }
}