export default function (eleventyConfig) {
  // Copy static assets straight through to the built site.
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Blog posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  // Name of the nav dropdown a page lives under (e.g. "About Us"), shown above page titles.
  eleventyConfig.addFilter("navParent", (navigation, url) => {
    const parent = navigation.find((item) =>
      (item.children || []).some((child) => child.url === url)
    );
    return parent ? parent.title : "";
  });

  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
