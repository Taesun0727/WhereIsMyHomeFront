<template>
  <md-card>
    <md-ripple>
      <md-card-content>
        <h1 class="title">{{ title }}</h1>
      </md-card-content>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: "ComponentTitle",
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
