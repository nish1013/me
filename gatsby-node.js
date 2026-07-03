const path = require(`path`);
const chunk = require(`lodash/chunk`);

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async (gatsbyUtilities) => {
  // Query our posts from the GraphQL server
  const posts = await getNodes(gatsbyUtilities);

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return;
  }

  // If there are posts and pages, create Gatsby pages for them
  await createSinglePages({ posts, gatsbyUtilities });

  // And a paginated archive
  // await createBlogPostArchive({ posts, gatsbyUtilities })
};

/**
 * This function creates all the individual blog pages in this site
 */
const createSinglePages = async ({ posts, gatsbyUtilities }) => {
  const wpPostEdges = posts.filter(({ post }) => post.__typename === 'WpPost');
  const wpPageEdges = posts.filter(({ post }) => post.__typename === 'WpPage');

  const journeyEdges = sortPostEdges(
    wpPostEdges.filter(({ post }) => getPostTags(post).includes('Journey')),
    'ASC'
  );
  const blogEdges = sortPostEdges(
    wpPostEdges.filter(
      ({ post }) =>
        !getPostTags(post).includes('Journey') &&
        getPostTags(post).includes('Tech')
    ),
    'DESC'
  );
  const otherPostEdges = wpPostEdges.filter(
    ({ post }) =>
      !getPostTags(post).includes('Journey') &&
      !getPostTags(post).includes('Tech')
  );

  const postPageConfigs = [
    ...buildPostPageConfigs(journeyEdges, '/journey', 'Journey'),
    ...buildPostPageConfigs(blogEdges, '/blog', 'Blog'),
    ...buildPostPageConfigs(otherPostEdges, '/blog', 'Blog'),
  ];

  const pageConfigs = [
    ...postPageConfigs,
    ...wpPageEdges.map(({ previous, post, next }) => ({
      path: post.uri,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        id: post.id,
        previousPostId: previous ? previous.id : null,
        nextPostId: next ? next.id : null,
      },
    })),
  ];

  return Promise.all(
    pageConfigs.map((config) => gatsbyUtilities.actions.createPage(config))
  );
};

function getPostTags(post) {
  return (post.tags?.nodes ?? []).map((tag) => tag.name);
}

function sortPostEdges(edges, order) {
  return [...edges].sort((a, b) => {
    const aDate = new Date(a.post.date);
    const bDate = new Date(b.post.date);
    return order === 'ASC' ? aDate - bDate : bDate - aDate;
  });
}

function buildPostPageConfigs(edges, backPath, backLabel) {
  return edges.map((edge, index) => ({
    path: edge.post.uri,
    component: path.resolve(`./src/templates/post.js`),
    context: {
      id: edge.post.id,
      previousPostId: index > 0 ? edges[index - 1].post.id : null,
      nextPostId:
        index < edges.length - 1 ? edges[index + 1].post.id : null,
      backPath,
      backLabel,
    },
  }));
}

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  const { postsPerPage } = graphqlResult.data.wp.readingSettings;

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage);
  const totalPages = postsChunkedIntoArchivePages.length;

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1;

      const getPagePath = (page) => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/` : `/blog/${page}`;
        }

        return null;
      };

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      });
    })
  );
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * See https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
 */
async function getNodes({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query WpPosts {
      allWpPost(sort: { date: DESC }) {
        edges {
          post: node {
            __typename
            id
            uri
            date
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
      allWpPage(sort: { date: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return [
    ...graphqlResult.data.allWpPost.edges,
    ...graphqlResult.data.allWpPage.edges,
  ];
}
