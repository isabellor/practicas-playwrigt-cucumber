module.exports = {
    default: {
        paths: ['features/**/*.feature'],

        require: [
            'stepDefinition/**/*.js', // Tus pasos de Gherkin
            'support/**/*.js'          // Archivos de hooks (Before, After)
        ],

        // Define el formato de la salida en la consola y para los reportes.
        format: [
            'progress-bar', // Muestra una barra de progreso cucudurante la ejecución
            'json:reports/cucumber-report.json' // Genera un reporte JSON
        ],

        worldParameters: {
            baseUrl: 'https://the-internet.herokuapp.com'
        }
    }
}