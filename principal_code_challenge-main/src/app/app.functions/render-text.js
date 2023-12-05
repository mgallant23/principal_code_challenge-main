const axios = require('axios');
const fs = require('fs');
const TextToSVG = require('text-to-svg');


async function downloadAndLoadFont(url, path) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(path, response.data);
  return TextToSVG.loadSync(path);
}

exports.main = async (context = {}, sendResponse) => {
  const textToSVG = await downloadAndLoadFont('https://3967897.fs1.hubspotusercontent-na1.net/hubfs/3967897/VictorMono-Medium.ttf', '/tmp/VictorMono-Medium.ttf');
  var { text } = context.parameters;

  text = JSON.stringify(text, null, 2);

  // Split the stringified text by lines
  const lines = text.split('\n');

  const attributes = {fill: 'red', stroke: 'black'};
  const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

  // Modify each line to have a length of 40 characters and convert to SVG base64 encoded data URI
  const imgSrcArray = lines.map(line => {
    let modifiedLine = line;

    if (line.length > 40) {
      modifiedLine = line.substr(0, 40); // Truncate if longer
    } else if (line.length < 40) {
      modifiedLine = line.padEnd(40, ' '); // Right-pad if shorter
    } 

    const svgString = textToSVG.getSVG(modifiedLine, options);
    const base64SVG = Buffer.from(svgString).toString('base64');
    return `data:image/svg+xml;base64,${base64SVG}`;
  });

  try {
    sendResponse(imgSrcArray);
  } catch (error) {
    sendResponse(error);
  }
};
