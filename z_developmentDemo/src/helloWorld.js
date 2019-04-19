const HELLO_WORLD = 'hello world',
  appEl = document.querySelector('#app'),
  H2El = document.createElement('h2')
  // H2El = null
H2El.innerHTML = HELLO_WORLD
appEl.appendChild(H2El)
