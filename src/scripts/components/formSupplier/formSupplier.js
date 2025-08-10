import elements from "../../utils/components.js";
import { apiCep } from "../../../api/cep.js";

 // Conexao da API de CEP
function searchZipCode() {
    const zipCode = $(this).val();
    const zipCodeFormated = zipCode.replace(/\D/g, '');

    if (zipCodeFormated.length !== 8) {
        elements.toasts.container.append(elements.toasts.warning("CEP inválido."));
        elements.actions.clearInputsAddress();
        return;
    }

    elements.inputs.address.val('Buscando...');
    elements.inputs.district.val('Buscando...');
    elements.inputs.city.val('Buscando...');
    elements.inputs.state.val('Buscando...');

    apiCep(zipCodeFormated)
}

export function initializeZipCodeSearch() {
    if (elements.inputs.zipCode.length) {
        elements.inputs.zipCode.on('blur', searchZipCode);
    }
}












