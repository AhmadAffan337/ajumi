"use client";

import { useEffect, useState, ReactNode } from "react";

/**
 * ClientOnly component to prevent hydration mismatches
 * Use this wrapper for any component that relies on browser APIs
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Hook to safely check if component is mounted on client
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
