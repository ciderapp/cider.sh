/**
 * Shared open/closed state for the global command palette so any surface
 * (desktop header, mobile top bar, bottom nav, keyboard shortcut) can open it.
 */
export const useSearchDialog = () => {
  const open = useState<boolean>("search-dialog-open", () => false);

  return {
    open,
    openSearch: () => (open.value = true),
    closeSearch: () => (open.value = false),
    toggleSearch: () => (open.value = !open.value),
  };
};
