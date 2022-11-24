<template>
  <footer class="footer" :class="{ [`footer-${type}`]: type }" :data-background-color="backgroundColor">
    <div class="container" style="justify-content: end;">
      <div class="copyright">
        &copy; {{ year }}, made with <md-icon>favorite</md-icon> by
        <a href="https://github.com/Jung-jin-su" target="_blank">정진수</a>
        ,
        <a href="https://github.com/Taesun0727" target="_blank">강태선</a>
        SSAFY 서울 14반
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
