class DatosCovidGeneral{
    constructor(data) {
        this.cases = data.cases;
        this.deaths = data.deaths;
        this.recovered = data.recovered;
        this.active = data.active;
    }

    renderizarEstadisticas(){
        const porcentajeMuertes = ((this.deaths/this.cases) * 100).toFixed(1);
        const porcentajeRecuperados = ((this.recovered/this.cases) * 100).toFixed(1);

        return `
            <div class="flex flex-col gap-2 mt-4">
                <p class="flex justify-between border-b border-slate-400 pb-1">
                    <span>Casos Totales:</span> 
                    <strong class="text-yellow-300">${this.cases}</strong>
                </p>
                <p class="flex justify-between border-b border-slate-400 pb-1">
                    <span>Muertes:</span> 
                    <strong class="text-red-300">${this.deaths}</strong>
                </p>
                <p class="flex justify-between border-b border-slate-400 pb-1">
                    <span>Recuperados:</span> 
                    <strong class="text-green-300">${this.recovered}</strong>
                </p>
                <p class="flex justify-between">
                    <span>Activos:</span> 
                    <strong class="text-blue-300">${this.active}</strong>
                </p>
                
                <div class="mt-4">
                    <p class="text-sm text-gray-300 mb-1">Tasa de Mortalidad (${porcentajeMuertes}%)</p>
                    <div class="w-full bg-slate-700 rounded-full h-3">
                        <div class="bg-red-500 h-3 rounded-full" style="width: ${porcentajeMuertes}%"></div>
                    </div>
                </div>
                
                <div class="mt-2">
                    <p class="text-sm text-gray-300 mb-1">Tasa de Recuperación (${porcentajeRecuperados}%)</p>
                    <div class="w-full bg-slate-700 rounded-full h-3">
                        <div class="bg-green-500 h-3 rounded-full" style="width: ${porcentajeRecuperados}%"></div>
                    </div>
                </div>
            </div>
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

const selectBasico = document.getElementById('select-basico');
const resultadoSelect = document.getElementById('resultado-select');

selectBasico.addEventListener('change', async (event) => {
    const eleccion = event.target.value;

    if (eleccion === "") {
        resultadoSelect.innerHTML = "";
        return;
    }

    // Mensaje de carga mientras busca los datos
    resultadoSelect.innerHTML = "<p class='text-yellow-400 mt-2 animate-pulse'>Cargando información...</p>";

    let urlAPI = "";
    let tituloTarjeta = "";

    if (eleccion === "mundial") {
        urlAPI = "https://disease.sh/v3/covid-19/all";
        tituloTarjeta = "Información Mundial";
    } else if (eleccion === "continental") {
        urlAPI = "https://disease.sh/v3/covid-19/continents/South%20America";
        tituloTarjeta = "Sur América";
    } else if (eleccion === "chile") {
        urlAPI = "https://disease.sh/v3/covid-19/countries/Chile";
        tituloTarjeta = "Chile";
    }

    try {
        const respuesta = await fetch(urlAPI);

        if (!respuesta.ok) {
            throw new Error("Error obteniendo los datos");
        }

        const datosJSON = await respuesta.json();

        const estadisticas = new DatosCovidGeneral(datosJSON);

        resultadoSelect.innerHTML = `
            <div class="bg-slate-600 rounded-lg p-4 shadow border-2 border-slate-400 text-left mt-2 text-white">
                <h3 class="font-bold text-xl text-center border-b border-slate-400 pb-2">${tituloTarjeta}</h3>
                ${estadisticas.renderizarEstadisticas()}
            </div>
        `;
    } catch (error) {
        console.error(error);
        resultadoSelect.innerHTML = "<p class='text-red-400 mt-2'>Error al cargar la información solicitada.</p>";
    }
});

const ring = document.getElementById('progress-ring');
const label = document.getElementById('progress-label');
const circumference = 2 * Math.PI * 24; // = 150.8, según el radio r="24" del círculo

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    const offset = circumference - (pct / 100) * circumference;

    ring.style.strokeDashoffset = offset;
    label.textContent = Math.round(pct) + '%';
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();