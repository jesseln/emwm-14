import { storeToRefs } from "pinia";

export const useReferenceStore = defineStore('reference', ()=>{
    const { invertObject } = useUtils();
    //Your Collection State
    const yourCollectionStore = useYourCollectionStore();
    const { yourCollection }  = storeToRefs(yourCollectionStore)
    const { addToCollection, 
            removeFromCollection } = useYourCollectionStore();

    const { width, height } = useWindowSize()

    const windowWidth = computed(()=>{
        return width.value
    })
    const windowHeight = computed(()=>{
        return height.value
    })

    const topViews = ref({
        ['Women agents']: {},
        ['Ownership']: {},
        ['Reading']: {},
        ['Recording']: {},
        ['Visual']: {},
        ['Attribution']: {},
        ['Types of book']: {},
        ['Locations']: {},
        ['Repositories']: {}
    })

    // {name: 'Ownership', linkName: 'ownership',
    //     imageFolder: 'mark-images',
    //     itemID:'101',
    //     itemImage: {name:'MargID_101_(2_of_2).jpg'},
    //     class: 'topViewClassOwnership'},

    const topViewsList = ref(
        [[0,
            [[1,
                [           
                {name: 'Women Agents', linkName: 'women-agents',
                imageFolder: 'mark-images',
                itemID:'625',
                itemImage: {name:'MargID_625_(1_of_1).JPG'},
                class: 'topViewClassWomen'},

                {name: 'Ownership', linkName: 'ownership',
                imageFolder: 'mark-images',
                itemID:'47',
                itemImage: {name:'MargID_47_(2_of_2).jpg'},
                class: 'topViewClassOwnership'},

                {name: 'Reading', linkName: 'reading',
                imageFolder:'mark-images',
                itemID:'372',
                itemImage: {name:'MargID_372_(2_of_2).jpeg'},
                class: 'topViewClassReading'},

                {name: 'Recording', linkName: 'recording',
                imageFolder: 'mark-images',
                itemID:'48',
                itemImage: {name:'MargID_48_(2_of_4).jpg'},
                class: 'topViewClassRecording'},

                {name: 'Visual', linkName: 'visual',
                imageFolder: 'mark-images',
                itemID:'21',
                itemImage: {name:'MargID_21_(1_of_1).jpg'},
                class: 'topViewClassGraffiti'},

                // {name: 'Graffiti', imageFolder: 'mark-images',
                // itemID:'224',
                // itemImage: {name:'MargID_224_(1_of_1).jpg'}},

                {name: 'Attribution', linkName: 'attribution',
                imageFolder: 'mark-images',
                itemID:'80',
                itemImage: {name:'MargID_80_(2_of_2).jpg'},
                class: 'topViewClassAttribution'},

                {name: 'Types of Book', linkName: 'types-of-book',
                imageFolder: 'book-images',
                itemID:'289',
                itemImage: {name:'BookID_289_(3_of_3).JPG'},
                class: 'topViewClassBookTypes'},

                {name: 'Locations', linkName: 'locations',
                imageFolder: 'book-images',
                itemID:'96',
                itemImage: {name:'BookID_96_(2_of_4).jpg'},
                class: 'topViewClassLocations'},

                {name: 'Repositories', linkName: 'repositories',
                imageFolder: 'book-images',
                itemID:'226',
                itemImage: {name:'BookID_226_(2_of_2).JPG'},
                class: 'topViewClassRepositories'},
                ]
            ]]
        ]]
    )

    ///////////////////////
    // LABEL CONVERSIONS //
    ///////////////////////
    const itemModalMap = reactive(new Map());
    itemModalMap
    .set('NotSelected', {
        ['Not Selected']: 'Not Selected',
    })
    itemModalMap
    .set('Book', {
            ['BookID']: 'Book ID',
            ['Repository']: 'Repository', 
            ['Date of publication']: 'Year Published', 
            ['Genre/Identity']: 'Book Genre',
            ['Title']: 'Book Title',
            ['Author']: 'Author',
            ['Place of publication']: 'Place of publication',
            ['Size']: 'Book Size',
            ['Book Notes']:'Book Notes',
            ['Print or manuscript']: 'Format',
            ['STC or Wing']: 'STC or Wing',
            ['Shelfmark']: 'Shelfmark',
            ['Number of marks']: 'Number of marks in book',
            ['Number of book images']: 'Number of book images',
    })
    itemModalMap
    .set('Agent', {
            ['FemaleAgentID']: 'Agent ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
            ['Number of marks']: 'Number of marks by agent',
    })
    itemModalMap
    .set('Mark', {
            ['MargID']: 'Mark ID',
            ['Ownership type']: 'Ownership type',
            ['Distribution']: 'Distribution of marks',
            ['Female agent status']: 'Confidence in female authorship',
            ['Annotation type']: 'Annotation type',
            ['Location sig. ; p. ; pp.']: 'Location',
            ['Recording type']: 'Recording type',
            ['Transcription']: 'Transcription',
            ['Mark type (Mark of?)']: 'Type of Mark',
            ['Class']: 'Class',
            ['Position on page']: 'Position on page',
            ['Location other']: 'Location detail',
            ['Added text type']: 'Type of added text',
            ['Drawing type']: 'Type of drawing',
            ['Graffiti type']: 'Type of Graffiti',
            ['Agent role']: 'Agent role',
    })

    const categoryMap = reactive(new Map());
    categoryMap
    .set('NotSelected', {
        ['Not Selected']: 'Not Selected',
    })
    categoryMap
    .set('Book', {
            ['BookID']: 'Book ID',
            ['Repository']: 'Repository', 
            ['Date of publication']: 'Year Published', 
            ['Genre/Identity']: 'Book Genre',
            ['Title']: 'Book Title',
            ['Author']: 'Author',
            ['Place of publication']: 'Place of publication',
            ['Size']: 'Book Size',
            ['Book Notes']:'Book Notes',
            ['Print or manuscript']: 'Format',
            ['STC or Wing']: 'STC or Wing',
            ['Shelfmark']: 'Shelfmark',
            ['Marginal Marks']: 'Marginal marks',
            ['Book image/s']: 'Images',
            ['Number of marks']: 'Number of marks in book',
            ['Number of book images']: 'Number of book images',
    })
    categoryMap
    .set('Agent', {
            ['FemaleAgentID']: 'Agent ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
            ['Number of marks']: 'Number of marks by agent',
    })
    categoryMap
    .set('Mark', {
            ['MargID']: 'Mark ID',
            ['Notes']: 'Notes',
            ['Ownership type']: 'Ownership type',
            ['Distribution']: 'Distribution of marks',
            ['Female agent status']: 'Confidence in female authorship',
            ['Annotation type']: 'Annotation type',
            ['Location sig. ; p. ; pp.']: 'Location',
            ['Recording type']: 'Recording type',
            ['Transcription']: 'Transcription',
            ['Mark type (Mark of?)']: 'Type of Mark',
            ['Images of marginal mark']: 'Images',
            ['Class']: 'Class',
            ['Position on page']: 'Position on page',
            ['Location other']: 'Location detail',
            ['Added text type']: 'Type of added text',
            ['Drawing type']: 'Type of drawing',
            ['Graffiti type']: 'Type of Graffiti',
            ['Agent role']: 'Agent role',
            ['Other notes']: 'Other notes',
    })

    //Inverse Map - Created to reverse conversion as needed in one place only
    const invCategoryMap = reactive(new Map());
    invCategoryMap
    .set('NotSelected', invertObject(categoryMap.get('NotSelected')))
    invCategoryMap
    .set('Book', invertObject(categoryMap.get('Book')))
    invCategoryMap
    .set('Agent', invertObject(categoryMap.get('Agent')))
    invCategoryMap
    .set('Mark', invertObject(categoryMap.get('Mark')))

    ////////////
    // SCALES //
    ////////////

    const zoomLevel = ref("0");
    const zoomFactor = reactive({
        0: {height: 1.5*0.3, width: 2*0.25},
        50: {height: 1.5*0.6, width: 2*0.675},
        100: {height: 1.5*2, width: 1.4*5},
    })

    const scales = reactive({
        maxItemHeight: 100 * zoomFactor[zoomLevel.value].height,
        maxShelfHeight: 120 * zoomFactor[zoomLevel.value].height,
        minItemHeight: 50 * zoomFactor[zoomLevel.value].height,
        minItemWidth: 16 * zoomFactor[zoomLevel.value].width     
    })

    const scalesStandard = reactive({
        maxItemHeight: 100 * zoomFactor[50].height,
        maxShelfHeight: 110 * zoomFactor[50].height,
        minItemHeight: 50 * zoomFactor[50].height,
        minItemWidth: 16 * zoomFactor[50].width     
    })


    watchEffect(()=>{
        updateScales()
    })

    function updateScales(){
        scales.maxItemHeight = 100 * zoomFactor[zoomLevel.value].height;
        scales.maxShelfHeight = 120 * zoomFactor[zoomLevel.value].height;
        scales.minItemHeight = 50 * zoomFactor[zoomLevel.value].height;
        scales.minItemWidth = 16 * zoomFactor[zoomLevel.value].width;
    }

    const viewMap = reactive(new Map());
    viewMap
    .set('NotSelected', {
        ['Not Selected']: {category: 'Not Selected', useColour: true, useSection: true, useOrder: true, useHeight: true},
    })
    viewMap
    .set('Book', {
            ['BookID']: {sortMethod: '1', category: 'BookID', func: 'scaleSequential', scheme: 'interpolateYlGnBu', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Repository']: {sortMethod: 'A', category: 'Repository', useColour: false, useSection: true, useOrder: true, useHeight: false}, 
            ['Date of publication']: {sortMethod: '1', category: 'Date of publication', func: 'scaleSequential', scheme: 'interpolateRdYlBu', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Genre/Identity']: {sortMethod: 'A', category: 'Genre/Identity', func: 'scaleOrdinal', scheme: 'schemeSet3',useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Title']: {sortMethod: 'A', category: 'Title', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Author']: {sortMethod: 'A', category: 'Author', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Place of publication']: {sortMethod: 'A', category: 'Place of publication', func: 'scaleOrdinal', scheme: 'schemePaired',useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Size']: {sortMethod: '1', category: 'Size', func: 'scaleOrdinal', scheme: 'schemePaired',useColour: true, useSection: true, useOrder: true, useHeight: true},
            ['Book Notes']: {sortMethod: 'A', category: 'Book Notes', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Print or manuscript']: {sortMethod: 'A', category: 'Print or manuscript', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['STC or Wing']: {sortMethod: 'A', category: 'STC or Wing', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Shelfmark']: {sortMethod: 'A', category: 'Shelfmark', useColour: false},
            ['Marginal Marks']: {sortMethod: 'A', category: 'Marginal Marks', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Book image/s']: {sortMethod: 'A', category: 'Book image/s', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Number of marks']:  {sortMethod: '1', category: 'Number of marks', func: 'scaleSequential', scheme: 'interpolatePlasma', useColour: true, useSection: true, useOrder: true, useHeight: true},
            ['Number of book images']: {sortMethod: '1', category: 'Number of book images', func: 'scaleSequential', scheme: 'interpolateCool', useColour: true, useSection: true, useOrder: true, useHeight: true},
    })
    viewMap
    .set('Agent', {
            ['FemaleAgentID']: {sortMethod: '1', category: 'FemaleAgentID', func: 'scaleSequential', scheme: 'interpolatePuRd', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Female agent name']: {sortMethod: 'A', category: 'Female agent name', useColour: false, useSection: false, useOrder: true, useHeight: false}, 
            ['Female agent date']: {sortMethod: '1', category: 'Female agent date', func: 'scaleSequential', scheme: 'interpolateSpectral', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Female agent bio']: {sortMethod: 'A', category: 'Female agent bio', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Number of marks']: {sortMethod: '1', category: 'Number of marks', func: 'scaleSequential', scheme: 'interpolateBuPu', useColour: true, useSection: true, useOrder: true, useHeight: true},
    })
    viewMap
    .set('Mark', {
            ['MargID']: {sortMethod: '1', category: 'MargID', func: 'scaleSequential', scheme: 'interpolateRdPu', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Notes']: {sortMethod: 'A', category: 'Notes', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Ownership type']: {sortMethod: 'A', category: 'Ownership type', func: 'scaleOrdinal', scheme: 'schemeSet1', useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Distribution']: {sortMethod: 'A', category: 'Distribution', func: 'scaleOrdinal', scheme: 'schemePastel1', useColour: true, useSection: false, useOrder: false, useHeight: false},
            ['Female agent status']: {sortMethod: 'A', category: 'Female agent status', func: 'scaleOrdinal', scheme: 'schemeSet1', useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Annotation type']: {sortMethod: 'A', category: 'Annotation type', func: 'scaleOrdinal', scheme: 'schemeSet2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Location sig. ; p. ; pp.']: {sortMethod: 'A', category: 'Location sig. ; p. ; pp.', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Recording type']: {sortMethod: 'A', category: 'Recording type', func: 'scaleOrdinal', scheme: 'schemeSet2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Transcription']: {sortMethod: 'A', category: 'Transcription', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Mark type (Mark of?)']: {sortMethod: 'A', category: 'Mark type (Mark of?)', func: 'scaleOrdinal', scheme: 'schemeTableau10', useColour: true, useSection: true, useOrder: true, useHeight: false},
            ['Images of marginal mark']: {sortMethod: 'A', category: 'Images of marginal mark', useColour: false, useSection: false, useOrder: false, useHeight: false},
            ['Class']: {sortMethod: 'A', category: 'Class', func: 'scaleOrdinal', scheme: 'schemeAccent',useColour: false , useSection: false, useOrder: false, useHeight: false},
            ['Position on page']: {sortMethod: 'A', category: 'Position on page', func: 'scaleOrdinal', scheme: 'schemeSet3',useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Location other']: {sortMethod: 'A', category: 'Location other', func: 'scaleOrdinal', scheme: 'schemeSet3',useColour: true, useSection: false, useOrder: false, useHeight: false},
            ['Added text type']: {sortMethod: 'A', category: 'Added text type', func: 'scaleOrdinal', scheme: 'schemeAccent',useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Drawing type']: {sortMethod: 'A', category: 'Drawing type', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Graffiti type']: {sortMethod: 'A', category: 'Graffiti type', func: 'scaleOrdinal', scheme: 'schemeDark2', useColour: true, useSection: false, useOrder: true, useHeight: false},
            ['Agent role']: {sortMethod: 'A', category: 'Agent role', func: 'scaleOrdinal', scheme: 'schemeAccent',useColour: true},
            ['Other notes']: {sortMethod: 'A', category: 'Other notes', useColour: false, useSection: false, useOrder: false, useHeight: false},
    })

    const filterMap = reactive(new Map());
    filterMap
  .set('Book', {
        //   ['BookID']: [],
          ['Repository']: [], 
          ['Date of publication']: [], 
          ['Genre/Identity']: [],
          ['Title']: [],
          ['Author']: [],
          ['Place of publication']: [],
          ['Size']: [],
        //   ['Book Notes']:[],
        //   ['Print or manuscript']: [],
        //   ['STC or Wing']: [],
          ['Shelfmark']: [],
        //   ['Marginal Marks']: [],
        //   ['Book image/s']: [],
          ['Number of marks']: [],
          ['Number of book images']: [],
  })
  filterMap
  .set('Agent', {
        //   ['FemaleAgentID']: [],
          ['Female agent name']: [], 
          ['Female agent date']: [], 
        //   ['Female agent bio']: [],
          ['Number of marks']: [],
  })
  filterMap
  .set('Mark', {
        //   ['MargID']: [],
        //   ['Notes']: [],
          ['Ownership type']: [],
          ['Distribution']: [],
          ['Female agent status']: [],
          ['Annotation type']: [],
          ['Location sig. ; p. ; pp.']: [],
          ['Recording type']: [],
          ['Transcription']: [],
          ['Mark type (Mark of?)']: [],
        //   ['Images of marginal mark']: [],
        //   ['Class']: [],
          ['Position on page']: [],
          ['Location other']: [],
          ['Added text type']: [],
          ['Drawing type']: [],
          ['Graffiti type']: [],
          ['Agent role']: [],
        //   ['Other notes']: [],
  })


    // FILTERED MAP ADJUSTMENTS //
    // TO be deleted - Believe ViewDesigner is the only component relying on this.
    const colourMapFiltered = reactive(new Map());
    const colourMapTemp = new Map(categoryMap)

    const bookColour = viewMap.get('Book')
    const agentColour = viewMap.get('Agent')
    const markColour = viewMap.get('Mark')

    const bookFilter = JSON.parse(JSON.stringify(colourMapTemp.get('Book')))
    const agentFilter = JSON.parse(JSON.stringify(colourMapTemp.get('Agent')))
    const markFilter = JSON.parse(JSON.stringify(colourMapTemp.get('Mark')))

        Object.keys(bookFilter)
        .forEach(key => { if (!bookColour[key].useColour) delete bookFilter[key] })
        Object.keys(agentFilter)
        .forEach(key => { if (!agentColour[key].useColour) delete agentFilter[key] })
        Object.keys(markFilter)
        .forEach(key => { if (!markColour[key].useColour) delete markFilter[key] })


    colourMapFiltered.set('Book', bookFilter)
    colourMapFiltered.set('Agent', agentFilter)
    colourMapFiltered.set('Mark', markFilter)

    // Standard Views //
    const agentsView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Agent",
            id: 'FemaleAgentID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
        },
        viewType: {
            id: 'Agent',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Agent',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })
    const exploreView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const marksView = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Mark",
            id: 'MargID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Mark',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Mark ',
            queryBreadcrumb: '',
            libraryTypeTitle: 'The Marks',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    
    //View Query Configurations //
    
    // How many agents are in the collection? 
    const agentsInCollection = ({
        //Query - How Many Agents In Collection?
        view: {
            itemType: "Agent",
            id: 'FemaleAgentID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Female agent status',
        },
        viewType: {
            id: 'Agent',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: 'How many agents are in the collection ?',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'in the libraries',
        }
    })
    const agentsYearsMade = ({
        //Query - What years did each agent make their marks?
        view: {
            itemType: "Agent",
            id: 'FemaleAgentID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Female agent status',
        },
        viewType: {
            id: 'Agent',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Agents ',
            queryBreadcrumb: 'How many agents are in the collection ?',
            libraryTypeTitle: 'The Agents',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksTheyRead = ({
        //Query - What Kinds of Books did people read?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Genre/Identity', //Secondary sort
            height: 'Size',
            colour: 'Size',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: 'What kinds of books did people read ?',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksLibraryofLibraries = ({
        //Query - Where can you find the books today?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Repository', //Primary sort
            bookend: 'Date of publication', //Secondary sort
            height: 'Number of marks',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Book',
            shelf: 'Book',
            bookend: 'Book',
            height: 'Book',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: 'Where can you find the books today ?',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const booksYearsPublished = ({
        //Query - What years were the books published?
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Genre/Identity', //Secondary sort
            height: 'Size',
            colour: 'Size',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
        },
        pageText: {
            queryType: 'Books ',
            queryBreadcrumb: 'What kinds of books did people read ?',
            libraryTypeTitle: 'The Books',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const marksTheyMade = ({
        //Query - What Kinds of Books did people read?
        view: {
            itemType: "Mark",
            id: 'MargID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Number of marks',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Mark',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'Book',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Marks ',
            queryBreadcrumb: 'What types of marks did each agent make ?',
            libraryTypeTitle: 'The Marks',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const marksHowMany = ({
        //Query - How many marks did each agent make?
        view: {
            itemType: "Mark",
            id: 'MargID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Number of marks',
            colour: 'Mark type (Mark of?)',
        },
        viewType: {
            id: 'Mark',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'Book',
            colour: 'Mark',
        },
        pageText: {
            queryType: 'Marks ',
            queryBreadcrumb: 'What types of marks did each agent make ?',
            libraryTypeTitle: 'The Marks',
            libraryTypeSubtitle: 'in the libraries',
        }
    })

    const articleVisual = ({
            name: 'visual',
            totalSections: 1,
            sections: ['graffiti'],
            sectionViews: [
                {   view: {
                    itemType: "Mark",
                    id: 'MargID',
                    shelf: 'Graffiti type', //Primary sort
                    bookend: 'Graffiti type', //Secondary sort
                    height: 'Not Selected',
                    colour: 'Graffiti type',
                },
                viewType: {
                    id: 'Mark',
                    shelf: 'Mark',
                    bookend: 'Mark',
                    height: 'NotSelected',
                    colour: 'Mark',
                },
                pageText: {
                    queryType: 'Mark ',
                    queryBreadcrumb: '',
                    libraryTypeTitle: 'The Marks',
                    libraryTypeSubtitle: 'in the libraries',
                },
                zoom: {
                    zoomLevel: '50'   
                },
                articleFilter: {
                    useFilter: true,
                    itemType: "Mark",
                    category: 'Mark type (Mark of?)',
                    option: 'Graffiti'
                }}
            ]
    })
    
    const article_VISUAL = ref({
        articleTitle: 
            {
                subHeading: "A Definition of Graffiti:",
                subHeadingContent: "The database uses the term graffiti for a range of marks that are primarily visual in nature, consisting of images, pasted material, object traces, letter practice, doodles, smudges and stains.",
                heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_1.png",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -6,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -35,
                    scale: 0.9
                }
            },
        articleContent:[
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_1.png"
                    ,
                    caption: "RCIN 1051956 Psaultier de David, Royal Collection Trust, Windsor Castle Royal Library, Windsor"
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_2.png"
                    ,
                    caption: "Figure 1, from Marcello Palnigenio Stellato's <i>The zodiake of life</i> (London, 1565), Bodleian Library, Douce P 584, sigs. N7r (left), B7r (right top), and E4v (right bottom)."
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Most scholarship on early modern women’s marginalia to date has concentrated on its verbal forms, yet women’s annotations also include visual marks or images of varying degrees of legibility and complexity, ranging from stars and manicules, doodles, copies of typographical ornaments, drawings in pen and ink, and the insertion of images into texts through cutting and pasting. These visual forms, which we have grouped under the term ‘graffiti’, comprise an exciting and largely unexamined sub-corpus within early modern women’s marginalia, providing new evidence of how women read, how they saw their world, and how they used their books. Graffiti also illuminate how women engaged with formal categories of visual expression such as calligraphy, copying and drawing, with implications for our understanding of their education and their relationship to humanism. The collection of graffiti found in our database show how important both texts and images were to the ways in which women perceived and represented their worlds." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "graffiti",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Graffiti type', //Primary sort
                        bookend: 'Graffiti type', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Graffiti type',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'Mark',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {
                        queryType: 'Mark ',
                        queryBreadcrumb: '',
                        libraryTypeTitle: 'The Marks',
                        libraryTypeSubtitle: 'in the libraries',
                    },
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        itemType: "Mark",
                        category: 'Mark type (Mark of?)',
                        option: 'Graffiti'
                    }}
                }
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "graffiti2",
                    sectionView: {   
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Graffiti type', //Primary sort
                        bookend: 'Mark type (Mark of?)', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Mark type (Mark of?)',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'Mark',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {
                        queryType: 'Mark ',
                        queryBreadcrumb: '',
                        libraryTypeTitle: 'The Marks',
                        libraryTypeSubtitle: 'in the libraries',
                    },
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        itemType: "Mark",
                        category: 'Mark type (Mark of?)',
                        option: 'Graffiti'
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "One important use of image in the margins has been to help readers note and highlight a feature of a text, allowing it to be more easily understood and remembered. Images such as stars and manicules (hands pointing to certain lines) are the most common forms of such visual marginalia, and they add the humanist concept of enargeia (vividness) to a reader’s interaction with the page, amplifying, decorating and ‘colouring-in’ texts not only with marks such as underlining but with images drawn from what the reader saw in the world around them. Women as well as men annotated their texts using such visual aids, as Mary Powntis’s manicules in a copy of The Zodiake of Life show. There are very few examples of women’s use of this kind of visual annotation, but they do exist, showing that women had access to elements of humanist annotation despite their exclusion from the all-male humanist schoolroom. Rather than strict segregation, women’s use of forms such as the manicule to annotate texts and to mark passages show how the education of men and women overlapped. Women as students and teachers can be found at the sixteenth-century schoolroom’s edges, and their levels of literacy and education increased throughout the seventeenth century." 
                    ,
                    "Some women, especially royalty, did receive a humanist education which included instruction in writing, drawing, painting, perspective and geometry. Again, we have very few traces of how royal women acquired and used these skills. One stunning exception is the drawing of an armillary sphere that faces a quatrain by the princess Elizabeth on the final pages of a Book of Hours, where a scroll beneath the image in Elizabeth’s distinctive italic hand contains a line from Petrarch’s Triumph of Death: ‘Miser é chi spemé in cosa mortal pone’ (Wretched is he who places hope in a mortal thing). It is impossible to know if Elizabeth drew this image or not, but her inscription means that across the opening image and text work together; the quatrain and its signature adhere to the armillary sphere, the book upon which it rests, and the line from Petrarch in Elizabeth’s hand. This is a collection of visual and verbal annotation to be circulated, a way in which the princess Elizabeth could signal her piety, her desire to be guided by the word of god rather than earthly things, as well as her spirited aversion to the damaging workings of the ‘inward suspicious minde’."
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_3.png"
                    ,
                    caption: "Emmerson Collection State Library Victoria, Melbourne, RAREEMM 322/21, Samuel Daniel, Certaine Poems (London,  on blank leaves inserted after sig. F6v)"
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_4.png"
                    ,
                    caption: "Emmerson Collection State Library Victoria, Melbourne, RAREEMM 322/21, Samuel Daniel, Certaine Poems (London,  on blank leaves inserted after sig. F6v)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "However, the majority of graffiti that we have attributed to women in the database take very different forms to these polished examples. On the title page of a 1623 copy of the Arcadia held in the Bodleian library, the half-cropped signature of Elizabeth Duke is accompanied by a set of marks that include looping lines, dashes, and blots. This kind of inchoate mark is very commonly encountered, especially on flyleaves, endpages, paste downs and title pages. Often appearing as scribble, closer inspection can reveal women’s names, accompanied by letter practice and pen trials, as well as doodles. While such doodles can often seem to indicate inattention, often they constitute the shape-forming that was a building block of learning to write, or they take their cues from the visual world of the book, copying typography, ornaments or images from its pages. Sometimes a cluster of marks contains all of these elements as well as what may be original drawing.  In a copy of Samuel Daniel’s Certaine Poems, we can see the name of Elizabeth Court, surrounded by swooping circles that were a form of letter practice, as well as a circular inscription of the Lord’s Prayer in Court’s hand, and partial and complete drawings of a dog, less easy to attribute." 
                    ,
                    "Around 7% of our database comprises graffiti, but images are far more difficult to attribute to women agents than textual marginalia, where hands can be matched. When a volume has a single woman marginalist, images can be attributed to that woman as probable; but far more commonly images and doodles appear on pages with multiple hands and can only be attributed as possible through proximity or the incorporation of textual elements. Object traces, smudges and stains, while no doubt caused by women users and readers of books, are almost impossible to attribute. So while we can trace graffiti to women only occasionally, it is likely that women contributed in far greater numbers to the pages of pen trials, letter practice, doodles and drawing than we can demonstrate."
                    ]
            }
        ]
    })
    
    const articleComponentRoutes = reactive({
        womenagents: article_VISUAL,
        ownership: article_VISUAL,
        reading: article_VISUAL,
        recording: article_VISUAL,
        visual: article_VISUAL,
        attribution: article_VISUAL,
        typesofbook: article_VISUAL,
        locations: article_VISUAL,
        repositories: article_VISUAL
    })

    const viewRouteQueries = reactive({
        agents: agentsView,
        books: booksView,
        marks: marksView,
        searchView: exploreView,
        agent01: agentsInCollection,
        agent02: agentsYearsMade,
        book01: booksTheyRead,
        book02: booksLibraryofLibraries,
        book03: booksYearsPublished,
        mark01: marksTheyMade,
        mark02: marksHowMany,
    })

    //Objects passed to Components 
    const libraryItemBundle = computed (() => {
        return {
            Agent: {
                labelViewMode: 'agentLabel',
                menuHeader: 'Agent No.',
                menuSubheader: 'Female agent name',
                ownProp1: 'FemaleAgentID',
                ownProp2: 'Female agent bio',
                ownProp3: 'Number of marks',
                collectionProp1: 'agentCollectionProp1',
                collectionProp2:'agentCollectionProp2',
                viewProp1: 'height',
                viewProp2: 'colour',
                viewProp3: 'shelf',
                viewProp4: 'bookend',
                itemType: 'Agent',
                yourCollectionFunction(item) { return addToCollection(item)}, //Method property shorthand
                yourCollectionText: 'Add to Collection',
            },
            Book: {
                labelViewMode: 'bookLabel',
                menuHeader: 'Book No.',
                menuSubheader: 'Shelfmark',
                ownProp1: 'BookID',
                ownProp2: 'Author',
                ownProp3: 'Date of publication',
                collectionProp1: 'bookCollectionProp1',
                collectionProp2:'bookCollectionProp2',
                viewProp1: 'height',
                viewProp2: 'colour',
                viewProp3: 'shelf',
                viewProp4: 'bookend',
                itemType: 'Book',
                yourCollectionFunction(item) { return addToCollection(item)}, //Method property shorthand
                yourCollectionText: 'Add to Collection',
            },
            Mark: {
                labelViewMode: 'markLabel',
                menuHeader: 'Mark No.',
                menuSubheader: 'Transcription',
                ownProp1: 'MargID',
                ownProp2: 'Distribution',
                ownProp3: 'Female agent status',
                collectionProp1: 'markCollectionProp1',
                collectionProp2:'markCollectionProp2',
                viewProp1: 'height',
                viewProp2: 'colour',
                viewProp3: 'shelf',
                viewProp4: 'bookend',
                itemType: 'Mark',
                yourCollectionFunction(item) { return addToCollection(item)}, //Method property shorthand
                yourCollectionText: 'Add to Collection',
            }
        }
    })


    let colourBundle = JSON.parse(JSON.stringify(libraryItemBundle.value))
    Object.keys(colourBundle).forEach((key) =>{
        colourBundle[key].labelViewMode = 'colour';
        colourBundle[key].yourCollectionFunction = addToCollection; //Re-assignment required after object is stringified.
    })

    //Bundle Object passed to Components
    const viewColourItemBundle = computed (() => {
        return colourBundle;
    })

    const viewEditItemBundle = computed (() => {
        return libraryItemBundle.value
    })


    
    let shelfBundle = JSON.parse(JSON.stringify(libraryItemBundle.value))
    Object.keys(shelfBundle).forEach((key) =>{
        shelfBundle[key].yourCollectionFunction = removeFromCollection; //Method assignment expression
        shelfBundle[key].yourCollectionText = 'Remove from Collection';
    })
    
    //Bundle Object passed to Components
    const yourCollectionItemBundle = computed (() => {
        return shelfBundle;
    })



    console.log(yourCollectionItemBundle)
    // console.log(categoryMap)
    // console.log(colourMap)

      return {  
                zoomFactor,
                zoomLevel,
                categoryMap, 
                invCategoryMap, 
                viewMap, 
                filterMap,
                colourMapFiltered, 
                scales, 
                scalesStandard,
                viewRouteQueries,
                libraryItemBundle, 
                yourCollectionItemBundle,
                viewEditItemBundle,
                viewColourItemBundle,
                itemModalMap,
                windowHeight,
                windowWidth,
                topViews,
                topViewsList,
                articleComponentRoutes,
                updateScales
            }
  })


// Template

//   colourMap
//   .set('Book', {
//           ['BookID']: '',
//           ['Repository']: '', 
//           ['Date of publication']: '', 
//           ['Genre/Identity']: '',
//           ['Title']: '',
//           ['Author']: '',
//           ['Place of publication']: '',
//           ['Size']: 'schemePaired',
//           ['Book Notes']:'',
//           ['Print or manuscript']: '',
//           ['STC or Wing']: '',
//           ['Shelfmark']: '',
//           ['Marginal Marks']: '',
//           ['Book image/s']: '',
//           ['Number of marks']: '',
//           ['Number of book images']: '',
//   })
//   colourMap
//   .set('Agent', {
//           ['FemaleAgentID']: '',
//           ['Female agent name']: '', 
//           ['Female agent date']: '', 
//           ['Female agent bio']: '',
//           ['Number of marks']: '',
//   })
//   colourMap
//   .set('Mark', {
//           ['MargID']: '',
//           ['Notes']: '',
//           ['Ownership type']: '',
//           ['Distribution']: '',
//           ['Female agent status']: '',
//           ['Annotation type']: '',
//           ['Location sig. ; p. ; pp.']: '',
//           ['Recording type']: '',
//           ['Transcription']: '',
//           ['Mark type (Mark of?)']: '',
//           ['Images of marginal mark']: '',
//           ['Class']: 'Class',
//           ['Position on page']: '',
//           ['Location other']: '',
//           ['Added text type']: '',
//           ['Drawing type']: '',
//           ['Graffiti type']: '',
//           ['Agent role']: '',
//           ['Other notes']: '',
//   })