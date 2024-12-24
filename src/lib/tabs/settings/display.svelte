<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";

    let settings = $state(data.settings)

    function toggleNews() {
        data.settings.disableNews = !data.settings.disableNews
        settings = data.settings
    }
</script>

<div class="main">
    <Button on:click={toggleNews}>Toggle News Ticker ({settings.disableNews ? "OFF" : "ON"})</Button>
</div>