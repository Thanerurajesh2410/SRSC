import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const webDistDir = path.resolve(rootDir, 'apps/web/dist');
const rootDistDir = path.resolve(rootDir, 'dist');

if (fs.existsSync(webDistDir)) {
  // Ensure .nojekyll and 404.html exist in webDistDir
  fs.writeFileSync(path.join(webDistDir, '.nojekyll'), '');
  fs.copyFileSync(path.join(webDistDir, 'index.html'), path.join(webDistDir, '404.html'));

  // Copy build to root dist folder
  fs.cpSync(webDistDir, rootDistDir, { recursive: true });

  // Read index.html content from webDist
  const distIndexContent = fs.readFileSync(path.join(webDistDir, 'index.html'), 'utf-8');

  // Write root index.html with base path handling
  fs.writeFileSync(path.join(rootDir, 'index.html'), distIndexContent);
  fs.writeFileSync(path.join(rootDir, '404.html'), distIndexContent);
  fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');

  console.log('✅ Successfully synced web build to root index.html, 404.html, and .nojekyll');
}
