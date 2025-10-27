import tokens from '../styles/tokens.json';
// Breakpoints using base tokens
export var breakpoints = {
    xs: tokens.base.breakpoint.xs,
    sm: tokens.base.breakpoint.sm,
    md: tokens.base.breakpoint.md,
    lg: tokens.base.breakpoint.lg,
    xl: tokens.base.breakpoint.xl,
    '2xl': tokens.base.breakpoint['2xl'],
};
// Media query helpers
export var media = {
    xs: "@media (min-width: ".concat(breakpoints.xs, ")"),
    sm: "@media (min-width: ".concat(breakpoints.sm, ")"),
    md: "@media (min-width: ".concat(breakpoints.md, ")"),
    lg: "@media (min-width: ".concat(breakpoints.lg, ")"),
    xl: "@media (min-width: ".concat(breakpoints.xl, ")"),
    '2xl': "@media (min-width: ".concat(breakpoints['2xl'], ")"),
};
// Re-export tokens for convenience
export { tokens };
export default tokens;
//# sourceMappingURL=styleUtils.js.map