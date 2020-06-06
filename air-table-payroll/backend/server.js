const express = require('express');
const cors = require('cors');
const Airtable = require('airtable');

Airtable.configure({ 
    endpointUrl: 'https://api.airtable.com', 
    apiKey: 'key9HhMXK5qGlNGsi'
});
const base = Airtable.base('appmeVwoeMWJC8G74');

const app = express();
app.use(cors());
app.get("/", (req,res,next) => { 
        base('Table 1').select({view: 'Grid view' }).firstPage((err, records) => {
            if (err) { console.error(err); return; }
            let result = [];
            records.forEach((record) => result.push(record.fields));
            req.data = result;
            next();
        })} ,(req,res) => res.json(req.data));

app.listen(5000,() => {
    console.log(`Running on port ${5000}`);
})