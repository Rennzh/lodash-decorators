import { defer } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialedApplicator } from './applicators';

export const Defer: (...args: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(defer, PartialedApplicator));