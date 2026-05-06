import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const assets = path.join(dist, 'assets')

function sizeKB(file) {
  const bytes = fs.statSync(file).size
  return (bytes / 1024).toFixed(2)
}

if (!fs.existsSync(assets)) {
  console.log('No dist/assets folder found. Run npm run build first.')
  process.exit(0)
}

const files = fs.readdirSync(assets)
  .map(name => path.join(assets, name))
  .filter(file => fs.statSync(file).isFile())

console.log('\nProduction asset size report')
console.log('--------------------------------')
for (const file of files) {
  console.log(`${path.basename(file)}: ${sizeKB(file)} KB`)
}
console.log('--------------------------------')
console.log('Tip: Compare this with the CSS loaded during npm run dev.')
