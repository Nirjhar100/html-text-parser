const express = require('express');
const app = express()
const afterLoad = require('after-load')
const htmlToText = require('html-to-text');

const bodyparser = require('body-parser')

const chrono =require('chrono-node')
var scrapedHtml;
var text;
var processedText
var dates;
app.get('/extract', (req, res) => {
   // console.log(req.params.text)
    //console.log(req.params.query)

    afterLoad(req.query.url, function(html){
      scrapedHtml=html
    });
  
 
   text = htmlToText.fromString(scrapedHtml);

    processedText = text.replace(/(?:https?|ftp):\/\/[\S]+/g, ' ');
    processedText=processedText.replace(/[^a-zA-Z 0-9/(.)/(')/(,)]/g, " ")
    dates= chrono.parse(processedText)

    dates&&dates.map(res=>{
      processedText = processedText.slice(0, res.index) 
                    + "<date>" 
                    + processedText.slice(res.index); 
    })

    return res.json({text:processedText});
  
});

app.listen(process.env.PORT||3000,()=>{
    console.log(`App listening on Port ${process.env.PORT||3000}!`)
})
