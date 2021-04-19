<script>
  import { locale, message } from "@stores/locale";
  import { Menu, MenuItem } from "@components/navigation";
  import { navigationBlog as navigation } from "@core/meta";
</script>

<div class="navigation">
  <Menu border wide>
    {#each navigation as { href, label }}
      <MenuItem href={`/${$locale}${href}`} decorationSize="4px">
        {$message(label, { defaultMessage: label })}
      </MenuItem>
    {/each}
  </Menu>
</div>
<div class="content">
  <slot />
</div>

<style>
  .navigation {
    position: sticky;
    top: 0;
    width: min(var(--max-width, 1440px), 100%);
    justify-self: center;
    z-index: calc(var(--z-index-navigation) + 1);
    background-color: hsl(var(--surface-h) var(--surface-s-400) var(--surface-l-400) / 0.8);
    backdrop-filter: saturate(180%) blur(5px);
    transition: background-color 0.2s linear;
  }
  
  .content {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin-top: 2.5em;

    position: relative;
  }
</style>