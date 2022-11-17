import axios from "axios";

const BASE_ENDPOINT = "https://x-api.rollout.io/public-api/applications/";
export function getFlags(
  appId: string,
  userToken: string,
  environment: string
) {
  const endpoint = `${BASE_ENDPOINT}${appId}/${environment}/flags`;
  try {
    return axios(endpoint, {
      method: "get",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${userToken}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export function getGroups(
  appId: string,
  userToken: string,
  environment: string
) {
  const endpoint = `${BASE_ENDPOINT}${appId}/${environment}/target-groups`;
  try {
    return axios(endpoint, {
      method: "get",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${userToken}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
