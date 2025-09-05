<template>
    <div class="search-container">
        <div class="search-input-group">
            <span class="material-symbols-outlined search-icon">search</span>
            <input v-model="searchTerm" type="text" placeholder="Buscar por nombre" class="search-input"
                @input="updateSearch" />
            <button @click="clearSearch" class="clear-search-btn">
                <span class="material-symbols-outlined close-btn">close</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const store = useNuxtApp().$store as any

const searchTerm = ref(store.state.searchTerm)

const updateSearch = () => {
    store.commit('SET_SEARCH_TERM', searchTerm.value)
}

const clearSearch = () => {
    searchTerm.value = ''
    updateSearch()
}

watch(() => store.state.searchTerm, (newTerm) => {
    searchTerm.value = newTerm
})
</script>