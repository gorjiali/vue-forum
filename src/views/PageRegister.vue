<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="create" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input v-model="form.name" id="name" type="text" class="form-input" />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="form.username" id="username" type="text" class="form-input" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" id="email" type="email" class="form-input" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" id="password" type="password" class="form-input" />
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input v-model="form.avatar" id="avatar" type="text" class="form-input" />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
        avatar: null,
      }
    }
  },

  methods: {
    create() {
      this.$store.dispatch('registerUserWithEmailAndPassword', this.form).then((user) => this.$router.push({ name: 'Home' }))
    }
  },

  created() {
    this.$emit('ready')
  }
}
</script>

<style>
</style>