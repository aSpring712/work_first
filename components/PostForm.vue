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
          <!-- form 제출할 버튼 외에는 type="button"으로 적어주어야 함, 그렇지 않으면 form 내의 데이터를 다 제출해버림 -->
          <v-btn type="submit" color="green" absolute right>등록</v-btn>
          <input ref="imageInput" type="file" multiple hidden @change="onChangeImages" />
          <!-- ref 통해 DOM에 접근 -->
          <v-btn @click="onClickImageUpload" type="button">이미지 업로드</v-btn>
          <!-- 이미지 미리보기 -->
          <div v-for="u in url" :key="u" style="display: inline-block">
            <div>
              <img v-if="u" :src="u" />
              <!-- <button @click="onRemoveImageIndex(u)" type="button">제거</button> -->
            </div>
          </div>
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
        url: [],
        files : [],
    };
  },
  methods: {
    onSubmitForm(event) {
      event.preventDefault()
      const formData = new FormData();
      formData.append('content', JSON.stringify(this.content))
      this.files.forEach((file) => {
          formData.append('files', file)
      })
      if (this.$refs.form.validate()) {
        this.$axios.post('/board/insert',formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            this.content = "";
            this.url = null;
            alert('게시글 등록 성공!');
            // 새로고침 없이 반영되도록
            this.$emit('updateList');
        }).catch(() => {
          alert('게시글 등록 실패!');
        });
      }
    },
    // 이미지 업로드 버튼 클릭 시 ref를 통해 imageInput 클릭한 것과 동일한 효과
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      console.log(e.target.files); // 유사배열 -> array like object ?
      
      var files_temp =  e.target.files
      
      // 이미지 선택 후 재선택 시 -> 초기화된 상태에서 다시 이미지 선택할 수 있도록
      this.files = []
      this.url = []

      // 파일 여러개 forEach 돌려서
      files_temp.forEach((file)=>{
        var url_temp = URL.createObjectURL(file); // url을 따와서
        this.url.push(url_temp) // array에 url 추가(단순히 미리보기를 위한 url)
        this.files.push(file) // 실제로 이미지 파일을 업로드 하기 위한 작업
      })
    
      // const imageFormData = new FormData();
      // [].forEach.call(e.target.files, (f) => { // 강제로 forEach를 돌리기 위한 방법
      //   this.url = URL.createObjectURL(f);
      //   imageFormData.append('image', f); // 각각 하나씩을 같은 key로 FormData에 append -> { image : [file1, file2] }
      // });
      // this.$axios.post('board/uploadImages', imageFormData);
    },
    // onRemoveImageIndex(index) {
      
    // }
  },
};
</script>

<style></style>