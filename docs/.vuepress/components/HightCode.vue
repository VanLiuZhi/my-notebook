<template>
  <div>
    <highlight-code lang="python">
    <slot></slot>        
    </highlight-code>
  </div>
</template>

<script>
export default {
  name: 'Contact',

  computed: {
    contacts() {
      return this.$page.frontmatter.contacts
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="stylus">
</style>
