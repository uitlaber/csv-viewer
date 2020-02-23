<template>
<el-upload class="import-csv" accept=".csv" v-loading="loading" drag :show-file-list="false" :on-change="onProgress" action=""
:auto-upload="false"
>
  <i class="el-icon-document-add"></i>
  <div class="el-upload__text">Перетащите файл или <em>нажмите что бы загрузить CSV</em></div>
  <!--  <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
</el-upload>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'main-page',
  computed: {
    ...mapGetters([
      'getPath'
    ])
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
    // this.note = Object.assign({}, this.currentNote)
  },
  methods: {
    ...mapActions([
      'setPath'
    ]),
    onProgress (file, fileList) {
      this.loading = true
      this.setPath(file.raw.path)
      console.log(this.getPath)
      this.loading = false
      this.$router.push('/grid')
    }
  }
}
</script>

<style lang="scss">
.import-csv {
  width: 100%;
  height: 80%;
  max-height: 100%;
  display: flex;
  align-items: center;

  .el-upload {
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .el-upload-dragger {
    width: 70%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
  }

  .el-icon-document-add
  {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: darkgray;
  }
}
</style>
