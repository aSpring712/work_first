<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form ref="form" @submit.prevent="onSubmitForm">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="오늘은 어떤 일이 있었나요?"
        />
        <v-file-input
         v-model="img"
          show-size
          counter
          multiple
          label="File input"
        />
        <v-btn type="submit" color="green" absolute right>등록</v-btn>        
        <v-btn type="button">이미지 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
        content: "",
        img: "",
    };
  },
  methods: {
    onSubmitForm(event) {
      event.preventDefault()
      if (this.$refs.form.validate()) {
        this.$axios.post('/board/insert', {content: this.content}).then(res => {
          console.log(res)
        })
        .then(() => {
            this.content = "";
            alert('게시글 등록 성공!');
            // 새로고침 없이 반영되도록
            this.$emit('updateList');
        })
        .catch(() => {
          alert('게시글 등록 실패!');
        });
      }
    },
  },
};
</script>

<style></style>
