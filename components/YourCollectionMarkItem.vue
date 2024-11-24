<template>
    <VMenu
        placement="top" 
        :delay="{ show: 50, hide: 200 }"
        @show="menuShown"
    >
        <div class="item-wrapper"
            :class="{ 
                        zoomOut : zoomLevel === '0',
                        zoomMid : zoomLevel === '50',
                        zoomIn : zoomLevel === '100',
                    }"
             v-on="itemHandlers" 
             :style="{ maxHeight: scales.maxItemHeight + 'px', 
             height: itemHeightYC(getIDP_YC(item,'height')) + 'px', 
             width:scales.minItemWidth + 'px'}">    
            <div class="mark-item-top" :style="{ background: itemColourYC(getIDP_YC(item, 'colour')), width:scales.minItemWidth + zoomOffsetTopWidth - 2 + 'px'}"></div>
            <div class="mark-item-top-background" :style="{ width:scales.minItemWidth + zoomOffsetTopWidth + 2 + 'px'}"></div>
            <div class="mark-item-background" :style="{ maxHeight: scales.maxItemHeight + zoomOffsetBotHeight -20  + 'px', height: itemHeightYC(getIDP_YC(item,'height'))-20 + 'px',width:scales.minItemWidth + 2 + 'px'}"></div>
            <div class="mark-item" 
                :style="{ maxHeight: scales.maxItemHeight + zoomOffsetBotHeight -23 + 'px', 
                height: itemHeightYC(getIDP_YC(item,'height'))-23 + 'px' , 
                background: itemColourYC(getIDP_YC(item, 'colour')),
                width:scales.minItemWidth - 2 + 'px'}" 
                :class="{lowlight: isHighlight}">
                <div v-if="zoomLevel === '0'" class="item-value" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                </div>
                <div v-if="zoomLevel === '50'" class="item-value" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                    <p >{{ getIDP_YC(item, itemBundle.labelViewMode) }}</p>
                </div>
                <div v-if="zoomLevel === '100'" class="item-value" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                    <div class="item-menu-header-container">
                        <h2 class="item-menu-header" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">{{ itemBundle.menuHeader }}</h2>
                        <h2 class="item-menu-subheader-ID" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">{{ handleObjectProperty(item, itemBundle.ownProp1) }}</h2>
                        <h2 class="item-menu-subheader" 
                        :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }"
                        :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}"> 
                            {{ handleObjectProperty(item, itemBundle.menuSubheader) }}
                        </h2>
                        <h5 class="item-menu-subheader-type" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                            {{categoryMap.get(itemBundle.itemType)[itemBundle.menuSubheader]}}
                        </h5>
                    </div>
                </div>

        <div class="item-embedded-images-wrapper">
                <div v-if="!loadedCheck && !loadedFail && imageSlides.image.length !== 0 && zoomLevel === '100'">
                    <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>   
                </div>
                <div v-if="loadedFail">
                    <div v-if="imageFound && zoomLevel === '100'">
                        <p class="item-menu-subheader-type base no-border" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                            This image filetype cannot be displayed
                        </p>
                    </div>   
                </div>
                <!-- <div v-if="!loadedFail">
                    <div v-if="!imageFound && zoomLevel === '100'">
                        <p class="item-menu-subheader-type base no-border" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                            This item has no book images
                        </p>
                    </div>   
                </div> -->
                <div v-if="imageFound && zoomLevel === '100' && !loadedFail" class="item-embedded-images">
                    <div class="item-embedded-image-slider">
                        <vueper-slides 
                        :dragging-distance="70"
                        class="no-shadow" 
                        slide-image-inside
                        :visible-slides=1
                        slide-multiple
                        :slide-ratio="1 / 8"
                        fixed-height="10vh"
                        :gap="1"
                        :arrows="false"
                        prevent-y-scroll 
                        lazy 
                        lazy-load-on-drag
                        @image-loaded = "loadedCheck = true"
                        @image-failed = "loadedFail = true">
                            <vueper-slide
                                v-for="itemImage in imageSlides.image.slice(-1)"
                                :key="itemImage"
                                :image="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${imageFolder}/${item[itemID]}/${itemImage.name}`"
                            />
                        </vueper-slides>
                    </div>
                </div>
                <div v-if="zoomLevel === '100'" class="item-value" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                    <h5 class="item-menu-subheader-type base" :style="{ color: contrastHandler(itemColourYC(getIDP_YC(item, 'colour'))), borderColor: contrastHandler(itemColourYC(getIDP_YC(item, 'colour')))}">
                        {{imageSlides.image.length}} Images
                    </h5>
                </div>
            </div> 
        </div>
    </div>
    <template #popper >
            <div class="item-menu-container scrollable">
            <div class="item-menu-header-container">
                <h2 class="item-menu-header">{{ itemBundle.menuHeader }}</h2>
                <h2 class="item-menu-subheader-ID">{{ handleObjectProperty(item, itemBundle.ownProp1) }}</h2>
                <h2 class="item-menu-subheader"> 
                    {{ handleObjectProperty(item, itemBundle.menuSubheader) }}
                </h2>
                <p class="item-menu-subheader-type">
                    {{categoryMap.get(itemBundle.itemType)[itemBundle.menuSubheader]}}
                </p>
            </div>
            <div class="item-menu-totals-wrapper">
                <div class="item-menu-totals">
                        <div class="item-menu-totals-badge">
                            <div class="item-menu-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" :width="11*icons.agentIcon.iconWidth" :height="33*icons.agentIcon.iconHeight" viewBox="0 0 11 33" fill="none">
                                    <path d="M0 5.35535C0 2.39767 2.39767 0 5.35535 0C8.31302 0 10.7107 2.39767 10.7107 5.35535V26.7767C10.7107 29.7344 8.31302 32.1321 5.35535 32.1321C2.39767 32.1321 0 29.7344 0 26.7767V5.35535Z" :fill="icons.agentIcon.iconFill"/>
                                </svg>
                                <h4 class="item-menu-subheader-type">Agents</h4>
                            </div>
                            <p>{{itemLibraryCount[0]}}</p>
                        </div>
                    <div class="item-menu-totals-badge">
                        <div class="item-menu-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.bookIcon.iconWidth" :height="30*icons.bookIcon.iconHeight" viewBox="0 0 10 30" fill="none">
                                <path d="M0.00512695 0H10V29.9846H0.00512695V0Z" :fill="icons.bookIcon.iconFill"/>
                            </svg>
                            <h4 class="item-menu-subheader-type">Books</h4>
                        </div>
                        <p>{{itemLibraryCount[1]}}</p>
                    </div>
                    <div class="item-menu-totals-badge">
                        <div class="item-menu-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.markIcon.iconWidth" :height="33*icons.markIcon.iconHeight" viewBox="0 0 10 33" fill="none">
                                <path d="M0.379883 6.90698L4.99988 0L9.61988 6.90698V33H0.379883V6.90698Z" :fill="icons.markIcon.iconFill"/>
                            </svg>
                            <h4 class="item-menu-subheader-type">Marks</h4>
                        </div>
                        <p>{{itemLibraryCount[2]}}</p>
                    </div>
                </div>
            </div>
            <div class="shelf-button-wrapper">
                <button class="shelf-button" @click="removeFromCollection(item)">{{itemBundle.yourCollectionText}}</button>
            </div>
            <div class="item-menu-details-button">
                <div class="shelf-button-wrapper">
                    <button class="catalogue-filter-category-box details-button" @click="$emit('viewDetails', item)"> View Details </button>
                </div>
            </div>
        </div>
        </template>
    </VMenu>
    <div class="section-shelf-box">
    <!-- Shelf Box DO NOT DELETE -->
    </div>


