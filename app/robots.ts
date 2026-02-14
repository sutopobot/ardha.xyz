const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ardha.xyz'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
