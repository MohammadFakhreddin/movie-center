<template>
<v-container fluid>
<v-layout row class="toolbarParent" >
    <v-flex xs2 v-show="!isSelected">
        <div class="line">
        </div>
    </v-flex>
    <v-flex xs2 v-show="isSelected">
        <div  class="lineSelected">
        </div>
    </v-flex>
    <v-flex xs10 class="toolbar elevation-0 fill-height text-xs-center">
        <v-btn class="elevation-0  text-xs-center normalFont bold title" small color="white" >
            {{text}}
        </v-btn>    
    </v-flex>
</v-layout>
</v-container>
</template>

<script>
export default{


  data () {
    return {

    }
  },
  props: [
    'isSelected',
    'text'
  ]
}
</script>

<style scoped>
.toolbar {
    width: 140px;
    height: 50px;
    background-color: white
}

.toolbarParent{
    width: 150px;
    height: 50px; 
    background-color: white;
    margin-top:-2.29em
}

.title{
    color: dodgerblue;
    font-size:5px;
}
  
.line {
    width: 4px;
    height: 50px;
    background-color: #797979;
}
  
.lineSelected{
    width: 4px;
    height: 50px;
    background-color: dodgerblue;
}


</style>