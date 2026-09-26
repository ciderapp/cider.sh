/**
 * Shared open/closed state for the mobile navigation sheet. The layout reads it
 * to mark page content `inert` while the sheet is open.
 */
export const useMobileNav = () => {
  const open = useState<boolean>("mobile-nav-open", () => false);

  return {
    open,
    openNav: () => (open.value = true),
    closeNav: () => (open.value = false),
    toggleNav: () => (open.value = !open.value),
  };
};
