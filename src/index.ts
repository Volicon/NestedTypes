/**
 * Prepare backbone View, Router, History, and Events.  
 */
import * as Nested from './type-r'
import * as Backbone from './backbone'
import { RestCollection, RestModel } from './rest'
import { Store } from './type-r'
import * as Sync from './sync'

import { ModelMixin, CollectionMixin } from './underscore-mixin'
import { RestStore, LazyStore } from './rest-store'
 
Nested.Mixable.mixins( Nested.Events );
Nested.Mixable.mixTo( Backbone.View, Backbone.Router, Backbone.History );

Nested.Record.mixins( ModelMixin );
Nested.Record.Collection.mixins( CollectionMixin );

const { assign } = Nested.tools;

/**
 * Prepare  
 */

// allow sync and jQuery override
Object.defineProperties( Nested, {
    'emulateHTTP'  : linkProperty( Backbone, 'emulateHTTP' ),
    'emulateJSON'  : linkProperty( Backbone, 'emulateJSON' ),
    'sync'         : linkProperty( Sync, 'sync' ),
    'errorPromise' : linkProperty( Sync, 'errorPromise' ),
    'ajax'         : linkProperty( Sync, 'ajax' ),
    'history'      : linkProperty( Backbone, 'history' ),
    'store'        : linkProperty( Store, 'global' ),
    '$' : {
        get(){ return Backbone.$; },
        set( value ){ (<any>Backbone).$ = (<any>Sync).$ = value; }
    }
} );

assign( Nested, Backbone, {
    Backbone  : Backbone,
    Class     : Nested.Messenger,
    Model     : RestModel,
    Collection : RestCollection,
    LazyStore  : LazyStore,
    Store     : RestStore,

    defaults( x ){
        return Nested.Model.defaults( x );
    },

    default : Nested
} );

export = Nested;

function linkProperty( Namespace, name ){
    return {
        get : function(){ return Namespace[ name ]; },
        set : function( value ){ Namespace[ name ] = value; }
    };
}
