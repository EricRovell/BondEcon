<script context="module">
  let menu = [
    {
      label: "Menu",
      open: true,
      items: [
        {
          label: "Econtwitt",
          items: [
            {
              label: "Post",
              href: "/admin/econtwitt/post"
            }
          ]
        }
      ]
    }
  ];
</script>

<script>
  import { Accordeon } from "$ui/navigation";
</script>

<div class="container">
  <nav>
    <Accordeon items={menu} />
  </nav>
  <div class="page">
    <slot />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template: 1fr / 350px 1fr;
    justify-self: center;
    width: min(100%, var(--max-width));
    margin-top: 1.5em;
  }
  
  .page {
    display: flex;
    justify-content: center;
  }
</style>