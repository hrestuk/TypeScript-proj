
let userName: string = "Ігор";
let userAge: number = 20;

console.log(`Користувач: ${userName}, Вік: ${userAge}`);

// Взаємодія з DOM
const modal = document.getElementById("modal") as HTMLDivElement;
const openBtn = document.getElementById("openModal") as HTMLButtonElement;
const closeBtn = document.getElementById("closeModal") as HTMLButtonElement;
const loadDataBtn = document.getElementById("loadData") as HTMLButtonElement;
const postsContainer = document.getElementById("posts") as HTMLDivElement;

// Відкрити / закрити модальне вікно
openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Завантажити дані з JSONPlaceholder
loadDataBtn.addEventListener("click", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts: { title: string; body: string }[] = await res.json();

  postsContainer.innerHTML = posts
    .map(p => `<div class="post"><h3>${p.title}</h3><p>${p.body}</p></div>`)
    .join("");
});

// Анімація при скролі
window.addEventListener("scroll", () => {
  document.body.style.backgroundColor =
    window.scrollY > 100 ? "#e0f7fa" : "#f2f2f2";
});
