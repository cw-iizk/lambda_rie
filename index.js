const { PDFDocument } = require('pdf-lib');

exports.handler = async (event) => {
  // Replace 'base64Data' with your actual Base64-encoded image data
  const base64Data = event.body;

  try {
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const image = await pdfDoc.embedPng(imageBuffer);
    
    // Get the original width and height of the image
    const { width, height } = image.size();
    
    // Calculate the scaled width and height
    const scaledWidth = width * 0.5;
    const scaledHeight = height * 0.5;
    
    const { width: pageWidth, height: pageHeight } = page.getSize();
    page.drawImage(image, {
      x: pageWidth / 2 - scaledWidth / 2,
      y: pageHeight / 2 - scaledHeight / 2,
      width: scaledWidth,
      height: scaledHeight,
    });
    
    const pdfBytes = await pdfDoc.save();
    
    return {
      statusCode: 200,
      body: pdfBytes.toString('base64'),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
