import { useEffect, useRef } from "react";
import { initToothScene } from "@/three/toothScene";

export function useToothScene<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dispose = initToothScene(ref.current as unknown as HTMLDivElement);
    return dispose;
  }, []);

  return ref;
}
