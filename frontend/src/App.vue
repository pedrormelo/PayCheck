<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div>
    <h1>Sistema de Contratos</h1>
    <ContratoTabela />
  </div>
</template>

<script>
import index-search from "./components/index.vue";

export default {
  components: {
    index-search
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>

