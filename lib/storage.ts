import fs from 'fs'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

// In-memory storage for production
const memoryStore: { [key: string]: any[] } = {}

export class Storage {
  private key: string
  private filePath: string

  constructor(key: string) {
    this.key = key
    this.filePath = path.join(process.cwd(), 'data', `${key}.json`)
  }

  read(): any[] {
    try {
      if (isProduction) {
        // Use memory cache in production
        if (!memoryStore[this.key]) {
          // Try to load initial data from file
          if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8')
            memoryStore[this.key] = JSON.parse(data)
          } else {
            memoryStore[this.key] = []
          }
        }
        return memoryStore[this.key]
      }

      // Development: read from file
      this.ensureDataDir()
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data)
      }
      return []
    } catch (error) {
      console.error(`Error reading ${this.key}:`, error)
      return memoryStore[this.key] || []
    }
  }

  write(data: any[]): void {
    try {
      if (isProduction) {
        // Update memory cache in production
        memoryStore[this.key] = data
        console.log(`${this.key} updated in cache (production mode)`)
        return
      }

      // Development: write to file
      this.ensureDataDir()
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error(`Error writing ${this.key}:`, error)
    }
  }

  private ensureDataDir(): void {
    if (isProduction) return
    const dataDir = path.dirname(this.filePath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
  }
}
