<script>
    import data from "$lib/data/data";
    import onum from "$lib/onum";
    import { onMount } from "svelte";

    let {
        id = "",
        amountOverride = onum(-1),
        showGain = false
    } = $props()

    let resource = $state(data.getResource(id))
    let amount = $state(amountOverride.isNegative() ? resource.amount : amountOverride)
    let gain = $state(resource.gain())
    let spanConfig = $derived(resource.spanConfig)

    onMount(() => {
        function update() {
            amount = amountOverride.isNegative() ? resource.amount : amountOverride
            gain = resource.gain()
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
</script>

<span class={spanConfig.outerClass}>
    {amount.toStringWhole(5, 3, 3)}<span class={spanConfig.symbolClass}>{spanConfig.symbol}</span>{#if showGain}
    <sub>
    (+{gain.toStringWhole(5, 3, 3)}/s)
    </sub>
{/if}
</span>

<style>
    .symbolPoints {
        color: var(--blue-900);
        font-weight: bold;
    }

    sub {
        font-size: 0.5em;
    }
</style>