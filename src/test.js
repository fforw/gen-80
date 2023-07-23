import domready from "domready"
import spectral from "@fforw/spectral.js"
import Prando from "prando"
import "./style.css"
import Stroke from "./Stroke"
import config from "./config"

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;

const strokeData = [
    [657, 311], [664, 316.5], [671, 322], [678.5, 327], [686, 332], [693.5, 336.5], [701, 341], [710, 344.5], [719, 348], [728.5, 349.5],
    [738, 351], [745.25, 351.5], [752.5, 352], [759.75, 352.5], [767, 353], [774.5, 352.5], [782, 352], [789.5, 351.5], [797, 351], [803.5, 349.75],
    [810, 348.5], [816.5, 347.25], [823, 346], [830.5, 344.25], [838, 342.5], [845.5, 340.75], [853, 339], [859, 337], [865, 335], [871, 333],
    [877, 331], [884.5, 328.5], [892, 326], [898, 323.75], [904, 321.5], [910, 319.25], [916, 317], [922, 314.25], [928, 311.5], [934, 308.75],
    [940, 306], [945.75, 303], [951.5, 300], [957.25, 297], [963, 294], [970.75, 289], [978.5, 284], [986.25, 279], [994, 274], [999.5, 269.75],
    [1005, 265.5], [1010.5, 261.25], [1016, 257], [1021, 252.5], [1026, 248], [1031, 243.5], [1036, 239], [1042, 233], [1048, 227], [1052.25, 222.25],
    [1056.5, 217.5], [1060.75, 212.75], [1065, 208], [1068.75, 203.5], [1072.5, 199], [1076.25, 194.5], [1080, 190], [1082.75, 185.5], [1085.5, 181], [1088.25, 176.5],
    [1091, 172], [1095.5, 164], [1100, 156], [1102, 148], [1104, 140], [1104, 134], [1104, 128], [1102, 123], [1100, 118], [1093, 112],
    [1088, 110.5], [1083, 109], [1076.5, 109], [1070, 109], [1063, 111], [1056, 113], [1049, 116.5], [1042, 120], [1034.5, 124.5], [1027, 129],
    [1020.5, 135], [1014, 141], [1008.5, 148], [1003, 155], [997.5, 163], [992, 171], [989.25, 175.75], [986.5, 180.5], [983.75, 185.25], [981, 190],
    [979.25, 195.25], [977.5, 200.5], [975.75, 205.75], [974, 211], [972.25, 216.25], [970.5, 221.5], [968.75, 226.75], [967, 232], [966, 237.5], [965, 243],
    [964, 248.5], [963, 254], [963, 264], [963, 274], [963.75, 279], [964.5, 284], [965.25, 289], [966, 294], [967.5, 299], [969, 304],
    [970.5, 309], [972, 314], [973.75, 318.75], [975.5, 323.5], [977.25, 328.25], [979, 333], [981.25, 337.75], [983.5, 342.5], [985.75, 347.25], [988, 352],
    [990.25, 356.75], [992.5, 361.5], [994.75, 366.25], [997, 371], [1000.5, 380], [1004, 389], [1006.5, 398], [1009, 407], [1011, 416], [1013, 425],
    [1013, 434], [1013, 443], [1013, 452], [1013, 461], [1011, 470], [1009, 479], [1005, 488], [1001, 497], [995.5, 504.25], [990, 511.5],
    [984.5, 518.75], [979, 526], [971.5, 532], [964, 538], [956, 543], [948, 548], [939, 551.5], [930, 555], [925, 556], [920, 557],
    [915, 558], [910, 559], [905, 559.5], [900, 560], [895, 560.5], [890, 561], [884.75, 561], [879.5, 561], [874.25, 561], [869, 561],
    [859.5, 559.5], [850, 558], [841, 556], [832, 554], [825, 551], [818, 548], [811, 544], [804, 540], [798, 535.5], [792, 531],
    [787, 525], [782, 519], [779, 510.5], [776, 502], [775.75, 496.5], [775.5, 491], [775.25, 485.5], [775, 480], [776, 473], [777, 466]
]

// noinspection JSUnusedLocalSymbols
function format(stroke)
{
    const out = ["[\n    "]

    for (let i = 0; i < stroke.length; i++)
    {
        const [x,y] = stroke[i]

        if (i > 0)
        {
            out.push(", ")
            if (i % 10 === 0)
            {
                out.push("\n    ")
            }
        }

        out.push(`[${x}, ${y}]`)

    }
    out.push("\n]")
    return out.join("")
}

// noinspection JSUnusedLocalSymbols
function insert(stroke, limit)
{
    let [x0,y0] = stroke[0]
    for (let i = 0; i < stroke.length; i++)
    {
        const [x1, y1] = stroke[i]

        const dx = x1 - x0
        const dy = y1 - y0
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d > limit)
        {
            stroke.splice(i, 0, [
                (x0+x1)/2,
                (y0+y1)/2
            ])

            i+=1
        }

        x0 = x1
        y0 = y1
    }
}


function drawStroke(stroke)
{
    for (let i = 0; i < stroke.length; i++)
    {
        const [x, y] = stroke[i]

        const r = 10

        ctx.strokeStyle = i === 48 ? "#c00" : "#080"

        ctx.beginPath()
        ctx.moveTo(x + r,y)
        ctx.arc(x ,y,r,0,TAU, true)
        ctx.stroke()
    }
}




domready(
    () => {

        canvas = document.getElementById("screen");
        ctx = canvas.getContext("2d");

        const width = (window.innerWidth) | 0;
        const height = (window.innerHeight) | 0;

        config.width = width;
        config.height = height;

        canvas.width = width;
        canvas.height = height;



        const paint = () => {
            ctx.fillStyle = "#16161d";
            ctx.fillRect(0,0,width,height)

            const stroke = new Stroke();
            for (let i = 0; i < strokeData.length; i++)
            {
                const [x, y] = strokeData[i]
                stroke.brush(x|0,y|0,10)
            }

            const { spanLines } = stroke
            ctx.fillStyle = "#080"
            for (let i = 0; i < spanLines.length; i++)
            {
                const spans = spanLines[i]
                if (spans)
                {
                    for (let j = 0; j < spans.length; j+=2)
                    {
                        const start = spans[j]
                        const end = spans[j+1]

                        ctx.fillRect(start, i, end - start, 1)
                    }
                }
            }

        }

        paint()

        canvas.addEventListener("click", paint, true)

    }
);
