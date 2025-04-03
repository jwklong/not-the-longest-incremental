<script>
    import data from "$lib/data/data";
    import globalUpdater from "$lib/globalUpdater";
    import { onMount } from "svelte";

    let timeSpent = $state(data.timeSpent)
    
    let rootEl
    onMount(() => {
        globalUpdater.addUpdate((_, remove) => {
            if (!rootEl) remove()

            timeSpent = data.timeSpent
        })
    })
</script>

<div bind:this={rootEl}>
    <span>You have wasted <b>{(timeSpent / 60).toFixed(1)}</b> minutes of your life.</span>
</div>