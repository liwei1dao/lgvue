<template>
  <v-container class="d-flex justify-center fill-height"
               fluid>
    <v-row>
      <v-col cols="6">
      </v-col>
      <v-col cols="6"
             align-self="center">
        <v-card width="350px">
          <v-toolbar color="primary"
                     flat>
            <v-toolbar-title>{{$t('register')}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email"
                            :error-messages="emailErrors"
                            label="email"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"></v-text-field>
              <v-text-field v-model="password"
                            :error-messages="passwordErrors"
                            :counter="10"
                            label="Password"
                            :append-icon="passwordeye ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="passwordeye ? 'text' : 'password'"
                            required
                            @click:append="passwordeye = !passwordeye"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"></v-text-field>
              <v-text-field v-model="confirmpassword"
                            :error-messages="confirmpasswordErrors"
                            :counter="10"
                            label="ConfirmPassword"
                            :append-icon="passwordeye ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="passwordeye ? 'text' : 'password'"
                            required
                            @click:append="passwordeye = !passwordeye"
                            @input="$v.confirmpassword.$touch()"
                            @blur="$v.confirmpassword.$touch()"></v-text-field>
              <v-text-field v-model="captcha"
                            :error-messages="captchaErrors"
                            :counter="4"
                            :label="$t('captcha')"
                            required
                            @input="$v.captcha.$touch()"
                            @blur="$v.captcha.$touch()">
                <template v-slot:append>
                  <v-btn color="primary"
                         @click="getcaptcha"
                         dark>{{$t('captcha')}}</v-btn>
                </template>
              </v-text-field>
              <v-btn class="mr-4"
                     color="warning"
                     @click="register"
                     block>
                {{$t('register')}}
              </v-btn>
              <v-btn class="mt-4"
                     color="grey lighten-1"
                     to="/login"
                     block>
                {{$t('login')}}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  sameAs,
  minLength,
  email,
  numeric,
} from 'vuelidate/lib/validators'
import { sendemailcaptcha, emailregister } from '@/api/user'
export default {
  mixins: [validationMixin],
  name: 'register',
  data: () => {
    return {
      email: '',
      password: '',
      confirmpassword: '',
      captcha: '',
      passwordeye: false,
      captchaDisabled: false,
      captchatimer: null,
      captchaLiftTime: 60,
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmpassword: {
      sameAsPassword: sameAs('password'),
    },
    captcha: {
      required,
      numeric,
      length: (value) => value.length == 4,
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('ValError_Requiredl'))
      !this.$v.password.minLength && errors.push(this.$t('ValError_Password'))
      return errors
    },
    confirmpasswordErrors() {
      const errors = []
      if (!this.$v.confirmpassword.$dirty) return errors
      !this.$v.confirmpassword.sameAsPassword &&
        errors.push(this.$t('ValError_ConfirmPassword'))
      return errors
    },
    captchaErrors() {
      const errors = []
      if (!this.$v.captcha.$dirty) return errors
      !this.$v.captcha.required && errors.push(this.$t('ValError_Requiredl'))
      !this.$v.captcha.numeric && errors.push(this.$t('ValError_CaptchaNumber'))
      !this.$v.captcha.length && errors.push(this.$t('ValError_CaptchaLength'))
      return errors
    },
  },
  methods: {
    getcaptcha() {
      this.captchaDisabled = true
      sendemailcaptcha({ Email: this.email, CaptchaType: 0 })
        .then((response) => {
          const { message } = response
          this.$message.success(message)
          if (!this.captchatimer) {
            //启动计时器
            this.captchatimer = setInterval(() => {
              if (this.captchaLiftTime > 0 && this.captchaLiftTime <= 60) {
                this.captchaLiftTime--
                if (this.captchaLiftTime == 0) {
                  clearInterval(this.captchatimer)
                  this.captchaLiftTime = 60
                  this.captchatimer = null
                  this.captchaDisabled = false
                }
              }
            }, 1000)
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
          this.captchaDisabled = false
          this.captchaLiftTime = 60
        })
    },
    register() {
      emailregister({
        Email: this.email,
        Password: this.password,
        Captcha: this.captcha,
      })
        .then((resp) => {
          console.log('register succ:' + resp)
        })
        .catch((resp) => {
          console.log('register err:' + resp)
        })
    },
  },
}
</script>

<style>
</style>