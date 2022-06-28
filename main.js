import { Player } from './src/entities/Player.js'
import { Wall, Floor, NewGrid} from './src/blocks/Wall.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');
const canvasSize = {w:800,h:600}
let POSOFF = {x : 0};


const grid = {x:25 ,y: 19}

//create a map
const walls = [];


for (let i = 0; i < 90; i++){
  walls.push(new Floor(NewGrid(i,16)))
}
for (let i = 0; i < 16; i++){
  walls.push(new Wall(NewGrid(0,i)))
}
walls.push(new Floor(NewGrid(10,11)))
walls.push(new Floor(NewGrid(18,11)))
walls.push(new Floor(NewGrid(19,11)))
walls.push(new Floor(NewGrid(20,11)))
walls.push(new Floor(NewGrid(21,11)))

const p = new Player(walls,{x:33,y:450},POSOFF);



function renderGame(){
  c.fillStyle = 'white'
  c.clearRect(0,0,canvasSize.w,canvasSize.h);
  
  p.move()
  p.render(c)

  walls.forEach(wall => {
    wall.render(c, POSOFF)
  });
  window.requestAnimationFrame(renderGame)
}





window.addEventListener('keydown', (e)=>{
  switch(e.key){
    case 'ArrowRight':
      p.keys.right = true
      break;
    case 'ArrowLeft':
      p.keys.left = true
      break;
    case 'ArrowUp' :
      p.keys.up = true
      break;
  }
})

window.addEventListener('keyup', e => {
  switch(e.key){
    case 'ArrowRight':
      p.keys.right = false;
      break;
    case 'ArrowLeft':
      p.keys.left = false;
      break;
    case 'ArrowUp':
      p.keys.up = false;
      break;
  }
})


renderGame()