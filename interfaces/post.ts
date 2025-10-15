import type Author from './author'

type PostType = {
  slug: string
  tag: string
  labels: string[]
  title: string
  date: string
  coverImage: string
  link: string
  artist: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
