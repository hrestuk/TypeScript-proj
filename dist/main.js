import { initModal } from "./modules/modal.js";
import { loadPosts } from "./modules/fetchPosts.js";
import { initScrollEffect } from "./modules/scrollEffect.js";
let userName = "Ігор";
let userAge = 20;
console.log(`Користувач: ${userName}, Вік: ${userAge}`);
initModal();
loadPosts();
initScrollEffect();
