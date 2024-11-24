<template>
    <div  v-if="route.params.articlePage">
        <NuxtPage />
    </div>

    <div v-if="!route.params.articlePage" class="library-explorer-container">

    <!-- <div class="query-box">
        <h2 class="query-breadcrumb"> {{ libraryDisplay.pageText.queryBreadcrumb }}</h2>
        <h2 class="query-breadcrumb">Total Items: {{ dataSize }}</h2>
    </div> -->
    <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
    <div class="explore-library-title">
        <h1>Explore the Library </h1>
        <h2>Curated Libraries with Articles to View</h2>
        <h4>Each library contains <span>the Agents</span>, the 'women marginalists' in the collection, <span>the Books</span> they owned and <span>the Marks</span> they made in the margins during the 16th and 17th centuries.</h4>
        <h4>
            Each of these views highlights an aspect of the early modern women’s marginalia library. They provide definitions, selected images, data visualisations and essays on the four main kinds of marginalia in the library (ownership, evidence of reading, marks of recording, and graffiti); the locations in the material book where such marks are found; and how such marks were attributed to women agents. Other views enlarge upon who those women agents were, the repositories from which the marginalia came, and the types of book that women marked.
        </h4>
        
    </div>

    <div >
            

    </div>


    <!-- <button @click="showAnnotations=!showAnnotations" class="annotation-button" :class="{ 'active': showAnnotations }">
        🖊️
    </button>
        <AnnotationPanel v-if="showAnnotations"/> -->
    <!-- <button ref="toTopButton" @click="scrollToTop" class="to-top-button">☝️</button> -->
    <div class="explore-library-container">
        <div class="explore-library-wrapper">
            <div class="shelf" v-for="shelf in topViewsList" :key="shelf">
                <div class="shelf-inner" >
                    <template class="section-wrapper" v-for="bookend in shelf[1]" :key="bookend">
                            <div class="explore-section-title-box-wrapper">
                            <div class="section-title-box">
                                <!-- <h3 class="section-value">
                                    {{ bookend[0]}}
                                </h3> -->
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
                            </div>
                                <div class="explore-section-inner" v-for="item in bookend[1]" :key="item">
                                    <ExploreItem :item="item"/>
                            </div> 
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>

</div>

</template>

<script setup>
import { storeToRefs } from "pinia";
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
// ROUTE MANAGERS
const route = useRoute()

    // STATE MANAGERS IMPORT //    
        
    //Reference Constants
    const referenceStore = useReferenceStore();
    const { zoomLevel,
            categoryMap, 
            invCategoryMap, 
            scales,
            libraryItemBundle,
            topViewsList } = storeToRefs(referenceStore)

  const itemModalContent = ref(null)
  const itemModalContentOuter = ref(null)
  const modalBackground = ref(null)
  const _item = ref(null)

  watchEffect(()=>{
    console.log('route.params.articlePage', route.params.articlePage)
  })


  // Event Handlers
const itemHandlers = {
  mouseover: handleMouseOver,
  mouseout: handleMouseOut
}

function handleMouseOver(d) {
    console.log('handle', d.currentTarget)
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, true));
}

function handleMouseOut(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, false));
}

function getUpPos(elm, isUp) {
    if( elm.classList.contains('explore-item-wrapper')){
        return `translate(0, ${(isUp ? -10 : 0)}px)`
    }
}


</script>

<style lang="scss" scoped>

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

.library-explorer-container{
    // max-width: 100vw;
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