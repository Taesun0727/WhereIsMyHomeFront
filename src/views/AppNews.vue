<template>
    <div class="wrapper">
        <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
        <div class="main main-raised">
            <div class="section profile-content">
                <div class="container">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-75 mx-auto">
                            <title-component :title="title"></title-component>
                            <a :href="info.link" target="_blank" style="color: black;"
                                ><md-table-cell md-label="Title" v-html="info.title"></md-table-cell
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from "../components/TitleComponent.vue";

export default {
    name: "news",
    data() {
        return {
            title: "NEWS",
        };
    },
    components: {
        TitleComponent,
    },
    props: {
        header: {
            type: String,
            default: require("@/assets/img/main.jpg"),
        },
    },
    computed: {
        headerStyle() {
            return {
                backgroundImage: `url(${this.header})`,
            };
        },
    },
    
    
}
</script>

<style>

</style>