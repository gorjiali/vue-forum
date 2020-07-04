<template>
  <div class="thread">
    <div>
      <p>
        <a href="#">{{ thread.title }}</a>
      </p>
      <p class="text-faded text-xsmall">
        By
        <a href="#">Joseph Kerr</a>, yesterday.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">1 reply</p>

      <img
        class="avatar-medium"
        src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
        alt
      />

      <div>
        <p class="text-xsmall">
          <a href="#">Bruce Wayne</a>
        </p>
        <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>