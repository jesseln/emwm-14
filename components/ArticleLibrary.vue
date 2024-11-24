<template>
        <h2 class="article-view-title">
            Visualisations of types of marginalia in the database, with graffiti as a percentage against ownership, annotation, and recording.
        </h2>
        <div v-if="dataCheck"> 
            <div class="article-view-insert">
                <LibraryArticleView :articleView="{
                    name: content.name, 
                    section: content.section
                    }" />
            </div>
            <div >
            <LibraryBottomNavArticle :articleView="{
                    name: content.name, 
                    section: content.section
                    }" />
            </div>
        </div>
        <div v-else>
            <div class="article-library-loading-wrapper">
                <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>   
            </div>  
        </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const {content} = defineProps(['content']);

//Library State
const libraryStore = useLibraryStore();

//View State
const viewStore = useViewStore();

const { parseDatabase,
        handleViewSelection,
        getIDP,
        filterActiveToggle,
        updateView,
        getFilterObject,
        formatHeight,
        formatColour,
        getAllFilters,
        updateFilteredLibrary } = useViewStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { updateScales } = useReferenceStore();

//Article Store
const articleStore = useArticleStore();
const { allArticles } = storeToRefs(articleStore)
const { cloneLibrary,
    cloneReferences,
    _cloneLibrary,
    _cloneReferences,
    parseReferences } = useArticleStore();


const dataCheck = ref(false)

onMounted(()=>{
    async function cloneStores(content){
        const articleName = content.name
        const articleSection = content.section
        const articleItemType = content.sectionView.view.itemType
        const useFilter = content.sectionView.articleFilter.useFilter
        const filterItemType = content.sectionView.articleFilter.itemType
        const filterCategory = content.sectionView.articleFilter.category
        const filterOption = content.sectionView.articleFilter.option

        Object.assign(viewStore.libraryDisplay.view, content.sectionView.view)
        Object.assign(viewStore.libraryDisplay.viewType, content.sectionView.viewType)
        Object.assign(viewStore.libraryDisplay.pageText, content.sectionView.pageText)
        parseDatabase(libraryStore[articleItemType])
        referenceStore.zoomLevel = content.sectionView.zoom.zoomLevel
        updateScales()
        updateView()
        getAllFilters()

        if(useFilter){
            filterActiveToggle(viewStore.filterObject.get(filterItemType)[filterCategory][filterOption], filterCategory, filterItemType)
            updateFilteredLibrary()
        }
        cloneLibrary(viewStore.libraryData,'libraryData', articleName, articleSection)
        cloneLibrary(viewStore.libraryDisplay,'libraryDisplay', articleName, articleSection )
        cloneLibrary(viewStore.domainIndex, 'domainIndex', articleName, articleSection )
        cloneLibrary(viewStore.heightCategory, 'heightCategory', articleName, articleSection )
        _cloneReferences(referenceStore.libraryItemBundle, 'libraryItemBundle', articleName, articleSection)
        cloneReferences(referenceStore.zoomLevel, 'zoomLevel', articleName, articleSection)
        cloneReferences(referenceStore.scales, 'scales', articleName, articleSection)
        _cloneLibrary(viewStore.filterLibrary, 'filterLibrary', articleName, articleSection)
        if(useFilter){
            filterActiveToggle(viewStore.filterObject.get(filterItemType)[filterCategory][filterOption], filterCategory, filterItemType)
            updateFilteredLibrary()
        }
        dataCheck.value = true
    }


    const postPageload = ref(false)
    watch([postPageload, libraryStore.complete],()=>{
        if(libraryStore.complete.agent && libraryStore.complete.mark && libraryStore.complete.book) {
            cloneStores(content)
        }
    },{deep:true})
    setTimeout(() => {postPageload.value = true}, 1)
})

</script>

<style lang="scss" scoped>

</style>