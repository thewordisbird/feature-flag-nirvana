import dotenv from "dotenv";
import { getFlags } from "./cloudbees";

dotenv.config();

async function printResults() {
  const result = await getFlags();
  console.log(result);
}

printResults();
