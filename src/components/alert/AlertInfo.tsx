import React from "react"

interface AlertInfoProps {
    label: string,
    title: string,
    onClick: () => {}
}

export default function AlertInfo({label, title, onClick}: AlertInfoProps) {

    return (
    <div className="p-2 bg-amber-200 items-center text-black-100 leading-none flex lg:inline-flex w-full" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      <span className="font-semibold mr-2 text-center flex-auto text-sm">{title}</span>
    <button onClick={() => onClick()}> <span className="flex rounded-full bg-amber-500 uppercase px-2 py-1 text-xs font-bold mr-3">{label}</span></button>
    </div>
  )
}