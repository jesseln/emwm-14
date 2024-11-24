<template>
<div class="sidebar scrollable">
    <div class="sidebar-title-box">
        <h1 class="query-type-sideBar"> Library {{libraryDisplay.pageText.queryType}}  </h1>
        <h3>Total: {{ filterTotalCount }}</h3>
    </div>
    <!-- <div class="shelf-separator-container"><div class="shelf-separator"></div></div> -->
<div class="sidebar-content">

    <div class="library-catalogue-title-box">
        <h2 class="library-catalogue-title">Search & Filter</h2>
        <h3 class="library-catalogue-subtitle">Search and Filter the library by clicking on the sections below</h3>

    </div>
    <!-- <div class="filter-instruction-block">
        <h3 class="filter-instruction-text">Choose a category to filter for specific items:</h3>
    </div> -->
    <div class="library-catalogue">
        <div 
        class="catalogue-title-box"  
        :class="{ filterActive : getActiveFilters.some((filter) => filter.itemType === 'Agent')}"
        @click="toggle('Agent')">
            <h4 class="catalogue-title">
                Agents</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Agent, visible : visible.Agent}">  

            <div class="catalogue" v-for="category in Object.keys(filterMap.get('Agent'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }" 
                theme = "filter-dropdown"
                >
                <div class="chevron-box">
                    <p
                    :class="{ filterActive : getActiveFilters.some((filter) => filter.category === category)}"
                    >
                        {{ categoryMap.get('Agent')[category] }}
                    </p>
                    <Icon name="ic:baseline-chevron-right" size="0.9rem" class="chevron-icon" />
                </div>
                    <template #popper >
                        <div class="catalogue-filter-category-title-box">
                            <h3>Catalogue Values</h3>
                            <h2>Agent | {{ categoryMap.get('Agent')[category] }}</h2>
                            <p>Select or Search for a value</p>
                            <p>to filter the library</p>
                        </div>
                        <div class="catalogue-filter-category-container scrollable form-style-1">
                            <div class="search-box"  >
                                <Icon name="ic:baseline-search" size="1.5rem" class="search-icon" />
                                    <input class="prevent-close-on-click item-modal-input" v-model="searchEntry" type="text" placeholder="search" autofocus ref="agentInput"/>
                            </div>
                            <div class="unique-entries" >
                                <h4 >Unique entries: {{ Object.keys(searchList(filterObject.get('Agent')[category], searchEntry)).length }}</h4>
                            </div> 
                            <button 
                            v-for="filterValue in searchList(filterObject.get('Agent')[category], searchEntry)"
                            @click="viewStore.filterActiveToggle(filterValue, category, 'Agent')" 
                            class="catalogue-filter-category-box"
                            :class="{ filterActive : filterObject.get('Agent')[category][filterValue.name].active }">
                                <p class="catalogue-filter-category-list-value" >{{ filterValue.name }}</p> 
                                
                            </button>
                        </div>
                    </template>
                </VDropdown>
            </div>
        </div>
        <div 
        class="catalogue-title-box" 
        :class="{ filterActive : getActiveFilters.some((filter) => filter.itemType === 'Book')}"
        @click="toggle('Book')">
            <h4 class="catalogue-title">Books</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Book }">    
            <div class="catalogue" v-for="category in Object.keys(filterMap.get('Book'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }" 
                theme = "filter-dropdown"
                >
                <div class="chevron-box">
                    <p
                    :class="{ filterActive : getActiveFilters.some((filter) => filter.category === category)}"
                    >
                        {{ categoryMap.get('Book')[category] }}
                    </p>
                    <Icon name="ic:baseline-chevron-right" size="0.9rem" class="chevron-icon" />
                </div>
                    <template #popper >
                        <div class="catalogue-filter-category-title-box">
                            <h3>Catalogue Values</h3>
                            <h2>Book | {{ categoryMap.get('Book')[category] }}</h2>
                            <p>Select or Search for a value</p>
                            <p>to filter the library</p>
                        </div>
                        <div class="catalogue-filter-category-container scrollable form-style-1">
                            <div class="search-box"  >
                                <Icon name="ic:baseline-search" size="1.5rem" class="search-icon" />
                                    <input class="prevent-close-on-click item-modal-input" v-model="searchEntry" type="text" placeholder="search" autofocus ref="bookInput"/>
                                </div>
                            <div class="unique-entries" >
                                <h4 >Unique entries: {{ Object.keys(searchList(filterObject.get('Book')[category], searchEntry)).length }}</h4>
                            </div> 
                            <button 
                            v-for="filterValue in searchList(filterObject.get('Book')[category], searchEntry)"
                            @click="viewStore.filterActiveToggle(filterValue, category, 'Book')" 
                            class="catalogue-filter-category-box"
                            :class="{ filterActive : filterObject.get('Book')[category][filterValue.name].active }">
                                <p class="catalogue-filter-category-list-value" >{{ filterValue.name }}</p>
                            </button>
                        </div>
                    </template>
                </VDropdown>
            </div>
        </div>
        <div 
        class="catalogue-title-box" 
        :class="{ filterActive : getActiveFilters.some((filter) => filter.itemType === 'Mark')}"
        @click="toggle('Mark')">
            <h4 class="catalogue-title">Marks</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none" class="svg">
                <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="catalogue-container" :class="{ hidden : !visible.Mark }">    
            <div class="catalogue" v-for="category in Object.keys(filterMap.get('Mark'))">
                <VDropdown
                placement="right" 
                :triggers="['click']"
                :popperTriggers="['']"
                :delay="{ show: 0, hide: 0 }" 
                theme = "filter-dropdown"
                >
                <div class="chevron-box">
                    <p
                    :class="{ filterActive : getActiveFilters.some((filter) => filter.category === category)}"
                    >
                        {{ categoryMap.get('Mark')[category] }}
                    </p>
                    <Icon name="ic:baseline-chevron-right" size="0.9rem" class="chevron-icon" />
                </div>
                    <template #popper >
                        <div class="catalogue-filter-category-title-box">
                            <h3>Catalogue Values</h3>
                            <h2>Mark | {{ categoryMap.get('Mark')[category] }}</h2>
                            <p>Select or Search for a value</p>
                            <p>to filter the library</p>
                            <p></p>
                        </div>
                        <div class="catalogue-filter-category-container scrollable form-style-1">
                            <div class="search-box"  >
                                <Icon name="ic:baseline-search" size="1.5rem" class="search-icon" />
                                <input class="prevent-close-on-click item-modal-input" v-model="searchEntry" type="text" placeholder="search" autofocus ref="markInput"/>
                            </div>
                            <div class="unique-entries" >
                                <h4 >Unique entries: {{ Object.keys(searchList(filterObject.get('Mark')[category], searchEntry)).length }}</h4>
                            </div> 
                            <button 
                                v-for="filterValue in searchList(filterObject.get('Mark')[category], searchEntry)"
                                @click="viewStore.filterActiveToggle(filterValue, category, 'Mark')" 
                                class="catalogue-filter-category-box"
                                :class="{ filterActive : filterObject.get('Mark')[category][filterValue.name].active }">
                                <p class="catalogue-filter-category-list-value" >{{ filterValue.name }}</p>
                            </button>
                        </div>
                    </template>
                </VDropdown>
            </div>
        </div>
    </div>

