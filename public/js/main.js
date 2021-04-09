window.onload = () => {
  init();
};

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
      state = generateRandomString_v3();
    }
    // console.log(state);
    localStorage.setItem("stateParameter", state);

    document.getElementById("login").href += `&state=${state}`;
    document.getElementById("login").style.display = "block";
  }
}

function main(tokenType, accessToken) {
  // あいさつ
  fetchData("users/@me", tokenType, accessToken)
    .then((data) => {
      const { username, discriminator, avatar, id } = data;
      let doc = document.getElementById("info");
      doc.innerHTML = " ";
      doc.innerHTML = `<img src="https://cdn.discordapp.com/avatars/${id}/${avatar}.png"/>`;
      doc.innerHTML += `こんにちは！ ${username}#${discriminator}さん。今日はなにをしましょう？`;
    })
    .catch((err) => {
      console.log(err);
    });
  // ギルドデータ取得
  fetchData("users/@me/guilds", tokenType, accessToken)
    .then((data) => {
      document.getElementById(
        "guilds_count"
      ).innerHTML = `あなたは今、${data.length}個のサーバーに参加しています。`;
      let doc = document.getElementById("guilds_list");

      data.forEach((data) => {
        doc.innerHTML += data.name + "<br />";
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fetchData(url, tokenType, accessToken) {
  const res = await fetch("https://discord.com/api/" + url, {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
}
