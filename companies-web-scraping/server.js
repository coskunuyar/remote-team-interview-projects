const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const Airtable = require('airtable');

Airtable.configure({ 
    endpointUrl: 'https://api.airtable.com', 
    apiKey: 'key9HhMXK5qGlNGsi'
});
const base = Airtable.base('apph5h80dhvflkuI9');

const people_selector = '.link-without-visited-state.inline-block.ember-view';
const next_button = ".artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view";
const last_item = ".artdeco-pagination__pages.artdeco-pagination__pages--number li:last-child span";
const person_name = "h3 .actor-name";
const person_title = ".subline-level-1.t-14.t-black.t-normal.search-result__truncate";
const person_location = ".subline-level-2.t-12.t-black--light.t-normal.search-result__truncate";
const waiting_time = 4000;

const delay  = (time) =>  new Promise(function(resolve) { setTimeout(resolve, time) });

const savePeople = (people) => {
    base('People').create(people, (err,records) => {
          if(err){
              console.log(err);
          }else{
              console.log(records);
          }
      });
}

const findAndSavePeople = (companyName) => {
        puppeteer.launch({ headless: true })
            .then(async (browser) => {
                let page = await browser.newPage();
                page.setViewport({ width: 1366, height: 2000 });
                await page.goto(`https://www.linkedin.com/company/${companyName}/about`, { waitUntil: 'domcontentloaded' });
                await delay(waiting_time);
                
                await page.click(people_selector);
                await delay(waiting_time);

                let content = await page.content();
                let $ = cheerio.load(content);
                let numberOfPages = 0;
                if(content) numberOfPages = $(last_item).text();

                let listName = [];
                let listTitle = [];
                let listLocation = [];
                for(let i=1; i<=numberOfPages; i++){
                    console.log("processing");
                    let content = await page.content();
                    if(content){
                        let $ = cheerio.load(content);
                        $(person_name).each((index, element) => {
                            listName.push($(element).text().trim());
                        });
                        $(person_title).each((index, element) => {
                            listTitle.push($(element).text().trim());
                        });
                        $(person_location).each((index, element) => {
                            listLocation.push($(element).text().trim());
                        });
                        await page.click(next_button);
                        await delay(waiting_time);
                    }else{
                        console.log("There is no content!");
                        process.exit();
                    }
                }
                let result = [];
                for(let i=0; i<listName.length; i++){
                    result.push({
                        "fields": {
                            "Name": listName[0],
                            "Location": listLocation[0],
                            "Title": listTitle[0],
                            "Company": companyName
                            }
                    });
                }
                savePeople(result);
            }).catch((err) => {
                console.log("Something went wrong!" , err);
                process.exit();
            });
};


base('Companies').select({view: 'Grid view' }).firstPage((err, records) => {
    if (err) { console.error(err); return; }
    let result = [];
    records.forEach((record) => result.push(record.fields["Name"]));
    for(let i=0; i<result.length; i++){
        findAndSavePeople(result[i]);
    }
});