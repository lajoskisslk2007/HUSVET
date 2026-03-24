const canvas = document.getElementById("paintingCanvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");
const clearBtn = document.getElementById("clearBtn");
let brushColor = "#e53935";
let drawing = false;
let lastX=0,lastY=0;

function drawEggShape(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const centerX = canvas.width/2;
  const centerY = canvas.height*0.65;
  ctx.fillStyle = "#fff8e0";
  ctx.strokeStyle = "#6d403f";
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY-160);
  ctx.bezierCurveTo(centerX+120, centerY-180, centerX+170, centerY-40, centerX+120, centerY+140);
  ctx.bezierCurveTo(centerX+60, centerY+220, centerX-60, centerY+220, centerX-120, centerY+140);
  ctx.bezierCurveTo(centerX-170, centerY-40, centerX-120, centerY-180, centerX, centerY-160);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // egg decoration
  const stripes = [
    {y:centerY-40,height:22,color:'#ffb300'},
    {y:centerY+10,height:18,color:'#1e88e5'},
    {y:centerY+50,height:20,color:'#8e24aa'},
  ];
  for(const s of stripes){
    ctx.beginPath();
    ctx.fillStyle = s.color;
    ctx.ellipse(centerX, s.y, 80, s.height, 0, 0, Math.PI*2);
    ctx.fill();
  }
}

function startDraw(event){
  drawing = true;
  const rect=canvas.getBoundingClientRect();
  lastX = event.clientX - rect.left;
  lastY = event.clientY - rect.top;
}

function stopDraw(){
  drawing = false;
  ctx.beginPath();
}

function draw(event){
  if(!drawing) return;
  const rect=canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  ctx.strokeStyle = brushColor;
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(x,y);
  ctx.stroke();
  lastX=x; lastY=y;
}

palette.addEventListener("click", (event)=>{
  const btn = event.target.closest(".bucket");
  if(!btn) return;
  brushColor = btn.dataset.color;
  document.querySelectorAll(".bucket").forEach(el => el.classList.remove("active"));
  btn.classList.add("active");
});

clearBtn.addEventListener("click", drawEggShape);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);

window.addEventListener("load", ()=>{
  const defaultBucket = document.querySelector('.bucket[data-color="#e53935"]');
  if(defaultBucket) defaultBucket.classList.add('active');
  drawEggShape();
});
