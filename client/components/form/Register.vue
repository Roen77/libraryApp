<template>
  <div class="user signupbox">
    <div class="formbx">
      <form @submit.prevent="UserRegister">
        <h2>회원가입</h2>
        <div :class="{'invalid':!email}">
          <label for="email">email</label>
          <input id="email" ref="emailinput" v-model="email" type="text" placeholder="이메일">
        </div>
        <div v-if="!isvalidEmail && email" class="err">
          이메일 형식으로 입력해주세요.
        </div>
        <div :class="{'invalid':!username}">
          <label for="username">username</label>
          <input id="username" v-model="username" type="text" placeholder="닉네임">
        </div>
        <div :class="{'invalid':!password}">
          <label for="password">password</label>
          <input id="password" v-model="password" type="password" placeholder="비밀번호">
        </div>
        <div v-if="!isvalidLength && password" class="err">
          비밀번호는 8자리 이상이어야 합니다.
        </div>
        <div :class="{'invalid':!confirm_password}">
          <label for="comfirm_password">comfirm_password</label>
          <input id="comfirm_password" v-model="confirm_password" type="password" placeholder="비밀번호 확인">
          <div v-if="!isconfirmPassword && confirm_password" class="err">
            비밀번호가 일치하지 않습니다
          </div>
        </div>
        <div>
          <div v-if="errmsg" class="errmsg" :class="{'visible':email}">
            {{ errmsg }}
          </div>
          <button class="primary-btn" type="submit" :disabled="!totalConfirm">
            회원가입
          </button>
          <p class="signup">
            이미 가입된 회원이신가요?<nuxt-link to="/auth/login">
              로그인
            </nuxt-link>
          </p>
        </div>
      </form>
    </div>
    <div class="imgbx">
      <img src="/images/user2.png" alt="회원가입">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validLength, validEmail } from '~/utils/validate'
export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      errmsg: '',
      active: false

    }
  },
  computed: {
    isvalidLength () {
      return validLength(this.password)
    },
    isvalidEmail () {
      return validEmail(this.email)
    },
    isconfirmPassword () {
      return this.password === this.confirm_password
    },
    totalConfirm () {
      return this.isvalidLength && this.isvalidEmail && this.isconfirmPassword && this.username
    }
  },
  mounted () {
    this.inputfocus()
  },
  methods: {
    ...mapActions('user', ['register']),
    async UserRegister () {
      try {
        const userinfo = {
          email: this.email,
          username: this.username,
          password: this.password
        }
        await this.register(userinfo)
        // 성공적으로 회원가입되면 메인페이지로 이동
        this.$router.push('/')
      } catch (error) {
        // 에러 발생시 에러메세지 출력될 수 있도록 구현
        this.errmsg = error.response.data.msg
      } finally {
        // 데이터 전송이 실패했든 성공했든 상관없이 전송후엔 무조건 기존 입력값을 초기화시켜준다.
        this.resetInput()
        this.inputfocus()
      }
    },
    resetInput () {
      this.email = ''
      this.username = ''
      this.password = ''
      this.confirm_password = ''
    },
    inputfocus () {
      this.$refs.emailinput.focus()
    }

  }

}
</script>

<style>

</style>
