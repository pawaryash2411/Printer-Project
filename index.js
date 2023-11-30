const express = require("express");
const ThermalPrinter = require("node-thermal-printer").printer;

const app = express();
const port = process.env.PORT || 8080;

// Middleware for printing
const printMiddleware = (req, res, next) => {
    const printer = new ThermalPrinter({
        type: "epson",
        interface: "/dev/usb/lp0", //Random Interface Specification
        options: {
            timeout: 3000
        }
    });

    printer.bold(true);
    printer.setTextSize(3);

    let paragraph = "The Taj Mahal  is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan to house the tomb of his beloved wife, Mumtaz Mahal it also houses the tomb of Shah Jahan himself. The tomb is the centrepiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.";

    const para = paragraph.split("\n");

    para.forEach((line) => {
        printer.print(line);
        printer.newLine();
    });

    printer.cut();
    printer.alignCenter();

    printer.execute()
        .then(() => {
            console.log("Printing successful!!");
            next();
        })
        .catch((error) => {
            console.log("Printing Failed!!", error);
            res.status(500).send("Printing failed!!");
        });
};

// Route to trigger printing
app.get("/print", printMiddleware, (req, res) => {
    res.send("Printing request received and processed.");
});

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});
