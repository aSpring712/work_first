<template>
  <div style="margin-bottom: 20px" >
    <v-card>
      <v-img />
      <v-card-title>
        <h4>
          <nuxt-link  :to="'/board/' + board.id">{{getContent}}</nuxt-link>
        </h4>
        <!-- <div v-for="image_url in board.imege_url" :key="image_url" style="display: inline-block"> -->
        <!-- </div> -->
      </v-card-title>
      <v-card-text>
        <div style="display: inline-block">
            <div v-for="img in getImageList" :key="img">
                <img :src="'/uploads/' + img" />
            </div>
        </div>
        <div>
          <div>작성자 : {{board.writer}}</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onEditPost">수정</v-btn>
        <v-btn text color="red" @click="onRemovePost">삭제</v-btn>
        <div>{{board.regdate}}</div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    props : ['board'],
    data() {
      return {
        
      };
    },
    computed:{
      getContent(){
        if(this.board.content){
          return this.board.content
        }else{
          return "제목 없음"
        }
      },
      getImageList(){
        if(this.board.file_name != null){
          return this.board.file_name.split(',')
        }else{
          return []
        }
      }
    },
    methods: {
      onRemovePost() {
        this.$axios.delete('board/' + this.board.id).then(res => {
          console.log(res)
          if(res.status === 200) {
            alert('게시글 삭제 완료!');
            this.$router.push({path: "/"});
            this.$emit('updateList');
          } else {
            alert('게시글 삭제 실패!');
          }
        });
      },
      onEditPost() {
        this.$router.push('/update/' + this.board.id);
      }
    },
    mounted() {
      console.log("this.board");
      console.log(this.board);
    }
  };
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }
</style>