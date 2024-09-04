<template>
  <main class="">
    <NavBar />
    <div class="">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import NavBar from './Components/NavBar.vue'

export default {
  name: 'DashLayout',
  components: { NavBar }
}
</script>

<style scoped></style>
