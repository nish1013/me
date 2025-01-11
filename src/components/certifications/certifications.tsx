import React from "react"
import Certification from "./certification"
import { Link } from "gatsby"
import "./styles.css"
import { CERTIFICATIONS } from './data'

export default function Certifications() {
    return (<div className="flex flex-col items-center py-10 mx-10">
        <Link to="/">⌂ Home</Link>
        <h1 className="text-4xl font-black">Certifications</h1>
        {
            CERTIFICATIONS.map((c, i) => <Certification key={i} title={c.title} uri={c.uri} />)
        }
    </div>)
}