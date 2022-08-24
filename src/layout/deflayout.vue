<template>
  <v-app>
    <v-app-bar absolute>
      <v-row justify="space-between">
        <v-col class="d-flex justify-start">
          <v-btn text
                 to="/index">{{$t('lgvue')}}</v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
        </v-col>
        <v-col class="d-flex justify-end">
          <languge></languge>
          <v-btn icon
                 v-if="!user"
                 to="/login">
            <v-avatar color="grey"
                      size="45">
              <v-icon large
                      dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
          <v-menu v-else
                  offset-y
                  transition="scroll-x-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                     v-bind="attrs"
                     v-on="on">
                <v-avatar color="grey">
                  <span class="white--text text-h5">2</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <span class="white--text text-h5">2</span>
                  </v-avatar>
                  <h3>liwei1dao</h3>
                  <p class="text-caption mt-1">
                    2211068034@qq.com
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded
                         text>
                    liwei1dao
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded
                         text>
                    Disconnect
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import languge from '@/components/languge/'
export default {
  name: 'deflayout',
  components: {
    languge,
  },
  computed: {
    ...mapGetters(['appname', 'routes', 'user']),
    shouname: function () {
      return this.user.name.substring(0, 1)
    },
  },
}
</script>

<style>
</style>