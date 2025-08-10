import elements from "../../utils/components.js";
import { loadFiles, saveFiles } from "../../utils/storage.js";


function renderTableFiles() {
    elements.tables.tableFilesBody.empty()

    const files = loadFiles();


    if (files.length === 0 ) {
        elements.tables.tableFilesBody.append(`
            <tr><td colspan="3" class="text-center">Nenhum anexo incluído. <strong>(Obrigatório)</strong> </td></tr>
        `)
    }

    $.each(files, (index, file) => {
        const tr = `
            <tr>
                <td class="cursor-pointer fs-width-50 align-middle">
                    <img data-index="${index}"  style="width: 40px;" class="remove-file fs-border-radius bg-danger p-2" src="./src/assets/icons/fluigicon-trash.png">
                </td>
                <td class="cursor-pointer fs-width-50 align-middle">
                    <img  data-index="${index}"  style="width: 40px;" class="download-file fs-border-radius bg-info p-2" src="./src/assets/icons/fluigicon-eye-open.png">
                </td>
                <td class="align-middle"><h3>D${file.name}</h3></td>
            </tr>
        `;
        elements.tables.tableFilesBody.append(tr)
    })

}
export function handleFiles() {
    elements.buttons.btnAddFile.click(function (e) {
        e.preventDefault();
        elements.inputs.file.trigger('click');
    })

    elements.inputs.file.on('change', function (e) {
        const newFiles = Array.from(e.target.files);
        if (newFiles.length === 0)  return;
    
        let currentFiles = loadFiles();
        $.each(newFiles, (index, file) => {
            const reader = new FileReader();
    
            reader.onloadend = function () {
                currentFiles.push({
                    indice: currentFiles.length + 1, 
                    name: file.name,
                    type: file.type,
                    data: reader.result
                });
    
                if (index === newFiles.length - 1) {
                    saveFiles(currentFiles);
                    renderTableFiles();
                }
            }
            reader.readAsDataURL(file);
        });
    
        $(this).val('')
    
    })
    
    elements.tables.tableFilesBody.on("click", ".remove-file, .download-file", function() {
        console.log("button click");
        const index = $(this).data('index')
        let files = loadFiles();

        if($(this).hasClass('remove-file')) {
            files.splice(index, 1)
            saveFiles(files);
            renderTableFiles();
        }

        if($(this).hasClass('download-file')) {
            const file = files[index]
            $('<a>', {
                href: file.data,
                download: file.name
            })[0].click();
        }
    }) 

    renderTableFiles();
}

