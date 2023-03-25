import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  name: string
}

export default function Title({ children, name }: Props) {
  return (
    <div className="flex flex-row items-center my-4 rounded-md bg-light-color p-4 gap-3">
      {children}
      <span className="text-2xl font-semibold">{name}</span>
    </div>
  )
}