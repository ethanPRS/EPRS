"use client";

interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const CTAPrimaryButton = ({ children, onClick, className = "", href, target, rel }: Props) => {
  const inner = (
    <>
      <span className="fold" />
      <div className="points_wrapper">
        {Array.from({ length: 10 }).map((_, i) => (
          <i key={i} className="point" />
        ))}
      </div>
      <span className="inner">
        <svg
          className="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        >
          <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
        </svg>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={`button ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`button ${className}`}>
      {inner}
    </button>
  );
};
