import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';

import '../styles/blog.css';

import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';

const PageTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    image:
      post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  };

  return (
    <Layout>
      <div className="blog-container">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="blog-header">
            <h1 itemProp="headline">{parse(post.title)}</h1>
            <time className="blog-date">{post.date}</time>

            {featuredImage?.image && (
              <GatsbyImage
                alt={featuredImage.alt}
                image={featuredImage.image}
                className="blog-featured-image"
              />
            )}
          </header>

          {!!post.content && (
            <section className="blog-content" itemProp="articleBody">
              {parse(post.content)}
            </section>
          )}
        </article>

        <nav className="blog-post-nav">
          <div className="nav-prev">
            {previous && (
              <Link to={previous.uri} rel="prev">
                <span className="nav-label">Previous</span>
                <span className="nav-title">{parse(previous.title)}</span>
              </Link>
            )}
          </div>
          <div className="nav-home">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-next">
            {next && (
              <Link to={next.uri} rel="next">
                <span className="nav-label">Next</span>
                <span className="nav-title">{parse(next.title)}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </Layout>
  );
};

export const Head = ({ data: { post } }) => (
  <Seo title={post.title} description={post.excerpt} />
);

export default PageTemplate;

export const pageQuery = graphql`
  query PageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current page by id
    post: wpPage(id: { eq: $id }) {
      id
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 1000, quality: 90)
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPage(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPage(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
