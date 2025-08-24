const express = require('express');


require("dotenv").config();

const app = express();


const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    console.log("Dream Stage API's Working")
    res.json({
        success: true,
        data: "Dream Stage Data"
    })
})

app.listen(port, () => {
    console.log(`Dream Stage Backend is listening on PORT ${port}`)
})

