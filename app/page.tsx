import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'
import { getBlogPosts } from 'app/blog/utils'

export default function Page() {
  const posts = getBlogPosts()

  return (
    <section>
      <div className="mb-4">
        <div className="float-right w-[25%] aspect-square ml-4 mb-2 relative">
          <Image
            src="/avatar-light.png"
            alt="Ardha"
            fill
            className="rounded-lg object-cover dark:hidden"
            priority
          />
          <Image
            src="/avatar-dark.png"
            alt="Ardha"
            fill
            className="rounded-lg object-cover hidden dark:block"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tighter mb-2">
          I'm Ardha
        </h1>
        <p>
          {`With a background in Marine Science and currently handling various issues in the climate
change, Ardha has cultivated a strong passion for data-driven policy analysis, particularly
in the fields of environment and economics. As a policy analyst in the Environment and
Forestry sector at the Coordinating Ministry for Maritime Aﬀairs and Investment, Ardha has
developed expertise in using data to support sustainable development and
environmental conservation strategies.`}
        </p>
      </div>
      <div className="my-8">
        <BlogPosts posts={posts.slice(0, 3)} />
      </div>
    </section>
  )
}
