import bar from './bar.js'

window.onload = function() {
  const divEle = document.getElementById('app')
  divEle.innerHTML = `<h2>${bar()}</h2>`
}
