
export class Wall{

  constructor(pos={x:0,y:0},size={w:32,h:32}){
    this.pos = {}
    this.pos.x = pos.x;
    this.pos.y =pos.y;
    this.size = {}
    this.size.w = size.w
    this.size.h = size.h;
    this.color = 'green'
    this.sprite = undefined
  }

  render (c, posOff){
    c.fillStyle = this.color
    c.fillRect(this.pos.x + posOff.x, this.pos.y, this.size.w, this.size.h)
  }
}


export class Floor extends Wall{
  constructor(pos={x:0,y:0},size={w:32,h:32}){
    super(pos,size)
    this.sprite = new Image()
    this.sprite.src = './src/blocks/img/floor.png'
  }
  render (c, posOff){
    if (this.sprite){
      c.drawImage(this.sprite, this.pos.x + posOff.x, this.pos.y, 32, 32)
    }
  }
}


export function NewGrid(x,y){
  return {x: x * 32, y : y * 32}
}