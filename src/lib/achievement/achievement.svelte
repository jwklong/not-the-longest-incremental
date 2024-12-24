<script>
    import data from "$lib/data/data";
    import { onMount } from "svelte";

    let {x = 0, y = 0} = $props()

    let achievement = $state(data.achievements.find(v => v.location[0] == y && v.location[1] == x))
    let unlocked = $state(achievement ? achievement.unlocked : false)
    let gilded = $state(achievement ? achievement.gilded : false)

    onMount(() => {
        function update() {
            unlocked = achievement ? achievement.unlocked : false
            gilded = achievement ? achievement.gilded : false
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
</script>

{#if achievement}
    <div class="achievement" class:completed={unlocked} class:gilded={gilded}>
        <span class="title">{achievement.name}</span>
        <div class="number">
            {y}{x}
        </div>
        <div class="tooltip">
            {achievement.description}
            {#if achievement.gildedDescription !== "" && unlocked}
                <br><span class="gild">{achievement.gildedDescription}</span>
            {/if}
        </div>
    </div>
{:else}
    <div class="empty"></div>
{/if}

<style>
    .empty {
        width: 128px;
        height: 128px;
    }

    .achievement {
        width: 128px;
        height: 128px;
        background: var(--red-900);
        border-radius: 8px;
        position: relative;
        user-select: none;
        box-shadow: inset 0 0 16px 2px #0008;
    }
    .achievement.completed {
        background: var(--green-800);
    }
    .achievement.gilded {
        background: var(--gold-800);
    }

    .title {
        color: #fff;
        font-weight: 500;
        text-align: center;
        width: 100%;
        margin-top: 8px;
        display: block;
    }

    .number {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #0006;
        font-weight: 800;
        font-size: 4em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tooltip {
        visibility: hidden;
        display: block;
        position: absolute;
        width: 200px;
        bottom: 95%;
        left: -36px;
        backdrop-filter: brightness(0.2) blur(4px);
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 8px;
        box-sizing: border-box;
        z-index: 2;
    }
    .achievement:hover .tooltip {
        visibility: visible;
    }

    .gild {
        color: var(--gold-300);
        font-weight: 500;
    }
</style>