<script lang="ts" context="module">
  function renderDate(date: Date | string = new Date(), locale?: string, params?: Intl.DateTimeFormatOptions) {
    const renderDate = new Intl.DateTimeFormat(locale, params ?? {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    });

    return renderDate.format(new Date(date));
  }

  function renderRelativeDate(date: Date | string = new Date(), locale?: string) {
    const difference = Date.now() - new Date(date).getTime();
    const rtf = new Intl.RelativeTimeFormat(locale);

    for (let hour = 1; hour < 23; hour++) {
      if (difference < hour * 3600 * 1000) {
        return rtf.format(-1 * hour, "hour");
      }
    }

    for (let day = 1; day < 4; day++) {
      if (difference < day * 24 * 3600 * 1000) {
        return rtf.format(-1 * day, "day");
      }
    }

    if (difference < 7 * 24 * 3600 * 1000) {
      return rtf.format(-1, "week");
    }

    return renderDate(date, locale);
  }
</script>

<script lang="ts">
  import { locale } from "@stores/i18n";

  export let date: Date | string = new Date();
  export let options: Intl.DateTimeFormatOptions | undefined = undefined; 
  export let relative: boolean = false;

  $: renderedDate = (relative)
    ? renderRelativeDate(date, $locale)
    : renderDate(date, $locale, options);
</script>

<time datetime={renderedDate}>
  {renderedDate}
</time>

<style>
  time {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: inherit;
    user-select: none;
  }
</style>