<template>
  <div class="profile_content">
    <div class="profile_box">
      <h2>프로필 정보 수정</h2>
      <form class="form_content" @submit.prevent="onChangeProfile">
        <div>
          <label for="email">이메일</label>
          <p><input id="email" class="readonly" readonly :value="getUser.email" type="text"></p>
        </div>
        <div>
          <label for="username">이름</label>
          <p><input id="username" v-model="username" type="text"></p>
        </div>
        <div class="file_container add">
          <div class="txt">
            <label for="fileinput"><span class="round-btn yellow"><i class="far fa-file-image"></i>프로필 이미지 수정</span></label>
            <input id="fileinput" ref="file" style="display:none" type="file" @change="onChangeImage">
          </div>
          <div v-if="getImagePath" class="photos">
            <div class="images">
              <img v-if="getImagePath.length === 0 &&getUser.thumbnail" :src="getUser.thumbnail" alt="userprofile">
              <img v-if="getImagePath.length>0" :src="`${getImagePath}`" alt="">
            </div>
          </div>
        </div>
        <button class="round-btn" type="submit" :disabled="!isconfirmPassword && password">
          프로필 정보 수정
        </button>
      </form>
    </div>
    <!-- profile -->
    <div v-if="getUser && !getUser.provider" class="profile_box">
      <h2>비밀번호 수정</h2>
      <form class="form_content" @submit.prevent="onChangePassword">
        <div>
          <label for="email">이메일</label>
          <p><input id="email" class="readonly" readonly :value="getUser.email" type="text"></p>
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input id="password" value="password" type="password" readonly>
          <button class="round-btn fill change-btn" type="button" @click="isChangePassword=!isChangePassword">
            변경
          </button>
        </div>
        <div v-if="isChangePassword" class="password_form">
          <div>
            <label for="password">비밀번호</label>
            <input id="password" v-model="password" type="password">
          </div>
          <div v-if="!isvalidLength && password" class="err">
            비밀번호는 8자리 이상이어야 합니다.
          </div>
          <div>
            <label for="confirm_password">비밀번호 확인</label>
            <input id="confirm_password" v-model="confirm_password" type="password">
          </div>
        </div>
        <div v-if="!isconfirmPassword && confirm_password" class="err">
          비밀번호가 일치하지 않습니다
        </div>
        <button class="round-btn" type="submit" :disabled="!isconfirmPassword ||!password">
          비밀번호 수정
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { validLength } from '../../utils/validate'
export default {
  data () {
    return {
      username: '',
      email: '',
      isChangePassword: false,
      password: '',
      confirm_password: '',
      selectedFile: ''

    }
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('books', ['getImagePath']),
    isconfirmPassword () {
      return this.password === this.confirm_password
    },
    isvalidLength () {
      return validLength(this.password)
    }
  },
  methods: {
    ...mapActions('user', ['updateProfile', 'updatePassword']),
    ...mapActions('books', ['uploadImg']),
    onChangeProfile () {
      const userinfo = { username: this.username, thumbnail: this.getImagePath }
      this.updateProfile(userinfo)
      this.$router.push('/user/profile')
    },
    onChangeImage (e) {
      const selectedFile = e.target.files[0]
      const imageFormData = new FormData()
      imageFormData.append('photo', selectedFile)
      this.uploadImg(imageFormData, { user: true })
    },
    onChangePassword () {
      this.updatePassword({ password: this.password })
      this.$router.push('/user/profile')
    }
  }

}
</script>

<style>
.profile_content .profile_box{margin-bottom: 40px; border: 1px solid #ddd; box-sizing: border-box; padding: 20px; border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);}
.profile_content .profile_box .password_form>div{margin: 18px 0;}
.profile_content .file_container .photos{margin: 30px 0;}
.profile_content .change-btn{margin: 20px 0;}
</style>
