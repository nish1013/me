import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Blog from "../components/blog/blog"

const BlogPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Blog/>
    </Layout>
  
  )
}

export default BlogPage

export const Head: HeadFC = () => <title>Blog page</title>
