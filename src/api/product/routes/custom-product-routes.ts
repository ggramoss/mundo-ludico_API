// src/api/product/routes/custom-product-routes.ts
import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'POST',
      path: '/products/linkToCategory',
      handler: 'product.linkToCategory', 
      config: {
        auth: false, 
      },
    },
  ],
};
