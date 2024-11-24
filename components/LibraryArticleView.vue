<template>
    <div class="article-library-wrapper">
    
    <div class="article-shelf" v-for="shelf in filterLibrary" :key="shelf">
        <div v-if="shelf[0] !== 'All Items'" class="shelf-title-box">
            <h2 class="shelf-title">{{shelf[0]}}</h2>
        </div>
        <div class="shelf-inner" >
            <template class="section-wrapper" v-for="bookend in shelf[1]" :key="bookend" >
                    <div class="section-title-box-wrapper">
                    <div class="section-title-box" 
                    :style="{ height: scales.maxShelfHeight + 'px'}"
                    :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }">
                        <h3 v-if="zoomLevel !== '0'" class="section-category">{{ categoryMap.get(libraryDisplay.viewType.bookend)[libraryDisplay.view.bookend] }}</h3>
                        <h3 class="section-value"
                        :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }">
                            {{ bookend[0] }}
                        </h3>
                        <div class="section-shelf-box">
                        <!-- Shelf Box DO NOT DELETE -->
                        </div>
                    </div>
                        <div class="section-inner" 
                        :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }"
                        v-for="item in bookend[1].slice(0,1)" 
                        :key="JSON.stringify(item)" 
                        :style="{ height: scales.maxShelfHeight + 'px'}">
                            <LazyAgentItemArticle @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Agent'" :item="{...item, ...libraryDisplay}" :itemBundle="libraryItemBundle.Agent" :articleView="articleView"/>
                            <LazyBookItemArticle @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="{...item, ...libraryDisplay}" :itemBundle="libraryItemBundle.Book" :articleView="articleView"/>
                            <LazyMarkItemArticle @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Mark'" :item="{...item, ...libraryDisplay}" :itemBundle="libraryItemBundle.Mark" :articleView="articleView"/>
                    </div> 
                
                    </div>
                    <div class="section-inner" 
                        v-for="item in bookend[1].slice(1, 
                        bookend[1].length)" 
                        :class="{ 
                            zoomOut : zoomLevel === '0',
                            zoomMid : zoomLevel === '50',
                            zoomIn : zoomLevel === '100',
                        }"
                        :key="JSON.stringify(item)" 
                        :style="{ height: scales.maxShelfHeight + 'px'}">
                            <LazyAgentItemArticle @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Agent'" :item="{...item, ...libraryDisplay}" :itemBundle="libraryItemBundle.Agent" :articleView="articleView"/>
                            <LazyBookItemArticle @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="{...item, ...libraryDisplay}" :itemBundle="libraryItemBundle.Book" :articleView="articleView"/>
                            <LazyMarkItemArticle @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Mark'" :item="{...item, ...libraryDisplay}" :itemBundle="libraryItemBundle.Mark" :articleView="articleView"/>
                    </div>
                </template>
        </div>
    </div>
    <div class="modal-background"  ref="modalBackground">
        <div class="item-modal-content-outer" ref="itemModalContentOuter">
            <div class="item-modal-content" ref="itemModalContent" >
                <ItemModal :key="_item" v-if="_item" @close="hideModal" :_item="_item" />
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    import * as d3 from "d3";
    import { storeToRefs } from "pinia";
    const {articleView} = defineProps(['articleView']);
   
    // STATE MANAGERS IMPORT //    

    //Library State
const libraryStore = useLibraryStore();

//Article Store
const articleStore = useArticleStore();
const { allArticles } = storeToRefs(articleStore)

//View State
const viewStore = useViewStore();
const { parseDatabase,
        handleViewSelection,
        getIDP,
        itemTypeCheck } = useViewStore();

const { alphabetically,
    handleFilterValue,
 } = useUtils();
        

const libraryDisplay = ref(allArticles.value[articleView.name][articleView.section].library.libraryDisplay)
const filterLibrary = ref(allArticles.value[articleView.name][articleView.section].library.filterLibrary)

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap } = storeToRefs(referenceStore)
const zoomLevel = ref(allArticles.value[articleView.name][articleView.section].references.zoomLevel)
const scales = ref(allArticles.value[articleView.name][articleView.section].references.scales)
const libraryItemBundle = ref(allArticles.value[articleView.name][articleView.section].references.libraryItemBundle)
            

  const itemModalContent = ref(null)
  const itemModalContentOuter = ref(null)
  const modalBackground = ref(null)
  const _item = ref(null)


