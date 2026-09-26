import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import photo from '../../images/profile.jpeg';
import { socialLinks } from '../../data/MainLinks';
import { companies, intro, name, tagline } from '../../data/profile';
import { PORTFOLIO } from '../portfolio/data';
import CodeView from '../code/CodeView';
import { CodeLink, CodeSource } from '../code/code.types';
import { decodeEntities, stripEmoji } from './posts.util';
import { handleFromUrl } from './links.util';

interface LatestPost {
  title: string;
  uri: string;
}

interface LatestPostsConnection {
  nodes: LatestPost[];
}

interface LatestPostsQuery {
  allWpPost: LatestPostsConnection;
}

export default function Index() {
  const { allWpPost } = useStaticQuery<LatestPostsQuery>(query);

  const source = useMemo<CodeSource>(
    () => ({
      tagline,
      companies,
      projects: PORTFOLIO.map((p) => ({
        name: p.title,
        does: p.hint ?? '',
        url: p.uri,
      })),
      posts: allWpPost.nodes.map((p) => ({
        title: stripEmoji(decodeEntities(p.title)),
        url: p.uri,
      })),
      allPostsUrl: '/blog',
      links: socialLinks.map(
        (l): CodeLink => ({
          key: l.text.toLowerCase(),
          label: l.text,
          handle: handleFromUrl(l.url),
          url: l.url,
        })
      ),
      sourceUrl: 'https://github.com/nish1013/me',
    }),
    [allWpPost]
  );

  return <CodeView name={name} intro={intro} photo={photo} source={source} />;
}

const query = graphql`
  query LatestPosts {
    allWpPost(
      filter: { tags: { nodes: { elemMatch: { name: { in: ["Tech"] } } } } }
      sort: { fields: [date], order: DESC }
      limit: 3
    ) {
      nodes {
        title
        uri
      }
    }
  }
`;
