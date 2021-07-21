<template>
  <div style="margin-bottom: 20px">
    <v-card>
      <v-img />
      <v-card-title>
        <h3>
          작성자 : {{board.writer}}
          <!-- <nuxt-link :to="'/user/' + post.id">{{post.User.nickname}}</nuxt-link> -->
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          <div>{{board.content}}</div>
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
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn text color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
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
    methods: {
      onRemovePost() {
        // this.$axios.delete('board/' + this.board.id).then(res => {
        //   console.log(res)
        //   if(res.status === 200) {
        //     alert('게시글 삭제 완료!');
        //     this.$router.push({path: "/"});
        //   }
        // });
      },
      onEditPost() {

      }
    },
  };
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }
</style>
