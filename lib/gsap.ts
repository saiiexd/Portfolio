// =============================================================================
// GSAP — Plugin registration and shared GSAP configuration
// Import this in the client-side GSAP provider; never import GSAP directly
// in Server Components.
// =============================================================================

// NOTE: This file must only be imported from client components ('use client')
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once at the module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Default GSAP configuration
gsap.config({
  nullTargetWarn: false, // Suppress warnings for elements that may not exist on all pages
})

// Default eases used throughout the site
export const EASES = {
  out: 'power2.out',
  inOut: 'power2.inOut',
  smooth: 'power3.out',
  spring: 'elastic.out(1, 0.5)',
} as const

// Default durations (seconds)
export const DURATIONS = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  page: 0.3,
} as const

// Default stagger values
export const STAGGERS = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.12,
} as const

// Reduced-motion media query string for gsap.matchMedia
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Create a GSAP matchMedia context that respects reduced-motion preferences.
 * The `motionFn` receives the gsap context and runs only when motion is allowed.
 * The `reducedFn` (optional) runs when reduced-motion is preferred.
 */
export function createMotionContext(
  motionFn: (context: gsap.Context) => void,
  reducedFn?: () => void,
): gsap.MatchMedia {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isMotion: '(prefers-reduced-motion: no-preference)',
      isReducedMotion: REDUCED_MOTION_QUERY,
    },
    (context) => {
      const { isMotion } = context.conditions as { isMotion: boolean }

      if (isMotion) {
        motionFn(context)
      } else if (reducedFn) {
        reducedFn()
      }
    },
  )

  return mm
}

export { gsap, ScrollTrigger }
