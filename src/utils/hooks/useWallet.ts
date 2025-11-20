import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WalletState {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  reset: () => void;
}

const DEFAULT_BALANCE = 1_000_000;

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: DEFAULT_BALANCE,

      deposit: (amount) => set({ balance: get().balance + amount }),

      withdraw: (amount) => {
        const current = get().balance;
        if (current < amount) return false;
        set({ balance: current - amount });
        return true;
      },

      reset: () => set({ balance: DEFAULT_BALANCE }),
    }),
    {
      name: "user-wallet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
