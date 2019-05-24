<template>
  <div id="app">
  	<sidebar/>

    <div class="content">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'mynotes',
    components: {
      sidebar: require('@/components/Layout/Sidebar').default
    },
    created () {
      this.loadNotes()
    },
    methods: {
      ...mapActions([
        'loadNotes'
      ])
    }
  }
</script>

<style>
  html,body{
  	margin: 0;
  	padding: 0;
  }	
  body{
  	font-family: 'Arial';
  }

  #app{
  	display: grid;
  	grid-template-columns: 1fr 4fr;
  }

  .field{
    margin-bottom: 1rem;
  }

  .content{
  	padding: 1rem;
  	box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.15);
  }
</style>