import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin, getAdmin } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const admin = await getAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'No admin account found. Please complete setup first.' }, { status: 401 })
    }

    const isValid = await verifyAdmin(email, password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: admin.id,
        email: admin.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}