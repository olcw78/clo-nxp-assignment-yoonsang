type TyRetThisbind = TypedPropertyDescriptor<any>;

/**
 * @target CLASS.prototype for method, ctor of CLASS for class method (static)
 * @methodname method name
 * @descriptor extension target of this method
 */
export function thisbind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): TyRetThisbind {
  // get method itself
  const originalMethod = descriptor.value;
  const adjustedDescriptor = <TyRetThisbind>{
    configurable: true,
    enumerable: false,
    // add get layer in any case of calling this method with a new bound method to this
    // this always directs to class
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjustedDescriptor;
}
