import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'about.json')

const readData = () => {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8')
      return JSON.parse(data)
    }
    return {
      story: "Founded in 2019, Veliora TechWorks emerged from a simple yet powerful vision: to bridge the gap between cutting-edge technology and real-world business solutions.",
      mission: "To deliver cutting-edge technology solutions that transform businesses and exceed expectations",
      vision: "To be the leading force in technological innovation, shaping the future of digital experiences",
      values: ["Innovation", "Excellence", "Integrity", "Client Success", "Collaboration", "Continuous Learning"],
      stats: [
        { label: "Projects Completed", value: "50+" },
        { label: "Years Experience", value: "5+" },
        { label: "Happy Clients", value: "25+" },
        { label: "Client Satisfaction", value: "99%" }
      ],
      skills: [
        { name: "Frontend Development", level: 95 },
        { name: "Backend Development", level: 90 },
        { name: "UI/UX Design", level: 85 },
        { name: "Business Analytics", level: 88 },
        { name: "Digital Marketing", level: 82 }
      ]
    }
  } catch (error) {
    return {}
  }
}

const writeData = (data: any) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing about data:', error)
  }
}

export async function GET() {
  try {
    const data = readData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    writeData(body)
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
  }
}