<template>
    <div class="library-nav-container">

    <div v-if="libraryDisplay.viewType.colour !== 'NotSelected'" class="library-nav-colour-wrapper">
        <div v-if="viewMap.get(libraryDisplay.viewType.colour)[libraryDisplay.view.colour].func === 'scaleOrdinal'"
            class="library-nav-colour-block"> 

        <div  v-for="colour in  ordinalColourMap" :key="colour">
            <div class="library-nav-colour-item">

                <div class="library-nav-colour-label-list" v-for="item in colour[1]" :key="item">
                    <div class="library-nav-colour-category" :style="{ background: colour[0]}">
                        <h3 class="library-nav-colour-label" :style="{ color: contrastHandler(colour[0])}">{{item.category}}</h3>
                    </div>
                </div>
            </div>
        </div> 
        </div>
        <div v-if="viewMap.get(libraryDisplay.viewType.colour)[libraryDisplay.view.colour].func === 'scaleSequential' && ordinalColourMap.length < 50"
                class="library-nav-colour-block"> 

            <div  v-for="colour in  ordinalColourMap" :key="colour">
                <div class="library-nav-colour-item">

                    <div class="library-nav-colour-label-list" v-for="item in colour[1]" :key="item">
                        <div class="library-nav-colour-category scaleSequential" :style="{ background: colour[0]}">
                            <h3 class="library-nav-colour-label" :style="{ color: contrastHandler(colour[0])}">{{item.category}}</h3>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div v-if="viewMap.get(libraryDisplay.viewType.colour)[libraryDisplay.view.colour].func === 'scaleSequential' && ordinalColourMap.length >= 50"
                class="library-nav-colour-block scaleSequential-large-title"> 
                <h3 class="library-nav-colour-label" >Min: {{getIDP(viewColourBounds[0], 'colour')}}</h3>
            <div  v-for="bandPoint in  [...Array(51).keys()].map(d => d/51)" :key="bandPoint">
                <div class="library-nav-colour-item">
                    <div class="library-nav-colour-label-list">
                        <div class="library-nav-colour-category scaleSequential-large" :style="{ background: colourScaleConverter(bandPoint)}">
                        </div>
                    </div>
                </div>
            </div>
                <h3 class="library-nav-colour-label" >Max: {{getIDP(viewColourBounds[1], 'colour')}}</h3>
        </div>
    </div>
    
            <div class="bottom-label">
                <div class="library-nav-title-block-colour"></div>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" :width="43*iconScaleFactor" :height="38*iconScaleFactor" viewBox="0 0 43 38" fill="none">
                    <circle cx="32.7285" cy="28.0532" r="9.35102" fill="#B3DE69"/>
                    <circle cx="21.0395" cy="9.35102" r="9.35102" fill="#BDB9D9"/>
                    <circle cx="9.35102" cy="28.351" r="9.35102" fill="#FB8072"/>
                </svg> -->
                <p class="article-colour-label" v-if="libraryDisplay.viewType['colour'] !== 'NotSelected'">
                    <!-- {{libraryDisplay.viewType['colour']}} |  -->
                    Colour highlights: {{categoryMap.get(libraryDisplay.viewType['colour'])[libraryDisplay.view['colour']]}}
                </p>
                <p class="article-colour-label" v-else="">
                    Colour highlights: {{categoryMap.get(libraryDisplay.viewType['colour'])[libraryDisplay.view['colour']]}}
                </p>
            </div>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import * as d3 from "d3";
const {articleView} = defineProps(['articleView']);

//Article Store
const articleStore = useArticleStore();
const { allArticles } = storeToRefs(articleStore)

//View State
const viewStore = useViewStore();
const { formattedLibrary, 
        itemHeight,
        colourSet,
        domainIndex,
        viewHeightBounds,
        viewColourSet } = storeToRefs(viewStore)
        const { parseDatabase,
        handleViewSelection,
        getIDP,
        handleColour } = useViewStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        viewMap,
        invCategoryMap, 
        colourMapFiltered } = storeToRefs(referenceStore)
        
const { alphabetically,
        handleFilterValue,
        handleObjectProperty,
        contrastHandler } = useUtils();
        

const libraryDisplay = ref(allArticles.value[articleView.name][articleView.section].library.libraryDisplay)
const filterLibrary = ref(allArticles.value[articleView.name][articleView.section].library.filterLibrary)

