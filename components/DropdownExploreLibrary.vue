<template>
    <div class="library-menu-wrapper">
        <h2 class="menu-title">View the Libraries by Category</h2>
        <div class="menu-page" >
                <div class="index-list-main-container">
                    <div class="nuxtlink">
                        <NuxtLink to="/library/agents" @click="$emit('modalClicked')">
                            <div class="index-list-main">
                                <div class="icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" :width="11*icons.agentIcon.iconWidth" :height="33*icons.agentIcon.iconHeight" viewBox="0 0 11 33" fill="none">
                                        <path d="M0 5.35535C0 2.39767 2.39767 0 5.35535 0C8.31302 0 10.7107 2.39767 10.7107 5.35535V26.7767C10.7107 29.7344 8.31302 32.1321 5.35535 32.1321C2.39767 32.1321 0 29.7344 0 26.7767V5.35535Z" :fill="icons.agentIcon.iconFill"/>
                                    </svg>
                                </div>
                                <h3>The Agents</h3>   
                            </div>
                        </NuxtLink>
                    </div>
                </div>
                <div class="index-list-main-container">
                    <div class="nuxtlink">
                    <NuxtLink to="/library/books" @click="$emit('modalClicked')"  >
                        <div class="index-list-main">
                            <div class="icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.bookIcon.iconWidth" :height="30*icons.bookIcon.iconHeight" viewBox="0 0 10 30" fill="none">
                                    <path d="M0.00512695 0H10V29.9846H0.00512695V0Z" :fill="icons.bookIcon.iconFill"/>
                                </svg>
                            </div>
                            <h3>The Books</h3>
                        </div>
                    </NuxtLink>
                    </div>
                </div>
                <div class="index-list-main-container">
                    <div class="nuxtlink">
                    <NuxtLink to="/library/marks" @click="$emit('modalClicked')" >
                    <div class="index-list-main">
                        <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="10*icons.markIcon.iconWidth" :height="33*icons.markIcon.iconHeight" viewBox="0 0 10 33" fill="none">
                            <path d="M0.379883 6.90698L4.99988 0L9.61988 6.90698V33H0.379883V6.90698Z" :fill="icons.markIcon.iconFill"/>
                        </svg>
                        </div>
                        <h3>The Marks</h3>
                    </div>
                    </NuxtLink>
                    </div>
                </div>
        </div>
        <h2 class="menu-subtitle">Or select a question to explore the libraries with a preset view...</h2>
        <div class="menu-page" >
            <div class="index-list-container">
                <div class="index-list-wrapper">
                    <pre>
                        Agent 
                        Questions
                    </pre>   
                    <div class="index-list">
                        <ul class="library-query">
                            <NuxtLink to="/library/agent01" @click="$emit('modalClicked')" >    
                                <li>How many agents are in the collection?</li>     
                            </NuxtLink>            
                            <NuxtLink to="/library/agent02" @click="$emit('modalClicked')" >                            
                                <li>What years did each agent make their marks?</li>
                            </NuxtLink>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="index-list-container">
                <div class="index-list-wrapper">
                    <pre>
                        Books 
                        Questions
                    </pre>
                    <div class="index-list">
                        <ul class="library-query">  
                            <NuxtLink to="/library/book01" @click="$emit('modalClicked')" >
                                <li>What kinds of books did people read?</li>
                            </NuxtLink>
                            <NuxtLink to="/library/book02" @click="$emit('modalClicked')" >    
                                <li>Where can you find the books today?</li>
                            </NuxtLink>
                            <NuxtLink to="/library/book03" @click="$emit('modalClicked')" >    
                                <li>What years were the books published?</li>
                            </NuxtLink>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="index-list-container">
                <div class="index-list-wrapper">
                    <pre>
                        Marks 
                        Questions
                    </pre>
                    <div class="index-list">
                        <ul class="library-query">  
                            <NuxtLink to="/library/mark01" @click="$emit('modalClicked')" >
                                <li>What types of marks did each agent make?</li>
                            </NuxtLink>
                            <NuxtLink to="/library/mark02" @click="$emit('modalClicked')" >    
                                <li>How many marks did each agent make?</li>
                            </NuxtLink>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>

<script setup>

