const images = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

const processedImages = {};
for (const path in images) {
  const fileName = path.split('/').pop(); // Get filename from path
  processedImages[fileName] = images[path].default;
}

export default processedImages;