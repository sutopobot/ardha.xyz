'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Post } from 'app/blog/utils'

export function Search({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return posts.slice(0, 5) // Show recent posts when no search
    }

    const searchQuery = query.toLowerCase()
    return posts.filter((post) => {
      const titleMatch = post.metadata.title.toLowerCase().includes(searchQuery)
      const summaryMatch = post.metadata.summary.toLowerCase().includes(searchQuery)
      const contentMatch = post.content.toLowerCase().includes(searchQuery)
      return titleMatch || summaryMatch || contentMatch
    })
  }, [query, posts])

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search blog posts..."
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
          aria-label="Search blog posts"
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        {isFocused && filteredPosts.length > 0 && (
          <ul
            id="search-results"
            className="absolute z-10 w-full mt-1 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg max-h-96 overflow-y-auto"
            role="listbox"
          >
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                  onMouseDown={() => setIsFocused(false)}
                  role="option"
                >
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {post.metadata.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    {post.metadata.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isFocused && filteredPosts.length === 0 && query.trim() && (
          <div
            className="absolute z-10 w-full mt-1 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg px-4 py-2"
            role="status"
            aria-live="polite"
          >
            <p className="text-neutral-600 dark:text-neutral-400">No posts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
