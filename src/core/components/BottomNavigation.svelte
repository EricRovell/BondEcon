<script lang="ts">
  import { navigationBottom as navigation, menuButton } from "../meta";
  import { BottomNavigation, BottomMenu } from "@components/navigation/bottom-navigation";
  import { Menu, MenuItem } from "@components/navigation/menu";
  import { LangSelect, ThemeToggle, Button } from "@components/input";
  import { Icon } from "@svg";
  import { message } from "@stores/locale";

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
          {$message(label, {
            defaultMessage: label  
          })}
        </span>
      </MenuItem>
    {/each}
    <li>
      <Button on:click={switchMenu} appearance="text">
        <span class="nav-button">
          <Icon path={menuButton.icon} size="25px" />
          {$message(menuButton.label, {
            defaultMessage: "Menu"
          })}
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