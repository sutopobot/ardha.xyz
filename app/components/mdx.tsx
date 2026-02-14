import Link from 'next/link'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type TableData = {
  headers: string[]
  rows: string[][]
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  let href = props.href ?? ''

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ImageProps) {
  const { alt, ...rest } = props
  return <Image alt={alt ?? ''} className="rounded-lg" {...rest} />
}

type CodeProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode
}

function Code({ children, ...props }: CodeProps) {
  return <code {...props}>{children}</code>
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

// Create heading components with proper types
function H1({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  const slug = typeof children === 'string' ? slugify(children) : ''
  return (
    <h1 id={slug} {...rest}>
      <a href={`#${slug}`} className="anchor" aria-hidden="true" />
      {children}
    </h1>
  )
}

function H2({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  const slug = typeof children === 'string' ? slugify(children) : ''
  return (
    <h2 id={slug} {...rest}>
      <a href={`#${slug}`} className="anchor" aria-hidden="true" />
      {children}
    </h2>
  )
}

function H3({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  const slug = typeof children === 'string' ? slugify(children) : ''
  return (
    <h3 id={slug} {...rest}>
      <a href={`#${slug}`} className="anchor" aria-hidden="true" />
      {children}
    </h3>
  )
}

function H4({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  const slug = typeof children === 'string' ? slugify(children) : ''
  return (
    <h4 id={slug} {...rest}>
      <a href={`#${slug}`} className="anchor" aria-hidden="true" />
      {children}
    </h4>
  )
}

function H5({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  const slug = typeof children === 'string' ? slugify(children) : ''
  return (
    <h5 id={slug} {...rest}>
      <a href={`#${slug}`} className="anchor" aria-hidden="true" />
      {children}
    </h5>
  )
}

function H6({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  const slug = typeof children === 'string' ? slugify(children) : ''
  return (
    <h6 id={slug} {...rest}>
      <a href={`#${slug}`} className="anchor" aria-hidden="true" />
      {children}
    </h6>
  )
}

// Use 'any' to avoid type conflicts with MDX components
let components: Record<string, any> = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

type CustomMDXProps = {
  source: string
  components?: Record<string, any>
}

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
