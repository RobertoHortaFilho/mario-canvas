import Enemy from './Enemy.js';
export class Goomba extends Enemy{
  constructor(...params) {
    super(...params)
    this.color = 'purple'
    this.side = 'left'
  }

  move() {
    if (!this.velh) {
      switch(this.side) {
        case 'left':
          this.velh = -2
          this.side = 'right'
          break
        case 'right':
          this.velh = 2
          this.side = 'left'
          break
      }
    }
    this.colisionAndMove()
    this.gravity()
  }
}
