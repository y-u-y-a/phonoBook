<template>
  <header class="row flex-x-center bg-black c-white">
    <div class="col-md-10 row flex-justify-between flex-y-center py-1">
      <!-- ロゴ -->
      <RouterLink tag="h1" to="/" class="b-font-28 letter-4 pointer">{{ APP_NAME }}</RouterLink>
      <!-- ナビゲーションバー -->
      <nav class="row font-16">
        <RouterLink
          v-if="login_user"
          tag="div"
          :to="`/user/Show/${login_user.id}`"
          class="pc nav-link ml-1 px-2 py-05 radius-25 solid-white-1 pointer"
        >マイページ</RouterLink>
        <RouterLink
          v-if="!login_user"
          tag="div"
          to="/user/Login"
          class="pc nav-link ml-1 px-2 py-05 radius-25 solid-white-1 pointer"
        >ログイン</RouterLink>
        <RouterLink
          tag="div"
          to="/"
          class="pc nav-link ml-1 px-2 py-05 radius-25 solid-white-1 pointer"
        >トップへ</RouterLink>
        <div
          v-if="login_user"
          @click="logout"
          class="pc nav-link ml-1 px-2 py-05 radius-25 solid-white-1 pointer"
        >ログアウト</div>
      </nav>
    </div>
  </header>
</template>


<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      APP_NAME: process.env.MIX_APP_NAME
    };
  },

  computed: {
    ...mapState("User", ["is_admin", "login_user"])
  },

  methods: {
    ...mapMutations("User", ["switch_admin"]),
    ...mapActions("User", ["logout"])
  }
};
</script>


<style lang="scss" scoped>
@import "colors";

.nav-link:hover {
  color: $black;
  background: $white;
}
</style>
