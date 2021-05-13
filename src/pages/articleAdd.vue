<template>
  <q-page class="flex flex-center">
    <q-btn flat color="primary" label="返回" icon="reply" @click="goBack"/>
    <textarea id="editor" name="edit_content"></textarea>
  </q-page>
</template>

<script>

export default {
  name: 'articleAdd',
  data(){
    return {
      columns: [
        {
          name: "title",
          label: "文章标题1",
          align: 'center'
        },
        {
          name: "brief",
          label: "简介",
          align: 'center'
        },
        {
          name: "tag",
          label: "标签",
          align: 'center'
        },
        {
          name: "time",
          label: "发布时间",
          align: 'center'
        },
      ],
      data: []
    }
  },
  mounted(){
    console.log("mounted>>>>>");
    KindEditor.ready(K=>{
      window.editor = K.create("#editor",{
        basePath : 'statics/js/',
        filterMode : false,
        wellFormatMode : false
      });
    });
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>
