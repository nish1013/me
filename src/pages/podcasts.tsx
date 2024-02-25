import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Podcasts from '../components/podcasts/podcasts'

const PodcastsPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Podcasts/>
    </Layout>
  
  )
}

export default PodcastsPage

export const Head: HeadFC = () => <title>Podcasts page</title>
