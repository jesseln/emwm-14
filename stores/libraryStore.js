// import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', ()=>{
    const { getTable, getTableTest, getTableofSize, getImages} = useDatabase();
    const { getImageRefs, itemTypeCheck } = useUtils();
    
    const items = ref([]); //Genereric Getting in case single table is required only
    const Agent = ref([]);
    const Book = ref([]);
    const Mark = ref([]);
    const selectedImageSet = reactive({})
    const selectedImagePreviews = reactive({})
    const complete = reactive({agent:false, mark: false, book: false})
    const libraryItemsTest = ref([])

    //Generic Getter - Returns single table as specified by tableName and orderColumn
    async function getItems(tableName, orderColumn) {
      items.value = await getTable(tableName, orderColumn)
    }

    //Returns Agent Structed Object - Relationally nested Marks then nested by Books 
    async function getAgents() {
        complete.agent = false
        Agent.value = await getTable('Agents', 'FemaleAgentID')
        complete.agent = true
    }

    //Returns Book Structed Object - Relationally nested Marks then nested by Agents
    async function getBooks() {
        complete.book = false
        Book.value = await getTable('Books', 'BookID')
        complete.book = true
    }

    //Returns Mark Structed Object - Relationally nested Books and Agents on same level 
    async function getMarks() {
        complete.mark = false
        Mark.value = await getTable('Marks', 'MargID')
        complete.mark = true
    }

    //Test Function
    async function getLibraryItemsTest(tableName, orderColumn) {
      libraryItemsTest.value = await getTableTest(tableName, orderColumn)
    }

    async function getSelectedImageSet(tableName, orderColumn, ofSize, setName) {
        selectedImageSet[setName] = await getTableofSize(tableName, orderColumn, ofSize)
    }
    
    async function getImagePreviewsofSize(ofSize, setName){
        let itemType
        let imageRefs 
        let imageData
        let itemArray = selectedImageSet[setName]
        selectedImagePreviews[setName] = [];
        let index = 0
            while (index < ofSize){
                itemType = itemTypeCheck(itemArray[index])
                imageRefs = getImageRefs(itemType)
                imageData = await getImages(itemArray[index], imageRefs)
                selectedImagePreviews[setName].push(...imageData.map(image => ({name: image.name, itemID: [imageRefs.id], item: itemArray[index], imageFolder: imageRefs.folder})))
                index++;
            }
    }

      return {items, Agent, Book, Mark, complete, selectedImageSet, selectedImagePreviews, getItems, getAgents, getBooks, getMarks, getSelectedImageSet,  getImagePreviewsofSize, getLibraryItemsTest}
  })