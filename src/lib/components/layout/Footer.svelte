<script>
  import { Footer } from "$ui/layout";  
  import { message } from "$stores/locale";
  import { Socials } from "$ui/navigation";
  import { Heartbeat } from "$ui/svg";
  import Title from "../Title.svelte";
  
  import { socials } from "$core/routes/socials";
  
  import { 
    creatorGithubProfilePath,
    designerPortfolioPath
  } from "$core/routes";
</script>

<Footer>
  <Title size="1.5rem" iconSize="1.75rem" />
  <span class="summary">
    {$message("introduction")}
  </span>
  <Socials data={socials} color="info" size="35px" />
  <span class="author">
    <span>Made with</span>
    <Heartbeat />
    <a href={creatorGithubProfilePath}>by Eric Rovell,</a>
    <span>illustrated by</span>
    <a href={designerPortfolioPath}>
      Victoria
    </a>
  </span>
  <span class="copyright">
    © {new Date().getFullYear()} BondEcon | All rights reserved.
  </span>
</Footer>
    
<style>
  .summary {
    width: 30ch;
    text-align: center;
  }
  
  a {
    color: var(--color-primary, orange);
  }
</style>