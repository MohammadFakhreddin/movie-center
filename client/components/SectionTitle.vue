<template>
    <v-container>
        <v-layout row wrap  justify-end>
            <span class="yekanFont mediumText lightText ">{{text}}</span>
        </v-layout>
        <v-layout row wrap justify-end>
            <div id="titleDivider" :style="{width:divWidth}"></div>
        </v-layout>    
        <v-layout >
            <v-divider></v-divider>
        </v-layout>
    </v-container>   
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        props:[
            'text',
            'divWidth'
        ]
    }
</script>

<style scoped>
    #titleDivider{
        height:2px;
        background-color:lightslategrey;
    }
</style>