<template>
  <div>
    <button @click="sendEmail">Send!</button>
    <button @click="badDira">Bad!</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    sendEmail() {
      chrome.runtime.sendMessage({ message: 'goodDira' }, () => {});
    },
    badDira() {
      chrome.runtime.sendMessage({ message: 'badDira' }, () => {});
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
