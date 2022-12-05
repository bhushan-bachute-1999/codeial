const express = require('express'); // Include module express
const port = 8000;// Define port

const app = express();
app.use('/', require('./routes/index'));

// Listen on port 8000
app.listen(port, function (err) {
    if (err) {
        console.log(`Error :${port}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});
