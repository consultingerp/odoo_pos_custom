console.log('Point of Sale JavaScript loaded: screens.js');

odoo.define('pos.custom.screens', function (require) {
    "use strict";
    var poscreens = require("point_of_sale.screens");

    // AGREGA EL BOTON DE BOLETA
    poscreens.PaymentScreenWidget.include({
        click_invoice: function(tipo){
            console.log('el tipo es: ', tipo)
            var order = this.pos.get_order();
            order.set_to_invoice(!order.is_to_invoice());
            order.to_invoice = true;
            this.presiono = tipo
            if (tipo == 'boleta'){
                this.$('.js_boleta').addClass('highlight');
                this.$('.js_invoice').removeClass('highlight');
            } else {
                this.$('.js_invoice').addClass('highlight');
                this.$('.js_boleta').removeClass('highlight');

            }
        },

        renderElement: function() {
            var self = this;
            this._super();
            this.$('.js_boleta').click(function(){
                self.click_invoice('boleta');
            });
            this.$('.js_invoice').off('click');
            this.$('.js_invoice').click(function(){
                self.click_invoice('factura');
            });
        },

    });

    poscreens.ProductScreenWidget.include({
        click_product: function(product) {
            if(product.lst_price == 0){
                this.gui.show_popup('error',{
                    'title': 'Precio del producto',
                    'body': `${product.display_name+' '} tiene el precio igual a 0.`,
                });
                //Si no se quiere agregar a la lista
                //return;
            }
           if(product.to_weight && this.pos.config.iface_electronic_scale){
               this.gui.show_screen('scale',{product: product});
           }else{
               this.pos.get_order().add_product(product);
           }
        },
    })
});