import Vector from "./vector"

const bzv0 = new Vector();
const bzv1 = new Vector();
const bzv2 = new Vector();
const bzv3 = new Vector();
const bzv4 = new Vector();

function bezierPoint(vector, x0,y0,x1,y1,t)
{
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t;

    vector.x = x;
    vector.y = y;

    return vector;
}
function bezierPointV(vector, v0,v1,t)
{
    const x0 = v0.x;
    const y0 = v0.y;
    const x = x0 + (v1.x - x0) * t;
    const y = y0 + (v1.y - y0) * t;

    vector.x = x;
    vector.y = y;

    return vector;
}

export function quadraticBezier(x0,y0,x1,y1,x2,y2, current, out)
{
    const a = bezierPoint(bzv0, x0, y0, x1, y1, current);
    const b = bezierPoint(bzv1, x1, y1, x2, y2, current);

    return bezierPointV(out, a, b, current);
}

export function cubicBezier(x0,y0,x1,y1,x2,y2,x3,y3, current, out)
{
    const a = bezierPoint(bzv0, x0, y0, x1, y1, current);
    const b = bezierPoint(bzv1, x1, y1, x2, y2, current);
    const c = bezierPoint(bzv2, x2, y2, x3, y3, current);

    const d = bezierPointV(bzv3, a, b, current)
    const e = bezierPointV(bzv4, b, c, current)

    return bezierPointV(out, d, e, current);
}
