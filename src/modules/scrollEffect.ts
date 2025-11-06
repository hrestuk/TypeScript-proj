export function initScrollEffect(): void {
  window.addEventListener("scroll", () => {
    document.body.style.backgroundColor =
      window.scrollY > 100 ? "#e0f7fa" : "#f2f2f2";
  });
}