//Reference Constants
const zoomLevel = ref(allArticles.value[articleView.name][articleView.section].references.zoomLevel)
const scales = ref(allArticles.value[articleView.name][articleView.section].references.scales)
const libraryItemBundle = ref(allArticles.value[articleView.name][articleView.section].references.libraryItemBundle)
            


    // HANDLE COLOUR //
    function formatColour(){
        if(libraryDisplay.value.view.colour !== "Not Selected"){
            return (
                    (colourByValue) => {
                        if(colourByValue !== "no data")
                        {
                            return colourScaleConverter.value(colourScale.value(colourByValue)) //Returns nested scale function after applying band function (IIFE)
                        }
                        else{
                            return '#EEEEEE'
                        }
                    }
                )   
        }else{
            return (_)=> {return '#fff281'}
        }    
    }

    const colourScale = ref()
    const colourScaleConverter = ref()

    function processColourSet(data){
       return new Set(data.flatMap(d=> getIDP(d, 'colour')).sort((a,b)=>alphabetically(true)(handleFilterValue(a), handleFilterValue(b))))
    }

    //Get unique values in colour set
    const getColourSet = computed (() => {
        return processColourSet(allArticles.value[articleView.name][articleView.section].library.libraryData)
    })
    //Returns bandscale for colour values
    function colourBandscale(){
        return d3.scaleBand().domain(Array.from(getColourSet.value)) //Range defaults to [0,1]
    }

    colourScale.value = colourBandscale();

    function colourFunction() {
        const viewMode = 'colour'
        const viewSelection = libraryDisplay.value.view[viewMode]
        const viewModeType = libraryDisplay.value.viewType[viewMode]
        const colourFunction = referenceStore.viewMap.get(viewModeType)[viewSelection].func
        const colourScheme = referenceStore.viewMap.get(viewModeType)[viewSelection].scheme
        return d3[colourFunction](d3[colourScheme]) //Applies colour functions and schemes from Object. Domain defaults to [0,1]
    }

    colourScaleConverter.value =  colourFunction();

    articleStore.allArticles[articleView.name][articleView.section].library.itemC = formatColour()
    const itemColour = ref(allArticles.value[articleView.name][articleView.section].library.itemC)
    const ordinalColourMap = ref([]);
    const viewColourBounds = ref();
    const domainColourIndex = ref();

    function getOrdinalColourMap(){
        const ordinalMap = Array.from(getColourSet.value).map((category)=>{
            return {'colour': itemColour.value(category), 'category': category}
        })
        return  d3.flatGroup(ordinalMap, d => d.colour)
    }

    function getDomainIndex(viewMode) {
        return {min: d3.minIndex(allArticles.value[articleView.name][articleView.section].library.libraryData, d => getIDP(d, viewMode)), 
                max: d3.maxIndex(allArticles.value[articleView.name][articleView.section].library.libraryData, d => getIDP(d, viewMode))}
    }

    function getIndexItems(viewMode) {
        if(viewMode === 'colour'){
            return [allArticles.value[articleView.name][articleView.section].library.libraryData[domainColourIndex.value.min],
                    allArticles.value[articleView.name][articleView.section].library.libraryData[domainColourIndex.value.max]]
        }
    }

    domainColourIndex.value = getDomainIndex('colour');
    viewColourBounds.value = getIndexItems('colour');
    ordinalColourMap.value = getOrdinalColourMap();

const iconScaleFactor = ref(0.5)
</script>

<style lang="scss" scoped>

.library-catalogue-title-box{
    flex-shrink: 1000000000;
    // flex-grow: 1;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    // margin: 0.4rem 0 0.4rem 0.4rem ;
    margin: 0.15rem 0.5rem 0 0;
    padding: 0.1rem 0.5rem 0 0;
    border-right: 2px solid #ebebeb;
  }
  .library-catalogue-title{
	color: #111827;
	font-family:'Source Sans 3', sans-serif;
	font-size: 1.5rem;
	font-weight: 450;
	line-height: 1.5rem;
    padding: 0.1rem 0 0;
    letter-spacing: 0.05rem;
    width: 7.2vw
    
  }

.library-catalogue-subtitle{
    color: #575757;
	font-family:'Raleway', sans-serif;
	font-size: .825rem;
	font-weight: 450;
	line-height: 1.2rem;
    padding: 0.3rem 0 0;
    width: 8.2vw
}

.library-nav-container{
    margin: 0 var(--ArticleLibraryMargins) 0;
    padding: 0 0 0.5rem;
    display: grid;
    grid-template-rows: auto auto;
    justify-content: flex-start;
    border-top: 2px solid rgb(255, 255, 255);
    // height: 100%;
    max-width: 100vw;
    z-index: 15;
    // border-bottom: 2px solid rgb(241, 241, 241);
}
.library-nav-colour-wrapper{
    grid-row: 1/2;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    
}

.library-nav-colour-block{
    // flex-grow: 100000000;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 0 0.2rem;
    gap: 0.35rem 0;
}

