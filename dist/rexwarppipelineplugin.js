(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwarppipelineplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  // reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/
  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform vec2 amplitude;\nuniform vec2 frequency;\nuniform vec2 progress;\n\n\nvoid main (void) {\n  vec2 dxy = frequency/texSize;\n  vec2 r = amplitude/texSize;\n  vec2 angle = (outTexCoord / dxy) + progress;\n  vec2 tc = (vec2(cos(angle.x),sin(angle.y)) * r) + outTexCoord;\n  gl_FragColor = texture2D(uMainSampler, tc);\n}\n";

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var PI2 = Math.PI * 2;

  var WarpPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(WarpPostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(WarpPostFxPipeline);

    function WarpPostFxPipeline(game) {
      var _this;

      _classCallCheck(this, WarpPostFxPipeline);

      _this = _super.call(this, {
        name: 'rexWarpPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      });
      _this.frequencyX = 10;
      _this.frequencyY = 10;
      _this.amplitudeX = 10;
      _this.amplitudeY = 10;
      _this.progressX = 0;
      _this.progressY = 0;
      return _this;
    }

    _createClass(WarpPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var frequency = GetValue(o, 'frequency', 10);
        this.setFrequency(GetValue(o, 'frequencyX', frequency), GetValue(o, 'frequencyY', frequency));
        var amplitude = GetValue(o, 'amplitude', 10);
        this.setAmplitude(GetValue(o, 'amplitudeX', amplitude), GetValue(o, 'amplitudeY', amplitude));
        var progress = GetValue(o, 'progress', 0);
        this.setProgress(GetValue(o, 'progressX', progress), GetValue(o, 'progressY', progress));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set2f('frequency', this.frequencyX, this.frequencyY);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);
        this.set2f('progress', this.progressX * PI2, this.progressY * PI2);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      } // frequencyX

    }, {
      key: "setFrequencyX",
      value: function setFrequencyX(value) {
        this.frequencyX = value;
        return this;
      } // frequencyY

    }, {
      key: "setFrequencyY",
      value: function setFrequencyY(value) {
        this.frequencyY = value;
        return this;
      }
    }, {
      key: "setFrequency",
      value: function setFrequency(width, height) {
        if (height === undefined) {
          height = width;
        }

        this.frequencyX = width;
        this.frequencyY = height;
        return this;
      }
    }, {
      key: "frequency",
      get: function get() {
        return (this.frequencyX + this.frequencyY) / 2;
      },
      set: function set(value) {
        this.frequencyX = value;
        this.frequencyY = value;
      } // amplitudeX

    }, {
      key: "setAmplitudeX",
      value: function setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
      } // amplitudeY

    }, {
      key: "setAmplitudeY",
      value: function setAmplitudeY(value) {
        this.amplitudeY = value;
        return this;
      }
    }, {
      key: "setAmplitude",
      value: function setAmplitude(x, y) {
        if (y === undefined) {
          y = x;
        }

        this.amplitudeX = x;
        this.amplitudeY = y;
        return this;
      }
    }, {
      key: "amplitude",
      get: function get() {
        return (this.amplitudeX + this.amplitudeY) / 2;
      },
      set: function set(value) {
        this.amplitudeX = value;
        this.amplitudeY = value;
      } // progress

    }, {
      key: "setProgressX",
      value: function setProgressX(value) {
        this.progressX = value;
        return this;
      }
    }, {
      key: "setProgressY",
      value: function setProgressY(value) {
        this.progressY = value;
        return this;
      }
    }, {
      key: "setProgress",
      value: function setProgress(x, y) {
        if (y === undefined) {
          y = x;
        }

        this.progressX = x;
        this.progressY = y;
        return this;
      }
    }, {
      key: "progress",
      get: function get() {
        return (this.progressX + this.progressY) / 2;
      },
      set: function set(value) {
        this.progressX = value;
        this.progressY = value;
      }
    }]);

    return WarpPostFxPipeline;
  }(PostFXPipeline);

  var SpliceOne = Phaser.Utils.Array.SpliceOne;

  var BasePostFxPipelinePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(BasePostFxPipelinePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(BasePostFxPipelinePlugin);

    function BasePostFxPipelinePlugin() {
      _classCallCheck(this, BasePostFxPipelinePlugin);

      return _super.apply(this, arguments);
    }

    _createClass(BasePostFxPipelinePlugin, [{
      key: "setPostPipelineClass",
      value: function setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
        this.PostFxPipelineClass = PostFxPipelineClass;
        this.postFxPipelineName = postFxPipelineName;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
        this.game.renderer.pipelines.addPostPipeline(this.postFxPipelineName, this.PostFxPipelineClass);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        if (config === undefined) {
          config = {};
        }

        gameObject.setPostPipeline(this.PostFxPipelineClass);
        var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
        pipeline.resetFromJSON(config);

        if (config.name) {
          pipeline.name = config.name;
        }

        return pipeline;
      }
    }, {
      key: "remove",
      value: function remove(gameObject, name) {
        var PostFxPipelineClass = this.PostFxPipelineClass;

        if (name === undefined) {
          var pipelines = gameObject.postPipelines;

          for (var i = pipelines.length - 1; i >= 0; i--) {
            var instance = pipelines[i];

            if (instance instanceof PostFxPipelineClass) {
              instance.destroy();
              SpliceOne(pipelines, i);
            }
          }
        } else {
          var pipelines = gameObject.postPipelines;

          for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
            var instance = pipelines[i];

            if (instance instanceof PostFxPipelineClass && instance.name === name) {
              instance.destroy();
              SpliceOne(pipelines, i);
            }
          }
        }

        return this;
      }
    }, {
      key: "get",
      value: function get(gameObject, name) {
        var PostFxPipelineClass = this.PostFxPipelineClass;

        if (name === undefined) {
          var result = [];
          var pipelines = gameObject.postPipelines;

          for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
            var instance = pipelines[i];

            if (instance instanceof PostFxPipelineClass) {
              result.push(instance);
            }
          }

          return result;
        } else {
          var pipelines = gameObject.postPipelines;

          for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
            var instance = pipelines[i];

            if (instance instanceof PostFxPipelineClass && instance.name === name) {
              return instance;
            }
          }
        }
      }
    }]);

    return BasePostFxPipelinePlugin;
  }(Phaser.Plugins.BasePlugin);

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };

  var GetEntry = function GetEntry(target, keys, defaultEntry) {
    var entry = target;

    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      var key;

      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];

        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
          var newEntry;

          if (i === cnt - 1) {
            if (defaultEntry === undefined) {
              newEntry = {};
            } else {
              newEntry = defaultEntry;
            }
          } else {
            newEntry = {};
          }

          entry[key] = newEntry;
        }

        entry = entry[key];
      }
    }

    return entry;
  };

  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    } // no object


    if (_typeof(target) !== 'object') {
      return;
    } // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      } // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split(delimiter);
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var WarpPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(WarpPipelinePlugin, _BasePostFxPipelinePl);

    var _super = _createSuper(WarpPipelinePlugin);

    function WarpPipelinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, WarpPipelinePlugin);

      _this = _super.call(this, pluginManager);

      _this.setPostPipelineClass(WarpPostFxPipeline, 'rexWarpPostFx');

      return _this;
    }

    return _createClass(WarpPipelinePlugin);
  }(BasePostFxPipelinePlugin);

  SetValue(window, 'RexPlugins.Pipelines.WarpPostFx', WarpPostFxPipeline);

  return WarpPipelinePlugin;

}));