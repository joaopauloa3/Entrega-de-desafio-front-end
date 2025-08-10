import elements from "./utils/components.js";
import { handleFiles } from "./components/tableFiles/renderTableFile.js";
import { handleProducts } from "./components/tableProducts/renderTableProducts.js";
import { initializeZipCodeSearch } from "./components/formSupplier/formSupplier.js";
import { SupplierCheckDatas, productsCheckDatas, filesCheckDatas } from "./utils/handleSaveData.js";
import { loadFiles, loadProducts } from "./utils/storage.js";

function buildJson() {
    const dataJson = {};

    dataJson.razaoSocial = elements.inputs.razaoSocial.val().trim();
    dataJson.cnpj = elements.inputs.cnpj.val().trim();
    dataJson.nomeFantasia = elements.inputs.nomeFantasia.val().trim();
    dataJson.inscricaoEstadual = elements.inputs.ie.val().trim();
    dataJson.inscricaoMunicipal = elements.inputs.im.val().trim();
    dataJson.cep = elements.inputs.zipCode.val().trim();
    dataJson.endereco = elements.inputs.address.val().trim();
    dataJson.numero = elements.inputs.numberLocal.val().trim();
    dataJson.bairro = elements.inputs.district.val().trim();
    dataJson.cidade = elements.inputs.city.val().trim();
    dataJson.estado = elements.inputs.state.val().trim();
    dataJson.nomeContato = elements.inputs.namePeopleContact.val().trim();
    dataJson.telefoneContato = elements.inputs.phone.val().trim();
    dataJson.emailContato = elements.inputs.email.val().trim();

    dataJson.produtos = loadProducts();

    const files = loadFiles();
    dataJson.anexos = files.map(file => {
        return {
            indice: file.indice,
            nomeArquivo: file.name,
            blobArquivo: file.data
        };
    });

    return dataJson;
}

$(function() {
    

    initializeZipCodeSearch()
    handleFiles()
    handleProducts()
    elements.buttons.btnSaveForm.click(function () {
        if (SupplierCheckDatas() && productsCheckDatas() && filesCheckDatas()) {
            console.log(buildJson());
            return
        }

    })
    

})




