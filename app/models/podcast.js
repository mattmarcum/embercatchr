import Ember from 'ember';

import DS from 'ember-data';

module icAjax from 'ic-ajax';

export default DS.Model.extend({

    url        : DS.attr( 'string' ),

    title      : DS.attr( 'string' ),

    description: DS.attr( 'string' ),

    published  : DS.attr( 'date' ),

    lastUpdated: DS.attr( 'date' ),

    pods       : DS.hasMany( 'pod', {async:true} ),

    updateFeed: function(){

        var options = {

            dataType : 'jsonp',

            url      : this._formatUrl(),

            context  : this

        },

        promise,

        self = this;

        promise = icAjax.request( options ).then(

            function podcastUpdateFeedSuccess( result ){

                var podPromises;

                Ember.assert( result.responseData.feed, 'Invalid feed from:', self.get( 'url' ));

                var xmlFeed = result.responseData.xmlString,
                    feed = new JFeed( xmlFeed ),
                    pods;

                self.set( 'title', feed.title );
                self.set( 'description', feed.description );
                self.set( 'lastUpdated', new Date() );

                pods=feed.items.map( function( item ){
                    return {
                        description: item.description,
                        audioUrl: item.enclosure,
                        title: item.title,
                        pubDate: new Date(item.updated),
                        url: item.id,
                        duration: self._parseDuration(item.duration),
                        podcast: self
                    };
                }).filter( function( item ){ 
                    return item.audioUrl; 
                });

                //get all the promises for every pod that will save
                podPromises = pods.map( function( pod ){
                            //check to see if the pod is already in the store   
                    return  self.store.find( 'pod', { url: pod.url })
                            //if not then save it
                            .then( 
                            function( pods ){
                                //the pod already is in the db, update it
                                var podRecord = pods.get( 'firstObject' );
                                podRecord.setProperties( pod );

                                return podRecord.save();
                            },  
                            function(){ 
                                //create a new pod
                                return  self.store.createRecord( 'pod', pod )
                                        .save();

                            });

                });

                return  Ember.RSVP.all( podPromises )
                        
                        .then( function( pods ){
                            return self.get( 'pods' )
                            .then( function( selfPods ){
                                selfPods.addObjects( pods );
                                return self.save();
                            });
                        });
            }, 

            null, 

            'modelPodUpdateFeed' );

        return promise;
    },

    unlistened: Ember.reduceComputed( 'pods', {
        initialValue: 0,
        addedItem: function( accum, item ){
            return accum + ( item.get( 'hasListened' ) ? 0 : 1 );
        },
        removedItem: function( accum, item ){
            return accum - ( item.get( 'hasListened' ) ? 0 : 1 );
        }
    }),

    _parseDuration: function( duration ){
        var segments = duration.split(':');

        switch( segments.length ){
            case 3:
                return parseInt( segments[0] )*60*60 + parseInt( segments[1] )*60 + parseInt( segments[2] );
            case 2:
                return parseInt( segments[0] )*60 + parseInt( segments[1] );
        }
        return Ember.isEmpty( duration ) ? 0 : parseInt(duration);
    },

    _formatUrl: function(){
        
        return 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=-1&q=' +
        
            encodeURIComponent( this.get( 'url' ) );
    
    }

});