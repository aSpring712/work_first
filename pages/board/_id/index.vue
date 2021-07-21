<template>
    <v-container v-if="board">
        <PostCard :board="board" />
    </v-container>
    <div v-else>
        해당 게시글이 없습니다.
    </div>
</template>

<script>
export default {
    
}
</script>