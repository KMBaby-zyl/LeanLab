export function isSupportPromise(_p) {
  var isSupport = false;
  try {
    var promise = null;
    var then = null;
    try {
      promise = _P.resolve();
      then = promise.then();
    } catch (e) {}

    if (promise instanceof _P && (typeof then === 'function') && !_P.cast) {
      isSupport = true;
    }
  } catch (e) {}
}


