/**
 * Do not edit directly
 * Generated on Mon, 27 Oct 2025 10:50:24 GMT
 */

export interface TokensBaseBorderRadius {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  circle: string;
}

export interface TokensBaseBorderStyle {
  solid: string;
  dashed: string;
  dotted: string;
}

export interface TokensBaseBorderWidth {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
}

export interface TokensBaseBorder {
  radius: TokensBaseBorderRadius;
  style: TokensBaseBorderStyle;
  width: TokensBaseBorderWidth;
}

export interface TokensBaseShadow {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  none: string;
}

export interface TokensBaseZIndex {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
}

export interface TokensBaseOpacity {
  '0': string;
  '5': string;
  '10': string;
  '20': string;
  '25': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '75': string;
  '80': string;
  '90': string;
  '95': string;
  '100': string;
}

export interface TokensBaseSize {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '40': string;
  '48': string;
  '56': string;
  '64': string;
  auto: string;
  full: string;
  screen: string;
  min: string;
  max: string;
  fit: string;
}

export interface TokensBaseColorNeutral {
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '1000': string;
  '000': string;
}

export interface TokensBaseColorGreen {
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '1000': string;
  '1100': string;
  '1200': string;
  '1300': string;
}

export interface TokensBaseColorOrange {
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '1000': string;
  '1100': string;
  '1200': string;
  '1300': string;
}

export interface TokensBaseColorRed {
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '1000': string;
  '1100': string;
  '1200': string;
  '1300': string;
}

export interface TokensBaseColorBlue {
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '1000': string;
  '1100': string;
  '1200': string;
  '1300': string;
}

export interface TokensBaseColor {
  neutral: TokensBaseColorNeutral;
  green: TokensBaseColorGreen;
  orange: TokensBaseColorOrange;
  red: TokensBaseColorRed;
  blue: TokensBaseColorBlue;
}

export interface TokensBaseSpacing {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '40': string;
  '48': string;
  '56': string;
  '64': string;
  auto: string;
}

export interface TokensBaseFontFamily {
  heading: string;
  body: string;
  monospace: string;
}

export interface TokensBaseFontSize {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
}

export interface TokensBaseFontWeight {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
}

export interface TokensBaseLineHeight {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
}

export interface TokensBaseLetterSpacing {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
}

