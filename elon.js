const puppeteer = require(`puppeteer`);
const map = new Map();

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://twitter.com/elonmusk/status/1590755506112823296?cxt=HHwWgIDQpYztv5MsAAAA",
    { waitUntil: "networkidle2" }
  );

  await page.waitForNetworkIdle();

  await page.waitForXPath(
    "//html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/section/div/div/div[1]/div/div/div[1]/article/div/div/div/div[3]/div[2]/div/div/span"
  );

  page.exposeFunction("puppeteerLogXPath", async () => {
    console.log(`Mutation Detected`);
    const xpath = await page.$x(
      //div[@class='css-901oao r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0']
      "//html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/section/div/div/div/div/div/div/article/div/div/div/div[2]/div[2]/div[2]"
      //"//html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/section/div/div/div//div[@class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0']/span | //html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/section/div/div/div//div[@class='css-1dbjc4n r-xoduu5 r-1udh08x']/span/span/span"
      // span[@class='css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0']"
      //| //html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/section/div/div/div[1]/div/div/div/article/div/div/div/div[3]/div[6]/div/div[3]/div/a/div/span/span/span"
    );

    console.log(xpath);
    for (const x of xpath) {
      const html = await page.evaluate((body) => body.innerText, x);
      console.log(html);
    }
  });

  await page.evaluate(() => {
    const timeline = document.querySelector(
      "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div"
    );

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          puppeteerLogXPath();
        }
      }
    });
    observer.observe(timeline, { childList: true, subtree: true });
  });

  // const all = await page.$$eval(
  //   "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > article > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(-n+3) > div:nth-child(-n+3) > div.css-901oao.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0 > span",
  //   (elements) => elements.map((e) => e.textContent)
  // );
  // console.log(all);

  // page.exposeFunction("puppeteerLogMutation", async () => {
  //   console.log(`Mutation Detected`);
  //   const newTweets = await page.$$eval(
  //     "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > article > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(n) > div:nth-child(n) > div.css-901oao.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0 > span",
  //     (elements) => elements.map((e) => e.textContent)
  //   );
  //   for (const tweet of newTweets) {
  //     if (!map.has(tweet)) map.set(tweet, false);
  //   }
  //   const likes = await page.$$eval(
  //     "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > article > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(n) > div:nth-child(n) > div.css-1dbjc4n.r-1ta3fxp.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-1mdbhws > div:nth-child(3) > div > div > div:nth-child(2) > span > span > span",
  //     (elements) =>
  //       elements.map((e) => {
  //         return e.textContent;
  //       })
  //   );

  //   // const newTweets = await page.$$eval(
  //   //   "#react-root > div > div > div > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > article > div > div > div > div > div > div:nth-child(n) > div:nth-child(n)",
  //   //   (elements) => elements.map((e) => e.value)
  //   // );
  //   console.log(newTweets, likes);
  //   // for (const element of newTweets) {
  //   //   console.log(element.childNodes.length);
  //   // }
  //   //
  // });

  // await page.evaluate(() => {
  //   const timeline = document.querySelector(
  //     "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div"
  //   );

  //   const observer = new MutationObserver((mutations) => {
  //     for (const mutation of mutations) {
  //       if (mutation.type === "childList") {
  //         puppeteerLogMutation();
  //         puppeteerLogXPath();
  //       }
  //     }
  //   });
  //   observer.observe(timeline, { childList: true, subtree: true });
  // });
  // const [response] = await Promise.all([
  //   // page.waitForNavigation(),
  //   page.click(
  //     "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > div > div > span"
  //   ),
  // ]);

  await page.waitForNetworkIdle();
})();
