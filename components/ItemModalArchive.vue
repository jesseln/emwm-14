<template>
    <div class="item-modal-container">
        <div class="item-modal-header">
            <div class="item-modal-header-LHS">
                    <p>Library Item:</p>
                <div v-if="itemTypeCheck(_item) === 'Agent'"  class="item-modal-header-title"  :style="{ borderRadius: '5rem', background: itemColour(getIDP(_item, 'colour')), color: contrastHandler(itemColour(getIDP(_item, 'colour')))}">
                    <!-- <p>Library Item Selected </p> -->
                    <p>{{ onMountedType }} </p>
                    <h3>{{onMounteditem['Female agent name']}}</h3>
                </div>
                <div v-if="itemTypeCheck(_item) === 'Book'"  class="item-modal-header-title"  :style="{ borderRadius: '0.25rem', background: itemColour(getIDP(_item, 'colour')), color: contrastHandler(itemColour(getIDP(_item, 'colour')))}">
                    <!-- <p>Library Item Selected </p> -->
                    <p>{{ onMountedType }} No. </p>
                    <h3>{{onMounteditem[onMountedID]}}</h3>
                </div>
                <div v-if="itemTypeCheck(_item) === 'Mark'"  class="item-modal-header-title"  :style="{ borderWidth: '0.125rem', margin: '0 0 0 1rem', borderRadius: '0.25rem', background: itemColour(getIDP(_item, 'colour')), color: contrastHandler(itemColour(getIDP(_item, 'colour')))}">
                    <div class="mark-item-top-imageModal mark-item-modal" :style="{ background: itemColour(getIDP(_item, 'colour')), width:scalesStandard.minItemWidth - 2 + 'px'}"></div>
                    <div class="mark-item-top-background-imageModal mark-item-modal" :style="{ width:scalesStandard.minItemWidth -1 + 'px'}"></div> <!-- <p>Library Item Selected </p> -->
                    <p>{{ onMountedType }} No. </p>
                    <h3>{{onMounteditem[onMountedID]}}</h3>
                </div>
            </div>
            <div class="item-modal-add-to-colleciton">
            <div>
                <!-- <h3 >Your Collections</h3> -->
            </div>
            <div class="item-modal-add-to-colleciton-controls">
            <div class="aselect" >
                <div ref="section" class="selector" @click="toggle('section', $event)">
                    <div class="label">
                        <p v-if="Object.keys(allCollections).length > 0">
                            {{ collectionName }}
                        </p>
                        <p v-else >
                            Select a collection
                        </p>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                            <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="grey" stroke-width="1.3" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="categories" :class="{ hidden : !visible.section }">
                        <ul class="scrollable form-style-1" >
                            <li @click="selectCollection(name)" v-for="name in Object.keys(allCollections)" :key="name">
                                <div v-if="!allCollections[name].edit"  class="collection-item">
                                    {{name}}
                                    <div class="icon-buttons-wrapper">
                                        <button  @click="nameEdit(name)"  class="icon-button prevent-close-on-click" >
                                            <Icon name="ic:baseline-edit" size="1rem" class="prevent-close-on-click no-pointers" />
                                        </button>
                                        <button  @click="nameDelete(name)"  class="icon-button prevent-close-on-click" >
                                            <Icon name="ic:baseline-delete" size="1rem" class="prevent-close-on-click no-pointers" />
                                        </button>
                                    </div>
                                </div>
                                <div v-if="allCollections[name].edit" class="prevent-close-on-click" :ref="editFunctionRef(name)" >
                                    <input @keyup.enter="editSubmit(name)" class="prevent-close-on-click item-modal-input" v-model="editMessage" type="text" autofocus/>
                                    <button  @click="editSubmit(name)" class="icon-button prevent-close-on-click">
                                        Accept Changes
                                    </button>
                                </div>
                            </li>
                            <li v-if="!createNewSelected" class="create-collection">
                                <button  @click="createNewButton" class="details-button shelf-button prevent-close-on-click">
                                    Create A New Collection
                                </button>
                            </li>
                            <li v-if="createNewSelected" ref="newNameRef">
                                <input @keyup.enter="formSubmit" class="prevent-close-on-click item-modal-input" v-model="message" type="text" placeholder="collection name" autofocus/>
                                <button  @click="formSubmit" class="icon-button prevent-close-on-click">
                                    Create Collection
                                
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="shelf-button-wrapper item-modal-button">
                    <button class="shelf-button" @click="addItemsToCollection(itemLibrary, _item, onMountedID, onMountedType)"> Add to Collection </button>
            </div>
        </div>
        </div>

        <div class="item-modal-header-RHS">
            <p v-if="imageFound" > Total Images: {{ imageSlides.image.length }}</p>
            
            <button class="shelf-button item-modal-close-button" @click="$emit('close')"> 
                <Icon name="ic:baseline-cancel" size="1.5rem" class="close-button" />
            </button>
        </div>
        </div>
        <div v-if="imageFound" class="item-modal-images">
            <div class="item-modal-image-slider">

                <vueper-slides :dragging-distance="70"
                class="no-shadow" 
                slide-image-inside
                :visible-slides="imageSlides.image.length <= 4? imageSlides.image.length: 4"
                slide-multiple
                :slide-ratio="1 / 4"
                fixed-height="30vh"
                :gap="1"
                :arrows-outside="false"
                prevent-y-scroll 
                lazy 
                lazy-load-on-drag
                >
                    <vueper-slide
                        v-for="itemImage in imageSlides.image"
                        :key="itemImage"
                        :image="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${imageFolder}/${item[itemID]}/${itemImage.name}`"
                        @click="openImageViewer({item: item, itemID: itemID, imageFolder: imageFolder, name: itemImage.name})"
                        />
                </vueper-slides>
            </div>
        </div>
        <div v-else class="no-image-found">
                 <Icon name="ic:outline-add-photo-alternate" size="5rem" class="prevent-close-on-click no-image" color="grey" />
        </div>
        <div class="item-modal-details">
            <div class="item-modal-details-title">
                <p >{{ itemType }} No.</p>
                <h3 >{{ item[itemID] }}</h3>
            </div>
            <div class="item-modal-details-category-wrapper">
                <div v-for="category in itemModalMap.get(itemType)">
                    <div class="item-modal-details-category">
                        <h3>{{handleObjectPath(item, '', invCategoryMap.get(itemType)[category])}}</h3>
                        <p>{{category}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-modal-associated">
            <div class="item-modal-shelf scrollable" v-for="shelf in formattedItemLibrary" :key="shelf">

                <div class="shelf-inner">
            <div class="shelf-title-box item-modal-title-box">
            <h2 class="shelf-title">Item Connections in Library</h2>
            <div class="section-shelf-box">
                    <!-- Shelf Box DO NOT DELETE -->
                    </div>
        </div>
            <template class="section-wrapper" v-for="bookend in shelf[1]" :key="bookend" >
                <div class="section-title-box-wrapper">
                <div class="section-title-box" :style="{ height: scalesStandard.maxShelfHeight-20 + 'px'}">
                    <h3 class="section-category item-modal-category">{{ bookend[1].length }}</h3>
                    <h3 class="section-value">{{ bookend[0] }}s</h3>
                    <div class="section-shelf-box">
                    <!-- Shelf Box DO NOT DELETE -->
                    </div>
                </div>
                <div class="section-inner section-inner-item-modal" v-for="item2Display in bookend[1].slice(0,1)" :key="JSON.stringify(item2Display)" :style="{ height: scalesStandard.maxShelfHeight-20  + 'px'}">
                        <AgentItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Agent'" :item="item2Display" :itemBundle="libraryItemBundle.Agent" :itemModalColour="'#fbd524'" :itemSelected="itemTypeCheck(_item) === 'Agent'? true : false "/>
                        <BookItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Book'" :item="item2Display" :itemBundle="libraryItemBundle.Book" :itemModalColour="'#fbd524'" :itemSelected="itemTypeCheck(_item) === 'Book'? true : false "/>
                        <MarkItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Mark'" :item="item2Display" :itemBundle="libraryItemBundle.Mark" :itemModalColour="'#fbd524'" :itemSelected="itemTypeCheck(_item) === 'Mark'? true : false "/>
                    </div> 
                </div>
                    <div class="section-inner section-inner-item-modal" v-for="item2Display in bookend[1].slice(1, bookend[1].length)" :key="JSON.stringify(item2Display)" :style="{ height: scalesStandard.maxShelfHeight-20  + 'px'}">
                        <AgentItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Agent'" :item="item2Display" :itemBundle="libraryItemBundle.Agent" :itemModalColour="'#fbd524'" :itemSelected="false"/>
                        <BookItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Book'" :item="item2Display" :itemBundle="libraryItemBundle.Book" :itemModalColour="'#fbd524'" :itemSelected="false"/>
                        <MarkItemModal @viewDetails="updateModal" v-if="itemTypeCheck(item2Display) === 'Mark'" :item="item2Display" :itemBundle="libraryItemBundle.Mark" :itemModalColour="'#fbd524'" :itemSelected="false"/>
                    </div>
                </template>
            </div>
            </div>
        </div>
        <div class="image-modal-background"  ref="imageModalBackground" @click="closeImageModal">
            <div class="image-modal-content-outer" ref="imageModalContentOuter">
                <div class="image-modal-content" ref="imageModalContent">
                    <ImageModal :key="_itemImage" v-if="_itemImage" @close="hideModal" :_itemImage="_itemImage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'
const {_item} = defineProps(['_item']);
const {close} = defineEmits(['close']);
const supabase = useSupabaseClient()


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
        itemLibrary,
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

//View State
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
        removeFromCollection,
        getCollectionData,
        addItemsToCollection } = useYourCollectionStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales,
        libraryItemBundle,
        viewMap,
        colourMapFiltered,
        itemModalMap,
        scalesStandard } = storeToRefs(referenceStore)

                // COMPOPSABLES
