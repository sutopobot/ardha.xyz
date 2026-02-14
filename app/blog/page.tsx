import { BlogPosts } from 'app/components/posts'
import { BlogClient } from 'app/components/blog-client'
import { getBlogPosts } from 'app/blog/utils'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  const posts = getBlogPosts()

  return <BlogClient posts={posts} />
}
