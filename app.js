class DatosCovidGeneral{
    constructor(data) {
        this.cases = data.cases;
        this.deaths = data.deaths;
        this.recovered = data.recovered;
        this.active = data.active;
    }

    renderizarEstadisticas(){
        return `
            Casos Totales: ${this.cases}
            Muertes: ${this.deaths}
            Recuperadas: ${this.recovered}
            Activos: ${this.active}
        `;
    }
}

async function obtenerDatosMundiales(){
    const urlMundial = "https://disease.sh/v3/covid-19/all";
    console.log('Iniciando petición a la API:', urlMundial);

    try{
        const respuesta = await fetch(urlMundial);

        if(respuesta.status !== 200){
            throw new Error("Error en al conectar con la base de datos");
        }

        const datosJSON = await respuesta.json();

        return datosJSON;
    } catch(error){
        console.error("Error: ", error);
        console.log("Error en la base de datos. No es posible obtener los datos.");
    }
}

async function obtenerDatosContinentales(){
    const urlContinental = "https://disease.sh/v3/covid-19/continents/South%20America";
    console.log('Iniciando petición a la API:', urlContinental);

    try{
        const respuesta = await fetch(urlContinental);

        if(respuesta.status !== 200){
            throw new Error("Error en al conectar con la base de datos");
        }

        const datosJSON = await respuesta.json();

        return datosJSON;
    } catch(error){
        console.error("Error: ", error);
        console.log("Error en la base de datos. No es posible obtener los datos.");
    }
}

async function obtenerDatosChile(){
    const urlChile = "https://disease.sh/v3/covid-19/countries/Chile";
    console.log('Iniciando petición a la API:', urlChile);

    try{
        const respuesta = await fetch(urlChile);

        if(respuesta.status !== 200){
            throw new Error("Error en al conectar con la base de datos");
        }

        const datosJSON = await respuesta.json();

        return datosJSON;
    } catch(error){
        console.error("Error: ", error);
        console.log("Error en la base de datos. No es posible obtener los datos.");
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    console.log('El DOM cargó, iniciando el proceso...');

    const datosMundiales = await obtenerDatosMundiales();
    const datosContinentales = await obtenerDatosContinentales();
    const datosChile = await obtenerDatosChile();

    if(datosMundiales) {
        const estadisticasMundiales = new DatosCovidGeneral(datosMundiales);
        const estadisticasContinentales = new DatosCovidGeneral(datosContinentales);
        const estadisticasChile = new DatosCovidGeneral(datosChile);

        const htmlMundial = estadisticasMundiales.renderizarEstadisticas();
        console.log('Resultados de datos a nivel global:', htmlMundial);
        const htmlContinental = estadisticasContinentales.renderizarEstadisticas();
        console.log('Resultados de datos a nivel continente Sur Americano:', htmlContinental);
        const htmlChile = estadisticasChile.renderizarEstadisticas();
        console.log('Resultados de datos a nivel país - Chile:', htmlChile);

    } else {
        console.log('Proceso detenido: No se recibieron datos :C.');
    }
})

