import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Index from "../components/index/Index"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Index/>
    </Layout>
  
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
