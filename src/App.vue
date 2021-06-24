<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.flex {
  display: flex;
}
.flex-row {
  display: flex;
  align-items: center;
}
.flex-row-c {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-row-sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-row-sa {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.flex-row-jc {
  display: flex;
  justify-content: center;
}
.flex-column-c {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex-column-sb {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.white-word {
  color: #fff;
}

</style>
