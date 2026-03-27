/**
 * Swizzled MDXComponents — adds custom components to the global MDX scope.
 * Any component exported here is available in ALL .md / .mdx docs without
 * a per-file import.
 *
 * Official docs: https://docusaurus.io/docs/markdown-features/react#mdx-component-scope
 */
import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import YouTubeEmbed from "@site/src/components/YouTubeEmbed";

export default {
  ...MDXComponents,
  YouTubeEmbed,
};
