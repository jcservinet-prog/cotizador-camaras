// Fecha de hoy automática
document.getElementById('fecha').valueAsDate = new Date();

// Precios base
const PRECIO_CAMARA = 225;
const PRECIO_ACCESORIOS_POR_CAMARA = 45;

// Escuchar cambios para recalcular automáticamente
const elementosCalculo = document.querySelectorAll('.calc-trigger');
elementosCalculo.forEach(elemento => {
  elemento.addEventListener('input', calcularCotizacion);
  elemento.addEventListener('change', calcularCotizacion);
});

function calcularCotizacion() {
  const cantCamaras = parseInt(document.getElementById('cantCamaras').value) || 0;
  const precioDvr = parseFloat(document.getElementById('selectDvr').value) || 0;
  const precioHdd = parseFloat(document.getElementById('selectHdd').value) || 0;
  
  const chkAccesorios = document.getElementById('chkAccesorios').checked;

  // Canalización
  const tipoCanalizacion = document.getElementById('selectCanalizacion').value;
  const cantMetros = parseInt(document.getElementById('cantMetros').value) || 0;
  const rowMetraje = document.getElementById('rowMetraje');

  let costoCanalizacion = 0;

  if (tipoCanalizacion === 'canaleteado') {
    rowMetraje.style.display = 'flex';
    costoCanalizacion = cantMetros * 20; // Q20 por metro
  } else if (tipoCanalizacion === 'entubado') {
    rowMetraje.style.display = 'flex';
    costoCanalizacion = cantMetros * 25; // Q25 por metro
  } else {
    rowMetraje.style.display = 'none'; // Ninguna
  }

  // Mano de obra ingresada manualmente
  const precioManoObra = parseFloat(document.getElementById('inputManoObra').value) || 0;

  // Porcentaje de descuento ingresado
  const porcentajeDescuento = parseFloat(document.getElementById('inputDescuento').value) || 0;

  // Cálculo del subtotal
  let subtotal = 0;

  subtotal += cantCamaras * PRECIO_CAMARA;
  subtotal += precioDvr;
  subtotal += precioHdd;

  if (chkAccesorios) subtotal += cantCamaras * PRECIO_ACCESORIOS_POR_CAMARA;

  // Sumar Canalización y Mano de Obra
  subtotal += costoCanalizacion;
  subtotal += precioManoObra;

  // Cálculo del descuento por Porcentaje
  const montoDescuento = subtotal * (porcentajeDescuento / 100);

  // Total Final con descuento aplicado
  let totalFinal = subtotal - montoDescuento;
  if (totalFinal < 0) totalFinal = 0;

  // Actualizar en pantalla
  document.getElementById('lblSubtotal').innerText = subtotal.toFixed(2);
  document.getElementById('lblTotalFinal').innerText = totalFinal.toFixed(2);
}

// Ejecutar primer cálculo automático
calcularCotizacion();