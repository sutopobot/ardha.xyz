import fs from 'fs'
import path from 'path'
import { CustomMDX } from 'app/components/mdx'
import matter from 'gray-matter'

export const metadata = {
  title: 'About',
  description: 'About Ardha Yosef.',
}

export default function AboutPage() {
  const aboutPath = path.join(process.cwd(), 'content', 'about.mdx')
  const fileContent = fs.readFileSync(aboutPath, 'utf-8')
  const { content } = matter(fileContent)

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--fg)' }}>
        About
      </h1>
      <div className="mb-8" style={{ borderBottom: '1px solid var(--border)' }} />
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  )
}
