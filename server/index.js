require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const DISCORD_CLEINT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_OPEN_SOURCE__ROLE_ID = process.env.DISCORD_OPEN_SOURCE__ROLE_ID;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

const discordApiInstace = axios.create({
  baseURL: "https://discord.com/api",

  headers: {
    "Accept-Encoding": "*",
  },
});

app.get("/discord/verify/:code", async (req, res) => {
  try {
    const code = req.params.code;
    console.log("Getting Access Token");
    console.log({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLEINT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    });
    const { data: tokenInfo } = await discordApiInstace.post(
      `/oauth2/token`,
      {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLEINT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "*",
        },
      }
    );

    if (!tokenInfo || !tokenInfo.access_token)
      return res.status(404).json({ error: "access_token not found" });

    const accessToken = tokenInfo.access_token;

    console.log("Getting User Public Info");
    const { data: userInfo } = await discordApiInstace.get("/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userInfo) return res.status(404).json({ error: "userInfo not found" });

    // TODO: Verify if the user has purchased the course because you have the email id of user
    const { email, id } = userInfo;
    console.log(`User Email`, email);

    // Add the user to the discord group
    await discordApiInstace.put(
      `/guilds/${DISCORD_GUILD_ID}/members/${userInfo.id}`,
      {
        access_token: accessToken,
      },
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
        responseType: "json",
      }
    );

    console.log("Assigning role to user");
    await discordApiInstace.put(
      `/guilds/${DISCORD_GUILD_ID}/members/${userInfo.id}/roles/${DISCORD_OPEN_SOURCE__ROLE_ID}`,
      {},
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      }
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
