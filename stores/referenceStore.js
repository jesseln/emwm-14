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
        ['Drawing']: {},
        ['Graffiti']: {},
        ['Attribution']: {},
        ['Types of book']: {},
        ['Locations']: {},
        ['Repositories']: {},
        ['Librarians']: {},
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

                {name: 'Drawing', linkName: 'drawing',
                imageFolder: 'mark-images',
                itemID:'21',
                itemImage: {name:'MargID_21_(1_of_1).jpg'},
                class: 'topViewClassDrawing'},

                {name: 'Graffiti', linkName: 'graffiti',
                imageFolder: 'mark-images',
                itemID:'227',
                itemImage: {name:'MargID_227_(1_of_4).jpg'},
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

                {name: 'Librarians', linkName: 'librarians',
                imageFolder: 'book-images',
                itemID:'31',
                itemImage: {name:'BookID_31_(1_of_6).jpg'},
                class: 'topViewClassLibrarians'},
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

    const article_DRAWING = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Visual marks such as illustrations, copies of ornaments and typography, manicules, stars and flowers as marks of emphasis, pasted images.",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/21/MargID_21_(1_of_1).jpg",
                heroImage: "",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -0.9,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -8,
                    scale: 1.3
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [
                    "Most scholarship on early modern women’s marginalia to date has concentrated on its verbal forms, yet women’s annotations also include visual marks or images of varying degrees of legibility and complexity, ranging from stars and manicules, doodles, copies of typographical ornaments, drawings in pen and ink, and the insertion of images into texts through cutting and pasting. These visual forms comprise an exciting and largely unexamined sub-corpus within early modern women’s marginalia, providing new evidence of how women read, how they saw their world, and how they used their books. Visual marks also illuminate how women engaged with formal categories of visual expression such as calligraphy, copying and drawing, with implications for our understanding of their education and their relationship to humanism. The drawings found in our database show how important both texts and images were to the ways in which women perceived and represented their worlds." 
                    ,
                    "One important use of image in the margins has been to help readers note and highlight a feature of a text, allowing it to be more easily understood and remembered. Images such as stars and manicules (hands pointing to certain lines) are the most common forms of such visual marginalia, and they add the humanist concept of <i>enargeia</i> (vividness) to a reader’s interaction with the page, amplifying, decorating and ‘colouring-in’ texts not only with marks such as underlining but with images drawn from what the reader saw in the world around them. Women as well as men annotated their texts using such visual aids, as Mary Powntis’s manicules in a copy of <i>The Zodiake of Life</i> show. There are very few examples of women’s use of this kind of visual annotation, but they do exist, showing that women had access to elements of humanist annotation despite their exclusion from the all-male humanist schoolroom." 
                    ]
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
                    "Rather than strict segregation, women’s use of forms such as the manicule to annotate texts and to mark passages show how the education of men and women overlapped. Women as students and teachers can be found at the sixteenth-century schoolroom’s edges, and their levels of literacy and education increased throughout the seventeenth century." 
                    ,
                    "Some women, especially royalty, did receive a humanist education which included instruction in writing, drawing, painting, perspective and geometry. Again, we have very few traces of how royal women acquired and used these skills. One stunning exception is the drawing of an armillary sphere that faces a quatrain by the princess Elizabeth on the final pages of a <i>Book of Hours</i>, where a scroll beneath the image in Elizabeth’s distinctive italic hand contains a line from Petrarch’s <i>Triumph of Death</i>: ‘Miser é chi spemé in cosa mortal pone’ (Wretched is he who places hope in a mortal thing)." 
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_1.png"
                    ,
                    caption: "RCIN 1051956 Psaultier de David, Royal Collection Trust, Windsor Castle Royal Library, Windsor"
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "It is not known if Elizabeth drew this image or not, but her inscription means that across the opening image and text work together; the quatrain and its signature adhere to the armillary sphere, the book upon which it rests, and the line from Petrarch in Elizabeth’s hand. This is a collection of visual and verbal annotation to be circulated, a way in which the princess Elizabeth could signal her piety, her desire to be guided by the word of god rather than earthly things, as well as her spirited aversion to the damaging workings of the ‘inward suspicious minde’." 
                    ,
                    "Visual forms can combine text and image in other ways. A copy of Samuel Daniel’s Certaine Small Poems contains the signature of Elizabeth Court, practised with exaggerated circles common in writing manuals. The same hand writes a tiny, circular Pater Noster in the corner of this page opening, a mechanism for meditating upon and digesting the prayer in the act of writing." 
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/article-images/visual/visual_5.png"
                    ,
                    caption: "Samuel Daniel, Certaine small poems lately printed : with, The tragedie of Philotas (London, 1605), blank leaves inserted after sig. F6v."
                }
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Drawing type', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Female agent date',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Agent',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '100'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Mark type (Mark of?)',
                                option: 'Drawing'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                         "Rosalind Smith"
                    ]
            },

        ]
    })
    const article_GRAFFITI = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Marks, visual and verbal, that do not record information nor register ownership, reading, recording or drawing, such as scribble, handwriting practice, doodles, blots, stains and smudges.",
                heroImage: "",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/227/MargID_227_(1_of_4).jpg",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -43,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -35,
                    scale: 0.41
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [
                    "Early modern books often contain marks that appear to be incomprehensible scribble, consisting of doodles, pen trials, letter and handwriting practice and other kinds of mark that cannot be classified as marks of ownership, annotation, recording or drawing. Women’s names can be embedded in these networks of marks, indicating that such apparently random and inchoate forms were part of their marginal practice. It is occasionally possible to link a name and hand across different forms of graffiti, particularly in densely inscribed pastedowns, fly leaves and endpapers. Letter practice can lead into practice writing an agent’s name, for example, or an identifiable pen can be used to make shapes and doodles alongside letters and words." 
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/227/MargID_227_(1_of_4).jpg"
                    ,
                    caption: "Marginalia by Hannah Aynsworth, in Samuel Rutherford, A free disputation against pretended liberty of conscience (London, 1649), rear endpaper."
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "These marginalia allow us to glimpse new kinds of book users, including women and girls: the non-elite, obscure and unknown, sometimes identifiable only through a first name. The lack of context and information about such book users presents interpretative challenges, forcing us to analyse their marginalia as texts and to widen our definitions of marginalia to include marks by agents who might be ‘letterate’ – able to make letters and some words - rather than highly literate readers and annotators in the humanist tradition such as Gabriel Harvey." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Visualisation of early modern women’s graffiti, Sorted against location in book and Colour Coded by Graffiti type",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Location sig. ; p. ; pp.', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Graffiti type',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Mark type (Mark of?)',
                                option: 'Graffiti'
                            },
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Rosalind Smith" 
                    ]
            },
        ]
    })

    const article_WOMENAGENTS = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "The historical woman subject involved in creating a marginal mark",
                heroImage: "",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/625/MargID_625_(1_of_1).JPG",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -11,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -10,
                    scale: 0.65
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [
                    "The Library of Early Modern Women’s Marginalia uses the term agent rather than author in order to capture the range of roles – authorial and extra-authorial – women took up as marginalists. These include book owner, book user, reader, translator, editor, writer, artist and student. This expanded range of roles means that our database uncovers many women marginalists from non-elite, or below gentry, backgrounds, about whom little biographical information exists, as well as revealing the extent to which some elite women annotated their books, collecting multiple examples of marginalia across volumes and repositories." 
                    ,
                    "We include the same information for every agent in the database. This includes name, in the format of first name followed by surname if provided, and the number of marks that agent made. The majority of agents in the database only have one marginal mark associated with them, although some outliers, such as Isabella Hervey, left evidence of over a hundred and eighty separate marginal marks." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Figure 1: Visualisation of agent name and number of marginal marks, sized by number of marks in books and coloured by ownership type",
                    sectionView: {
                        view: {
                        itemType: "Agent",
                        id: 'FemaleAgentID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Number of marks', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Ownership type',
                    },
                    viewType: {
                        id: 'Agent',
                        shelf: 'NotSelected',
                        bookend: 'Agent',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Because the project team has collected marginalia from over a hundred repositories, we have been able to gather evidence about women agents who annotated more than one book. One of the exciting findings of our project has been reconstructing the libraries of women who might have owned a handful of books which have now been dispersed across the globe. Most of these women are unknown, but their small libraries allow us to better understand the number and kind of books non-elite women might have owned or had access to, as well as how they used these books. Anne Tempe, for example, owned two books related to the English civil war: an historical tract by the parliamentarians, John Wittewrong’s <i>The copy of a letter from Alisbury</i> (London, 1643) and a sermon presented to the House of Commons, Edmund Calamy’s <i>Englands Antidote, against the plague of civil warre</i> (London, 1645). Mary Wentworth owned a copy of Edmund Spenser’s 1615 <i>The Faerie Queene</i>, held in the Shakespeare Birthplace Trust, and a 1679 copy of a sermon by Augustin Medcalf, now held across the Atlantic in the Folger Shakespeare library. Elizabeth Webb owned a copy of the 1613 <i>Book of Common Prayer</i> now held in Fisher Library at the University of Toronto, and Barnabe Rich’s <i>Rich his farewell to militarie</i> (London, 1594) also held in the Folger Shakespeare Library." 
                    ,
                    "The database also allows us to track the number of marks a woman made within a single book, showing that some women were active and varied marginalists and took up multiple roles in their annotations. We have also recorded instances when women gave or received a book as a gift, or where there is some other indication of their interaction with the book )for example as witness to a signature). Finally, if a marginal mark by a woman is dated, we record this as ‘Agent date’, to provide at least some information about the historical agent in our database. This might be some of the only information that we have about some of the marginalists in the archive. For women with known biographies, this category of Agent date can reveal when a book was purchased or claimed as part of a library. As the visualisation below shows, most dated records are ownership marks. However, women also occasionally dated their annotations, added text, graffiti and marks of recording, allowing marginalia to be linked to specific historical moments, political events and shifts in an agent’s personal circumstances." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "2",
                    sectionTitle: "Figure 2: Visualisation of Agent: number of marks, Agent date, Sized as Book-number of marks in book and coloured as Type of Mark",
                    sectionView: {   
                        view: {
                        itemType: "Agent",
                        id: 'FemaleAgentID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Female agent date', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Mark type (Mark of?)',
                    },
                    viewType: {
                        id: 'Agent',
                        shelf: 'NotSelected',
                        bookend: 'Agent',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Rosalind Smith" 
                    ]
            },
        ]
    })

    const article_OWNERSHIP = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Marginal forms showing an agent’s possession of a text, from ownership of the text as property to more temporary and contingent claims. Ownership marks include signature, ‘her book’, dedications, armorial bindings, ciphers and bookplates, and in our database can include any additional details such as price and date of purchase.",
                heroImage: "",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/47/MargID_47_(2_of_2).jpg",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -1,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -20,
                    scale: 1.2
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [
                    "By far the most commonly encountered marginalia by early modern women in print and manuscript texts are marks of ownership, making up around 80% of the database." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Visualisation of types of marks according to ownership, annotation, recording, graffiti",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Mark type (Mark of?)', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Distribution',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "These marks can take a surprising variety of forms. The simplest of such forms is signature. Women very often signed their name on the front pastedown, flyleaves or title page of books to denote ownership or possession. Such signatures often are located on a page with the signatures of other agents, names which can be crossed out to indicate a shift in circumstances surrounding the property of the book. Women also placed their names on title pages in ways that showed an interest in foregrounding their identities as book owners alongside the other categories of naming found there: author, editor, translator and publisher. They frequently placed their name under that of the author, copying the spacing and layout of the title page. Women also signed the covers of their books and the foredges." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "2",
                    sectionTitle: "Visualisation of Ownership marks and location on page",
                    sectionView: {   
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Position on page', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Ownership type',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Mark type (Mark of?)',
                                option: 'Ownership'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Signatures were usually in the author’s hand and can be compared to other marginal annotations in a volume in order to make attributions. However, especially in the second half of the seventeenth century, as print writing manuals proliferated and calligraphy became a popular practice, women began to sign their books in ways that showcased the mastery of particular hands or imitated other book parts, such as frontispieces:" 
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/245/MargID_245_(3_of_8).jpg",
                    caption: "Anne Paule Transcription (Woman Agent: ID 231)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Women practised their signatures and writing their names, and part or full signatures as well as initials can often be found throughout a book. When located in the margins next to textual passages, such signatures can be evidence of reading, usually when initials mark a significant section of text for a reader. However, it is much more common to find signatures on the blank spaces in a book, singly or repeated in part or whole many times, which indicates the use of available paper to practice writing. Signatures immediately following the end of a text can be a declaration of reading, indicating that the text has been read to completion. End papers and blanks within books often contain partial signatures or signature practice among other marks such as letter practice, again indicating practices of book use rather than statements of ownership." 
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "3",
                    sectionTitle: "Visualisation of ownership mark and location in book",
                    sectionView: {   
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Location sig. ; p. ; pp.', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Ownership type',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Mark type (Mark of?)',
                                option: 'Ownership'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "At the other end of the spectrum, signatures accompanied by the phrase “her book“ are the most emphatic statements of book ownership that we have. Around 20% of the signatures in the database are accompanied by this phrase. Other details accompanying these statements of book ownership include dates, places and even the price of the book; standalone signatures also can contain details of place and date, leading Jason Scott-Warren to associate them with graffiti, an early modern way of marking “I was here.”" 
                    ,
                    "Recent work in marginalia studies has expanded what the category consists of, to include traces of objects left in books, such as scissors and spectacles, pasted insertions, and even fragments of plant material woven into the surface of the page. Within the category of marginalia denoting ownership, pasted bookplates also can be thought of as marginalia. Early bookplates were usually armorial, but some, such as that of the book collector John Evelyn, were designed around his initials. Below are the bookplates of Frances Currer and the armorial binding of Elizabeth Grey, Countess of Kent: both forms of ownership mark that manipulate the materials of the book to stake their claims." 
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/245/MargID_742_(1_of_3).JPG",
                    caption: "Bookplates of Frances Currer"
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/245/MargID_742_(1_of_3).JPG",
                    caption: "Elizabeth Grey, Countess of Kent"
                }
            },
            {
                type: "paraSection",
                content: 
                    [
                    "Rosalind Smith" 
                    ]
            },
        ]
    })

    const article_READING = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Marks of active reading including comment, underlining, emphasis, symbol (such as flowers, crosses, dots, even the imprint of a nail) and marks indicating revision, correction and translation.",
                heroImage: "",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/372/MargID_372_(2_of_2).jpeg",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -40,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -35,
                    scale: 0.4
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "Marginalia is a rich resource for tracing women’s reading practices, showing what interested them, what they wanted to emphasise and remember, how they made connections between texts, and how they altered texts to increase their comprehension or the text’s clarity. However, marks of active reading are often difficult to associate with a specific agent, as books bear the traces of many readers, and the marks that indicate reading are often not in the letter forms that allow marginalia to be matched to signatures and associated with a woman agent. This is particularly difficult for marks such as the indentation of a nail, which women and children were encouraged to make before, or in lieu of, acquiring skill in penmanship. The database does provide examples of women’s active reading, which constitute just over 20% of all marks found. At one end of the spectrum are marginalia by elite women readers such as Lady Anne Clifford, who not only recorded when and where she ‘read over’ her books but also intensively underlined and marked passages as she read. The project has also found less well known, and possibly non-elite women reading in similar active ways. Mary Powntis annotates her copy of <i>The Zodiake</i> with manicules (images of a pointing hand) highlighting key passages, underlining and comments such as ‘note this’. She copies aphorisms from the text and adds new material in the style of the texts that she reads, demonstrating her familiarity with its forms and models."
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/309/MargID_309_(1_of_1).JPG",
                    caption: "Mary Powntis Annotation (Woman Agent: ID 277)"
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/311/MargID_311_(1_of_2).JPG",
                    caption: "Mary Powntis Annotation (Woman Agent: ID 277)"
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/314/MargID_314_(1_of_2).JPG",
                    caption: "Mary Powntis Annotation (Woman Agent: ID 277)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Other women marginalists mark passages with terms such as ‘Mind’, showing, for example for Anne Mansell, that particular lines from the sonnet sequence <i>Astrophil and Stella</i> are to be particularly noted. Other evidence of reading by women consists of the intertextual references that show readers connecting their texts with others. This practice occurs most frequently in religious treatises that are linked to passages in the Bible, and show women applying humanist models of textual comparison to their devotional reading. Where marginalia are positioned can also provide evidence of reading. For example, when Mary Queen of Scots places a quatrain of her poetry beneath an image of King David at prayer in her Book of Hours, she shows her understanding of David’s authority as a godly sovereign and the impact such an association will have upon her own writing as a sovereign. At such times, the line between textual addition and readerly annotation is blurred; the marginalia simultaneously denotes reading and writing."
                    ,                  
                    "Other examples of women’s reading are evident in the corrections, revisions and translations made in the hands of identifiable women agents. Again, these can be authorial, as in the corrections made by Margaret Cavendish or Lady Mary Wroth to their own texts in print and manuscript. Reading over a passage, they suggest improvements, revisions, or strategic emendations for local political effect. Translations of key words across a text also show women’s reading practices, as they render difficult or unfamiliar words into a first language."
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Visualisation of types of marks according to ownership, annotation, recording, graffiti",
                    sectionView: {
                        view: {
                        itemType: "Book",
                        id: 'BookID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Mark type (Mark of?)', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Date of publication',
                    },
                    viewType: {
                        id: 'Book',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Rosalind Smith"
                    ]
            },
        ]
    })

    const article_RECORDING = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Any textual mark recording information that is not related to the text, using the book as convenient paper stock for other, unrelated information. Marks of recording include accounts, prices of goods, lists of dates, calculations, recipes, poems and letters unrelated to the book’s contents.",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/48/MargID_48_(2_of_4).jpg",
                heroImage: "",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -2,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -4,
                    scale: 1.1
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "Recording is one of the less common forms of marginalia found in books, but there is a pattern in the kinds of records we do find. These records appear most often on blank frontpapers and titlepages, but have been found scribbled in the margins, or written next to pertinent passages of printed text related to the recorded information."
                    ,                 
                    "One form of recording found in extant early modern books, and certainly of the more formal kind, is family records. Most often, this includes the birth and/or death dates of family members, with some books including information such as marriage dates, and others appearing as larger family trees."
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/100/BookID_100_(2_of_6).jpg",
                    caption: "Image of family records from Bib. Eng. 1682 c.1 (1) (Book ID: 277)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Family records are most often found in large folio texts, mostly Bibles, and seem to be intended as a form of historical record for users of the text. The familial inheritance implied through the recording of family history in this way illuminates how books are used within communities of readers, and how important shared knowledge is within these groups. These self-contained archives can also be seen as an educative tool whereby descendents of the book owner who first recorded their family history can learn the names and dates related to important family members and events, and continue recording similar life events in the future."
                    ,                 
                    "Early modern book users also recorded when a book had been given, or gifted, to them. Gift records are an extension of ownership marks, where marginalists both identify themselves as the current owners of a volume, and the circumstances through which they came to own it. We see evidence of books passing from husbands to wives, mothers to daughters, fathers to daughters, and, of course, between friends."
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/100/BookID_100_(2_of_6).jpg",
                    caption: "Image of family records from Bib. Eng. 1682 c.1 (1) (Book ID: 277)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Similar to family records, gift records are useful as they help us to reconstruct women’s relationship to texts even if these books are not recorded as part of formal libraries, or bequeathed to women in wills. As we attempt to reconstruct lost, or overlooked, parts of early modern women’s history, this kind of marginalia is an important tool to help fill in gaps that more formal legal records may have left when it comes to books as women’s property."
                    ,                  
                    "Records of accounting also feature on the blank pages of books, though less often than other examples mentioned. These also fulfil an archival function as the marginalist makes a note of a transaction that is important for them to remember. Though she does not note what the sum refers to, Margaret Barnard, for example, recorded this in her Bible:"
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/357/MargID_357_(2_of_2).jpg",
                    caption: "Image of Barnard family bible 3052.cc.9 (4) (Book ID: 273)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "These marks are interesting to consider in terms of women’s education, where, when numeracy is mentioned as a subject learned by early modern women, it is often in terms of accounting. Most records of women’s dealings with accounting come from manuscript account books kept by early modern women, so these examples found in the margins indicate a perhaps less formal way of recording transactions, and the re-use of book pages within the home as paper to be written on during the early modern period."
                    ,                
                    "Recording is a more difficult form of marginalia to work with, as family records and accounts are often unsigned, and can be written in multiple hands. Despite family records, in particular, being listed by scholars as a common form of marginalia, less academic writing has been dedicated to them, possibly due to this attribution issue. There is a primer, for example, that has a written record of family death dates from the seventeenth century onwards, but as the only signatures that appear, of a Margaret and an Ann Acton, date from the eighteenth century, it is difficult to know who composed them:"
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/48/MargID_48_(4_of_4).jpg",
                    caption: "Image from Acton family primer Lawn f.158 (Book ID: 41)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Accounting has a similar issue, where lack of signatures means most examples are listed as ‘Possible’ instances of women’s marginalia on our database. This does not mean that these markings are insignificant; the potential for women’s involvement in this kind of recording is a worthy avenue of investigation in and of itself, and we often have examples of other forms of women’s book use in the same volumes. It does mean, however, that we must be careful when making generalisations about which forms of marginalia are ‘common’, and the role women may have in composing them. What we can get insight into from these examples, definitive attribution or not, is women’s role within literary communities and the implicit sharing of knowledge through the sharing of books, and by extension the marginalia contained within them."
                    ,                  
                    "Early modern women’s marginalia provide evidence for how women used their books as spaces for writing. Often overlooked in studies of marginalia, this is a rich source for women’s marks in books and ranges literary forms, such as poems in fair copy, to accounts and recipes. William Sherman coined the term the ‘matriarchive’ for such uses of the book as a compendium of resources, and marginalia studies more generally have begun to turn towards writing and away from reading in considerations of the manuscript and print elements of a book as synchronous and equal. Some of the most beautiful and historically significant marginalia in our database belongs to this category, including a suite of poems by Mary Queen of Scots added to her Book of Hours. Other women recorded family lineages in their bibles, and others added details of life events in the blank spaces of their books."
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Visualisation of marks of recording",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Recording type', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Female agent date',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Agent',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Mark type (Mark of?)',
                                option: 'Recording'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "The most common instance of recording across the database is the addition of fragments, lines and copied passages from other texts. This is also evidence of reading, although not always directly of the text at hand, and of the ways in which marginalists connected the texts they read through commonplacing. One of the most significant women book owners in the early modern period, Frances Wolfreston, adds poems excerpted from Francis Quarles’ books to her edition of x:"
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/100/BookID_100_(2_of_6).jpg",
                    caption: "Image of family records from Bib. Eng. 1682 c.1 (1) (Book ID: 277)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Hannah Upton"
                    ]
            },
        ]
    })


    const article_ATTRIBUTION = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Attribution is the process of ascribing of marginal marks to agents.",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/mark-images/80/MargID_80_(2_of_2).jpg",
                heroImage: "",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -6.5,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 4.8,
                    scale: 1.45
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "The majority of marginalia is anonymous. Unsigned, in hands that cannot be associated with specific authors, and in many cases taking the forms of underlining, crosses and other deictics, marginalia as a corpus is unusually difficult to attribute. There are three ways in which marginalia can be associated with an author."
                    ,                  
                    "The first is through signature. Early modern subjects often signed their books, on the front pastedown, fly leaves or title page, in blank spaces within the book, in the margins, or on the endpapers and pastedowns. These signatures, especially when accompanied by longer inscriptions that provide evidence of a broad range of distinctive letter forms, can be linked to other examples of handwriting in order to make attributions. If there is a single marginalist in a book, signature can be used to make reasonably stable attributions. When there are multiple hands, these attributions can be more tenuous, especially when there is a small amount of written material that can be used to compare letter forms and for visual forms such as stars and flowers that are not accompanied by text."
                    ,                   
                    "The second way in which an attribution can be made is when a marginalist has a distinctive, known hand. This is the case for famous marginalists such as Gabriel Harvey, and for women who frequently annotated their books in a distinctive style, such as Anne Clifford. Her copy of Sir Philip Sidney’s <i>Arcadia</i> is not signed, but contains an opening epigraph which is distinctively hers because of its detail of where and when she read the book over, the nature of her annotations, and even the ochre colour of their ink. Opposite the title page is a note that reads; “I beegane to ourloke this booke the 18 of Febuarary and I did make an ende of reding, or ouer loking itt all ouer the first of Marche folloinge 1638.”"
                    ]
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/100/BookID_100_(2_of_6).jpg",
                    caption: "Image of family records from Bib. Eng. 1682 c.1 (1) (Book ID: 277)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "The rest of the book is marked on almost every page in a highly distinctive style that aligns with other marginalia by Clifford across a number of texts which she owned."
                    ,                  
                    "Attributions can also be made through contextual information. Gift inscriptions can identify a writer even if they are unsigned. A daughter might sign and date a text in ways that allow us to identify her marginalia: ‘This book was giuen to me by my father the Bishop of Worcester 1646’ ; or a gift inscription might then be linked to other initials in a text that allow an attribution."
                    ,                
                    "Certain kinds of marginalia are easier to attribute than others. Signatures can be relatively securely attributed to women authors, although there are examples where another agent (such as a scribe or a family member) adds a woman’s name to a text. Some annotations, especially if signed, accompanied by initials, or in a hand linked to a signature elsewhere in the volume, can be made with relative security. Visual forms, from small stars, crosses and circles in the margin to elaborate drawings, are more difficult to associate with a specific agent. Occasionally, such forms contain an element of text that can be linked to other handwriting in a volume, but it is always possible that these textual elements could be added to an illustration by another agent."
                    ,                   
                    "For our database of early modern women’s marginalia, this creates unavoidable biases. The easiest material to attribute to women – ownership marks – make up 80% of the database. Annotations, marks of recording and graffiti (drawings, doodles, scribble) each constitute around 7% of the database. But it is important to understand that these figures represent the marginalia that can be attributed to women, not marginalia by women. The majority of marginalia that we encounter in texts is anonymous and cannot be attributed to any known agent, male or female."
                    ]
            },           
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "A visual breakdown of Certain, Probable and Possible across the database.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Female agent status', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Mark type (Mark of?)',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Mark',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "<b>In order to mitigate these biases while still identifying marginalia by women, the database allows attributions to be made across a sliding scale: Certain, Probable and Possible.</b> In the case of ‘Jane Smith her booke’, the attribution is Certain. If there is other marginalia that is very clearly in the same handwriting, that would also be Certain.If there is only one signature in a book—a woman’s signature—and the handwriting styles are not clearly different, we can attribute all the other marginalia in that book as ‘possibly’ or ‘probably’ by the woman listed. If the other annotations in the book are something non-textual, such as pen trials or underlining, then we would add it as a marginal mark but deem it Possible.If there are multiple signatures in the book, for example Jane Smith and a few other male signatures, a higher burden of proof is required, as we know many people used the book. If the hand of the female signature clearly matches annotations in the rest of the book, then we can use Certain or Probable. If the hands of that other marginalia do not match, we do not include it. If the other marginalia is non-textual, for example underlining, pen trials, or notes so short that we cannot match handwriting styles, then these are not included, as we have no proof that they are by the woman and not by one of the male annotators. Attribution is particularly challenging for marks such as scribble, pen trials, letter practice and smudges and stains. These are included when they are proximate to other marginal marks clearly ascribed to a woman agent and in a similar hand and/or ink, and are classified as Possible."
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "2",
                    sectionTitle: "A visual breakdown of Certain, Probable and Possible across the database.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Female agent status', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Female agent date',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Agent',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Rosalind Smith"
                    ]
            },
        ]
    })

    const article_TYPESOFBOOK = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "The database classifies the type of book that women annotated according to 39 categories.",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/289/BookID_289_(3_of_3).JPG",
                heroImage: "",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -13,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -9,
                    scale: 0.75
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "These 39 categories include broad thematic taxonomies of book type (political, religious, legal, meditational, medical, household, history, travel, leisure, literary, science, philosophy); overarching formal categories (poetry, drama) and more granular generic and sub-generic categories (sermon, biography, religious treatise, classical text, biography, commonplace book, sermon, polemic, romance, conduct book, meditation, letters, liturgy, reference, dictionary, essay, allegory, legacy, psalm book, prayer book, book of hours, dictionary, Bible, satire, prophecy, financial records, music, elegy, concordance, cookery). Books usually belong to more than one category (eg. religious, Bible). We also identify when annotated texts are female-authored and non-English. Our metadata also contains information about book size, and other bibliographic details such as place and date of publication that can be searched in combination with other metadata."
                    ,                
                    "What kinds of books did early modern women most commonly mark? As we continue to add marginalia to the database, the visualisation below will change. However, this is a view of the 1384 books consulted to date according to book type, showing that religious books are have the most women’s marginalia, but that history, literary, conduct and commonplace books were also categories of book often marked by women:"
                    ]
            },   
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Types of Book coloured according the number of marks contained in each.",
                    sectionView: {
                        view: {
                        itemType: "Book",
                        id: 'BookID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Genre/Identity', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Number of marks',
                    },
                    viewType: {
                        id: 'Book',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "We can also view the database through book size, showing that women marked smaller books far more frequently than large ones:"
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "2",
                    sectionTitle: "Sizes of each book coloured according the number of marks contained in each.",
                    sectionView: {
                        view: {
                        itemType: "Book",
                        id: 'BookID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Book Size', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Number of marks',
                    },
                    viewType: {
                        id: 'Book',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Viewing the book metadata by date provides evidence that the frequency of women’s marginalia increased throughout the sixteenth and seventeenth centuries, as the number of books printed increased and women’s literacy rates grew. "
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "3",
                    sectionTitle: "Sizes of each book coloured according the number of marks contained in each.",
                    sectionView: {
                        view: {
                        itemType: "Book",
                        id: 'BookID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Date of publication', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Number of marks',
                    },
                    viewType: {
                        id: 'Book',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "The <u>search page</u> of the library allows you to visualise your own facets of the database through views that can be customised to your research. If you are interested in ownership marks, for example, you can view ownership marks and book genre together, sorted (if you wish) by book genre and coloured by book size:"
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "4",
                    sectionTitle: "Sizes of each book coloured according the number of marks contained in each.",
                    sectionView: {
                        view: {
                        itemType: "Book",
                        id: 'BookID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Genre/Identity', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Size',
                    },
                    viewType: {
                        id: 'Book',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Mark type (Mark of?)',
                                option: 'Ownership'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Rosalind Smith"
                    ]
            },
        ]
    })
    
    const article_LOCATIONS = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Where marginalia is located within the book (such as on pastedowns, flyleaves, endpapers, title page, margins) and on the page (top, bottom, right or left margin; centre, middle, left, right; reversed)",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/96/BookID_96_(2_of_4).jpg",
                heroImage: "",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -6,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -2.8,
                    scale: 0.9
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "The database shows where in the book and on the page early modern women’s marginalia can be found. It has been speculated, for example, that women did not annotate title pages, which our data shows to be false. These visualisations shows both the location in the book and the location on the page for the marginalia in the database."
                    ]
            },   
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "2",
                    sectionTitle: "All marginal marks shown as location on page, Colour Coded according to the Book Size.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Position on page', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Size',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "We can also filter for type of mark and location, as in the visualisation below for ownership marks and position on page."
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "3",
                    sectionTitle: "Annotated comments made by women agents, Sorted by Position on Page and Colour Coded according to the Book Size.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Position on page', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Size',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Annotation type',
                                option: 'Comment'
                            }
                        ]
                    }}
                }
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "4",
                    sectionTitle: "Records of Family Lineage, Sorted by Position on Page and Colour Coded according to the Book Size.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Position on page', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Size',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Recording type',
                                option: 'Family lineage'
                            }
                        ]
                    }}
                }
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "5",
                    sectionTitle: "Examples of Signatures used to denote Ownership, Sorted by Position on Page and Colour Coded according to the Book Size.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Position on page', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Size',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Mark",
                                category: 'Ownership type',
                                option: 'Signature'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Rosalind Smith"
                    ]
            },
        ]
    })


    const article_REPOSITORIES = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "The archive or library in which the books in the database are located",
                heroImage: "",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/226/BookID_226_(2_of_2).JPG",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -2,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -4,
                    scale: 1.1
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "Every archive is unique. From the broad sweep of a legal deposit library to the idiosyncratic selections of an individual book collector, when it comes to repositories, it’s impossible to generalise. This has important consequences for marginalia and for identifying where one is likely to find it."
                    ,                  
                    "The Library of Early Modern Women’s Marginalia tracks more than a hundred repositories: from the Alexander Turnbull Library in New Zealand through National Trust houses to the Folger Shakespeare Library in Washington DC. Only in the smallest of these archives has our primary team consulted all relevant printed books in our period (these are Merton College Library and Regent’s Park College in Oxford). We expect more books from more repositories to be added during the crowd-sourcing period."
                    ,                  
                    "Just as each book is unique, so too are the repositories that hold them.  Due to the initial parameters of our project, the repositories we selected were primarily in university settings. Even there, however, collections vary. The Bodleian library, at Oxford University, is the fortunate legatee of many individual collectors, whose own interests and principles create pockets of abundance, as in the case of Richard Rawlinson’s 5205 bound manuscripts. Books in the Bodleian gifted by collectors tend to have moved through more hands before reaching the collection, and are therefore more likely to contain marginalia."
                    ,              
                    "Conversely, similarly august institutions like the library at Merton College, Oxford, primarily acquired their early modern books at the time of their initial publication. This means that, if those volumes were thumbed and annotated it was by Merton students, dons, and scholars; as most Oxford and Cambridge colleges did not admit women until the twentieth century, these would have been men. As such it proves an unlikely port-of-call for women’s marginalia – and yet: there are still hidden gems at Merton whose existence poses fascinating questions about their origins and accession."
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Marginalia examples from the Merton Library Collection, Sorted by Marginalia type and Colour Coded by the date of each book's publication",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Mark type (Mark of?)', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Date of publication',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Mark',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Book",
                                category: 'Repository',
                                option: 'Merton'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Some individual collections have specific focuses, like John Emmerson’s emphasis on Caroline England and the English Civil War period, now held in the State Library of Victoria. This repository has helped us to challenge the assumption that women did not typically annotate political texts or pamphlets; thanks to the Emmerson collection among others, we now have evidence to the contrary."
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "2",
                    sectionTitle: "Marginalia examples from the State Library of Victoria's Collection, Sorted by Book genre  and Colour Coded by the date of each book's publication.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Genre/Identity', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Date of publication',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Book",
                                category: 'Repository',
                                option: 'Merton'
                            }
                        ]
                    }}
                }
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "3",
                    sectionTitle: "Selected Marginalia examples sourced from Books of Political or Polemic genres, Sorted by Repository and Colour Coded by the date of each book's publication.",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Repository', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Date of publication',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '50'   
                    },
                    articleFilter: {
                        useFilter: true,
                        filterArray: [
                            {
                                itemType: "Book",
                                category: 'Genre/Identity',
                                option: 'political'
                            },
                            {
                                itemType: "Book",
                                category: 'Genre/Identity',
                                option: 'polemic'
                            }
                        ]
                    }}
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "When it comes to repositories, nothing beats a thorough look, page-by-page. After all, that is the work that underpins most of the entries in this database. Nonetheless some generalisations are possible. Our project so far suggests it is more useful to consider an archive as containing a number of subsets based on means of accession. For example, it is useful to identify individual collectors, when books entered the collection, and their process of acquisition. (Of course, this information is not always available or reliable). Some collectors habitually replaced often annotated front-and back-boards and erased any historical traces; this habit once identified might be a sign to reprioritise your time in the archive. This habit appears common in the 19th century, which might guide researchers with limited time or resources. Conversely, rare book purchases in recent decades have come to recognise the historical value of unique annotations and tracking those purchases or purchasers can be a promising start. As with all archival research, persistence is key!"
                    ,                  
                    "Whether governed by institutions, committees, or individual collectors, repositories tell a story. The story that the Library of Early Modern Women’s Marginalia sets out to tell is a new one: how early modern women used their books — and about where those books have ended up. We hope users of the Library will contribute their own findings to expand and enrich this evolving narrative [links to crowd-sourcing]."
                    ,                  
                    "Jake Arthur"
                    ]
            },
        ]
    })

    const article_LIBRARIANS = ref({
        articleTitle: 
            {
                subHeading: "Definition",
                subHeadingContent: "Contributors to the Library of Early Modern Women’s Marginalia",
                // heroImage: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/31/BookID_31_(1_of_6).jpg",
                heroImage: "",
                imageStyle: { 
                    height: 40,
                    width: 25,
                    marginTop: -5,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: -6.5,
                    scale: 0.825
                }
            },
        articleContent:[
            {
                type: "paraSection",
                content: 
                    [                    
                    "Project Team"
                    ,                  
                    "Kate Allan,\n\
                    Jake Arthur,\n\
                    Felicity Brown,\n\
                    Fraser Buchanan,\n\
                    Kathryn Hempstead,\n\
                    Thomas Lalavee,\n\
                    Jesse Newman,\n\
                    Emma Rayner,\n\
                    Rosalind Smith,\n\
                    Hannah Upton,\n\
                    Bianca Vecchio"
                    ]
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Contributors to the Library"
                    ,                  
                    "Georgianna Ziegler\n"
                    ]
            },
            {
                type: "library",
                content: {
                    name: 'visual',
                    section: "1",
                    sectionTitle: "Original Publication Locations of all Books consulted for the Project",
                    sectionView: {
                        view: {
                        itemType: "Mark",
                        id: 'MargID',
                        shelf: 'Not Selected', //Primary sort
                        bookend: 'Place of publication', //Secondary sort
                        height: 'Not Selected',
                        colour: 'Date of publication',
                    },
                    viewType: {
                        id: 'Mark',
                        shelf: 'NotSelected',
                        bookend: 'Book',
                        height: 'NotSelected',
                        colour: 'Book',
                    },
                    pageText: {},
                    zoom: {
                        zoomLevel: '0'   
                    },
                    articleFilter: {
                        useFilter: false,
                        filterArray: [
                            {}
                        ]
                    }}
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/31/BookID_31_(5_of_6).jpg",
                    caption: "1693 Bible (BookID: 31)"
                }
            },
            {
                type: "image",
                content: {
                    image: "https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/book-images/31/BookID_31_(2_of_6).jpg",
                    caption: "1693 Bible (BookID: 31)"
                }
            },
            {
                type: "paraSection",
                content: 
                    [                    
                    "Rosalind Smith"
                    ]
            },
        ]
    })


    
    const articleComponentRoutes = reactive({
        womenagents: article_WOMENAGENTS,
        ownership: article_OWNERSHIP,
        reading: article_READING,
        recording: article_RECORDING,
        drawing: article_DRAWING,
        graffiti: article_GRAFFITI,
        attribution: article_ATTRIBUTION,
        typesofbook: article_TYPESOFBOOK,
        locations: article_LOCATIONS,
        repositories: article_REPOSITORIES,
        librarians: article_LIBRARIANS,
    })