export interface TokensBaseBreakpoint {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface TokensBaseDuration {
  instant: string;
  fast: string;
  normal: string;
  moderate: string;
  slow: string;
  slower: string;
  slowest: string;
}

export interface TokensBaseEasing {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  easeInQuart: string;
  easeOutQuart: string;
  easeInOutQuart: string;
  easeInBack: string;
  easeOutBack: string;
  easeInOutBack: string;
}

export interface TokensBase {
  border: TokensBaseBorder;
  shadow: TokensBaseShadow;
  zIndex: TokensBaseZIndex;
  opacity: TokensBaseOpacity;
  size: TokensBaseSize;
  color: TokensBaseColor;
  spacing: TokensBaseSpacing;
  fontFamily: TokensBaseFontFamily;
  fontSize: TokensBaseFontSize;
  fontWeight: TokensBaseFontWeight;
  lineHeight: TokensBaseLineHeight;
  letterSpacing: TokensBaseLetterSpacing;
  breakpoint: TokensBaseBreakpoint;
  duration: TokensBaseDuration;
  easing: TokensBaseEasing;
}

export interface TokensComponentButtonPrimary {
}

export interface TokensComponentButtonHover {
}

export interface TokensComponentButtonActive {
}

export interface TokensComponentButtonFocus {
}

export interface TokensComponentButtonDisabled {
}

export interface TokensComponentButtonVariantsSecondaryHover {
}

export interface TokensComponentButtonVariantsSecondaryActive {
}

export interface TokensComponentButtonVariantsSecondaryDisabled {
}

export interface TokensComponentButtonVariantsSecondary {
  hover: TokensComponentButtonVariantsSecondaryHover;
  active: TokensComponentButtonVariantsSecondaryActive;
  disabled: TokensComponentButtonVariantsSecondaryDisabled;
}

export interface TokensComponentButtonVariantsNakedHover {
}

export interface TokensComponentButtonVariantsNakedActive {
}

export interface TokensComponentButtonVariantsNakedDisabled {
}

export interface TokensComponentButtonVariantsNaked {
  hover: TokensComponentButtonVariantsNakedHover;
  active: TokensComponentButtonVariantsNakedActive;
  disabled: TokensComponentButtonVariantsNakedDisabled;
}

export interface TokensComponentButtonVariants {
  secondary: TokensComponentButtonVariantsSecondary;
  naked: TokensComponentButtonVariantsNaked;
}

export interface TokensComponentButtonSizesSmall {
}

export interface TokensComponentButtonSizesMedium {
}

export interface TokensComponentButtonSizesLarge {
}

export interface TokensComponentButtonSizes {
  small: TokensComponentButtonSizesSmall;
  medium: TokensComponentButtonSizesMedium;
  large: TokensComponentButtonSizesLarge;
}

export interface TokensComponentButton {
  primary: TokensComponentButtonPrimary;
  hover: TokensComponentButtonHover;
  active: TokensComponentButtonActive;
  focus: TokensComponentButtonFocus;
  disabled: TokensComponentButtonDisabled;
  variants: TokensComponentButtonVariants;
  sizes: TokensComponentButtonSizes;
}

export interface TokensComponentChipDefault {
}

export interface TokensComponentChipVariantsEmphasis {
}

export interface TokensComponentChipVariantsSubtle {
}

export interface TokensComponentChipVariantsInteractive {
}

export interface TokensComponentChipVariants {
  emphasis: TokensComponentChipVariantsEmphasis;
  subtle: TokensComponentChipVariantsSubtle;
  interactive: TokensComponentChipVariantsInteractive;
}

export interface TokensComponentChipSizesSmall {
}

export interface TokensComponentChipSizesMedium {
}

export interface TokensComponentChipSizesLarge {
}

export interface TokensComponentChipSizes {
  small: TokensComponentChipSizesSmall;
  medium: TokensComponentChipSizesMedium;
  large: TokensComponentChipSizesLarge;
}

export interface TokensComponentChip {
  default: TokensComponentChipDefault;
  variants: TokensComponentChipVariants;
  sizes: TokensComponentChipSizes;
}

export interface TokensComponentIconButtonPrimary {
}

export interface TokensComponentIconButtonHover {
}

export interface TokensComponentIconButtonActive {
}

export interface TokensComponentIconButtonFocus {
}

export interface TokensComponentIconButtonDisabled {
}

export interface TokensComponentIconButtonVariantsSecondaryHover {
}

export interface TokensComponentIconButtonVariantsSecondaryActive {
}

export interface TokensComponentIconButtonVariantsSecondaryDisabled {
}

export interface TokensComponentIconButtonVariantsSecondary {
  hover: TokensComponentIconButtonVariantsSecondaryHover;
  active: TokensComponentIconButtonVariantsSecondaryActive;
  disabled: TokensComponentIconButtonVariantsSecondaryDisabled;
}

export interface TokensComponentIconButtonVariantsNakedHover {
}

export interface TokensComponentIconButtonVariantsNakedActive {
}

export interface TokensComponentIconButtonVariantsNakedDisabled {
}

export interface TokensComponentIconButtonVariantsNaked {
  hover: TokensComponentIconButtonVariantsNakedHover;
  active: TokensComponentIconButtonVariantsNakedActive;
  disabled: TokensComponentIconButtonVariantsNakedDisabled;
}

export interface TokensComponentIconButtonVariants {
  secondary: TokensComponentIconButtonVariantsSecondary;
  naked: TokensComponentIconButtonVariantsNaked;
}

export interface TokensComponentIconButtonSizesSmall {
}

export interface TokensComponentIconButtonSizesMedium {
}

export interface TokensComponentIconButtonSizesLarge {
}

export interface TokensComponentIconButtonSizes {
  small: TokensComponentIconButtonSizesSmall;
  medium: TokensComponentIconButtonSizesMedium;
  large: TokensComponentIconButtonSizesLarge;
}

export interface TokensComponentIconButton {
  primary: TokensComponentIconButtonPrimary;
  hover: TokensComponentIconButtonHover;
  active: TokensComponentIconButtonActive;
  focus: TokensComponentIconButtonFocus;
  disabled: TokensComponentIconButtonDisabled;
  variants: TokensComponentIconButtonVariants;
  sizes: TokensComponentIconButtonSizes;
}

export interface TokensComponentSeparatorVariantsDefault {
}

export interface TokensComponentSeparatorVariantsStrong {
}

export interface TokensComponentSeparatorVariantsMinimal {
}

export interface TokensComponentSeparatorVariants {
  default: TokensComponentSeparatorVariantsDefault;
  strong: TokensComponentSeparatorVariantsStrong;
  minimal: TokensComponentSeparatorVariantsMinimal;
}

export interface TokensComponentSeparatorSizesSmall {
}

export interface TokensComponentSeparatorSizesMedium {
}

export interface TokensComponentSeparatorSizesLarge {
}

export interface TokensComponentSeparatorSizesXlarge {
}

export interface TokensComponentSeparatorSizes {
  small: TokensComponentSeparatorSizesSmall;
  medium: TokensComponentSeparatorSizesMedium;
  large: TokensComponentSeparatorSizesLarge;
  xlarge: TokensComponentSeparatorSizesXlarge;
}

export interface TokensComponentSeparator {
  variants: TokensComponentSeparatorVariants;
  sizes: TokensComponentSeparatorSizes;
}

export interface TokensComponentProgressBarSizesSm {
}

export interface TokensComponentProgressBarSizesMd {
}

export interface TokensComponentProgressBarSizesLg {
}

export interface TokensComponentProgressBarSizesXl {
}

export interface TokensComponentProgressBarSizes {
  sm: TokensComponentProgressBarSizesSm;
  md: TokensComponentProgressBarSizesMd;
  lg: TokensComponentProgressBarSizesLg;
  xl: TokensComponentProgressBarSizesXl;
}

export interface TokensComponentProgressBar {
  sizes: TokensComponentProgressBarSizes;
}

export interface TokensComponent {
  button: TokensComponentButton;
  chip: TokensComponentChip;
  iconButton: TokensComponentIconButton;
  separator: TokensComponentSeparator;
  progressBar: TokensComponentProgressBar;
}

export interface TokensSemanticBorder {
  default: string;
  subtle: string;
  strong: string;
  focus: string;
  tooltip: string;
}

export interface TokensSemanticSizeIcon {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface TokensSemanticSizeAvatar {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface TokensSemanticSize {
  icon: TokensSemanticSizeIcon;
  avatar: TokensSemanticSizeAvatar;
}

export interface TokensSemanticSpacingSeparator {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface TokensSemanticSpacingLayout {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
  '10xl': string;
  auto: string;
}

export interface TokensSemanticSpacing {
  separator: TokensSemanticSpacingSeparator;
  layout: TokensSemanticSpacingLayout;
}

export interface TokensSemanticColorText {
  default: string;
  emphasis: string;
  subdued: string;
  inverse: string;
  disabled: string;
  interactive: string;
  error: string;
  success: string;
  warning: string;
}

export interface TokensSemanticColorBackground {
  default: string;
  subtle: string;
  emphasis: string;
  surface: string;
  inverse: string;
  interactive: string;
  'interactive-subtle': string;
  'interactive-hover': string;
  'interactive-active': string;
  error: string;
  'error-subtle': string;
  success: string;
  'success-subtle': string;
  warning: string;
  'warning-subtle': string;
  disabled: string;
  progressTrack: string;
}

export interface TokensSemanticColorBorder {
  default: string;
  subtle: string;
  strong: string;
  interactive: string;
  error: string;
  success: string;
  warning: string;
}

export interface TokensSemanticColorIcon {
  default: string;
  emphasis: string;
  subdued: string;
  disabled: string;
  inverse: string;
  interactive: string;
  'interactive-hover': string;
  'interactive-active': string;
  error: string;
  success: string;
  warning: string;
}

export interface TokensSemanticColor {
  text: TokensSemanticColorText;
  background: TokensSemanticColorBackground;
  border: TokensSemanticColorBorder;
  icon: TokensSemanticColorIcon;
}

export interface TokensSemanticTypography {
  display: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  subtitle: string;
  body: string;
  small: string;
  overline: string;
  caption: string;
  button1: string;
  button2: string;
  button3: string;
  label: string;
  breadcrumb: string;
}

export interface TokensSemanticMotionTransition {
  fast: string;
  normal: string;
  slow: string;
}

export interface TokensSemanticMotion {
  transition: TokensSemanticMotionTransition;
  hover: string;
  focus: string;
  interactive: string;
}

export interface TokensSemantic {
  border: TokensSemanticBorder;
  size: TokensSemanticSize;
  spacing: TokensSemanticSpacing;
  color: TokensSemanticColor;
  typography: TokensSemanticTypography;
  motion: TokensSemanticMotion;
}

export interface Tokens {
  base: TokensBase;
  component: TokensComponent;
  semantic: TokensSemantic;
}


declare const tokens: Tokens;
export default tokens;
