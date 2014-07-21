import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: [ ':progress' ],

    width: function(){
        var percentage = this.getWithDefault( 'percentage', 0 );

        percentage = isNaN( percentage ) ? 0 : percentage;

        return 'width:'+percentage+'%';

    }.property( 'percentage' ),

    click: function( e ){
        var offsetX = e.offsetX,
            xWidth = this.$().width(),
            positionPercentage = (( offsetX / xWidth ) * 100 );

        this.get( 'parentView' ).send( this.get('action'), positionPercentage );

    },

    progressBar: Ember.View.extend({

        classNameBindings: [ ':progress-bar' ],
        attributeBindings: [ 'role', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'style' ],
        role: 'progressbar',
        'aria-valuemax': 100,
        'aria-valuemin': 0,
        'aria-valuenow': Ember.computed.alias( 'parentView.percentage' ),
        'style': Ember.computed.alias( 'parentView.width' ),

    })
});
