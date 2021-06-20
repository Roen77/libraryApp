<template>
  <div>
    <div v-if="otherBookList">
      <book-card-detail :book="otherBookList"></book-card-detail>
      <comment-edit></comment-edit>
    </div>
    <div v-else>
      <book-empty></book-empty>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ store, params }) {
    try {
      let otherBookList
      await store.dispatch('books/otherFetchBook', { id: params.id })
        .then((res) => {
          otherBookList = res.data.book
        })
      return { otherBookList }
    } catch (error) {
      console.error(error)
    }
  }

}
</script>

<style>

</style>
