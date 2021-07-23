<template>
 <v-container>
    <v-card style="margin-bottom: 20px">
        <div v-if="board">
            <PostCard :board="board"/>
        </div>
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