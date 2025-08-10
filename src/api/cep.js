import  elements  from "../scripts/utils/components.js";

export const apiCep = (cep) => {
    elements.actions.clearInputsAddress()
    $.ajax({
        type: "GET",
        url: `https://viacep.com.br/ws/${cep}/json/`,
        dataType: "json",
    })
    .done(function (data){
        if (data.erro) {
            elements.toasts.container.append(elements.toasts.warning("CEP não encontrado"));
            cleanInputs();
            return
        }


        elements.inputs.address.val(data.logradouro)
        elements.inputs.district.val(data.bairro)
        elements.inputs.city.val(data.localidade)
        elements.inputs.state.val(data.uf)
        
        elements.inputs.numberLocal.focus();
    })
    .fail(function () {
        elements.actions.clearInputsAddress()
        elements.toasts.container.append(elements.toasts.warning("Não foi possível consultar o CEP. Tente novamente mais tarde."));
    }) 
};

