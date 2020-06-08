const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.get("/form",async (req,res) => {
    res.sendFile(path.join(__dirname, 'form.pdf'));
});

app.listen(5000,() => {
    console.log(`Running on port ${5000}`);
})
