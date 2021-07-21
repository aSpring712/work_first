<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              v-model="joinInfo.email"
              label="이메일"
              type="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="joinInfo.password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="joinInfo.nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              v-model="joinInfo.terms"
              required
              :rules="[v => !!v || '약관에 동의해야 합니다.']"
              label="약관 동의"
            />
            <v-btn color="green" type="submit">가입하기</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        joinInfo:{
          email: '',
          password: '',
          nickname: '',
          terms: false,
        },        
        passwordCheck: '',
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => v === this.joinInfo.password || '비밀번호가 일치하지 않습니다.',
        ],
      };
    },
    methods: {
      onSubmitForm(event) {
        event.preventDefault()
        if(this.$refs.form.validate()) {
          this.$axios.post('/user/join', {joinInfo: this.joinInfo}).then(res=> {
          console.log(res)
        })
        .then(() => {
          alert('회원가입 성공');
          this.$router.push({
            path: '/',
          });
        })
        .catch(() => {
          alert('회원가입 실패');
        });
        }
      }
    },
    head() {
      return {
        title: '회원가입',
      };
    }
  };
</script>

<style>

</style>
