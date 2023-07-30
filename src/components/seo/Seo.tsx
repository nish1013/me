import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SeoProps {
  description?: string;
  title: string;
  children?: ReactNode;
}

interface GeneralSettings {
  title: string | null;
  description: string | null;
}

interface User {
  twitter: string | null;
}

const Seo: React.FC<SeoProps> = ({ description, title, children }) => {
  const data = useStaticQuery<{ wp: { generalSettings: GeneralSettings }, wpUser: User }>(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }

        # if there's more than one user this would need to be filtered to the main user
        wpUser {
          twitter: name
        }
      }
    `
  )

  const metaDescription = description || data.wp.generalSettings?.description
  const defaultTitle = data.wp.generalSettings?.title

  return (
    <>
      <title> {defaultTitle ? `${title} | ${defaultTitle}` : title} </title>
      <meta name="description" content={metaDescription || ""} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription || ""} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={data.wpUser?.twitter || ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription || ""} />
      {children}
    </>
  )
}

export default Seo
