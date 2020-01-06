<template>
  <div>
    {{dira}}
    <button @click="addDira">Send!</button>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["dira"])
  },
  methods: {
    ...mapActions(["addDira"])
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
