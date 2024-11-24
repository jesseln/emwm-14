<template>
    <div class="article-para-section">
            <div v-for="para in content" :key="para" class="article-para" v-html="para"></div>
    </div>
</template>

<script setup>
const {content} = defineProps(['content']);

</script>

<style lang="scss" scoped>

</style>