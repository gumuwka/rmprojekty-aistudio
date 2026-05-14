import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Grid = ({ blok }: any) => {
  return (
    <div {...storyblokEditable(blok)} className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto py-12">
      {blok.columns?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
