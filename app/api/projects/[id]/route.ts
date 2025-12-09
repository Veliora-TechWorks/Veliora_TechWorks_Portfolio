import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

const storage = new Storage('projects')

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projects = await storage.read()
    const project = projects.find((p: any) => p.id === params.id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}