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
            :type="isPwd?'password':'text'"
            v-model="password"
            label="密码"
            :rules="[
              val => val.length > 0 || '请输入密码'
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

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
  name: 'Login',
  data () {
    return {
      name: '',
      password: '',
      isPwd: true
    }
  },
  mounted: function () {
    if (this.$route.params.code) {
      const _this = this
      this.$q.notify({
        message: _this.$route.params.message,
        color: 'red',
        position: 'center',
        timeout: 3000
      })
    }
  },
  methods: {
    onReset () {
      this.$router.push('/register')
    },
    onSubmit () {
      Axios({
        url: '/admin/login',
        method: 'post',
        data: {
          name: this.name,
          password: this.password
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.$q.localStorage.set('userkey', response.data.userkey)
          this.$router.push('/index')
        } else {
          this.$q.notify({
            position: "top",
            type: "warning",
            textColor: "white",
            message: response.data.msg,
            timeout: 2000
          });
        }
      }).catch((response) => {
        console.log("err>>>",response);
        this.$q.notify({
          type: "warning",
          textColor: "white",
          message: response.data.msg
        });
      })
    }
  }
}
</script>
