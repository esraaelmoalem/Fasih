// Logo: a speech bubble holding a small sound wave.
export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4C13 4 5 11.5 5 21c0 5.2 2.5 9.6 6.5 12.5L9 43l9.5-5c1.8.4 3.6.6 5.5.6 11 0 19-7.5 19-17.6S35 4 24 4Z" fill="#205B4C" />
      <g stroke="#E9C878" strokeWidth="3" strokeLinecap="round">
        <path d="M14 21v1" /><path d="M19 17v8" /><path d="M24 13v16" /><path d="M29 17v8" /><path d="M34 21v1" />
      </g>
    </svg>
  );
}
