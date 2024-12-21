<script>
    import Building from "$lib/building/building.svelte";
</script>
<div>
    <div class="generators">
        <Building id="maker" />
        <Building id="generator" />
    </div>
</div>

<style>
    .generators {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>