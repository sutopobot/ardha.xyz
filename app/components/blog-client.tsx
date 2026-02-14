'use client'

import { BlogPosts } from 'app/components/posts'
import { Search } from 'app/components/search'
import { TagsFilter } from 'app/components/tags-filter'
import type { Post } from 'app/blog/utils'
import { useState, useMemo } from 'react'

export function BlogClient({ posts }: { posts: Post[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Filter posts by selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts
    }
    return posts.filter((post) => {
      const postTags = post.metadata.tags || []
      return selectedTags.every((tag) => postTags.includes(tag))
    })
  }, [posts, selectedTags])

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <Search posts={filteredPosts} />
      <TagsFilter
        posts={posts}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />
      <BlogPosts posts={filteredPosts} />
      {selectedTags.length > 0 && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} filtered by:{' '}
          {selectedTags.join(', ')}
        </p>
      )}
    </section>
  )
}
