<script>
    import TabsManager from "$lib/tabs/tabsManager.svelte";
    import Changelog from "./settings/changelog.svelte";
    import Credits from "./settings/credits.svelte";
    import Display from "./settings/display.svelte";
    import Gameplay from "./settings/gameplay.svelte";

    let tabs = [
        {
            label: "Gameplay",
            id: "gameplay",
            color: ["var(--orange-200)"],
            tab: Gameplay
        },
        {
            label: "Display",
            id: "display",
            color: ["var(--blue-700)", "#fff"],
            tab: Display
        },
        {
            label: "Changelog",
            id: "changelog",
            color: ["var(--blue-950)", "#fff"],
            tab: Changelog
        },
        {
            label: "Credits",
            id: "credits",
            color: ["var(--orange-900)", "#fff"],
            tab: Credits
        }
    ]
</script>

<TabsManager items={tabs} />