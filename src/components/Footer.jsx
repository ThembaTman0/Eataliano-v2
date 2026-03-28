import React from "react";
import { Link } from "react-router-dom";
import { ForkIcon } from "./Icons";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Italian", to: "/cuisine/Italian" },
  { label: "Japanese", to: "/cuisine/Japanese" },
  { label: "Mexican", to: "/cuisine/Mexican" },
  { label: "Vegetarian", to: "/search/vegetarian" },
  { label: "Seafood", to: "/search/seafood" },
];

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

/**
 * Site footer with nav links, social icons, and attribution.
 */
export function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "52px 24px 36px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "24px 48px",
          alignItems: "start",
        }}
      >
        {/* Brand */}
        <div>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              color: "var(--accent)",
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            <ForkIcon />
            Eataliano
          </Link>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
              maxWidth: 200,
            }}
          >
            Discover extraordinary recipes from every corner of the world.
          </p>
        </div>

        {/* Quick links */}
        <nav style={{ paddingTop: 4 }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 14,
            }}
          >
            Explore
          </p>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 24px",
            }}
          >
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div style={{ paddingTop: 4 }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 14,
            }}
          >
            Follow
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1.5px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  transition:
                    "color var(--transition), border-color var(--transition), background var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "36px auto 0",
          paddingTop: 24,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Eataliano. All rights reserved.
        </p>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Powered by{" "}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              transition: "opacity var(--transition)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            TheMealDB
          </a>
        </p>
      </div>
    </footer>
  );
}
