"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// controllers/pedido.js
const strapi_utils_1 = require("strapi-utils");
exports.default = {
    async create(ctx) {
        const { clienteId, produtos } = ctx.request.body.data; // Ajustado para acessar "data"
        // Verificar se o cliente existe
        const cliente = await strapi.services.cliente.findOne({ id: clienteId });
        if (!cliente) {
            return ctx.throw(404, 'Cliente não encontrado');
        }
        // Verificar se os produtos existem e calcular valor total
        let valorTotal = 0;
        for (const produto of produtos) {
            const produtoExistente = await strapi.services.product.findOne({ id: produto.id });
            if (!produtoExistente) {
                return ctx.throw(404, `Produto ${produto.id} não encontrado`);
            }
            valorTotal += produtoExistente.price * produto.quantidade;
        }
        // Criar o pedido
        const pedido = await strapi.services.pedido.create({
            cliente: clienteId,
            produtos: produtos.map(p => p.id), // Presumindo que você armazena apenas os IDs dos produtos
            dataPedido: new Date(),
            status: 'Pendente',
            valorTotal: valorTotal,
        });
        return (0, strapi_utils_1.sanitizeEntity)(pedido, { model: strapi.models.pedido });
    },
};
