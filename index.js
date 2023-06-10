"use strict";
const btn = document.querySelector("#btn");
const input = document.querySelector("input");
const container = document.querySelector(".container");

console.log(btn);
btn.addEventListener("click", () => {
  const inputValue = input.value;
  user(inputValue);
  input.value = "";
});
const creatingUserProfile = function (userData) {
  container.innerHTML = "";
  const {
    avatar_url,
    name,
    bio,
    followers,
    following,
    public_repos,
    company,
    repos_url,
  } = userData;

  console.log(repos_url);
  const element = `
  <div class="img-container">
        <img
          src=${avatar_url}
          alt=${name}
        />
      </div>
      <div class="info">
        <div class="name">
          <h2>${name}</h2>
          <small>${company === null ? "still learning🤐" : company}</small>
        </div>
        <p>
        ${bio}
        </p>
        <div class="icons">
          <div class="eye"><i class="fa-regular fa-eye"></i> <span>${followers}</span></div>
          <div class="heart">
            <i class="fa-solid fa-heart"></i> <span>${following}</span>
          </div>
          <div class="heart">
            <i>repos</i> <span>${public_repos}</span>
          </div>
        </div>
        <div class="rep">
            <ul class="repos"></ul>
        </div>
      </div>
  `;
  container.insertAdjacentHTML("afterbegin", element);
  reposUrl(repos_url);
};
const user = async function (userName) {
  const res = await fetch(`https://api.github.com/users/${userName}`);
  const userData = await res.json();
  console.log(userData);
  creatingUserProfile(userData);
};
const reposUrl = async function (url) {
  const repos = document.querySelector(".repos");
  console.log(repos);
  const res = await fetch(url);
  const userData = await res.json();
  console.log(userData);
  const { name, html_url } = userData;
  for (let i = 0; i < 3; i++) {
    if (i === 3) break;
    const li = `
  <li>
  <a href="${userData[i].html_url}">${userData[i].name}</a>
  </li>
 `;
    repos.insertAdjacentHTML("beforeend", li);
  }
};

// user("niravbhuva99");
