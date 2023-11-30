const Express = require("express");
const printTheParagraph = require("./printData.js");
const app = Express();
const Port = 8080;

// Calling the PrintTheParagraph function
printTheParagraph()

app.listen(Port, () => {
    console.log(`server is running on PORT ${Port}`);
})