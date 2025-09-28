import { create } from 'zustand';

import { CurrencyMode } from '../constants/CurrencyMode';
import { CurrencyInfoType } from '../types/CurrencyInfo';
import { CurrencyModeType } from '../types/CurrencyMode';

type CurrencyStore = {
  datasets: Record<CurrencyModeType, CurrencyInfoType[]>;
  insertDataset: (key: CurrencyModeType, data: CurrencyInfoType[]) => void;
  clearDataset: (key: CurrencyModeType) => void;
};

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  datasets: {
    [CurrencyMode.CRYPTO]: [],
    [CurrencyMode.FIAT]: [],
  },
  insertDataset: (key, data) => {
    set((state) => ({
      datasets: { ...state.datasets, [key]: data },
    }));
  },
  clearDataset: (key) => {
    set((state) => ({
      datasets: { ...state.datasets, [key]: [] },
    }));
  },
}));
