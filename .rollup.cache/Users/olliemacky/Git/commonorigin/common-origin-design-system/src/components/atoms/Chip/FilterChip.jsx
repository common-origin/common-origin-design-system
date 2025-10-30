import { __rest } from "tslib";
import React from 'react';
import { Icon } from '../Icon';
import { StyledChipWrapper, IconContainer, CloseButton } from './shared/ChipBase';
/**
 * FilterChip - Chip for displaying filters with selected state and optional dismissal
 *
 * Use this component to show filters that can be selected/deselected.
 * When selected, displays a checkmark and light blue background.
 * Optionally dismissible when onDismiss is provided.
 *
 * Features:
 * - Shows checkmark icon when selected
 * - Light blue background when selected
 * - Optional close (×) button when onDismiss is provided
 * - Keyboard dismissal with Delete or Backspace keys (when dismissible)
 * - Non-clickable body (only close button is interactive when present)
 * - Uses subtle/interactive background styling based on selected state
 * - Announces as "status" to screen readers
 */
export var FilterChip = function (_a) {
    var children = _a.children, _b = _a.selected, selected = _b === void 0 ? false : _b, onDismiss = _a.onDismiss, _c = _a.size, size = _c === void 0 ? 'medium' : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, dataTestId = _a["data-testid"], ariaLabel = _a["aria-label"], ariaDescribedBy = _a["aria-describedby"], role = _a.role, props = __rest(_a, ["children", "selected", "onDismiss", "size", "disabled", 'data-testid', 'aria-label', 'aria-describedby', "role"]);
    var isDismissible = Boolean(onDismiss);
    var handleDismiss = function (event) {
        event.stopPropagation(); // Prevent event bubbling
        if (!disabled && onDismiss) {
            onDismiss();
        }
    };
    var handleKeyDown = function (event) {
        // Handle dismiss with Delete or Backspace (only when dismissible)
        if (!disabled && isDismissible && onDismiss && (event.key === 'Delete' || event.key === 'Backspace')) {
            event.preventDefault();
            onDismiss();
        }
    };
    var handleCloseKeyDown = function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (!disabled && onDismiss)
                onDismiss();
        }
    };
    // Generate accessible label for close button
    var closeButtonLabel = typeof children === 'string' ? "Remove ".concat(children) : 'Remove filter';
    return (<StyledChipWrapper $variant="subtle" $size={size} $disabled={disabled || undefined} $clickable={false} $selected={selected} onKeyDown={handleKeyDown} role={role || 'status'} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} aria-disabled={disabled ? 'true' : undefined} data-testid={dataTestId} {...props}>
      {/* Show selected indicator when selected */}
      {selected && (<IconContainer aria-hidden="true">
          <Icon name="check" size="sm"/>
        </IconContainer>)}
      
      {children}
      
      {/* Show close button only when dismissible */}
      {isDismissible && (<CloseButton type="button" onClick={handleDismiss} onKeyDown={handleCloseKeyDown} disabled={disabled} $disabled={disabled} aria-label={closeButtonLabel} tabIndex={0} data-testid={dataTestId ? "".concat(dataTestId, "-close") : undefined}>
          <Icon name="close" size="sm"/>
        </CloseButton>)}
    </StyledChipWrapper>);
};
//# sourceMappingURL=FilterChip.jsx.map