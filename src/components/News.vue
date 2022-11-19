<template>
    <div>
        <thead>
            <td>제목</td>
            <td>본링크</td>
            <td>링크</td>
            <td>설명</td>
            <td>발행날짜</td>
        </thead>
        <tbody>
            <tr v-for="info in infos" :key="info.lastBuildDate" :info="info">
                <td>{{info.title}}</td>
                <td>{{info.originallink}}</td>
                <td>{{info.link}}</td>
                <td>{{info.description}}</td>
                <td>{{info.pubDate}}</td>
            </tr>
        </tbody>
    </div>
</template>

<script>
import http from "@/api/http.js";
export default {
    name: "News",
    data() {
        return {
            infos:{
                title: '',
                originallink: '',
                link: '',
                description : '',
                pubDate : '',
            },
        }
    },
    created() {
        http.get(`/naver`)
            .then(({data}) => (this.infos = data.items));
    },
    methods: {
    },
}
</script>

<style>

</style>