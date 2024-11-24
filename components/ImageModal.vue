<template>
    <div class="imageitem-modal-container">
        <div class="imageitem-modal-wrapper">
        <div class="item-modal-header">
            <div class="item-modal-header-LHS">
                    <p>Item:</p>
                <div v-if="itemTypeCheck(_itemImage.item) === 'Agent'"  class="item-modal-header-title"  >
                    <!-- <p>Library Item Selected </p> -->
                    <p>Agent</p>
                    <h3>{{_itemImage.item['Female agent name']}}</h3>
                </div>
                <div v-if="itemTypeCheck(_itemImage.item) === 'Book'"  class="item-modal-header-title"  >
                    <!-- <p>Library Item Selected </p> -->
                    <p>Book No. </p>
                    <h3>{{_itemImage.item[_itemImage.itemID]}}</h3>
                </div>
                <div v-if="itemTypeCheck(_itemImage.item) === 'Mark'"  class="item-modal-header-title"  >
                   
                    <p>Mark No. </p>
                    <h3>{{_itemImage.item[_itemImage.itemID]}}</h3>
                </div>
            </div>


            <div class="item-modal-header-RHS">
                <p> Image No. {{ _itemImage.imageIndex + 1 }} of {{ _itemImage.imageTotal }}</p>
               
                <button class="shelf-button item-modal-close-button" @click="$emit('close')"> 
                    <Icon name="ic:baseline-cancel" size="1.5rem" class="close-button" />
                </button>
            </div>
        </div>
        <div class="image-modal-container">
            <div class="image-modal scrollable">
                <div class="image-modal-inner" ref="imageTest">
                        <div ref="imageHover"> 

                                    
                                    <div class="magnifying-glass" ref="container">
                            <NuxtImg 
                                    :height="maxImageHeight"
                                    :src="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${_itemImage.imageFolder}/${_itemImage.item[_itemImage.itemID]}/${_itemImage.name}`"
                                    loading="lazy"
                                    class="magnifying-glass__img"

                                    />
                        </div>
                        <div class="magnifying-glass__magnifier" ref="magnifier">
                            <div class="magnifying-glass__enlarged-image" ref="enlargedImage">
                                <NuxtImg 
                                    :height="maxImageHeight*2"
                                    :src="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${_itemImage.imageFolder}/${_itemImage.item[_itemImage.itemID]}/${_itemImage.name}`"
                                    loading="lazy"
                                    class="magnifying-glass__img"
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="image-sidebar">  
                <button @click="toggleExpand" class="catalogue-filter-category-box item-modal-close-button" :class="{ filterActive : expandOption }"> 
                    <Icon name="ic:baseline-open-in-full" size="1.5rem" />
                </button>
                <p>Expand</p>
                <button @click="toggleZoom" class="catalogue-filter-category-box item-modal-close-button" :class="{ filterActive : zoomOption}" > 
                    <Icon name="ic:baseline-zoom-in" size="1.5rem" />
                </button>
                <p>Zoom</p>
            </div>
        </div>

        
    </div>
    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'
const {_itemImage} = defineProps(['_itemImage']);
const {close} = defineEmits(['close']);
const supabase = useSupabaseClient()

// const _itemImage = ref(newItemImage)


//Old Colour Scheme for non selected items
//Agent #CDBAE9
//Book #ADE2B6
//Mark #FBE27D


// STATE MANAGERS IMPORT //    
//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        formattedItemLibrary,
        filterLibrary,
        itemHeight,
        itemColour, 
        viewHeightBounds, 
        viewColourSet } = storeToRefs(viewStore)
const { parseDatabase,
        handleViewSelection,
        getIDP,
        itemTypeCheck,
        getItemLibrary } = useViewStore();


//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales,
        libraryItemBundle,
        viewMap,
        colourMapFiltered,
        itemModalMap,
        windowHeight,
        windowWidth,
        scalesStandard,
    } = storeToRefs(referenceStore)

                // COMPOPSABLES
//Utility Functions
const { handleObjectProperty,
        handleObjectPath,
        contrastHandler } = useUtils();

const onMounteditem = ref(_itemImage.item) 
const onMountedID = ref(); 
const onMountedName = ref();
const onMountedType = ref();
const imageFound = ref(false);
const imageSlides = ref(
    { 
        image: [],
        title: "my title",
        content: "my content",
    }
)


const value = computed (()=> {
        return { 
            section: `${viewStore.libraryDisplay.viewType['shelf']}:${[viewStore.libraryDisplay.view['shelf']]}`,
    }
    })

    const visible = reactive({
        section: false,
    })

    const section = ref(false)


