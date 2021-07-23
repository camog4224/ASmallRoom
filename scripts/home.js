alert("CONNECTED");
// var button = document.querySelector("#button");
//
// button.addEventListener('click', doThing);

function doThing(){


}

var ctx = canvas.getContext('2d');

function go(){

  animID = requestAnimationFrame(animate);
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);

  requestAnimationFrame(animate);
}

class Box(){

  constructor(){
    this.c = Math.random() * 255;
    this.size = Math.random() * 10;
  }

  display(){
    // ctx.beginPath();
    // ctx.arc();
    // ctx.stroke();
  }

}
