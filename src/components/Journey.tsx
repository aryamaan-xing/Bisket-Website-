"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = ["Biomass", "Resin", "Board", "Electronics"];

export function Journey() {
  const reduce = useReducedMotion();

  return (
    <ol className="flex flex-wrap items-center justify-center gap-3 md:gap-0 md:justify-between">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-3 md:flex-1 md:justify-center">
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-sm font-semibold text-lime">
              {i + 1}
            </span>
            <span className="text-sm font-medium tracking-wide text-forest">{step}</span>
          </motion.div>
          {i < steps.length - 1 ? (
            <motion.span
              aria-hidden
              className="mx-1 hidden h-px w-10 bg-gradient-to-r from-lime via-purple-soft to-forest/30 md:mx-0 md:block md:w-full md:max-w-16"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