const imageHover = ref()
const imageTest = ref()
const isHovered = useElementHover(imageHover)
const imageContainer = useParentElement(imageTest)
const { width, height } = useElementSize(imageTest)
const extractor = (event) => event instanceof Touch ? null : [event.offsetX, event.offsetY]
const { x, y, sourceType } = useMouse({ target: imageContainer, type: extractor })

const maxImageHeight = computed(()=>{
    // console.log(windowHeight.value)
    return windowHeight.value - 150
})

const expandOption = ref(false);
const zoomOption = ref(false);

console.log('_itemImage', _itemImage)

const toggleExpand = ()=>{
    expandOption.value = !expandOption.value
    console.log('expand')
}
const toggleZoom = ()=>{
    zoomOption.value = !zoomOption.value
}

const deviceHasPointer = window.matchMedia('(pointer: fine)').matches;
const container = ref();
const magnifier = ref();
const enlargedImage =ref();
const speed = 0.2;

const glass = reactive({ x: 0, y: 0 });
const enlargedImagePos = reactive({ x: 0, y: 0 });


function moveGlass () {
  // Calculate smooth mouse movement
  glass.x = lerp(glass.x, x.value, speed);
  glass.y = lerp(glass.y, y.value, speed);
  // Calculate enlarged image position
  // Calculate enlarged image position
  enlargedImagePos.x = (glass.x)  / width.value * -100 + 0.003 * width.value;
  enlargedImagePos.y = (glass.y) / height.value * -100 + 0.0045 * height.value;
//   console.log('galss', glass.x, x.value, enlargedImagePos.x, width.value)
  
  
  // Set style positions
  magnifier.value.style.transform = `translate(calc(${glass.x}px - 50%), calc(${glass.y}px  - 50%))`;
  enlargedImage.value.style.transform = `translate(${enlargedImagePos.x}%, ${enlargedImagePos.y}%)`;


        // enlargedImage.value.style.transformOrigin = `${x.value/width.value*100}% ${y.value/height.value*100}%`
        // magnifier.value.style.transformOrigin = `${x.value/width.value*100}% ${y.value/height.value*100}%`
}


function showGlass () {
  magnifier.value.style.opacity = '1';
  moveGlass();
}

function hideGlass () {
  magnifier.value.style.opacity = '0';
}

function lerp (a, b, n) {
  return (1 - n) * a + n * b;
}

watch(width, ()=>{
    imageContainer.value.style.width = `${width.value}px`
})

onMounted(()=>{
    watch([isHovered,x,y,expandOption,zoomOption],()=>{

        if(expandOption.value){
            imageTest.value.style.transform = 'scale(1.75)'
            imageContainer.value.style.width = `${width.value * 1.75}px`
        } 
            
        
        if(!expandOption.value) {
            imageTest.value.style.transform = 'scale(1)'
            imageContainer.value.style.width = `${width.value}px`
        }
            

    if(isHovered.value){
        // if(zoomOption.value) imageHover.value.style.transformOrigin = `${x.value/width.value*100}% ${y.value/height.value*100}%`
        if(zoomOption.value) showGlass()
        // console.log(`${x.value/width.value*100}% ${y.value/height.value*100}%`)
    }

    if(!isHovered.value){
        // if(!zoomHover.value) imageHover.value.style.transformOrigin = `${width.value/2/width.value*100}% ${height.value/2/height.value*100}%`
        hideGlass()
    }

}, {immediate: true})
})




</script>

<style lang="scss" scoped>

.mark-item-top-imageModal{
	top: 10px;
	left: 135px;
	height: 17px;
	width: 100%;
	position: absolute;
	clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    display: inline-block;
	border-radius: 2.5px;

	/* box-shadow: rgba(99, 99, 99, 0.4) 0px 3px 8px 0px; */
}

.mark-item-top-background-imageModal{
	z-index: -2;
	top: 8px;
	left: 135px;
	height: 19px;
	width: 100%;
	position: absolute;
	clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    display: inline-block;
	background: white;
	border-radius: 2.5px;
}
.image-sidebar{
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    align-content: flex-end;
    padding: 0 0 0 0.5rem;
}
.image-sidebar p{
    margin: 1rem 0 2rem;
    font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 650;
	color: rgb(30, 30, 30);
}
.magnifying-glass {
  display: flex;
//   width: 50vw;
  background: black;
}

.magnifying-glass__img {
//   width: 100%;
}

