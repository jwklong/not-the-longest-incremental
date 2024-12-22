<script>
    import Building from "$lib/building/building.svelte";
    import Resource from "$lib/resource/resource.svelte";
</script>
<div class="main">
    <div class="generators">
        <Building id="booster">
            {#snippet generation(effect)}
            (x<Resource id={effect[1]} amountOverride={effect[0]} />)
            {/snippet}
        </Building>
    </div>
    <h2>You have <Resource id="boosterPoints" showGain /></h2>
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