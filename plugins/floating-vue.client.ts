import VMenu from 'floating-vue'
import VDropdown from 'floating-vue'
import FloatingVue from 'floating-vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    VMenu.options.themes['filter-menu'] = {
        ...VMenu.options.themes.menu,
        '$resetCss': true,
        placement: 'left',
    }
    VMenu.options.themes['item-menu'] = {
        ...VMenu.options.themes.menu,
        '$resetCss': true,
        placement: 'left',
    }
    VDropdown.options.themes['filter-dropdown'] = {
        ...VDropdown.options.themes.menu,
        '$resetCss': true,
        placement: 'right',
    }
    VDropdown.options.themes['item-dropdown'] = {
        ...VDropdown.options.themes.menu,
        '$resetCss': true,
        placement: 'left',
    }
    nuxtApp.vueApp.use(VDropdown) // <-- I am not sure if we need this
    return
});
