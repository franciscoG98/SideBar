const setMeses = (fecha) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Agosto",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let modifyFecha = fecha.dateString.split("-");
  let modifymes =
    modifyFecha[1][0] === "0" ? modifyFecha[1][1] : modifyFecha[1];
  return `${modifyFecha[2]} de ${meses[modifymes]}`;
};

export default setMeses;
