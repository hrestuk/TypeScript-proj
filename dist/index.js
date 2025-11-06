"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let userName = "Ігор";
let userAge = 20;
console.log(`Користувач: ${userName}, Вік: ${userAge}`);
// Взаємодія з DOM
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const loadDataBtn = document.getElementById("loadData");
const postsContainer = document.getElementById("posts");
// Відкрити / закрити модальне вікно
openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
// Завантажити дані з JSONPlaceholder
loadDataBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts = yield res.json();
    postsContainer.innerHTML = posts
        .map(p => `<div class="post"><h3>${p.title}</h3><p>${p.body}</p></div>`)
        .join("");
}));
// Анімація при скролі
window.addEventListener("scroll", () => {
    document.body.style.backgroundColor =
        window.scrollY > 100 ? "#e0f7fa" : "#f2f2f2";
});
