import imagemin from 'imagemin';
import path from 'path';
import fs from 'fs/promises';

// Define the folder where images are output by Webpack
const imagesDir = path.join(process.cwd(), 'dist/assets');

// Check if the directory exists before running optimization
(async () => {
    try {
        await fs.access(imagesDir); // Ensure the folder exists
        const files = await imagemin([`${imagesDir}/*.{jpg,png,gif,svg,webp}`], {
            destination: imagesDir,
            plugins: []
        });

        console.log(`Optimized ${files.length} images`);
    } catch (err) {
        console.error(`Error: The folder ${imagesDir} does not exist or couldn't be accessed.`);
    }
})();