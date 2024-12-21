<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import Resource from "$lib/resource/resource.svelte";
    import { onMount } from "svelte";

    let { id, desc } = $props()

    let upgrade = $state(data.getUpgrade(id))
    let bought = $state(upgrade.bought)
    let cost = $state(upgrade.cost())
    let effect = $state(upgrade.effect())
    let canBuy = $state(upgrade.canBuy())
    let visible = $state(upgrade.visible())

    onMount(() => {
        function update() {
            bought = upgrade.bought
            cost = upgrade.cost()
            effect = upgrade.effect()
            canBuy = upgrade.canBuy()
            visible = upgrade.visible()
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
</script>

{#if visible}
    <div class="main">
        <Button
            color={["var(--green-300)"]}
            disabled={!canBuy && !bought}
            active={bought}
            on:click={() => upgrade.buy()}
        >
            {@render desc(effect)}<br>
            <Resource id={cost[1]} amountOverride={cost[0]} />
        </Button>
    </div>
{/if}

<style>
    .main {
        width: 200px;
    }

    .main :global(button) {
        width: 100%;
        height: 100%;
    }
</style>