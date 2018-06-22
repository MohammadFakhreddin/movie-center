<template>
    <div class="parentDiv mt-4" >
        <div class="parentDiv alignCenter completeSize">
            <label class="englishFont smallText blueText downloadPageDividerTitle">BluRay</label>
        </div>
        <div class="parentDiv alignCenter">
            <div class="inlineDiv downloadPageBlueDivider">
            </div>
        </div>
        <div class="parentDiv">
            <div>
                <div class="inlineDiv  downloadButtonParent ">
                    <label class=" englishFont  whiteText greenBackground downloadButtonQualityText">1080p BlueRay</label>
                    <div class="  whiteBackground otherInfoText greenDownloadButtonOtherInfoText">
                        <div class="parentDiv">
                            <label class="englishFont greenText downloadButtonX256Text">x256</label>
                            <label class="normalFont darkText  downloadButtonLanguageInfoText">زبان اصلی</label>
                            <label class="englishFont darkText downloadButtonGanoolText">Ganool</label>
                            <i class="inlineDiv fa fa-flag filterIcon downloadButtonFlagIcon"></i>
                        </div>
                    </div>
                    <div class="inlineDiv downloadButtonBlackButtons">
                        <div class="inlineDiv downloadButtonSizeText button">
                            <label class="englishFont mediumText whiteText ">1.9GB</label>
                            <i class="fa fa-download downloadPanelIcons"></i>
                        </div>
                        <div class="inlineDiv downloadButtonLanguageText button">
                            <label class="normalFont mediumText whiteText ">ف</label>
                        </div>
                        <div class="inlineDiv downloadButtonShopButton button">
                            <i class=" fa fa-shopping-bag downloadPanelIcons" style="position: relative;top: 0.3em"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="inlineDiv  downloadButtonParent ">
                    <label class=" englishFont  whiteText yellowBackground downloadButtonQualityText">720 BlueRay</label>
                    <div class="  whiteBackground otherInfoText yellowDownloadButtonOtherInfoText">
                        <div class="parentDiv">
                            <label class="englishFont yellowText downloadButtonX256Text">x256</label>
                            <label class="normalFont darkText  downloadButtonLanguageInfoText">زبان اصلی</label>
                            <label class="englishFont darkText downloadButtonGanoolText">Ganool</label>
                            <i class="inlineDiv fa fa-flag filterIcon downloadButtonFlagIcon" style="float: right"></i>
                        </div>
                    </div>
                    <div class="inlineDiv downloadButtonBlackButtons">
                        <div class="inlineDiv downloadButtonSizeText button">
                            <label class="englishFont mediumText whiteText ">951mb</label>
                            <i class="fa fa-download downloadPanelIcons"></i>
                        </div>
                        <div class="inlineDiv downloadButtonLanguageText button">
                            <label class="normalFont mediumText whiteText ">ف</label>
                        </div>
                        <div class="inlineDiv downloadButtonShopButton button">
                            <i class=" fa fa-shopping-bag downloadPanelIcons" style="position: relative;top: 0.3em"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="parentDiv alignCenter completeSize">
            <label class="normalFont smallText blueText downloadPageDividerTitle">موسیقی متن</label>
        </div>
        <div class="parentDiv alignCenter">
            <div class="inlineDiv downloadPageBlueDivider"></div>
        </div>
        <div>
            <div class="inlineDiv  downloadButtonParent ">
                <label class=" englishFont  whiteText lightBlueBackground downloadButtonQualityText">01:06:53</label>
                <div class="  whiteBackground otherInfoText lightBlueDownloadButtonOtherInfoText">
                    <div class="parentDiv">
                        <img src="~/assets/mipmap/sound-wave.png" class="soundWaveIcon">
                        <i class="inlineDiv fa fa-flag filterIcon downloadButtonFlagIcon"></i>
                        <label class="englishFont lightBlueText soundWaveNumber">320 kbs</label>
                    </div>
                </div>
                <div class="inlineDiv downloadButtonBlackButtons">
                    <div class="inlineDiv downloadButtonSizeText button">
                        <label class="englishFont mediumText whiteText ">1.9GB</label>
                        <i class="fa fa-download downloadPanelIcons"></i>
                    </div>
                    <div class="inlineDiv downloadButtonLanguageText button">
                        <label class="normalFont mediumText whiteText ">ف</label>
                    </div>
                    <div class="inlineDiv downloadButtonShopButton button">
                        <i class=" fa fa-shopping-bag downloadPanelIcons" style="position: relative;top: 0.3em"></i>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="inlineDiv downloadButtonParent ">
                <label class=" englishFont  whiteText lightBlueBackground downloadButtonQualityText"> 01:06:53 </label>
                <div class="  whiteBackground otherInfoText lightBlueDownloadButtonOtherInfoText">
                    <div class="parentDiv">
                        <img src="~/assets/mipmap/sound-wave.png" class="soundWaveIcon">
                        <i class="inlineDiv fa fa-flag filterIcon downloadButtonFlagIcon"></i>
                        <label class="englishFont lightBlueText soundWaveNumber">320 kbs</label>
                    </div>
                </div>
                <div class="inlineDiv downloadButtonBlackButtons">
                    <div class="inlineDiv downloadButtonSizeText button">
                        <label class="englishFont mediumText whiteText ">951mb</label>
                        <i class="fa fa-download downloadPanelIcons"></i>
                    </div>
                    <div class="inlineDiv downloadButtonLanguageText button">
                        <label class="normalFont mediumText whiteText ">ف</label>
                    </div>
                    <div class="inlineDiv downloadButtonShopButton button">
                        <i class=" fa fa-shopping-bag downloadPanelIcons" style="position: relative;top: 0.3em"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
