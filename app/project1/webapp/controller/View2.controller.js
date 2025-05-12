sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("firstapp.project1.controller.View2", {
        onInit() {
        },

        onNavButton2: function() {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

    });
});