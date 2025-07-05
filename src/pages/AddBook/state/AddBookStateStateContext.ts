import { createContext } from "react"
import { AddBookState } from "./AddBookState"

export const AddBookStateContext = createContext<AddBookState>(null as unknown as AddBookState)
