<script>
    import data from "$lib/data/data";
    import globalUpdater from "$lib/globalUpdater";
    import { onMount } from "svelte";

    let timeSpent = $state(data.timeSpent)

    onMount(() => {
        globalUpdater.addUpdate(() => {
            timeSpent = data.timeSpent
        })
    })
</script>

<div>
    <span>You have wasted <b>{(timeSpent / 60).toFixed(1)}</b> minutes of your life.</span>
</div>