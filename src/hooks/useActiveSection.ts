import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], defaultId: string): string {
  const [active, setActive] = useState(defaultId);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sectionIds]);

  return active;
}
