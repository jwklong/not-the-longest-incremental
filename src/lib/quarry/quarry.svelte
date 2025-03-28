<script>
    import data from "$lib/data/data";
    import onum from "$lib/onum";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    let {
        id = ""
    } = $props()

    let quarry = $state(data.quarrys[id])

    onMount(() => {
        globalUpdater.addUpdate(() => {
            
        })
    });
</script>

<div class="main">
    
</div>

<style>
    .main {
        display: flex;
        width: 350px;
        height: 300px;
        background: #444;
        box-shadow: inset 0 0 15px #0008;
        border-radius: 8px;
    }
</style>