/**
 * /app.js
 */
// express モジュールのインスタンス作成
const express = require("express");
const app = express();
// パス指定用モジュール
const path = require("path");
const fetch = require("node-fetch");

// secrets
require("dotenv").config();

// 8080番ポートで待ちうける
app.listen(8080, () => {
  console.log("Running at Port 8080...");
  console.log("view app on http://localhost:8080");
});

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/auth", (req, res) => {
  if (req.query.code) {
    const accessCode = req.query.code;
    const data = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: process.env.GRANT_TYPE,
      redirect_uri: process.env.REDIRECT_URI,
      code: accessCode,
      scope: process.env.SCOPE,
    };

    fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: new URLSearchParams(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((discordRes) => discordRes.json())
      // .then((info) => {
      //   console.log(info);
      //   return info;
      // })
      .then(
        (info) => {
          // console.log(info);
          res.redirect(
            `/success.html#access_token=${info.access_token}&token_type=${info.token_type}&state=${req.query.state}`
          );
        }
        // fetch("https://discord.com/api/users/@me", {
        //   headers: {
        //     authorization: `${info.token_type} ${info.access_token}`,
        //   },
        // })
      );
    // .then((userRes) => userRes.json())
    // .then(console.log);
  } else {
    res.sendFile(path.join(__dirname, "public/index.html"));
  }
});

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});