</script>
<style scoped>

.downloadButtonShopButton {
  background-color: #525252;
  float: right;
  width: 3em;
  height: 110%;
  /*height: 2.2em;*/
}

.downloadButtonGanoolText {
  float: left;
  margin-left: 30px;
}

.downloadButtonBlackButtons {
  position: relative;
  top: -0.08em;
  left: -1em
}

.blueDownloadButtonOtherInfoText {
  float: left;
  width: 36em;
  margin-top: 0.1em;
  margin-bottom: 0.05em;
  border-top: 0.1em solid;
  border-bottom: 0.1em solid;
  border-color: #37C8D0;
  position: relative;
  top: -0.17em;
  left: 0px;
}

.soundWaveIcon {
  width: 20em;
  height: 2em;
  position: absolute;
  top: 0px;
  left: -40px;
}

.soundWaveNumber {
  float: right;
  margin-right: 2em;
}

.downloadButtonFlagIcon {
  float: right;
  margin-right: 20px;
  margin-top: 5px
}

.downloadButtonX256Text {
  float: left;
  margin-left: 10px;
}

.downloadButtonLanguageInfoText {
  float: left;
  margin-left: 30px;
}

.downloadButtonSizeText {
  background-color: #191919;
  width: 6em;
  height: 110%;
  float: right;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px
}

.downloadButtonLanguageText {
  background-color: #2e2e2e;
  float: right;
  width: 3em;
  height: 110%;
}

#downloadScoreDivider {
  opacity: 0.5;
  width: 900px;
  margin-top: 32px;
  height: 1px;
  background-color: rgba(170, 170, 170, 1);
}

.downloadPageDividerTitle {
  position: relative;
  top: -1px;
  left: 25em;
  border-bottom: 2px solid;
  border-color: dodgerblue;
}

.downloadPageBlueDivider {
  height: 1px;
  width: 57em;
  background-color: dodgerblue;
}

.downloadButtonParent {
  padding: 1px;
  border-radius: 5px;
  width: 57em;
  height: 2em;
  margin-top: 10px;
}

.downloadPanelIcons {
  color: white;
  position: relative;
  top: 0.3em;
}

.downloadButtonQualityText {
  float: left;
  width: 10em;
  height: 100%;
  padding: 0.1em 1em;
  margin-top: -1px;
  margin-left: -1px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.otherInfoText {
  float: left;
  width: 33em;
  height: 100%;
  margin-top: 0.1em;
  margin-bottom: 0.05em;
  border-top: 0.1em solid;
  border-bottom: 0.1em solid;
  position: relative;
  top: -0.17em;
  left: 0px;
}

.greenDownloadButtonOtherInfoText {
  border-color: rgba(21, 197, 120, 1);
}

.yellowDownloadButtonOtherInfoText {
  border-color: #FCD200;
}

.lightBlueDownloadButtonOtherInfoText {
  border-color: #37C8D0;
}

.filterIcon {
    color: rgba(170, 170, 170, 1);;
}
</style>