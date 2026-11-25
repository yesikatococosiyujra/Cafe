// 1. VALIDACION DE LOGIN
function ValidarLogin() {
    let u = document.getElementById("user_login").value.trim();
    let p = document.getElementById("pass_login").value.trim();
    let mensaje = document.getElementById("mensajeError");

    if (u == "" || p == "") {
        mensaje.textContent = "Debe completar todos los campos...";
        document.getElementById("enlaceEntrar").style.display = "none";
    } else {
        if (u == "cafe" && p == "1234") {
            mensaje.textContent = "Correcto. Presione Ingresar :";
            document.getElementById("enlaceEntrar").style.display = "block";
        } else {
            mensaje.textContent = "Usuario o contraseña incorrectos...";
            document.getElementById("enlaceEntrar").style.display = "none";
        }
    }
}
const productos = [
    { codigo: "P001", nombre: "Torta de Chocolate", precioVenta: 18, precioCompra: 10 },
    { codigo: "P002", nombre: "Café Capuchino", precioVenta: 15, precioCompra: 7 },
    { codigo: "P003", nombre: "Empanada de Queso", precioVenta: 8, precioCompra: 4 },
    { codigo: "P004", nombre: "Pai de Limón", precioVenta: 16, precioCompra: 9 },
    { codigo: "P005", nombre: "Jugo Natural", precioVenta: 12, precioCompra: 5 },
    { codigo: "P006", nombre: "Cheesecake Frutilla", precioVenta: 20, precioCompra: 11 }
];
let nroCompra = 1;
let totalInvertido = 0;
let nroVenta = 1;
let totalRecaudado = 0;
function BuscarParaCompra() {
    let cod = document.getElementById("cod_compra").value.trim();
    let msg = document.getElementById("msg_compra");

    if (cod == "") {
        msg.textContent = "Debe ingresar un código...";
    } else {
        let prod = productos.find(function(p) {
            return p.codigo == cod.toUpperCase();
        });

        if (prod) {
            document.getElementById("prod_compra").value = prod.nombre;
            document.getElementById("costo_compra").value = prod.precioCompra;
            msg.textContent = "Producto encontrado";
        } else {
            document.getElementById("prod_compra").value = "";
            document.getElementById("costo_compra").value = "";
            msg.textContent = "Producto no encontrado";
        }
    }
}

function RegistrarCompra() {
    let prodNombre = document.getElementById("prod_compra").value;
    let costo = parseFloat(document.getElementById("costo_compra").value);
    let proveedor = document.getElementById("proveedor").value;
    let fecha = document.getElementById("fecha_compra").value;
    let cantTexto = document.getElementById("cant_compra").value;

    if (prodNombre == "" || proveedor == "" || fecha == "" || cantTexto == "") {
        alert("Debe completar todos los campos y buscar un producto...");
    } else {
        let cantidad = parseInt(cantTexto);
        if (cantidad >= 1) {
            let subtotalCompra = costo * cantidad;
            totalInvertido += subtotalCompra;

            let tabla = document.getElementById("TablaCompras");
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nroCompra++}</td>
                <td>${proveedor}</td>
                <td>${fecha}</td>
                <td>${prodNombre}</td>
                <td>${cantidad}</td>
                <td>Bs. ${costo}</td>
                <td>Bs. ${subtotalCompra}</td>
            `;
            tabla.appendChild(fila);

            document.getElementById("totalCompras").textContent = "Total Invertido: Bs. " + totalInvertido;

            document.getElementById("cod_compra").value = "";
            document.getElementById("prod_compra").value = "";
            document.getElementById("costo_compra").value = "";
            document.getElementById("proveedor").value = "";
            document.getElementById("fecha_compra").value = "";
            document.getElementById("cant_compra").value = "";
            document.getElementById("msg_compra").textContent = "";
        } else {
            alert("La cantidad debe ser mayor o igual a 1");
        }
    }
}
function BuscarParaVenta() {
    let cod = document.getElementById("cod_venta").value.trim();
    let msg = document.getElementById("msg_venta");

    if (cod == "") {
        msg.textContent = "Debe ingresar un código...";
    } else {
        let prod = productos.find(function(p) {
            return p.codigo == cod.toUpperCase();
        });

        if (prod) {
            document.getElementById("prod_venta").value = prod.nombre;
            document.getElementById("precio_venta").value = prod.precioVenta;
            msg.textContent = "Producto encontrado";
        } else {
            document.getElementById("prod_venta").value = "";
            document.getElementById("precio_venta").value = "";
            msg.textContent = "Producto no encontrado";
        }
    }
}
function Codigo(nom, ap, ci) {
    return nom.substring(0, 1) + ap.substring(0, 1) + "-" + ci;
}
function RegistrarVenta() {
    let prodNombre = document.getElementById("prod_venta").value;
    let precio = parseFloat(document.getElementById("precio_venta").value);
    let nombre = document.getElementById("nom_cliente").value.trim();
    let apellido = document.getElementById("ap_cliente").value.trim();
    let ci = document.getElementById("ci_cliente").value.trim();
    let fecha = document.getElementById("fecha_venta").value;
    let pago = document.getElementById("tipo_pago").value;
    let cantTexto = document.getElementById("cant_venta").value;
    if (prodNombre == "" || nombre == "" || apellido == "" || ci == "" || fecha == "" || pago == "" || cantTexto == "") {
        alert("Debe completar todos los campos y buscar un producto...");
    } else {
        let cantidad = parseInt(cantTexto);
        if (cantidad >= 1) {
            let codCliente = Codigo(nombre, apellido, ci);
            let subtotal = precio * cantidad;

            if (cantidad >= 5) {
                subtotal = subtotal - ((subtotal * 10) / 100);
            }

            totalRecaudado += subtotal;

            let tabla = document.getElementById("TablaVentas");
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nroVenta++}</td>
                <td>${codCliente}</td>
                <td>${nombre} ${apellido}</td>
                <td>${fecha}</td>
                <td>${pago}</td>
                <td>${prodNombre}</td>
                <td>${cantidad}</td>
                <td>Bs. ${precio}</td>
                <td>Bs. ${subtotal}</td>
            `;
            tabla.appendChild(fila);

            document.getElementById("totalVentas").textContent = "Total Recaudado: Bs. " + totalRecaudado;
            document.getElementById("cod_venta").value = "";
            document.getElementById("prod_venta").value = "";
            document.getElementById("precio_venta").value = "";
            document.getElementById("nom_cliente").value = "";
            document.getElementById("ap_cliente").value = "";
            document.getElementById("ci_cliente").value = "";
            document.getElementById("fecha_venta").value = "";
            document.getElementById("tipo_pago").value = "";
            document.getElementById("cant_venta").value = "";
            document.getElementById("msg_venta").textContent = "";
        } else {
            alert("La cantidad debe ser mayor o igual a 1");
        }
    }
}
