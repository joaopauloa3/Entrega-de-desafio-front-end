import elements from "./components.js";
import { loadProducts } from "../utils/storage.js";
import { loadFiles } from "../utils/storage.js";

export function SupplierCheckDatas() {
    const inputsToValidate = [
        elements.inputs.razaoSocial,
        elements.inputs.cnpj,
        elements.inputs.nomeFantasia,
        elements.inputs.zipCode,
        elements.inputs.address,
        elements.inputs.numberLocal,
        elements.inputs.district,
        elements.inputs.city,
        elements.inputs.state,
        elements.inputs.namePeopleContact,
        elements.inputs.phone,
        elements.inputs.email
    ];

    let isValid = true;


    for (const input of inputsToValidate) {
        input.removeClass('border-danger');
    }

    for (const input of inputsToValidate) {
        if ($.trim(input.val()) === '') {
            input.addClass('bg-light');
            input.addClass('border-danger');

            if (isValid) {
                input.focus();
            }

            isValid = false;
        }
    }

    if (!isValid) {
        elements.toasts.container.append(elements.toasts.warning("Preencha todos os campos destacados."));
    }

    return isValid;
}

export function productsCheckDatas() {

    const products = loadProducts();
    let isValid = true;

    if (products.length === 0) {
        elements.toasts.container.append(elements.toasts.warning("É obrigatório adicionar pelo menos um produto."));
        isValid = false;
    }

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const indexProduct = i + 1;
        
        $(`#product-name-${i}, #current-stock-${i}, #unit-value-${i}`).removeClass('border-danger');

        if (!product.descricaoProduto || product.descricaoProduto.trim() === '') {
            elements.toasts.container.append(elements.toasts.warning(`No Produto ${indexProduct}, o campo "Produto" é obrigatório.`));
            $(`#product-name-${i}`).addClass('border-danger').focus();
            
            isValid = false;;
        }
        if (!product.qtdeEstoque || product.qtdeEstoque <= 0) {
            elements.toasts.container.append(elements.toasts.warning(`No Produto ${indexProduct}, o campo "QTD. estoque" deve ser maior que zero.`));
            $(`#current-stock-${i}`).addClass('border-danger').focus();
            
            isValid = false;;
        }
        if (!product.valorUnitario || product.valorUnitario <= 0) {
            elements.toasts.container.append(elements.toasts.warning(`No Produto ${indexProduct}, o campo "Valor unitário" deve ser maior que zero.`));
            $(`#unit-value-${i}`).addClass('border-danger').focus();
            
            isValid = false;;
        }
    }
    return isValid
}

export function filesCheckDatas() {

    const files = loadFiles();
    let isValid = true;

    if (files.length === 0) {
        elements.toasts.container.append(elements.toasts.warning("É obrigatório adicionar pelo menos um documento anexo."));
        isValid = false;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const indexFiles = i + 1;

        if (!file.data || !file.name) {
            elements.toasts.container.append(elements.toasts.warning(`O anexo número ${indexFiles} está corrompido ou incompleto. Por favor, remova-o e adicione novamente.`));
            isValid = false;
        }
    }
    return isValid
}