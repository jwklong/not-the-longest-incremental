<script>
    import Achievement from "$lib/achievement/achievement.svelte";
    import data from "$lib/data/data";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    let achievements = $state(data.achievements)
    let completed = $derived(achievements.filter(v => v.unlocked).length)
    let gilded = $derived(achievements.filter(v => v.gilded).length)

    onMount(() => {
        globalUpdater.addUpdate(() => {
            achievements = data.achievements
        })
    })
</script>

<div class="main">
    <span>{completed} <span class="gild">({gilded})</span> out of {achievements.length} completed.</span>
    {#each Array(5) as _,y}
        <div class="row">
            {#each Array(5) as _,x}
                <Achievement x={x+1} y={y+1} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .main {
        gap: 8px;
    }

    .gild {
        color: var(--gold-700);
        text-shadow: 0 0 4px var(--gold-200);
        font-weight: bold;
    }

    .row {
        display: flex;
        gap: 8px;
    }
</style>