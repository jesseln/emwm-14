<template>
    <div class="library-wrapper">
        <!-- <div class="slider-wrapper">
            <div class="slider range">
                <label for="fader"> </label>
                <input type="range" min="0" max="100" v-model="zoomLevel" id="fader" step="50" list="volsettings">
                <datalist id="volsettings">
                    <option>0</option><option>50</option><option>100</option>
                </datalist>
            </div> 
        </div> -->
        <!-- v-if="useY > 300" -->
        <div class="slider-panel">
          <div class="slider-wrapper" >
              <div class="library-catalogue-title-box">
                  <h2 class="library-catalogue-title">Adjust Zoom</h2>
                  <h3 class="library-catalogue-subtitle">Click below to Zoom In and Out of the library</h3>

              </div>
              <div class="shelf-button slider-box">
                  <p @click="zoomOut">-</p>  
                  <input class="slider range" type="range" min="0" max="100" v-model="zoomLevel" id="fader" step="50" list="volsettings" ref="zoomSlider">
                  <p @click="zoomIn">+</p>  
              </div>
              <div id="volsettings" >
                  <p value="0" label="Close-Up" :class="{ activeZoom : zoomLevel === '100'}">- Close-Up</p>
                  <p value="50" label="Standard View" :class="{ activeZoom : zoomLevel === '50'}">- Standard View</p>
                  <p value="100" label="Overview" :class="{ activeZoom : zoomLevel === '0'}">- Overview</p>
              </div>
          </div>
        </div>
    <div class="shelf-SearchPage" v-for="shelf in filterLibrary" :key="shelf">
        <div class="shelf-title-box">
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
                            <LazyAgentItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Agent'" :item="item" :itemBundle="libraryItemBundle.Agent"/>
                            <LazyBookItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="item" :itemBundle="libraryItemBundle.Book"/>
                            <LazyMarkItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Mark'" :item="item" :itemBundle="libraryItemBundle.Mark"/>
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
                        <LazyAgentItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Agent'" :item="item" :itemBundle="libraryItemBundle.Agent"/>
                        <LazyBookItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Book'" :item="item" :itemBundle="libraryItemBundle.Book"/>
                        <LazyMarkItem @viewDetails="showModal" v-if="itemTypeCheck(item) === 'Mark'" :item="item" :itemBundle="libraryItemBundle.Mark"/>
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
    import { storeToRefs } from "pinia";
   
    // STATE MANAGERS IMPORT //    
    //View State
    const viewStore = useViewStore();
    const { libraryData,
            libraryDisplay,
            formattedLibrary, 
            filterLibrary,
            itemHeight,
            itemColour, 
            viewHeightBounds, 
            viewColourSet } = storeToRefs(viewStore)
    const { parseDatabase,
            handleViewSelection,
            getIDP,
            itemTypeCheck } = useViewStore();
        
const yourCollectionStore = useYourCollectionStore();
const { allCollections,
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
        removeFromCollection } = useYourCollectionStore();
        
    //Reference Constants
    const referenceStore = useReferenceStore();
    const { zoomLevel,
            categoryMap, 
            invCategoryMap, 
            scales,
            libraryItemBundle } = storeToRefs(referenceStore)

  const itemModalContent = ref(null)
  const itemModalContentOuter = ref(null)
  const modalBackground = ref(null)
  const _item = ref(null)
         
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
    margin: 0 ;
    grid-row: 2/3;
    padding: 0;
    border-bottom: none;
    width: 7rem;

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
	gap: 0px 0.28rem;
}
.section-inner.zoomMid{
	gap: 0px 0.5rem;
}
.section-inner.zoomIn{
	gap: 0px 0.8rem;
}
.slider-panel{
    float: right;
    margin: 28vh 0;
    position: sticky;
    right: 3%;
    top: 50%;
    z-index: 5;
}
.slider-wrapper{
    position: relative;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: flex-start;
    align-content: flex-start;
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
    width: 6rem;
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

   
.modal-background{
    display: block;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(0.06rem);
    backdrop-filter: blur(0.06rem);
}
.item-modal-content-outer{
    display: grid;
    grid-template-rows: 100vh;
    position: fixed;
    top: 0;
    max-width: 76vw;
    left: 12vw;
    align-items: center;
    justify-content: center;
    align-content: center;
}
  .item-modal-content {
    grid-row: 1 / 2;
    display: flex;
    flex-flow: column wrap;
    visibility: hidden;
    height: fit-content;
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px;
    z-index: 200;
    background: #ffffff;
    padding: 7px;
    border: 0.1rem #eeeeee solid;
    border-radius: 0.3rem;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  
  /* .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  } */

//   .item-modal a:hover {background-color: #ddd;}


</style>