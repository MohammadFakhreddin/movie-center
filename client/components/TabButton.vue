<template>
    <v-flex row class="toolbar elevation-0">
            <v-btn class="elevation-0 xs-12 normalFont mediumText darkText">
                    {{text}}
            </v-btn>
            <div v-show="!isSelected" class="xs-12 toolbarLine">
            </div>
            <div v-show="isSelected" class="xs-12 toolbarLineSelected">
            </div>
            
    </v-flex>
</template>
<script>
    export default{
        data(){
            return{

            };
        },
        props:[
            'text',
            'isSelected'
        ]
    }
</script>
<style scoped>
.toolbar {
  width: 140px;
  margin: -5px;
}

.toolbarLine {
  height: 1px;
  background-color: #797979;
  margin-top: 8px;
}

.toolbarLineSelected{
  height: 2px;
  background-color: #252525;
  margin-top: 8px;
}
</style>