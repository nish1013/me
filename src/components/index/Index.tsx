import React from "react"
import IndexLink from "./IndexLink"
import { mainLinks } from "../../data/MainLinks"
export default function Index() {
  return (
    <div className="flex flex-col items-center">
        {
            mainLinks.map((l,i) => <IndexLink key={i} url={l.url} text={l.text} />)
        }
    </div>
  )
}