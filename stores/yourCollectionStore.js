import * as d3 from "d3";
import { storeToRefs } from "pinia";

export const useYourCollectionStore = defineStore('yourCollection', ()=>{
    const libraryStore = useLibraryStore();

    // const { 
    //       Agent,
    //       Book,
    //       Mark
    //        } = storeToRefs(libraryStore)

    const referenceStore = useReferenceStore();
    const { viewMap, filterMap, colourMapFiltered, scales } =  storeToRefs(referenceStore);
    const { alphabetically,
            handleNumeric,
            handleObjectPath,
            handleFilterValue,
            handleValue,
            handleArray,
            handleColourValue,
            isNumber,
            isString,
            isArray,
            containsNumber,
            processDomain,
            checkObjectPath } = useUtils();

    const heightCategoryYC = {
        logarithmic: ['Number of marks', 'Number of book images', 'Size'],
        year: ['Date of publication', 'Female agent date']

    }

    // LIBRARY STATE OBJECT//
    const allCollections = ref({})

    const yourCollection = ref([]) 

    // LIBRARY VIEW OBJECT//
    const libraryDisplayYC = reactive({
        //sub items in view and viewType are called the 'viewMode'.
        view: {
            itemType: "Book",
            id: 'BookID',
            shelf: 'Not Selected', //Primary sort
            bookend: 'Not Selected', //Secondary sort
            height: 'Not Selected',
            colour: 'Number of marks',
            shelfOrderMethod: 'A', //Primary sort
            bookendOrderMethod: 'A', //Secondary sort
            label: 'Title',
            agentLabel: 'Female agent name',
            bookLabel: 'Title',
            markLabel: 'Transcription',
            agentCollectionProp1: 'Mark type (Mark of?)',
            agentCollectionProp2: 'Genre/Identity',
            bookCollectionProp1: 'Female agent name',
            bookCollectionProp2: 'Number of marks',
            markCollectionProp1: 'Female agent name',
            markCollectionProp2: 'Title',
        },
        viewType: {
            id: 'Book',
            shelf: 'NotSelected',
            bookend: 'NotSelected',
            height: 'NotSelected',
            colour: 'Book',
            label: 'Book',
            agentLabel: 'Agent',
            bookLabel: 'Book',
            markLabel: 'Mark',
            agentCollectionProp1: 'Mark',
            agentCollectionProp2: 'Book',
            bookCollectionProp1: 'Agent',
            bookCollectionProp2: 'Book',
            markCollectionProp1: 'Agent',
            markCollectionProp2: 'Book',
        },
        pageText: {
            queryType: 'Your Collection ',
            queryBreadcrumb: '/ Items can be added to your collection by selecting them in the library, and clicking Add to Collection',
            libraryTypeTitle: 'View Your Collections',
            libraryTypeSubtitle: 'from the libraries',
        }
    })
    const collectionName = ref()
    const collectionSet = reactive({})

    // LIBRARY DATA //
    const itemLibraryYC = ref([]);
    const formattedItemLibraryYC = ref([]);
    const formattedLibraryYC = ref([]);
    const itemHeightYC = ref();
    const itemColourYC = ref();
    const colourSetYC = ref();
    const ordinalColourMapYC = ref([]);
    const colourScaleYC = ref();
    const colourScaleConverterYC = ref();
    const domainIndexYC = ref();
    const viewHeightBoundsYC = ref();
    const domainColourIndexYC = ref();
    const viewColourBoundsYC = ref();
    const filterLibraryYC = ref();
    // FILTER HANDLING //
    const activeFiltersYC = ref([])
    const filterObjectYC = reactive(new Map())
    const dataSizeYC = ref(0);

    watch([yourCollection, libraryDisplayYC, activeFiltersYC],() => {
        if(yourCollection.value.length !== undefined){
            formattedLibraryYC.value =  formatLibrary(yourCollection.value); //Reactive when not testing

            domainIndexYC.value = getDomainIndex('height');
            viewHeightBoundsYC.value = getIndexItems('height');

            domainColourIndexYC.value = getDomainIndex('colour');
            viewColourBoundsYC.value = getIndexItems('colour');

            //Item Height - Returns d3 Scale Function
            itemHeightYC.value = formatHeight();
            //Item Colour - Returns d3 Scale Function
            itemColourYC.value = formatColour();
            //Colour Categories
            colourSetYC.value = getColourSet.value //Included here to prevent computed from firing before library.data is returned

            colourScaleYC.value = colourBandscale();

            colourScaleConverterYC.value =  colourFunction();

            ordinalColourMapYC.value = getOrdinalColourMap();

            if(collectionName.value !== undefined){
                if(collectionName.value in allCollections.value){
                    allCollections.value[collectionName.value].yourCollection = yourCollection.value
                    allCollections.value[collectionName.value].display.view = libraryDisplayYC.view
                    allCollections.value[collectionName.value].display.viewType = libraryDisplayYC.viewType
                    allCollections.value[collectionName.value].display.pageText = libraryDisplayYC.pageText 
                }
            }
        }
    },{deep: true})

    watch([itemLibraryYC],() => {
        if(itemLibraryYC.value.length !== undefined){
            formattedItemLibraryYC.value = formatItemLibrary();
        }
    })

    watch(() => yourCollection.value, () => {
        filterObjectYC.set('Agent', getFilterObjectYC(referenceStore.filterMap.get('Agent'), yourCollection.value, 'Agent'))
        filterObjectYC.set('Book', getFilterObjectYC(referenceStore.filterMap.get('Book'), yourCollection.value, 'Book'))
        filterObjectYC.set('Mark', getFilterObjectYC(referenceStore.filterMap.get('Mark'), yourCollection.value, 'Mark'))

        if(collectionName.value !== undefined){
            if(collectionName.value in allCollections.value){
                allCollections.value[collectionName.value].items = filterLibraryYC.value
                activeFiltersYC.value.forEach((filterValue)=>{
                    filterActiveReinstateYC(filterValue, filterValue.category, filterValue.itemType)
                })
                allCollections.value[collectionName.value].filters.set('Agent', filterObjectYC.get('Agent'))
                allCollections.value[collectionName.value].filters.set('Book', filterObjectYC.get('Book'))
                allCollections.value[collectionName.value].filters.set('Mark', filterObjectYC.get('Mark'))
    }

    // function filterUpdate(filterValue, category, itemType){
    //     if(filterObjectYC.get(itemType)[category][filterValue.name].active){
    //         activeFiltersYC.value.push({'name': filterValue.name, 'category': category, 'itemType': itemType})
    //     }

    //             allCollections.value[collectionName.value].activeFilters = activeFiltersYC.value
    //         }
        }
        console.log('filterObjectYC watch', filterObjectYC)
    },{deep: true})

    //Get item height bounds
    function getDomainIndex(viewMode) {
        return {min: d3.minIndex(yourCollection.value, d => getIDP_YC(d, viewMode)), 
                max: d3.maxIndex(yourCollection.value, d => getIDP_YC(d, viewMode))}
    }

    function getIndexItems(viewMode) {
        if(viewMode === 'height'){
            return [yourCollection.value[domainIndexYC.value.min],
                    yourCollection.value[domainIndexYC.value.max]]
        }
        if(viewMode === 'colour'){
            return [yourCollection.value[domainColourIndexYC.value.min],
                    yourCollection.value[domainColourIndexYC.value.max]]
        }
    }

    //Get unique values in colour set
    const getColourSet = computed (() => {
        return processColourSet(yourCollection.value)
    })

    //Currently applies to Arrays only
    const viewColourSetYC = computed (() => {
        return processColourItems(yourCollection.value, getColourSet.value)
    })

    // INTERNAL FUNCTIONS //
    // ITEM LIBRARY //
    function formatItemLibrary(){
        let libraryFormat;
        libraryFormat = d3.flatGroup(d3.sort(itemLibraryYC.value,(a, b) => alphabetically(true)(itemTypeCheckYC(a), itemTypeCheckYC(b))), d => itemTypeCheckYC(d)); 
        return [['Item Collection' ,libraryFormat]]
    }

    // FORMAT LIBRARY //
    //Set Shelves
    function formatShelf(data, viewMode){
        return d3.flatGroup(d3.sort(data,(a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d => getIDP_YC(d, viewMode)); 
    }
    function formatNullShelf(data, viewMode){
        return d3.flatGroup(d3.sort(data,(a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d => 'All Items'); 
    }
    //Set Bookends
    function formatBookend(data, viewMode){
        return data
        .map(d => [d[0],d3.flatGroup(d3.sort(d[1], (a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d=> getIDP_YC(d, viewMode))]);  
    }
    function formatNullBookend(data, viewMode){
        return data
        .map(d => [d[0],d3.flatGroup(d3.sort(d[1], (a, b) => alphabetically(true)(getISP(a, viewMode), getISP(b, viewMode))), d=> 'All Items')]);  
    }
    //Combine Shelves & Bookend
    function formatLibrary(data) {
        //Shelves - Sort & Group Items by Shelf Category
        const shelfFormatData = libraryDisplayYC.view.shelf !== "Not Selected"
        ? formatShelf(data, 'shelf') 
        : formatNullShelf(data, 'id'); //Default
        //Bookends - Further Sort & Group Items by Bookend Category
        const shelfBookendFormatData = libraryDisplayYC.view.bookend !== "Not Selected"
        ? formatBookend(shelfFormatData, 'bookend') 
        : formatNullBookend(shelfFormatData, 'id'); //Default
        return shelfBookendFormatData
    }

    // HANDLE HEIGHT //
    function formatHeight() {
        const viewSelection = libraryDisplayYC.view.height
        if(viewSelection !== "Not Selected") {
            //Returns a function which takes the log scale of the input then invokes the d3 scale function (IIFE)
            if(heightCategoryYC.logarithmic.includes(viewSelection)){
                return (value)=>{ 
                    return (d3.scaleLinear()
                                .domain(chooseHeightDomain(yourCollection.value).map(d => Math.log(d))) 
                                .unknown(referenceStore.scales.minItemHeight) //Set all non-numeric values to max height
                                .range([referenceStore.scales.minItemHeight, referenceStore.scales.maxItemHeight])
                                .clamp(true)
                            )(Math.log(value)); 
                }
            }else{
                return d3.scaleLinear()
                            .domain(chooseHeightDomain(yourCollection.value)) 
                            .unknown(referenceStore.scales.minItemHeight) //Set all non-numeric values to max height
                            .range([referenceStore.scales.minItemHeight, referenceStore.scales.maxItemHeight])
                            .clamp(true);     
            }
        }else{
            return (_)=> {return referenceStore.scales.maxItemHeight}
        }
    }
    
    function chooseHeightDomain(data){   
            const viewSelection = libraryDisplayYC.view.height
            if(heightCategoryYC.year.includes(viewSelection)) {
                return [1450, 1750] //was - clamp(1450, longestNumber, 1750)
            }else{
                return [getIDP_YC(data[domainIndexYC.value.min], 'height'), getIDP_YC(data[domainIndexYC.value.max], 'height')]
            }
    }

    function colourFunction() {
        const viewMode = 'colour'
        const viewSelection = libraryDisplayYC.view[viewMode]
        const viewModeType = libraryDisplayYC.viewType[viewMode]
        const colourFunction = referenceStore.viewMap.get(viewModeType)[viewSelection].func
        const colourScheme = referenceStore.viewMap.get(viewModeType)[viewSelection].scheme
        return d3[colourFunction](d3[colourScheme]) //Applies colour functions and schemes from Object. Domain defaults to [0,1]
    }
   
    // HANDLE COLOUR //
    function formatColour(){
        if(libraryDisplayYC.view.colour !== "Not Selected"){
            return (
                    (colourByValue) => {
                        if(colourByValue !== "no data")
                        {
                            return colourScaleConverterYC.value(colourScaleYC.value(colourByValue)) //Returns nested scale function after applying band function (IIFE)
                        }
                        else{
                            return '#EEEEEE'
                        }
                    }
                )   
        }else{
            return (_)=> {return '#fff281'}
        }    
    }

    function getOrdinalColourMap(){
        const ordinalMap = Array.from(getColourSet.value).map((category)=>{
            return {'colour': itemColourYC.value(category), 'category': category}
        })
        return  d3.flatGroup(ordinalMap, d => d.colour)
    }

    //Returns bandscale for colour values
    function colourBandscale(){
        return d3.scaleBand().domain(Array.from(getColourSet.value)) //Range defaults to [0,1]
    }

    function processColourSet(data){
       return new Set(data.flatMap(d=> getIDP_YC(d, 'colour')).sort((a,b)=>alphabetically(true)(handleFilterValue(a), handleFilterValue(b))))
    }

    function processColourItems(data, colourSetYC){
        let tempColourSet = colourSetYC;
        let uniqueColours = data.filter((d) => {
            const value = getIDP_YC(d, 'colour')
            if(tempColourSet.has(value)){
                return tempColourSet.delete(value) //Returns true if deletion successful
            }else{
                return false
            }
        })
        return  new Set(uniqueColours.sort((a, b) => alphabetically(true)(getISP(a, 'colour'), getISP(b, 'colour')))) //Sort uses separate path access function getISP()
    }

    // EXTERNAL FUNCTIONS //
    //Parse Data Object from Supabase
    async function parseDatabaseYC(tableData) {
            yourCollection.value = await JSON.parse(JSON.stringify(tableData))
    }

    //Update View Object from user input
    function handleViewSelectionYC(viewMode, viewSelection, itemType){
        console.log('handleViewSelectionYC', viewMode, viewSelection, itemType)

        if(itemType === 'NotSelected') {
            libraryDisplayYC.view[viewMode] = 'Not Selected'
            libraryDisplayYC.viewType[viewMode] = 'NotSelected'
        }else{
            if(viewMode === 'shelf'){
                libraryDisplayYC.view.shelfOrderMethod =  referenceStore.viewMap.get(itemType)[viewSelection].sortMethod
            }
            if(viewMode === 'bookend'){
                libraryDisplayYC.view.bookendOrderMethod =  referenceStore.viewMap.get(itemType)[viewSelection].sortMethod
            }
            libraryDisplayYC.view[viewMode] = viewSelection; //Future addition - updateView below (in database)
            libraryDisplayYC.viewType[viewMode] = itemType; //Future addition - updateViewType below (in database)
        }
    }

    //Dynamic Path
    //Returns the desintation value by selecting the correct path using the itemType (via the ID name) to the itemType of the viewMode (via viewType LookUp)
    //getIDP_YC - getItemDisplayPath - Condensed for frequent use.
    function getIDP_YC(item, viewMode) {
        if(viewMode === 'Not Selected') return 'Not Selected'
        const viewSelection = libraryDisplayYC.view[viewMode]
        const viewModeType = libraryDisplayYC.viewType[viewMode]
        return itemPath(viewModeType, item, viewMode, viewSelection)
    }

    //Dynamic Path
    //Returns the desintation value by selecting the correct path using the itemType (via the ID name) and the viewModeType
    //getIFP_YC - getItemFilterPath - Condensed for frequent use.
    function getIFP_YC(item, viewSelection, viewModeType, viewMethod) {
        return itemPath(viewModeType, item, viewMethod, viewSelection)
    }
    
    //Dynamic Path
    //Returns the desintation value by selecting the correct path using the itemType (via the ID name) to the itemType of the viewMode (via viewType LookUp)
    //getISP - getItemSortPath - Condensed for frequent use.
    function getISP(item, viewMode) {
        let viewMethod = 'filter'
        if(viewMode === 'Not Selected') return 'Not Selected'
        const viewSelection = libraryDisplayYC.view[viewMode]
        const viewModeType = libraryDisplayYC.viewType[viewMode]
        return itemPath(viewModeType, item, viewMethod, viewSelection)
    }

    function itemPath(viewModeType, item, viewMode, viewSelection){
        if(!item) return null;
        const itemType = itemTypeCheckYC(item)
        let value;
        if(itemType === 'Agent'){
            //Agent Item paths
            if(viewModeType === 'Agent') value = handleObjectPath(item, viewMode, viewSelection)
            if(viewModeType === 'Mark') value = handleObjectPath(item, viewMode, 'Marks', 0, viewSelection)
            if(viewModeType === 'Book') value = handleObjectPath(item, viewMode, 'Marks', 0, 'Books', viewSelection)
        }else if(itemType === 'Book'){
            //Book Item paths                 
            if(viewModeType === 'Book') value = handleObjectPath(item, viewMode, viewSelection)
            if(viewModeType === 'Mark') value = handleObjectPath(item, viewMode,'Marks',0,viewSelection)
            if(viewModeType === 'Agent') value = handleObjectPath(item, viewMode, 'Marks', 0, 'Agents', viewSelection)
        }else if(itemType === 'Mark'){
            //Mark Item paths
            if(viewModeType === 'Mark') value = handleObjectPath(item, viewMode, viewSelection)
            if(viewModeType === 'Agent') value = handleObjectPath(item, viewMode, 'Agents', viewSelection) 
            if(viewModeType === 'Book') value = handleObjectPath(item, viewMode, 'Books', viewSelection)
        }
            return value ? value : "no data"
    }

    function getItemLibraryYC(item){
        if(!item) return null;
        const itemType = itemTypeCheckYC(item)
        let library;
        if(itemType === 'Agent'){
            //Agent Item paths
            library = [item, getUnique(item['Marks'], 'MargID'), getUnique(item['Marks'].map(d => d['Books']), 'BookID')].flat()
        }else if(itemType === 'Book'){
            //Book Item paths                 
            library = [item, getUnique(item['Marks'], 'MargID'), getUnique(item['Marks'].map(d => d['Agents']), 'FemaleAgentID')].flat()
        }else if(itemType === 'Mark'){
            //Mark Item paths
            library = [
                item, 
                item['Agents'], 
                item['Books']
            ]
        }

        library ? itemLibraryYC.value = library : "no data"
    }

    function getUnique(arrayOfObjects, checkProperty){
        
        return arrayOfObjects.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t[checkProperty] === value[checkProperty]
            ))
        )
    }

    function getItemLibraryCountYC(item){
        if(!item) return null;
        const itemType = itemTypeCheckYC(item)
        let library;
        if(itemType === 'Agent'){
            //Agent Item paths
            library = [ 
                        1, 
                        getUnique(item['Marks'].map(d => d['Books']), 'BookID').length, 
                        item['Marks'].length 
                    ].flat()
        }else if(itemType === 'Book'){
            //Book Item paths                 
            library = [ 
                        getUnique(item['Marks'].map(d => d['Agents']), 'FemaleAgentID').length, 
                        1, 
                        item['Marks'].length
                    ].flat()
        }else if(itemType === 'Mark'){
            //Mark Item paths
            library = [
                        1, 
                        1,
                        1
                    ]
        }

        return library ? library : ["no data", "no data", "no data"]
    }

    function itemTypeCheckYC(item){
        return  item['FemaleAgentID'] ? 'Agent' :
                item['BookID'] ? 'Book' :
                item['MargID'] ? 'Mark' : ''
    }



    function getFilterObjectYC(targetFormat, sourceObject, viewModeType){
        let filterObjectYC = {};
        for (let i = 0, formatKeys = Object.keys(targetFormat); i < formatKeys.length; i++) {
                filterObjectYC[formatKeys[i]] = []
            }
        
        for (let i = 0, sourceKeys = Object.keys(sourceObject); i < sourceKeys.length; i++) {
            for (let j = 0, targetKeys = Object.keys(filterObjectYC); j < targetKeys.length; j++) {
                let value = getIFP_YC(sourceObject[i], targetKeys[j], viewModeType, 'display name')
                if(isArray(value)) {filterObjectYC[targetKeys[j]].push(...value) }
                else {filterObjectYC[targetKeys[j]].push(value) }
            }
        }
        for (let i = 0, targetKeys = Object.keys(filterObjectYC); i < targetKeys.length; i++) {
            filterObjectYC[targetKeys[i]] = new Set(filterObjectYC[targetKeys[i]]);
            filterObjectYC[targetKeys[i]] = Array.from(filterObjectYC[targetKeys[i]]).sort((a,b)=>alphabetically(true)(handleFilterValue(a), handleFilterValue(b)))
            filterObjectYC[targetKeys[i]] = filterObjectYC[targetKeys[i]].reduce((object, value) => ({ ...object, [value] : {name : value, active: false}}),{})
        }
        return filterObjectYC
    }

    function filterActiveToggleYC(filterValue, category, itemType){
        filterObjectYC.get(itemType)[category][filterValue.name].active = 
        !filterObjectYC.get(itemType)[category][filterValue.name].active

        filterUpdate(filterValue, category, itemType)
    }

    function filterActiveReinstateYC(filterValue, category, itemType){
        filterObjectYC.get(itemType)[category][filterValue.name].active = true
    }

    function filterUpdate(filterValue, category, itemType){
        if(filterObjectYC.get(itemType)[category][filterValue.name].active){
            activeFiltersYC.value.push({'name': filterValue.name, 'category': category, 'itemType': itemType})
        }
        else{
            activeFiltersYC.value = activeFiltersYC.value.filter((value)=> value.name !== filterValue.name )
        }
    } 

    const getActiveFiltersYC = computed(()=>{
        return activeFiltersYC.value
    })

    function getFilterLibrary(){
        filterTotalCountYC.value = 0
        return formattedLibraryYC.value
            .reduce((library, shelf) => {
                let shelfContent = shelf[1]
                .reduce((shelf, bookend) => {
                    let bookendContent = bookend[1]
                    .filter((item) => {
                        let filterPass = itemFilterCheck(item)
                        filterPass ? filterTotalCountYC.value++ : null
                        return filterPass
                    })
                    if(bookendContent.length > 0){
                        shelf.push([bookend[0], bookendContent])
                    }
                    return shelf
                }, [])
                if(shelfContent.length > 0){
                    library.push([shelf[0], shelfContent])
                }
                return library
            }, [])
        }
        
    const filterTotalCountYC = ref(0)

    function itemFilterCheck(item){
        return activeFiltersYC.value.every((filterValue)=>{
            const itemValue = getIFP_YC(item, filterValue.category, filterValue.itemType, 'display name')
            if(isArray(itemValue)) { 
                return itemValue.includes(filterValue.name) }
            else {
                return filterValue.name === itemValue }
        })
    }

    watch([filterLibraryYC],() => {
        filterTotalCountYC.value
        // dataSize.value =  filterLibrary.value.length?   filterLibrary.value.map(d => d[1].map(D => D[1]))[0][0].length : 0
    })

    watch([formattedLibraryYC, libraryDisplayYC],() => {
        // console.log('collectionName.value 22',collectionName.value)
        // console.log('filterLibraryYC 22',filterLibraryYC.value)
        filterLibraryYC.value = getFilterLibrary()
        if(collectionName.value !== undefined){
            if(collectionName.value in allCollections.value){
                allCollections.value[collectionName.value].items = filterLibraryYC.value
                // console.log("new getCollectionData([collectionName.value])", allCollections.value[collectionName.value])
                // console.log("new getCollectionData()", allCollections.value)
            }
        }
    })

        watch([activeFiltersYC],()=>{
            if(collectionName.value !== undefined){
                if(collectionName.value in allCollections.value){
                    console.log('activeFiltersYC.value before 1', activeFiltersYC.value)
                    console.log('allCollections.value[collectionName.value].activeFilters before 1',allCollections.value[collectionName.value].activeFilters)
                    allCollections.value[collectionName.value].activeFilters = activeFiltersYC.value
                    console.log('activeFiltersYC.value after 1', activeFiltersYC.value)
                    console.log('allCollections.value[collectionName.value].activeFilters after 1',allCollections.value[collectionName.value].activeFilters)
                }
            }
    })

    
    watch([collectionName],() => {
        console.log('name changed fired', collectionName.value,allCollections.value )
        // console.log('collectionName.value in allCollections.value', Object.keys(allCollections.value))
        if(collectionName.value !== undefined){
            if(collectionName.value in allCollections.value){
                console.log('name changed', collectionName.value )
                libraryDisplayYC.view = allCollections.value[collectionName.value].display.view 
                libraryDisplayYC.viewType = allCollections.value[collectionName.value].display.viewType
                libraryDisplayYC.pageText = allCollections.value[collectionName.value].display.pageText
                filterLibraryYC.value = allCollections.value[collectionName.value].items
                allCollections.value[collectionName.value].activeFilters.forEach((filterValue)=>{
                    filterActiveReinstateYC(filterValue, filterValue.category, filterValue.itemType)
                })
                activeFiltersYC.value = allCollections.value[collectionName.value].activeFilters
                filterObjectYC.set('Agent', allCollections.value[collectionName.value].filters.get('Agent'))
                filterObjectYC.set('Book', allCollections.value[collectionName.value].filters.get('Book'))
                filterObjectYC.set('Mark', allCollections.value[collectionName.value].filters.get('Mark'))
                // activeFiltersYC.value.forEach((filterValue)=>{
                //     filterUpdate(filterValue, filterValue.category, filterValue.itemType)
                // })
                yourCollection.value = allCollections.value[collectionName.value].yourCollection
            }else{
                yourCollection.value = [];
            }
 
        }
    })



    watch([filterLibraryYC],() => {
        dataSizeYC.value =  filterLibraryYC.value.length?   filterLibraryYC.value.map(d => d[1].map(D => D[1]))[0][0].length : 0
        if(collectionName.value !== undefined){
            if(collectionName.value in allCollections.value){
                allCollections.value[collectionName.value].dataSize = dataSizeYC.value
            }
        }
    },{deep: true})



    watchEffect(() => {
        // if(collectionName.value !== undefined){
        //     allCollections.value[collectionName.value] = getCollectionData()
        //     allCollections.value[collectionName.value].items = filterLibraryYC.value
        //     console.log('collectionName.value',collectionName.value)
        //     console.log('filterLibraryYC',filterLibraryYC.value)
        // }
    })

    function getCollectionData(){
        return {

            ['yourCollection']: [], 
            ['items']: [],
            ['display']: JSON.parse(JSON.stringify(libraryDisplayYC)), 
            ['filters']: new Map([['Agent',{}],['Book',{}],['Mark',{}]]),
            ['activeFilters']: JSON.parse(JSON.stringify(activeFiltersYC.value)), 
            ['dataSize']: JSON.parse(JSON.stringify(dataSizeYC.value)),
            ['id']: collectionIndex.next().value,
            ['edit']: false
        }
    }

    function* getCollectionindex() {
        let current = 0;
        while (true) {
          const reset = yield current++;
          if (reset) {
            current = 0;
          }
        }
      }
      const collectionIndex = getCollectionindex()


    function addToCollection(item) {
        if(collectionName.value !== undefined){
            let id; 
            if(item['FemaleAgentID']) id = 'FemaleAgentID'
            if(item['BookID']) id = 'BookID'
            if(item['MargID']) id = 'MargID'

            const exists = yourCollection.value.find(i => i[id] === item[id]) 

            if(exists) {
                alert('Item already on shelf') //Placeholder for modal option
            }
            if(!exists) {
                yourCollection.value.push({...item}) 
            }
        }
      }

      function addItemsToCollectionCheck(item, accumulator) {
        if(collectionName.value !== undefined){
            let id; 
            if(item['FemaleAgentID']) id = 'FemaleAgentID'
            if(item['BookID']) id = 'BookID'
            if(item['MargID']) id = 'MargID'

            const exists = yourCollection.value.find(i => i[id] === item[id]) 
            const batchExists = accumulator.find(i => i[id] === item[id]) 

            if(exists || batchExists) {
                alert('Item already on shelf') //Placeholder for modal option
            }
            if(!exists && !batchExists) {
                return true
            }
        }
      }

      function getOriginalItem(item){
        let id; 
        let itemType = itemTypeCheckYC(item)

        if(itemType === 'Agent') id = 'FemaleAgentID'
        if(itemType === 'Book') id = 'BookID'
        if(itemType === 'Mark') id = 'MargID'

        return libraryStore[itemType].find((originalItem) => originalItem[id] ===  item[id])
      }



      function addItemsToCollection(items, originalItem, originalItemID, originalItemType){
        let itemBatch = items.filter((element, index, array) =>{
            return addItemsToCollectionCheck(element, array.slice(0, index))
        })

        let batchOriginals = itemBatch.map((element) =>{
            return getOriginalItem(element)
        })

        let batchLinked = batchOriginals.map((element) =>{
            if(checkObjectPath(element, originalItemID) === checkObjectPath(originalItem, originalItemID) ){
                return {...element, main: true, linkedItemIDNumber: originalItem[originalItemID], linkedItemType: originalItemType}
            }else{
                return {...element, main: false, linkedItemIDNumber: originalItem[originalItemID], linkedItemType: originalItemType}
            }
            
        })

        console.log('batchLinked',batchLinked)
        yourCollection.value.push(...batchLinked) 
    }

     function removeFromCollection(item) {
        let id; 
        if(item['FemaleAgentID']) id = 'FemaleAgentID'
        if(item['BookID']) id = 'BookID'
        if(item['MargID']) id = 'MargID'

        yourCollection.value = yourCollection.value.filter(d => d[id] !== item[id])
      }

      return {  allCollections,
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
                getActiveFiltersYC,
                filterTotalCountYC,
                getItemLibraryYC,
                getFilterObjectYC,
                filterActiveToggleYC,
                parseDatabaseYC,
                handleViewSelectionYC,
                getIDP_YC,
                getIFP_YC,
                itemTypeCheckYC,
                addToCollection, 
                removeFromCollection,
                getItemLibraryCountYC,
                getCollectionData,
                addItemsToCollection,
            }
  })

  