import React from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';

export default class DownloadPDF extends React.Component{

    generatePDF = async() => {
          const { name , surname ,organizationName ,organizationCountry ,address} = this.props.data
          debugger;
          // Fetch an existing PDF document
          const url = 'http://localhost:5000/form'
          const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
          // Load a PDFDocument from the existing PDF bytes
          const pdfDoc = await PDFDocument.load(existingPdfBytes)
    
          // Embed the Helvetica font
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
          const signatureFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

          // Get the first page of the document
          const pages = pdfDoc.getPages()
          const firstPage = pages[0]
          const lastPage = pages[pages.length - 1];
          // Get the width and height of the first page
          const { width, height } = firstPage.getSize()
    
          // Draw a string of text diagonally across the first page
          firstPage.drawText(organizationName, {
            x: (width * 15) / 100,
            y: (height * 70) / 100 ,
            size: 11,
            font: helveticaFont,
            color: rgb(0,0,0),
          });

          firstPage.drawText(organizationCountry, {
            x: (width * 65) / 100,
            y: (height * 70) / 100 ,
            size: 11,
            font: helveticaFont,
            color: rgb(0,0,0),
          });

          firstPage.drawText(address, {
            x: (width * 15) / 100,
            y: (height * 22) / 100 ,
            size: 11,
            font: helveticaFont,
            color: rgb(0,0,0),
          });

          let fullName = `${name} ${surname}`;
          lastPage.drawText(fullName,{
            x: (width * 25) / 100,
            y: (height * 16) / 100 ,
            size: 13,
            font: signatureFont,
            color: rgb(0,0,0),
          });

          lastPage.drawText(fullName,{
            x: (width * 60) / 100,
            y: (height * 16) / 100 ,
            size: 11,
            font: helveticaFont,
            color: rgb(0,0,0),
          });

          let today = new Date();
          lastPage.drawText(`${today.toISOString().substring(0, 10)}`,{
            x: (width * 83) / 100,
            y: (height * 16) / 100 ,
            size: 10,
            font: helveticaFont,
            color: rgb(0,0,0),
          });
    
          // Serialize the PDFDocument to bytes (a Uint8Array)
          const pdfBytes = await pdfDoc.save()
    
                // Trigger the browser to download the PDF document
          download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    }

    render(){
        let isVisible = this.props.currentStep !== this.props.questionStep ? "none" : "flex";
        return( <div className="question-flex-container" style={{ display: isVisible }}>
                    <button onClick={this.generatePDF}>Generate PDF</button>
                </div> 
        );
    }
}