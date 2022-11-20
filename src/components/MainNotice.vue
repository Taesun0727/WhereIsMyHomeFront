<template>
    <div>
        <md-table md-card>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h3 style="color:black; font-weight:bold;">공지사항</h3>
                </div>
                <div class="md-toolbar-section-end">
                    <router-link :to="{name : 'notice'}">더보기 +</router-link>
                </div>
            </md-table-toolbar>

            
            <md-table-head>Title</md-table-head>
            <!-- <md-table-head>Description</md-table-head> -->
            <md-table-head>PubDate</md-table-head>
            

            <md-table-row v-for="notice in notices" :key="notice.num" :notice="notice">
                <md-table-cell md-label="Title" >
                    <router-link :to="{ name: 'noticeview', params: { noticeNum: notice.notice_num } }">
                        {{notice.notice_title}}
                    </router-link>
                </md-table-cell>
                <md-table-cell md-label="RegisterDate" >
                    {{ notice.notice_register_date }}
                </md-table-cell>
                <!-- <md-table-cell md-label="Description" v-html="info.description"></md-table-cell>
                <md-table-cell md-label="Pubdate" v-html="info.pubDate"></md-table-cell> -->
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const noticeStore = "noticeStore";

export default {
    name: "MainNotice",
    components: {},
    data() {
        return {};
    },
    methods: {
        ...mapActions(noticeStore, ["GetNotices"]),
    },
    computed: {
    ...mapState(noticeStore, ["notices"]),
    },
    created() {
        this.GetNotices();
    },
};
</script>

<style>

</style>