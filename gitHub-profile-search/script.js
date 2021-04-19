const APIURL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("Danijel00");

async function getUser(username){
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    
    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user){
   const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}"
             alt="${user.name}"/>
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li><i class="fas fa-user-friends"></i>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li><i class="fas fa-book"></i>${user.public_repos}<strong>Repos</strong></li>
            </ul>

            <h4>Repos<i class="fas fa-level-down-alt"></i></h4>
            <div class="repos" id="repos"></div>
        </div>
    </div> 
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposElement = document.getElementById("repos");

    repos.sort((a, b) => b.stargazers_count - 
    a.stargazers_count).slice(0, 10)
    .forEach((repo) => {
        const repoElement = document.createElement("a");
        repoElement.classList.add("repo");

        repoElement.href = repo.html_url;
        repoElement.target = "_blank";
        repoElement.innerText = repo.name;

        reposElement.appendChild(repoElement);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = "";
    }
});