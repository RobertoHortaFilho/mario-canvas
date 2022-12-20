import { Player } from './src/entities/Player.js'
import { Wall, Floor, NewGrid} from './src/blocks/Wall.js'
import { mapas, genearateMap } from './src/map/Data.js'
import { createKeyboardListener } from './src/KeyboardCreate.js'
import { Goomba } from './src/entities/Goomba.js'


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');
const canvasSize = {w:800,h:600}
let POSOFF = {x : 0};

//create a map
const generateAllMap = genearateMap(mapas.m1)

//create entities
//player
const walls = generateAllMap.walls
const p = new Player(walls,generateAllMap.playerPos, POSOFF);
createKeyboardListener(p)

//enemys
let enemysList = []
generateAllMap.enemysPos.forEach((pos) => {
  const { type } = pos;
  switch(type) {
    case 'goomba':
      enemysList.push( new Goomba(walls, pos, POSOFF))
      break;
    default:
      // enemysList.push( new Enemy(walls, pos, POSOFF))
      break;
  }
})

window.enemy = enemysList[0]

const build = () => {
  p.move()

  enemysList.forEach((e) => {
    e.move()
  })
}

setInterval(() => build(), 1000/60)

const renderGame = () =>{
  c.fillStyle = 'white'
  c.clearRect(0,0,canvasSize.w,canvasSize.h);

  p.render(c)

  enemysList.forEach((e) => {
    e.render(c)
  })

  walls.forEach(wall => {
    wall.render(c, POSOFF)
  });
  window.requestAnimationFrame(renderGame)
}

renderGame()