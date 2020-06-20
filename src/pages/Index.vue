<template>
  <q-page class="">
    <div class="operation q-pa-md">
      <q-btn icon="add" color="primary" @click="addToolForm = true"></q-btn>
    </div>
    <div class="row justify-around col">
      <q-card class="tool-item" bordered v-for="(tool , index) in tools" :key="tool.title" v-bind="tool" style="width: 232px;">
        <q-img
          :src="tool.imgUrl"
        />

        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{tool.title}}</div>
          <div class="text-caption text-grey">
            {{tool.brief}}
          </div>
        </q-card-section>

        <q-card-actions class="row justify-end">
          <q-btn flat color="primary" label="删除" @click="del(index)"/>
          <q-btn color="dark" label="编辑" @click="toolEdit(index)" />
        </q-card-actions>
      </q-card>
    </div>

    <q-btn label="测试" @click="test()"/>

    <!-- 删除提示 -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">您是否确定从数据库删除此项目？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup @click="operationIndex = null"/>
          <q-btn label="确定" color="primary" @click="toolDel()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 添加表单 -->
    <q-dialog v-model="addToolForm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-form
            @submit="onSubmit"
            @reset="onCancel"
            class="q-gutter-md"
          >
            <q-uploader
              @added='imgUpload'
            />
            <q-input
              type="text"
              v-model="addTooldata.name"
              label="名称*"
              hint="填写工具名称"
              :rules="[
                val => val.length > 0 || '请输入名称'
              ]"
            />

            <q-input
              type="textarea"
              v-model="addTooldata.brief"
              label="简介"
              :rules="[
                val => val.length > 0 || '请输入简介'
              ]"
            />

            <q-input
              type="text"
              v-model="addTooldata.url"
              label="地址"
              hint="填写链接地址"
              :rules="[ val => urlValidation(val) || '地址格式不正确！'
              ]"
            ></q-input>

            <div>
              <!-- <q-btn class="q-mt-sm" label="Reset Validation" @click="reset" color="primary"/> -->
              <q-btn label="添加" type="submit" color="primary"/>
              <q-btn label="取消" type="reset" color="primary" flat class="q-ml-sm"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'PageIndex',
  data () {
    return {
      confirm: false,
      operationIndex: null,
      addToolForm: false,
      addTooldata: {
        img: null,
        name: '',
        brief: '',
        url: ''
      },
      tools: [
        {
          imgUrl: 'statics/images/flvcd_logo.jpg',
          title: 'shuoshuguanwang',
          brief: 'sdfsdfsdfsdfsdfsdfsdfsdf',
          url: 'http://www.flvcd.com/'
        },
        {
          imgUrl: 'statics/images/flvcd_logo.jpg',
          title: 'aoeywu',
          brief: 'sdfsdfsdfsdfsdfsdfsdfsdf',
          url: 'http://www.flvcd.com/'
        },
        {
          imgUrl: 'statics/images/flvcd_logo.jpg',
          title: 'abcdefg',
          brief: 'sdfsdfsdfsdfsdfsdfsdfsdf',
          url: 'http://www.flvcd.com/'
        }
      ]
    }
  },
  created: function () {
    Axios.get('admin/gettools').then((response) => {
      if (response.data.code === 4) {
        console.log(response.data)
        const msg = response.data
        this.$router.push({
          path: '/',
          name: 'Login',
          params: msg
        })
      }
      // this.tools = response.data.tools
    })
  },
  methods: {
    del (index) {
      this.confirm = true
      this.operationIndex = index
    },
    toolDel () {
      var deldata = this.tools[this.operationIndex]
      alert(deldata.title)
    },
    urlValidation (val) {
      console.log(val)
      // var zhengze = ^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$
      // var re = new RegExp(zhengze)
      // re.test()
      return true
    },
    imgUpload (list) {
      console.log(list)
    },
    onSubmit () {
      Axios.post('/addtool', this.addTooldata).then((response) => {
        console.log(response)
      })
      console.log('zhixing:submit')
    },
    onCancel () {
      this.addTooldata.name = ''
      this.addTooldata.brief = ''
      this.addTooldata.url = ''
      this.addToolForm = false
    },
    test () {
      alert(new Date() / 1000)
      alert(new Date())
    }
  }
}
</script>
