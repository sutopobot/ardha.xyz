import Link from 'next/link'
import type { Post } from 'app/blog/utils'

export function BlogPosts({ posts }: { posts: Post[] }) {
  const sortedPosts = posts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })

  // Format date helper
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Calculate reading time helper
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <div>
      {sortedPosts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.metadata.publishedAt)}
            </p>
            <div className="flex-1 flex flex-col md:flex-row items-center gap-1 md:gap-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <span className="text-xs text-neutral-500 dark:text-neutral-500">
                {calculateReadingTime(post.content)} min read
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
