<template>
    <v-container  justify-center align-center class="container"  @mouseover="onMouseEnter" @mouseout="onMouseOut">
        <v-layout row justify-center align-center>
            <v-flex justify-center text-xs-center >
                <img id="movieImage" class="movieImage" v-bind:src="imageSrc" alt="دانلود انیمیشن All I Want for Christmas Is You">
            </v-flex>
        </v-layout>
        <v-layout row justify-center align-center id="hoverParent" v-show="isHoverVisible">
            <v-layout  row justify-center align-center >
                <div class="darkBackground movieItemOverlay text-xs-center " id="moveItemOverlayBackground"></div>
            </v-layout>
            <v-layout column justify-center align-center id="movieItemOverlayParent" class="movieItemOverlay">
                <v-layout column justify-center align-center >
                    <div class="normalFont bold yellowText largeText mt-4">دانلود فیلم</div>
                    <div id="movieName" class="englishFont whiteText largeText">{{movieName}}</div>
                    <div id="movieYear" class="normalFont yellowText largeText  mb-2">{{movieYear}}</div>
                </v-layout>
                <v-layout row  justify-center align-center>
                    <v-flex>
                        <v-icon medium dark  class="text-xs-center ml-2 mr-2">fa-download</v-icon>
                    </v-flex>
                    <v-flex>      
                        <v-icon medium dark  class="text-xs-center  ml-2 mr-2">fa-heart-o</v-icon>
                    </v-flex>
                    <v-flex>
                        <v-icon medium dark  class="text-xs-center  ml-2 mr-2">fa-play</v-icon>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center align-center>
                    <div id="persianName" class="yekanFont largeText whiteText mb-4 bold">{{persianMovieName}}</div>
                </v-layout>
            </v-layout>
        </v-layout>
    </v-container>
</template>
<script>
    export default{
        data(){
            let isHoverVisible = false;
            return{
                isHoverVisible
            }
        },
        props:[
            'movieName',
            'movieYear',
            'persianMovieName',
            'imageSrc'
        ],
        methods:{
            onMouseEnter:function(){
                this.isHoverVisible = true;
          },
            onMouseOut:function(){
                this.isHoverVisible = false;
            }
        },
        mounted: function () {
        }
    }
</script>
<style scoped>
.container {
  position: relative;
  height:30em;width:20em;
}

#hoverParent{
    width:100%;
    height:auto
}

.buttonsParent{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center
}

/* .container:hover .movieItemOverlay {
  opacity: 1;
} */

.movieItemOverlay{
 position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transition: .5s ease;
  background-color: rgba(0, 0, 0, 0.11);
}

#movieItemOverlayParent{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
}

#moveItemOverlayBackground{
  opacity: 0.5;
}

.movieImage{
    display: block;
    width: 100%;
    height: auto;
}
</style>
