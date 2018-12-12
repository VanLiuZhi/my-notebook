<template>
  <div class="contact-moudle">
    <a v-for="item in contacts"
      :href="item.href" :key="item.type"
      class="link-item"
      target="_blank" rel="noreferrer noopener">
      {{ item.desc }}
    </a>
    <div>
    <p class="intro">用于记录个人笔记，从实习开始就一直在"有道"上记笔记，不过"有道"有时候真的不太好用，所以把笔记都般到这里了</p>
  </div>
  </div>
</template>

<script>
export default {
  name: "Contact",

  computed: {
    contacts() {
      console.log(this.$page.frontmatter)
      return this.$page.frontmatter.contacts;
    }
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="stylus">
.contact-moudle
  margin-top 1rem
  text-align center
  .link-item
    display inline-block
    min-width: 2.5rem
    background-color #ffffff
    border 1px solid #ebeef5
    box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
    padding .6rem 1rem
    margin .5rem 1rem
    border-radius 1.5rem
.intro
  color: teal
</style>
