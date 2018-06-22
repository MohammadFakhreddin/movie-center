<template>
    <div>
        <span flat v-show="!isSelected" class="normalFont movieTag mediumText">{{text}}</span>  
        <span flat v-show="isSelected" class="normalFont movieTag mediumText isSelected">{{text}}</span>  
    </div>
</template>
<script>
    export default{
        data(){
            return{
                
            }
        },
        props:[
            'isSelected',
            'text'
        ]
    }
</script>
<style scoped>   

.movieTag{
  color: white;
  float:right;
  width: 5em;
  user-select: none;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.isSelected{
  background-color: #323232;
  border-radius: 4px;
}

</style>
