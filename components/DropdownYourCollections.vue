<template>
    <div class="library-menu-wrapper">
        <!-- <h2 class="menu-title">View Your Collections</h2> -->
        <!-- <h2 class="menu-subtitle">Or select a question to explore the libraries with a preset view...</h2> -->
        <div class="menu-page" >
            <div class="index-list-container">
                <div class="index-list-wrapper">
                    <pre>
                        Your 
                        Collections
                    </pre>   
                    <div class="index-list">
                        <ul v-if="Object.keys(allCollections).length > 0" class="library-query">
                            <NuxtLink v-for="collectionName in Object.keys(allCollections)" :to="`/yourcollections/${collectionName}`" @click="$emit('modalClicked')" >    
                                <li>{{collectionName}}</li>     
                            </NuxtLink>            
                        </ul>
                        <ul v-else class="library-query">
                            <li @click="$emit('modalClicked')">Create a collection by selecting <span>'View Details'</span> on an item in the libraries and adding it to a new collection.</li>              
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";

    // STATE MANAGERS IMPORT //    
    const yourCollectionStore = useYourCollectionStore();
const { allCollections,
        collectionName,
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
    const { categoryMap, 
            invCategoryMap, 
            scales,
            yourCollectionItemBundle } = storeToRefs(referenceStore)

//Function format written to use local vairables and return to reactive value
function iconDimensions(){
    const scaleWidth = 1;
    const scaleHeight = 1;
    const fill = '#222';
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

const icons = ref()

watchEffect(()=>{
    icons.value = iconDimensions()
})

</script>

<style lang="scss" scoped>

:root{
    /* COLOURS */
    --footerColour: rgba(30,30,30,1);
    --brandColour: #ed0741FF;
    --black: #1A1A1AFF;
    --lightGrey: #F5F5F5FF;
    --white: #FFFFFFFF;
    --borderGrey: #B3B3B3FF;
    --textGrey: #B9B9B9FF;
    --textBodyBlack: #B9B9B9FF;
    --textMidGrey: #4D4D4DFF;
    --textBlack: #1A1A1AFF;
    --textBodyBlack: #333333FF;

    /* FIXED WIDTHS AND BORDERS */
    --mediaWidth: 600px;
    --sideMargins: clamp(2rem, 6vw, 5rem);
    --borderWidth: 3px;
    --borderWidth-S: 1.75px;
    
  }


.library-menu-wrapper{
    background-color: white;
    margin: 0 10rem 5rem;

}

.menu-title{
    padding: 0;
    margin: 3rem 0 0 0;
	color: rgb(56, 56, 56);
	font-family: 'Source Serif 4', serif;
	font-size: 1.0rem;
	font-weight:350;
	letter-spacing: 0.2rem;
    color: grey;

}
.menu-subtitle{
    padding: 0;
    margin: 3rem 0 1.25rem 0;
	color: rgb(56, 56, 56);
	font-family: 'Source Serif 4', serif;
	font-size: 1.0rem;
	font-weight:350;
	letter-spacing: 0.2rem;
    color: grey;

}
.menu-page{
    margin: 1rem 0 1rem;
    grid-area: index;
    z-index: 1;
    display: flex;
    flex-flow: row wrap;
    }


.index-list-main-container{
    display: flex;
    flex-flow: row wrap;
    flex-grow: 1;

}
.index-list-main{
    padding: 1rem 0 1rem 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 24vw;
}
.nuxtlink{
    width: 24vw;
}

.index-list-container{
    display: flex;
    flex-flow: row wrap;
    flex-grow: 1;
}
.index-list-wrapper{
    display: flex;
    flex-flow: column wrap;
    padding: 1rem 0 1rem 2rem;
    width: 24vw;
    // flex-grow: 1;
}
  .index-list{
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
  }

.icon-container{
    padding: 0.5rem 1rem 0.5rem 0;
    border-right: 1px solid #1A1A1AFF;
}
  .index-list-container pre{
    padding: 0 0 0.5rem 1rem;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.15rem;
	font-weight: 400;
	letter-spacing: 0.425rem;;
    // word-wrap: break-word;
    white-space: pre-line;
    // max-width: 10vw;;
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
  
  .index-list ul{
    margin: 0.5rem 0 0 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.8rem;
	font-weight: 500;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;

    // width: 80%;
  }

  .index-list ul li{
    padding: 0.5rem 2rem 0.5rem 1rem;
    margin: 0.25rem 0;
    text-decoration: none;
    color: black;  
}

  .library-query li:hover {background-color: rgb(241, 241, 241);}
  .library-query li:focus {background-color: #fdfdfd;}
  
 .nuxtlink:hover {background-color: rgb(241, 241, 241);}
.nuxtlink:focus {background-color: #fdfdfd;}
</style>