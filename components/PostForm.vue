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

        <div class="filesForm">
          <input type="file" @change="handleFileChange" id="filesSelect" multiple accept="image/*" />
          <v-btn type="submit" color="green" absolute right>등록</v-btn>
        </div>
        <div class="imgBoard" v-if="files.length > 0">
          <img :src="'{{filePath}}'">
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
        content: "",
        filesPreview: [],
        files: [],
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
    handleFileChange(e) {
      console.log(e.target.files)

      const file = e.target.files;
      
    }

  },
};
</script>

<style></style>
