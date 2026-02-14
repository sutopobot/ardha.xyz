'use client'

import { useState } from 'react'
import type { Post } from 'app/blog/utils'

export function TagsFilter({ posts, selectedTags, onTagsChange }: {
  posts: Post[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}) {
  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.metadata.tags || []))
  ).sort()

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const clearAll = () => {
    onTagsChange([])
  }

  if (allTags.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Filter by:</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tags">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
              }`}
              aria-pressed={selectedTags.includes(tag)}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-1 rounded-full text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
