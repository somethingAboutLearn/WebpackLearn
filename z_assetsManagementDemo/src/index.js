import './assets/index.css'
import ballIcon from './assets/ball.svg'
import database from './assets/database.csv'
import data from './assets/data.xml'
import bar from './utils/bar'

bar()

window.onload = function() {
  // 加载图片
  const imgEl = document.createElement('img'),
    imageEl = document.getElementById('image')
  imgEl.src = ballIcon
  imageEl.appendChild(imgEl)

  // 加载 xml 文件
  const xmlEl = document.getElementById('xml'),
    sectionEl = document.createElement('section')
  sectionEl.innerText = JSON.stringify(data)
  xmlEl.appendChild(sectionEl)
  console.log(data)

  // 加载 csv
  const csvEl = document.getElementById('csv'),
    sectionEl1 = document.createElement('section')
  sectionEl1.innerText = JSON.stringify(database)
  csvEl.appendChild(sectionEl1)
  console.log(database)
}
