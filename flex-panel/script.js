const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  this.classList.add('open');
}

function toggleActive(e) {
  if(e.propertyName.includes('flex') && e.target.classList.value.includes('open')){
    this.classList.add('open-active')
  }
}

function setStandart(e) {
  this.classList.remove('open');
  this.classList.remove('open-active');
}

panels.forEach(panel => panel.addEventListener('mouseover', toggleOpen));
panels.forEach(panel => panel.addEventListener('mouseout', setStandart));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
