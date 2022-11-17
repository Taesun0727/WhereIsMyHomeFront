<template>
  <md-card class="md-primary" md-theme="purple-card" md-with-hover>
    <md-ripple>
      <md-card-content>
        <h1 class="title">{{ title }}</h1>
      </md-card-content>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: "title",
  props: {
    title: String,
  },
};
</script>

<style scoped>
.md-card {
  transform: translate3d(0, -150%, 0);
  height: 100px;
}
.md-card-content {
  text-align: center;
  font-size: 50px;
}
</style>
