import { Post } from "../types/post";

export async function loadPosts(): Promise<void> {
  const loadDataBtn = document.getElementById("loadData") as HTMLButtonElement;
  const postsContainer = document.getElementById("posts") as HTMLDivElement;

  loadDataBtn.addEventListener("click", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts: Post[] = await res.json();

    postsContainer.innerHTML = posts
      .map((p) => `<div class="post"><h3>${p.title}</h3><p>${p.body}</p></div>`)
      .join("");
  });
}
