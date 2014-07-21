import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return  this.store.findAll( 'podcast' );
    },

    setupController: function( controller, model ){
        this.controllerFor( 'nav' ).set( 'model', model );
    },

    renderTemplate: function() {
        this.render( 'application' );

        this.render( 'nav',{
            into: 'application',
            outlet: 'nav',
            controller: this.controllerFor( 'nav' )
        });

        this.render( 'player', {
            into: 'application',
            outlet: 'player',
            controller: this.controllerFor( 'player' )
        });
    }
});
