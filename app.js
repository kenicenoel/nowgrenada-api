
const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3000;

let baseUrl = 'http://kenicenoel.com' // Enter the website you want to scrape

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// start the server
app.listen(PORT, function() {
    console.log('Started Now Grenada Scraper');
  });
  

app.get('/pdf', () =>
{
    savePdf(baseUrl, 'nowgrenada');
});

async function savePdf(url, outputName)
{
    try 
    {
        const browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();
        
        // navigate to website
        await page.goto(url);
        console.log(`navigated to ${url}`);
        
        // take a screenshot of the page and save to /screenshots/page/outputName
        await page.screenshot({
            path: './screenshots/'+outputName+'.png'
        });

        // generate a pdf of the page
        await page.pdf({path: './pdfs/'+outputName+'.pdf'});
        await browser.close();
        res.status(200).send(`Saved page as ${outputName}.pdf in /pdfs folder `);
    } 
    catch (error) 
    {
        console.log(error);   
    }
}



