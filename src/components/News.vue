<template>
    <div>
        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">News</h1>
            </md-table-toolbar>

            <md-table-row>
                <md-table-head>Title</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>PubDate</md-table-head>
            </md-table-row>

            <md-table-row v-for="info in infos" :key="info.link" :info="info">
                <a :href="info.link" target="_blank"><md-table-cell md-label="Title" v-html="info.title"></md-table-cell></a>
                <md-table-cell md-label="Description" v-html="info.description"></md-table-cell>
                <md-table-cell md-label="Pubdate" v-html="info.pubDate"></md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
import http from "@/api/http.js";
export default {
    name: "News",
    data() {
        return {
            infos:[
                {
                    title: '',
                    originallink: '',
                    link: '',
                    description : '',
                    pubDate : ''
                }
                
            ],
        }
    },
    created() {
        http.get(`/naver`)
            .then(({data}) => (this.infos = data.items));
    },
}
</script>

<style>
</style>