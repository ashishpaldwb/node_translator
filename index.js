const cors= require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to node translator app'});
});

app.post('/translate', async (req, res)=>{
    try {
        const { text } = req.body;
        if(!text || text.length===0){
            return res.status(400).json({ success: false, message: 'Invalid input!' });
        }
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'en');
        encodedParams.set('target_language', 'fr');
        encodedParams.set('text', text);

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '3f26dfaf24mshbbdf604934a6bc5p140414jsn7f91cfc22e59',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };
        const response = await axios.request(options);
        return res.status(200).json({success: true, translation: response.data.data["translatedText"] });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log('listening on port: ' + process.env.PORT||5000);
});