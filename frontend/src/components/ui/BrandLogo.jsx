export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 140 72" fill="none" aria-hidden="true">
      <path d="M2 68 43 4h18L24 68H2Z" fill="#D82E30" />
      <path d="m34 53 9-15h16l9 15H34Z" fill="#D82E30" />
      <path d="M46 4h19l24 40V17L106 4v64H84L46 4Z" fill="currentColor" />
      <path d="m109 28 25-24h-23L94 21v23l15-16Z" fill="#D82E30" />
      <path d="m110 36 28 32h-25L96 49l14-13Z" fill="currentColor" />
    </svg>
  );
}

export default function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <BrandMark />
      <span className="brand-logo-type">
        <span className="brand-logo-name">ANKIT</span>
        <span className="brand-logo-caption">KABAD SHOP</span>
      </span>
    </span>
  );
}
