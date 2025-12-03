import { promises as fs } from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const DB_PATH = path.join(process.cwd(), 'data', 'admin.json')

export interface AdminUser {
  id: string
  email: string
  password: string
  createdAt: string
}

async function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function getAdmin(): Promise<AdminUser | null> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

export async function createAdmin(email: string, password: string): Promise<AdminUser> {
  await ensureDataDir()
  
  const hashedPassword = await bcrypt.hash(password, 12)
  const admin: AdminUser = {
    id: '1',
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  }
  
  await fs.writeFile(DB_PATH, JSON.stringify(admin, null, 2))
  return admin
}

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
  const admin = await getAdmin()
  if (!admin || admin.email !== email) {
    return false
  }
  
  return await bcrypt.compare(password, admin.password)
}