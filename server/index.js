const express = require('express');
const port = 4000;
// cross origin resource sharing - tells the browser that we allow the requests coming from different URLs(different origins).
// provides Express middleware.  
const cors = require('cors');
// google's unofficial api for text to speech conversion
const gtts = require('node-gtts')('en-uk');
// provides a away to work with directories and file path
const path = require('path');
//web scrapper
const puppeteer = require('puppeteer');
const { dirname } = require('path');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const TextToSpeech = async (url, name) => {
    const filepath = path.join(__dirname, `${name}.mp3`);
    const browser = puppeteer.launch();
    const page = browser.newPage();
    await page.goto();

    // extract all the inner text
    const content = await page.$eval("*", (el) => el.innerText);
    // strip off all the black n whitespaces
    const strippedContent = content.replace(/\s+/g, " ").trim();
    //save the audio file in the filepath specified
    gtts.save(filepath, strippedContent, function(){
        console.log('Audio saved in the specified filepath!');
    });
    await browser.close();
}

app.post('/get_text', function(req, res) {
    let { url, name } = req.body;
    TextToSpeech(url, name);
})

app.listen(3000, function() {
    console.log(`Server listing at port ${port}`);
});
