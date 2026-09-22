interface ToothIconProps {
  fill: string;
  size?: number;
}

export default function ToothIcon({ fill, size = 30 }: ToothIconProps) {
  return (
    <svg width={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 12c-6-6-20-6-22 6-2 10 4 14 6 24 1 6 3 12 6 12 4 0 3-12 10-12s6 12 10 12c3 0 5-6 6-12 2-10 8-14 6-24-2-12-16-12-22-6z"
        fill={fill}
      />
    </svg>
  );
}
