class Enemy {
	constructor (walls, pos, posOff) {
		this.pos = {}
		this.pos.x = pos.x;
		this.pos.y = pos.y;
		this.size = { x: 32, y: 32 };
		this.velh = 0;
		this.velv = 0;
		this.vel = 5
		this.walls = walls
		this.posOff = posOff
    this.color = 'red'
	}

  move(){
    this.colisionAndMove()
    this.gravity()
  }

  
  colisionAndMove(){
    //horizontal
    for (let wall of this.walls){
      if (this.velh === 0 ) continue;
      if (this._collX(this.velh, wall)){
        const side = this.velh > 1 ? 1 : -1
        console.log(side, 'side')
        while(!this._collX(side, wall)){
          this.pos.x += side
        }
        this.velh = 0;
      }
    }
    this.pos.x += this.velh
    
    // vertical
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
      }
    }
  }


  render(c){
    c.fillStyle = this.color
    c.fillRect(this.pos.x + this.posOff.x, this.pos.y, this.size.x, this.size.y)
    //c.drawImage(this.sprite.spr, 0 + (this.frameAtual * w), 0, w, h, (this.pos.x + this.posOff.x), this.pos.y, w, h)
  }
}

export default Enemy;
