const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const range = document.getElementById("jsRange");
const saveBtn = document.getElementById("jsSave");

const first_color = "2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = first_color;
ctx.fillStyle = first_color;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

function startPainting() {
    painting =  true;
}


function stopPainting(event) {
    painting = false;
}

//mouse on canvase, it detect
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


//color change
Array.from(colors).forEach(color => 
    color.addEventListener("click", colorChange)
);

function colorChange(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


//range 
if(range) {
    range.addEventListener("input", handleRangeChange);
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

//mode change
if(mode){
    mode.addEventListener("click", handleModeClick)
}

function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  }


//fill all canvas
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height )
    }
    
}

//stop move ex)https://pa-pico.tistory.com/20
function handelContextMenu(event) {
    event.preventDefault();
}

//save btn 
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image
    link.download = "Paint[han_export]";
    link.click();

}


//event listener
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handelContextMenu)
}