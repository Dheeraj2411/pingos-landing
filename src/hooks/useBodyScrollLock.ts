import { useEffect } from "react";

/**
 * Custom hook to lock both document.documentElement (html) and document.body scrolling
 * when a modal or overlay is open.
 *
 * Prevents W3C CSS viewport overflow propagation bugs and scroll chaining
 * while compensating for scrollbar width to prevent Cumulative Layout Shift (CLS).
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    // Calculate actual vertical scrollbar width before locking
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock BOTH root html and body to ensure viewport scrolling is fully disabled
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Compensate padding to avoid layout jump (zero CLS)
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
    };
  }, [isLocked]);
}
