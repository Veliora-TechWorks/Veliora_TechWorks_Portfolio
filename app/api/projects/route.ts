import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

const storage = new Storage('projects')

const readProjects = () => storage.read()
const writeProjects = (projects: any[]) => storage.write(projects)

export async function GET() {
  try {
    const projects = readProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const projects = readProjects()
    
    const projectData = {
      id: Date.now().toString(),
      ...body,
      image: body.imageUrl || body.image || '',
      images: body.images || [],
      coverImage: body.coverImage || '',
      createdAt: new Date().toISOString()
    }
    
    projects.unshift(projectData) // Add to beginning for newest first
    writeProjects(projects)
    
    return NextResponse.json(projectData, { status: 201 })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }
    
    const body = await request.json()
    const projects = readProjects()
    
    const index = projects.findIndex((project: any) => project.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    projects[index] = {
      ...projects[index],
      ...body,
      image: body.imageUrl || body.image || projects[index].image,
      images: body.images || projects[index].images || [],
      coverImage: body.coverImage || projects[index].coverImage || '',
      updatedAt: new Date().toISOString()
    }
    
    writeProjects(projects)
    
    return NextResponse.json(projects[index])
  } catch (error) {
    console.error('Update project error:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }
    
    const projects = readProjects()
    const filteredProjects = projects.filter((project: any) => project.id !== id)
    writeProjects(filteredProjects)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}