</template>

<script setup>
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'



const loadedCheck = ref(false);
const loadedFail = ref(false);
//Props
const {item, itemBundle} = defineProps(['item', 'itemBundle']);
const {viewDetails} = defineEmits(['viewDetails']);
const supabase = useSupabaseClient()

// STATE MANAGERS IMPORT //    
//View State
const yourCollectionStore = useYourCollectionStore();
const { allColleciton,
        yourCollection, 
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
        removeFromCollection,
        getItemLibraryCountYC, 
    } = useYourCollectionStore();
    
//Reference Constants
const referenceStore = useReferenceStore();
const { zoomLevel,
        categoryMap, 
        invCategoryMap, 
        scales } = storeToRefs(referenceStore)

// COMPOPSABLES
//Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();


const itemID = ref();
const imageRequestID = ref();
const imageFolder = ref();
const itemType = ref()
const imageFound = ref(false);
const imageSlides = ref(
    { 
        image: [],
        title: "my title",
        content: "my content",
    }
)

function updateItemRefs(){
    imageFound.value = false
    if(itemType.value === 'Agent'){
        itemID.value = 'FemaleAgentID'
    } 
    if(itemType.value === 'Book'){
        itemID.value = 'BookID'
        imageRequestID.value = 'BookID'
        imageFolder.value = 'book-images'
    } 
    if(itemType.value === 'Mark'){
        itemID.value = 'MargID'
        imageRequestID.value = 'MargID'
        imageFolder.value = 'mark-images'
    } 
}

