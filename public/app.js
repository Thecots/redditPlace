
const socket = io('http://localhost:5030')
let color = 'black'

/* place */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const canvash = document.querySelector('.canvash');
const ctxh = canvash.getContext('2d');

canvas.width = 1000
canvas.height = 750

class square{
  constructor(x,y,color){
    this.x = x
    this.y = y
    this.color = color
  }

  print(){
    ctx.beginPath()
    ctx.rect(this.x,this.y,10,10)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

pixels = []
for (let i = 0; i < (1000/10); i++) {
  for (let n = 0; n < (750/10); n++) {
    pixels.push(new square(i*10,n*10,'#ffff'))
  }
}

pixels.forEach(n => {
  n.print()
});


function setColor(x){
  color = x
}

canvash.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e)
})

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  setPixel(x,y)
  socket.emit('setColor', {x,y,color})
}

function setPixel(x,y){
  
  res = pixels.find(n => {
    if( x >= n.x && x <= (n.x+10) && 
        y >= n.y && y <= (n.y+10)){
          return n
        }
  })
  res.color = color
  res.print()
}

socket.on('rescolor', data => {
  color = data.color;
  setPixel(data.x,data.y)
})





canvash.width = 1000
canvash.height = 750

class fillsquare{
  constructor(x,y,color){
    this.x = x
    this.y = y
    this.color = color
  }

  print(){
    ctxh.beginPath()
    ctxh.rect(this.x,this.y,10,10)
    ctxh.fillStyle = this.color
    ctxh.fill()
    ctxh.closePath()
  }
}

hover = new fillsquare(0,0,'black')

canvash.addEventListener('mousemove',e => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  res = pixels.find(n => {
    if( x >= n.x && x <= (n.x+10) && 
        y >= n.y && y <= (n.y+10)){
          return n
        }
  })
  hover.x = res.x
  hover.y = res.y
  hover.color = color
  hover.print()
})


function hanim(){
  requestAnimationFrame(hanim)
  ctxh.clearRect(0,0,1000,750)
  hover.print()
}

hanim();