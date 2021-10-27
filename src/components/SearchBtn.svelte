<script lang="ts">
    import SearchIcon from './SearchIcon.svelte'
    import { isSearchVisible } from '../store/search'

    function showSearchDialog() {
        isSearchVisible.set(true)
    }
</script>
<button name="Search button" on:click={showSearchDialog}>
    <SearchIcon />
</button>