async function getImages(item){
    imageFound.value = false
    const { data, error } = await supabase
    .storage
    .from(`${imageFolder.value}`)
    .list(`${item[imageRequestID.value]}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    })
    if(error) {
            console.log(error)
    }
    if(data){
        imageSlides.value.image = data
        imageFound.value = data.length > 0 ? true : false
        return data
    }
}

onMounted(()=>{
    watchEffect(()=>{

        if(zoomLevel.value === '100'){
            console.log('check for images')
            itemType.value = itemTypeCheckYC(item)
            updateItemRefs(item)
            getItemLibraryYC(item)
            watch(()=> item,()=>{
                if(itemType.value !== 'Agent') {
                    // console.log('itemTYpe ',itemType.value)
                    getImages(item)
                }
            }, { immediate: true })
        }
    })
})


        
//Function format written to use local vairables and return to reactive value
function iconDimensions(){
    const scaleWidth = 1;
    const scaleHeight = 1;
    const fill = '#999';
    return {
        agentIcon:{
            iconHeight: 0.9  * scaleHeight,
            iconWidth: 0.7 * scaleWidth,
            iconFill: fill,
        },
        bookIcon:{
            iconHeight: 1 * scaleHeight,
            iconWidth: 0.7 * scaleWidth,
            iconFill: fill,
        },
        markIcon:{
            iconHeight: 0.9 * scaleHeight,
            iconWidth: 0.75 * scaleWidth,
            iconFill: fill,
        },
    }
}

const zoomOffsetBotHeight = ref()
const zoomOffsetTopWidth = ref()


const icons = ref()

watchEffect(()=>{
    icons.value = iconDimensions()
    if(zoomLevel.value === '0') {
        zoomOffsetBotHeight.value = 5
        zoomOffsetTopWidth.value = 2
    }else{
        zoomOffsetBotHeight.value = 0
        zoomOffsetTopWidth.value = 0
    }
})

//Kept due to temporary use in template.
const isHighlight = ref(false);
const itemLibraryCount = ref([])

function menuShown() {
    // console.log(item)
    itemLibraryCount.value = getItemLibraryCountYC(item)
    
}

// Event Handlers
const itemHandlers = {
  mouseover: handleMouseOver,
  mouseout: handleMouseOut
}

function handleMouseOver(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, true));
}

function handleMouseOut(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, false));
}

function getUpPos(elm, isUp) {
    if( elm.classList.contains('item-wrapper')){
    return `translate(0, ${(isUp ? -10 : 0)}px)`
    }
}

</script>

<style scoped>

</style>