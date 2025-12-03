import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'contacts.json')

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
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing contacts data:', error)
  }
}

export async function GET() {
  try {
    const data = readData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const contacts = readData()
    
    const newContact = {
      id: `contact-${Date.now()}`,
      name: body.name,
      email: body.email,
      subject: body.subject || 'Contact Form Submission',
      message: body.message,
      status: 'New',
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }
    
    contacts.unshift(newContact)
    writeData(contacts)
    
    return NextResponse.json({ success: true, contact: newContact })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const contacts = readData()
    
    const updatedContacts = contacts.map((contact: any) => 
      contact.id === body.id ? { ...contact, ...body } : contact
    )
    
    writeData(updatedContacts)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const contacts = readData()
    const filteredContacts = contacts.filter((contact: any) => contact.id !== id)
    
    writeData(filteredContacts)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}