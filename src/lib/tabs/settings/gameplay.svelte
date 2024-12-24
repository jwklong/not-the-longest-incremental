<script>
    import data from "$lib/data/data";
    import Button from "$lib/button.svelte";

    function importData() {
        let s = prompt("Paste data here")
        if (s) data.deserialize(s)
    }

    async function exportData() {
        try {
            await navigator.clipboard.writeText(data.serialize())
            alert("Data has been copied to clipboard!")
        } catch (e) {
            prompt("Failed to copy data to clipboard, copy manually", data.serialize())
        }
    }

    function resetData() {
        if (confirm("Are you sure you want to reset your data? This cannot be reverted!")) {
            window.onbeforeunload = () => {}
            localStorage.removeItem("NTLIdata")
            location.reload()
        }
    }
</script>

<div class="main">
    <h2>Data</h2>
    <div class="row">
        <Button on:click={importData}>Import data</Button>
        <Button on:click={exportData}>Export data</Button>
        <Button on:click={resetData} color={["var(--red-300)"]}>Reset data</Button>
    </div>
</div>

<style>
    .main {
        gap: 8px;
    }

    .row {
        display: flex;
        direction: row;
        gap: 8px;
    }
</style>
