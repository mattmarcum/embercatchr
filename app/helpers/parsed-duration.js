import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
    var duration = parseInt( value ? value : 0 ),
        hours = Math.floor( duration / 3600),
        minutes = hours ? Math.floor( (duration % 3600) / 60 ) : Math.floor( duration / 60 ),
        seconds = duration % 60;
    
    if(hours   < 10){
        hours   = "0"+hours;
    }
    if(minutes < 10){
        minutes = "0"+minutes;
    }
    if(seconds < 10){
        seconds = "0"+seconds;
    }

    return ( hours ? hours+':' : '' )+minutes+':'+seconds; 
});
