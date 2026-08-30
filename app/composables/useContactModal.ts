/**
 * Shared open/close state for the contact modal, so any "Contact us" button on
 * the page can drive the single modal instance mounted in pages/index.vue.
 *
 * Uses `useState` rather than a module-level ref so the state is per-request
 * during prerender instead of shared across renders.
 */
export function useContactModal() {
  const isOpen = useState('contact-modal-open', () => false)

  return {
    isOpen,
    open: () => {
      isOpen.value = true
    },
    close: () => {
      isOpen.value = false
    }
  }
}
