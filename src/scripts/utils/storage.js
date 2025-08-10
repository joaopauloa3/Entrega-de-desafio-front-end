//Controle do local storage dos produtos
const STORAGE_KEY_PRODUCT = "products"
export function loadProducts() {
    const jsonFiles = localStorage.getItem(STORAGE_KEY_PRODUCT)
    return jsonFiles ? JSON.parse(jsonFiles) : [];
}

export function saveProducts(product) {
    localStorage.setItem(STORAGE_KEY_PRODUCT, JSON.stringify(product))
}




//Controle do local storage dos arquivos anexados
const STORAGE_KEY_FILE = "filesAttachments";

export function loadFiles() {
    const jsonFiles = localStorage.getItem(STORAGE_KEY_FILE)
    return jsonFiles ? JSON.parse(jsonFiles) : [];
}

export function saveFiles(file) {
    localStorage.setItem(STORAGE_KEY_FILE, JSON.stringify(file))
}
