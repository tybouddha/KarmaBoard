import { SVGProps } from "react";

export function Lotus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c7.2 0 9 4.8 9 9s-1.8 9-9 9-9-4.8-9-9 1.8-9 9-9z" />
      <path d="M12 3c-4.8 0-6 3.6-6 6s1.2 6 6 6 6-3.6 6-6-1.2-6-6-6z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
