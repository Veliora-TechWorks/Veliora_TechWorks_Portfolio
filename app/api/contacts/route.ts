import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

const storage = new Storage('contacts')

export async function GET() {
  try {
    const data = await storage.read()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const contacts = await storage.read()
    
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
    await storage.write(contacts)
    
    return NextResponse.json({ success: true, contact: newContact })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const contacts = await storage.read()
    
    const updatedContacts = contacts.map((contact: any) => 
      contact.id === body.id ? { ...contact, ...body } : contact
    )
    
    await storage.write(updatedContacts)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const contacts = await storage.read()
    const filteredContacts = contacts.filter((contact: any) => contact.id !== id)
    
    await storage.write(filteredContacts)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}