import type { SVGProps } from "react";

export function LinkedInIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            {...props}
        >
            <rect width="24" height="24" rx="4" fill="#0A66C2" />
            <path
                d="M7.5 9.5H5V18H7.5V9.5ZM6.25 6C5.42 6 4.75 6.67 4.75 7.5C4.75 8.33 5.42 9 6.25 9C7.08 9 7.75 8.33 7.75 7.5C7.75 6.67 7.08 6 6.25 6ZM19 12.87C19 10.45 17.71 9.32 15.98 9.32C14.59 9.32 13.97 10.09 13.62 10.63V9.5H11.12C11.15 10.2 11.12 18 11.12 18H13.62V13.25C13.62 13 13.64 12.74 13.72 12.55C13.94 12.02 14.43 11.45 15.25 11.45C16.33 11.45 16.76 12.27 16.76 13.47V18H19.26V12.87H19Z"
                fill="white"
            />
        </svg>
    );
}

export function GithubIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    );
}

export function ArrowUpRightIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={className}
            {...props}
        >
            <path
                d="M7 17L17 7M17 7H7M17 7V17"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ArrowDownRightIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={className}
            {...props}
        >
            <path
                d="M7 7L17 17M17 17H7M17 17V7"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SunIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={className}
            {...props}
        >
            <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
            <path
                d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41"
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </svg>
    );
}

export function MoonIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={className}
            {...props}
        >
            <path
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SpotifyIcon({ className = "w-5 h-5", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="-33.4974 -55.829 290.3108 334.974"
            className={className}
            {...props}
        >
            <path
                d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
                fill="#1ed660"
            />
        </svg>
    );
}
