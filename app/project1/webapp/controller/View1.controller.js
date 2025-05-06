sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("firstapp.project1.controller.View1", {
        onInit() {
            const oFormModel = new sap.ui.model.json.JSONModel({
                cpf: "",
                nome: "",
                idade: ""
            });
            this.getView().setModel(oFormModel, "batatinha");
        },

        onNomeChange: function(oEvent) {
            const oInput = oEvent.getSource();
            const nome = oInput.getValue();

            if(!nome || nome.trim() === "") {
                oInput.setValueState("Error");
                oInput.setValueStateText("O nome não pode ser vazio.");
            }else {
                oInput.setValuyeState("Success!");
                oInput.setValueStateText("Nome válido!");
            }
        },

        onIdadeChange: function(oEvent) {
            const oInput = oEvent.getSource();
            const idade = oInput.getValue();

            if(!idade || isNaN(idade) || parseInt(idade) <= 0) {
                oInput.setValueState("Error");
                oInput.setValueStateText("A idade deve ser maior que zero.");
            }else {
                oInput.setValueState("Success!");
                oInput.setValueStateText("Idade Válida!");
            }
        },

        onCpfChange: function(oEvent) {
            const oInput = oEvent.getSource();
            const cpf = oInput.getValue();
            const cpfStr = String(cpf).replace(/\D/g, "");

            if(cpfStr.length !== 11) {
                oInput.setValueState("Error");
                oInput.setValueStateText("O CPF deve conter 11 dígitos numéricos.");
            }else {
                oInput.setValueState("Success!");
                oInput.setValueStateText("CPF válido!");
            }
        },

        validateFields: function() {
            const oNomeInput = this.byId("inputNome");
            const oIdadeInput = this.byId("inputIdade");
            const oCpfInput = this.byId("inputCPF");

            const nome = oNomeInput.getValue();
            const idade = oIdadeInput.getValue();
            const cpf = oCpfInput.getValue();
            const cpfStr = String(cpf).replace(/\D/g, "");

            let isValid = true;
            let errorMessage = "";

            if (!nome || nome.trim() === "") {
                oNomeInput.setValueState("Error");
                errorMessage = "Nome inválido.";
                isValid = false;
            }

            if (!idade || isNaN(idade) || parseInt(idade) <= 0) {
                oIdadeInput.setValueState("Error");
                errorMessage += "Idade Inválida.";
                isValid = false;
            }

            if (cpf.legth !== 11) {
                oCpfInput.setValueState("Error");
                errorMessage += "CPF inválido";
                isValid = false;
            }

            return { isValid, errorMessage };
        },

        clearForm: function() {
            this.getView().getModel("batatinha").setData({
                cpf: "",
                nome: "",
                idade: ""
            });

            this.byId("inputNome").setValueState("None");
            this.byId("inputIdade").setValueState("None");
            this.byId("inputCPF").setValueState("None");
        },

        onSalvarPessoa: async function() {

            try {

                const { isValid, errorMessage } = this.validateFields();

                if (!isValid) {
                    MessageBox.error("Por favor, corrija os seguintes erros:\n" + errorMessage);
                    return;
                }

                const oFormData = this.getView().getModel("batatinha").getData();
                const oModel = this.getView().getModel();
                const oBinding = oModel.bindList("/pessoa");
                
                const oContext = oBinding.create({
                    cpf: oFormData.cpf,
                    nome: oFormData.nome,
                    idade: parseInt(oFormData.idade)
                });

                await oContext.created();

                MessageToast.show("Pessoa criada com sucesso!");

                this.clearForm();

                this.byId("pessoasTable").getBinding("items").refresh();
            } catch (error) {
                sap.m.MessageBox.error("Erro ao salvar:\n " + error.message);
            }
        }
    });
});