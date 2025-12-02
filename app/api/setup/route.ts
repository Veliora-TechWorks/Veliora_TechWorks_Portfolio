import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { setAdminUser, hasAdmin } from '@/lib/admin-store'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Check if admin already exists
    if (hasAdmin()) {
      return NextResponse.json({ error: 'Admin account already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const adminUser = {
      id: 'admin',
      email: email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    }

    setAdminUser(adminUser)

    return NextResponse.json({ success: true, message: 'Admin account created successfully' })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Failed to create admin account' }, { status: 500 })
  }
}