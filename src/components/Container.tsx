import type { PropsWithChildren } from "react"

type ContainerProps = {
  className?: string
} & PropsWithChildren

export function Container({ className, children }: ContainerProps) {
  return <div className={className}>{children}</div>
}
