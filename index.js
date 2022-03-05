const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.siepomaga.pl/24h-dla-ukrainy";

setInterval(() => {
  try {
    console.log("Pobieram 🤖");
    axios.get(url).then(({ data }) => {
      const $ = cheerio.load(data);
      if($(".can-info .amount").text() !== "") {
        const amount = $(".can-info .amount").text();
        console.log(`💰 ${amount}`);
        fs.writeFileSync("siepomaga.txt", `Stan zbiórki: ${amount}. `);
      }
    });
  } catch (error) {
    console.log("Coś poszło nie tak (call Korsi 505 172 249):")
    console.log(error);
  }
}, 20000);
