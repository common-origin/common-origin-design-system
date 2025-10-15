import type Author from './author'
import type Track from './track'

type ReleaseType = {
  slug: string
  tag: string
  label: string
  title: string
  date: string
  coverImage: string
  recordLabel: string
  link: string
  artist: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  tracks: Track[]
  content: string
}

export default ReleaseType
