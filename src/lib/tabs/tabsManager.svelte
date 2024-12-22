<script>
    import Button from "$lib/button.svelte";
    import { onMount } from "svelte";

    /** @type {{items: {label: string, color: string[], visible: (()=>boolean)?, id: string, tab: *}[]}} */
    let {items = []} = $props();
    let activeTabId = $state(items[0].id);

    /** @argument {string} tabId */
    const handleClick = (tabId) => () => (activeTabId = tabId);

    let itemsVisible = $state({})
    for (let item of items) {
        itemsVisible[item.id] = item.visible ? item.visible() : true
    }
    onMount(() => {
        function main() {
            for (let item of items) {
                itemsVisible[item.id] = item.visible ? item.visible() : true
            }
            requestAnimationFrame(main)
        }
        requestAnimationFrame(main)
    })
</script>

<div class="main">
    <div class="tabs">
        {#each items as item}
            {#if itemsVisible[item.id]}
                <Button active={activeTabId === item.id} color={item.color} on:click={handleClick(item.id)}>{item.label}</Button>
            {/if}
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
        width: 100%;
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
