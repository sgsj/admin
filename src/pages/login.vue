<template>
  <q-page class="flex flex-center">
    <q-card style="width: 232px;">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            ref="input"
            v-model="name"
            label="名称*"
            hint="填写管理员账号"
            :rules="[
              val => val.length > 0 || '请输入账号'
            ]"
          />

          <q-input
            type="password"
            v-model="password"
            label="密码"
            :rules="[
              val => val.length > 0 || '请输入密码'
            ]"
          />

          <q-btn label="忘记密码？" to="/findUser" class="text-body2 text-right" flat/>

          <div>
            <!-- <q-btn class="q-mt-sm" label="Reset Validation" @click="reset" color="primary"/> -->
            <q-btn label="登录" type="submit" color="primary"/>
            <q-btn label="注册" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'PageTool',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    onReset () {
      this.$router.push('/register')
    },
    onSubmit () {
      Axios.post('login/submit', {
        name: this.name,
        password: this.password
      }).then((response) => {
        if (response.data.code === 200) {
          this.$q.localStorage.set('userkey', response.data.userkey)
          this.$router.push('/index')
        } else {
          alert(response.data.msg)
        }
        console.log(response)
        // this.$store.state
      }).catch((response) => {

      })
    }
  }
}
</script>
