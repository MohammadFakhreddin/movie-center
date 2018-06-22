<template>
<v-layout flex justify-center>
<v-card class="cardStyle ma-2">
    <v-container fluid>
        <v-layout flex align-center justify-center>
            <v-flex xs4 id="commentContainer" class="pa-1">
                <v-layout flex align-center justify-end>
                     <v-flex align-center>
                        <v-layout flex align-center justify-start>
                            <span v-show="likeState==1" class="normalFont green--text bold smallText">
                                فیلم را پیشنهاد می کنم
                            </span>
                            <span v-show="likeState==-1" class="red--text normalFont bold smallText">
                                فیلم را پیشنهاد نمی کنم
                            </span>
                        </v-layout>
                    </v-flex>
                    <span class="normalFont lightText extraSmallText">
                        {{commentDate}}
                    </span>
                </v-layout>
                <v-layout flex align-center justify-end  >
                    <span class="normalFont blackText mediumText">
                       {{commentText}}
                    </span>
                </v-layout>
                <v-layout flex align-center justify-end pa-1>
                    <v-icon small class="pa-1" color="red darken-3">fa-thumbs-o-down</v-icon> 
                    <span class="normalFont pa-1">{{commentDislikeCount}}</span>
                    <v-icon small class="pa-1" color="green darken-3">fa-thumbs-o-up</v-icon>    
                    <span class="normalFont pa-1">{{commentLikeCount}}</span>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-layout column wrap justify-center align-center>
                    <profile-btn></profile-btn>
                    <span class="englishFont smallText">{{(authorName.split('@')[0])}}</span>
                </v-layout>
            </v-flex>
            <v-flex xs5 >
                <v-layout row v-for="score in scoreList">
                    <v-flex xs7  offset-xs1> 
                        <v-progress-linear v-model="score.progress"></v-progress-linear>
                    </v-flex>
                    <v-flex xs2>
                        <span class="normalFont mediumText pa-1 blueText bold">{{score.title}}</span>    
                        <span class="normalFont mediumText pa-1 blueText bold">{{score.score}}</span>
                        <span class="normalFont mediumText pa-1 blueText bold">از</span>
                        <span class="normalFont mediumText pa-1 blueText bold">10</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</v-card>
</v-layout>
</template>
<script>
    import ProfileButton from '~/components/UserProfileButton.vue'
    export default{
        data(){
            let scoreList = [
                {
                    title:"کارگردانی",
                    score:this.directorScore,
                    progress:this.directorScore*10
                },
                {
                    title:"بازیگری",
                    score:this.artistsScore,
                    progress:this.artistsScore*10
                },
                {
                    title:"فیلمنامه",
                    score:this.storyScore,
                    progress:this.storyScore*10
                }
            ]
            let directorProgress = 0;
            return{
                scoreList
            }
        },
        props:[
            'directorScore',
            'artistsScore',
            'storyScore',
            'likeState',
            'commentLikeCount',
            'commentDislikeCount',
            'commentText',
            'commentDate',
            'authorName',
            'authorId'//TODO implement me
        ],
        components:{
            'profile-btn':ProfileButton
        }
    }
</script>
<style scoped>
.profileImage{
    align-content: center
}
#commentContainer{
    border:solid 1px #aaaaaa;
    border-radius:4px
}

.cardStyle{
    width:100%
}
</style>