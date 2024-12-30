const ENVIRONMENT = "DEV";

const config = {
  BASE_API_URL: "http://backend/api/v1",

  FRONTEND_URL:
    ENVIRONMENT === "DEV"
      ? "http://localhost:3000"
      : "https://wishcraft.ravinath.dev",

  BASE_API_URL_DOCKER:
    ENVIRONMENT === "DEV"
      ? "http://localhost:8081/api/v1"
      : "http://64.227.46.49/api",
};

export default config;
