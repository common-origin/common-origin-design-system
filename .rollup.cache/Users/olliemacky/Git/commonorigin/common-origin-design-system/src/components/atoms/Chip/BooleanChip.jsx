import { __rest } from "tslib";
import React from 'react';
import { Icon } from '../Icon';
import { StyledChipWrapper, IconContainer } from './shared/ChipBase';
/**
 * BooleanChip - Toggleable chip for quick filter controls
 *
 * Use this component for multi-select filter controls where users can
 * see which options are active. Common in table filtering patterns where
 * users toggle filters on/off.
 *
 * Features:
 * - Shows checkmark icon when selected
 * - Entire chip is clickable to toggle
 * - Keyboard activation with Space or Enter
 * - Uses checkbox role with aria-checked
 * - Visual background change when selected
 */
export var BooleanChip = function (_a) {
    var children = _a.children, selected = _a.selected, onClick = _a.onClick, _b = _a.size, size = _b === void 0 ? 'medium' : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, dataTestId = _a["data-testid"], ariaLabel = _a["aria-label"], ariaDescribedBy = _a["aria-describedby"], props = __rest(_a, ["children", "selected", "onClick", "size", "disabled", 'data-testid', 'aria-label', 'aria-describedby']);
    var handleClick = function () {
        if (!disabled) {
            onClick();
        }
    };
    var handleKeyDown = function (event) {
        // Handle activation with Space or Enter
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };
    return (<StyledChipWrapper $variant="subtle" $size={size} $disabled={disabled || undefined} $clickable={!disabled} $selected={selected} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={disabled ? undefined : 0} role="checkbox" aria-checked={selected ? 'true' : 'false'} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} aria-disabled={disabled ? 'true' : undefined} data-testid={dataTestId} {...props}>
      {/* Show selected indicator when selected */}
      {selected && (<IconContainer aria-hidden="true">
          <Icon name="check" size="sm"/>
        </IconContainer>)}
      
      {children}
    </StyledChipWrapper>);
};
//# sourceMappingURL=BooleanChip.jsx.map