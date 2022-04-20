const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const moment = require('moment');

app.use(express.json()) // for parsing application/json

app.use(cors())

app.get('/getFeed',cors(), async (req, res,next) => {
    console.log("'/getFeed' called.");
    try {
        let processedData = []
        const response = await axios.get("https://www.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&nojsoncallback=true&tags=cars");
        let data = response.data;
        for (i=0;i<data.items.length;i++){
            processedData.push({
                id: i,
                author: data.items[i].author.split('"')[1],
                avatarInitial: data.items[i].author.split('"')[1].charAt(0).toUpperCase(),
                published: moment(data.items[i].published).format('MMMM DD, YYYY'),
                media: data.items[i].media.m,
                description:  data.items[i].description.split('</p> <p>')[2] ? data.items[i].description.split('</p> <p>')[2].replace("</p>","") : 'No Description',
                shortDescription: data.items[i].description.split('</p> <p>')[2] ? data.items[i].description.split('</p> <p>')[2].replace(/(<([^>]+)>)/ig,'').length > 120 ? data.items[i].description.split('</p> <p>')[2].replace(/(<([^>]+)>)/ig,'').substr(0,120) + '[...]' : data.items[i].description.split('</p> <p>')[2].replace(/(<([^>]+)>)/ig,''):'No Description',
                // description: /<p>(.*?)<\/p>/g.exec(data.items[i].description)
            })
        }
        console.log(processedData);

        res.send(processedData);
    }
    catch (err) {
        next(err)
    }
});


app.post('/getFeedByTag',cors(), async (req, res,next) => {
    console.log("'/getFeedByTag' called.");
    console.log(req.body.tags);
    try {
        let processedData = []
        console.log(`https://www.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&nojsoncallback=true&tags=${req.body.tags}`)
        const response = await axios.get(`https://www.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&nojsoncallback=true&tags=${req.body.tags}`);
        let data = response.data;
        for (i=0;i<data.items.length;i++){
            processedData.push({
                id: i,
                author: data.items[i].author.split('"')[1],
                avatarInitial: data.items[i].author.split('"')[1].charAt(0).toUpperCase(),
                published: moment(data.items[i].published).format('MMMM DD, YYYY'),
                media: data.items[i].media.m,
                description:  data.items[i].description.split('</p> <p>')[2] ? data.items[i].description.split('</p> <p>')[2].replace("</p>","") : 'No Description',
                shortDescription: data.items[i].description.split('</p> <p>')[2] ? data.items[i].description.split('</p> <p>')[2].replace(/(<([^>]+)>)/ig,'').length > 120 ? data.items[i].description.split('</p> <p>')[2].replace(/(<([^>]+)>)/ig,'').substr(0,120) + '[...]' : data.items[i].description.split('</p> <p>')[2].replace(/(<([^>]+)>)/ig,''):'No Description',
                // description: /<p>(.*?)<\/p>/g.exec(data.items[i].description)
            })
        }
        console.log(processedData);

        res.send(processedData);
    }
    catch (err) {
        next(err)
    }
});

app.listen(port, () => {
    console.log(`backend listening on port ${port}`)
});