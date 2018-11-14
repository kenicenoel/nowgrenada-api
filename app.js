
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


const baseUrl = 'http://nowgrenada.com' // Enter the website you want to scrape

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) =>
{
   // Use Axio to load the website and then loop through the elements with cheerio getting the data needed (:)
    axios.get(baseUrl).then( (response) => 
    {
        let article = {
            newsTitle: '',
            newsImage: '',
            newsSummary: '',
            url: ''
        }
        

        let $ = cheerio.load(response.data);
        let articles = [];
        let postWrap = $('.post-wrap').each((i, element) =>
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



