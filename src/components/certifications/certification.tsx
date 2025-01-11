import { navigate } from "gatsby"
import React from "react"

interface CertificationProps {
    title: string;
    uri: string;
}
export default function Certification({ title, uri }: CertificationProps) {
    return (<div onClick={() => navigate(uri)}   className="flex items-center justify-center h-12 w-1/4 mx-auto my-2 cursor-pointer bg-amber-500 hover:bg-amber-400 text-sm text-black font-medium">
        <p>{title}</p>
    </div>)
}