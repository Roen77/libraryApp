<template>
  <div>
    <div class="profile_main">
      <div class="menu sidemenu">
        <h3><br><span>my Profile</span></h3>
        <ul>
          <li>
            <nuxt-link to="/user/info">
              <img src="/images/user4.png" alt="">회원정보 수정
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="profile-card">
        <div class="thumbnail">
          <img v-if="getUser && getUser.thumbnail" :src="getUser.thumbnail" alt="썸네일 이미지">
          <img v-else src="/images/user3.png" alt="썸네일 이미지">
        </div>
        <div class="user_info">
          <div>이메일 {{ getUser.email }}</div>
          <div>이름 {{ getUser.username }}</div>
        </div>
      </div>
    </div>
    <div class="box">
      <h2>통계박스</h2>
      <div class="charts">
        <chart-bar :datas="formatData('내가 생성한 책의 갯수',books,'#EC407A')" :title-name="`나의 책`"></chart-bar>
        <chart-bar :datas="formatData('내가 북마크한 갯수',bookmarks,'royalblue')" :title-name="`나의 북마크`"></chart-bar>
        <chart-bar :datas="[...formatData('내가 좋아요 한 갯수',likes,'#EF9A9A'),...formatData('좋아요 받은 갯수',likers,'#29B6F6')]" :title-name="`좋아요`"></chart-bar>
        <chart-bar :datas="formatData('내가 생성한 코멘트 갯수',comments,'#26C6DA')" :title-name="`나의 코멘트`"></chart-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Tilt } from '../../utils/vanilliaTilt'
export default {
  async asyncData ({ store }) {
    try {
      let books
      let bookmarks
      let likes
      let likers
      let comments
      await store.dispatch('profile/getCounts')
        .then((res) => {
          books = res.data.books
          bookmarks = res.data.bookmarks
          likes = res.data.likes
          likers = res.data.likers
          comments = res.data.comments
        })
      return { books, bookmarks, likes, likers, comments }
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  mounted () {
    const profile = document.querySelector('.profile-card')
    Tilt(profile)
  },
  methods: {
    formatData (label, values, bgColor) {
      const books = Array.from({ length: 12 }, (v, index) => {
        return 0
      })
      values.forEach((v, index) => {
        books.splice(parseInt(v.months, 10) - 1, 1, parseInt(v.value, 10))
      })
      return [{ label, data: books, backgroundColor: bgColor }]
    }
  }

}
</script>

<style>
.profile_main{display: flex;}
.sidemenu{width: 500px; border: 1px solid rgba(0,0,0,0.1); border-radius: 10px; box-shadow: 0 0 5px rgba(0,0,0,0.1); margin-right: 50px; padding: 20px; box-sizing: border-box;}
.sidemenu h3{margin-bottom: 10px;}
.sidemenu img{width: 30px; height: 30px; vertical-align: middle; margin-right: 20px;}
.sidemenu li a{display: block; line-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);}
.profile-card{flex:1; display: flex; background-color:rgb(40,44,53); box-shadow: 0 0 5px rgba(0,0,0,0.1); border: 1px solid #ddd; padding: 30px; align-items: center; border-radius: 20px;}
.profile-card .thumbnail{position: relative; width: 200px; height: 200px; overflow: hidden; border-radius: 50%; margin-right:5%; border: 5px solid #ddd;}
.profile-card .thumbnail img{position: absolute; width: 100%; height: 100%; left:50%; top:50%; transform: translate(-50%,-50%);}
.profile-card .user_info{color:#fff; font-size: 18px;}
.profile-card .user_info>div{padding: 10px;}
.box{margin-top: 30px;}
.charts{overflow: hidden;}
.charts>div{width: 49%; margin: 0.5%; float: left;}
@media (max-width:810px) {
  .profile_main{display: block;}
  .sidemenu{width: 100%; margin-bottom: 1%;;}
  .charts>div{float: none; width: 100%;}
  .charts canvas{width: 100% !important;}
  .profile-card{display: block; padding: 15px;}
  .profile-card .thumbnail{width: 130px; height: 130px; margin: 0 auto; }
}
</style>
