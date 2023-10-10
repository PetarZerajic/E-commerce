("use strict");
/**
 * order controller
 */

const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCoreController } = require("@strapi/strapi").factories;

interface ctxProps {
  request: { body: { products: any } };
  response: { status: number };
}
module.exports = createCoreController("api::order.order", () => ({
  async create(ctx: ctxProps) {
    const { products } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (order) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(order.id);

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100), //we multiply because of cents,
            },
            quantity: order.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["GB", "US"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/cart?success=true`,
        cancel_url: `${process.env.CLIENT_URL}/cart?canceled=true`,
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));
