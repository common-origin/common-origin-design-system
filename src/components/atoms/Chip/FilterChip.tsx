import { InputChip, type InputChipProps } from './InputChip'

/**
 * @deprecated Renamed to `InputChipProps`. In 3.0 `FilterChipProps` becomes the props of the toggle chip.
 */
export type FilterChipProps = InputChipProps

/**
 * FilterChip - a removable chip with an optional selected state.
 *
 * @deprecated Renamed to `InputChip`; in 3.0 `FilterChip` becomes the toggle chip (today's
 * `BooleanChip`). Replace `FilterChip` with `InputChip` first, then `BooleanChip` with
 * `FilterChip` when you upgrade to 3.0 (decision 0016).
 */
export const FilterChip = InputChip
