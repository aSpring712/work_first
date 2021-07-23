<template>
 <v-container>
    <v-card style="margin-bottom: 20px">
        <div v-if="board">
            <PostCard :board="board"/>
        </div>
    <!-- <div v-if="board">
    <v-card>
      <v-img />
      <v-card-title>
        <h4>
          {{board.content}}
        </h4>
      </v-card-title>
      <v-card-text>
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
  </div> -->
    <div v-else>
        해당하는 아이디의 게시물이 없습니다.
    <v-btn @click="toTheBack">Back</v-btn>
    </div>
  </v-card>
 </v-container>
</template>

<script>
export default {
    data() {
        return {
            board: {
                id:'',
                content: '',
                writer: '',
            },
            id:'',
        };
    },
    methods: {
        toTheBack() {
            this.$router.push({path:"/"});
        },
        boardDelete() {
            this.$axios.delete('board/' + this.id).then((res) => {
                console.log(res)
                alert('게시글 삭제 완료')
                this.$router.push({path:"/"});
            })
        },
        onSubmitForm() {
            this.$axios.put('board/', {
                content: this.board.content,
                id: this.board.id
            }).then((res) => {
                console.log(res)       
                if(res.data.result == "OK"){         
                    alert('게시글 수정 완료')
                    this.$router.push({path: "/"})
                }else{
                    alert('게시글 수정 실패')
                }
            })
        },
        // getBoard() {
        //     this.$axios.get('board/' + this.id);
        // }
    },
    mounted() {
        this.id = this.$route.params.id;        
        this.$axios.get('board/' + this.id).then((res) => {
            console.log(res)
            if(res.data.board) {
                this.board = res.data.board[0]
            }
        });
    }
}
</script>