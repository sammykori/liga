
import { create } from 'zustand'

type State = {
  menu: boolean
  openMenu: () => void
  closeMenu: () => void
}

const useMenuStore = create<State>((set) => ({
  menu: false,
  openMenu: () => set({ menu: true }),
  closeMenu: () => set({ menu: false }),
}))

export default useMenuStore
