const ENVIRONMENT = "DEV";

const config = {
  BASE_API_URL: "http://backend/api/v1",

  FRONTEND_URL:
    ENVIRONMENT === "DEV"
      ? "http://localhost:3000"
      : "https://wishcraft.ravinath.dev",

  BASE_API_URL_DOCKER: "http://localhost:8081/api/v1",
};

export default config;
