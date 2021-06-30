import { postFilePaths, POSTS_PATH } from "@utils/mdx"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import Link from "next/link"
import { FC } from "react"
import { GetStaticPropsResult } from "next"

type Post = {
  data: { [key: string]: any }
  filePath: string
}

type IndexProps = {
  posts: Post[]
}

const Index: FC<IndexProps> = ({ posts }) => (
  <div>
    <ul>
      {posts.map(post => {
        return (
          <li key={post.filePath}>
            <Link as={`/posts/${post.filePath}`} href="/posts/[slug]">
              <a>{post.data.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)

export const getStaticProps = (): GetStaticPropsResult<IndexProps> => {
  const posts = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { data } = matter(source)

    return {
      data,
      filePath: filePath.replace(/\.mdx?$/, ""),
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default Index
