import { storyblokEditable } from "@storyblok/react";

const Teaser = ({ blok }: any) => {
  return (
    <div {...storyblokEditable(blok)} className="py-10 text-center">
      <h2 className="text-4xl font-bold text-stone-900">
        {blok.headline || "Brak nagłówka w Teaserze"}
      </h2>
    </div>
  );
};

export default Teaser;
