<script lang="ts">
</script>

<main>
    <div class="root">
        <div class="background">
            <div class="background-hero"></div>
            <div class="background-layout"></div>
        </div>
    </div>
</main>

<style>
    .root {
        position: relative;
    }
    
    .background-hero {
        background: var(--bg-hero);
        object-fit: contain;
        width: 100%;
        height: 40dvh;
    }

    .background-layout {
        height: 60dvh;
        background-color: var(--bg-layout);
    }
</style>
