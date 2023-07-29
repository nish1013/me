import React from "react"
import IndexLink from "./IndexLink"
import { mainLinks } from "../../data/MainLinks"
import ProfileImage from "./ProfileImage"
import Summary from "./Summary"
export default function Index() {
  return (
    <div className="flex flex-col items-center">
        <ProfileImage/>
        <Summary/>
        {
            mainLinks.map((l,i) => <IndexLink key={i} url={l.url} text={l.text} />)
        }
    </div>
  )
}