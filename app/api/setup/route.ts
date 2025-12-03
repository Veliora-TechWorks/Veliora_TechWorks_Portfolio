import { NextRequest, NextResponse } from 'next/server'
import { getAdmin, createAdmin } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Check if admin already exists
    const existingAdmin = await getAdmin()
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin account already exists' },
        { status: 400 }
      )
    }

    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }
    
    await createAdmin(email, password)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Setup failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const admin = await getAdmin()
    return NextResponse.json({ hasAdmin: !!admin })
  } catch (error) {
    return NextResponse.json({ hasAdmin: false })
  }
}