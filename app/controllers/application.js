import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        toggleWebTwoDotOh: function(){
            if( this.get('webTwoDotOh') ){
                return this.set( 'webTwoDotOh', '');
            }
            this.set( 'webTwoDotOh', 'e' );
        },
        toggleNav: function(){
            this.toggleProperty( 'showNav' );
        }
    },
   
    webTwoDotOh: 'e',

    currentPathChange: function(){
        this.set( 'showNav', false );
    }.observes( 'currentPath' )
});
