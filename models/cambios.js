import { ColocarSeleccionEnCasillas, LlenarCasillaConDatos } from '../views/cambios/functions.js';

export function LlenarTabla(products){
    const Tabla = document.getElementById("contenedorTablaCambios"); // El contenedor donde se mostrara la tabla
    Tabla.innerHTML = '';

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (products.error){
        const errorRow = document.createElement("tr"); // Crear la fila en blanco en caso de error
        errorRow.innerHTML = `
            <td style="display: none"> </td>
            <td> </td>
            <td style="display: none"> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>

            <td> </td>
            <td style="display: none"> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
        `;
        Tabla.appendChild(errorRow); // Mostar el mensaje de error en el DOM
        return;
    }

    // si no hay productos, mostrar un mensaje adecuado
    if (products.length === 0){
        const noProductRow = document.createElement("tr"); // Crar la fila en blanco en caso de no haber productos
        noProductRow.innerHTML =`
            <td style="display: none"> </td>
            <td> </td>
            <td style="display: none"> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>

            <td> </td>
            <td style="display: none"> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
        `;
        Tabla.appendChild(noProductRow);
        return;
    }

    // Recorer las salidas y crear elementos para mostrarlos
    products.forEach(product => {
        const salidasTable = document.createElement("tr"); // Crear una fila para cada fila retornada

        // Agregar contenido a la targeta del producto
        salidasTable.innerHTML = `
            <td style="display: none">${product.id}</td>
            <td>${product.nombre_producto_origen}</td>
            <td style="display: none">${product.producto_origen_id}</td>
            <td>${product.cajas_origen}</td>
            <td>${product.kilos_brutos_origen}</td>
            <td>${product.piezas_extra_origen}</td>
            <td>${product.destare_add_origen}</td>
            <td>${product.total_piezas_origen}</td>
            <td>${product.total_kilos_origen}</td>

            <td>${product.nombre_producto_destino}</td>
            <td style="display: none">${product.producto_destino_id}</td>
            <td>${product.cajas_destino}</td>
            <td>${product.kilos_brutos_destino}</td>
            <td>${product.piezas_extra_destino}</td>
            <td>${product.destare_add_destino}</td>
            <td>${product.total_piezas_destino}</td>
            <td>${product.total_kilos_destino}</td>
        `;

        Tabla.appendChild(salidasTable);

        // Agregar un evento para cada una de las filas
        salidasTable.addEventListener('click', () => {
            LlenarCasillaConDatos(product.id);
        });
    });
}

export function ColocarProductosEnLista(casilla, products){
    // declarar la lista que se va a llenar
    const Lista = casilla;
    Lista.innerHTML = ''; // Limpiar el contenido de la lista

    //  Crear y añadir la opción predeterminada
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.selected = true; // Hace que esta opción sea la seleccionada por defecto
    defaultOption.disabled = true; // Impide que el usuario seleccione esta opción
    defaultOption.textContent = "Selecciona un producto";
    Lista.appendChild(defaultOption);

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (products.error) {
        return;
    }
    // Si no hay productos, mostrar un mensaje adecuado
    if (products.length == 0){
        return;
    }

     // Recorrer los productos y crear elementos para mostrarlos
    products.forEach(product => {
        const optionElement = document.createElement("option"); // Crea un nuevo elemento <option>
        optionElement.value = product.id; // Asigna el valor del option (ej. el ID del producto)
        optionElement.textContent = product.nombre_producto; // Asigna el texto visible del option

        Lista.appendChild(optionElement); // Agrega el <option> a la lista
    });
}

export function LlenarListaConDatos(Casilla, Datos){
    //console.log(Datos);
    // declarar la casilla del filtro
    const filtro = Casilla.producto;
    // declarar la lista que se va a llenar
    const Lista = Casilla.lista;
    Lista.innerHTML = ''; // Limpiar el contenido de la lista

        // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (Datos.error) {
        const errorlist = document.createElement("li"); // Crear el item en blanco en caso de error
        errorlist.innerText = 'error al buscar los datos';
        Lista.appendChild(errorlist); // Mostrar el mensaje de error en el DOM
        return;
    }
    // Si no hay productos, mostrar un mensaje adecuado
    if (Datos.length == 0){
        const noProductlist = document.createElement("li"); // Crear el item en blanco en caso de error
        noProductlist.innerText = 'no hay datos disponibles';
        Lista.appendChild(noProductlist); // Mostrar el mensaje de error en el DOM
        return;
    }
    if (filtro.value != ""){
        // Recorrer los productos y crear elementos para mostrarlos
        Datos.forEach(Dato => {
            const productList = document.createElement("li"); // Crear una fila para cada fila retornada
            // Agregar contenido a la tarjeta del producto
            productList.innerText = `${Dato.nombre_producto}`;

            Lista.appendChild(productList);

            // Agregar un evento para cada una de las filas
            productList.addEventListener('click', () => {
                ColocarSeleccionEnCasillas(Casilla.tipo, Dato.id, Dato.nombre_producto);
            });
        });
    } else{
        Casilla.id_producto.value = ""
    }
}

export function ColocarDatosFormulario(Datos, cambiosElements){
    // conmprobar si hay un error en los datos (por ejemplo "error" en la respueta)
    if (Datos.error){
        LimpiarSalidas();
        return;
    }
    // si no hay salidas limpiar las casillas del formulario
    if (Datos.length === 0){
        LimpiarSalidas();
        return;
    }
    // recorrer todos los elementos y llenar las casillas
    Datos.forEach(dato => {
        console.log(Datos);
        const fecha = new Date(dato.fecha_registro);

        cambiosElements.filtroFecha.value = fecha.toISOString().split("T")[0]
        cambiosElements.id.value = dato.id
        cambiosElements.producto_Origen.value = dato.nombre_producto_origen
        cambiosElements.id_producto_Origen.value = dato.producto_origen_id
        cambiosElements.producto_Destino.value = dato.nombre_producto_destino
        cambiosElements.id_producto_Destino.value = dato.producto_destino_id
        cambiosElements.cajas_Origen.value = dato.cajas_origen
        cambiosElements.kilosBru_Origen.value = dato.kilos_brutos_origen
        cambiosElements.piezasExt_Origen.value = dato.piezas_extra_origen
        cambiosElements.destareAdd_Origen.value = dato.destare_add_origen
        cambiosElements.totalPz_Origen.value = dato.total_piezas_origen
        cambiosElements.totalKg_Origen.value = dato.total_kilos_origen
        cambiosElements.cajas_Destino.value = dato.cajas_destino
        cambiosElements.kilosBru_Destino.value = dato.kilos_brutos_destino
        cambiosElements.piezasExt_Destino.value = dato.piezas_extra_destino
        cambiosElements.destareAdd_Destino.value = dato.destare_add_destino
        cambiosElements.totalPz_Destino.value = dato.total_piezas_destino
        cambiosElements.totalKg_Destino.value = dato.total_kilos_destino
        cambiosElements.observaciones.value = dato.observaciones
    });
}