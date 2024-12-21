<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import Resource from "$lib/resource/resource.svelte";
    import { onMount } from "svelte";

    let { id } = $props()

    let building = $state(data.getBuilding(id))
    let image = $derived(building.image)
    let name = $derived(building.name)
    let amount = $state(building.amount)
    let cost = $derived(building.cost)
    let effect = $state(building.effect())
    let canBuy = $state(building.canBuy())
    let visible = $state(building.visible())

    onMount(() => {
        function update() {
            amount = building.amount
            effect = building.effect()
            canBuy = building.canBuy()
            visible = building.visible()
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
</script>

{#if visible}
    <div class="main">
        <img src={image} alt="" />
        <span>{amount.toStringWhole(5, 3)} {name}s</span>
        <span>(+<Resource id={effect[1]} amountOverride={effect[0]} />/s)</span>
        <Button
            disabled={!canBuy}
            on:click={() => building.buy()}
            color={["var(--green-300)"]}
        >Buy (<Resource id={cost[1]} amountOverride={cost[0].eval(amount)} />)</Button>
    </div>
{/if}

<style>
    .main {
        display: flex;
        gap: 8px;
        align-items: center;

        width: 480px;
    }

    img {
        width: 32px !important;
    }

    .main > :global(button) {
        width: 160px;
        margin-left: auto;
    }
</style>