import { ReactNode } from "react"

export type TroutePath = {
    name?:string,
    path?:string,
    element?:ReactNode,
    children?: TroutePath[],
}