.magnifying-glass__magnifier {
  position: fixed;
  top: 0; left: 0;
  z-index: 1;
  overflow: hidden;
  width: 15vw;
  max-width: 10rem;
  height: 15vw;
  max-height: 10rem;
  border: 5px solid rgba(white, 0.25);
  border-radius: 50%;
  background-color: transparent;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.magnifying-glass__enlarged-image {
  position: absolute;
  top: 0;
  left: 0;
//   width: 100vw;
}
.section-inner-item-modal{
    // margin: 1vh 0; 
}
.item-modal-close-button{
    position: relative;
    padding: 0.1rem;
    border-radius: 10rem;
}
.close-button{
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    top: unset;
    right: unset;
}
.close-button:hover{
    color: rgb(126, 126, 126);
}
.mark-item-modal{
    transform: rotate(-90deg) translate(-7px, 0);
    transform-origin: bottom left;
}
.no-image-found{
    width: 100%;
    background: #ececec;
    min-height: 32vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.no-image{

    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px;
    background: #ffffff;
    border-radius: 0.5rem;
}
.item-modal-details-title{
    display: flex;
    flex-flow: column wrap;
    border-right: 1px solid #ccc;
    min-width: 6rem;
    padding: 0 0.5rem 0 0;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
}
.item-modal-details-title p{

	font-family: 'Raleway', sans-serif;
	font-size: 1rem;
	font-weight: 550;
	color: rgb(30, 30, 30);
	width: 100%;

}
.item-modal-details-title h3{

	font-family: 'Raleway', sans-serif;
	font-size: 1.8rem;
	font-weight: 550;
	color: rgb(30, 30, 30);
	width: 100%;

}
.item-modal-details-category-wrapper{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}
.item-modal-details-category{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 0 1.5rem 2vh;
}
.item-modal-details-category h3{
	font-family: 'Raleway', sans-serif;
	font-size: 0.9rem;
	font-weight: 550;
	color: rgb(30, 30, 30);
	width: 100%;
	text-align: center;
    max-width: 16rem;
    text-overflow: ellipsis;
    overflow:hidden;
    display: -webkit-box;
    max-height: 100px;
    max-width: 200px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}


.item-modal-details-category p{
	margin: 0.2rem 0 0rem;
	font-family: 'Raleway', sans-serif;
	font-size: 0.6rem;
	font-weight: 450;
	color: rgb(97,97,97);
	width: 100%;
	text-align: center;
}
.no-pointers{
    pointer-events: none;
}

.item-modal-header{
    // background: #e2e2e2;
    // grid-row: 1/2;
    margin: 0 0 0.5rem;
    padding: 0 0.5rem;
    height: clamp(2rem, 4vh, 4rem);
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
}
.item-modal-header .item-modal-header-title h3{
	font-family: 'Raleway', sans-serif;
	font-size: 1.15rem;
	font-weight: 550;
    line-height: 1.25rem;
}
.item-modal-header .item-modal-header-title p{
	font-family: 'Raleway', sans-serif;
	font-size: 0.95rem;
	font-weight: 550;
    line-height: 1.25rem;
}
.item-modal-header-title{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    border: 0.125rem solid #ffffff;
    border-radius: 0.5rem;
    padding: 0.25rem 1.25rem;
    // filter: drop-shadow(-0px 1px 5px rgba(99, 99, 99, 0.3));
}
.item-modal-header p{
    margin: 0 1rem 0 0;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05rem;
    line-height: 1.1rem;
}
.item-modal-header-RHS{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
}
.item-modal-header-LHS{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
}

.item-modal-title-box{
    margin: 2px 0 2px 0;
    max-width: 9rem;   
    position: relative;
}
.item-modal-category{
	font-family: 'Raleway', sans-serif;
	font-size: 1.35rem;
	font-weight: 350;
	color: black;
	min-width: 5rem;
}
.prevent-close-on-click{

}
.form-style-1 input[type=text]{
    border-radius: .5rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	border:1px solid #BEBEBE;
	padding: 7px;
	margin:0px;
	-webkit-transition: all 0.30s ease-in-out;
	-moz-transition: all 0.30s ease-in-out;
	-ms-transition: all 0.30s ease-in-out;
	-o-transition: all 0.30s ease-in-out;
	outline: none;	
}
.form-style-1 input[type=text]:focus{
	-moz-box-shadow: 0 0 8px #ad88e9;
	-webkit-box-shadow: 0 0 8px #ad88e9;
	box-shadow: 0 0 8px #ad88e9;
	border: 1px solid #ad88e9;
}
.item-modal-shelf{
    margin: 0.25rem 0.5rem;
    padding: 0 1.5rem;
    max-height: 17vh;
}

.imageitem-modal-container{
    position: relative;
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
	// grid-template-rows: 6vh 32vh 22vh 22vh;
    justify-content: center;
    align-items: center;
    color: black;
    // text-align: left;
    // flex-grow: 1000;
}
.imageitem-modal-wrapper{
    position: relative;
    // padding: 0.5rem 1rem;
    display: flex;
    flex-flow: column nowrap;
	// grid-template-rows: 6vh 32vh 22vh 22vh;
    justify-content: space-between;
    align-content: flex-end;
    align-items: flex-start;
    color: black;
    // text-align: left;
    flex-grow: 1000;
}

.image-modal-container{
    width: 100%;
    max-width: 90vw;
    max-height: 90vh;
    min-height: 10rem;
    // overflow-y: hidden;
    // overflow-x: hidden;
    // min-width: 90vw;
    position: relative;
    // padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
	// grid-template-rows: 6vh 32vh 22vh 22vh;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    color: black;
}
.image-modal{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    // overflow-y: hidden;
    overflow-x: hidden;
    // max-width: fit-content;
    // width: 40vw;
  
    transition: width .5s ease;
    border: 5px solid #f0f0f0;
    border-radius: 0.5rem;
}
.image-modal:hover{
    // width: 90vw;
    transition: width .5s ease-out;
}

.image-modal-inner{
    transform-origin: top center;
    transition: transform .5s ease;
    position: relative;
    width: fit-content;
    max-width: 90vw;
    max-height: 90vh;

}
.image-modal-inner:hover{
    transition: transform .5s ease-out;
}


.item-modal-image-slider{
    height: fit-content;

}
.item-modal-details{
    width: 100%;
    // grid-row: 3 / 4;
    margin: 1vh 1rem 0.5vh;
    display: flex;
    flex-flow: row nowrap;
    height: clamp(7rem, 20vh, 12rem);
}
.item-modal-associated{
    // grid-row: 4 / 5;
    width: 100%;
    min-width: 75vw;
    align-self: end;
    overflow: hidden;
    padding: 0 0 1rem;
    max-height: 18vh;
    min-height: 10rem;
    bottom:0;
}
.item-modal-add-to-colleciton{
    grid-row: 5/6;
    // min-width: 75vw;
    // align-self: end;
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    align-content: center;
    align-items: center;
    justify-content: center;
}
.item-modal-add-to-colleciton-controls{
    grid-row: 5/6;
    // min-width: 75vw;
    // align-self: end;
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
}

.item-modal-add-to-colleciton h3{
	margin: 0 1.25rem;
	color: black;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05rem;
    line-height: 1.1rem;
    color: black;
    
}

input.item-modal-input{
    min-width: 16rem;
}

li.create-collection{
    display:flex;
    flex-direction: row;
    justify-content: center;
}

li.create-collection button{
    width: 100%;
}

.aselect {
    // display: flex;
    //     flex-direction: row;
    //     flex-wrap: nowrap;
    margin: 0 0.8rem 0 0;
    padding: 0;
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
        border-radius: 2rem;


        cursor: pointer;

    }

    
    .arrow {
            position: absolute;
            right: 10px;
            top: 0;
            // width: 0;
            // height: 0;
            // border-left: 5px solid transparent;
            // border-right: 5px solid transparent;
            // border-bottom: 8px solid #adadad;
            // transform: rotate(90deg);
            // transition-duration: 0.3s;
            // transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
        }

        .expanded {
            transform: rotateZ(0deg) translateY(2px);
        }

    .selector:hover {
        background:#f5f5f5;
    }

    ul {
        border-radius: 0.8rem;
        width: calc(100% + 2px);
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-family: 'Raleway', sans-serif;
        font-size: 0.775rem;
        font-weight: 550;
        letter-spacing: 0.05rem;
        line-height: 1.1rem;
        color: black;
        border: 1px solid gainsboro;
        position: absolute;
        left: -1px;
        top: -5px;
        z-index: 11;
        background: #fff;
        // display: block;
        max-height: 50vh;
        // overflow: auto;
    }

    .collection-item{
        display: flex;
        flex-flow: row wrap;
        padding: 0.3rem 0.1rem 0.3rem 1.1rem;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    li {
        z-index: 11;
        padding: 0.3rem 0.3rem;
        color: #292929;
        border-bottom: 1px solid rgb(241, 241, 241);
        cursor: pointer;
        &:hover {
            // color: white;
            background:#f5f5f5;
            // colour was #f7e8f777;
        }
    }
    .current {
        font-size: 0.725rem;
        font-weight: 500;
        color:  black;
        background: #f5f5f5;
    }
    .hidden {
        visibility: hidden;
    }
    .visible {
        z-index: 11;
        visibility: visible;
    }

    .label, .label p {
        z-index: 5;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;
        min-width: 24rem;
        white-space: nowrap;
        width: 100%;
        padding: 0.2rem 1.25rem 0.15rem 1rem;
        // margin: 0.5rem 0 0 0;
        font-family: 'Raleway', sans-serif;
        font-size: 0.725rem;
        font-weight: 500;
        letter-spacing: 0.05rem;
        line-height: 1.25rem;
        color: black;
        // color: #888;
			}

</style>