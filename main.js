import { Player } from './src/entities/Player.js'
import { Wall, Floor, NewGrid} from './src/blocks/Wall.js'
import { mapas, genearateMap } from './src/map/Data.js'
import { createKeyboardListener } from './src/KeyboardCreate.js'



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');
const canvasSize = {w:800,h:600}
let POSOFF = {x : 0};

//create a map
const generateAllMap = genearateMap(mapas.m1)

const walls = generateAllMap.walls
const p = new Player(walls,generateAllMap.playerPos, POSOFF);
createKeyboardListener(p)

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

renderGame()