// watchEffect(()=>{
//     console.log('articleView', articleView) 
//     console.log('allArticles', allArticles.value[articleView.name][articleView.section].library.libraryDisplay)
//     console.log('allArticles filterLibrary', allArticles.value[articleView.name][articleView.section].library.filterLibrary)
//     console.log('allArticles library', allArticles.value[articleView.name][articleView.section].library)
//     console.log('allArticles total', allArticles.value)
// })

//REFORMAT HEIGHT LOCALLY
// HANDLE HEIGHT //
function formatHeight() {
    const viewSelection = libraryDisplay.value.view.height
    if(viewSelection !== "Not Selected") {
        //Returns a function which takes the log scale of the input then invokes the d3 scale function (IIFE)
        if(allArticles.value[articleView.name][articleView.section].library.heightCategory.logarithmic.includes(viewSelection)){
            return (value)=>{ 
                return (d3.scaleLinear()
                            .domain(chooseHeightDomain(allArticles.value[articleView.name][articleView.section].library.libraryData).map(d => Math.log(d))) 
                            .unknown(scales.value.minItemHeight) //Set all non-numeric values to max height
                            .range([scales.value.minItemHeight, scales.value.maxItemHeight])
                            .clamp(true)
                        )(Math.log(value)); 
            }
        }else{
            return d3.scaleLinear()
                        .domain(chooseHeightDomain(allArticles.value[articleView.name][articleView.section].library.libraryData)) 
                        .unknown(scales.value.minItemHeight) //Set all non-numeric values to max height
                        .range([scales.value.minItemHeight, scales.value.maxItemHeight])
                        .clamp(true);     
        }
    }else{
        return (_)=> {return scales.value.maxItemHeight}
    }
}

function chooseHeightDomain(data){   
        const viewSelection = libraryDisplay.value.view.height
        if(allArticles.value[articleView.name][articleView.section].library.heightCategory.year.includes(viewSelection)) {
            return [1450, 1750] //was - clamp(1450, longestNumber, 1750)
        }else{
            return [getIDP(data[allArticles.value[articleView.name][articleView.section].library.domainIndex.min], 'height'), getIDP(data[allArticles.value[articleView.name][articleView.section].library.domainIndex.max], 'height')]
        }
}

articleStore.allArticles[articleView.name][articleView.section].library.itemH = formatHeight()

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

  function showModal(item){
    //Component Prop
    _item.value = item;
    //Styles
    itemModalContent.value.style.transitionDelay = '.15s'
    itemModalContent.value.style.visibility = 'visible'
    modalBackground.value.style.transitionDelay = '.075s'
    modalBackground.value.style.visibility = 'visible'
    itemModalContentOuter.value.style.transitionDelay = '.075s'
    itemModalContentOuter.value.style.visibility = 'visible'
  }

  const hideModal = ()=>{
    itemModalContent.value.style.transitionDelay = '.3s'
    itemModalContent.value.style.visibility = 'hidden'
    modalBackground.value.style.transitionDelay = '.15s'
    modalBackground.value.style.visibility = 'hidden'
    itemModalContentOuter.value.style.transitionDelay = '.15s'
    itemModalContentOuter.value.style.visibility = 'hidden'
  }

  onClickOutside(itemModalContent, (event) => {
    if(itemModalContent.value.style.visibility === 'visible' && event.target.matches('.modal-background')){
        itemModalContent.value.style.transitionDelay = '.3s'
        itemModalContent.value.style.visibility = 'hidden'
        modalBackground.value.style.transitionDelay = '.15s'
        modalBackground.value.style.visibility = 'hidden'
        itemModalContentOuter.value.style.transitionDelay = '.15s'
        itemModalContentOuter.value.style.visibility = 'hidden'
    }  
  })

    // To Top Button
    const { x, y } = useWindowScroll() // To replace below
    const useX = ref(x)
    const useY = ref(y)

  const zoomOut = ()=>{
    if(zoomLevel.value === '50' ) zoomLevel.value = '0';
    if(zoomLevel.value === '100' ) zoomLevel.value = '50';
  }
  const zoomIn = ()=>{
    if(zoomLevel.value === '50' ) zoomLevel.value = '100';
    if(zoomLevel.value === '0' ) zoomLevel.value = '50';
  }

