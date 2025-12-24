<script lang="ts">
  import { themeState, toggleTheme } from "../utils/theme";
</script>

<button class="button button-icon" title="toggle theme" onclick={toggleTheme}>
  <span
    class="icon"
    class:icon-sun={$themeState === "dark"}
    class:icon-moon={$themeState !== "dark"}
  />
</button>

<style>
  .button {
    position: relative;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    background-size: contain; /* ИЛИ cover */

    &:hover {
      opacity: 0.7;
    }
  }

  .button-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-moon {
    background-image: url("../assets/icons/icon-moon.svg");
  }

  .icon-sun {
    background-image: url("../assets/icons/icon-sun.svg");
  }
</style>
