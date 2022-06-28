export class Player {
  constructor(walls, pos, posOff){
    this.pos = {}
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.size = { x: 32, y: 48 };
    this.velh = 0;
    this.velv = 0;
    this.vel = 4
    this.walls = walls
    this.posOff = posOff
    this.keys = {
      up:false,
      left:false,
      right:false}
    this.sprite = {}
    this.setSprites()
  }

  setSprites (){
    this.sprite.run = new Image()
    this.sprite.run.src = './src/entities/img/run.png'
  }

  move(){
    if (this.keys.right){
      this.velh = this.vel
    }else if (this.keys.left){
      this.velh = -this.vel
    }else{
      this.velh = 0
    }
    if (this.keys.up && this.haveFloor()){
      this.velv = -12
      this.keys.up = false
    }

    this.colisionAndMove()
    this.moveCam()
    this.gravity()
  }

  moveCam(){
    const posReal = this.pos.x  + this.posOff.x
    if (posReal >= 400 && this.velh >=1){
      this.posOff.x -= this.velh
    }else if (posReal <=100 && this.velh <= -1 && this.posOff.x < 0){
      this.posOff.x -= this.velh
    }
  }

  colisionAndMove(){
    //horizontal
    for (let wall of this.walls){
      if (this._collX(this.velh, wall)){
        const side = this.velh > 1 ? 1 : -1
        while(!this._collX(side, wall)){
          this.pos.x += side
        }
        this.velh = 0;
      }
    }
    this.pos.x += this.velh
    
    //vertical
    for (let wall of this.walls){
      if(this._collY(this.velv,wall)){
        const side = this.velv > 1 ? 1 : -1;
        while(!this._collY(side, wall)){
          this.pos.y += side
        }
        this.velv = 0;
      }
    }
    this.pos.y += this.velv;
  }

  _collX(vh, wall){
    const nextX = this.pos.x + Math.ceil(vh);
    if (nextX <= wall.pos.x + wall.size.w &&
    wall.pos.x <= nextX + this.size.x &&
    this.pos.y <= (wall.pos.y + wall.size.h) &&
    (this.pos.y + this.size.y) >= wall.pos.y){
      return true
    }
    return false
  }

  _collY(vv, wall){
    const nextY = this.pos.y + Math.ceil(vv);
    if(nextY <= wall.pos.y + wall.size.h &&
    wall.pos.y <= nextY + this.size.y &&
    this.pos.x <= wall.pos.x + wall.size.w &&
    wall.pos.x <= this.pos.x + this.size.x){
      return true
    }
    return false
  }

  gravity(){
    if (!this.haveFloor()) {
      this.velv += 0.4;
      return
    }
    this.velv = 0
  }

  haveFloor(){
    const down = this.pos.y + 1
    for (let wall of this.walls){
      if (
        wall.pos.x <= this.pos.x + this.size.x &&
        this.pos.x <= wall.pos.x + wall.size.w &&
        wall.pos.y <= down + this.size.y &&
        down <= wall.pos.y + wall.size.h){
          return true
          break;
      }
    }
  }


  render(c){
    c.drawImage(this.sprite.run, this.pos.x + this.posOff.x , this.pos.y)
    //c.fillStyle = 'red'
    //c.fillRect(this.pos.x + this.posOff.x, this.pos.y, this.size.x, this.size.x);    
  }
}
