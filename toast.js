const puppeteer = require("puppeteer");
const chalk = require("chalk");
const log = console.log;

const crumbs = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.toasttab.com/echo-bravo-bar-445-troutman-street/v3"
  );

  await page.waitForSelector('ul[data-testid="menu-items"]');
  const menuInfo = await page.evaluate(() => {
    let data = [];
    data.push({
      name: document.querySelectorAll("h1")[0].innerText,
      desc: document.querySelectorAll("h1 + p")[0].innerText.split("\n")[0],
      price: "$$$",
    });
    const items = document.querySelectorAll(
      'ul[data-testid="menu-items"] > li'
    );
    for (const item of items) {
      const arr = item.innerText.split("\n\n");
      const name = arr[0] || "XXX";
      const desc = arr[1] || "";
      const price = arr[2] || desc;
      const time = +new Date();
      if (name) {
        data.push({ name, desc, price, time });
      }
    }
    return data;
  });

  for (let c of menuInfo) {
    log(
      chalk.rgb(
        255,
        50,
        255
      )(` ${c.name}, ${c.price}: ${c.price != c.desc ? c.desc : "---"}`)
    );
  }
  await browser.close();
};
crumbs();
log(chalk.green("crumbs"));
