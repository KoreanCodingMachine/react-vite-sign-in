import { Dispatch, SetStateAction } from 'react'

const objectSetValue = <T extends Record<string, any>, K extends keyof T>(
  setStateAction: Dispatch<SetStateAction<T>>, key: K, value: T[K]
) => {
  setStateAction(prev => ({ ...prev, [key]: value }))
}

export default objectSetValue