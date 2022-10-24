/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig, 
  env: {
    GOOGLE_API_KEY: "AIzaSyBx5aRD2vIFeiqNRPqmHcx66Dldvbk63Mw", 
    GOOGLE_AUTH_DOMAIN:"api-practice-34748.firebaseapp.com",
    GOOGLE_PROJECT_ID:"api-practice-34748",
    GOOGLE_STORAGE_BUCKET:"api-practice-34748.appspot.com",
    GOOGLE_MESSAGING_SENDER_ID:"176420384681", 
    APP_ID:"1:176420384681:web:3fb0b169e97d935e055eb8"
  }, 
}
