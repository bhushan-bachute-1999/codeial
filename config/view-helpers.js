const env = require('./environment');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    app.locals.assetPath = function (filePath) {
        console.log("In view helpers : ", env.name);
        if (env.name == 'development') {
            // console.log("In view helpers : ", env.name);
            return filePath;
        }
        console.log("Rev manifest : ", JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath]);
        console.log("File path : ", filePath);
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}