</div>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
// import VDropdown from 'floating-vue/dist/components/Dropdown.vue.d.ts'

// STATE MANAGERS IMPORT //    


//View State
const viewStore = useViewStore();
const { 
        libraryDisplay,
        formattedLibrary,
        filterLibrary,
        activeFilters,
        getActiveFilters,
        filterObject,
        dataSize,
        filterTotalCount } = storeToRefs(viewStore)
const { 
        filterActiveToggle,
 } = useViewStore();



//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 

        filterMap, 
    } = storeToRefs(referenceStore)


const collapsed = ref(false)
const toggleIconSF = ref(0.8)
const iconScaleFactor = ref(0.5)
// const SIDEBAR_WIDTH = 12
const SIDEBAR_WIDTH_COLLAPSED = 2.5
const toggleSidebar = () => (collapsed.value = !collapsed.value)

const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}vw`
)

const searchEntry = ref()

const searchList = (obj, searchList)=>{
    if(searchList){
        return objectFilter(obj, filterSearch, searchList)
    }else{
        return obj
    }
}

function filterSearch(val, key, searchList){
    return key.toLowerCase().includes(searchList.toLowerCase())
}

function objectFilter(obj, callback, searchList) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => callback(val, key, searchList)));
}

const agentInput = ref()
const bookInput = ref()
const markInput = ref()

onClickOutside(agentInput, (event)=> {
    if(!event.target.matches('.item-modal-input')){
        searchEntry.value = ''
    }
}, {ignore: [bookInput, markInput]})

onClickOutside(bookInput, (event)=> {
    if(!event.target.matches('.item-modal-input')){
        searchEntry.value = ''
    }
}, {ignore: [agentInput, markInput]})

onClickOutside(markInput, (event)=> {
    if(!event.target.matches('.item-modal-input')){
        searchEntry.value = ''
    }
}, {ignore: [agentInput, bookInput]})


const visible = reactive({
        Agent: false,
        Book: false,
        Mark: false,
    })

const toggle = (option)=> {
    console.log(option)
    visible[option] = !visible[option]
}




onMounted(()=>{
    activeFilters.value = []
    watchEffect(()=>{
        viewStore.filterTotalCount
    })
})





</script>



<style lang="scss" scoped>

.filter-instruction-block{
    display: flex;
    flex-flow: row nowrap;
    margin: 0 0.6rem 0.1rem 1.25rem;
    width: 100%;
    align-self: center;
    text-align: left;
    max-height: fit-content;
}
.filter-instruction-text{
    margin: 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.75rem;
	font-weight: 600;
    // letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: rgb(125, 84, 238);
    width: 80%;
	// color: rgb(34, 34, 34);
}

.form-style-1 input[type=text]{
    border: none;
	margin:0 0.1rem 0 0.1rem;
    padding: 0 0 0 0.33rem ;
    width: 78%;
	-webkit-transition: all 0.30s ease-in-out;
	-moz-transition: all 0.30s ease-in-out;
	-ms-transition: all 0.30s ease-in-out;
	-o-transition: all 0.30s ease-in-out;
	outline: none;	
}
.form-style-1 input[type=text]:focus{
}

.library-nav-view-filters{
    margin: 0 0.5rem;
    font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 450;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;
}
.filters-sidebar{
    margin: 0 0;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
}

.catalogue-filter-category-title-box h2{
    max-width: 10vw;;
}
.catalogue-filter-category-title-box h2{
    margin: 0 0.5rem 0.5rem;
    color: black;
    font-family: "Source Sans 3", sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
}
.catalogue-filter-category-title-box h3{
    margin: 0.35rem 0.5rem 0.15rem;
    font-family: "Raleway", sans-serif;
    font-size: 0.715rem;
    font-weight: 560;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
    color: rgb(138, 138, 138);
}
.unique-entries{
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0.25rem 0.25rem 1rem;
    padding: 0.5rem 0 0;
    // border-top: 1px solid rgb(192, 192, 192);
    // width: 100%;
}
.unique-entries h4{
    font-family: "Raleway", sans-serif;

    font-size: 0.8rem;
    font-weight: 500;

    // letter-spacing: 0.05rem;
    // line-height: 1rem;
    color: rgb(54, 54, 54);
}
.catalogue-filter-category-title-box p{
    margin: 0.25rem 0.5rem;
    font-family: "Raleway", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.05rem;
    color: rgb(22, 22, 22);
    white-space: wrap;
}
.catalogue-filter-category-container{
    margin: 0.25rem 0.5rem;
    display: flex;
    flex-flow: column nowrap;
    max-height: 60vh;
    min-width: 0;
    min-height: 0;
    max-width: 80vw;
    overflow-y: auto;
    align-items: flex-start;
    justify-content: flex-start;
    
}
.catalogue-filter-category-container-active{
    margin: 0.25rem 0;
    display: flex;
    flex-flow: column wrap;
    max-height: 70vh;
    min-width: 0;
    min-height: 0;
    max-width: 80vw;
    overflow-y: auto;
    align-items: flex-start;
    justify-content: center;
    
}
.catalogue-filter-category-box{
    max-width: fit-content;
    margin: 0.25rem 0.5rem 0 0;
    border-radius: 0.3rem;
    border: 0.1rem solid rgb(240, 240, 240);
    background: rgb(252, 252, 252);
    cursor: pointer;
}
.catalogue-filter-category-active{
    max-width: fit-content;
    margin: 0.25rem 0.5rem;
    border-radius: 0.3rem;
    border: 0.1rem solid rgb(240, 240, 240);
    background: rgb(252, 252, 252);
    cursor: pointer;
}
.catalogue-filter-category-list-value{
    padding: 0.4rem 1.2rem;
    text-overflow: ellipsis;
    overflow:hidden;
    display: -webkit-box;
    max-height: 52px;
    // padding: 4px 10px;
    max-width: 200px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.catalogue-filter-category-value-container{
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 12px 0px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem 0 0;
    width: 100%;
}
.catalogue-filter-category-box:hover{
    background: rgb(240, 240, 240);
}
.catalogue-filter-category-box.filterActive{
    background: rgb(125, 84, 238);
    color: white;
}
.catalogue-filter-category-box:hover{
    background:rgb(152, 121, 238);
    color: white;
}
.catalogue-filter-category-box:active{
    background: rgb(230, 230, 230);
    color: white;
}

p.filterActive{
    color:rgb(125, 84, 238);
    font-weight: 600;
}

.catalogue-title-box.filterActive{
    background: rgb(241, 241, 241);
    color:rgb(125, 84, 238);
    font-weight: 600;
}

.catalogue-title-box.filterActive .catalogue-title{
    font-weight: 600;
}

.catalogue-filter-category-active.filterActive .catalogue-filter-category-value-container:hover{
    background: rgb(152, 121, 238);
    color: white;
}

.catalogue-filter-category-active.filterActive .catalogue-filter-category-value-container:active{
    background: rgb(230, 230, 230);
    color: white;
}

.catalogue-filter-category-active.filterActive .catalogue-filter-category-value-container{
    background: rgb(125, 84, 238);
    color: white;
    border-radius: 0.8rem;
}




p.catalogue-filter-category-list-value{
    text-align: left;
	line-height: 0.9rem;
	font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 500;
}



  .sidebar {
    width: clamp(8vw, 13rem, 11vw);
	display: grid;
	grid-template-rows: 4rem auto auto;
	border-radius: 0 0.1rem 0.1rem 0;
	color: black;
	float: left;
	position: sticky;
	z-index: 11;
    height: 84vh;
	top: 0vh;
	left: 0;
	padding: 0.5em;
	transition: 0.3s ease-in-out;
  }

  .scrollable{
    overflow-x: hidden;
    right: -2px;
  }

  .sidebar-content{
    display: flex;
    flex-flow: column nowrap
  }
  
  .query-type-sideBar{
	margin: 0 0.4rem ;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.25rem;
	font-weight:400;
    letter-spacing: 0.1rem;
}

  .sidebar-title-box{
    grid-row: 1/2;
    border-bottom: 2px solid #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 1rem 0 0;
    align-content: flex-start;
    gap: 0.1rem;
  }

  .sidebar-title-box h3{
	font-family: 'Source Sans 3', sans-serif;
	font-size: 0.9rem;
	font-weight:350;
    letter-spacing: 0.1rem;
    margin: 0 0.4rem ;
  }


  .library-catalogue-title-box{
    margin: 0.4rem 0 0.4rem 0.4rem ;
    grid-row: 2/3;
    padding: 0.5rem 0 0.5rem 0;
    border-bottom: 2px solid #ebebeb;
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
    // padding: 0.25rem 0;
}
  

.library-catalogue {
    grid-row: 3/4;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}


.catalogue-title-box{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0.25rem 0;
    padding: 0 0.5rem;
    border-bottom: 0.2rem solid #e9e9e9;
    cursor: pointer;
    color: #111827;
    background-color: rgb(247, 247, 247);
    border-radius: 0.2rem;
}

.catalogue-title-box:hover{
    color: rgb(155, 155, 155)
}

.svg{
    color: inherit;
}
.catalogue-title{
    color: inherit;
	font-family:'Raleway', sans-serif;
	font-size: 0.95rem;
	font-weight: 600;
	line-height: 1rem;
	padding: 0.4rem 0;
    letter-spacing: 0.075rem;
}
.catalogue-container{
    display: flex;
    flex-flow: column wrap;
}
   
.catalogue{
	color: #111827;
	font-family:'Raleway', sans-serif;
	font-size: 0.825rem;
	font-weight: 400;
	line-height: 1.2rem;
	// padding: 0.2rem 0 0.2rem 0.5rem;
    cursor: pointer;
}

.chevron-box{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
}
.chevron-box p{
    max-width: 9vw;
    font-family:'Raleway', sans-serif;
	line-height: 1.2rem;
}
.chevron-icon{
    color: rgb(82, 82, 82);
}

.catalogue p{
	padding: 0.2rem 0 0.2rem 0.5rem;
}

.catalogue:hover{
    background-color: #f5f5f5;
}


.hidden {
        visibility: hidden;
        height: 0;
    }
.visible {
    visibility: visible;
    height: auto;
}

.collapse-icon {
  grid-column-start: 1;
  grid-column-end: 2;
  position: absolute;
  top: 0.5vw;
  left: 22.1vw;
  margin: 0.55em;
  cursor: pointer;
  color: rgb(63, 63, 63);
  transition: 0.3s ease-in-out;
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

.rotate-180 {
  transform: translate(-22vw, 0) rotate(180deg);
  transition: 0.3s ease-in-out;
}
</style>
