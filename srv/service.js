const cds = require('@sap/cds');

module.exports = cds.service.impl(async function (){
    const { pessoa } = this.entities;

    this.before('CREATE', 'pessoa', (req) => {
        const { nome, idade, cpf } = req.data;

        if (!nome || nome.trim() === "") {
            req.error(400, "O nome não pode ser vazio!");
        }

        if (!idade || idade <= 0) {
            req.error(400, "A idade deve ser maior que zero!")
        }

        const cpfStr = String(cpf).replace(/\D/g, "");

        if (cpfStr.length !== 11) {
            req.error(400, "O CPF deve conter 11 dígitos numéricos.");
        }
    })

});