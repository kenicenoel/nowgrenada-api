const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 3000;
var compression = require('compression');
var helmet = require('helmet');
let baseUrl = 'http://nowgrenada.com'; // Enter the website you want to scrape
let axios = require('axios');
let cheerio = require('cheerio');


app.use(cors());
app.use(compression()); //Compress all routes
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// start the server
app.listen(PORT, function () {
    console.log('Started Now Grenada Scraper');
});


app.get('/nowgrenada', (req,res) => {
    res.status(200).send(`Welcome to the Now Grenada Scraper. To scrape a site. Navigate to the /scrape path.`);
});

app.get('/nowgrenada/scrape', (req,res) => 
{
    // Use Axio to load the website and then loop through the elements with cheerio getting the data needed (:)
    axios.get(baseUrl)
    .then((response) => {
        
        let article = {
            newsTitle: '',
            newsImage: '',
            newsSummary: '',
            url: ''
        }


        let $ = cheerio.load(response.data);
        let articles = [];
        $('.post-wrap').each((i, element) => 
        {
            let title = $(element).children().find('h1.h3').text();
            let url = $(element).children().find('h1.h3').find('a').attr('href');
            let img = $(element).children().find('.post-thumb').find('img').attr('src');
            let content = $(element).children().find('div.post-content').find('a').attr('href');
            article = {
                "newsTitle": title,
                "newsImage": img,
                "newsSummary": content,
                "url": url
            }
            articles.push(article);

        });
        console.log(articles);
        res.status(200).send(articles);

    });
});
