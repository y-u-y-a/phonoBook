<template>
  <div class="row flex-x-center">
    <div class="col-md-10">
      <header class="my-2 b-font-24">{{ page_title }}</header>
      <ul id="book-list" class="row flex-wrap">
        <li
            v-for="book in books"
            :key="book.id"
            class="row flex-column mb-2 text-center">
          <div class="mx-2 shadow">
            <router-link
              tag="img"
              :to="'/book/Show/' + book.id"
              :src="book.cover"
              :alt="book.title"
              width="230"
              height="300"
              class="pointer"
            />
            <!-- bindで親に変数を渡す -->
            <slot name="bottom-section" :book="book"></slot>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  props: ["page_title", "books"]
};
</script>


<style lang="scss" scoped>
// PC
@media screen and (min-width: 640px) {
  li {
    box-sizing: border-box; // width=青+padding
    a:hover {
      opacity: 0.7;
    }
  }
}

// スマホ
@media screen and (max-width: 640px) {
  #book-list {
    justify-content: center !important;
  }
}
</style>
