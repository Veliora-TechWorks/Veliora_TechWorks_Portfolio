import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

const storage = new Storage('services')

export async function GET() {
  try {
    const data = await storage.read()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const servicesWithIds = body.map((service: any, index: number) => ({
      ...service,
      id: service.id || `service-${Date.now()}-${index}`
    }))
    await storage.write(servicesWithIds)
    return NextResponse.json(servicesWithIds)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update services data' }, { status: 500 })
  }
}