const puppeteer = require('puppeteer')
const chalk = require('chalk')
const log = console.log

const crayHolaWorld = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors')
  let colors = []
  await page.waitForSelector('.wikitable tbody tr')
  const colorInfo = await page.evaluate(() => {
    let data = []
    colors = document.querySelectorAll('.wikitable tbody tr')
    for (const color of colors) {
      const name = color.innerText.split('\t')[1] || 'XXX'
      const bg = color.children[0].style.background
      const time = +new Date()
      if (name && bg) {
        data.push({ name, bg, time })
      }
    }
    return data
  })
  const regExp = /\(([^)]+)\)/;
  for(let c of colorInfo){
    var matches = regExp.exec(c.bg)
    var values = matches[1].split(', ')
    log(chalk.rgb(+values[0], +values[1], +values[2])(`${c.bg} - ${c.name}`))
  }
  await browser.close()
}
crayHolaWorld()
log(chalk.green('crayHolaWorld'))