//Utility Functions
const { handleObjectProperty,
        handleObjectPath,
        contrastHandler } = useUtils();


const onMounteditem = ref(_item) 
const onMountedID = ref(); 
const onMountedName = ref();
const onMountedType = ref();
const item = ref(_item)
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


function updateModal(updateItem){
    item.value = updateItem
    itemType.value = itemTypeCheck(item.value)
    updateItemRefs(item.value)
}

function getItemID(soureItem){
    let itemType = itemTypeCheck(soureItem)
    if(itemType === 'Agent') return 'FemaleAgentID'
    if(itemType === 'Book') return 'BookID'
    if(itemType === 'Mark') return 'MargID'
}


onMountedID.value = getItemID(_item)
onMountedType.value = itemTypeCheck(_item)

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
    itemType.value = itemTypeCheck(item.value)
    updateItemRefs(item.value)
    getItemLibrary(item.value)
    watch(item,()=>{
        if(itemType.value !== 'Agent') {
            // console.log('itemTYpe ',itemType.value)
            getImages(item.value)
        }
    }, { immediate: true })
})


const value = computed (()=> {
        return { 
            section: `${viewStore.libraryDisplay.viewType['shelf']}:${[viewStore.libraryDisplay.view['shelf']]}`,
    }
    })

    const visible = reactive({
        section: false,
    })

    const section = ref(false)

   const toggle = (option, e)=> {
    console.log(e==='input')
        if(!e.target.matches('.prevent-close-on-click')) {
            visible[option] = !visible[option]
        }
    }
    
    //Create New Option
