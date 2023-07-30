import React from "react"
import AlertInfo from "../alert/AlertInfo"
import { navigate } from "gatsby"

interface LayoutProps {
    children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
        <AlertInfo title="Built with [TypeScript, React, Node.js]" label="code" onClick={()=>(navigate("https://github.com/nish1013/me"))}/>
      {children}
    </div>
  )
}