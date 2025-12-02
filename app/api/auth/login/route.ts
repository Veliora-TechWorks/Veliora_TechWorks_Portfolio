import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getAdminUser } from '@/lib/admin-store'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log('Login attempt for:', email)

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Get admin user
    const adminUser = getAdminUser()
    console.log('Admin user found:', adminUser ? 'Yes' : 'No')
    
    if (!adminUser) {
      return NextResponse.json({ error: 'No admin account found. Please run setup first.' }, { status: 401 })
    }

    if (adminUser.email !== email) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 401 })
    }

    const isValidPassword = await bcrypt.compare(password, adminUser.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    console.log('Login successful for:', email)

    const token = jwt.sign(
      { userId: adminUser.id, email: adminUser.email, role: adminUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({ 
      success: true, 
      user: { id: adminUser.id, email: adminUser.email, role: adminUser.role } 
    })
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}