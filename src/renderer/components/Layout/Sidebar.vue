<template>

	<div class="sidebar">
		<div class="search">
			<el-input placeholder="Поиск" v-model="searchQuery"></el-input>			
		</div>
		<el-menu>  
		  <el-menu-item v-for="(app, key) in filtered(searchQuery)" :key="key" :index="app.site"  @click="setActiveApp(app)">
		    <span slot="title">{{app.site}}</span>
		  </el-menu-item>		 
		</el-menu>

    <el-button @click="showCreateNote = true">Добавить</el-button>


    <el-dialog
    title="Tips"
    :visible.sync="showCreateNote"
    width="30%">
    <el-input placeholder="Название" v-model="newNote.title"></el-input>   
    <span slot="footer" class="dialog-footer">
      <el-button @click="showCreateNote = false">Отмена</el-button>
      <el-button type="primary" @click="addNote(newNote)">Добавить</el-button>
    </span>
  </el-dialog>


	</div>
	
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapGetters([
      'notes',
      'filtered'
    ])
  },
  data () {
    return {
      newNote: {
        title: ''
      },
      showCreateNote: false,
      searchQuery: ''
    }
  },
  methods: {
    ...mapActions([
      'addNote'
    ]),
    setActiveApp (app) {
      console.log(app)
    }
  }
}
</script>

<style lang="scss">

  .sidebar{
  	height: 100vh;
  	.search{
  		padding: 1rem;
  	}
  }

  .el-menu{
    background: none;
  }
  .el-menu-item{
    color: #000;
    font-weight: bold;
  }
</style>