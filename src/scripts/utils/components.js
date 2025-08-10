let elements = {
    buttons: {},
    inputs: {},
    tables: {},
    toasts: {},
    form: {},
    actions: {},
};

$(function() {
    //Buttons
    elements.buttons.btnAddProduct = $('#add-product');
    elements.buttons.btnAddFile = $('#add-file');
    elements.buttons.btnRemoveFile = $('.remove-file');
    elements.buttons.btnSaveForm = $('#save');

    //Inputs - Dados do fornecedor
    elements.inputs.razaoSocial = $('#razao-social');
    elements.inputs.cnpj = $('#cnpj');
    elements.inputs.nomeFantasia = $('#nome-fantasia');
    elements.inputs.ie = $('#ie');
    elements.inputs.zipCode = $('#zip-code');
    elements.inputs.im = $('#im');
    elements.inputs.address = $('#address');
    elements.inputs.numberLocal = $('#number-local');
    elements.inputs.district = $('#district');
    elements.inputs.city = $('#city');
    elements.inputs.state = $('#state');
    elements.inputs.namePeopleContact = $('#name-people-contact');
    elements.inputs.phone = $('#phone');
    elements.inputs.email = $('#email');

    //Inputs - Produtos
    elements.inputs.productName = $('#product-name');
    elements.inputs.unitOfMeasure = $('#unit-of-measure');
    elements.inputs.currentStock = $('#current-stock');
    elements.inputs.unitValue = $('#unit-value');
    elements.inputs.totalValue = $('#total-value');

    //Iputs - Files
    elements.inputs.file = $('#file');

    //Tables
    elements.tables.tableFilesBody = $("#table-files-body");
    elements.tables.tableProductsBody = $("#table-products-body");


    //Form
    elements.toasts.container = $(".container-toasts")

    //Toasts
    elements.toasts.warning = function (error) {
        return `
            <div class="disappear alert alert-danger" role="alert">
                <strong>Atenção!</strong> ${error}
            </div>
    `
    }


    //Actions
    elements.actions.clearInputsAddress = function() {
        elements.inputs.address.val('')
        elements.inputs.district.val('')
        elements.inputs.city.val('')
        elements.inputs.state.val('')
    }
});

export default elements;