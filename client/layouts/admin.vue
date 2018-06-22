<template>
  <v-app light>
    <v-toolbar app>
        <v-container>
            <v-layout row justify-end align-center>
                <v-flex class="text-xs-right">
                    <span class="yekanFont mediumText darkText text-xs-right">پنل ادمین</span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>