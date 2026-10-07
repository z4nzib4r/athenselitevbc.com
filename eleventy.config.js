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

  return {
    dir: { input: "src", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
