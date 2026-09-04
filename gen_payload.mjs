import { readFileSync, writeFileSync } from 'fs'

const files = [
  'package.json',
  'vite.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'vercel.json',
  'index.html',
  'public/favicon.svg',
  'src/main.jsx',
  'src/index.css',
  'src/data.js',
  'src/App.jsx',
  'src/lib/useReveal.js',
  'src/components/Reveal.jsx',
  'src/components/Hero.jsx',
  'src/components/Nav.jsx',
  'src/components/Overview.jsx',
  'src/components/Residence.jsx',
  'src/components/Amenities.jsx',
  'src/components/Gallery.jsx',
  'src/components/FloorPlans.jsx',
  'src/components/Neighborhood.jsx',
  'src/components/Contact.jsx',
  'src/components/Footer.jsx',
]

const arr = files.map((f) => ({ file: f, data: readFileSync(f, 'utf8') }))
writeFileSync('deploy_payload.json', JSON.stringify(arr))
console.log('files:', arr.length, 'bytes:', JSON.stringify(arr).length)
