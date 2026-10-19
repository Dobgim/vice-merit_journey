import { motion } from 'framer-motion'
import Icon from './Icon'
import { formatPostDate } from '../../lib/blog'

/** One article; opens the full post on blog.meritleaders.com in a new tab. */
export default function BlogCard({ post }) {
  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/[0.07] bg-white shadow-soft transition-colors hover:border-navy-900/[0.14]"
    >
      <div className="relative aspect-[1200/630] overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950">
        {post.image ? (
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-gold-200/70">
            <Icon name="book" className="h-12 w-12" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-600/80">
          {post.date && <time dateTime={post.date.toISOString()}>{formatPostDate(post.date)}</time>}
          {post.readTime && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-navy-300" />
              <span>{post.readTime}</span>
            </>
          )}
        </p>

        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-navy-950 transition-colors group-hover:text-navy-700">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-3 flex-1 text-base leading-[1.7] text-navy-700/80">{post.excerpt}</p>}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700">
          Read article
          <Icon name="arrowUpRight" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  )
}
