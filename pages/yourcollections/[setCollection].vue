<template>
    <div  class="library-explorer-container">

        <YourCollectionFilterSidebar />

        <div class="shelf-separator-container"><div class="shelf-separator"></div></div>
    <div class="explore-library-title">
        <h1>{{ route.params.setCollection}} </h1>
        <h4><span>Your Collection</span> will save your items and your view selections.</h4>
        <!-- <h4>Select from one of the 3 collections below, then click on the arrow to begin.</h4> -->
    </div>
    <div class="type-selector-wrapper" >
    <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >

        <div class="library-type-title-box" >
            <h1 class="library-type-title"></h1>
            <div class="index-list-main">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="11*icons.agentIcon.iconWidth" :height="33*icons.agentIcon.iconHeight" viewBox="0 0 11 33" fill="none">
                        <path d="M0 5.35535C0 2.39767 2.39767 0 5.35535 0C8.31302 0 10.7107 2.39767 10.7107 5.35535V26.7767C10.7107 29.7344 8.31302 32.1321 5.35535 32.1321C2.39767 32.1321 0 29.7344 0 26.7767V5.35535Z" :fill="icons.agentIcon.iconFill"/>
                    </svg>
                </div>
                <h3>The Agents</h3>   
            </div>
        </div>
        <template #popper >
         <div class="explore-category-descriptor">
            <h2>The Agents</h2>
            <p>In these collections the term <span>'Agents'</span> refers to the women who made the marginal marks in each book. They can also be referred to as <span>'Marginalists'</span>.</p>
            <p>The names of these women are known through the marks they made. These often included marks of ownership with the inscription, <span>"Her Book"</span>.</p>
         </div>
        </template>
    </VMenu>
        <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >

        <div class="library-type-title-box" >
            <h1 class="library-type-title"></h1>
            <div class="index-list-main">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.bookIcon.iconWidth" :height="30*icons.bookIcon.iconHeight" viewBox="0 0 10 30" fill="none">
                        <path d="M0.00512695 0H10V29.9846H0.00512695V0Z" :fill="icons.bookIcon.iconFill"/>
                    </svg>
                </div>
                <h3 >The Books</h3>
            </div>
        </div>
        <template #popper >
         <div class="explore-category-descriptor">
            <h2>The Books</h2>
            <p>The <span>Books</span> in these collections are books which have each been annotated by women <span>Agents</span>. These inscriptions are referred to as marginal <span>Marks</span>.</p>
              <p>These books have been sourced from international respositories. Images of the books and the marginal marks they contain can be viewed in the library.</p>
         </div>
        </template>
    </VMenu>
        <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
    >

        <div class="library-type-title-box" >
            <h1 class="library-type-title"></h1>
            <div class="index-list-main">
                        <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.markIcon.iconWidth" :height="33*icons.markIcon.iconHeight" viewBox="0 0 10 33" fill="none">
                            <path d="M0.379883 6.90698L4.99988 0L9.61988 6.90698V33H0.379883V6.90698Z" :fill="icons.markIcon.iconFill"/>
                        </svg>
                        </div>
                        <h3 >The Marks</h3>
                    </div>

        </div>
        <template #popper >
         <div class="explore-category-descriptor">
            <h2>The Marks</h2>
            <p>The term <span>'Marks'</span> refers to marks made by the women <span>Agents</span> within the <span>Books</span> in the collection. </p>
            <p>These marginal marks show diverse forms of engagement with each book and their text. Collectively these marks are known as <span>'Marginalia'.</span></p>
         </div>
        </template>
    </VMenu>
    </div>
        <div class="nav-div">
            <YourCollectionNav />
        </div>
        <div v-if="getActiveFiltersYC.length" class="filters-bar">
                <h4 class="library-nav-view-filters">Active Filters</h4>
                <div class="catalogue-filter-category-container-active-inview">
                    <button 
                    v-for="filterValue in getActiveFiltersYC"
                    @click="yourCollectionStore.filterActiveToggleYC(filterValue, filterValue.category, filterValue.itemType)" 
                    class="catalogue-filter-category-active"
                    :class="{ filterActive : filterObjectYC.get(filterValue.itemType)[filterValue.category][filterValue.name].active }">
                    <div class="catalogue-filter-category-wrapper">
                        <div class="catalogue-filter-category-titles-wrapper">
                            <h2 class="catalogue-filter-item" >
                                {{ filterValue.itemType }}
                            </h2>
                            <h3 class="catalogue-filter-category" >
                                 {{categoryMap.get(filterValue.itemType)[filterValue.category]}}
                            </h3>
                        </div>
                        <div class="catalogue-filter-category-value-container">
                            <p class="catalogue-filter-category-value" >  {{filterValue.name}} </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 0C2.65714 0 0 2.65714 0 6C0 9.34286 2.65714 12 6 12C9.34286 12 12 9.34286 12 6C12 2.65714 9.34286 0 6 0ZM6 11.1429C3.17143 11.1429 0.857143 8.82857 0.857143 6C0.857143 3.17143 3.17143 0.857143 6 0.857143C8.82857 0.857143 11.1429 3.17143 11.1429 6C11.1429 8.82857 8.82857 11.1429 6 11.1429Z" fill="white"/>
                                <path d="M8.31429 8.94434L6 6.63005L3.68571 8.94434L3 8.25862L5.31429 5.94434L3 3.63005L3.68571 2.94434L6 5.25862L8.31429 2.94434L9 3.63005L6.68571 5.94434L9 8.25862L8.31429 8.94434Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div class="explore-loading-page" v-if="!dataCheck">
            <div class="lds-default lds-grey"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>   
        </div>
        <div v-if="dataCheck">
            <YourCollectionView />
        </div>

    <div class="nav-bottom-div">
        <div v-if="dataCheck">
        <YourCollectionBottomNav />
        </div>
    </div>
    <!-- <button @click="showAnnotations=!showAnnotations" class="annotation-button" :class="{ 'active': showAnnotations }">
        🖊️
    </button>
        <AnnotationPanel v-if="showAnnotations"/> -->
    <!-- <button ref="toTopButton" @click="scrollToTop" class="to-top-button">☝️</button> -->


    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

