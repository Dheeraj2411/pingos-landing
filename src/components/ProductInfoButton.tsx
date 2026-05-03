"use client";

import { Info } from "lucide-react";

interface ProductInfoButtonProps {
  variant?: "primary" | "secondary" | "outline";
}

export default function ProductInfoButton({
  variant = "secondary",
}: ProductInfoButtonProps) {
  // Will be updated with actual product URL
  const productUrl = process.env.NEXT_PUBLIC_PRODUCT_URL || "#";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary via-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50",
    secondary:
      "bg-surface-elevated text-text-primary border border-border-subtle hover:border-primary/50 hover:bg-surface-card",
    outline:
      "border border-primary/50 text-primary hover:bg-primary/10",
  };

  return (
    <a
      href={productUrl}
      target={productUrl !== "#" ? "_blank" : "_self"}
      rel={productUrl !== "#" ? "noopener noreferrer" : ""}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]}`}
    >
      <Info className="w-4 h-4" />
      Explore Product
    </a>
  );
}
