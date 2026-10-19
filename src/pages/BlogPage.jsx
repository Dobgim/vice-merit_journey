import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import { Stagger, StaggerItem } from '../components/ui/Reveal'
import BlogCard from '../components/ui/BlogCard'
import Button from '../components/ui/Button'
import useBlogPosts from '../hooks/useBlogPosts'
import { BLOG_URL } from '../lib/blog'

export default function BlogPage() {
  const { posts, status } = useBlogPosts()

  return (
    <>
      <Seo
        title="Blog"
        description="Guides from Merit Leaders advisors on finding scholarships, writing strong applications and preparing for interviews and visas."
      />

      <PageHeader
        crumb="Blog"
        eyebrow="Insights & guides"
        title="Advice from our"
        accent="advisors."
        lede="Practical articles on finding funding, writing applications that stand out and getting through interviews and visas. New articles appear here as soon as they are published."
      />

      <Section tone="light">
        <div className="container">
          {status === 'loading' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading articles">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[26rem] animate-pulse rounded-2xl bg-navy-900/[0.05]" />
              ))}
            </div>
          )}

          {status === 'ready' && posts.length > 0 && (
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {(status === 'error' || (status === 'ready' && !posts.length)) && (
            <div className="mx-auto max-w-xl text-center">
              <p className="text-lg leading-[1.75] text-navy-700/80">
                {status === 'error'
                  ? 'We could not load the articles right now. You can read them on our blog directly.'
                  : 'The first articles are on their way.'}
              </p>
              <Button href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="mt-8" icon="arrowUpRight">
                Open the blog
              </Button>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