// ROUTE MANAGERS
const route = useRoute()

// STATE MANAGERS IMPORT //    

//Library State
const libraryStore = useLibraryStore();
const viewStore = useViewStore();

//View State
const yourCollectionStore = useYourCollectionStore();
const { yourCollection, 
        allCollections,
        collectionName,
        itemLibraryYC, 
        dataSizeYC,
        libraryDisplayYC,
        formattedLibraryYC,
        formattedItemLibraryYC,
        filterLibraryYC, 
        heightCategoryYC,
        itemHeightYC,
        itemColourYC,
        colourScaleYC,
        colourScaleConverterYC,
        colourSetYC, 
        ordinalColourMapYC,
        viewColourSetYC,
        domainIndexYC,
        viewHeightBoundsYC,
        domainColourIndexYC,
        viewColourBoundsYC,
        activeFiltersYC,
        filterObjectYC,
        getActiveFiltersYC } = storeToRefs(yourCollectionStore)
const { getItemLibraryYC,
        getFilterObjectYC,
        filterActiveToggleYC,
        parseDatabaseYC,
        handleViewSelectionYC,
        getIDP_YC,
        getIFP_YC,
        itemTypeCheckYC,
        addToCollection, 
        removeFromCollection } = useYourCollectionStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        viewMap,
        invCategoryMap, 
        colourMapFiltered,
        scales } = storeToRefs(referenceStore)

        //Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();


    // const setQueryView = referenceStore.viewRouteQueries[route.params.setQuery]
    // console.log("setQueryView", setQueryView)
    // console.log("yourCollectionStore", yourCollectionStore.libraryDisplayYC)
    // console.log("query check", setQueryView.view.itemType)
    // Object.assign(yourCollectionStore.libraryDisplayYC.view, setQueryView.view)
    // Object.assign(yourCollectionStore.libraryDisplayYC.viewType, setQueryView.viewType)
    // Object.assign(yourCollectionStore.libraryDisplayYC.pageText, setQueryView.pageText)

//    console.log('library display', yourCollectionStore.libraryDisplayYC)
//    console.log('computed ', formattedLibraryYC)
//    console.log('computed length', formattedLibraryYC.length !== undefined)
   
   const dataCheck = computed (() => {
        return formattedLibraryYC.value.length !== undefined
    })

    function iconDimensions(){
    const scaleWidth = 1;
    const scaleHeight = 1;
    const fill = '#222';
    const activeFill = '#FFF';
        return {
            agentIcon:{
                iconHeight: 0.9  * scaleHeight,
                iconWidth: 0.7 * scaleWidth,
                iconFill: false? activeFill : fill,
            },
            bookIcon:{
                iconHeight: 1 * scaleHeight,
                iconWidth: 0.7 * scaleWidth,
                iconFill: false? activeFill : fill,
            },
            markIcon:{
                iconHeight: 0.9 * scaleHeight,
                iconWidth: 0.75 * scaleWidth,
                iconFill: false? activeFill : fill,
            },
        }
    }

    const icons = ref()

    watchEffect(()=>{
        icons.value = iconDimensions()
    })

    const showAnnotations = ref(false)

    // To Top Button
    // const { x, y } = useWindowScroll() // To replace below
    // const useX = ref(x)
    // const useY = ref(y)
    // const toExploreButton = ref();
    // const toTopButton = ref();
    // onMounted(() => {
    //     watchEffect(()=>{
    //         if (useY.value > 550) {
    //             toTopButton.value.classList.add("showButton");
    //         } else {
    //             toTopButton.value.classList.remove("showButton");
    //         }
    //     })
    // })
    const scrollToExplore = () => {
        window.scrollTo({ top: 540, behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // console.log('filter Object YC', yourCollectionStore.filterObjectYC)
    
    // console.log('formatted Library YC', yourCollectionStore.formattedLibraryYC)
    // console.log('filter Library YC', yourCollectionStore.filterLibraryYC)
    // console.log('your Collection', yourCollectionStore.yourCollection)
    // console.log('library data', viewStore.libraryData)
    // const showAnnotations = ref(false)


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
        z-index: 8;
        position: sticky;
        bottom: -1px;
        background-color: rgba(255,255,255,1);
        // width: 100%;
        // height: 100%;
        // opacity: 100%;

    }


</style>