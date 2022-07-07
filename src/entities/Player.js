export class Player {
  constructor(walls, pos, posOff){
    this.pos = {}
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.size = { x: 32, y: 43 };
    this.velh = 0;
    this.velv = 0;
    this.vel = 4
    this.walls = walls
    this.posOff = posOff
    this.keys = {
      up:false,
      left:false,
      right:false}
    this.sprites = {}
    this.sprite = null
    this.setSprites()
    this.frameAtual = 0
    this.frameElapsed = 0
    this.frameTimeOver = 10;
  }

  createSprite( { name, url, frames = 1 } ){
    const img = new Image;
    img.src = url;
    this.sprites[name] = {
      spr : img,
      frames
    }
  }

  setSprites (){
    this.sprites.size = {w:32, h:44}
    this.createSprite({
      name: 'run', 
      url:'./src/entities/img/MarioRun.png',
      frames:2})
    this.createSprite({
      name: 'idle', 
      url:'../src/entities/img/MarioIdle.png'})
    this.createSprite({
      name: 'jump', 
      url:'.//src/entities/img/MarioJump.png'})
    this.createSprite({
      name: 'fall', 
      url:'./src/entities/img/MarioFall.png'})
      this.sprite = this.sprites.run
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

  updateFrames() {
    if (this.frameElapsed <= this.frameTimeOver){
      this.frameElapsed++
      return
    }
    this.frameElapsed = 0
    if ((this.frameAtual + 1) < this.sprite.frames){
      this.frameAtual += 1
      return
    }
    this.frameAtual = 0
  }

  render(c){
    this.updateFrames()
    //console.log(typeof this.sprite.run.spr)
    c.drawImage(this.sprite.spr, (this.pos.x + this.posOff.x), this.pos.y)
    //c.fillStyle = 'red'
    //c.fillRect(this.pos.x + this.posOff.x, this.pos.y, this.size.x, this.size.x);    
  }
}
