import DS from 'ember-data';

export default DS.Model.extend({

    author     : DS.attr( 'string' ),

    url        : DS.attr( 'string' ),

    title      : DS.attr( 'string' ),

    subtitle   : DS.attr( 'string' ),   

    description: DS.attr( 'string' ),

    pubDate    : DS.attr( 'date' ),

    audioUrls  : DS.hasMany( 'audioUrl' ),

    podcast    : DS.belongsTo( 'podcast' )
});
