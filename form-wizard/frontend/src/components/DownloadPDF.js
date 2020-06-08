import React from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default class DownloadPDF extends React.Component{
    generatePDF = async () => {
       const existingPdfBytes = await fetch("https://www.irs.gov/pub/irs-pdf/fw8bene.pdf");
       const pdfDoc = await PDFDocument.load(existingPdfBytes);
    }

    render(){
        let isVisible = this.props.currentStep !== this.props.questionStep ? "none" : "flex"
        return( <div className="question-flex-container" style={{ display: isVisible }}>
                    <button onClick={this.generatePDF}>Generate PDF</button>
                </div> 
        );
    }
}