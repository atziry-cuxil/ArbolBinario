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

let btnPreOrden = document.querySelector('#btnPreOrden')
let btnInOrden = document.querySelector('#btnInOrden')
let btnPostOrden = document.querySelector('#btnPostOrden')
let normalizar = document.querySelector('#Normalizar')
let valorABuscar = 0;
let recorridoPreOrden = [];
let recorridoInOrden = [];
let recorridoPostOrden = [];

btnAgregar.addEventListener('click', (event) => {
    if (!Number.isNaN(parseFloat(inputAgregar.value))) {
        miArbol.insertar(parseFloat(inputAgregar.value))
        inputAgregar.value = ''
        btnBuscar.disabled = false;
        btnPostOrden.disabled = false;
        btnInOrden.disabled = false;
        btnPreOrden.disabled = false;
        recorridoPostOrden = [];
        postOrden(miArbol.raiz)
        pintarArbol()
    }
})

btnBuscar.addEventListener('click', (event) => {
    if (!Number.isNaN(parseFloat(inputBuscar.value))) {
        valorABuscar = parseFloat(inputBuscar.value)
        miArbol.buscar(valorABuscar)
        inputBuscar.value = ''
        btnBuscar.disabled = true;
        btnNormalizar.disabled = false;
        pintarArbol();
    }
})

btnNormalizar.addEventListener('click', (event) => {
    miArbol.buscar(valorABuscar)
    btnNormalizar.disabled = true;
    btnBuscar.disabled = false;
    pintarArbol();
})

btnPreOrden.addEventListener('click', (event) => {
    recorridoPreOrden = [];
    preOrden(miArbol.raiz)
    mostrarRecorrido(recorridoPreOrden);
    btnPostOrden.disabled = true;
    btnAgregar.disabled = true;
    btnPreOrden.disabled = true;
    btnInOrden.disabled = true;
    normalizar.disabled = false;
    resultadoRecorrido.innerHTML = ''
    resultadoRecorrido.innerHTML = `${recorridoPreOrden}`
})

btnInOrden.addEventListener('click', (event) => {
    recorridoInOrden = [];
    inOrden(miArbol.raiz)
    mostrarRecorrido(recorridoInOrden);
    btnPostOrden.disabled = true;
    btnAgregar.disabled = true;
    btnPreOrden.disabled = true;
    btnInOrden.disabled = true;
    normalizar.disabled = false;
    resultadoRecorrido.innerHTML = ''
    resultadoRecorrido.innerHTML = `${recorridoInOrden}`
})

btnPostOrden.addEventListener('click', (event) => {
    recorridoPostOrden = [];
    postOrden(miArbol.raiz)
    mostrarRecorrido(recorridoPostOrden);
    btnPostOrden.disabled = true;
    btnAgregar.disabled = true;
    btnPreOrden.disabled = true;
    btnInOrden.disabled = true;
    normalizar.disabled = false;
    resultadoRecorrido.innerHTML = ''
    resultadoRecorrido.innerHTML = `${recorridoPostOrden}`
})

normalizar.addEventListener('click', (event) => {
    btnPreOrden.disabled = false;
    btnInOrden.disabled = false;
    btnPostOrden.disabled = false;
    btnAgregar.disabled = false;
    normalizar.disabled = true;
    mostrarRecorrido(recorridoPostOrden);
    pintarArbol();
})

function pintarArbol() {
    listaPadre.innerHTML = ''
    pintar(miArbol.raiz, listaPadre)
}

function mostrarRecorrido(arrayPosiciones) {
    let contador = 0;
    let tiempo = 1000
    while (contador < arrayPosiciones.length) {
        let divActual = document.querySelector(`#id${arrayPosiciones[contador]}id`)

        setTimeout(() => {
            if (divActual.classList.contains('node')) {
                divActual.className = 'node2'
            } else {
                divActual.className = 'none'
            }
        }, tiempo)

        contador++
        tiempo += 1000
    }
}

function preOrden(actual) {

    recorridoPreOrden.push(actual.value)

    if (actual.izquierda) {
        preOrden(actual.izquierda)
    }

    if (actual.derecha) {
        preOrden(actual.derecha)
    }
    return this;
}

function inOrden(actual) {

    if (actual.izquierda) {
        inOrden(actual.izquierda)
    }

    recorridoInOrden.push(actual.value)

    if (actual.derecha) {
        inOrden(actual.derecha)
    }

    return this;
}

function postOrden(actual) {

    if (actual.izquierda) {
        postOrden(actual.izquierda)
    }

    if (actual.derecha) {
        postOrden(actual.derecha)
    }

    recorridoPostOrden.push(actual.value)

    return this;
}

function pintar(actual, contenedor) {
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    let div = document.createElement('div')
    div.setAttribute('id', `id${actual.value}id`)
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