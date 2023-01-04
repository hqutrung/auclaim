(function () {
  /** Detect free variable `global` from Node.js. */
  var freeGlobal =
    typeof global == "object" && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf =
    typeof self == "object" && self && self.Object === Object && self;

  var freeExports =
    typeof exports == "object" && exports && !exports.nodeType && exports;

  var root = freeGlobal || freeSelf || Function("return this")();

  var freeModule =
    freeExports &&
    typeof module == "object" &&
    module &&
    !module.nodeType &&
    module;

  var add = function (augend, addend) {
    return augend + addend;
  };
  var getAddress = function (blockchain) {
    return window.flutter_inappwebview.callHandler("onGetAddress", {
      block_chain: blockchain,
    });
  };

  var runInContext = function runInContext(context) {
    context =
      context == null
        ? root
        : _.defaults(root.Object(), context, _.pick(root, contextProps));

    function AuClaimWrapper() {
      this._name = "";
    }

    function auClaim() {
      return new AuClaimWrapper();
    }

    auClaim.add = add;
    auClaim.getAddress = getAddress;
    return auClaim;
  };

  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (
    typeof define == "function" &&
    typeof define.amd == "object" &&
    define.amd
  ) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function () {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  } else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));