</script>

<style lang="scss" scoped>
  .library-catalogue-title-box{
    position: absolute;
    -webkit-transform:rotate(-90deg);
    -moz-transform:rotate(-90deg);
    -o-transform:rotate(-90deg);
    transform:rotate(-270deg);
    top: 0%;
    right: -62.5%;
    margin: 0.4rem 0 0.4rem 0.4rem ;
    grid-row: 2/3;
    padding: 0.5rem 0 0.5rem 0;
    border-bottom: 2px solid #ebebeb;
    width: 7.5vw;

  }
  .library-catalogue-title{
	color: #111827;
	font-family:'Source Sans 3', sans-serif;
	font-size: 1.5rem;
	font-weight: 450;
	line-height: 1.5rem;
	padding: 0 0 0.3rem;
    letter-spacing: 0.05rem;
  }

.library-catalogue-subtitle{
    color: #575757;
	font-family:'Raleway', sans-serif;
	font-size: .825rem;
	font-weight: 450;
	line-height: 1.2rem;
}

input {
  width: 50%;
}
.section-inner.zoomOut{
	gap: 0px 0.15rem;
}
.section-inner.zoomMid{
	gap: 0px 0.15rem;
}
.section-inner.zoomIn{
	gap: 0px 0.8rem;
}

.slider-wrapper{
    z-index: 200;
    position: fixed;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: flex-start;
    align-content: flex-start;
    top: 60%;
    right: 3%;
    -webkit-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -o-transform:rotate(90deg);
    transform:rotate(270deg);
    // border: 1px solid black
}
.slider {
    position: relative;
    // transform: translate(-50%,-50%);
    width: 15vh;
    height: 2.5vw;
    // padding: 1rem;
    // margin: 1rem;
    background: #fcfcfc;
    border-radius: 20px;
    // margin: -0.5rem 0 0.5rem 0;
    right: 0%;
}

.slider-box{
    display: flex;
    flex-flow: row wrap;
    // gap: 0.25rem;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: 0.1rem;
    background: #fcfcfc;
    border-radius: 20px;
    // border: 1px solid black;
    // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.slider-box>p{
    font-family: 'Raleway', sans-serif;
    // background: #7a0707;
    border-radius: 1rem;
	font-size: 1.5rem;
	font-weight: 650;
    color: #575757;
    padding: 0.75rem 0.75rem;
    -webkit-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -o-transform:rotate(90deg);
    transform:rotate(270deg);
}
div#volsettings {
    position: absolute;
    top: 90%;
    padding: 0.35rem 0;
    -webkit-transform:rotate(-90deg);
    -moz-transform:rotate(-90deg);
    -o-transform:rotate(-90deg);
    transform:rotate(-270deg);
    width: 10vh;
    height: 15vh;
    // height: fit-content;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
    align-content: space-between;
    // border: 1px solid red

}
#volsettings p{
	font-family: 'Raleway', sans-serif;
	font-size: 0.725rem;
	font-weight: 500;
    color: #575757;
}
#volsettings p.activeZoom{
    color: rgb(152, 121, 238);
    font-weight: 650;
}


input[type="range"]  {
    // padding: 0.2rem 0.1rem;
    // margin: 1rem;
    width: 15vh;
    height: 0.25rem;
    // background: black;
    border: none;
    outline: none;
} 

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}


//Copied in below
input[type=range] {
  -webkit-appearance: none;
//   margin: 18px 0;
//   width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
//   width: 100%;
  height: 0.5rem;
  cursor: pointer;
//   box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #fafafa;
  border-radius: 30px;
  border: 1px solid #bdbdbd;
}
input[type=range]::-webkit-slider-thumb {
//   box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #c2c2c2;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 30px;
  background: rgb(152, 121, 238);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.45rem;
}

input[type=range]:hover::-webkit-slider-thumb {
    background:  rgb(147, 113, 240);
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background:  rgb(228, 221, 247);
}
input[type=range]:hover::-webkit-slider-runnable-track {
  background:  rgb(230, 222, 250);
}

   
  
  /* .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  } */

//   .item-modal a:hover {background-color: #ddd;}


</style>