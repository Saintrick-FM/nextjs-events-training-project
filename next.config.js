/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        firebase_db:
          "https://next-prerendering-b9ecc-default-rtdb.firebaseio.com/events.json",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      firebase_db:
        "https://next-prerendering-b9ecc-default-rtdb.firebaseio.com/events.json",
    },
  };
};

module.exports = nextConfig; // this is equivalent the the export default on the frontend part
