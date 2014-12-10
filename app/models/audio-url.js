import DS from 'ember-data';

export default DS.Model.extend({

    audioUrl: DS.attr( 'string' ),

    currentPosition: DS.attr( 'number' ),
    
    duration   : DS.attr( 'number' ),

    hasListened: DS.attr( 'boolean' ),

    pod: DS.belongsTo( 'pod' )
  
});
