<template>

	<div class="sidebar">
		<div class="search">
			<el-input placeholder="Поиск" v-model="searchQuery"></el-input>			
		</div>
		<el-menu>  
		  <el-menu-item v-for="(note, key) in filtered(searchQuery)" :key="key" :index="note._id"  @click="setCurrent(note._id)">
		    <span slot="title">{{note.title}}</span> 
		  </el-menu-item>		 
		</el-menu>


<el-button type="success" icon="el-icon-plus" class="add-button" circle @click="showCreateNote = true"></el-button>



    <el-dialog
    title="Tips"
    :visible.sync="showCreateNote"
    width="30%">
    <el-input placeholder="Название" v-model="newNote.title" @keyup.enter.native="addNote(newNote).then(()=>newNote.title = '', showCreateNote = false)" ></el-input>   
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addNote(newNote).then(()=>newNote.title = '', showCreateNote = false)">Добавить</el-button>
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
      'filtered'
    ])
  },
  data () {
    return {
      newNote: {
        title: '',
        content: ''
      },
      showCreateNote: false,
      searchQuery: ''
    }
  },
  methods: {
    ...mapActions([
      'addNote',
      'setCurrent'
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
  		padding: 1rem 1rem .5rem;
  	}
  }

  .add-button{
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .el-menu{
    background: none;
  }
  .el-menu-item{
    color: #000;
    font-weight: bold;
  }
</style>