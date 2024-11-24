.<template>
    <div class="explore-item-wrapper" 
        :style="{ maxHeight: 250 + 'px', 
        height: 200 + 'px', 
        width: 150 + 'px'}">
        <NuxtLink :to="`/explore/${item.linkName}`">
        <div class="explore-item" 
        v-on="itemHandlers" 
        :style="{ 
            height: 160 + 'px', 
            width: 160 + 'px'}"
        >
            <NuxtImg class="explore-item-image" 
            :class="[topViewClass]"
            :src="`https://hmgugjmjfcvjtmrrafjm.supabase.co/storage/v1/object/public/${item.imageFolder}/${item.itemID}/${item.itemImage.name}`" 
            />
        </div>
        </NuxtLink>
    <h2 class="explore-item-title">{{item.name}}</h2>
    </div>
    <div class="section-shelf-box">
    <!-- Shelf Box DO NOT DELETE -->
    </div>
</template>

<script setup>
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { VueperSlides, VueperSlide } from 'vueperslides'
import { storeToRefs } from "pinia";
import 'vueperslides/dist/vueperslides.css'


const loadedCheck = ref(false);
const loadedFail = ref(false);
//Props
const {item, itemBundle} = defineProps(['item', 'itemBundle']);
const {viewDetails} = defineEmits(['viewDetails']);
const supabase = useSupabaseClient()
const topViewClass = ref(item.class)

// const imageFolder = ref('mark-images')
// const itemID = ref('101')
// const itemImage = ref({name:'MargID_101_(2_of_2).jpg'})




// Event Handlers
const itemHandlers = {
  mouseover: handleMouseOver,
  mouseout: handleMouseOut
}

function handleMouseOver(d) {
    d3.select(d.currentTarget)
    .transition().ease(d3.easeQuadInOut)
    .duration(500)
        .style('transform', getUpPos(d.currentTarget, true))

}

function handleMouseOut(d) {
    d3.select(d.currentTarget)
    .transition().ease(d3.easeQuadInOut)
    .duration(250)
        .style('transform', getUpPos(d.currentTarget, false))


}function getUpPos(elm, isUp) {
    if( elm.classList.contains('explore-item')){
        return `translate(0, ${(isUp ? -10 : 0)}px)`
    }


}

</script>

<style lang="scss" scoped>
.explore-item-title{
    padding: 0 0 0.25rem 0;
    color: black;
    font-family: "Source Sans 3", sans-serif;
    font-size: 1.15rem;
    font-weight: 550;
    letter-spacing: 0.15rem;
}

.explore-item-image{
    transition: all 0.3s ease-in-out;
}

.explore-item-image:hover{
    filter: brightness(70%);
}

.topViewClassWomen{
    position: absolute;
    bottom: -60px;
    left: -71px;
    clip-path: circle(65px at 145px 181px);
    height: 325px;
}

.topViewClassOwnership{
    position: absolute;
	bottom: -26px;
	left: -106px;
    clip-path: circle(65px at 180px 110px);
    height: 220px;
}

.topViewClassReading{
    position: absolute;
	bottom: -200px;
	left: -160px;
    clip-path: circle(65px at 234px 141px);
    height: 425px;
}

.topViewClassRecording{
    position: absolute;
	bottom: -111px;
	left: -71px;
    clip-path: circle(65px at 145px 170px);
    height: 365px;
}

.topViewClassGraffiti{
    position: absolute;
	bottom: -116px;
	left: -80px;
    clip-path: circle(65px at 154px 200px);
    height: 400px;
}

.topViewClassAttribution{
    position: absolute;
	bottom: -150px;
	left: -71px;
    clip-path: circle(65px at 145px 166px);
    height: 400px;
}

.topViewClassBookTypes{
    position: absolute;
	bottom: -146px;
	left: -36px;
    clip-path: circle(65px at 110px 95px);
    height: 325px;
}

.topViewClassLocations{
    position: absolute;
	bottom:10px;
	left: -71px;
    clip-path: circle(65px at 145px 250px);
    height: 325px;
}

.topViewClassRepositories{
    position: absolute;
	bottom: -80px;
	left: -40px;
    clip-path: circle(65px at 114px 161px);
    height: 325px;
}

</style>