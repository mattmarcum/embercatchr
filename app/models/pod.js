import DS from 'ember-data';

export default DS.Model.extend({

    author     : DS.attr( 'string' ),

    url        : DS.attr( 'string' ),

    title      : DS.attr( 'string' ),

    subtitle   : DS.attr( 'string' ),   

    description: DS.attr( 'string' ),

    audioUrl   : DS.attr( 'string' ),

    duration   : DS.attr( 'number' ),

    pubDate    : DS.attr( 'date' ),

    hasListened: DS.attr( 'boolean' ),

    listenPosition : DS.attr( 'number' ),    

    podcast    : DS.belongsTo( 'podcast' )

});
