import dotenv from "dotenv";
import { getFlags } from "./cloudbees";

dotenv.config();

const apps = [
  {
    appId: process.env.CLOUDBEES_APP_ID || "",
    userToken: process.env.CLOUDBEES_USER_TOKEN || "",
    environment: process.env.CLOUDBEES_ENVIRONMENT || "",
    userId: process.env.CLOUDBEES_USER_ID || "",
  },
];

async function printResults() {
  for (let app of apps) {
    const response = await getFlags(app.appId, app.userToken, app.environment);
    response?.data.forEach((result: any) => {
      // if (result.name.split(".")[1] === "reactRouting") {
      //   console.log(JSON.stringify(result));
      //   console.log(result?.conditions[0].property.operand);
      // }

      let flagValue = result.value;
      // For each result check if there are conditions
      if (result?.conditions) {
        for (let condition of result.conditions) {
          const category = condition.hasOwnProperty("property")
            ? "property"
            : condition.hasOwnProperty("group")
            ? "group"
            : condition.hasOwnProperty("flag")
            ? "flag"
            : condition.hasOwnProperty("version")
            ? "version"
            : "unknown";

          switch (category) {
            case "property":
              const property = condition.property.name;
              const operator = condition.property.operator;
              if (operator === "in-array") {
                for (let o of condition.property.operand) {
                  if (app.userId === o) {
                    // console.log("setting override", condition);
                    flagValue = condition.value;
                  }
                }
              }
              break;
            case "group":
              break;
            default:
              throw new Error("Unable to process category at this time");
          }
        }
      }
      console.log(result.name.split(".")[1], flagValue);
      /*
      // The default value is always available at result.value
      let flagValue = result.value;
      // If the result.conditions array is populated, check for the user
      if (result.conditions) {
        for (let condition of result.conditions) {
          // There are different types of conditions but to start we can just look at property.userId
          // and use a group lookup to see if the user is in the group
          if (condition.hasOwnProperty("property")) {
            if (condition.property?.userId) {
              if (condition.property.userId === app.userId) {
                flagValue = condition.value;
              }
            }
          }
        }
        */

      // console.log(`${result.name.split(".")[1]}: ${result.value}`);
    });
  }
}

printResults();
