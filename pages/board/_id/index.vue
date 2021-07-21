<template>
    <div>
        <h3>{{board.content}}</h3>
        <h3>{{board.writer}}</h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            board: {
                content: '',
                writer: '',
            },
        };
    },
    methods: {
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
    }
}
</script>