.scaleSequential-large-title{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0 0.25rem;
    // background-color: rgba(255, 255, 255, 0.8);
    // border-bottom: 2px solid rgb(255, 255, 255);
}

.library-nav-colour-item{
    // position: relative;
    display: flex;
    flex-direction: column;
    // align-content: center;
    align-items: center;
}
.library-nav-colour-category{
	padding: 0.25rem 0.4rem;
    margin:  0.05rem 0.25rem; 
	border-radius: 20rem;

    border: 1px solid rgb(255, 255, 255);
    // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    min-width:3.5rem;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 12px 0px;
}

.scaleSequential{
    min-width:1.45rem;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 12px 0px;
}

.scaleSequential-large{
    padding: 0.5rem 0.45rem;
    margin:  0.05rem 0.01rem; 
    border: 0.01rem solid rgb(255, 255, 255);
    border-radius: 0rem;
    min-width:0.25rem;
    min-height: 0.25rem;
    // width: 50%;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 12px 0px;
}

.library-nav-colour-label-list{
    padding: 0 0.1rem;
    margin: 0 0.1rem;
    display: flex;
    align-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;

}
.library-nav-colour-label{
    padding: 0 0.2rem;
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    line-height: 0.8rem;
    color: black;
    width: 100%;
    white-space: nowrap;
}
.library-nav-dropdown{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    max-height: 2rem ;
    margin: 0 0 1rem 1.5rem;
    // position: relative;
}


.library-nav-title-block{
    display: flex;
    flex-flow: row nowrap;
    margin: 0 0.6rem 0 0;
    width: 100%;
    align-self: center;
    text-align: right;
    max-height: fit-content;
}
.library-nav-title-block-colour{

    max-height: 2rem;
}

.library-nav-view{
    // position: relative;
    margin: 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 450;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;
}

.library-nav-view-colour{
    display: flex;
    flex-flow: row wrap;
    // margin: 0.5rem 0 0 0;
    justify-content: center;
    font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 450;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;
    // flex-shrink: 1;
    // letter-spacing: 0.2rem;
}


.aselect {
    // display: flex;
    //     flex-direction: row;
    //     flex-wrap: nowrap;
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 5;

	}

    
    .selector {
        // display: flex;
        // flex-direction: row;
        // flex-wrap: nowrap;
        // width: 100%;
        border: 1px solid gainsboro;
        background: #ffffff;
        padding: 0 0.5rem 0 0;
        position: relative;
        z-index: 5;


        cursor: pointer;

    }

    
    .arrow {
            position: absolute;
            right: 10px;
            top: 45%;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 8px solid #adadad;
            // transform: rotate(90deg);
            // transition-duration: 0.3s;
            // transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
        }

        .expanded {
            transform: rotateZ(180deg) translateY(2px);
        }

    .selector:hover {
        background:#f7e8f777;
    }

    ul {
        width: 100%;
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-family: 'Raleway', sans-serif;
        font-size: 0.725rem;
        font-weight: 450;
        letter-spacing: 0.05rem;
        line-height: 1.1rem;
        color: black;
        border: 1px solid gainsboro;
        position: absolute;
        left: 0;
        // top: 0;
        background: #fff;
        // display: block;
        max-height: 60vh;
        // overflow: auto;
    }
    li {
        padding: 0.55rem 0.4rem;
        color: #666;
        border-bottom: 1px solid rgb(241, 241, 241);
        cursor: pointer;
        &:hover {
            // color: white;
            background:#f7e8f777;
        }
    }
    .current {
        font-size: 0.725rem;
        font-weight: 500;
        color:  black;
        background: #f7e8f777;
    }
    .hidden {
        visibility: hidden;
    }
    .visible {
        visibility: visible;
    }

    .library-nav-view-bottom{
    // position: relative;
    margin: 0;
    font-family: "Source Sans 3", sans-serif;
	font-size: 0.9rem;
	font-weight: 400;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;
}
    .bottom-label {
        grid-row: 2/2;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0;
        // gap: 0.5rem;
        // min-width: 16rem;
        padding: 0.5rem 1.25rem 0.75rem 0.5rem;
        font-family: "Raleway", sans-serif;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 0.05rem;
        line-height: 1.25rem;
        color: black;
        justify-content: flex-start;
        // background-color: #e7e7e7;
        }
    .article-colour-label {
        margin: 0;
        padding: 0;
        display: block;
        // font-family: "Raleway", sans-serif;
        // font-size: 1.15rem;
        // font-weight: 500;
        // line-height: 1.5rem;
        // letter-spacing: 0.15rem;
        color: black;
	font-family: Raleway, sans-serif;
	font-size: 0.8rem;
	font-weight:600;
        // color: rgb(80, 80, 80);
        text-align: left;
        }

</style>