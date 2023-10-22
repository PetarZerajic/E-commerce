import { factories } from "@strapi/strapi";

const getQuery = (key: string, search: string) => {
  const querys = search?.replace("/api/reviews?", "")?.split("&");
  const query = querys.find((query) => query.includes(key));
  const queryValue = query?.replace(`${key}=`, "");
  return queryValue;
};
export default factories.createCoreController("api::review.review", () => ({
  async find(ctx) {
    const { originalUrl } = ctx;
    const { email } = ctx.state?.user || {};
    const productId = getQuery("productId", originalUrl);

    try {
      const data = await strapi.db.query("api::review.review").findMany({
        where: { productId },
      });

      const hasReviewAdded = data.find((review) => review.email === email);
      return { data: [...data], hasReviewAdded: !!hasReviewAdded };
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async create(ctx) {
    const { email, username } = ctx.state.user;
    try {
      const res = await strapi.service("api::review.review").create({
        data: {
          ...ctx.request.body,
          email,
          username,
        },
      });

      return res;
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
}));
