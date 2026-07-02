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
let resultadoRecorrido = document.querySelector('#resultadoRecorrido')

let postOrder = document.querySelector('#btnPostOrden')
let valorABuscar = 0;
let arrayPosiciones = [];

btnAgregar.addEventListener('click', (event) => {
    miArbol.insertar(parseFloat(inputAgregar.value))
    console.log(miArbol)
    inputAgregar.value = ''
    btnBuscar.disabled = false;
    pintarArbol()
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
    mostrarRecorrido();
})
let indices = [1,2,4,6,8,10,12]
function pintarArbol() {
    let temporal = miArbol.raiz
    let actual = miArbol.raiz
    listaPadre.innerHTML = ''

    //otro temporal para guardar o saver en donde pintar el div

    for (let i = 0; i < miArbol.contador; i++) {

        let div = document.createElement('div')
        if (temporal.estado == 'si') {
            div.setAttribute('class', 'node2')
        } else {
            div.setAttribute('class', 'node')
        }
        div.textContent = `${temporal.value}`
        temporal = temporal.izquierda
        // if (i == 0) {
        //     listaPadre.append(div)
        // }

        // if (indices.includes(i)) {
        //     let ul = document.createElement('ul')
        //     let li = document.createElement('li')
        //     li.append(div)
        //     ul.append(li)
        //     listaPadre.append(ul)
        // }else {
        //     let li = document.createElement('li')
        //     li.append(div)
        //     listaPadre.appendChild(li)
        // }

    }
    preguntar(miArbol.raiz)
    resultadoRecorrido = ''
    resultadoRecorrido.innerHTML = `${arrayPosiciones}`
}


function mostrarRecorrido() {
    console.log('hola mundo')
} 

function preguntar(actual) {
    //console.log(actual)
    //console.log('===========')
    if (actual.izquierda != null) {
        preguntar(actual.izquierda)
        preguntarDerecha(actual.derecha)
        arrayPosiciones.push(actual.value)
    } else {
        return arrayPosiciones.push(actual.value);
    }
}

function preguntarDerecha(actual) {
    //console.log(actual)
    if (!actual.derecha) {
        preguntar(actual.izquierda)
        preguntarDerecha(actual.derecha)
        arrayPosiciones.push(actual.value)
    } else {
        return arrayPosiciones.push(actual.value);
    }
}