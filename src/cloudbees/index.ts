import axios from "axios";

export async function getFlags() {
  const endpoint = `https://x-api.rollout.io/public-api/applications/${process.env.CLOUDBEES_APP_ID}/Production/flags`;
  try {
    return await axios(endpoint, {
      method: "get",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.CLOUDBEES_USER_TOKEN}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
