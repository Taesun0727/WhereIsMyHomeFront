import { apiInstance } from "./index.js";

const api = apiInstance();

async function getNews(success, fail) {
    await api.get(`/naver`).then(success).catch(fail);
}

export {getNews};