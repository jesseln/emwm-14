<template>
    <div class="library-nav-container">

    <div v-if="libraryDisplay.viewType.colour !== 'NotSelected'" class="library-nav-colour-wrapper">
        <!-- <div class="library-catalogue-title-box">
            <h2 class="library-catalogue-title">Colour Code</h2>
            <h3 class="library-catalogue-subtitle"></h3>
        </div> -->
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
            <div  v-for="bandPoint in  [...Array(Math.round(width/30)).keys()].map(d => d/(Math.round(width/30)))" :key="bandPoint">
                <div class="library-nav-colour-item">
                    <div class="library-nav-colour-label-list">
                        <div class="library-nav-colour-category scaleSequential-large" :style="{ background: colourScaleConverter(bandPoint)}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
            <div class="bottom-label">
                <h3 class="library-nav-colour-label" >Min: {{getIDP(viewColourBounds[0], 'colour')}}</h3>
                <div class="bottom-label-inner">
                    <div class="library-nav-title-block-colour">
                        <h3 class="library-nav-view-bottom">Colour Code Selected:</h3>
                    </div>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" :width="43*iconScaleFactor" :height="38*iconScaleFactor" viewBox="0 0 43 38" fill="none">
                        <circle cx="32.7285" cy="28.0532" r="9.35102" fill="#B3DE69"/>
                        <circle cx="21.0395" cy="9.35102" r="9.35102" fill="#BDB9D9"/>
                        <circle cx="9.35102" cy="28.351" r="9.35102" fill="#FB8072"/>
                    </svg> -->
                    <p v-if="libraryDisplay.viewType['colour'] !== 'NotSelected'">
                        {{libraryDisplay.viewType['colour']}} | 
                        {{categoryMap.get(libraryDisplay.viewType['colour'])[libraryDisplay.view['colour']]}}
                    </p>
                    <p v-else="">
                        {{categoryMap.get(libraryDisplay.viewType['colour'])[libraryDisplay.view['colour']]}}
                    </p>
                </div>
                <h3 class="library-nav-colour-label" >Max: {{getIDP(viewColourBounds[1], 'colour')}}</h3>
            </div>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const { width, height } = useWindowSize()

//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        colourSet,
        colourScale,
        colourScaleConverter,
        ordinalColourMap,
        domainIndex,
        viewHeightBounds,
        domainColourIndex,
        viewColourBounds,
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
        colourMapFiltered,
        scales } = storeToRefs(referenceStore)

        //Utility Functions
const { handleObjectProperty,
        contrastHandler } = useUtils();


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
    // margin: 0 clamp(10rem,11vw,15rem);
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    justify-content: center;
    border-top: 2px solid rgb(255, 255, 255);
    // height: 100%;
    max-width: 100vw;
    z-index: 15;
    background-color: #fff;
    pointer-events: all;
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
    color: #000;
    font-family: Raleway,sans-serif;
    font-size: .7rem;
    font-weight: 500;
    line-height: .8rem;
    padding: 0 .2rem;
    text-align: center;
    white-space: nowrap;
    /* width: 100%; */
    flex-shrink: 1;
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
	font-size: 1rem;
	font-weight: 450;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;
}
    .bottom-label {
        grid-row: 2/3;
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        color: black;
        display: flex;
        flex-flow: row wrap;
        /* min-width: 100%; */
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .bottom-label-inner{
        align-items: baseline;
        display: flex;
        flex-flow: row nowrap;
        font-family: Raleway,sans-serif;
        font-size: .9rem;
        font-weight: 750;
        gap: .5rem;
        justify-content: center;
        padding: .5rem;
    }

</style>