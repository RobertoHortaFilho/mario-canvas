export function createKeyboardListener(p) {
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
}