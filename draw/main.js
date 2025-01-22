var slider = document.getElementById("vertical");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var colour = "#000000";
var previous_x = false, previous_y = false; // cant
var current_x = 0, current_y = 0;
var clicking = false;
var first_click = true;
var inside = false;
var thickness = 4;
var pressure = 0.5;

function hold_event() {
   context.beginPath();
   context.moveTo(previous_x, previous_y);
   context.lineTo(current_x, current_y);
   context.lineWidth = thickness * pressure;
   context.strokeStyle = colour;
   context.lineCap = "round";
   context.stroke();
   context.closePath();
}

function hold_handler(e) {
   if (e.buttons != 1 || !inside) {
      return;
   }
   if (first_click) {
      previous_x = e.offsetX;
      previous_y = e.offsetY;
   }
   if (e.pointerType == "pen") {
      pressure = e.pressure;
   }
   current_x = e.offsetX;
   current_y = e.offsetY;
   hold_event();
   previous_x = e.offsetX;
   previous_y = e.offsetY;
   first_click = false;
}
function hold_start(e) {
   if (e.button != 0) {
      return;
   }
   clicking = true;
   first_click = true;
   previous_x = e.offsetX;
   previous_y = e.offsetY;
   current_x = e.offsetX;
   current_y = e.offsetY;
   hold_event();
}

function hold_stop() {
   clicking = false;
}

var width = 0;
var height = 0;
function resise() {
   canvas.style.width = "100%";
   canvas.style.height = "100%";
   if (canvas.scrollWidth <= width && canvas.scrollHeight <= height) {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      return 0;
   }
   var image = context.getImageData(0, 0, canvas.width, canvas.height);

   if (canvas.scrollWidth > width) {
      canvas.width = canvas.scrollWidth;
      canvas.style.width = canvas.width + "px";
      width = canvas.scrollWidth;
   }
   if (canvas.scrollHeight > height) {
      canvas.height = canvas.scrollHeight;
      canvas.style.height = canvas.height + "px";
      height = canvas.scrollHeight;
   }

   canvas.style.width = width + "px";
   canvas.style.height = height + "px";
   context.putImageData(image, 0, 0);
}

window.onresize = resise;
resise();

slider.onchange = () => { thickness = slider.value; };

canvas.onpointerdown = hold_start;
canvas.onpointerup = hold_stop;
canvas.onpointerleave = () => { inside = false; };
canvas.onpointerenter = () => { inside = true; };
canvas.onpointermove = hold_handler;
