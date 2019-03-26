import './assets/index.css'
import ballIcon from './assets/ball.svg'
import bar from './utils/bar'

bar()

window.onload = function() {
  const imgEl = document.createElement('img')
  imgEl.src = ballIcon
  document.body.appendChild(imgEl)
}
