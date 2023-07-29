import React from "react"

interface LayoutProps {
    children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
      {children}
    </div>
  )
}