<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>현재 프로필 : aSpring</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              label="변경할 닉네임"
              :rules="nicknameRules"
              required
            />
            <v-btn dark color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    components: {
      
    },
    data() {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임을 입력하세요.',
        ],
      };
    },
    computed: {
      
    },
    methods: {
      onChangeNickname() {
        
      },
    },
    head() {
      return {
        title: '프로필',
      };
    },
  };
</script>

<style>

</style>
