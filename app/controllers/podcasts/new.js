import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        save: function(){
            var self = this;

            this.store.find( 'podcast', { url : this.get( 'url' ) } )

            //results found, return the first model's id
            .then( function( results ){
                return results.get( 'firstObject.id' );
            }, null, 'podcasts/new - store.find.then')

            //nothing found, save the model and return it's id in a promise
            .catch( function(){

                return self.store.createRecord( 'podcast', { url: self.get( 'url' ) } )
                    .save()
                    .then( function( model ){
                        return model.updateFeed();
                    }, null, 'podcasts/new - model.save.then')
                    .then( function( model ){
                        return model.get( 'id' );
                    }, null, 'podcasts/new - model.save.then.then')
                    .catch( function( model ){
                        //model did not updae because of error...
                        model.destroyRecord();
                        return null;
                    });
                    
            }, 'podcasts/new - store.find.catch')

            .then( function( podcastId ){
                if( podcastId ){
                    self.set( 'url', '' );
                    self.transitionToRoute( 'podcast', podcastId );
                    return;
                }
                //should never get here
                //need same error handling below
                alert( 'Really failed to create podcast from url:'+self.get('url'));

            })
            .catch( function(){
                //handle failed podcast update
                
                //see if store has model with url
                //if so delete it
                self.store.find( 'podcast', { url : self.get( 'url' ) } )
                .then( function( results ){
                    var model = results.get( 'firstObject' );

                    if( ! model.isDeleted ){
                        model.destroyRecord();
                    }
                });
                
                //display the alert
                alert( 'Failed to create podcast from url:'+self.get('url'));
            });
        
        }
    }
});