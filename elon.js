const puppeteer = require(`puppeteer`);

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://twitter.com/elonmusk/status/1590755506112823296?cxt=HHwWgIDQpYztv5MsAAAA"
  );

  await page.waitForNetworkIdle();

  //   let count = 15;
  //   const tweets = [];
  //   while (count > 0) {
  //     let showMore = await page.evaluate(() => {
  //       let el = document.querySelector(".foo");
  //       return el ? el.innerText : "";
  //     });
  //   }

  const all = await page.$$eval(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > article > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(-n+3) > div:nth-child(-n+3) > div.css-901oao.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0 > span",
    (elements) => elements.map((e) => e.textContent)
  );
  //   console.log(all);

  await page.exposeFunction("puppeteerLogMutation", async () => {
    console.log(`Mutation Detected`);
    const all2 = await page.$$eval(
      "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > article > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(n) > div:nth-child(n) > div.css-901oao.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0 > span",
      (elements) => elements.map((e) => e.textContent)
    );
    //console.log(all2);
  });

  await page.evaluate(() => {
    const timeline = document.querySelector(
      "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div"
    );
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          puppeteerLogMutation();
        }
      }
    });
    observer.observe(timeline, { childList: true });
    const newTweets = observer.takeRecords();
    console.log(`NEW TWEETS`, newTweets);
  });

  const [response] = await Promise.all([
    // page.waitForNavigation(),
    page.click(
      "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > section > div > div > div:nth-child(n) > div > div > div > div > div > span"
    ),
  ]);

  await page.waitForNetworkIdle();
})();
