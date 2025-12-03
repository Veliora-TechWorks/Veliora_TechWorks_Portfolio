import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'services.json')

const readData = () => {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    return []
  }
}

const writeData = (data: any) => {
  try {
    const dataDir = path.dirname(dataFile)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const servicesWithIds = data.map((service: any, index: number) => ({
      ...service,
      id: service.id || `service-${Date.now()}-${index}`
    }))
    
    fs.writeFileSync(dataFile, JSON.stringify(servicesWithIds, null, 2))
  } catch (error) {
    console.error('Error writing services data:', error)
  }
}

export async function GET() {
  try {
    const data = readData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    writeData(body)
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update services data' }, { status: 500 })
  }
}