// SEARCH VIEW - DEFAULT //
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

    const viewRouteQueries = reactive({
        searchView: exploreView,
        // agents: agentsView,
        // books: booksView,
        // marks: marksView,
        // agent01: agentsInCollection,
        // agent02: agentsYearsMade,
        // book01: booksTheyRead,
        // book02: booksLibraryofLibraries,
        // book03: booksYearsPublished,
        // mark01: marksTheyMade,
        // mark02: marksHowMany,
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






    // // Standard Views //
    // const agentsView = ({
    //     //Query - How Many Agents In Collection?
    //     view: {
    //         itemType: "Agent",
    //         id: 'FemaleAgentID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Not Selected',
    //         colour: 'Number of marks',
    //     },
    //     viewType: {
    //         id: 'Agent',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'NotSelected',
    //         colour: 'Agent',
    //     },
    //     pageText: {
    //         queryType: 'Agents ',
    //         queryBreadcrumb: '',
    //         libraryTypeTitle: 'The Agents',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const booksView = ({
    //     //Query - How Many Agents In Collection?
    //     view: {
    //         itemType: "Book",
    //         id: 'BookID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Not Selected',
    //         colour: 'Number of marks',
    //     },
    //     viewType: {
    //         id: 'Book',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'NotSelected',
    //         colour: 'Book',
    //     },
    //     pageText: {
    //         queryType: 'Books ',
    //         queryBreadcrumb: '',
    //         libraryTypeTitle: 'The Books',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })


    // const marksView = ({
    //     //Query - How Many Agents In Collection?
    //     view: {
    //         itemType: "Mark",
    //         id: 'MargID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Not Selected',
    //         colour: 'Mark type (Mark of?)',
    //     },
    //     viewType: {
    //         id: 'Mark',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'NotSelected',
    //         colour: 'Mark',
    //     },
    //     pageText: {
    //         queryType: 'Mark ',
    //         queryBreadcrumb: '',
    //         libraryTypeTitle: 'The Marks',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    
    //View Query Configurations //
    
    // How many agents are in the collection? 
    // const agentsInCollection = ({
    //     //Query - How Many Agents In Collection?
    //     view: {
    //         itemType: "Agent",
    //         id: 'FemaleAgentID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Not Selected',
    //         colour: 'Female agent status',
    //     },
    //     viewType: {
    //         id: 'Agent',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'NotSelected',
    //         colour: 'Mark',
    //     },
    //     pageText: {
    //         queryType: 'Agents ',
    //         queryBreadcrumb: 'How many agents are in the collection ?',
    //         libraryTypeTitle: 'The Agents',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })
    // const agentsYearsMade = ({
    //     //Query - What years did each agent make their marks?
    //     view: {
    //         itemType: "Agent",
    //         id: 'FemaleAgentID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Not Selected',
    //         colour: 'Female agent status',
    //     },
    //     viewType: {
    //         id: 'Agent',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'NotSelected',
    //         colour: 'Mark',
    //     },
    //     pageText: {
    //         queryType: 'Agents ',
    //         queryBreadcrumb: 'How many agents are in the collection ?',
    //         libraryTypeTitle: 'The Agents',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const booksTheyRead = ({
    //     //Query - What Kinds of Books did people read?
    //     view: {
    //         itemType: "Book",
    //         id: 'BookID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Genre/Identity', //Secondary sort
    //         height: 'Size',
    //         colour: 'Size',
    //     },
    //     viewType: {
    //         id: 'Book',
    //         shelf: 'NotSelected',
    //         bookend: 'Book',
    //         height: 'Book',
    //         colour: 'Book',
    //     },
    //     pageText: {
    //         queryType: 'Books ',
    //         queryBreadcrumb: 'What kinds of books did people read ?',
    //         libraryTypeTitle: 'The Books',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const booksLibraryofLibraries = ({
    //     //Query - Where can you find the books today?
    //     view: {
    //         itemType: "Book",
    //         id: 'BookID',
    //         shelf: 'Repository', //Primary sort
    //         bookend: 'Date of publication', //Secondary sort
    //         height: 'Number of marks',
    //         colour: 'Mark type (Mark of?)',
    //     },
    //     viewType: {
    //         id: 'Book',
    //         shelf: 'Book',
    //         bookend: 'Book',
    //         height: 'Book',
    //         colour: 'Mark',
    //     },
    //     pageText: {
    //         queryType: 'Books ',
    //         queryBreadcrumb: 'Where can you find the books today ?',
    //         libraryTypeTitle: 'The Books',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const booksYearsPublished = ({
    //     //Query - What years were the books published?
    //     view: {
    //         itemType: "Book",
    //         id: 'BookID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Genre/Identity', //Secondary sort
    //         height: 'Size',
    //         colour: 'Size',
    //     },
    //     viewType: {
    //         id: 'Book',
    //         shelf: 'NotSelected',
    //         bookend: 'Book',
    //         height: 'Book',
    //         colour: 'Book',
    //     },
    //     pageText: {
    //         queryType: 'Books ',
    //         queryBreadcrumb: 'What kinds of books did people read ?',
    //         libraryTypeTitle: 'The Books',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const marksTheyMade = ({
    //     //Query - What Kinds of Books did people read?
    //     view: {
    //         itemType: "Mark",
    //         id: 'MargID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Number of marks',
    //         colour: 'Mark type (Mark of?)',
    //     },
    //     viewType: {
    //         id: 'Mark',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'Book',
    //         colour: 'Mark',
    //     },
    //     pageText: {
    //         queryType: 'Marks ',
    //         queryBreadcrumb: 'What types of marks did each agent make ?',
    //         libraryTypeTitle: 'The Marks',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const marksHowMany = ({
    //     //Query - How many marks did each agent make?
    //     view: {
    //         itemType: "Mark",
    //         id: 'MargID',
    //         shelf: 'Not Selected', //Primary sort
    //         bookend: 'Not Selected', //Secondary sort
    //         height: 'Number of marks',
    //         colour: 'Mark type (Mark of?)',
    //     },
    //     viewType: {
    //         id: 'Mark',
    //         shelf: 'NotSelected',
    //         bookend: 'NotSelected',
    //         height: 'Book',
    //         colour: 'Mark',
    //     },
    //     pageText: {
    //         queryType: 'Marks ',
    //         queryBreadcrumb: 'What types of marks did each agent make ?',
    //         libraryTypeTitle: 'The Marks',
    //         libraryTypeSubtitle: 'in the libraries',
    //     }
    // })

    // const articleVisual = ({
    //         name: 'visual',
    //         totalSections: 1,
    //         sections: ['graffiti'],
    //         sectionViews: [
    //             {   view: {
    //                 itemType: "Mark",
    //                 id: 'MargID',
    //                 shelf: 'Graffiti type', //Primary sort
    //                 bookend: 'Graffiti type', //Secondary sort
    //                 height: 'Not Selected',
    //                 colour: 'Graffiti type',
    //             },
    //             viewType: {
    //                 id: 'Mark',
    //                 shelf: 'Mark',
    //                 bookend: 'Mark',
    //                 height: 'NotSelected',
    //                 colour: 'Mark',
    //             },
    //             pageText: {
    //                 queryType: 'Mark ',
    //                 queryBreadcrumb: '',
    //                 libraryTypeTitle: 'The Marks',
    //                 libraryTypeSubtitle: 'in the libraries',
    //             },
    //             zoom: {
    //                 zoomLevel: '50'   
    //             },
    //             articleFilter: {
    //                 useFilter: true,
    //                 itemType: "Mark",
    //                 category: 'Mark type (Mark of?)',
    //                 option: 'Graffiti'
    //             }}
    //         ]
    // })