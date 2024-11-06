import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async linkToCategory(ctx) {
    const { productId, categoryId } = ctx.request.body;

    try {
      // Verifica se o produto existe
      const product = await strapi.entityService.findOne('api::product.product', productId);
      if (!product) {
        return ctx.notFound('Product not found');
      }

      // Verifica se a categoria existe
      const category = await strapi.entityService.findOne('api::category.category', categoryId);
      if (!category) {
        return ctx.notFound('Category not found');
      }

      // Atualiza o produto com a categoria
      const updatedProduct = await strapi.entityService.update('api::product.product', productId, {
        data: {
          category: categoryId,
        },
      });

      // Retorna o produto atualizado com a categoria
      const populatedProduct = await strapi.entityService.findOne('api::product.product', updatedProduct.id, {
        populate: {
          category: true,  // Popula a categoria
        },
      });

      ctx.send({
        message: 'Product linked to category successfully',
        product: populatedProduct,
      });
    } catch (error) {
      ctx.badRequest('An error occurred while linking the product to the category');
    }
  },
}));
