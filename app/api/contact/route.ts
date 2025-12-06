import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const contactsFile = path.join(process.cwd(), 'data', 'contacts.json')

const readContacts = () => {
  try {
    if (fs.existsSync(contactsFile)) {
      const data = fs.readFileSync(contactsFile, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading contacts:', error)
    return []
  }
}

const writeContacts = (contacts: any[]) => {
  try {
    const dir = path.dirname(contactsFile)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2))
    return true
  } catch (error) {
    console.error('Error writing contacts:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create contact entry
    const contact = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new'
    }

    // Save to file
    const contacts = readContacts()
    contacts.unshift(contact)
    
    if (!writeContacts(contacts)) {
      throw new Error('Failed to save contact')
    }

    console.log('Contact form submission saved:', contact)

    return NextResponse.json(
      { message: 'Message sent successfully! We will get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}