import React, { useMemo } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import photo from '../../images/profile.jpeg';
import { socialLinks } from '../../data/MainLinks';
import { companies, intro, name, tagline } from '../../data/profile';
import { PORTFOLIO } from '../portfolio/data';
import CodeView from '../code/CodeView';
import { CodeLink, CodeSource } from '../code/code.types';
import { decodeEntities } from './posts.util';
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
        title: decodeEntities(p.title),
        url: p.uri,
      })),
      allPostsUrl: '/blog',
      links: socialLinks.map(
        (l): CodeLink => ({
          key: l.text.toLowerCase(),
          handle: handleFromUrl(l.url),
          url: l.url,
        })
      ),
      sourceUrl: 'https://github.com/nish1013/me',
    }),
    [allWpPost]
  );

  return (
    <>
      <CodeView name={name} intro={intro} photo={photo} source={source} />
      <div className="mx-auto flex max-w-5xl justify-end px-5 pb-10 md:px-6">
        <Link
          to="/journey"
          className="inline-flex min-h-[44px] items-center text-xs text-slate-500 hover:text-slate-700"
        >
          Journey
        </Link>
      </div>
    </>
  );
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
