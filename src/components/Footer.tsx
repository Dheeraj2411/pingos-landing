"use client";

import Image from "next/image";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press Kit"],
  Resources: ["Documentation", "API Reference", "Community", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-primary/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                alt="PingOS Logo"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-text-primary tracking-tight">
                Ping<span className="text-primary-light">OS</span>
              </span>
            </a>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              The all-in-one business messaging OS. Automate, engage, and grow
              — all from a single platform.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} PingOS. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {/* Social Icons */}
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
