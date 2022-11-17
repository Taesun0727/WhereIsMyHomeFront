<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-75 mx-auto">
              <title-component :title="title"></title-component>
              <router-view style="transform: translate3d(0, -20%, 0);"></router-view>
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
  name: "qa",
  data() {
    return {
      title: "Q & A",
    };
  },
  components: {
    TitleComponent,
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
};
</script>

<style scoped>
.page-header {
  height: 380px;
}
</style>
