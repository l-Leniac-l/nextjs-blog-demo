import { getPostData, postFilePaths } from "@utils/mdx"
import Link from "next/link"
import { FC } from "react"
import { GetStaticPropsResult } from "next"

type Post = {
  frontMatter: { [key: string]: any }
  url: string
}

type IndexProps = {
  posts: Post[]
}

const Index: FC<IndexProps> = ({ posts }) => (
  <div>
    <ul>
      {posts.map(post => {
        return (
          <li key={post.url}>
            <Link as={`/posts/${post.url}`} href="/posts/[slug]">
              <a>{post.frontMatter.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IndexProps>
> => {
  const postsAsync = postFilePaths.map(filePath =>
    getPostData(filePath).then(({ frontMatter }) => {
      return {
        url: filePath,
        frontMatter,
      }
    }),
  )

  const posts = await Promise.all(postsAsync)

  return {
    props: {
      posts,
    },
  }
}

export default Index
