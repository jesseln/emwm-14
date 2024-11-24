<template>



    <!-- <div class="query-box">
        <h2 class="query-breadcrumb"> {{ libraryDisplay.pageText.queryBreadcrumb }}</h2>
        <h2 class="query-breadcrumb">Total Items: {{ dataSize }}</h2>
    </div> -->
    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
    <div class="article-library-title">
        <div class="article-title-topsection">
        <div class="article-title-subsection">
            <h1> 
                {{ 
                    $route.params.articlePage.charAt(0).toUpperCase() + 
                    $route.params.articlePage.slice(1).replace("-", " ")
                }} 
            </h1>
            <h2>
                <span>
                    {{
                        articleProps.articleTitle.subHeading
                    }}
                </span>
            </h2>
            <h4>
                {{ 
                    articleProps.articleTitle.subHeadingContent 
                }}
            </h4>
        </div>
        <div>
            <div 
            class="article-title-image"
            :style="{ 
                height: articleProps.articleTitle.imageStyle.height + 'rem',
                width: articleProps.articleTitle.imageStyle.width + 'rem'
            }">
                <NuxtImg 
                :style="{ 
                    marginTop: articleProps.articleTitle.imageStyle.marginTop + 'rem',
                    marginRight: articleProps.articleTitle.imageStyle.marginRight + 'rem',
                    marginBottom: articleProps.articleTitle.imageStyle.marginBottom + 'rem',
                    marginLeft: articleProps.articleTitle.imageStyle.marginLeft + 'rem',
                    transform: 'scale('+ articleProps.articleTitle.imageStyle.scale + ')' 
                }"
                :src="articleProps.articleTitle.heroImage"
                />
            </div>
        </div>
        </div>  
    </div>
    <div  class="article-container">
        <component v-for="articleProp in articleProps.articleContent" 
            :key="articleProp"
            :is="
                articleProp.type === 'paraSection' 
                ? ArticleParaSection  
                : articleProp.type === 'image'
                ? ArticleImage
                : articleProp.type === 'library'
                ? ArticleLibrary
                : ArticleNull
                "                
            :content="articleProp.content"
        />
    </div>
</template>

<script setup>
import { ArticleImage, ArticleParaSection, ArticleNull, ArticleLibrary } from '#components'

// ROUTE MANAGERS
const route = useRoute()

//Reference Constants
const referenceStore = useReferenceStore();
const articleProps = ref(referenceStore.articleComponentRoutes[route.params.articlePage.replace("-", "")])

</script>

<style lang="scss" scoped>

.stdImage{
    position: relative;
    width: 60vw
    // height: 325px;
}

.articleTitle{
    position: relative;
    clip-path: polygon(43.00% 10.00%,90% 10%,90% 90%,43.00% 90.00%);
    height: 20vh;
}

.article-hero{
    display: flex;
    align-items: center;
    justify-content: center;
}
.article-std-image{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0 0;
    margin: 0;
}

span{
    font-weight: 650;
    // color: black;
}
.index-list-main{
    padding: 1rem 2rem 1rem 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    // width: 24vw;
}


.index-list-main h3{
    // padding: 2rem 0 0 0;
    margin: 0 0 0 0.75rem;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.65rem;
	font-weight:350;
	letter-spacing: 0.425rem;
  }

  .index-list-main h3.activePage {

	color: white;

  }

    .nav-div{
        z-index: 10;
        position: sticky;
        top: 0;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

    .nav-bottom-div{
        z-index: 15;
        position: sticky;
        bottom: -1px;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }

</style>