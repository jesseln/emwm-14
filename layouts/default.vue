<template>
    <div class="site-wrapper">
      
    <header class="site-header">
    <NuxtLink to="/">
        <div class="site-header-title-wrapper">
          <h1 class="site-header-title">Early Modern Women's Marginalia</h1>
          <p class="site-header-subtitle">The Library of Libraries</p>
        </div>

    </NuxtLink>
    </header>
<div class="top-images">
    <div v-if="selectedImagePreviews.hasOwnProperty('TopBanner') && selectedImagePreviews['TopBanner'].length > 0" class="top-images-wrapper">
        <div class="top-images-inner">

            <vueper-slides :dragging-distance="70"
            class="no-shadow" 
            slide-image-inside
            :visible-slides="15"
            slide-multiple
            :slide-ratio="1 / 2"
            fixed-height="10vh"
            :gap="1"
            :bullets="false"
            :arrows-outside="false"
            prevent-y-scroll 
            >
                <vueper-slide
                    v-for="imagePreview in selectedImagePreviews['TopBanner']"
                    :key="imagePreview"
                    :image="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${imagePreview.imageFolder}/${imagePreview.item[imagePreview.itemID]}/${imagePreview.name}`"
                    @click="showModal(imagePreview.item)"
                    />
            </vueper-slides>
        </div>
    </div>
    <div v-else>
        <div class="topbanner-loading-wrapper">
            <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>   
        </div>
    </div>
</div>
      <div class="main-navbar">
        <NuxtLink to="/" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >Home</h2>
            </div>   
          </NuxtLink>
          <NuxtLink to="/about" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >About</h2>
            </div>   
          </NuxtLink>
          <NuxtLink to="/explore" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >Explore the Library</h2>
            </div>   
          </NuxtLink>
          <NuxtLink to="/library/searchView" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >Search the Library</h2>
            </div>   
          </NuxtLink>
            <!-- <div class="dropdown" ref="dropdownExploreLibraryRef" @mouseover="showModal('ExploreLibrary')" @mouseleave="hideModal('ExploreLibrary')">
            <h2 class="main-navbar-link dropbtn">Explore the Collection</h2>
                <div class="dropdown-content" ref="dropdownExploreLibraryRefContent" >
                    <DropdownExploreLibrary @modalClicked="hideModalClicked('ExploreLibrary')" />
                </div>
            </div> -->
            <!-- <div class="dropdown" ref="dropdownYourCollectionsRef" @mouseover="showModal('YourCollections')" @mouseleave="hideModal('YourCollections')">
            <h2 class="main-navbar-link dropbtn">Your Library</h2>
                <div class="dropdown-content" ref="dropdownYourCollectionsRefContent" >
                    <DropdownYourCollections @modalClicked="hideModalClicked('YourCollections')" />
                </div>
            </div> -->
            <NuxtLink to="/about" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >Contribute</h2>
            </div>   
          </NuxtLink>
          <!-- <NuxtLink to="/yourcollection/collection01" activeClass="nav-active">
            <div class="dropdown">
                <h2 class="main-navbar-link dropbtn" >View Your Collections</h2>
            </div>   
          </NuxtLink> -->
      </div>
        <!-- <div class="image-modal-background"  ref="imageModalBackground" @click="closeImageModal">
            <div class="image-modal-content-outer" ref="imageModalContentOuter">
                <div class="image-modal-content" ref="imageModalContent">
                    <ImageModal :key="_itemImage" v-if="_itemImage" @close="hideImageModal" :_itemImage="_itemImage" />
                </div>
            </div>
        </div> -->
        <div class="modal-background"  ref="modalBackground">
            <div class="item-modal-content-outer" ref="itemModalContentOuter">
                <div class="item-modal-content" ref="itemModalContent" >
                    <ItemModal :key="_item" v-if="_item" @close="hideModal" :_item="_item" />
                </div>
            </div>
        </div>
      <div class="library-slot">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'



  //libraryStore call is placed in this layout file as this will initially update the store state from the database for all pages.
  const libraryStore = useLibraryStore();

  const { 
        Agent,
        Book,
        Mark,
        complete,
        selectedImageSet,
        selectedImagePreviews
         } = storeToRefs(libraryStore)

libraryStore.getSelectedImageSet('Marks', 'MargID', 30, 'TopBanner')

  watch(() => libraryStore.selectedImageSet['TopBanner'],()=>{
        libraryStore.getImagePreviewsofSize(30, 'TopBanner')
  })

  onMounted(()=>{
    libraryStore.getAgents();
    libraryStore.getBooks();
    libraryStore.getMarks(); 
  })

  const dropdownExploreLibraryRef = ref(null)
  const dropdownExploreLibraryRefContent = ref(null)
  const dropdownYourCollectionsRef = ref(null)  
  const dropdownYourCollectionsRefContent = ref(null)

  useHead({
  title: "The Library of Early Modern Women's Marginalia",
  meta: [
    { name: 'description', content: "The Library of Early Modern Women's Marginalia."}
  ],
//   bodyAttrs: {
//     class: 'test'
//   },
//   script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})

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

  const hideImageModal = ()=>{
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
  
    // .badge{
    //   position: relative;
    //   left: -15px;
    // }
  </style>