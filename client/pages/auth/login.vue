<template>
  <div class="auth_container">
    <form-login></form-login>
  </div>
</template>

<script>
export default {
  layout: 'none',
  middleware: 'anonymous',
  data () {
    return {
      active: false
    }
  }

}
</script>

<style>

</style>
