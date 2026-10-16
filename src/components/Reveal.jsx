import { motion } from "framer-motion";
import { easeOutExpo } from "../utils/motion";

// Fades and lifts its children the first time they scroll into view.
export default function Reveal({ as = "div", delay = 0, y = 24, className, children, ...rest }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
