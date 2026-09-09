interface IconProps {
  className?: string;
  size?: number;
}

export function LinkedInIcon({ className = "social-icon", size = 28 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function GitHubIcon({ className = "social-icon", size = 28 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function InstagramIcon({ className = "social-icon", size = 28 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function UpworkIcon({ className = "social-icon", size = 28 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.016 0-4.896 1.847-5.703 3.978-1.503-2.224-2.617-4.733-3.21-6.996H6.182v8.665c0 1.815-1.477 3.292-3.292 3.292C1.075 13.897 0 12.82 0 11.005V2h3.5v9.005c0 .161.131.292.292.292s.292-.131.292-.292V2h5.719c.478 2.054 1.42 4.417 2.748 6.643-.075-.411-.122-.843-.122-1.288 0-3.014 2.453-5.467 5.467-5.467 3.015 0 5.467 2.453 5.467 5.467 0 3.015-2.452 5.468-5.467 5.468-1.157 0-2.23-.36-3.123-.976l-.612 2.883c1.173.846 2.585 1.353 4.12 1.353 3.864 0 7.009-3.145 7.009-7.009 0-3.865-3.145-7.009-7.009-7.009z" />
    </svg>
  );
}

export function MailIcon({ className = "", size = 20 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M1.5 4.5A2.5 2.5 0 0 1 4 2h16a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 19.5v-15ZM4 3.5a1 1 0 0 0-1 1v.784l9 5.85 9-5.85V4.5a1 1 0 0 0-1-1H4Zm17 3.016-8.456 5.496a1 1 0 0 1-1.088 0L3 6.516V19.5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6.516Z" />
    </svg>
  );
}

export function BehanceIcon({ className = "", size = 20 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.296-5.555-5.691 0-3.321 2.112-5.719 5.485-5.719 3.524 0 5.251 2.456 4.965 6.012h-7.852c.045 1.742 1.272 2.766 2.825 2.766 1.491 0 2.37-.678 2.68-1.368h2.624zm-2.853-4.22c-.066-1.344-.925-2.094-2.285-2.094-1.328 0-2.235.795-2.394 2.094h4.679zm-13.626-7.78h5.275c1.725 0 3.067.433 3.931 1.242.842.791 1.278 1.83 1.278 3.07 0 1.096-.341 2.027-1.002 2.748-.371.405-.883.743-1.498.986.953.308 1.696.848 2.193 1.583.504.743.766 1.666.766 2.709 0 1.547-.563 2.784-1.654 3.633-1.077.838-2.589 1.272-4.437 1.272h-4.852v-17.243zm3.178 6.81h2.24c.797 0 1.424-.183 1.837-.534.405-.345.617-.837.617-1.442 0-.649-.227-1.15-.664-1.468-.429-.312-1.092-.472-1.945-.472h-2.085v3.916zm0 2.766v4.887h2.385c.916 0 1.637-.215 2.115-.63.473-.41.722-.988.722-1.693 0-.756-.258-1.369-.757-1.799-.493-.424-1.258-.646-2.247-.646l-2.218.001z" />
    </svg>
  );
}

export function LinkChainIcon({ className = "", size = 20 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function CloseIcon({ className = "", size = 20 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ArrowUpRight({ className = "", size = 16 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function ShareIcon({ className = "", size = 18 }: IconProps = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
