# Pragmatic SaaS Design Checklist (Indie Edition)

## Philosophy: Ship Good Enough, Iterate Based on Feedback

### Core Principles (The Only Ones That Matter)
- [ ] **It Works** - Features do what they promise
- [ ] **It's Clear** - Users understand what to do
- [ ] **It's Fast** - Pages load quickly, interactions feel snappy
- [ ] **It's Not Broken** - No glaring visual bugs
- [ ] **It's Trustworthy** - Looks professional enough to enter credit card

## The Money Feature (THIS MUST BE PERFECT)
- [ ] The core feature users pay for works flawlessly
- [ ] The UI for this feature is polished and delightful
- [ ] Clear value proposition visible immediately
- [ ] Smooth onboarding to first value
- [ ] No friction in the critical path

## Quick Design System (Keep It Simple)

### Colors (Pick 5, Move On)
- [ ] **Primary Brand Color** - Your main color
- [ ] **Text Color** - Usually dark gray/black
- [ ] **Background** - White or very light
- [ ] **Success** - Green for good things
- [ ] **Danger** - Red for destructive actions
- [ ] That's it. Stop overthinking colors.

### Typography (One Font, Three Sizes)
- [ ] **One Font Family** - System fonts are fine (seriously)
- [ ] **Large** - Headers (make them bigger than you think)
- [ ] **Medium** - Body text (16px minimum)
- [ ] **Small** - Captions (but not too small)

### Spacing (Pick One Unit)
- [ ] Use 8px or 16px as base unit
- [ ] Stick to multiples of your unit
- [ ] When in doubt, add more space

### Components (Build As Needed)
- [ ] **Buttons** - Primary and secondary is enough
- [ ] **Forms** - Clear labels, obvious errors
- [ ] **Cards** - Container with shadow/border
- [ ] **Tables** - Just make them readable
- [ ] Don't build a component library, build features

## Layout (Dead Simple)
- [ ] **Sidebar + Content** - Classic SaaS layout
- [ ] **Mobile** - Stack everything vertically
- [ ] **Responsive** - Test at 3 sizes max (phone/tablet/desktop)

## Actual Problems Worth Fixing
- [ ] Text too small to read comfortably
- [ ] Buttons that don't look clickable
- [ ] Forms without clear labels
- [ ] No feedback after user actions
- [ ] Error messages that don't help
- [ ] Loading without indication
- [ ] Broken on mobile
- [ ] Inaccessible to keyboard users

## Not Worth Your Time (Yet)
- Perfect spacing systems
- Comprehensive icon libraries  
- Custom animation frameworks
- Dark mode (unless users demand it)
- Perfect cross-browser compatibility
- Micro-interactions everywhere
- Custom fonts
- Complex grid systems

## Quick Wins That Matter
- [ ] Consistent button styles
- [ ] Clear navigation
- [ ] Readable text
- [ ] Obvious CTAs
- [ ] Loading states
- [ ] Error handling
- [ ] Mobile usability

## When to Polish More
1. Users complain about specific UI issues
2. You're losing conversions at a specific step
3. Preparing for a launch (Product Hunt, etc.)
4. You have paying customers and time

Remember: Twitter was ugly. Craigslist is still ugly. 
They solved real problems. Focus on that.

## The Only Accessibility That Matters (For Now)
- [ ] Keyboard navigation works
- [ ] Text has enough contrast
- [ ] Forms have labels
- [ ] Images have alt text
- [ ] Nothing breaks screen readers

Perfect WCAG compliance can wait until you have users.