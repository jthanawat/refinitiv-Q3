const request = require('request-promise');
const cheerio = require('cheerio');

async function main() {
  const result = await request.get('https://codequiz.azurewebsites.net', {
    headers: {
      cookie: 'hasCookie=true',
    },
  });
  const $ = cheerio.load(result);

  let td = [];
  let fundName = [];
  let nav = [];
  let value = '';

  $('td').each((index, element) => {
    td[index] = $(element).text().trim();
  });

  for (let i = 0; i <= td.length; i += 5) {
    if (td[i] === undefined) break;
    fundName.push(td[i]);
    nav.push(td[i + 1]);
  }

  const args = process.argv;
  fundName.forEach((item, index) => {
    if (item === args[2]) {
      value = nav[index];
    }
  });
  console.log(value);
}

main();
