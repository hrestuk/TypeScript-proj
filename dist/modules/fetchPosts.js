var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const loadDataBtn = document.getElementById("loadData");
        const postsContainer = document.getElementById("posts");
        loadDataBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
            const posts = yield res.json();
            postsContainer.innerHTML = posts
                .map((p) => `<div class="post"><h3>${p.title}</h3><p>${p.body}</p></div>`)
                .join("");
        }));
    });
}
