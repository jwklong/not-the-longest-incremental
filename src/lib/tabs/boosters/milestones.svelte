<script>
    import data from "$lib/data/data";
    import Milestone from "$lib/milestone.svelte";
</script>

<div class="main">
    <Milestone requirement={() => {
        return data.getLayer('booster').hasReset //this is a PERMANENT upgrade
    }}>
        <span>Unlock a Max All button for buildings.</span>
        <span>1 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.getBuilding('booster').amount.gte(3)
    }}>
        <span>Triple building gain.</span>
        <span>3 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.getBuilding('booster').amount.gte(4)
    }}>
        <span>Upgrade 1 has a improved formula.</span>
        <span>4 Boosters</span>
    </Milestone>
</div>

<style>
    .main {
        gap: 8px;
        width: 480px;
    }
</style>