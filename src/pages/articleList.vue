<template>
  <q-page class="flex flex-center">
    <q-row></q-row>
    <q-table :data="data"
              :columns="columns"
              :pagination.sync="page"
              title="文章列表"
              row-key="id"
              style="width: 100%">
      <template v-slot:top>
        <q-btn color="primary" label="添加文章" to="articleList/add"/>
      </template>
    </q-table>
    <textarea id="editor" name="edit_content"></textarea>
  </q-page>
</template>

<script>

export default {
  name: 'PageTool',
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
      data: [],
      page: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
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
  }
}
</script>
