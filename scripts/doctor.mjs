import {access, readFile} from 'node:fs/promises';

const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css', 'scripts/server.mjs'];
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

console.log(`Draftist directory: ${process.cwd()}`);
console.log(`Node: ${process.version}`);

if (process.cwd() !== new URL('..', import.meta.url).pathname.replace(/\/$/, '')) {
  console.warn('Note: npm was launched with a different working directory; file checks use the Draftist repository.');
}

for (const file of requiredFiles) {
  await access(new URL(`../${file}`, import.meta.url));
  console.log(`✓ ${file}`);
}

if (!packageJson.scripts?.dev) {
  throw new Error('The Draftist package.json does not contain the dev script.');
}

console.log(`✓ dev script: ${packageJson.scripts.dev}`);
console.log('Draftist setup is valid. Run: npm run dev');
