import { bar } from './bar'
import LoadingIcon from '../public/imgs/loading.svg'
import '../public/base.css'

window.onload = function() {
  const APP_EL = document.querySelector('#app'),
    H2_EL = document.createElement('h2'),
    LOADINGICON_EL = document.createElement('img')
  H2_EL.innerHTML = bar()
  LOADINGICON_EL.src = LoadingIcon
  APP_EL.appendChild(H2_EL)
  APP_EL.appendChild(LOADINGICON_EL)
}
