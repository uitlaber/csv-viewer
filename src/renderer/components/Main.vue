<template>
	<div>
		<el-input placeholder="Please input" v-model="data"></el-input>
		{{data}}
	</div>
</template>
<script>
export default {
  name: 'main-page',
  data () {
    return {
      data: 'ee'
    }
  }
}
</script>