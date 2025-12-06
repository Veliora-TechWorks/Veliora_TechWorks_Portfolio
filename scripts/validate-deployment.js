#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Validating deployment setup...\n')

// Check if required files exist
const requiredFiles = [
  'next.config.js',
  'vercel.json',
  'data/projects.json',
  'app/projects/[id]/page.tsx',
  'app/api/projects/[id]/route.ts'
]

let allFilesExist = true

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`)
  } else {
    console.log(`❌ ${file} missing`)
    allFilesExist = false
  }
})

// Check projects data
try {
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json')
  if (fs.existsSync(projectsPath)) {
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'))
    console.log(`\n📊 Found ${projects.length} project(s)`)
    
    projects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (ID: ${project.id})`)
      if (project.coverImage || project.imageUrl || project.image) {
        console.log(`      ✅ Has image`)
      } else {
        console.log(`      ⚠️  No image`)
      }
    })
  }
} catch (error) {
  console.log('❌ Error reading projects.json:', error.message)
  allFilesExist = false
}

// Check environment variables
console.log('\n🔧 Environment Variables Check:')
const requiredEnvVars = [
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_CLOUD_NAME'
]

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} is set`)
  } else {
    console.log(`⚠️  ${envVar} not set (required for production)`)
  }
})

console.log('\n📝 Deployment Checklist:')
console.log('1. Set all environment variables in Vercel dashboard')
console.log('2. Ensure Cloudinary images are publicly accessible')
console.log('3. Test project detail pages locally before deploying')
console.log('4. Check browser console for any errors after deployment')

if (allFilesExist) {
  console.log('\n🎉 All required files are present!')
} else {
  console.log('\n❌ Some required files are missing. Please check the errors above.')
  process.exit(1)
}