import React from "react"
import IndexLink from "./IndexLink"
import { mainLinks } from "../../data/MainLinks"
import ProfileImage from "./ProfileImage"
import Summary from "./Summary"
import Specialties from './Specialties'
export default function Index() {
  return (
    <div className="flex flex-col items-center py-10 mx-10">
        <ProfileImage/>
        <Specialties/>
        <Summary/>
        {
            mainLinks.map((l,i) => <IndexLink key={i} url={l.url} text={l.text} />)
        }
    </div>
  )
}