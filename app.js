const  express = require('express');
const app = express()
const afterLoad = require('after-load')
const htmlToText = require('html-to-text');

const bodyparser = require('body-parser')
var scrapedHtml;
var text;
var processedText
app.get('/extract', (req, res) => {
   // console.log(req.params.text)
    //console.log(req.params.query)

    afterLoad(req.query.url, function(html){
      scrapedHtml=html
    });
  
 
   text = htmlToText.fromString(scrapedHtml);
    console.log(text);
    processedText = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    processedText=processedText.replace(/[^a-zA-Z 0-9]/g, " ")
    return res.json({text:processedText});
  
});

app.listen(process.env.PORT||3000,()=>{
    console.log(`App listening on Port ${process.env.PORT||3000}!`)
})
