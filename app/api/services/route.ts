import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

const storage = new Storage('services')

const readData = () => storage.read()

const writeData = (data: any) => {
  const servicesWithIds = data.map((service: any, index: number) => ({
    ...service,
    id: service.id || `service-${Date.now()}-${index}`
  }))
  storage.write(servicesWithIds)
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