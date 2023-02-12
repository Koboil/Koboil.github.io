var container = document.querySelector('.container');
var tete = document.querySelector('.tete');
var window_content = document.querySelector('.window');

var state = { distX: 0, distY: 0 };

function onDown(e) {
  e.preventDefault();

  var evt = e.type === 'touchstart' ? e.changedTouches[0] : e;

  state.distX = Math.abs(tete.offsetLeft - evt.clientX);
  state.distY = Math.abs(tete.offsetTop - evt.clientY);
  
  tete.style.pointerEvents = 'none';
};
function onUp(e) {
  tete.style.pointerEvents = 'initial';
};
function onMove(e) {
  if (tete.style.pointerEvents === 'none') {
    var evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
    
    tete.style.left = `${evt.clientX - state.distX}px`;
    tete.style.top = `${evt.clientY - state.distY}px`;
    window_content.style.left = `${evt.clientX - state.distX}px`;
    window_content.style.top = `${evt.clientY - state.distY}px`;
  };
};

tete.addEventListener('mousedown', onDown);
container.addEventListener('mousemove', onMove);
container.addEventListener('mouseup', onUp);







  
