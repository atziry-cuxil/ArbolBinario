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

let postOrder = document.querySelector('#btnPostOrden')
let valorABuscar = 0;

btnAgregar.addEventListener('click', (event) => {
    miArbol.insertar(parseFloat(inputAgregar.value))
    pintarArbol()
    inputAgregar.value = ''
    btnBuscar.disabled = false;
})

btnBuscar.addEventListener('click', (event) => {
    valorABuscar = parseFloat(inputBuscar.value)
    miArbol.buscar(valorABuscar)
    pintarArbol();
    inputBuscar.value = ''
    btnBuscar.disabled = true;
    btnNormalizar.disabled = false;

})

btnNormalizar.addEventListener('click', (event) => {

    miArbol.buscar(valorABuscar)
    pintarArbol();
    btnNormalizar.disabled = true;
    btnBuscar.disabled = false;
})

postOrder.addEventListener('click', (event) => {
    mostrarRecorrido();
})

function pintarArbol() {
    let temporal = miArbol.raiz
    contenedorArbol.innerHTML = ''
    for (let i = 0; i < miArbol.contador; i++) {
        let div = document.createElement('div')
        if (temporal.estado == 'si') {
            div.setAttribute('class', 'divStyle2')
        } else {
            div.setAttribute('class', 'divStyle')
        }
        div.textContent = `${temporal.value}`

        temporal = temporal.izquierda
        contenedorArbol.appendChild(div)
    }
}


function mostrarRecorrido() {
    console.log('hola mundo')
}