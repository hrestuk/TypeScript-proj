export function initModal(): void {
  const modal = document.getElementById("modal") as HTMLDivElement;
  const openBtn = document.getElementById("openModal") as HTMLButtonElement;
  const closeBtn = document.getElementById("closeModal") as HTMLButtonElement;

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
