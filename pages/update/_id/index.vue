<template>
 <v-container>

    <v-card style="margin-bottom: 20px">
        <v-container v-if="board">
            <v-form ref="form" @submit.prevent="onSubmitForm">
                <v-textarea
                v-model="board.content"
                outlined
                auto-grow
                clearable
                />
                
            <div v-for="b in board" :key="b">
                <img :src="'/uploads/' + b.file_name" />
                <!-- <button @click="onRemoveImageIndex(u)" type="button">제거</button> -->
            </div>
                
                <v-btn type="submit" color="green">수정완료</v-btn>
                <v-btn color="red" @click="boardDelete" absolute right>삭제</v-btn>
            </v-form>
    </v-container>
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
            }
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
                    this.$router.push({path: "/board/" + this.id});
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
                this.board = res.data.board
            }
        });
    },
    computed: {
        getImageList() {
            if(this.board.file_name != null) {
                return this.board.file_name.split(',')
                // console.log(this.board.file_name.split(','))
            } else {
                return []
            }
        }
    }
}
</script>