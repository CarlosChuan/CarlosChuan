import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-sans: 'Space Grotesk', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  }

  :root,
  [data-theme="dark"] {
    --github-icon-filter: invert(1);
    --color-bg: #0A0D12;
    --color-surface: #141B26;
    --color-surface-2: #1F2A38;
    --color-surface-hover: #2D3F5A;
    --color-text: #F1F7FF;
    --color-text-muted: #7A8FA6;
    --color-border: rgba(241, 247, 255, 0.07);
    --color-border-subtle: rgba(241, 247, 255, 0.03);
    --color-primary: #3A8BD5;
    --color-primary-dim: rgba(58, 139, 213, 0.14);
    --color-primary-dark: #204F8C;
    --header-bg: rgba(10, 13, 18, 0.8);
  }

  [data-theme="light"] {
    --github-icon-filter: none;
    --color-bg: #F0F4FF;
    --color-surface: #FFFFFF;
    --color-surface-2: #E8EEFA;
    --color-surface-hover: #DCE5F5;
    --color-text: #0A0D12;
    --color-text-muted: #5A6880;
    --color-border: rgba(10, 13, 18, 0.1);
    --color-border-subtle: rgba(10, 13, 18, 0.05);
    --color-primary: #2563b0;
    --color-primary-dim: rgba(37, 99, 176, 0.1);
    --color-primary-dark: #1a4a80;
    --header-bg: rgba(240, 244, 255, 0.85);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  /* ── Scrollbars ── */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-surface-hover) transparent;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--color-surface-hover);
    border-radius: 999px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-muted);
  }

  *::-webkit-scrollbar-corner {
    background: transparent;
  }
`;
