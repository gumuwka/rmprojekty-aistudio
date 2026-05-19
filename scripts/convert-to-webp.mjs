/**
 * Converts all PNG and JPG images in public/assets to WebP format.
 * Uses correct sharp-cli v5.x syntax: --format webp --quality 82
 */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'public', 'assets');

async function getAllImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log('🔍 Scanning for PNG/JPG images...');
  const images = await getAllImages(assetsDir);
  console.log(`Found ${images.length} images to convert.\n`);

  let totalSavedBytes = 0;
  let converted = 0;

  for (const imgPath of images) {
    const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
      const originalStat = await fs.stat(imgPath);
      const originalSizeKB = Math.round(originalStat.size / 1024);

      // Correct sharp-cli v5 syntax: --format webp --quality 82
      const cmd = `npx sharp-cli --input "${imgPath}" --output "${webpPath}" --format webp --quality 82 resize 1920 1920 --fit inside --withoutEnlargement`;
      execSync(cmd, { stdio: 'pipe' });

      const newStat = await fs.stat(webpPath);
      const newSizeKB = Math.round(newStat.size / 1024);
      const savedKB = originalSizeKB - newSizeKB;
      const savedPct = Math.round((savedKB / originalSizeKB) * 100);
      totalSavedBytes += (originalStat.size - newStat.size);
      converted++;

      const relPath = path.relative(assetsDir, imgPath);
      console.log(`✅ ${relPath}: ${originalSizeKB}KB → ${newSizeKB}KB (-${savedPct}%)`);
    } catch (err) {
      const relPath = path.relative(assetsDir, imgPath);
      console.error(`❌ Failed ${relPath}: ${err.message.split('\n')[0]}`);
    }
  }

  console.log(`\n🎉 Done! Converted ${converted}/${images.length} images.`);
  console.log(`💾 Total saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
