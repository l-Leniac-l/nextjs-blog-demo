import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

export const POSTS_PATH = path.join(process.cwd(), "posts")

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter(path => /\.mdx?$/.test(path))
  .map(path => path.replace(/\.mdx?$/, ""))

export const getPostData = async (slug: string) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`)

  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[require("remark-prism"), {}]],
      rehypePlugins: [],
    },
    scope: data,
  })

  return { source: mdxSource, frontMatter: data }
}
