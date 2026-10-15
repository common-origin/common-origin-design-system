import tokensJson from '../styles/tokens.json'
import type { Tokens } from '../styles/tokens'
import { withCssVariables } from './cssVariables'

/**
 * The tokens as components read them (decision 0041): the same shape and type as `tokens.json`,
 * with every value a CSS variable that falls back to the resolved value, so a region can change a
 * token through tokens.css. Breakpoints stay values.
 *
 * Use the resolved values from `tokens.json` instead where a value is read as data rather than
 * CSS, such as a duration parsed for a timer.
 *
 * Jest maps this module to `tokens.json` (jest.config.js), so unit tests assert resolved values;
 * the browser specs check the variables.
 */
const tokens: Tokens = withCssVariables(tokensJson as Tokens)

export default tokens
