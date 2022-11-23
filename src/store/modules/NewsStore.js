import router from "@/router.js";
import {getNews} from "@/api/news";

const NewsStore = {
    namespaced: true,
    state: {
        news: [],
    },
    mutations: {
        SET_NEWS: (state, news) => {
            state.news = news;
        },
    },
    actions:{
        async GetNews({ commit }) {
            await getNews(({ data }) => {
                console.log(data);
                commit("SET_NEWS", data.items);
            },
                (error) => {
                    console.log(error);
                }
            )
        },
    }
};
export default NewsStore;