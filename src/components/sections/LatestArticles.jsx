import { Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Reveal'
import BlogCard from '../ui/BlogCard'
import Button from '../ui/Button'
import useBlogPosts from '../../hooks/useBlogPosts'

/** The three newest blog articles on the home page; hidden until there are some. */
export default function LatestArticles() {
  const { posts } = useBlogPosts()
  if (!posts.length) return null

  return (
    <Section id="blog" tone="white">
      <div className="container">
        <SectionHeading
          eyebrow="From the blog"
          title="Advice from our"
          accent="advisors"
          lede="Practical guides on finding funding, writing applications and preparing for interviews and visas."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button to="/blog" variant="outline" icon="arrowRight">
            All articles
          </Button>
        </div>
      </div>
    </Section>
  )
}
