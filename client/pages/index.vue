<template>
  <v-layout column justify-center align-center>
    <v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
  export default{
    data () {
      return{

      }
    },created:function(){
      this.$router.push({ name: 'home'})
    }
  }
</script>
