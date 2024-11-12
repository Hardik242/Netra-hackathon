const fs = require("fs");
const path = require("path");

const imageDirectory = "./_weapons";

try {
    for (let i = 1; i <= 100; i++) {
        const index = (i % 21) + 1;
        const baseFilename = `gun${index}`;
        const newFilename = `WPN${i.toString().padStart(5, "0")}.jpg`;

        const oldPath = path.join(imageDirectory, `${baseFilename}.jpg`);
        const newPath = path.join(imageDirectory, newFilename);

        // Check if the new file already exists
        if (!fs.existsSync(newPath)) {
            fs.copyFileSync(oldPath, newPath);
        }
    }
} catch (err) {
    console.error(`Error renaming files: ${err.message}`);
}
