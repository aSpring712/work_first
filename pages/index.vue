<template>
  <v-container>
    <post-form />
    <div>
      <PostCard v-for="board in boards" :key="board.id" :board="board" />
    </div>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Nuxt.js',
        boards: [],
      };
    },
    methods: {
      getBoards() {
        this.$axios.get('board/');
      }
    },
    mounted(){
      this.$axios.get('board/').then(res =>{
        console.log(res)
        if(res.data.boards){
          this.boards = res.data.boards
        }
      });
    }
  };
</script>

<style>

</style>
