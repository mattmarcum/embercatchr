import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        playNow: function(){
            this.controllerFor( 'player' ).set( 'model', this.modelFor( 'pod' ));
        }
    },
    model: function( params ){
        return this.store.find( 'pod', params.pod_id );
    }
});
