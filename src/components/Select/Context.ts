import { createContext } from 'react'
import { Context } from "./type"

const SelectContext = createContext<Context>({} as Context)

export default SelectContext
