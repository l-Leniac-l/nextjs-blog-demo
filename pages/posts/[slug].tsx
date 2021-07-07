import { getPostData, postFilePaths } from "@utils/mdx"
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
  const { source, frontMatter } = await getPostData(params?.slug as string)

  return {
    props: {
      source,
      frontMatter,
    },
  }
}

export const getStaticPaths = () => {
  const paths = postFilePaths.map(path => {
    return `/posts/${path}`
  })

  return {
    paths,
    fallback: false,
  }
}

export default Post
