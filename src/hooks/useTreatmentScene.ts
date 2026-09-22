import { useEffect, useRef } from "react";
import { initTreatmentScene } from "@/three/treatmentScene";
import type { TreatmentVariant } from "@/types";

export function useTreatmentScene<T extends HTMLElement = HTMLDivElement>(variant: TreatmentVariant) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dispose = initTreatmentScene(ref.current as unknown as HTMLDivElement, variant);
    return dispose;
  }, [variant]);

  return ref;
}
