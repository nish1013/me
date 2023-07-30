import React from "react"

interface PostProps {
    title: string
}
export default function Post({ title }: PostProps) {
    return (<div className="py-2 px-2 my-2 cursor-pointer bg-amber-400 hover:bg-amber-500">
        <p>{title}</p>
    </div>)
}