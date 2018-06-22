<template>
    
    <input v-if="(textColor==null)" input="text" inputmode="inputMode" id="toolbarSearchInput"
    :style="{width:width,height:height}"
    class="inlineDiv normalFont lightText  alignCenter  inputBorder"
    :value="inputValue"
    @input="updateInputValue($event.target.value)"
    :placeholder="placeHolder">
    <input v-else input="text" inputmode="inputMode" id="toolbarSearchInput"
    :style="{width:width,color:textColor,height:height}"
    class="inlineDiv normalFont  alignCenter  inputBorder"
    :value="inputValue"
    @input="updateInputValue($event.target.value)"
    :placeholder="placeHolder">
    
    
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        components:{

        },
        props:[
            'placeHolder',
            'inputMode',
            'width',
            'textColor',
            'height',
            'inputValue'
        ],
        methods:{
            updateInputValue:function(value){
                this.$emit('input',value)
            }
        }
    }
</script>
<style scoped>
    .inputBorder{
        font-size:18px;
        border:solid 1px #aaaaaa;
        border-radius: 4px;
        background-color:white
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #aaaaaa;
        opacity: 1; /* Firefox */
    }
</style>