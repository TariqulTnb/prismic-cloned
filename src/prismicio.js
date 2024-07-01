import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const { repositoryName } = sm;

/**
 * A list of Route Resolver objects that define how a document's \`url\` field
 * is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
export const routes = [
  {
    type: "page",
    uid: "homepage",
    path: "/:lang?",
  },
  {
    type: "page",
    path: "/:lang?/:uid",
  },
  {
    type: "page",
    path: "/:lang?/:uid",
  },
  {
    type: "van_model",
    path: "/:lang?/models/:uid",
  },
  {
    type: "career_interview",
    path: "/:lang?/interview/:uid",
  },
  {
    type: "blog_post",
    path: "/:lang?/blog/:uid",
  },
  {
    type: "configurator_page",
    path: "/:lang?/configurator/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};
