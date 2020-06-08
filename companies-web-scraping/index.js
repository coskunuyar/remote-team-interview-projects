const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const Airtable = require('airtable');

Airtable.configure({ 
    endpointUrl: 'https://api.airtable.com', 
    apiKey: ''
});
const base = Airtable.base('');

const cookies = require('./cookies.json'); // IMPORTANT
const your_email = "example@gmail.com"; // IMPORTANT
const your_password = "examplepassword1"; // IMPORTANT

const company_name = "coalitioninc";
const email_selector = '#username';
const password_selector = '#password';
const submit_selector = '#app__container > main > div > form > div.login__form_action_container > button';
const people_selector = '[data-tracking-control-name="org-employees_cta"]';
const next_button = ".artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view";
const last_item = ".artdeco-pagination__pages.artdeco-pagination__pages--number li:last-child span";
const person_name = "h3 .actor-name";
const person_title = ".subline-level-1.t-14.t-black.t-normal.search-result__truncate";
const person_location = ".subline-level-2.t-12.t-black--light.t-normal.search-result__truncate";
const waiting_time = 4000;

const delay  = (time) =>  new Promise(function(resolve) { setTimeout(resolve, time) });

const savePeople = (listName,listLocation,listTitle,companyName) => {
    console.log(listName);
    listName.forEach(async(name , index) => {
        await base('People').create([{
            "fields": {
                "Name": name,
                "Location": listLocation[index],
                "Title": listTitle[index],
                "Company": companyName
                }
        }], (err,records) => {
            if(err){
                console.log(err);
            }else{
                console.log(records);
            }
        });
    });
}
const findAndSavePeople = async (companyName) => {
        puppeteer.launch({ headless: false })
            .then(async (browser) => {
                let page = await browser.newPage();
                await page.setCookie(...cookies);
                await page.setViewport({ width: 1366, height: 2000 });
                await page.goto(`https://www.linkedin.com/company/${companyName}/about`, { waitUntil: 'domcontentloaded' });
                await delay(20000);

                await page.click(people_selector);
                await delay(waiting_time);
                await page.click('.main__sign-in-link');
                await delay(waiting_time - 2000);
                await page.click(email_selector)
                await page.keyboard.type(your_email);
                await page.click(password_selector);
                await page.keyboard.type(your_password);
                await page.click(submit_selector);
                await delay(waiting_time + 2000);
        

                let content = await page.content();
                let $ = cheerio.load(content);
                let numberOfPages = 0;
                if(content) numberOfPages = $(last_item).text();

                let listName = [];
                let listTitle = [];
                let listLocation = [];
                for(let i=1; i<=numberOfPages; i++){
                    console.log(`Processing page number ${i}`);
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
                savePeople(listName,listLocation,listTitle,companyName);
            }).catch((err) => {
                console.log("Something went wrong!" , err);
                process.exit();
            });
};


findAndSavePeople(company_name);