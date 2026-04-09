"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Head of Marketing, TechFlow",
    content: "PingOS completely transformed how we handle inbound leads. Our response time went from hours to seconds, and conversions are up 40%.",
    image: "https://i.pravatar.cc/150?img=47",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "Founding Partner, Apollo Labs",
    content: "The unified inbox is a lifesaver. We no longer switch between WhatsApp, email, and SMS. Everything is right there, beautifully organized.",
    image: "https://i.pravatar.cc/150?img=11",
    stars: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Customer Success, GrowthStack",
    content: "Setting up automated campaigns was incredibly intuitive. We launched our holiday promo on WhatsApp in 10 minutes and saw massive engagement.",
    image: "https://i.pravatar.cc/150?img=32",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">
              Trusted by Innovators
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Don&apos;t just take our word for it
            </h3>
            <p className="text-lg text-text-secondary">
              See how businesses are using PingOS to scale their communication and build better customer relationships.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface-secondary/40 backdrop-blur-sm border border-border-subtle p-8 rounded-3xl flex flex-col h-full hover:border-primary/30 hover:bg-surface-secondary/60 transition-colors shadow-2xl shadow-black/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-text-primary text-lg leading-relaxed mb-8 grow">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-subtle">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
