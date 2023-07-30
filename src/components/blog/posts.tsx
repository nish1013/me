
import { graphql, useStaticQuery } from "gatsby";
import React from "react"
import Post from "./post";
interface Post {
    id: string;
    title: string;
    excerpt: string;
}

interface PostsProps {
}
const Posts: React.FC<PostsProps> = () => {
    const posts = useStaticQuery(query).allWpPost.nodes
    return (<div className="">
        {
            posts.map((p: Post) => {
                return <Post title={p.title} />
            })
        }
    </div>)
}

export const query = graphql`
{
    allWpPost {
        nodes {
            id
            title
            excerpt
        }
    }
}`;

export default Posts;