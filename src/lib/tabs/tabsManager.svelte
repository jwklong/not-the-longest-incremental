<script>
    import Button from "$lib/button.svelte";

    /** @type {{items: {label: string, color: string[], id: string, tab: *}[]}} */
    let {items = []} = $props();
    let activeTabId = $state(items[0].id);

    /** @argument {string} tabId */
    const handleClick = (tabId) => () => (activeTabId = tabId);
</script>

<div class="main">
    <div class="tabs">
        {#each items as item}
            <Button active={activeTabId === item.id} color={item.color} on:click={handleClick(item.id)}>{item.label}</Button>
        {/each}
    </div>
    {#each items as item}
        {#if activeTabId == item.id}
            <div class="box">
                <item.tab />
            </div>
        {/if}
    {/each}
</div>

<style>
    .main {
        width: 100%;
    }

    .box, .box > :global(*) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tabs {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
        width: 100%;
    }

    .tabs > :global(*) {
        flex-basis: 120px;
    }
</style>