//Function format written to use local vairables and return to reactive value
function iconDimensions(){
    const scaleWidth = 1;
    const scaleHeight = 1;
    const fill = '#222';
    return {
        agentIcon:{
            iconHeight: 0.9  * scaleHeight,
            iconWidth: 0.7 * scaleWidth,
            iconFill: fill,
        },
        bookIcon:{
            iconHeight: 1 * scaleHeight,
            iconWidth: 0.7 * scaleWidth,
            iconFill: fill,
        },
        markIcon:{
            iconHeight: 0.9 * scaleHeight,
            iconWidth: 0.75 * scaleWidth,
            iconFill: fill,
        },
    }
}

const icons = ref()

watchEffect(()=>{
    icons.value = iconDimensions()
})

</script>

<style lang="scss" scoped>

:root{
    /* COLOURS */
    --footerColour: rgba(30,30,30,1);
    --brandColour: #ed0741FF;
    --black: #1A1A1AFF;
    --lightGrey: #F5F5F5FF;
    --white: #FFFFFFFF;
    --borderGrey: #B3B3B3FF;
    --textGrey: #B9B9B9FF;
    --textBodyBlack: #B9B9B9FF;
    --textMidGrey: #4D4D4DFF;
    --textBlack: #1A1A1AFF;
    --textBodyBlack: #333333FF;

    /* FIXED WIDTHS AND BORDERS */
    --mediaWidth: 600px;
    --sideMargins: clamp(2rem, 6vw, 5rem);
    --borderWidth: 3px;
    --borderWidth-S: 1.75px;
    
  }


.library-menu-wrapper{
    background-color: white;
    margin: 0 10rem 5rem;

}

.menu-title{
    padding: 0;
    margin: 3rem 0 0 0;
	color: rgb(56, 56, 56);
	font-family: 'Source Serif 4', serif;
	font-size: 1.0rem;
	font-weight:350;
	letter-spacing: 0.2rem;
    color: rgb(80, 80, 80);

}
.menu-subtitle{
    padding: 0;
    margin: 3rem 0 1.25rem 0;
	font-family: 'Source Serif 4', serif;
	font-size: 1.0rem;
	font-weight:350;
	letter-spacing: 0.2rem;
    color: rgb(80, 80, 80);

}
.menu-page{
    margin: 1rem 0 1rem;
    grid-area: index;
    z-index: 1;
    display: flex;
    flex-flow: row wrap;
    }


.index-list-main-container{
    display: flex;
    flex-flow: row wrap;
    flex-grow: 1;

}
.index-list-main{
    padding: 1rem 0 1rem 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 24vw;
}
.nuxtlink{
    width: 24vw;
}

.index-list-container{
    display: flex;
    flex-flow: row wrap;
    flex-grow: 1;
}
.index-list-wrapper{
    display: flex;
    flex-flow: column wrap;
    padding: 1rem 0 1rem 2rem;
    width: 24vw;
    // flex-grow: 1;
}
  .index-list{
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
  }

.icon-container{
    padding: 0.5rem 1rem 0.5rem 0;
    border-right: 1px solid #1A1A1AFF;
}
  .index-list-container pre{
    padding: 0 0 0.5rem 1rem;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.15rem;
	font-weight: 400;
	letter-spacing: 0.425rem;;
    // word-wrap: break-word;
    white-space: pre-line;
    // max-width: 10vw;;
  }

  .index-list-main h3{
    // padding: 2rem 0 0 0;
    margin: 0 0 0 0.75rem;
	color: black;
	font-family: 'Source Sans 3', sans-serif;
	font-size: 1.65rem;
	font-weight:350;
	letter-spacing: 0.425rem;
  }
  
  .index-list ul{
    margin: 0.5rem 0 0 0;
    font-family: 'Raleway', sans-serif;
	font-size: 0.8rem;
	font-weight: 500;
    letter-spacing: 0.05rem;
    line-height: 1.25rem;
	color: black;

    // width: 80%;
  }

  .index-list ul li{
    padding: 0.5rem 2rem 0.5rem 1rem;
    margin: 0.25rem 0;
    text-decoration: none;
    color: black;  
}

  .library-query li:hover {background-color:rgb(241, 241, 241);}
  .library-query li:focus {background-color: #fdfdfd;}
  
 .nuxtlink:hover {background-color: rgb(241, 241, 241);}
.nuxtlink:focus {background-color: #fdfdfd;}
</style>