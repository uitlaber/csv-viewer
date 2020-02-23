<template>
<div id="app">
  <div class="content">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'csv-notes'
}
</script>

<style>

@font-face {
 font-family: "Jetbrains Mono";
 src: url("./assets/fonts/woff2/JetBrainsMono-Regular.woff2") format("woff2"),
        url("./assets/fonts/woff/JetBrainsMono-Regular.woff") format("woff");
}


html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Jetbrains Mono';

}


*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #F5F5F5;
}

*::-webkit-scrollbar-thumb {
  background-color: #AAA;
  border-radius: 10px;
}

#app {
  height: 100vh;
}

.field {
  margin-bottom: 1rem;
}

.content {
  height: 90%;
  max-height: 100%;
}
</style>
