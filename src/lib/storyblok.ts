import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "../components/Storyblok/Page";
import Teaser from "../components/Storyblok/Teaser";
import Grid from "../components/Storyblok/Grid";

// Register components here later
export const initStoryblok = () => {
  storyblokInit({
    accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
      page: Page,
      teaser: Teaser,
      Teaser: Teaser,
      grid: Grid,
      Grid: Grid,
    },
  });
};
