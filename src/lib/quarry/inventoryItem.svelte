<script>
    import { QuarryOre } from "./quarry";
    import Resource from "$lib/resource/resource.svelte";
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import onum from "$lib/onum";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    let {
        ore,
        resource
    } = $props()

    let amount = $state(resource.amount)

    onMount(() => {
        globalUpdater.addUpdate(() => {
            amount = resource.amount
        })
    });

    function sell() {
        if (ore.value()) {
            data.resources[ore.value()[1]].amount = data.resources[ore.value()[1]].amount.add(ore.value()[0].mul(amount))
        }

        resource.amount = onum()
    }
</script>

<div class="main">
    <img src={ore.image} alt={ore.name} />
    <div class="left">
        <span class="name">{ore.name}</span>
        <span class="amount">x{amount.toStringWhole(5, 3)}</span>
    </div>
    <div class="right">
        <span class="value">{#if ore.value()}<Resource id={ore.value()[1]} amountOverride={ore.value()[0].mul(amount)} />{:else}{/if}</span>
        <Button on:click={sell}>Sell All</Button>
    </div>
</div>

<style>
    .main {
        position: relative;
        display: flex;
        width: 350px;
        height: 100px;
        padding: 8px 16px;
        box-sizing: border-box;
        background: #444;
        box-shadow: inset 0 0 15px #0008;
        border-radius: 8px;
        flex-direction: row;
        color: #ddd;
        justify-content: space-between;
    }

    img {
        position: absolute;
        height: 100%;
        aspect-ratio: 1;
        top: 0;
        left: 0;
        opacity: 0.5;
    }

    .main > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1;
    }

    .name {
        font-size: 1.5em;
        font-weight: bold;
    }

    .amount {
        padding-bottom: 4px;
    }

    .value {
        font-size: 1.2em;
        font-weight: 500;
        padding: 0px 4px;
        background-color: var(--blue-400);
        color: var(--blue-950);
        border-radius: 4px;
    }

    .right {
        padding-bottom: 8px;
        align-items: flex-end;
    }
</style>