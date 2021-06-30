import fs from "fs"
import path from "path"
import { POSTS_PATH, postFilePaths } from "@utils/mdx"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import Head from "next/head"
import { FC } from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"

type PostProps = {
  source: MDXRemoteSerializeResult
  frontMatter: { [key: string]: any }
}

const Post: FC<PostProps> = ({ source, frontMatter }) => {
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <MDXRemote {...source} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<PostProps>> => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`)

  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = () => {
  const pathsWithoutExtension = postFilePaths.map(path =>
    path.replace(/\.mdx?$/, ""),
  )

  const paths = pathsWithoutExtension.map(path => `/posts/${path}`)

  return {
    paths,
    fallback: false,
  }
}

export default Post
