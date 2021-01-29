<template>
  <v-app>
    <CSV />
  </v-app>
</template>

<script>
import CSV from "@/components/CSV";

export default {
  name: "App",

  components: {
    CSV,
  },

};
</script>

<style lang="scss">
@import "scss/main";
</style>