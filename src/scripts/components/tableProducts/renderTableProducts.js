import elements from "../../utils/components.js";
import { loadProducts, saveProducts } from "../../utils/storage.js";


function renderTableProducts() {
    elements.tables.tableProductsBody.empty();

    const products = loadProducts();

    if (products.length === 0) {
        elements.tables.tableProductsBody.append(
            `<tr><td colspan="3" class="text-center">Nenhum produto incluído. <strong>(Obrigatório)</strong></td></tr>`
        );
        return;
    }
    $.each(products, (index, product) => {
        const tr = `
            <tr>
                <td class="cursor-pointer fs-width-50 align-middle">
                    <img data-index="${index}" style="width: 40px;" class="fs-border-radius bg-danger p-2 remove-product" src="./src/assets/icons/fluigicon-trash.png">
                </td>
                <td>
                    <fieldset class="fs-border-radius align-items-center fs-display-flex border border-dark p-2">
                        <legend class="w-auto border-0 px-3">Produto - ${index + 1}</legend>
                        <div class="container-icon rounded-circle p-2">
                            <i class="text-white ph ph-package"></i>
                        </div>
                        <div class="w-100">
                            <div class="form-group col-sm-12">
                                <label for="product-name-${index}">Produto</label>
                                <input required type="text" class="form-control" id="product-name-${index}" value="${product.descricaoProduto || ''}">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="unit-of-measure-${index}">UND. medida</label>
                                <select required class="form-control" id="unit-of-measure-${index}">
                                    <option value=""></option>
                                    <option value="un">Unidade (un)</option>
                                    <option value="pc">Peça (pç)</option>
                                    <option value="kg">Quilograma (kg)</option>
                                    <option value="l">Litro (L)</option>
                                    <option value="cx">Caixa (cx)</option>
                                    <option value="pct">Pacote (pct)</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="current-stock-${index}">QTD. estoque</label>
                                <input required type="number" step="0.01" class="form-control" id="current-stock-${index}" value="${product.qtdeEstoque || 0}">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="unit-value-${index}">Valor unitário</label>
                                <input required type="number" step="0.01" class="form-control" id="unit-value-${index}" value="${product.valorUnitario || 0}">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="total-value-${index}">Valor total</label>
                                <input required type="number" step="0.01" class="form-control bg-secondary text-white" readonly id="total-value-${index}" value="${product.valorTotal || 0}">
                            </div>
                        </div>
                    </fieldset>
                </td>
            </tr>
        `;
        elements.tables.tableProductsBody.append(tr);
        $(`#unit-of-measure-${index}`).val(product.unidadeMedida);
    });
}
export function handleProducts() {
    elements.buttons.btnAddProduct.on('click', function(e) {
        e.preventDefault()
        let currentProducts = loadProducts();
        
        currentProducts.push({
            indice: currentProducts.length + 1,
            descricaoProduto: "",
            unidadeMedida: "un",
            qtdeEstoque: 0,
            valorUnitario: 0,
            valorTotal: 0,
        });

        saveProducts(currentProducts);
        renderTableProducts();
    });

    elements.tables.tableProductsBody.on("click", ".remove-product", function() {
        const index = $(this).data('index');
        let products = loadProducts(); 

        products.splice(index, 1); 

        saveProducts(products);
        renderTableProducts();
    });
    elements.tables.tableProductsBody.on('input change', 'input, select', function() {
        const row = $(this).closest('tr');
        const index = row.find('.remove-product').data('index');
        
        if(index === undefined) return;

        let products = loadProducts();
        const productData = {
            descricaoProduto: $(`#product-name-${index}`).val(),
            unidadeMedida: $(`#unit-of-measure-${index}`).val(),
            qtdeEstoque: parseFloat($(`#current-stock-${index}`).val()) || 0,
            valorUnitario: parseFloat($(`#unit-value-${index}`).val()) || 0,
        };
        productData.valorTotal = productData.qtdeEstoque * productData.valorUnitario;
        products[index] = { ...products[index], ...productData };
        $(`#total-value-${index}`).val(productData.valorTotal.toFixed(2));

        saveProducts(products);
    });

    renderTableProducts();
}
