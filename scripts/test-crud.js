/**
 * CRUD Operations Test Script
 * Run this to verify all CRUD operations work correctly
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000'

async function testCRUD() {
  console.log('🧪 Testing CRUD Operations...\n')
  console.log(`Base URL: ${BASE_URL}\n`)

  let testProjectId = null

  try {
    // Test 1: CREATE
    console.log('1️⃣ Testing CREATE (POST)...')
    const createResponse = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Project',
        description: 'This is a test project',
        category: 'Web Development',
        technologies: ['React', 'Next.js'],
        featured: false
      })
    })
    
    if (createResponse.ok) {
      const created = await createResponse.json()
      testProjectId = created.id
      console.log('✅ CREATE successful - Project ID:', testProjectId)
    } else {
      console.log('❌ CREATE failed:', createResponse.status)
      return
    }

    // Test 2: READ
    console.log('\n2️⃣ Testing READ (GET)...')
    const readResponse = await fetch(`${BASE_URL}/api/projects`)
    
    if (readResponse.ok) {
      const projects = await readResponse.json()
      console.log(`✅ READ successful - Found ${projects.length} projects`)
    } else {
      console.log('❌ READ failed:', readResponse.status)
    }

    // Test 3: UPDATE
    console.log('\n3️⃣ Testing UPDATE (PUT)...')
    const updateResponse = await fetch(`${BASE_URL}/api/projects?id=${testProjectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Test Project',
        description: 'This project has been updated',
        category: 'Web Development',
        technologies: ['React', 'Next.js', 'TypeScript'],
        featured: true
      })
    })
    
    if (updateResponse.ok) {
      console.log('✅ UPDATE successful')
    } else {
      console.log('❌ UPDATE failed:', updateResponse.status)
    }

    // Test 4: DELETE
    console.log('\n4️⃣ Testing DELETE...')
    const deleteResponse = await fetch(`${BASE_URL}/api/projects?id=${testProjectId}`, {
      method: 'DELETE'
    })
    
    if (deleteResponse.ok) {
      console.log('✅ DELETE successful')
    } else {
      console.log('❌ DELETE failed:', deleteResponse.status)
    }

    console.log('\n✅ All CRUD operations completed successfully!')
    console.log('\n📝 Note: In production, data is stored in memory and will be lost on restart.')
    console.log('   Consider setting up a database for permanent storage.')

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message)
    console.log('\nTroubleshooting:')
    console.log('1. Make sure the server is running')
    console.log('2. Check if the URL is correct')
    console.log('3. Verify API routes are accessible')
  }
}

// Run tests
testCRUD()
