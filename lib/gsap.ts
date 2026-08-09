import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

// Prevents GSAP's lag-compensation from stacking on top of Lenis's easing.
gsap.ticker.lagSmoothing(0)

export { gsap, ScrollTrigger, SplitText }
