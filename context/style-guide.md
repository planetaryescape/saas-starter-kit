# Quick & Dirty Style Guide

## Brand Colors
```css
--primary: #0066cc;    /* Change to your brand color */
--text: #1a1a1a;       /* Almost black */
--text-muted: #666;    /* Gray text */
--background: #ffffff;  /* White */
--border: #e5e5e5;     /* Light gray */
--success: #10b981;    /* Green */
--error: #ef4444;      /* Red */
```

## Typography
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
/* System fonts are free and fast */

/* Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

## Spacing Scale
```css
/* Use Tailwind defaults or similar */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
```

## Components

### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

/* Secondary */
.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
```

### Cards
```css
.card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1.5rem;
}
```

## Quick CSS Framework Recommendations
- **Tailwind CSS** - Stop writing CSS, ship features
- **Radix UI + Tailwind** - Accessible components that work
- **shadcn/ui** - Copy-paste components, no dependencies

## What Not to Worry About
- Pixel perfection
- Custom animations
- Unique design language
- Brand guidelines document
- Design tokens
- Component documentation

## When You Actually Need a Designer
1. Your UI is actively losing you customers
2. You're competing on design (unlikely)
3. You've validated the business model
4. You have revenue to invest

Until then, keep it simple and focus on solving problems.