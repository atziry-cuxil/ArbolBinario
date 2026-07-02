class Nodo {
    constructor(value) {
        this.value = value;
        this.izquierda = null;
        this.derecha = null;
        this.estado = 'no'
    }
}

class Arbol {
    constructor() {
        this.raiz = null;
        this.contador = 0;
    }

    insertar(value) {
        this.contador++
        let nuevoNodo = new Nodo(value)
        if (this.raiz == null) {
            this.raiz = nuevoNodo
        } else {
            let actual = this.raiz
            while (true) {
                if (value < actual.value) {
                    if (!actual.izquierda) {
                        actual.izquierda = nuevoNodo;
                        return this;
                    }
                    actual = actual.izquierda;
                } else {
                    if (!actual.derecha) {
                        actual.derecha = nuevoNodo;
                        return this;
                    }
                    actual = actual.derecha;
                }
            }
        }
    }

    buscar(value) {
        if (this.raiz != null) {
            let actual = this.raiz
            while (true) {
                if (actual.value == value) {
                    if (actual.estado == 'si') {
                        actual.estado = 'no'
                    } else {
                        actual.estado = 'si'
                    }
                    return actual;
                }

                if (value < actual.value) {
                    if (actual.izquierda.value == value) {
                        if (actual.izquierda.estado == 'si') {
                            actual.izquierda.estado = 'no'
                        } else {
                            actual.izquierda.estado = 'si'
                        }
                        return actual.izquierda;
                    }
                    actual = actual.izquierda;
                } else {
                    if (actual.derecha.value == value) {
                        if (actual.derecha.estado == 'si') {
                            actual.derecha.estado = 'no'
                        } else {
                            actual.derecha.estado = 'si'
                        }
                        return actual.derecha;
                    }
                    actual = actual.derecha;
                }
            }
        }
    }
}

let miArbol = new Arbol()

let inputAgregar = document.querySelector('#Agregar')
let btnAgregar = document.querySelector('#btnAgregar')

let inputBuscar = document.querySelector('#txtBuscar')
let btnBuscar = document.querySelector('#btnBuscar')
let btnNormalizar = document.querySelector('#btnNormalizar')

let contenedorArbol = document.querySelector('#contenedorArbol')
let contenedroRecorrido = document.querySelector('#contenedorRecorrido')
let listaPadre = document.querySelector('#liPadre')
let resultadoRecorrido = document.querySelector('#resultado')

let postOrder = document.querySelector('#btnPostOrden')
let valorABuscar = 0;
let arrayPosiciones = [];

btnAgregar.addEventListener('click', (event) => {
    if (!Number.isNaN(parseFloat(inputAgregar.value))) {
        miArbol.insertar(parseFloat(inputAgregar.value))
        inputAgregar.value = ''
        btnBuscar.disabled = false;
        arrayPosiciones = [];
        preguntar(miArbol.raiz)
        pintarArbol()
    }
})

btnBuscar.addEventListener('click', (event) => {
    valorABuscar = parseFloat(inputBuscar.value)
    miArbol.buscar(valorABuscar)
    inputBuscar.value = ''
    btnBuscar.disabled = true;
    btnNormalizar.disabled = false;
    pintarArbol();
})

btnNormalizar.addEventListener('click', (event) => {
    miArbol.buscar(valorABuscar)
    btnNormalizar.disabled = true;
    btnBuscar.disabled = false;
    pintarArbol();
})

postOrder.addEventListener('click', (event) => {
    listaPadre.innerHTML = ''
    mostrarRecorrido(miArbol.raiz, listaPadre);
})
function pintarArbol() {
    let temporal = miArbol.raiz
    let actual = miArbol.raiz
    listaPadre.innerHTML = ''
    pintar(miArbol.raiz, listaPadre)
    resultadoRecorrido.innerHTML = ''
    resultadoRecorrido.innerHTML = `${arrayPosiciones}`
}


function mostrarRecorrido(actual, contenedor) {
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        let div = document.createElement('div')
        if (actual.estado == 'si') {
            div.setAttribute('class', 'node2')
        } else {
            div.setAttribute('class', 'node')
        }
        div.textContent = `${actual.value}`
        ul.append(li)

        if (actual.izquierda) {
            if (actual.izquierda != null) {
                pintar(actual.izquierda, li)
            }
        }
        if (actual.derecha) {
            if (actual.derecha != null) {
                let lii = document.createElement('li')
                ul.append(lii)
                pintar(actual.derecha, lii)
            }
        }
        contenedor.append(div)
        contenedor.append(ul)
        return this;            
}

function preguntar(actual) {

    if (actual.izquierda) {
        if (actual.izquierda != null) {
            preguntar(actual.izquierda)
        }
    }

    if (actual.derecha) {
        if (actual.derecha != null) {
            preguntar(actual.derecha)
        }
    }

    return arrayPosiciones.push(actual.value)
}

function pintar(actual, contenedor) {
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    let div = document.createElement('div')
    if (actual.estado == 'si') {
        div.setAttribute('class', 'node2')
    } else {
        div.setAttribute('class', 'node')
    }
    div.textContent = `${actual.value}`
    ul.append(li)

    if (actual.izquierda) {
        if (actual.izquierda != null) {
            pintar(actual.izquierda, li)
        }
    }
    if (actual.derecha) {
        if (actual.derecha != null) {
            let lii = document.createElement('li')
            ul.append(lii)
            pintar(actual.derecha, lii)
        }
    }
    contenedor.append(div)
    contenedor.append(ul)
    return this;
}