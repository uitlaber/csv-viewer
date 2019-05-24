<template>
	<div>
      <div v-if="currentNote">

        <div class="buttons">
          <div>
            <el-button type="success" size="small" @click="updateNote(note).then(updated)" v-if="isEdit" icon="el-icon-edit">Сохранить</el-button>
            <el-button  size="small" @click="isEdit = true" v-if="!isEdit" icon="el-icon-edit">Изменить</el-button>
          </div>
          <el-button type="danger" @click="deleteCurrentNote()" icon="el-icon-delete" circle></el-button>
       </div>
       <div class="ql-snow" v-if="!isEdit">  
       <div class="preview ql-editor" >
       <h1>{{note.title}}</h1>
       <div class="note-content" v-html="note.content">

       </div>
       </div>
       </div> 
       <div class="edit" v-if="isEdit">
         <div class="field">
          <el-input
          placeholder="Название"
          v-model="note.title"
          >
        </el-input>
       </div>    
       <div class="field">
         <quill-editor v-model="note.content"
                :options="editorOption"
               >
          </quill-editor>
       </div>

       </div>
       

      </div>
	</div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'main-page',
  computed: {
    ...mapGetters([
      'currentNote'
    ]),
    isChanged () {
      if (this.note.title !== this.currentNote.title || this.note.content !== this.currentNote.content) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      editorOption: {},
      isEdit: false,
      note: null
    }
  },
  created () {
    this.note = Object.assign({}, this.currentNote)
  },
  watch: {
    currentNote (newVal) {
      this.note = Object.assign({}, newVal)
    }
  },
  methods: {
    ...mapActions([
      'updateNote',
      'deleteNote'
    ]),
    deleteCurrentNote () {
      this.$confirm('Вы точно хотите удалить?', 'Warning', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.deleteNote(this.currentNote._id).then(() => {
          this.$message({
            type: 'success',
            message: 'Удаление завершено'
          })
        })
      }).catch(() => {})
    },
    updated () {
      this.$message({
        type: 'success',
        message: 'Сохранено'
      })
      this.isEdit = false
    }
  }
}
</script>

<style lang="scss">

.ql-editor{
  height: 80vh !important;
  margin-bottom: 1rem !important;
  padding: 0;
}

.ql-snow{
  border: none;
}

.buttons{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.note-content{
  img{
      max-width: 100%;
  }
}
.preview{
  padding: 0 !important;
}
</style>
