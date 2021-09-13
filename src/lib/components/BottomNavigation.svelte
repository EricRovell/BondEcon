<script lang="ts">
  import { homePagePath, blogPagePath, cvPagePath } from "@core/routes";
  
  import { BottomNavigation, BottomMenu } from "./bottom-navigation";
  import { Menu, MenuItem } from "./menu";
  import Button from "./Button.svelte";
  import { ThemeToggle, LangSelect } from "./utility";
  import { Icon, iconQuill, iconMagicWand, iconHeels, iconMagic } from "./svg";
  import { _ } from "svelte-i18n";
  
  $: navigation = [
    {
      label: "blog",
      href: $blogPagePath,
      icon: iconQuill,
      pattern: /blog\/*/
    },
    {
      label: "cv",
      href: $cvPagePath,
      icon: iconHeels,
      pattern: /cv\/*/
    },
    {
      label: "home",
      href: $homePagePath,
      icon: iconMagicWand,
    }
  ];

  /* Submenu show state */
  let show = false;

  function switchMenu() {
    show = !show;
  }
</script>

<!--
  @component
  BondEcon BottomBar component.  
-->
<BottomNavigation>
    <Menu slot="navigation" wide spacing="equal">
    {#each navigation as { label, href, icon, pattern }}
      <MenuItem {href} decorationPosition="top" prefetch {pattern}>
        <span class="nav-button">
          <Icon path={icon} size="25px" />
          {$_(`sections.${label}`)}
        </span>
      </MenuItem>
    {/each}
    <li>
      <Button on:click={switchMenu} appearance="text">
        <span class="nav-button">
          <Icon path={iconMagic} size="25px" />
          {$_("sections.menu")}
        </span>
      </Button>
    </li>
  </Menu>
  <BottomMenu slot="menu" {show} on:close={switchMenu}>
    <LangSelect />
    <ThemeToggle size="35px" />
  </BottomMenu>
</BottomNavigation>

<style>
  .nav-button {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.25em;
    
    width: 40px;
    height: 40px;
    
    font-size: 12px;
  }
</style>