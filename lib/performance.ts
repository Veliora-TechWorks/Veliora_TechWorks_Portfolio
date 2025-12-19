export const getReducedMotionConfig = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const getOptimizedAnimationConfig = () => {
  const reducedMotion = getReducedMotionConfig()
  
  return {
    duration: reducedMotion ? 0 : 0.3,
    ease: 'easeOut',
    staggerChildren: reducedMotion ? 0 : 0.05,
  }
}

export const getConnectionSpeed = () => {
  if (typeof navigator === 'undefined') return 'fast'
  
  // @ts-ignore
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  
  if (!connection) return 'fast'
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return 'slow'
  }
  
  if (connection.effectiveType === '3g') {
    return 'medium'
  }
  
  return 'fast'
}