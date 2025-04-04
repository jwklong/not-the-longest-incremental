<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";

    let settings = $state(data.settings)

    function toggle(value) {
        data.settings[value] = !data.settings[value]
        settings = data.settings
    }
</script>

<div class="main">
    <Button on:click={() => toggle("disableNews")}>Toggle News Ticker ({settings.disableNews ? "OFF" : "ON"})</Button>
    <br />
    <Button on:click={() => toggle("darkMode")}>Dark Mode ({settings.darkMode ? "ON" : "OFF"})</Button>
</div>