import domready from "domready"
import spectral from "@fforw/spectral.js"
import Prando from "prando"
import config from "./config"
import "./style.css"

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;


/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;


const stroke = [
    [ 657, 461 ],  [ 657, 461 ],  [ 657, 461 ],  [ 658, 461 ],
    [ 671, 472 ],  [ 679, 478 ],  [ 701, 491 ],  [ 738, 501 ],
    [ 797, 501 ],  [ 823, 496 ],  [ 853, 489 ],  [ 877, 481 ],
    [ 892, 476 ],  [ 916, 467 ],  [ 940, 456 ],  [ 963, 444 ],
    [ 994, 424 ],  [ 1016, 407 ], [ 1036, 389 ], [ 1048, 377 ],
    [ 1065, 358 ], [ 1080, 340 ], [ 1091, 322 ], [ 1100, 306 ],
    [ 1104, 290 ], [ 1104, 278 ], [ 1100, 268 ], [ 1093, 262 ],
    [ 1083, 259 ], [ 1070, 259 ], [ 1056, 263 ], [ 1042, 270 ],
    [ 1027, 279 ], [ 1014, 291 ], [ 1003, 305 ], [ 992, 321 ],
    [ 981, 340 ],  [ 978, 347 ],  [ 967, 382 ],  [ 963, 404 ],
    [ 963, 424 ],  [ 966, 444 ],  [ 972, 464 ],  [ 979, 483 ],
    [ 988, 502 ],  [ 997, 521 ],  [ 1004, 539 ], [ 1009, 557 ],
    [ 1013, 575 ], [ 1013, 581 ], [ 1013, 611 ], [ 1009, 629 ],
    [ 1001, 647 ], [ 998, 652 ],  [ 979, 676 ],  [ 964, 688 ],
    [ 948, 698 ],  [ 930, 705 ],  [ 910, 709 ],  [ 890, 711 ],
    [ 869, 711 ],  [ 850, 708 ],  [ 832, 704 ],  [ 818, 698 ],
    [ 804, 690 ],  [ 792, 681 ],  [ 782, 669 ],  [ 776, 652 ],
    [ 775, 630 ],  [ 777, 616 ]
]

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
            ctx.fillStyle = "#FFF";
            ctx.fillRect(0,0,width,height)

            const random = new Prando(0)
            config.random = random

            const imageData = ctx.getImageData(0,0,width,height)
            const { data } = imageData

            const getColor = (x,y, out) => {

                const off = (y * width + x ) << 2
                out[0] = data[off]
                out[1] = data[off + 1]
                out[2] = data[off + 2]
                out[3] = data[off + 3]
            }

            const setColor = (x,y, color) => {

                const off = (y * width + x ) << 2
                data[off    ] = color[0]
                data[off + 1] = color[1]
                data[off + 2] = color[2]
                data[off + 3] = color[3]
            }

            const col0 = [0,0,0,1]
            const col1 = [0,0,0,1]
            const tmp = [0,0,0,1]

            //    spectral.mix(col0, col1, y/height, spectral.RAW, tmp)

        }

        paint()

        canvas.addEventListener("click", paint, true)
    }
);
