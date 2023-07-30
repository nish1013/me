import React from "react"
import AlertInfo from "../alert/AlertInfo"
import { navigate } from "gatsby"

interface LayoutProps {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      <AlertInfo title="Built with [TypeScript, React, Node.js]" label="code" onClick={() => (navigate("https://github.com/nish1013/me"))} />
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}