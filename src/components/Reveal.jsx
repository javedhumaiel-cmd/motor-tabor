import { motion } from 'framer-motion'

// Drop-in reveal, now powered by framer-motion for premium easing + a single
// on-enter animation. API unchanged: <Reveal as="li" delay={120} className="">.
const EASE = [0.16, 1, 0.3, 1]

export default function Reveal({ as = 'div', delay = 0, y = 26, className = '', children, ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </M>
  )
}
