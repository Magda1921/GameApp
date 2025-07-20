export const constructToggleSections =
  (hideClass, showClass, hideSection, showSection) => () => {
    hideSection.classList.add(hideClass);
    showSection.classList.remove(showClass);
  };
