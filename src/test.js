import domready from "domready"
import spectral from "@fforw/spectral.js"
import Prando from "prando"
import "./style.css"

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;

const config = {
    width: 0,
    height: 0,
    random: null
};

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;

let mx, my, drawing, positions

function onMouseMove(ev)
{
    mx = ev.clientX;
    my = ev.clientY;
}


function onMouseDown(ev)
{
    drawing = true
    positions = []
}

function onMouseUp(ev)
{
    drawing = false
    console.log("POS", positions)
}

let currentRun = 0
let runCounter = 0

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



        const run = () => {
            ctx.fillStyle = "#16161d";
            ctx.fillRect(0,0,width,height)

            const currentRun = ++runCounter

            positions = []

            const animate = () => {


                if (drawing)
                {
                    ctx.fillStyle = "#080"
                    ctx.fillRect(mx,my,1,1)
                    positions.push([mx,my])
                }


                if (currentRun === runCounter)
                {
                    requestAnimationFrame(animate)
                }
            }
            requestAnimationFrame(animate)
        }

        run()

        //canvas.addEventListener("click", run, true)

        canvas.addEventListener("mousedown", onMouseDown, true)
        canvas.addEventListener("mousemove", onMouseMove, true)
        canvas.addEventListener("mouseup", onMouseUp, true)
    }
);
