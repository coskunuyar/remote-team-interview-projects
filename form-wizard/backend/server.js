const express = require('express');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const app = express();

app.get("/form",async (req,res) => {
    fs.readFile('./form.pdf', async function read(err, data) {
        res.sendFile(data);
    });
});

app.listen(5000,() => {
    console.log(`Running on port ${5000}`);
})
