const fs = require('fs');
const path = require('path');

// Simple WebP conversion script
const imagesDir = './src/assets/images';
const optimizedDir = './src/assets/images/optimized';

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(imagesDir).filter(file => 
  /\.(jpg|jpeg|png)$/i.test(file)
);

console.log('Found images to optimize:', imageFiles);

// Generate optimized image references
imageFiles.forEach(file => {
  const baseName = path.parse(file).name;
  const ext = path.parse(file).ext;
  
  console.log(`${baseName}${ext} -> ${baseName}.webp`);
  
  // Create a mapping object for easy reference
  const mapping = {
    original: file,
    webp: `${baseName}.webp`,
    path: {
      original: `../assets/images/${file}`,
      webp: `../assets/images/optimized/${baseName}.webp`
    }
  };
  
  console.log(JSON.stringify(mapping, null, 2));
});

console.log('\nTo use these optimized images:');
console.log('1. Convert images to WebP using tools like:');
console.log('   - cwebp -q 80 input.jpg -o output.webp');
console.log('   - squoosh.app (online tool)');
console.log('   - ImageOptim CLI');
console.log('\n2. Update imports in components to use webp versions');
