<script>
    import Resource from "$lib/resource/resource.svelte";

    import TabsManager from "$lib/tabs/tabsManager.svelte";
    import Mining from "./quarry/mining.svelte";
    import Inventory from "./quarry/inventory.svelte";

    let tabs = [
        {
            label: "Mining",
            id: "mining",
            color: ["#333", "#ddd"],
            tab: Mining
        }, {
            label: "Inventory",
            id: "inventory",
            color: ["var(--green-900)", "var(--green-400)"],
            tab: Inventory
        }
    ]
</script>

<div class="main">
    <h2>You have <Resource id="euros" showGain /></h2>
    <TabsManager items={tabs} />
</div>

<style>
    .main {
        gap: 16px;
    }
</style>