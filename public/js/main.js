import { generateRandomString } from "./genRandStr";

// 環境変数
const API_BASE_URL = process.env.API_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AVATAR_BASE_URL = process.env.AVATAR_BASE_URL;
const SERVER_ICON_URL = process.env.SERVER_ICON_URL;

window.onload = () => {
  init();
};

function getQueryString(params) {
  return Object.keys(params).map(key => (
    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  )).join('&');
}

function init() {
  const urlHash = new URLSearchParams(window.location.hash.slice(1));
  const fragment = {
    tokenType: sessionStorage.getItem("d_tokenType"),
    accessToken: sessionStorage.getItem("d_access_token"),
    state: sessionStorage.getItem("d_state"),
  };
  // console.log(fragment);
  if (fragment.accessToken != "undefined" && fragment.accessToken != null) {
    console.log("accessToken find");
    const urlState = fragment.state;
    const stateParameter = localStorage.getItem("stateParameter");
    // console.log(stateParameter);
    // console.log(urlState);
    if (stateParameter !== urlState) {
      return console.log("You may have been clickjacked!");
    }

    const accessToken = fragment.accessToken;
    const tokenType = fragment.tokenType;

    main(tokenType, accessToken);
  } else {
    let state = urlHash.get("state");
    if (state == null) {
      state = generateRandomString();
    }
    // console.log(state);
    localStorage.setItem("stateParameter", state);

    // ログインURL生成
    const scope = ['identify', 'guilds'];
    const qs = getQueryString({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: scope.join(' '),
      state: state,
    });
    let loginUrl = `${API_BASE_URL}/oauth2/authorize?${qs}`;

    document.getElementById("login_url").href = loginUrl;
    document.getElementById("accbtn").style.display = "block";
  }
}

function main(tokenType, accessToken) {
  // あいさつ
  fetchData("users/@me", tokenType, accessToken)
    .then((data) => {
      const { username, discriminator, avatar, id } = data;
      let doc = document.getElementById("userAvatar");
      doc.src = `${AVATAR_BASE_URL}/${id}/${avatar}.png`;
      let doc2 = document.getElementById("userName");
      doc2.innerHTML = `こんにちは、<br /> ${username}#${discriminator}さん。`;
    })
    .catch((err) => {
      console.log(err);
    });
  // ギルドデータ取得
  fetchData("users/@me/guilds", tokenType, accessToken)
    .then((data) => {
      renderGuidMaxSize(data.length);
      const uSLI = document.getElementById("userServerLimitInfo");
      uSLI.innerHTML = `現在${data.length}個のサーバーに参加しています。`;
      uSLI.innerHTML +=
        data.length < 50
          ? ""
          : data.length > 80
          ? `サーバー上限数まであと${100 - data.length}個です。`
          : "サーバー上限数が近づいています。";
      renderGuildList(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fetchData(url, tokenType, accessToken) {
  const res = await fetch(`${API_BASE_URL}/${url}`, {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
}

function renderGuidMaxSize(size) {
  var ctx = document.getElementById("myChart").getContext("2d");

  const data = {
    labels: ["参加したサーバー"],
    datasets: [
      {
        label: "Dataset 1",
        data: [size, 100 - size],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(233, 233, 233)"],
      },
    ],
  };
  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
    },
  };
  var myChart = new Chart(ctx, config);
}

function renderGuildList(data) {
  var container = document.getElementById("infoCardContainer");
  console.table(data);
  container.innerHTML = " ";
  data.forEach((item, index) => {
    let icon = `<img
    src="${SERVER_ICON_URL}/${item.id}/${item.icon}.png"
  />`;
    if (item.icon == null) {
      icon = item.name;
    }
    let tips = "";
    item.features.forEach((fea) => {
      tips += `<span class="mdl-chip">
      <span class="mdl-chip__text">${fea}</span>
  </span>`;
    });
    const tmp = `<!-- info card grid ${index + 1} -->
    <div
      class="demo-updates mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-phone mdl-color--blue-grey-600"
    >
      <!-- info card-->
      <div
        class="mdl-card__title mdl-card--expand"
        style="background-color: #${calcIdToHex(item.id)} !important"
      >
        ${icon}
        <h2 class="mdl-card__title-text mdl-color-text--white">
          ${item.name}
        </h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--blue-grey-100">
        ${tips}
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a
          href="#"
          class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-100"
          >Read More</a
        >
      </div>
      <!-- info card end -->
    </div>
    <!-- info card grid ${index + 1} end -->`;
    // 挿入
    container.insertAdjacentHTML("beforeend", tmp);
  });
}
function calcIdToHex(id) {
  id = Math.round(id / 100000000000);
  id = id.toString(16).toUpperCase();
  id = id.padStart(6, "0");
  return id;
}
