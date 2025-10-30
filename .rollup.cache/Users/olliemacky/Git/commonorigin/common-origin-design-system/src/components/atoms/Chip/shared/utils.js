import tokens from '../../../../styles/tokens.json';
var chip = tokens.component.chip;
// Helper function to get variant styles as objects for CSS custom properties
export var getVariantStylesAsObject = function (variant, selected) {
    // Boolean chips with selected state get special background
    if (selected) {
        return {
            backgroundColor: tokens.semantic.color.background['interactive-subtle'],
            color: chip.default.textColor
        };
    }
    switch (variant) {
        case 'emphasis':
            return {
                backgroundColor: chip.variants.emphasis.backgroundColor,
                color: chip.variants.emphasis.textColor
            };
        case 'subtle':
            return {
                backgroundColor: chip.variants.subtle.backgroundColor,
                color: chip.variants.subtle.textColor
            };
        case 'interactive':
            return {
                backgroundColor: chip.variants.interactive.backgroundColor,
                color: chip.variants.interactive.textColor
            };
        case 'default':
        default:
            return {
                backgroundColor: chip.default.backgroundColor,
                color: chip.default.textColor
            };
    }
};
// Helper function to get size styles as objects for CSS custom properties
export var getSizeStylesAsObject = function (size) {
    switch (size) {
        case 'small':
            return {
                font: chip.sizes.small.font,
                padding: chip.sizes.small.padding
            };
        case 'medium':
        default:
            return {
                font: chip.sizes.medium.font,
                padding: chip.sizes.medium.padding
            };
    }
};
// Export chip tokens for reuse
export { chip as chipTokens };
//# sourceMappingURL=utils.js.map