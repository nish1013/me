
import { graphql,useStaticQuery } from "gatsby";
import React from "react"
interface Post {
    id: string;
    title: string;
    excerpt: string;
}

interface PostsProps {
}
const Posts: React.FC<PostsProps> =() =>{
    const posts = useStaticQuery(query).allWpPost.nodes
    console.log('posts', posts)
    return (<div>
        <h1>Blog Posts</h1>
        {
            posts.map((p: Post)=> {
                return <div>{p.title}</div>
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