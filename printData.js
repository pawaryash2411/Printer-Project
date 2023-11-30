const ThermalPrinter = require("node-thermal-printer").printer;

const printTheParagraph = () => {
    // ,For Every New Print
    const printer = new ThermalPrinter({
        type: "epson",
        interface: "/dev/usb/lp0", //Random Interface Specification
        options: {
            timeout: 3000
        }
    })

    // Setting the Print Styling
    printer.bold(true);
    printer.setTextSize(3);

    // Creating the What to be Print
    let paragraph = "The Taj Mahal  is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan to house the tomb of his beloved wife, Mumtaz Mahal it also houses the tomb of Shah Jahan himself. The tomb is the centrepiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall."

    // Splitting paragraph into lines
    const para = paragraph.split("\n");

    para.forEach((line) => {
        printer.print(line);
        printer.newLine();
    })


    printer.cut();
    printer.alignCenter();

    printer.execute().catch((error) => {
        console.log("Printing Failed!!", error);
    });

}


module.exports = printTheParagraph;
