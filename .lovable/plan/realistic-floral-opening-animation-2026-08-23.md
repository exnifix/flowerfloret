# Realistic floral opening animation

## What I’ll build
- Add the React Bits `AnimatedContent` wrapper with GSAP ScrollTrigger, typed for this React project and safe during server rendering.
- Create a first-viewport floral opening sequence in the homepage hero using the existing real flower photography: layered image movement, a soft botanical reveal, and restrained petal motion rather than a cartoon illustration.
- Animate the headline, supporting copy, and calls to action in a coordinated bloom sequence while preserving the existing navigation and shopping flow.
- Respect reduced-motion preferences and keep the intro responsive so text and controls remain immediately usable on mobile.

## Technical details
- Install `gsap` and place the reusable component with the existing motion primitives.
- Limit the heavier animation to the homepage opening, avoid blocking navigation, and clean up GSAP timelines/ScrollTriggers on unmount.
- Verify the opening hero at desktop and mobile sizes, checking rendering, motion, overflow, and console errors.
