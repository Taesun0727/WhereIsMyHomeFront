<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div style="height: 100%;">
        <router-view />
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>
