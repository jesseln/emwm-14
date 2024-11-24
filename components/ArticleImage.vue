<template>
        <div class="article-std-image">
        <NuxtImg 
            :class="[stdImageClass]"
            :src="content.image"
            />
        </div>
        <div class="article-image-caption-container">
            <div class="article-image-caption" v-html="content.caption"></div>
        </div>
</template>

<script setup>
const {content} = defineProps(['content']);

const heroImageClass = ref('graffitiHero')
const stdImageClass = ref('stdImage')
const titleImageClass = ref('articleTitle')

</script>

<style lang="scss" scoped>

.stdImage{
    position: relative;
    width: 60vw
    // height: 325px;
}

.article-std-image{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0 0;
    margin: 0;
}

</style>