const createNewSelected = ref(false)
const editSelected = ref(false)
const message = ref()
const editMessage = ref()
const editRef = ref()
const editName = ref()
// const collectionNames = reactive({})

const editFunctionRef = (name) => {
  editName.value = name
}

const newNameRef = ref()

function createNewButton(){
    createNewSelected.value = true
    if(Object.keys(allCollections.value).length > 0){
        console.log('create New Check', Object.keys(allCollections.value).length)
        console.log(' New keys check', Object.keys(allCollections.value))
        console.log('allCollections Check', allCollections.value)
        Object.keys(allCollections.value).forEach((name)=> allCollections.value[name].edit = false)
    }
    console.log('create New Check 11', Object.keys(allCollections.value).length)
        console.log(' New keys check 11', Object.keys(allCollections.value))
        console.log('allCollections.value Check 11', allCollections.value)
}

function selectCollection(name){
    collectionName.value = name
}

function nameEdit(name){
    createNewSelected.value = false
    message.value = ''
    Object.keys(allCollections.value).forEach((resetName)=> allCollections.value[resetName].edit = false)
    allCollections.value[name].edit = true
    editMessage.value = name
}

function nameDelete(name){
    delete allCollections.value[name]
}

function editSubmit(name){
    if(editMessage.value.length > 0){
        if(!(Object.keys(allCollections.value).includes(editMessage.value))){ 
            const storeCollection = allCollections.value[name]
            delete allCollections.value[name]
            allCollections.value[editMessage.value] = storeCollection
            editMessage.value = ''
        }else if(editMessage.value === name){
            allCollections.value[name].edit = false
            editMessage.value = ''        
        }else{
            alert("That name already exists in your collection list")
        }
    }else{
        editMessage.value = ''
    }
}

