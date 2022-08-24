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
            <v-toolbar-title>{{$t('login')}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"></v-text-field>
              <v-text-field v-model="password"
                            :error-messages="passwordErrors"
                            :counter="10"
                            label="Password"
                            required
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"></v-text-field>
              <v-btn class="mr-4"
                     color="warning"
                     @click="emaillogin"
                     block>
                {{$t('login')}}
              </v-btn>
              <v-btn class="mt-4"
                     color="grey lighten-1"
                     to="/register"
                     block>
                {{$t('register')}}
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  components: {},
  name: 'login',
  data: () => {
    return {
      email: '',
      password: '',
      passwordeye: false,
    }
  },
  validations: {
    password: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
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
      !this.$v.password.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.password.required && errors.push('Name is required.')
      return errors
    },
  },
  methods: {
    emaillogin() {
      this.$v.$touch()
      if (!this.$v.email.$invalid && !this.$v.password.$invalid) {
        this.$store
          .dispatch('user/emaillogin', {
            Email: this.e_mail,
            Password: this.password,
          })
          .then((resp) => {
            console.log('login resp:%o', resp)
            this.$router.push({ path: '/index' })
          })
          .catch((err) => {
            console.log('login err:%o', err)
          })
      }
    },
  },
}
</script>

<style>
</style>