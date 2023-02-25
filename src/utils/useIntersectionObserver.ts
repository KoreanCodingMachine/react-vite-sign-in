import { useEffect, useState } from 'react'

const useIntersectionObserver = () => {
  const [callback, setCallback] = useState<IntersectionObserverCallback>()
  const [options, setObserverOptions] = useState<
    IntersectionObserverInit | undefined
  >()
  const [target, setTarget] = useState<HTMLElement>()
  const [observer, setObserver] = useState<IntersectionObserver>()
  const disconnect = () => observer?.disconnect()
  const observe = () => target && observer?.observe(target)
  const setObserverCallback = (callback: IntersectionObserverCallback) =>
    setCallback(() => callback)
  const setObserverTarget = (target: HTMLElement) => {
    setTarget(prev => {
      prev && observer?.unobserve(prev)

      return target
    })
  }

  useEffect(() => {
    if (typeof callback === 'function') {
      setObserver(prev => {
        target && prev?.unobserve(target)
        prev?.disconnect()

        return new IntersectionObserver(callback, options)
      })
    }
  }, [callback, options])

  return {
    disconnect,
    observe,
    observer,
    setObserverCallback,
    setObserverOptions,
    setObserverTarget,
  }
}

export default useIntersectionObserver