<template>
  <form class="comment_form" @submit.prevent="onaddComment">
    <div>
      <p>
        <textarea
          v-model="textcomments"
          class="comments"
          name="comments"
          cols="30"
          rows="2"
          :class="{'invalid':textLengthChk}"
          @input="resize($event)"
        ></textarea>
      </p>
    </div>
    <div>{{ commentLen }}/100</div>
    <div v-if="textLengthChk" class="err">
      코멘트는 100자 이하여야 합니다.
    </div>
    <div class="comment_btm">
      <div class="rating">
        <p v-for="(star,index) in stars" :key="index" :class="{'active':rating=== index+1}" @click=" ratingStar(index) ">
          <span :id="`star${index}`" :class="{'init':rating === 0}" name="star"><i class="fas fa-star"></i></span>
        </p>
        <b>
          <template v-if="rating === 0">
            별점 주기
          </template>
          <template v-else>
            <img :src="starChange" alt="">
          </template>
        </b>
      </div>
      <!-- rating -->
      <button type="submit" class="round-btn fill comment_btn" :disabled="textLengthChk || !textcomments">
        코멘트 추가
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      textcomments: '',
      stars: 5,
      rating: 0
    }
  },
  computed: {
    commentLen () {
      return this.textcomments.length
    },
    textLengthChk () {
      return this.commentLen > 100
    },
    starChange () {
      switch (this.rating) {
        case 1:
          return '/images/star-lv1.png'
        case 2:
          return '/images/star-lv2.png'
        case 3:
          return '/images/star-lv3.png'
        case 4:
          return '/images/star-lv4.png'
        case 5:
          return '/images/star-lv5.png'
        default:
          return false
      }
    }
  },
  methods: {
    ...mapActions('comments', ['createComment']),
    onaddComment () {
      if (this.textcomments.trim().length <= 0) {
        return
      }
      this.createComment({ bookId: this.$route.params.id, comments: this.textcomments, rating: this.rating })
      this.resetForm()
    },
    resetForm () {
      this.textcomments = ''
      this.rating = 0
    },
    resize (e) {
      if (this.textLengthChk) { return }
      console.log(this.textLengthChk, 'ccccc')
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    ratingStar (index) {
      this.rating = index + 1
    }
  }

}
</script>

<style>
.comment_form {margin-top: 20px; border: 1px solid #ddd; padding: 20px;}
.comment_form .comment_btm{display: flex; align-items: center;}
.comment_form .comment_btn{margin-left: auto;}
.comment_form textarea{box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); border-radius: 10px; width: 100%; padding: 20px; box-sizing: border-box; }
.rating {display: flex; padding: 10px; margin: 20px 0; background-color: #444; width: 200px; border-radius: 10px; align-items: center;}
.rating span.init{ text-shadow: none; color: #222;}
.rating p{margin: 0 3px;}
.rating span{position: relative; cursor: pointer; display: inline-block; position: relative; color:gold; text-shadow: 0 0 5px yellow;}
.rating p.active~ p span {color:#222; text-shadow: none;}
.rating b{color:#fff; margin-left: auto; font-weight: normal;}
@media (max-width:430px) {
.comment_form{padding: 10px;}
.rating{width: 150px;}
.rating b{font-size: 12px;}
}
</style>
