import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const dataPath = join(process.cwd(), 'data', 'team.json')

export async function GET() {
  try {
    const data = readFileSync(dataPath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const newMember = await request.json()
    const id = Date.now().toString()
    const memberWithId = { ...newMember, id }
    
    let team = []
    try {
      const data = readFileSync(dataPath, 'utf8')
      team = JSON.parse(data)
    } catch {}
    
    team.push(memberWithId)
    writeFileSync(dataPath, JSON.stringify(team, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const updatedMember = await request.json()
    
    const data = readFileSync(dataPath, 'utf8')
    let team = JSON.parse(data)
    
    team = team.map((member: any) => 
      member.id === id ? { ...updatedMember, id } : member
    )
    
    writeFileSync(dataPath, JSON.stringify(team, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const data = readFileSync(dataPath, 'utf8')
    let team = JSON.parse(data)
    
    team = team.filter((member: any) => member.id !== id)
    
    writeFileSync(dataPath, JSON.stringify(team, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}