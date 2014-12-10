import Ember from 'ember';

export default Ember.View.extend({

    classNameBindings: [ ':container-fluid' ],

    muted: false,

    volume: 1.0,

    actions:{

        play: function(){
            this.get( 'audioTag' ).$()[0].play();
        },
        pause: function(){
            this.get( 'audioTag' ).$()[0].pause();
        },
        mute: function(){
            this.toggleProperty( 'muted' );
            this.get( 'audioTag' ).$()[0].muted = this.get( 'muted' );
        },
        increaseVolume: function(){
            var volume = this.get( 'volume' );
            volume = volume <=0.95 ? volume + 0.05 : volume;

            this.get( 'audioTag' ).$()[0].volume = volume;
            this.set( 'volume', volume );
        },
        decreaseVolume: function(){
            var volume = this.get( 'volume' );
            volume = volume >= 0.05 ? volume - 0.05 : volume;

            this.get( 'audioTag' ).$()[0].volume = volume;
            this.set( 'volume', volume );
        },
        jumpToPostion: function( positionPercentage ){
            var duration = parseInt( this.get( 'audioTag' ).$()[0].duration ),
                position = duration * ( positionPercentage / 100 );
            if( ! this.get( 'audioTag' ).$()[0].error && ! isNaN( position ) ){
                this.get( 'audioTag' ).$()[0].currentTime = position;
            }
        }
    },

    audioUrlObserver: function(){
        this.set( 'audioTag.src', this.get( 'controller.audioUrl' ) );

    }.observes( 'controller.audioUrl' ),

    audioTag: Ember.View.extend({

        didInsertElement: function(){
            var boundOntimeupdate = Ember.run.bind( this, 'ontimeupdate' ),
                boundEnded = Ember.run.bind( this, 'onended' ),
                boundDurationchange  = Ember.run.bind( this, 'ondurationchange' );

            this.set( 'boundOntimeupdate', boundOntimeupdate );
            this.set( 'boundEnded', boundEnded );
            this.set( 'boundDurationchange', boundDurationchange );

            this.$().on( 'timeupdate', boundOntimeupdate );
            this.$().on( 'ended', boundEnded );
            this.$().on( 'durationchange', boundDurationchange );
        },

        willDestroyElement: function(){
            this.$().on( 'timeupdate', this.get( 'boundOntimeupdate' ) );
            this.$().on( 'ended', this.get( 'boundEnded' ) );
            this.$().on( 'durationchange', this.get( 'boundDurationchange' ) );
        },
        
        tagName: 'audio',
        
        attributeBindings: [ 
            'src', 
            'autoplay'
        ],
        
        autoplay: true,
        
        src: '',

        ondurationchange: function(){
            this.set( 'controller.duration', Math.floor( this.$()[0].duration ));            
        },
        ontimeupdate: function(){
            var time = Math.floor( this.$()[0].currentTime ); 
            if( time > 10 ){
                this.set( 'controller.model.hasListened', true );
            }
            this.set( 'controller.model.currentPosition', time );
        },
        onended: function(){
            this.send('playerEnded');
        }
    })
});
