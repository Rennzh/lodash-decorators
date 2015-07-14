'use strict';

import bindAllClassMethods from './utils/bindAllClassMethods';
import flatten from 'lodash/array/flatten';
import assignAll, { FUNCTION_PROPERTY_EXCLUDES } from './utils/assignAll';
import wrapConstructor from './utils/wrapConstructor';

/**
 * Binds all class methods to the instance upon instantiation. This
 * extends the current constructor and copies over all properties,
 * including static methods. We could do an ES6 class extend instead
 * but we need to bind all the class methods BEFORE we call the super
 * constructor, which ES6 classes won't let us do.
 */
export default function bindAllWrapper(...methods) {
  methods = flatten(methods);

  return function bindAllDecorator(...properties) {
    if (properties.length > 1) {
      throw new Error('BindAll decorator can only be applied to a class');
    }

    return wrapConstructor(properties[0], function(Ctor, ...args) {
      bindAllClassMethods(this, methods.length ? methods : null);

      return Ctor.apply(this, args);
    });
  };
}