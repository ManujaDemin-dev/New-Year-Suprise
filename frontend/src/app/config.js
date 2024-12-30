const ENVIRONMENT = "DEV";

const config = {
  BASE_API_URL: "http://backend/api/v1",

  FRONTEND_URL:
    ENVIRONMENT === "DEV"
      ? "http://localhost:3000"
      : "https://wishcraft.ravinath.online",

  BASE_API_URL_DOCKER:
    ENVIRONMENT === "DEV"
      ? "http://localhost:8081/api/v1"
      : "https://64.227.46.49/api/v1",
};

export default config;
