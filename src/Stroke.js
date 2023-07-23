import config from "./config"

export default class Stroke {

    /**
     *
     * @type {Array}
     */
    spanLines = null

    constructor()
    {
        this.clear()
    }

    clear()
    {
        const { height} = config
        this.spanLines = new Array(height)
    }

    insert(x0,y0,x1)
    {
        if (y0 < 0)
        {
            return
        }

        //console.log("insert", x0, y0, x1)
        const spans = this.spanLines[y0]
        if (!spans)
        {
            this.spanLines[y0] = [x0,x1]
        }
        else
        {
            let drawing = false
            let startIndex = -1
            let endIndex = -1
            let drawingAtStart = null
            let drawingAtEnd = null
            for (let i = 0; i < spans.length; i++)
            {
                const x = spans[i]

                if (drawingAtStart === null)
                {
                    if (x > x0)
                    {
                        drawingAtStart = drawing
                        startIndex = i
                    }
                }

                if (drawingAtStart !== null)
                {
                    if (x > x1)
                    {
                        endIndex = i
                        drawingAtEnd = drawing
                        break;
                    }
                }
                drawing = !drawing
            }

            if (endIndex < 0)
            {
                endIndex = spans.length
                drawingAtEnd = false
            }

            let insertStart = false
            let insertEnd = false

            if (!drawingAtStart)
            {
                insertStart = true
            }

            if (!drawingAtEnd)
            {
                insertEnd = true
            }

            const removeCount = endIndex - startIndex

            if (startIndex < 0)
            {
                startIndex = spans.length
            }

            // console.log({
            //      insertStart, insertEnd, removeCount, startIndex
            // })

            if (insertStart)
            {
                if (insertEnd)
                {
                    spans.splice(startIndex, removeCount, x0, x1)
                }
                else
                {
                    spans.splice(startIndex, removeCount, x0)
                }
            }
            else
            {
                if (insertEnd)
                {
                    spans.splice(startIndex, removeCount, x1)
                }
            }
        }
    }


    brush(cx, cy, r)
    {
        const rSquared = r * r
        for (let y = 0; y < r; y++)
        {
            const x = Math.sqrt(rSquared - y*y)
            this.insert(Math.round(cx - x), Math.round(cy + y), Math.round(cx + x))
            this.insert(Math.round(cx - x), Math.round(cy - y - 1), Math.round(cx + x))
        }
    }
}
