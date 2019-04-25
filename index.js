const puppeteer = require('puppeteer')
const chalk = require('chalk')

const heyo = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors')
  //await page.screenshot({path: 'example.png'})
  let colors = []
  await page.waitForSelector('.wikitable tbody tr')
  
  const colorInfo = await page.evaluate(() => {
    let data = []
    colors = document.querySelectorAll('.wikitable tbody tr')
    for (const color of colors) {
      console.log(color)
      const name = color.children[1].innerText || 'XXX'
      const bg = color.children[0].style.background
      const time = +new Date()
      data.push({ name, bg, time })
    }
    return data
  })
  console.log('>', colorInfo)
  console.log('<', data)

  await browser.close()
}

heyo()
console.log(chalk.green('heyo'))
