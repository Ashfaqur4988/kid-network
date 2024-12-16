import axios from "axios";
import logger from "../logger.js";
export const fakeUserGenerator = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const data = response.data.results[0];

    logger.info("fakeUserGenerator: Fetched fake user");
    return {
      firstName: data.name.first,
      lastName: data.name.last,
      country: data.location.country,
    };
  } catch (error) {
    logger.error(`Error generating fake user: ${error.message}`);
  }
};