function formSubmit(){
    if(message.value.length > 0){
        if(!(Object.keys(allCollections.value).includes(message.value))){ 
            collectionName.value = message.value
            allCollections.value[collectionName.value] = getCollectionData()
            // console.log(allCollections.value)

            // visible['section'] = !visible['section']
            createNewSelected.value = false
            message.value = ''
        }else{
            alert("That name already exists in your collection list")
        }

    }else{
        visible['section'] = !visible['section']
        createNewSelected.value = false
        message.value = ''
    }
}

const open = (option)=> {
    visible[option] = true
}

onClickOutside(section, (event) => {
    console.log('onoutside',editName.value )
    if(allCollections.value[editName.value]){
        allCollections.value[editName.value].edit = false
    }
    createNewSelected.value = false
    message.value = ''
    visible.section? visible.section = !visible.section : null
})

const imageModalContent = ref(null)
  const imageModalContentOuter = ref(null)
  const imageModalBackground = ref(null)
  const _itemImage = ref();
         
  function openImageViewer(itemImage){
    //Component Prop
    _itemImage.value = itemImage;
    //Styles
    imageModalContent.value.style.transitionDelay = '.15s'
    imageModalContent.value.style.visibility = 'visible'
    imageModalBackground.value.style.transitionDelay = '.075s'
    imageModalBackground.value.style.visibility = 'visible'
    imageModalContentOuter.value.style.transitionDelay = '.075s'
    imageModalContentOuter.value.style.visibility = 'visible'
  }

  const hideModal = ()=>{
    imageModalContent.value.style.transitionDelay = '.3s'
    imageModalContent.value.style.visibility = 'hidden'
    imageModalBackground.value.style.transitionDelay = '.15s'
    imageModalBackground.value.style.visibility = 'hidden'
    imageModalContentOuter.value.style.transitionDelay = '.15s'
    imageModalContentOuter.value.style.visibility = 'hidden'
  }

  const closeImageModal = (event) => {
    console.log('clicked', event.target)
    if(imageModalContent.value.style.visibility === 'visible' && (event.target.matches('.image-modal-background')) || event.target.matches('.image-modal-content-outer')){
        imageModalContent.value.style.transitionDelay = '.3s'
        imageModalContent.value.style.visibility = 'hidden'
        imageModalBackground.value.style.transitionDelay = '.15s'
        imageModalBackground.value.style.visibility = 'hidden'
        imageModalContentOuter.value.style.transitionDelay = '.15s'
        imageModalContentOuter.value.style.visibility = 'hidden'
    }  
  }

</script>

<style lang="scss" scoped>
.mark-item-top-imageModal{
	top: 18px;
	left: 143px;
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
	top: 16px;
	left: 143px;
	height: 19px;
	width: 100%;
	position: absolute;
	clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    display: inline-block;
	background: white;
	border-radius: 2.5px;
}

.image-modal-background{
    display: block;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.55);
    -webkit-backdrop-filter: blur(0.2rem);
    backdrop-filter: blur(0.2rem);
}
.image-modal-content-outer{
    display: grid;
    grid-template-rows: 100vh;
    position: fixed;
    top: 0vh;
    min-width: 90vw;
    min-height: 90vh;
    left: 3vw;
    align-items: center;
    justify-content: center;
    align-content: center;
}
  .image-modal-content {
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
    height: clamp(2rem, 4vh, 4rem);
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

}
.item-modal-header .item-modal-header-title h3{
	font-family: 'Raleway', sans-serif;
	font-size: 0.95rem;
	font-weight: 550;
    line-height: 1.25rem;

}
.item-modal-header .item-modal-header-title p{
    margin: 0 0.75rem 0 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.8rem;
	font-weight: 450;
    letter-spacing: 0rem;
    line-height: 0.8rem;

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
// .item-modal-container{
//     position: relative;
//     padding: 10px 0;
//     display: grid;
//     width: 100%;
// 	grid-template-rows: 6vh 32vh 22vh 22vh;

//     justify-content: space-between;
//     align-content: flex-end;
//     align-items: flex-start;
//     color: black;
// }
.item-modal-container{
    position: relative;
    padding: 0.5rem 1rem;
    display: flex;
    flex-flow: column nowrap;
	// grid-template-rows: 6vh 32vh 22vh 22vh;
    justify-content: space-between;
    align-content: flex-end;
    align-items: flex-start;
    color: black;
    // text-align: left;
}



.item-modal-images{
    width: 100%;
    display: block;
    position: relative;
    // grid-row: 2 / 3;
    // left: 3rem;
    max-width: 75vw;
    max-height: 32vh;
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