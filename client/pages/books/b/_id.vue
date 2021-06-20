<template>
  <div>
    <!-- 책이 있을 경우에만 보여준다. -->
    <div v-if="getBook">
      <book-card-detail :book="getBook"></book-card-detail>
      <div class="control_btns">
        <div class="left_btn">
          <button class="primary-btn red" @click="onremoveBook">
            <i class="fas fa-trash-alt"></i>삭제
          </button>
          <button class="primary-btn" @click="onEditBook">
            <i class="fas fa-pen-square"></i>수정
          </button>
        </div>
        <div class="right_btn">
          <button class="primary-btn" @click="onEditHashtag">
            <i class="fas fa-pen-square"></i>해시태그
          </button>
          <form-hashtag v-if="editHashtag" :hashtags="getBook&&getBook.Hashtags"></form-hashtag>
        </div>
      </div>
      <book-edit v-if="editState" :mybook="getBook" @editStateChange="editStateChange">
      </book-edit>
      <comment-edit></comment-edit>
      <form-alert v-if="alert" :data="getBook && getBook.title" :confirm="`삭제`" @onagree=" agree" @ondisagree="disagree"></form-alert>
    </div>
    <div v-else>
      <book-empty></book-empty>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async asyncData ({ store, params }) {
    try {
      await store.dispatch('books/fetchBook', { id: params.id })
    } catch (error) {
      console.error(error)
    }
  },
  data () {
    return {
      editState: false,
      editHashtag: false,
      agreeState: false,
      alert: false
    }
  },
  computed: {
    ...mapGetters('books', ['getBook'])
  },
  methods: {
    ...mapActions('books', ['deleteBook']),
    onremoveBook () {
      this.alert = true
    },
    onEditBook () {
      this.editState = true
    },
    onEditHashtag () {
      this.editHashtag = !this.editHashtag
    },
    editStateChange () {
      this.editState = false
    },
    disagree () {
      this.agreeState = false
      this.alert = false
    },
    agree () {
      try {
        this.deleteBook({ id: this.$route.params.id })
          .then(() => {
            this.$router.push('/books/1')
          })
      } catch (error) {
        console.error(error)
      }
    }
  }

}
</script>

<style>
.control_btns{ margin: 10px 0; display: flex;}
.control_btns .right_btn{position: relative; margin-left: auto;}
.control_btns button{border-radius: 10px; letter-spacing: 1px;}
.control_btns button .fas{margin-right: 4px;}
</style>
