const  express = require('express');
const app = express()
const afterLoad = require('after-load')
const htmlToText = require('html-to-text');

const bodyparser = require('body-parser')
var scrapedHtml;
var text;

app.get('/extract', (req, res) => {
   // console.log(req.params.text)
    //console.log(req.params.query)

    afterLoad(req.query.url, function(html){
      scrapedHtml=html
    });
  
 
   text = htmlToText.fromString(scrapedHtml);
    console.log(text);
    return res.json({text:text});
  
});

app.listen(process.env.PORT||3000,()=>{
    console.log(`App listening on Port ${process.env.PORT||3000}!`)
})
