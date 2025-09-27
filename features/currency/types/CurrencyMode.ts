import { CurrencyMode } from '../constants/CurrencyMode';

export type CurrencyModeType = (typeof CurrencyMode)[keyof typeof CurrencyMode];
