<template>
  <header class="header" id="header">
    <router-link :to="{name: 'Home'}" class="logo">
      <img src="../assets/175c8d47-75c5-4928-ac05-4c01a7564e74_200x200.png" />
    </router-link>

    <div class="btn-hamburger">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul v-if="user">
        <li class="navbar-user">
          <a @click="dropDownOpen = !dropDownOpen">
            <img class="avatar-small" :src="user.avatar" alt />
            <span>
              {{ user.name }}
              <img class="icon-profile" src="@/assets/img/arrow-profile.svg" alt />
            </span>
          </a>
          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{'active-drop': dropDownOpen}">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{name: 'Profile'}">Profile</router-link>
              </li>
              <li class="dropdown-menu-item">
                <a @click="$router.push({name: 'SignOut'})">Log out</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{name: 'SignIn'}">SignIn</router-link>
        </li>
        <li class="navbar-item">
          <router-link :to="{name: 'Register'}">Register</router-link>
        </li>
      </ul>

      <ul>
        <li class="navbar-item">
          <a href="index.html">Home</a>
        </li>
        <li class="navbar-item">
          <a href="category.html">Category</a>
        </li>
        <li class="navbar-item">
          <a href="forum.html">Forum</a>
        </li>
        <li class="navbar-item">
          <a href="thread.html">Thread</a>
        </li>
        <!-- Show these option only on mobile-->
        <li class="navbar-item mobile-only">
          <a href="profile.html">My Profile</a>
        </li>
        <li class="navbar-item mobile-only">
          <a href="#">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dropDownOpen: false
    }
  },

  computed: {
    ...mapGetters({
      user: "authUser"
    })
  }
};
</script>

<style>
</style>