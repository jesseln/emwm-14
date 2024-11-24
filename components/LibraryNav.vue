<template>
    <div class="library-nav-container">
        <!-- <div class="library-nav-intro-wrapper">
            <h2>Group, Sort, Resize and Colour the Items in the Library</h2>
            <p>Organise all the library items using the dropdowns below</p>
            </div> -->
    <div class="library-nav-wrapper">
        <div class="library-nav-dropdown">
            <div class="library-nav-title-block">
                <h3 class="library-nav-view">Choose a category to group each item:</h3>
            </div>
            <div class="aselect" >
                <div ref="section" class="selector" @click="toggle('section')">
                    <div class="label">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="49*iconScaleFactor*0.95" :height="36*iconScaleFactor*0.95" viewBox="0 0 49 36" fill="none">
                            <g filter="url(#filter0_d_605_90)">
                                <path d="M6 9H16V25H6V9Z" fill="#5B5B5B"/>
                                <path d="M21 2H31V25H21V2Z" fill="#5B5B5B"/>
                                <path d="M4 27H45V30H4V27Z" fill="#F5F5F5"/>
                                <path d="M6.05 9.05H15.95V24.95H6.05V9.05ZM21.05 2.05H30.95V24.95H21.05V2.05ZM4.05 27.05H44.95V29.95H4.05V27.05Z" stroke="#9B9B9B" stroke-width="0.1"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_605_90" x="0" y="0" width="49" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="2"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_605_90"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_605_90" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                        <p v-if="libraryDisplay.viewType['shelf'] !== 'NotSelected'">
                            {{libraryDisplay.viewType['shelf']}} | 
                            {{categoryMap.get(libraryDisplay.viewType['shelf'])[libraryDisplay.view['shelf']]}} - 
                            {{ libraryDisplay.view['shelfOrderMethod']==='A'? 'A to Z': 'Low to High' }}
                        </p>
                        <p v-else="">
                            All Items
                        </p>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                            <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="grey" stroke-width="1.3" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="categories" :class="{ hidden : !visible.section }">
                        <ul class="scrollable" >
                    
                            <li :class="{ current : `NotSelected:${item.category}` === value.section }" v-for="item in sectionCategories.NotSelected" 
                                @click="handleViewSelection('shelf', item.category, 'NotSelected')">
                                All Items
                            </li>
                            <li :class="{ current : `Agent:${item.category}` === value.section }" v-for="item in sectionCategories.Agent" 
                            @click="handleViewSelection('shelf', item.category, 'Agent')">
                                Agent | {{ agentCategories[item.category]}} - {{ sectionCategories.Agent[item.category]['sortMethod']==='A'? 'A to Z': 'Low to High' }}
                            </li>
                            <li :class="{ current : `Book:${item.category}` === value.section }" v-for="item in sectionCategories.Book" 
                            @click="handleViewSelection('shelf', item.category, 'Book')">
                                Book | {{ bookCategories[item.category]}} - {{ sectionCategories.Book[item.category]['sortMethod']==='A'? 'A to Z': 'Low to High' }}
                            </li>
                            <li :class="{ current : `Mark:${item.category}` === value.section }" v-for="item in sectionCategories.Mark" 
                            @click="handleViewSelection('shelf', item.category, 'Mark')">
                                Mark | {{ markCategories[item.category] }} - {{ sectionCategories.Mark[item.category]['sortMethod']==='A'? 'A to Z': 'Low to High' }}
                            </li>
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="library-nav-dropdown">
            <div class="library-nav-title-block">
                <h3 class="library-nav-view">Choose a category to sort each group:</h3>
            </div>
            <div class="aselect" >
                <div ref="sort" class="selector" @click="toggle('sort')">
                    <div class="label">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="39*iconScaleFactor" :height="20*iconScaleFactor" viewBox="0 0 39 20" fill="none">
                            <path d="M3.27338 19.3499C2.34051 19.3499 1.55756 19.0834 0.924543 18.5503C0.308181 18.0173 0 17.2427 0 16.2265C0 15.6934 0.116609 15.202 0.349827 14.7522C0.583045 14.2858 1.01616 13.8527 1.64919 13.4529C2.29886 13.0531 3.21508 12.6866 4.39783 12.3534C4.81429 12.2201 5.23908 12.0952 5.6722 11.9786C6.10532 11.862 6.53844 11.7454 6.97156 11.6288C7.40467 11.4955 7.84612 11.3706 8.2959 11.2539V12.1535C7.71286 12.3201 7.1548 12.495 6.62173 12.6782C6.08866 12.8448 5.59724 13.0031 5.14746 13.153C4.51444 13.3696 4.03134 13.6194 3.69817 13.9026C3.365 14.1692 3.14012 14.469 3.02351 14.8022C2.9069 15.1187 2.84859 15.4435 2.84859 15.7767C2.84859 16.4097 3.01518 16.8678 3.34835 17.151C3.69817 17.4342 4.12296 17.5758 4.62272 17.5758C4.88925 17.5758 5.14746 17.5342 5.39733 17.4509C5.64721 17.3676 5.94706 17.2177 6.29689 17.0011C6.64672 16.7679 7.09649 16.4347 7.64622 16.0016L7.94607 17.226H7.07151C6.62173 17.6924 6.2136 18.0839 5.84711 18.4004C5.48063 18.7169 5.09748 18.9501 4.69768 19.1001C4.29788 19.2667 3.82311 19.3499 3.27338 19.3499ZM9.29541 19.3C8.52912 19.3 7.92942 19.0834 7.4963 18.6503C7.07984 18.2172 6.84662 17.6341 6.79664 16.9012V10.9041C6.79664 10.1045 6.72168 9.49648 6.57175 9.08002C6.43849 8.6469 6.2136 8.34705 5.89709 8.18046C5.58058 7.99722 5.14746 7.9056 4.59773 7.9056C4.31454 7.9056 3.99802 7.93892 3.6482 8.00555C3.29837 8.05553 2.88191 8.15548 2.39881 8.3054L3.67319 7.48081L3.27338 9.40486C3.19009 9.9879 3.00685 10.421 2.72365 10.7042C2.45712 10.9708 2.13228 11.104 1.74914 11.104C1.34933 11.104 1.03282 11.0124 0.799605 10.8292C0.566387 10.6293 0.42479 10.3461 0.374815 9.97957C0.524741 9.01338 1.04948 8.23877 1.94904 7.65572C2.86525 7.05602 4.06466 6.75617 5.54726 6.75617C6.51345 6.75617 7.2964 6.91442 7.8961 7.23093C8.4958 7.53078 8.93725 8.00555 9.22044 8.65523C9.50364 9.30491 9.64524 10.1628 9.64524 11.229V16.7013C9.64524 17.1011 9.71187 17.3926 9.84514 17.5758C9.9784 17.7424 10.1616 17.8257 10.3949 17.8257C10.5614 17.8257 10.7114 17.7841 10.8446 17.7008C10.9946 17.6008 11.1362 17.4509 11.2694 17.251L11.8192 17.7257C11.536 18.2921 11.1861 18.7003 10.7697 18.9501C10.3699 19.1834 9.87845 19.3 9.29541 19.3Z" fill="#2C2C2C"/>
                            <path d="M12.6112 19.0001V18.0506L14.2104 17.7507C14.227 17.3343 14.2353 16.8928 14.2353 16.4264C14.2353 15.9433 14.2353 15.4685 14.2353 15.0021C14.252 14.5357 14.2603 14.1275 14.2603 13.7777V2.90807L12.4612 2.65819V1.75864L16.8341 0.65918L17.2089 0.884069L17.1089 4.60723V8.85513L17.1839 9.12999V17.1011L16.7841 19.3L12.6112 19.0001ZM20.4073 19.3499C19.8909 19.3499 19.3995 19.2667 18.933 19.1001C18.4666 18.9335 18.0251 18.667 17.6087 18.3005C17.1922 17.9173 16.8007 17.4009 16.4343 16.7512H15.9845L16.2094 15.4769C16.7758 16.2265 17.3255 16.7762 17.8586 17.126C18.3916 17.4759 18.958 17.6508 19.5577 17.6508C20.1074 17.6508 20.5989 17.4925 21.032 17.176C21.4818 16.8429 21.8316 16.3348 22.0815 15.6518C22.348 14.9688 22.4813 14.1025 22.4813 13.0531C22.4813 11.5038 22.2147 10.3544 21.6817 9.60476C21.1486 8.85513 20.4656 8.48032 19.6327 8.48032C19.2662 8.48032 18.8914 8.57194 18.5082 8.75518C18.1251 8.93842 17.7336 9.1883 17.3338 9.50481C16.9507 9.82132 16.5425 10.2045 16.1094 10.6542L15.9095 9.22995H16.5592C16.9757 8.66356 17.4088 8.20545 17.8586 7.85562C18.3083 7.48914 18.7748 7.21427 19.2579 7.03103C19.7576 6.84779 20.274 6.75617 20.8071 6.75617C21.7067 6.75617 22.5146 6.99771 23.2309 7.48081C23.9472 7.94725 24.5136 8.63857 24.9301 9.55478C25.3632 10.471 25.5797 11.5954 25.5797 12.9281C25.5797 14.2441 25.3465 15.3852 24.8801 16.3514C24.4137 17.301 23.789 18.0423 23.006 18.5753C22.2397 19.0917 21.3735 19.3499 20.4073 19.3499Z" fill="#2C2C2C"/>
                            <path d="M33.4714 19.3499C32.2553 19.3499 31.2058 19.1084 30.3229 18.6253C29.44 18.1256 28.757 17.4176 28.2739 16.5014C27.7908 15.5685 27.5493 14.4607 27.5493 13.178C27.5493 11.812 27.8241 10.6542 28.3739 9.70471C28.9236 8.75518 29.6566 8.03054 30.5728 7.53078C31.5057 7.01437 32.5218 6.75617 33.6213 6.75617C34.4375 6.75617 35.1705 6.90609 35.8202 7.20595C36.4699 7.5058 37.0029 7.91393 37.4194 8.43034C37.8359 8.93009 38.0774 9.49648 38.144 10.1295C38.0608 10.496 37.9025 10.7709 37.6693 10.9541C37.4527 11.1373 37.1612 11.229 36.7947 11.229C36.3616 11.229 36.0034 11.0957 35.7202 10.8292C35.437 10.546 35.2621 10.1045 35.1955 9.50481L34.7707 7.53078L36.195 8.48032C35.8119 8.26376 35.4287 8.11383 35.0456 8.03054C34.6791 7.94725 34.3126 7.9056 33.9461 7.9056C33.3464 7.9056 32.7884 8.08051 32.2719 8.43034C31.7722 8.78017 31.3641 9.31324 31.0476 10.0295C30.7477 10.7459 30.5978 11.6537 30.5978 12.7532C30.5978 13.8027 30.7644 14.6773 31.0975 15.3769C31.4307 16.0599 31.8805 16.5763 32.4469 16.9261C33.0299 17.2593 33.6796 17.4259 34.3959 17.4259C34.7957 17.4259 35.1788 17.3842 35.5453 17.301C35.9118 17.201 36.2616 17.0428 36.5948 16.8262C36.9446 16.593 37.2695 16.2931 37.5693 15.9266L38.244 16.4514C37.9108 17.0844 37.5194 17.6175 37.0696 18.0506C36.6365 18.467 36.12 18.7836 35.5203 19.0001C34.9373 19.2333 34.2543 19.3499 33.4714 19.3499Z" fill="#2C2C2C"/>
                        </svg>
                        <p v-if="libraryDisplay.viewType['bookend'] !== 'NotSelected'">
                            {{libraryDisplay.viewType['bookend']}} | 
                            {{categoryMap.get(libraryDisplay.viewType['bookend'])[libraryDisplay.view['bookend']]}} - 
                            {{ libraryDisplay.view['bookendOrderMethod']==='A'? 'A to Z': 'Low to High' }}
                        </p>
                        <p v-else="">
                            All Items
                        </p>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                            <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="grey" stroke-width="1.3" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="categories" :class="{ hidden : !visible.sort }">
                        <ul class="scrollable">
                            <li :class="{ current : `NotSelected:${item.category}` === value.sort }" v-for="item in sortCategories.NotSelected" 
                                @click="handleViewSelection('bookend', item.category, 'NotSelected')">
                                All Items
                            </li>
                            <li :class="{ current : `Agent:${item.category}` === value.sort }" v-for="item in sortCategories.Agent" 
                            @click="handleViewSelection('bookend', item.category, 'Agent')">
                                Agent | {{ agentCategories[item.category]}} - {{ sortCategories.Agent[item.category]['sortMethod']==='A'? 'A to Z': 'Low to High' }}
                            </li>
                            <li :class="{ current : `Book:${item.category}` === value.sort }" v-for="item in sortCategories.Book" 
                            @click="handleViewSelection('bookend', item.category, 'Book')">
                                Book | {{ bookCategories[item.category]}} - {{ sortCategories.Book[item.category]['sortMethod']==='A'? 'A to Z': 'Low to High' }}
                            </li>
                            <li :class="{ current : `Mark:${item.category}` === value.sort }" v-for="item in sortCategories.Mark" 
                            @click="handleViewSelection('bookend', item.category, 'Mark')">
                                Mark | {{ markCategories[item.category] }} - {{ sortCategories.Mark[item.category]['sortMethod']==='A'? 'A to Z': 'Low to High' }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="library-nav-dropdown">
            <div class="library-nav-title-block">
                <h3 class="library-nav-view">Choose a category to resize each item:</h3>
            </div>
            <div class="aselect" >
                <div ref="height" class="selector" @click="toggle('height')">
                    <div class="label">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="36*iconScaleFactor*0.85" :height="31*iconScaleFactor*0.85" viewBox="0 0 36 31" fill="none">
                            <rect x="0.299561" y="18.6895" width="9.33333" height="12.1333" fill="#5B5B5B"/>
                            <rect x="13.033" y="0.956055" width="9.33333" height="29.8667" fill="#5B5B5B"/>
                            <rect x="26.0994" y="10.2891" width="9.33333" height="20.5333" fill="#5B5B5B"/>
                        </svg>
                        <p v-if="libraryDisplay.viewType['height'] !== 'NotSelected'">
                            {{libraryDisplay.viewType['height']}} | 
                            {{categoryMap.get(libraryDisplay.viewType['height'])[libraryDisplay.view['height']]}}
                        </p>
                        <p v-else="">
                            No Selection
                        </p>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                            <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="grey" stroke-width="1.3" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="categories" :class="{ hidden : !visible.height }">
                        <ul class="scrollable">
                            <li :class="{ current : `NotSelected:${item.category}` === value.height }" v-for="item in heightCategories.NotSelected" 
                                @click="handleViewSelection('height', item.category, 'NotSelected')">
                                No Selection
                            </li>
                            <li :class="{ current : `Agent:${item.category}` === value.height }" v-for="item in heightCategories.Agent" 
                            @click="handleViewSelection('height', item.category, 'Agent')">
                                Agent | {{ agentCategories[item.category]}}
                            </li>
                            <li :class="{ current : `Book:${item.category}` === value.height }" v-for="item in heightCategories.Book" 
                            @click="handleViewSelection('height', item.category, 'Book')">
                                Book | {{ bookCategories[item.category]}}
                            </li>
                            <li :class="{ current : `Mark:${item.category}` === value.height }" v-for="item in heightCategories.Mark" 
                            @click="handleViewSelection('height', item.category, 'Mark')">
                                Mark | {{ markCategories[item.category] }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="library-nav-dropdown">
            <div class="library-nav-title-block">
                <h3 class="library-nav-view">Choose a category to change item colours:</h3>
            </div>
            <div class="aselect" >
                <div ref="colour" class="selector" @click="toggle('colour')">
                    <div class="label">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="43*iconScaleFactor*0.8" :height="38*iconScaleFactor*0.8" viewBox="0 0 43 38" fill="none">
                            <circle cx="32.7285" cy="28.0532" r="9.35102" fill="#B3DE69"/>
                            <circle cx="21.0395" cy="9.35102" r="9.35102" fill="#BDB9D9"/>
                            <circle cx="9.35102" cy="28.351" r="9.35102" fill="#FB8072"/>
                        </svg>
                        <p v-if="libraryDisplay.viewType['colour'] !== 'NotSelected'">
                            {{libraryDisplay.viewType['colour']}} | 
                            {{categoryMap.get(libraryDisplay.viewType['colour'])[libraryDisplay.view['colour']]}}
                        </p>
                        <p v-else="">
                            No Selection
                        </p>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                            <path d="M1 1.00002L5.72428 4.90478L10.1111 1.00002" stroke="grey" stroke-width="1.3" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="categories" :class="{ hidden : !visible.colour }">
                        <ul class="scrollable">
                            <li :class="{ current : `NotSelected:${item.category}` === value.colour }" v-for="item in colourCategories.NotSelected" 
                                @click="handleViewSelection('colour', item.category, 'NotSelected')">
                                No Selection
                            </li>
                            <li :class="{ current : `Agent:${item.category}` === value.colour }" v-for="item in colourCategories.Agent" 
                            @click="handleViewSelection('colour', item.category, 'Agent')">
                                Agent | {{ agentCategories[item.category]}}
                            </li>
                            <li :class="{ current : `Book:${item.category}` === value.colour }" v-for="item in colourCategories.Book" 
                            @click="handleViewSelection('colour', item.category, 'Book')">
                                Book | {{ bookCategories[item.category]}}
                            </li>
                            <li :class="{ current : `Mark:${item.category}` === value.colour }" v-for="item in colourCategories.Mark" 
                            @click="handleViewSelection('colour', item.category, 'Mark')">
                                Mark | {{ markCategories[item.category] }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</div>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";

//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        colourSet,
        colourScale,
        getActiveFilters,
        filterObject,
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
        filterActiveToggle,
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
const NotSelectedCategories = ref(referenceStore.categoryMap.get("NotSelected"))
const agentCategories = ref(referenceStore.categoryMap.get("Agent"))
const bookCategories = ref(referenceStore.categoryMap.get("Book"))
const markCategories = ref(referenceStore.categoryMap.get("Mark"))

const sectionCategories = ref({NotSelected: {}, Agent: {}, Book: {}, Mark: {}})
const sortCategories = ref({NotSelected: {}, Agent: {}, Book: {}, Mark: {}})
const heightCategories = ref({NotSelected: {}, Agent: {}, Book: {}, Mark: {}})
const colourCategories = ref({NotSelected: {}, Agent: {}, Book: {}, Mark: {}})

Object.entries(referenceStore.viewMap.get("NotSelected")).forEach(entry => {
    const [key , val] = entry
    val.useSection ? sectionCategories.value.NotSelected[key] = val : null
    val.useOrder ? sortCategories.value.NotSelected[key] = val : null
    val.useHeight ? heightCategories.value.NotSelected[key] = val : null
    val.useColour ? colourCategories.value.NotSelected[key] = val : null
});

Object.entries(referenceStore.viewMap.get("Agent")).forEach(entry => {
    const [key , val] = entry
    val.useSection ? sectionCategories.value.Agent[key] = val : null
    val.useOrder ? sortCategories.value.Agent[key] = val : null
    val.useHeight ? heightCategories.value.Agent[key] = val : null
    val.useColour ? colourCategories.value.Agent[key] = val : null
});

Object.entries(referenceStore.viewMap.get("Book")).forEach(entry => {
    const [key , val] = entry
    val.useSection ? sectionCategories.value.Book[key] = val : null
    val.useOrder ? sortCategories.value.Book[key] = val : null
    val.useHeight ? heightCategories.value.Book[key] = val : null
    val.useColour ? colourCategories.value.Book[key] = val : null
});

Object.entries(referenceStore.viewMap.get("Mark")).forEach(entry => {
    const [key , val] = entry
    val.useSection ? sectionCategories.value.Mark[key] = val : null
    val.useOrder ? sortCategories.value.Mark[key] = val : null
    val.useHeight ? heightCategories.value.Mark[key] = val : null
    val.useColour ? colourCategories.value.Mark[key] = val : null
});


    const value = computed (()=> {
        return { 
            section: `${viewStore.libraryDisplay.viewType['shelf']}:${[viewStore.libraryDisplay.view['shelf']]}`,
            sort: `${viewStore.libraryDisplay.viewType['bookend']}:${[viewStore.libraryDisplay.view['bookend']]}`,
            height: `${viewStore.libraryDisplay.viewType['height']}:${[viewStore.libraryDisplay.view['height']]}`,
            colour: `${viewStore.libraryDisplay.viewType['colour']}:${[viewStore.libraryDisplay.view['colour']]}`
    }
    })

    const visible = reactive({
        section: false,
        sort: false,
        height: false,
        colour: false,
    })

    const section = ref(false)
    const sort = ref(false)
    const height = ref(false)
    const colour = ref(false)

   const toggle = (option)=> {
       visible[option] = !visible[option]
    }

    onClickOutside(section, (event) => visible.section? visible.section = !visible.section : null)
    onClickOutside(sort, (event) => visible.sort? visible.sort = !visible.sort : null)
    onClickOutside(height, (event) => visible.height? visible.height = !visible.height : null)
    onClickOutside(colour, (event) => visible.colour? visible.colour = !visible.colour : null)

    // watchEffect(()=>{
    //     console.log('ordinal olour map',viewStore.ordinalColourMap)
    // })

		
</script>

<style lang="scss" scoped>
.categories{
}

.library-nav-container{
    margin: 0 var(--sideMargins) 0;
    display: grid;
    grid-template-rows: auto auto auto;
    justify-content: center;
    border-bottom: 2px solid rgb(255, 255, 255);
    // height: 100%;
}
.library-nav-intro-wrapper{
    margin: 1rem 0 0;
    padding: 0 0 0.5rem;
    grid-row: 1/2;
    display: flex;
    flex-flow: column wrap;
    // gap: 2rem;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #ebebeb;
}

.library-nav-intro-wrapper h2{
	color: #111827;
	font-family:'Source Sans 3', sans-serif;
	font-size: 1.5rem;
	font-weight: 450;
	line-height: 1.5rem;
	padding: 0 0 0.3rem;
    letter-spacing: 0.05rem;
  }

  .library-nav-intro-wrapper p{
    color: #575757;
	font-family:'Raleway', sans-serif;
	font-size: .825rem;
	font-weight: 450;
	line-height: 1.2rem;
}
  
.library-nav-wrapper{
    margin: 0.5rem 0 0;
    grid-row: 2/3;
    display: flex;
    flex-flow: row wrap;
    // gap: 2rem;
    justify-content: center;

}
.library-nav-colour-wrapper{
    grid-row: 3/4;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    
}

.library-nav-colour-block{
    grid-row: 2/3;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 0 0 0.5rem;
}

.scaleSequential-large-title{
    grid-row: 2/3;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 0 0.5rem;
    // background-color: rgba(255, 255, 255, 0.8);
    border-bottom: 2px solid rgb(255, 255, 255);
}

.library-nav-colour-item{
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
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    min-width:3.5rem;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 12px 0px;
}

.scaleSequential{
    min-width:1.25rem;
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
    // align-self: center;
    text-align: center;
	font-family: 'Raleway', sans-serif;
	font-size: 0.7rem;
	font-weight: 500;
    line-height: 0.8rem;
	color: black;
    width: 100%;
}
.library-nav-dropdown{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    // max-height: 2rem ;
    margin: 0.3rem 0 0.2rem 1.5rem;
}


.library-nav-title-block{
    display: flex;
    flex-flow: row nowrap;
    margin: 0 0.6rem 0.1rem 1.25rem;
    width: 100%;
    align-self: center;
    text-align: right;
    max-height: fit-content;
}
.library-nav-title-block-colour{
    margin: 0 0 0.25rem;
    align-self: center;
    text-align: center;
    max-height: 2rem;
}

.library-nav-view{
    margin: 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.75rem;
	font-weight: 600;
    // letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: rgb(125, 84, 238);
	// color: rgb(34, 34, 34);
}

.library-nav-view-colour{
    display: flex;
    flex-flow: row wrap;
    // margin: 0.5rem 0 0 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.85rem;
	font-weight: 500;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;
    // flex-shrink: 1;
    letter-spacing: 0.2rem;
}


.aselect {
    // display: flex;
    //     flex-direction: row;
    //     flex-wrap: nowrap;
    margin: 0;
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
        font-size: 0.725rem;
        font-weight: 450;
        letter-spacing: 0.05rem;
        line-height: 1.1rem;
        color: black;
        border: 1px solid gainsboro;
        position: absolute;
        left: -1px;
        top: -1px;
        z-index: 11;
        background: #fff;
        // display: block;
        max-height: 50vh;
        // overflow: auto;
    }
    li {
        z-index: 11;
        padding: 0.55rem 0.4rem;
        color: #666;
        border-bottom: 1px solid rgb(241, 241, 241);
        cursor: pointer;
        &:hover {
            // color: white;
            background:rgb(125, 84, 238);
            color: white;
            // colour was #f7e8f777;
        }
    }
    .current {
        font-size: 0.725rem;
        font-weight: 500;
        color:  white;
        background: rgb(125, 84, 238);
    }
    .hidden {
        visibility: hidden;
    }
    .visible {
        z-index: 11;
        visibility: visible;
    }

    .label {
        z-index: 5;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;
        min-width: 16rem;
        white-space: nowrap;
        width: 100%;
        padding: 0.2rem 1.25rem 0.15rem 0.5rem;
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