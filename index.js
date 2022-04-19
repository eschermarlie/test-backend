const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/getFeed', async (req, res,next) => {
    console.log("'/getFeed' called.");
    try {
        const response = await axios.get("https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=true");
        console.log(response.data);
        let data = response.data;
        console.log(data.items);
        res.send(data.items);
    }
    catch (err) {
        next(err)
    }
});

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
});