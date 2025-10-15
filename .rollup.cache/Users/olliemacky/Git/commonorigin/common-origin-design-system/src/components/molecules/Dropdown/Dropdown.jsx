import { __makeTemplateObject } from "tslib";
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
var _a = tokens.base, spacing = _a.spacing, shadow = _a.shadow, zIndex = _a.zIndex, _b = tokens.semantic, color = _b.color, typography = _b.typography, border = _b.border;
var DropdownContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n"])));
var DropdownTrigger = styled.button.withConfig({
    shouldForwardProp: function (prop) { return !['$isOpen'].includes(prop); },
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: ", " ", ";\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  font: ", ";\n  color: ", ";\n  cursor: pointer;\n  transition: all 0.15s ease;\n  \n  &:hover {\n    background-color: ", ";\n    border-color: ", ";\n  }\n  \n  &:focus {\n    outline: ", ";\n    outline-offset: 2px;\n  }\n  \n  &:disabled {\n    background-color: ", ";\n    color: ", ";\n    cursor: not-allowed;\n    border-color: ", ";\n  }\n  \n  ", "\n"], ["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: ", " ", ";\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  font: ", ";\n  color: ", ";\n  cursor: pointer;\n  transition: all 0.15s ease;\n  \n  &:hover {\n    background-color: ", ";\n    border-color: ", ";\n  }\n  \n  &:focus {\n    outline: ", ";\n    outline-offset: 2px;\n  }\n  \n  &:disabled {\n    background-color: ", ";\n    color: ", ";\n    cursor: not-allowed;\n    border-color: ", ";\n  }\n  \n  ", "\n"])), spacing[3], spacing[4], color.background.default, border.default, tokens.base.border.radius[2], typography.body, color.text.default, color.background.surface, color.border.strong, tokens.semantic.border.focus, color.background.disabled, color.text.disabled, color.border.subtle, function (_a) {
    var $isOpen = _a.$isOpen;
    return $isOpen && "\n    background-color: ".concat(color.background.surface, ";\n    border-color: ").concat(color.border.strong, ";\n  ");
});
var DropdownIcon = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !['$isOpen'].includes(prop); },
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin-left: ", ";\n  transition: transform 0.15s ease;\n  \n  ", "\n"], ["\n  display: flex;\n  align-items: center;\n  margin-left: ", ";\n  transition: transform 0.15s ease;\n  \n  ", "\n"])), spacing[2], function (_a) {
    var $isOpen = _a.$isOpen;
    return $isOpen && "\n    transform: rotate(180deg);\n  ";
});
var DropdownMenu = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !['$isOpen'].includes(prop); },
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  z-index: ", ";\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  margin-top: ", ";\n  overflow: hidden;\n  opacity: ", ";\n  visibility: ", ";\n  transform: ", ";\n  transition: all 0.15s ease;\n  max-height: 300px;\n  overflow-y: auto;\n"], ["\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  z-index: ", ";\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  margin-top: ", ";\n  overflow: hidden;\n  opacity: ", ";\n  visibility: ", ";\n  transform: ", ";\n  transition: all 0.15s ease;\n  max-height: 300px;\n  overflow-y: auto;\n"])), zIndex[3], color.background.default, border.default, tokens.base.border.radius[2], shadow[3], spacing[1], function (_a) {
    var $isOpen = _a.$isOpen;
    return ($isOpen ? 1 : 0);
}, function (_a) {
    var $isOpen = _a.$isOpen;
    return ($isOpen ? 'visible' : 'hidden');
}, function (_a) {
    var $isOpen = _a.$isOpen;
    return ($isOpen ? 'translateY(0)' : 'translateY(-8px)');
});
var DropdownOption = styled.button.withConfig({
    shouldForwardProp: function (prop) { return !['$isSelected', '$isFocused'].includes(prop); },
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  display: block;\n  padding: ", " ", ";\n  background-color: ", ";\n  border: none;\n  font: ", ";\n  color: ", ";\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  \n  &:hover {\n    background-color: ", ";\n  }\n  \n  &:focus {\n    outline: none;\n    background-color: ", ";\n  }\n  \n  &:not(:last-child) {\n    border-bottom: ", ";\n  }\n"], ["\n  width: 100%;\n  display: block;\n  padding: ", " ", ";\n  background-color: ", ";\n  border: none;\n  font: ", ";\n  color: ", ";\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  \n  &:hover {\n    background-color: ", ";\n  }\n  \n  &:focus {\n    outline: none;\n    background-color: ", ";\n  }\n  \n  &:not(:last-child) {\n    border-bottom: ", ";\n  }\n"])), spacing[3], spacing[4], function (_a) {
    var $isSelected = _a.$isSelected, $isFocused = _a.$isFocused;
    if ($isFocused)
        return color.background.surface;
    if ($isSelected)
        return color.background.surface;
    return 'transparent';
}, typography.body, color.text.default, color.background.surface, color.background.surface, border.subtle);
export var Dropdown = function (_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange, _b = _a.placeholder, placeholder = _b === void 0 ? 'Select an option' : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, label = _a.label;
    var _d = useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = useState(-1), focusedIndex = _e[0], setFocusedIndex = _e[1];
    var dropdownRef = useRef(null);
    // Generate unique ID for accessibility
    var dropdownId = useRef("dropdown-".concat(Math.random().toString(36).substr(2, 9))).current;
    var selectedOption = options.find(function (option) { return option.id === value; });
    // Close dropdown when clicking outside
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    // Close dropdown on escape key and handle arrow navigation
    useEffect(function () {
        var handleKeyDown = function (event) {
            if (!isOpen)
                return;
            switch (event.key) {
                case 'Escape':
                    setIsOpen(false);
                    setFocusedIndex(-1);
                    // Return focus to trigger button
                    if (dropdownRef.current) {
                        var trigger = dropdownRef.current.querySelector('button');
                        trigger === null || trigger === void 0 ? void 0 : trigger.focus();
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setFocusedIndex(function (prev) {
                        var newIndex = prev < options.length - 1 ? prev + 1 : 0;
                        return newIndex;
                    });
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setFocusedIndex(function (prev) {
                        var newIndex = prev > 0 ? prev - 1 : options.length - 1;
                        return newIndex;
                    });
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (focusedIndex >= 0 && focusedIndex < options.length) {
                        handleOptionClick(options[focusedIndex].id);
                    }
                    break;
                case 'Home':
                    event.preventDefault();
                    setFocusedIndex(0);
                    break;
                case 'End':
                    event.preventDefault();
                    setFocusedIndex(options.length - 1);
                    break;
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return function () { return document.removeEventListener('keydown', handleKeyDown); };
        }
        return undefined;
    }, [isOpen, focusedIndex, options]);
    var handleTriggerClick = function () {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                // When opening, set focus to the currently selected option or first option
                var selectedIndex = options.findIndex(function (option) { return option.id === value; });
                setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            }
            else {
                // When closing, reset focus
                setFocusedIndex(-1);
            }
        }
    };
    var handleOptionClick = function (optionId) {
        onChange(optionId);
        setIsOpen(false);
        setFocusedIndex(-1);
    };
    return (<DropdownContainer ref={dropdownRef} className={className}>
      {label && (<label htmlFor={dropdownId} style={{ display: 'block', marginBottom: spacing[2] }}>
          <Typography variant="label">{label}</Typography>
        </label>)}
      <DropdownTrigger id={dropdownId} $isOpen={isOpen} onClick={handleTriggerClick} disabled={disabled} aria-expanded={isOpen} aria-haspopup="listbox">
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <DropdownIcon $isOpen={isOpen}>
          <Icon name="arrowDown" iconColor={disabled ? 'disabled' : 'subdued'}/>
        </DropdownIcon>
      </DropdownTrigger>
      
      <DropdownMenu $isOpen={isOpen} role="listbox">{options.map(function (option, index) { return (<DropdownOption key={option.id} $isSelected={option.id === value} $isFocused={index === focusedIndex} onClick={function () { return handleOptionClick(option.id); }} role="option" aria-selected={option.id === value}>
            {option.label}
          </DropdownOption>); })}
      </DropdownMenu>
    </DropdownContainer>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Dropdown.jsx.map