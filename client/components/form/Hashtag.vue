<template>
  <div class="hashtag_form">
    <form @submit.prevent="onaddHashtag">
      <div class="text">
        <input v-model="hashtag" placeholder="ex)#추천#에세이#소설.." type="text">
      </div>
      <div>
        <button class="round-btn fill hash_htn" type="submit" :disabled="invalidHashtag || !hashtag ||hashtags.length>=10 ">
          추가
        </button>
        <p v-if="invalidHashtag" class="err">
          태그는 최대 10개까지 등록 가능합니다.
        </p>
        <p v-if="ishashtags && ishashtags.length===0" class="err">
          추가할 태그에 #을 붙여주세요.
        </p>
        <p v-if="msg" class="err">
          {{ msg }}
        </p>
      </div>
    </form>
    <ul v-if="!invalidHashtag" class="hashtags">
      <li v-for="(tag,index) in newtagList " :key="index" class="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    hashtags: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      hashtag: '',
      newtagnames: [],
      msg: ''
    }
  },
  computed: {
    ishashtags () {
      const tags = new Set(this.hashtag.match(/#[^\s#]+/g))
      return [...tags]
    },
    invalidHashtag () {
      return ((this.hashtags && this.hashtags.length) || 0) + ((this.newtagList && this.newtagList.length) || 0) > 10
    },
    newtagList () {
      if (!this.hashtag) { return }
      const tagnames = []
      const newtagnames = []
      this.hashtags.forEach((tag) => {
        tagnames.push(tag.name)
      })
      const news = (this.ishashtags || []).map((tag) => {
        return String(tag).slice(1).toLowerCase()
      })
      news.forEach((newtag) => {
        if (!tagnames.includes(newtag)) {
          newtagnames.push(newtag)
        }
      })
      return newtagnames
    }
  },
  methods: {
    ...mapActions('books', ['createHashtag']),
    onaddHashtag () {
      if (this.newtagList.length > 0) {
        this.createHashtag({ bookId: this.$route.params.id, hashtags: this.newtagList })
        this.resetHashtag()
      } else {
        this.msg = '이미 등록된 태그가 포함되어 있습니다.'
      }
    },
    resetHashtag () {
      this.hashtag = ''
      this.msg = ''
    }
  }

}
</script>

<style>
.hashtag_form{position: absolute; z-index: 100;  right: 0; top:100%; width:300px;}
.hashtag_form form div.text{width: 70%; }
.hashtag_form input{width: 100%; height: 40px; padding: 5px;  border: 1px solid #ddd; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); box-sizing: border-box;}
.hashtag_form .hash_htn{position: absolute; right:0; top:0; padding: 0; border-radius: 0; line-height: 40px; width: 30%;}
</style>
