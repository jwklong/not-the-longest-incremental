<script>
    import Quarry from "$lib/quarry/quarry.svelte";
    import Building from "$lib/building/building.svelte";
</script>

<div class="main">
    <Quarry id="normal" />
    <div class="generators">
        <Building id="miner">
            {#snippet generation(effect)}
            (-{effect[0].toStringWhole(5, 3, 3)}/s)
            {/snippet}
        </Building>
    </div>
</div>

<style>
    .main {
        gap: 16px;
    }

    .generators {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>