import { useNavigate, useParams } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import BlogCard from '../components/ui/BlogCard'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import NotFound from './NotFound'
import { posts } from '../data/posts'
import { formatPostDate } from '../lib/blog'
import { SITE_URL, company } from '../data/site'

/** One article published on this site (content/blog/*.md). */
export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  const more = posts.filter((p) => p !== post).slice(0, 3)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date?.toISOString(),
    image: post.image ?? undefined,
    url: `${SITE_URL}${post.to}`,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@type': 'Organization', name: company.name, logo: `${SITE_URL}/merit-leaders-logo.jpg` },
  }

  // Links to our own pages inside the article open without a full reload.
  const followLink = (e) => {
    const href = e.target.closest('a')?.getAttribute('href')
    if (!href?.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return
    e.preventDefault()
    navigate(href)
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} jsonLd={jsonLd} />
      <PageHeader crumb="Article" crumbs={[{ label: 'Blog', to: '/blog' }]} eyebrow="Insights & guides" title={post.title}>
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-100/70">
          {post.date && (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4" />
              <time dateTime={post.date.toISOString()}>{formatPostDate(post.date)}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-4 w-4" />
            {post.readTime}
          </span>
        </p>
      </PageHeader>

      <Section tone="light" className="!pt-12 sm:!pt-16">
        <div className="container">
          <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-navy-900/[0.07] bg-white shadow-soft">
            {post.image && (
              <figure>
                <img src={post.image} alt="" className="aspect-[1200/560] w-full object-cover" />
                {post.imageCredit && <figcaption className="px-6 pt-2 text-xs text-navy-500 sm:px-10">{post.imageCredit}</figcaption>}
              </figure>
            )}
            <div className="article p-6 sm:p-10" onClick={followLink} dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            <Button to="/eligibility" icon="checkCircle">
              Am I eligible?
            </Button>
            <Button to="/book-consultation" variant="outline" icon="calendar">
              Book a consultation
            </Button>
          </div>

          {more.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl">
              <h2 className="font-display text-2xl font-semibold text-navy-950">More articles</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
