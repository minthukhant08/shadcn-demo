import { create } from 'zustand'

type DialogStore = {
  open: boolean,
  setOpen: (open: boolean) => void
}

export const useGlobalDialogStore = create<DialogStore>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open })),
}))

