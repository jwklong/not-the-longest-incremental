<script>
    import data from "$lib/data/data";
    import Milestone from "$lib/milestone.svelte";
</script>

<div class="main">
    <Milestone requirement={() => {
        return data.layers['booster'].hasReset //this is a PERMANENT upgrade
    }}>
        <span>Unlock a Max All button for buildings.</span>
        <span>1 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(3)
    }}>
        <span>Triple building gain.</span>
        <span>3 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(4)
    }}>
        <span>Upgrade 1 has a improved formula.</span>
        <span>4 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(5)
    }}>
        <span>Unlock Fabricators.</span>
        <span>5 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(8)
    }}>
        <span>Boosters have a improved effect.</span>
        <span>8 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(9)
    }}>
        <span>Max All button also buys upgrades.</span>
        <span>9 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(10)
    }}>
        <span>Unlock Providers.</span>
        <span>10 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(12)
    }}>
        <span>Unlock a second row of Perks.</span>
        <span>12 Boosters</span>
    </Milestone>
    <Milestone requirement={() => {
        return data.buildings['booster'].amount.gte(16)
    }}>
        <span>The Quarry.</span>
        <span>16 Boosters</span>
    </Milestone>
</div>

<style>
    .main {
        gap: 8px;
        width: 480px;
    }
</style>