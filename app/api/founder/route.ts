import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const dataPath = join(process.cwd(), 'data', 'founder.json')

export async function GET() {
  try {
    const data = readFileSync(dataPath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({
      name: '',
      title: '',
      message: '',
      bio: '',
      expertise: [],
      image: ''
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    writeFileSync(dataPath, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update founder' }, { status: 500 })
  }
}