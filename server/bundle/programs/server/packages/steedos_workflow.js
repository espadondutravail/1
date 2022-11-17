(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ECMAScript = Package.ecmascript.ECMAScript;
var Random = Package.random.Random;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var check = Package.check.check;
var Match = Package.check.Match;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var JsonRoutes = Package['simple:json-routes'].JsonRoutes;
var RestMiddleware = Package['simple:json-routes'].RestMiddleware;
var Restivus = Package['nimble:restivus'].Restivus;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Tabular = Package['aldeed:tabular'].Tabular;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var BlazeLayout = Package['kadira:blaze-layout'].BlazeLayout;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var WorkflowManager = Package['steedos:app-workflow'].WorkflowManager;
var uuflowManager = Package['steedos:app-workflow'].uuflowManager;
var pushManager = Package['steedos:app-workflow'].pushManager;
var steedosExport = Package['steedos:app-workflow'].steedosExport;
var steedosImport = Package['steedos:app-workflow'].steedosImport;
var Template = Package['meteorhacks:ssr'].Template;
var SSR = Package['meteorhacks:ssr'].SSR;
var SubsManager = Package['meteorhacks:subs-manager'].SubsManager;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var moment = Package['momentjs:moment'].moment;
var CFDataManager = Package['steedos:autoform'].CFDataManager;
var Selector = Package['steedos:base'].Selector;
var Steedos = Package['steedos:base'].Steedos;
var AjaxCollection = Package['steedos:base'].AjaxCollection;
var SteedosDataManager = Package['steedos:base'].SteedosDataManager;
var SteedosOffice = Package['steedos:base'].SteedosOffice;
var billingManager = Package['steedos:base'].billingManager;
var MailQueue = Package['steedos:mailqueue'].MailQueue;
var WebhookQueue = Package['steedos:webhookqueue'].WebhookQueue;
var _i18n = Package['universe:i18n']._i18n;
var i18n = Package['universe:i18n'].i18n;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var HTML = Package.htmljs.HTML;
var Collection2 = Package['aldeed:collection2-core'].Collection2;
var FS = Package['steedos:cfs-base-package'].FS;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var __coffeescriptShare, Workflow, InstanceReadOnlyTemplate, TemplateManager, SteedosTable, year, month, date, hours, seconds, locale, utcOffset, str, addItemTr, values_history, current_user_info, flow_id, userId, formula_values, new_ins_id, instanceHtml, Form_formula, getHandlersManager, permissionManager, approveManager, flowManager, formManager, stepManager, workflowTemplate, InstanceManager, WorkflowManager_format, CoreForm, InstanceNumberRules;

var require = meteorInstall({"node_modules":{"meteor":{"steedos:workflow":{"checkNpm.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/checkNpm.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let checkNpmVersions;
module.link("meteor/tmeasday:check-npm-versions", {
  checkNpmVersions(v) {
    checkNpmVersions = v;
  }

}, 0);
checkNpmVersions({
  "node-schedule": "^1.3.1",
  "xml2js": "^0.4.19"
}, 'steedos:workflow');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"URI.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/URI.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  /*!
   * URI.js - Mutating URLs
   *
   * Version: 1.17.0
   *
   * Author: Rodney Rehm
   * Web: http://medialize.github.io/URI.js/
   *
   * Licensed under
   *   MIT License http://www.opensource.org/licenses/mit-license
   *   GPL v3 http://opensource.org/licenses/GPL-3.0
   *
   */
  (function (root, factory) {
    'use strict'; // https://github.com/umdjs/umd/blob/master/returnExports.js
    // if (typeof exports === 'object') {
    //   // Node
    //   module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
    // } else

    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
    } else {
      // Browser globals (root is window)
      root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
    }
  })(this, function (punycode, IPv6, SLD, root) {
    'use strict';
    /*global location, escape, unescape */
    // FIXME: v2.0.0 renamce non-camelCase properties to uppercase

    /*jshint camelcase: false */
    // save current URI variable, if any

    var _URI = root && root.URI;

    function URI(url, base) {
      var _urlSupplied = arguments.length >= 1;

      var _baseSupplied = arguments.length >= 2; // Allow instantiation without the 'new' keyword


      if (!(this instanceof URI)) {
        if (_urlSupplied) {
          if (_baseSupplied) {
            return new URI(url, base);
          }

          return new URI(url);
        }

        return new URI();
      }

      if (url === undefined) {
        if (_urlSupplied) {
          throw new TypeError('undefined is not a valid argument for URI');
        }

        if (typeof location !== 'undefined') {
          url = location.href + '';
        } else {
          url = '';
        }
      }

      this.href(url); // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor

      if (base !== undefined) {
        return this.absoluteTo(base);
      }

      return this;
    }

    URI.version = '1.17.0';
    var p = URI.prototype;
    var hasOwn = Object.prototype.hasOwnProperty;

    function escapeRegEx(string) {
      // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
      return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }

    function getType(value) {
      // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
      if (value === undefined) {
        return 'Undefined';
      }

      return String(Object.prototype.toString.call(value)).slice(8, -1);
    }

    function isArray(obj) {
      return getType(obj) === 'Array';
    }

    function filterArrayValues(data, value) {
      var lookup = {};
      var i, length;

      if (getType(value) === 'RegExp') {
        lookup = null;
      } else if (isArray(value)) {
        for (i = 0, length = value.length; i < length; i++) {
          lookup[value[i]] = true;
        }
      } else {
        lookup[value] = true;
      }

      for (i = 0, length = data.length; i < length; i++) {
        /*jshint laxbreak: true */
        var _match = lookup && lookup[data[i]] !== undefined || !lookup && value.test(data[i]);
        /*jshint laxbreak: false */


        if (_match) {
          data.splice(i, 1);
          length--;
          i--;
        }
      }

      return data;
    }

    function arrayContains(list, value) {
      var i, length; // value may be string, number, array, regexp

      if (isArray(value)) {
        // Note: this can be optimized to O(n) (instead of current O(m * n))
        for (i = 0, length = value.length; i < length; i++) {
          if (!arrayContains(list, value[i])) {
            return false;
          }
        }

        return true;
      }

      var _type = getType(value);

      for (i = 0, length = list.length; i < length; i++) {
        if (_type === 'RegExp') {
          if (typeof list[i] === 'string' && list[i].match(value)) {
            return true;
          }
        } else if (list[i] === value) {
          return true;
        }
      }

      return false;
    }

    function arraysEqual(one, two) {
      if (!isArray(one) || !isArray(two)) {
        return false;
      } // arrays can't be equal if they have different amount of content


      if (one.length !== two.length) {
        return false;
      }

      one.sort();
      two.sort();

      for (var i = 0, l = one.length; i < l; i++) {
        if (one[i] !== two[i]) {
          return false;
        }
      }

      return true;
    }

    function trimSlashes(text) {
      var trim_expression = /^\/+|\/+$/g;
      return text.replace(trim_expression, '');
    }

    URI._parts = function () {
      return {
        protocol: null,
        username: null,
        password: null,
        hostname: null,
        urn: null,
        port: null,
        path: null,
        query: null,
        fragment: null,
        // state
        duplicateQueryParameters: URI.duplicateQueryParameters,
        escapeQuerySpace: URI.escapeQuerySpace
      };
    }; // state: allow duplicate query parameters (a=1&a=1)


    URI.duplicateQueryParameters = false; // state: replaces + with %20 (space in query strings)

    URI.escapeQuerySpace = true; // static properties

    URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    URI.idn_expression = /[^a-z0-9\.-]/i;
    URI.punycode_expression = /(xn--)/i; // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?

    URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // credits to Rich Brown
    // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
    // specification: http://www.ietf.org/rfc/rfc4291.txt

    URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/; // expression used is "gruber revised" (@gruber v2) determined to be the
    // best solution in a regex-golf we did a couple of ages ago at
    // * http://mathiasbynens.be/demo/url-regex
    // * http://rodneyrehm.de/t/url-regex.html

    URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    URI.findUri = {
      // valid "scheme://" or "www."
      start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
      // everything up to the next whitespace
      end: /[\s\r\n]|$/,
      // trim trailing punctuation captured by end RegExp
      trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
    }; // http://www.iana.org/assignments/uri-schemes.html
    // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports

    URI.defaultPorts = {
      http: '80',
      https: '443',
      ftp: '21',
      gopher: '70',
      ws: '80',
      wss: '443'
    }; // allowed hostname characters according to RFC 3986
    // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
    // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -

    URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/; // map DOM Elements to their URI attribute

    URI.domAttributes = {
      'a': 'href',
      'blockquote': 'cite',
      'link': 'href',
      'base': 'href',
      'script': 'src',
      'form': 'action',
      'img': 'src',
      'area': 'href',
      'iframe': 'src',
      'embed': 'src',
      'source': 'src',
      'track': 'src',
      'input': 'src',
      // but only if type="image"
      'audio': 'src',
      'video': 'src'
    };

    URI.getDomAttribute = function (node) {
      if (!node || !node.nodeName) {
        return undefined;
      }

      var nodeName = node.nodeName.toLowerCase(); // <input> should only expose src for type="image"

      if (nodeName === 'input' && node.type !== 'image') {
        return undefined;
      }

      return URI.domAttributes[nodeName];
    };

    function escapeForDumbFirefox36(value) {
      // https://github.com/medialize/URI.js/issues/91
      return escape(value);
    } // encoding / decoding according to RFC3986


    function strictEncodeURIComponent(string) {
      // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
      return encodeURIComponent(string).replace(/[!'()*]/g, escapeForDumbFirefox36).replace(/\*/g, '%2A');
    }

    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;

    URI.iso8859 = function () {
      URI.encode = escape;
      URI.decode = unescape;
    };

    URI.unicode = function () {
      URI.encode = strictEncodeURIComponent;
      URI.decode = decodeURIComponent;
    };

    URI.characters = {
      pathname: {
        encode: {
          // RFC3986 2.1: For consistency, URI producers and normalizers should
          // use uppercase hexadecimal digits for all percent-encodings.
          expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
          map: {
            // -._~!'()*
            '%24': '$',
            '%26': '&',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '=',
            '%3A': ':',
            '%40': '@'
          }
        },
        decode: {
          expression: /[\/\?#]/g,
          map: {
            '/': '%2F',
            '?': '%3F',
            '#': '%23'
          }
        }
      },
      reserved: {
        encode: {
          // RFC3986 2.1: For consistency, URI producers and normalizers should
          // use uppercase hexadecimal digits for all percent-encodings.
          expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
          map: {
            // gen-delims
            '%3A': ':',
            '%2F': '/',
            '%3F': '?',
            '%23': '#',
            '%5B': '[',
            '%5D': ']',
            '%40': '@',
            // sub-delims
            '%21': '!',
            '%24': '$',
            '%26': '&',
            '%27': '\'',
            '%28': '(',
            '%29': ')',
            '%2A': '*',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '='
          }
        }
      },
      urnpath: {
        // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
        // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
        // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
        // note that the colon character is not featured in the encoding map; this is because URI.js
        // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
        // should not appear unencoded in a segment itself.
        // See also the note above about RFC3986 and capitalalized hex digits.
        encode: {
          expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
          map: {
            '%21': '!',
            '%24': '$',
            '%27': '\'',
            '%28': '(',
            '%29': ')',
            '%2A': '*',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '=',
            '%40': '@'
          }
        },
        // These characters are the characters called out by RFC2141 as "reserved" characters that
        // should never appear in a URN, plus the colon character (see note above).
        decode: {
          expression: /[\/\?#:]/g,
          map: {
            '/': '%2F',
            '?': '%3F',
            '#': '%23',
            ':': '%3A'
          }
        }
      }
    };

    URI.encodeQuery = function (string, escapeQuerySpace) {
      var escaped = URI.encode(string + '');

      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }

      return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
    };

    URI.decodeQuery = function (string, escapeQuerySpace) {
      string += '';

      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }

      try {
        return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    }; // generate encode/decode path functions


    var _parts = {
      'encode': 'encode',
      'decode': 'decode'
    };

    var _part;

    var generateAccessor = function (_group, _part) {
      return function (string) {
        try {
          return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function (c) {
            return URI.characters[_group][_part].map[c];
          });
        } catch (e) {
          // we're not going to mess with weird encodings,
          // give up and return the undecoded original string
          // see https://github.com/medialize/URI.js/issues/87
          // see https://github.com/medialize/URI.js/issues/92
          return string;
        }
      };
    };

    for (_part in _parts) {
      URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
      URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
    }

    var generateSegmentedPathFunction = function (_sep, _codingFuncName, _innerCodingFuncName) {
      return function (string) {
        // Why pass in names of functions, rather than the function objects themselves? The
        // definitions of some functions (but in particular, URI.decode) will occasionally change due
        // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
        // that the functions we use here are "fresh".
        var actualCodingFunc;

        if (!_innerCodingFuncName) {
          actualCodingFunc = URI[_codingFuncName];
        } else {
          actualCodingFunc = function (string) {
            return URI[_codingFuncName](URI[_innerCodingFuncName](string));
          };
        }

        var segments = (string + '').split(_sep);

        for (var i = 0, length = segments.length; i < length; i++) {
          segments[i] = actualCodingFunc(segments[i]);
        }

        return segments.join(_sep);
      };
    }; // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.


    URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
    URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
    URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
    URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');
    URI.encodeReserved = generateAccessor('reserved', 'encode');

    URI.parse = function (string, parts) {
      var pos;

      if (!parts) {
        parts = {};
      } // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]
      // extract fragment


      pos = string.indexOf('#');

      if (pos > -1) {
        // escaping?
        parts.fragment = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
      } // extract query


      pos = string.indexOf('?');

      if (pos > -1) {
        // escaping?
        parts.query = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
      } // extract protocol


      if (string.substring(0, 2) === '//') {
        // relative-scheme
        parts.protocol = null;
        string = string.substring(2); // extract "user:pass@host:port"

        string = URI.parseAuthority(string, parts);
      } else {
        pos = string.indexOf(':');

        if (pos > -1) {
          parts.protocol = string.substring(0, pos) || null;

          if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
            // : may be within the path
            parts.protocol = undefined;
          } else if (string.substring(pos + 1, pos + 3) === '//') {
            string = string.substring(pos + 3); // extract "user:pass@host:port"

            string = URI.parseAuthority(string, parts);
          } else {
            string = string.substring(pos + 1);
            parts.urn = true;
          }
        }
      } // what's left must be the path


      parts.path = string; // and we're done

      return parts;
    };

    URI.parseHost = function (string, parts) {
      // Copy chrome, IE, opera backslash-handling behavior.
      // Back slashes before the query string get converted to forward slashes
      // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
      // See: https://code.google.com/p/chromium/issues/detail?id=25916
      // https://github.com/medialize/URI.js/pull/233
      string = string.replace(/\\/g, '/'); // extract host:port

      var pos = string.indexOf('/');
      var bracketPos;
      var t;

      if (pos === -1) {
        pos = string.length;
      }

      if (string.charAt(0) === '[') {
        // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
        // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
        // IPv6+port in the format [2001:db8::1]:80 (for the time being)
        bracketPos = string.indexOf(']');
        parts.hostname = string.substring(1, bracketPos) || null;
        parts.port = string.substring(bracketPos + 2, pos) || null;

        if (parts.port === '/') {
          parts.port = null;
        }
      } else {
        var firstColon = string.indexOf(':');
        var firstSlash = string.indexOf('/');
        var nextColon = string.indexOf(':', firstColon + 1);

        if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
          // IPv6 host contains multiple colons - but no port
          // this notation is actually not allowed by RFC 3986, but we're a liberal parser
          parts.hostname = string.substring(0, pos) || null;
          parts.port = null;
        } else {
          t = string.substring(0, pos).split(':');
          parts.hostname = t[0] || null;
          parts.port = t[1] || null;
        }
      }

      if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
        pos++;
        string = '/' + string;
      }

      return string.substring(pos) || '/';
    };

    URI.parseAuthority = function (string, parts) {
      string = URI.parseUserinfo(string, parts);
      return URI.parseHost(string, parts);
    };

    URI.parseUserinfo = function (string, parts) {
      // extract username:password
      var firstSlash = string.indexOf('/');
      var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
      var t; // authority@ must come before /path

      if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
        t = string.substring(0, pos).split(':');
        parts.username = t[0] ? URI.decode(t[0]) : null;
        t.shift();
        parts.password = t[0] ? URI.decode(t.join(':')) : null;
        string = string.substring(pos + 1);
      } else {
        parts.username = null;
        parts.password = null;
      }

      return string;
    };

    URI.parseQuery = function (string, escapeQuerySpace) {
      if (!string) {
        return {};
      } // throw out the funky business - "?"[name"="value"&"]+


      string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

      if (!string) {
        return {};
      }

      var items = {};
      var splits = string.split('&');
      var length = splits.length;
      var v, name, value;

      for (var i = 0; i < length; i++) {
        v = splits[i].split('=');
        name = URI.decodeQuery(v.shift(), escapeQuerySpace); // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters

        value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

        if (hasOwn.call(items, name)) {
          if (typeof items[name] === 'string' || items[name] === null) {
            items[name] = [items[name]];
          }

          items[name].push(value);
        } else {
          items[name] = value;
        }
      }

      return items;
    };

    URI.build = function (parts) {
      var t = '';

      if (parts.protocol) {
        t += parts.protocol + ':';
      }

      if (!parts.urn && (t || parts.hostname)) {
        t += '//';
      }

      t += URI.buildAuthority(parts) || '';

      if (typeof parts.path === 'string') {
        if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
          t += '/';
        }

        t += parts.path;
      }

      if (typeof parts.query === 'string' && parts.query) {
        t += '?' + parts.query;
      }

      if (typeof parts.fragment === 'string' && parts.fragment) {
        t += '#' + parts.fragment;
      }

      return t;
    };

    URI.buildHost = function (parts) {
      var t = '';

      if (!parts.hostname) {
        return '';
      } else if (URI.ip6_expression.test(parts.hostname)) {
        t += '[' + parts.hostname + ']';
      } else {
        t += parts.hostname;
      }

      if (parts.port) {
        t += ':' + parts.port;
      }

      return t;
    };

    URI.buildAuthority = function (parts) {
      return URI.buildUserinfo(parts) + URI.buildHost(parts);
    };

    URI.buildUserinfo = function (parts) {
      var t = '';

      if (parts.username) {
        t += URI.encode(parts.username);

        if (parts.password) {
          t += ':' + URI.encode(parts.password);
        }

        t += '@';
      }

      return t;
    };

    URI.buildQuery = function (data, duplicateQueryParameters, escapeQuerySpace) {
      // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
      // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
      // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
      // URI.js treats the query string as being application/x-www-form-urlencoded
      // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type
      var t = '';
      var unique, key, i, length;

      for (key in data) {
        if (hasOwn.call(data, key) && key) {
          if (isArray(data[key])) {
            unique = {};

            for (i = 0, length = data[key].length; i < length; i++) {
              if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
                t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);

                if (duplicateQueryParameters !== true) {
                  unique[data[key][i] + ''] = true;
                }
              }
            }
          } else if (data[key] !== undefined) {
            t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
          }
        }
      }

      return t.substring(1);
    };

    URI.buildQueryParameter = function (name, value, escapeQuerySpace) {
      // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
      // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
      return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
    };

    URI.addQuery = function (data, name, value) {
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            URI.addQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        if (data[name] === undefined) {
          data[name] = value;
          return;
        } else if (typeof data[name] === 'string') {
          data[name] = [data[name]];
        }

        if (!isArray(value)) {
          value = [value];
        }

        data[name] = (data[name] || []).concat(value);
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
      }
    };

    URI.removeQuery = function (data, name, value) {
      var i, length, key;

      if (isArray(name)) {
        for (i = 0, length = name.length; i < length; i++) {
          data[name[i]] = undefined;
        }
      } else if (getType(name) === 'RegExp') {
        for (key in data) {
          if (name.test(key)) {
            data[key] = undefined;
          }
        }
      } else if (typeof name === 'object') {
        for (key in name) {
          if (hasOwn.call(name, key)) {
            URI.removeQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        if (value !== undefined) {
          if (getType(value) === 'RegExp') {
            if (!isArray(data[name]) && value.test(data[name])) {
              data[name] = undefined;
            } else {
              data[name] = filterArrayValues(data[name], value);
            }
          } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
            data[name] = undefined;
          } else if (isArray(data[name])) {
            data[name] = filterArrayValues(data[name], value);
          }
        } else {
          data[name] = undefined;
        }
      } else {
        throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
      }
    };

    URI.hasQuery = function (data, name, value, withinArray) {
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            if (!URI.hasQuery(data, key, name[key])) {
              return false;
            }
          }
        }

        return true;
      } else if (typeof name !== 'string') {
        throw new TypeError('URI.hasQuery() accepts an object, string as the name parameter');
      }

      switch (getType(value)) {
        case 'Undefined':
          // true if exists (but may be empty)
          return name in data;
        // data[name] !== undefined;

        case 'Boolean':
          // true if exists and non-empty
          var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);

          return value === _booly;

        case 'Function':
          // allow complex comparison
          return !!value(data[name], name, data);

        case 'Array':
          if (!isArray(data[name])) {
            return false;
          }

          var op = withinArray ? arrayContains : arraysEqual;
          return op(data[name], value);

        case 'RegExp':
          if (!isArray(data[name])) {
            return Boolean(data[name] && data[name].match(value));
          }

          if (!withinArray) {
            return false;
          }

          return arrayContains(data[name], value);

        case 'Number':
          value = String(value);

        /* falls through */

        case 'String':
          if (!isArray(data[name])) {
            return data[name] === value;
          }

          if (!withinArray) {
            return false;
          }

          return arrayContains(data[name], value);

        default:
          throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
      }
    };

    URI.commonPath = function (one, two) {
      var length = Math.min(one.length, two.length);
      var pos; // find first non-matching character

      for (pos = 0; pos < length; pos++) {
        if (one.charAt(pos) !== two.charAt(pos)) {
          pos--;
          break;
        }
      }

      if (pos < 1) {
        return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
      } // revert to last /


      if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
        pos = one.substring(0, pos).lastIndexOf('/');
      }

      return one.substring(0, pos + 1);
    };

    URI.withinString = function (string, callback, options) {
      options || (options = {});

      var _start = options.start || URI.findUri.start;

      var _end = options.end || URI.findUri.end;

      var _trim = options.trim || URI.findUri.trim;

      var _attributeOpen = /[a-z0-9-]=["']?$/i;
      _start.lastIndex = 0;

      while (true) {
        var match = _start.exec(string);

        if (!match) {
          break;
        }

        var start = match.index;

        if (options.ignoreHtml) {
          // attribut(e=["']?$)
          var attributeOpen = string.slice(Math.max(start - 3, 0), start);

          if (attributeOpen && _attributeOpen.test(attributeOpen)) {
            continue;
          }
        }

        var end = start + string.slice(start).search(_end);
        var slice = string.slice(start, end).replace(_trim, '');

        if (options.ignore && options.ignore.test(slice)) {
          continue;
        }

        end = start + slice.length;
        var result = callback(slice, start, end, string);
        string = string.slice(0, start) + result + string.slice(end);
        _start.lastIndex = start + result.length;
      }

      _start.lastIndex = 0;
      return string;
    };

    URI.ensureValidHostname = function (v) {
      // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
      // they are not part of DNS and therefore ignored by URI.js
      if (v.match(URI.invalid_hostname_characters)) {
        // test punycode
        if (!punycode) {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
        }

        if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }
      }
    }; // noConflict


    URI.noConflict = function (removeAll) {
      if (removeAll) {
        var unconflicted = {
          URI: this.noConflict()
        };

        if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
          unconflicted.URITemplate = root.URITemplate.noConflict();
        }

        if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
          unconflicted.IPv6 = root.IPv6.noConflict();
        }

        if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
          unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
        }

        return unconflicted;
      } else if (root.URI === this) {
        root.URI = _URI;
      }

      return this;
    };

    p.build = function (deferBuild) {
      if (deferBuild === true) {
        this._deferred_build = true;
      } else if (deferBuild === undefined || this._deferred_build) {
        this._string = URI.build(this._parts);
        this._deferred_build = false;
      }

      return this;
    };

    p.clone = function () {
      return new URI(this);
    };

    p.valueOf = p.toString = function () {
      return this.build(false)._string;
    };

    function generateSimpleAccessor(_part) {
      return function (v, build) {
        if (v === undefined) {
          return this._parts[_part] || '';
        } else {
          this._parts[_part] = v || null;
          this.build(!build);
          return this;
        }
      };
    }

    function generatePrefixAccessor(_part, _key) {
      return function (v, build) {
        if (v === undefined) {
          return this._parts[_part] || '';
        } else {
          if (v !== null) {
            v = v + '';

            if (v.charAt(0) === _key) {
              v = v.substring(1);
            }
          }

          this._parts[_part] = v;
          this.build(!build);
          return this;
        }
      };
    }

    p.protocol = generateSimpleAccessor('protocol');
    p.username = generateSimpleAccessor('username');
    p.password = generateSimpleAccessor('password');
    p.hostname = generateSimpleAccessor('hostname');
    p.port = generateSimpleAccessor('port');
    p.query = generatePrefixAccessor('query', '?');
    p.fragment = generatePrefixAccessor('fragment', '#');

    p.search = function (v, build) {
      var t = this.query(v, build);
      return typeof t === 'string' && t.length ? '?' + t : t;
    };

    p.hash = function (v, build) {
      var t = this.fragment(v, build);
      return typeof t === 'string' && t.length ? '#' + t : t;
    };

    p.pathname = function (v, build) {
      if (v === undefined || v === true) {
        var res = this._parts.path || (this._parts.hostname ? '/' : '');
        return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
      } else {
        if (this._parts.urn) {
          this._parts.path = v ? URI.recodeUrnPath(v) : '';
        } else {
          this._parts.path = v ? URI.recodePath(v) : '/';
        }

        this.build(!build);
        return this;
      }
    };

    p.path = p.pathname;

    p.href = function (href, build) {
      var key;

      if (href === undefined) {
        return this.toString();
      }

      this._string = '';
      this._parts = URI._parts();

      var _URI = href instanceof URI;

      var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);

      if (href.nodeName) {
        var attribute = URI.getDomAttribute(href);
        href = href[attribute] || '';
        _object = false;
      } // window.location is reported to be an object, but it's not the sort
      // of object we're looking for:
      // * location.protocol ends with a colon
      // * location.query != object.search
      // * location.hash != object.fragment
      // simply serializing the unknown object should do the trick
      // (for location, not for everything...)


      if (!_URI && _object && href.pathname !== undefined) {
        href = href.toString();
      }

      if (typeof href === 'string' || href instanceof String) {
        this._parts = URI.parse(String(href), this._parts);
      } else if (_URI || _object) {
        var src = _URI ? href._parts : href;

        for (key in src) {
          if (hasOwn.call(this._parts, key)) {
            this._parts[key] = src[key];
          }
        }
      } else {
        throw new TypeError('invalid input');
      }

      this.build(!build);
      return this;
    }; // identification accessors


    p.is = function (what) {
      var ip = false;
      var ip4 = false;
      var ip6 = false;
      var name = false;
      var sld = false;
      var idn = false;
      var punycode = false;
      var relative = !this._parts.urn;

      if (this._parts.hostname) {
        relative = false;
        ip4 = URI.ip4_expression.test(this._parts.hostname);
        ip6 = URI.ip6_expression.test(this._parts.hostname);
        ip = ip4 || ip6;
        name = !ip;
        sld = name && SLD && SLD.has(this._parts.hostname);
        idn = name && URI.idn_expression.test(this._parts.hostname);
        punycode = name && URI.punycode_expression.test(this._parts.hostname);
      }

      switch (what.toLowerCase()) {
        case 'relative':
          return relative;

        case 'absolute':
          return !relative;
        // hostname identification

        case 'domain':
        case 'name':
          return name;

        case 'sld':
          return sld;

        case 'ip':
          return ip;

        case 'ip4':
        case 'ipv4':
        case 'inet4':
          return ip4;

        case 'ip6':
        case 'ipv6':
        case 'inet6':
          return ip6;

        case 'idn':
          return idn;

        case 'url':
          return !this._parts.urn;

        case 'urn':
          return !!this._parts.urn;

        case 'punycode':
          return punycode;
      }

      return null;
    }; // component specific input validation


    var _protocol = p.protocol;
    var _port = p.port;
    var _hostname = p.hostname;

    p.protocol = function (v, build) {
      if (v !== undefined) {
        if (v) {
          // accept trailing ://
          v = v.replace(/:(\/\/)?$/, '');

          if (!v.match(URI.protocol_expression)) {
            throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
          }
        }
      }

      return _protocol.call(this, v, build);
    };

    p.scheme = p.protocol;

    p.port = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v !== undefined) {
        if (v === 0) {
          v = null;
        }

        if (v) {
          v += '';

          if (v.charAt(0) === ':') {
            v = v.substring(1);
          }

          if (v.match(/[^0-9]/)) {
            throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
          }
        }
      }

      return _port.call(this, v, build);
    };

    p.hostname = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v !== undefined) {
        var x = {};
        var res = URI.parseHost(v, x);

        if (res !== '/') {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }

        v = x.hostname;
      }

      return _hostname.call(this, v, build);
    }; // compound accessors


    p.origin = function (v, build) {
      var parts;

      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        var protocol = this.protocol();
        var authority = this.authority();
        if (!authority) return '';
        return (protocol ? protocol + '://' : '') + this.authority();
      } else {
        var origin = URI(v);
        this.protocol(origin.protocol()).authority(origin.authority()).build(!build);
        return this;
      }
    };

    p.host = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        return this._parts.hostname ? URI.buildHost(this._parts) : '';
      } else {
        var res = URI.parseHost(v, this._parts);

        if (res !== '/') {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }

        this.build(!build);
        return this;
      }
    };

    p.authority = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
      } else {
        var res = URI.parseAuthority(v, this._parts);

        if (res !== '/') {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }

        this.build(!build);
        return this;
      }
    };

    p.userinfo = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        if (!this._parts.username) {
          return '';
        }

        var t = URI.buildUserinfo(this._parts);
        return t.substring(0, t.length - 1);
      } else {
        if (v[v.length - 1] !== '@') {
          v += '@';
        }

        URI.parseUserinfo(v, this._parts);
        this.build(!build);
        return this;
      }
    };

    p.resource = function (v, build) {
      var parts;

      if (v === undefined) {
        return this.path() + this.search() + this.hash();
      }

      parts = URI.parse(v);
      this._parts.path = parts.path;
      this._parts.query = parts.query;
      this._parts.fragment = parts.fragment;
      this.build(!build);
      return this;
    }; // fraction accessors


    p.subdomain = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      } // convenience, return "www" from "www.example.org"


      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        } // grab domain and add another segment


        var end = this._parts.hostname.length - this.domain().length - 1;
        return this._parts.hostname.substring(0, end) || '';
      } else {
        var e = this._parts.hostname.length - this.domain().length;

        var sub = this._parts.hostname.substring(0, e);

        var replace = new RegExp('^' + escapeRegEx(sub));

        if (v && v.charAt(v.length - 1) !== '.') {
          v += '.';
        }

        if (v) {
          URI.ensureValidHostname(v);
        }

        this._parts.hostname = this._parts.hostname.replace(replace, v);
        this.build(!build);
        return this;
      }
    };

    p.domain = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (typeof v === 'boolean') {
        build = v;
        v = undefined;
      } // convenience, return "example.org" from "www.example.org"


      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        } // if hostname consists of 1 or 2 segments, it must be the domain


        var t = this._parts.hostname.match(/\./g);

        if (t && t.length < 2) {
          return this._parts.hostname;
        } // grab tld and add another segment


        var end = this._parts.hostname.length - this.tld(build).length - 1;
        end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
        return this._parts.hostname.substring(end) || '';
      } else {
        if (!v) {
          throw new TypeError('cannot set domain empty');
        }

        URI.ensureValidHostname(v);

        if (!this._parts.hostname || this.is('IP')) {
          this._parts.hostname = v;
        } else {
          var replace = new RegExp(escapeRegEx(this.domain()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        }

        this.build(!build);
        return this;
      }
    };

    p.tld = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (typeof v === 'boolean') {
        build = v;
        v = undefined;
      } // return "org" from "www.example.org"


      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }

        var pos = this._parts.hostname.lastIndexOf('.');

        var tld = this._parts.hostname.substring(pos + 1);

        if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
          return SLD.get(this._parts.hostname) || tld;
        }

        return tld;
      } else {
        var replace;

        if (!v) {
          throw new TypeError('cannot set TLD empty');
        } else if (v.match(/[^a-zA-Z0-9-]/)) {
          if (SLD && SLD.is(v)) {
            replace = new RegExp(escapeRegEx(this.tld()) + '$');
            this._parts.hostname = this._parts.hostname.replace(replace, v);
          } else {
            throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
          }
        } else if (!this._parts.hostname || this.is('IP')) {
          throw new ReferenceError('cannot set TLD on non-domain host');
        } else {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        }

        this.build(!build);
        return this;
      }
    };

    p.directory = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined || v === true) {
        if (!this._parts.path && !this._parts.hostname) {
          return '';
        }

        if (this._parts.path === '/') {
          return '/';
        }

        var end = this._parts.path.length - this.filename().length - 1;
        var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');
        return v ? URI.decodePath(res) : res;
      } else {
        var e = this._parts.path.length - this.filename().length;

        var directory = this._parts.path.substring(0, e);

        var replace = new RegExp('^' + escapeRegEx(directory)); // fully qualifier directories begin with a slash

        if (!this.is('relative')) {
          if (!v) {
            v = '/';
          }

          if (v.charAt(0) !== '/') {
            v = '/' + v;
          }
        } // directories always end with a slash


        if (v && v.charAt(v.length - 1) !== '/') {
          v += '/';
        }

        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
        this.build(!build);
        return this;
      }
    };

    p.filename = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
          return '';
        }

        var pos = this._parts.path.lastIndexOf('/');

        var res = this._parts.path.substring(pos + 1);

        return v ? URI.decodePathSegment(res) : res;
      } else {
        var mutatedDirectory = false;

        if (v.charAt(0) === '/') {
          v = v.substring(1);
        }

        if (v.match(/\.?\//)) {
          mutatedDirectory = true;
        }

        var replace = new RegExp(escapeRegEx(this.filename()) + '$');
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);

        if (mutatedDirectory) {
          this.normalizePath(build);
        } else {
          this.build(!build);
        }

        return this;
      }
    };

    p.suffix = function (v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
          return '';
        }

        var filename = this.filename();
        var pos = filename.lastIndexOf('.');
        var s, res;

        if (pos === -1) {
          return '';
        } // suffix may only contain alnum characters (yup, I made this up.)


        s = filename.substring(pos + 1);
        res = /^[a-z0-9%]+$/i.test(s) ? s : '';
        return v ? URI.decodePathSegment(res) : res;
      } else {
        if (v.charAt(0) === '.') {
          v = v.substring(1);
        }

        var suffix = this.suffix();
        var replace;

        if (!suffix) {
          if (!v) {
            return this;
          }

          this._parts.path += '.' + URI.recodePath(v);
        } else if (!v) {
          replace = new RegExp(escapeRegEx('.' + suffix) + '$');
        } else {
          replace = new RegExp(escapeRegEx(suffix) + '$');
        }

        if (replace) {
          v = URI.recodePath(v);
          this._parts.path = this._parts.path.replace(replace, v);
        }

        this.build(!build);
        return this;
      }
    };

    p.segment = function (segment, v, build) {
      var separator = this._parts.urn ? ':' : '/';
      var path = this.path();
      var absolute = path.substring(0, 1) === '/';
      var segments = path.split(separator);

      if (segment !== undefined && typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
      }

      if (segment !== undefined && typeof segment !== 'number') {
        throw new Error('Bad segment "' + segment + '", must be 0-based integer');
      }

      if (absolute) {
        segments.shift();
      }

      if (segment < 0) {
        // allow negative indexes to address from the end
        segment = Math.max(segments.length + segment, 0);
      }

      if (v === undefined) {
        /*jshint laxbreak: true */
        return segment === undefined ? segments : segments[segment];
        /*jshint laxbreak: false */
      } else if (segment === null || segments[segment] === undefined) {
        if (isArray(v)) {
          segments = []; // collapse empty elements within array

          for (var i = 0, l = v.length; i < l; i++) {
            if (!v[i].length && (!segments.length || !segments[segments.length - 1].length)) {
              continue;
            }

            if (segments.length && !segments[segments.length - 1].length) {
              segments.pop();
            }

            segments.push(trimSlashes(v[i]));
          }
        } else if (v || typeof v === 'string') {
          v = trimSlashes(v);

          if (segments[segments.length - 1] === '') {
            // empty trailing elements have to be overwritten
            // to prevent results such as /foo//bar
            segments[segments.length - 1] = v;
          } else {
            segments.push(v);
          }
        }
      } else {
        if (v) {
          segments[segment] = trimSlashes(v);
        } else {
          segments.splice(segment, 1);
        }
      }

      if (absolute) {
        segments.unshift('');
      }

      return this.path(segments.join(separator), build);
    };

    p.segmentCoded = function (segment, v, build) {
      var segments, i, l;

      if (typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
      }

      if (v === undefined) {
        segments = this.segment(segment, v, build);

        if (!isArray(segments)) {
          segments = segments !== undefined ? URI.decode(segments) : undefined;
        } else {
          for (i = 0, l = segments.length; i < l; i++) {
            segments[i] = URI.decode(segments[i]);
          }
        }

        return segments;
      }

      if (!isArray(v)) {
        v = typeof v === 'string' || v instanceof String ? URI.encode(v) : v;
      } else {
        for (i = 0, l = v.length; i < l; i++) {
          v[i] = URI.encode(v[i]);
        }
      }

      return this.segment(segment, v, build);
    }; // mutating query string


    var q = p.query;

    p.query = function (v, build) {
      if (v === true) {
        return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      } else if (typeof v === 'function') {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        var result = v.call(this, data);
        this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        this.build(!build);
        return this;
      } else if (v !== undefined && typeof v !== 'string') {
        this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        this.build(!build);
        return this;
      } else {
        return q.call(this, v, build);
      }
    };

    p.setQuery = function (name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

      if (typeof name === 'string' || name instanceof String) {
        data[name] = value !== undefined ? value : null;
      } else if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            data[key] = name[key];
          }
        }
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
      }

      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);

      if (typeof name !== 'string') {
        build = value;
      }

      this.build(!build);
      return this;
    };

    p.addQuery = function (name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      URI.addQuery(data, name, value === undefined ? null : value);
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);

      if (typeof name !== 'string') {
        build = value;
      }

      this.build(!build);
      return this;
    };

    p.removeQuery = function (name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      URI.removeQuery(data, name, value);
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);

      if (typeof name !== 'string') {
        build = value;
      }

      this.build(!build);
      return this;
    };

    p.hasQuery = function (name, value, withinArray) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      return URI.hasQuery(data, name, value, withinArray);
    };

    p.setSearch = p.setQuery;
    p.addSearch = p.addQuery;
    p.removeSearch = p.removeQuery;
    p.hasSearch = p.hasQuery; // sanitizing URLs

    p.normalize = function () {
      if (this._parts.urn) {
        return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
      }

      return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
    };

    p.normalizeProtocol = function (build) {
      if (typeof this._parts.protocol === 'string') {
        this._parts.protocol = this._parts.protocol.toLowerCase();
        this.build(!build);
      }

      return this;
    };

    p.normalizeHostname = function (build) {
      if (this._parts.hostname) {
        if (this.is('IDN') && punycode) {
          this._parts.hostname = punycode.toASCII(this._parts.hostname);
        } else if (this.is('IPv6') && IPv6) {
          this._parts.hostname = IPv6.best(this._parts.hostname);
        }

        this._parts.hostname = this._parts.hostname.toLowerCase();
        this.build(!build);
      }

      return this;
    };

    p.normalizePort = function (build) {
      // remove port of it's the protocol's default
      if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
        this._parts.port = null;
        this.build(!build);
      }

      return this;
    };

    p.normalizePath = function (build) {
      var _path = this._parts.path;

      if (!_path) {
        return this;
      }

      if (this._parts.urn) {
        this._parts.path = URI.recodeUrnPath(this._parts.path);
        this.build(!build);
        return this;
      }

      if (this._parts.path === '/') {
        return this;
      }

      var _was_relative;

      var _leadingParents = '';

      var _parent, _pos; // handle relative paths


      if (_path.charAt(0) !== '/') {
        _was_relative = true;
        _path = '/' + _path;
      } // handle relative files (as opposed to directories)


      if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
        _path += '/';
      } // resolve simples


      _path = _path.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/'); // remember leading parents

      if (_was_relative) {
        _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';

        if (_leadingParents) {
          _leadingParents = _leadingParents[0];
        }
      } // resolve parents


      while (true) {
        _parent = _path.indexOf('/..');

        if (_parent === -1) {
          // no more ../ to resolve
          break;
        } else if (_parent === 0) {
          // top level cannot be relative, skip it
          _path = _path.substring(3);
          continue;
        }

        _pos = _path.substring(0, _parent).lastIndexOf('/');

        if (_pos === -1) {
          _pos = _parent;
        }

        _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
      } // revert to relative


      if (_was_relative && this.is('relative')) {
        _path = _leadingParents + _path.substring(1);
      }

      _path = URI.recodePath(_path);
      this._parts.path = _path;
      this.build(!build);
      return this;
    };

    p.normalizePathname = p.normalizePath;

    p.normalizeQuery = function (build) {
      if (typeof this._parts.query === 'string') {
        if (!this._parts.query.length) {
          this._parts.query = null;
        } else {
          this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
        }

        this.build(!build);
      }

      return this;
    };

    p.normalizeFragment = function (build) {
      if (!this._parts.fragment) {
        this._parts.fragment = null;
        this.build(!build);
      }

      return this;
    };

    p.normalizeSearch = p.normalizeQuery;
    p.normalizeHash = p.normalizeFragment;

    p.iso8859 = function () {
      // expect unicode input, iso8859 output
      var e = URI.encode;
      var d = URI.decode;
      URI.encode = escape;
      URI.decode = decodeURIComponent;

      try {
        this.normalize();
      } finally {
        URI.encode = e;
        URI.decode = d;
      }

      return this;
    };

    p.unicode = function () {
      // expect iso8859 input, unicode output
      var e = URI.encode;
      var d = URI.decode;
      URI.encode = strictEncodeURIComponent;
      URI.decode = unescape;

      try {
        this.normalize();
      } finally {
        URI.encode = e;
        URI.decode = d;
      }

      return this;
    };

    p.readable = function () {
      var uri = this.clone(); // removing username, password, because they shouldn't be displayed according to RFC 3986

      uri.username('').password('').normalize();
      var t = '';

      if (uri._parts.protocol) {
        t += uri._parts.protocol + '://';
      }

      if (uri._parts.hostname) {
        if (uri.is('punycode') && punycode) {
          t += punycode.toUnicode(uri._parts.hostname);

          if (uri._parts.port) {
            t += ':' + uri._parts.port;
          }
        } else {
          t += uri.host();
        }
      }

      if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
        t += '/';
      }

      t += uri.path(true);

      if (uri._parts.query) {
        var q = '';

        for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
          var kv = (qp[i] || '').split('=');
          q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace).replace(/&/g, '%26');

          if (kv[1] !== undefined) {
            q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace).replace(/&/g, '%26');
          }
        }

        t += '?' + q.substring(1);
      }

      t += URI.decodeQuery(uri.hash(), true);
      return t;
    }; // resolving relative and absolute URLs


    p.absoluteTo = function (base) {
      var resolved = this.clone();
      var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
      var basedir, i, p;

      if (this._parts.urn) {
        throw new Error('URNs do not have any generally defined hierarchical components');
      }

      if (!(base instanceof URI)) {
        base = new URI(base);
      }

      if (!resolved._parts.protocol) {
        resolved._parts.protocol = base._parts.protocol;
      }

      if (this._parts.hostname) {
        return resolved;
      }

      for (i = 0; p = properties[i]; i++) {
        resolved._parts[p] = base._parts[p];
      }

      if (!resolved._parts.path) {
        resolved._parts.path = base._parts.path;

        if (!resolved._parts.query) {
          resolved._parts.query = base._parts.query;
        }
      } else if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? basedir + '/' : '') + resolved._parts.path;
        resolved.normalizePath();
      }

      resolved.build();
      return resolved;
    };

    p.relativeTo = function (base) {
      var relative = this.clone().normalize();
      var relativeParts, baseParts, common, relativePath, basePath;

      if (relative._parts.urn) {
        throw new Error('URNs do not have any generally defined hierarchical components');
      }

      base = new URI(base).normalize();
      relativeParts = relative._parts;
      baseParts = base._parts;
      relativePath = relative.path();
      basePath = base.path();

      if (relativePath.charAt(0) !== '/') {
        throw new Error('URI is already relative');
      }

      if (basePath.charAt(0) !== '/') {
        throw new Error('Cannot calculate a URI relative to another relative URI');
      }

      if (relativeParts.protocol === baseParts.protocol) {
        relativeParts.protocol = null;
      }

      if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
        return relative.build();
      }

      if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
        return relative.build();
      }

      if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
        relativeParts.hostname = null;
        relativeParts.port = null;
      } else {
        return relative.build();
      }

      if (relativePath === basePath) {
        relativeParts.path = '';
        return relative.build();
      } // determine common sub path


      common = URI.commonPath(relativePath, basePath); // If the paths have nothing in common, return a relative URL with the absolute path.

      if (!common) {
        return relative.build();
      }

      var parents = baseParts.path.substring(common.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
      relativeParts.path = parents + relativeParts.path.substring(common.length) || './';
      return relative.build();
    }; // comparing URIs


    p.equals = function (uri) {
      var one = this.clone();
      var two = new URI(uri);
      var one_map = {};
      var two_map = {};
      var checked = {};
      var one_query, two_query, key;
      one.normalize();
      two.normalize(); // exact match

      if (one.toString() === two.toString()) {
        return true;
      } // extract query string


      one_query = one.query();
      two_query = two.query();
      one.query('');
      two.query(''); // definitely not equal if not even non-query parts match

      if (one.toString() !== two.toString()) {
        return false;
      } // query parameters have the same length, even if they're permuted


      if (one_query.length !== two_query.length) {
        return false;
      }

      one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
      two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

      for (key in one_map) {
        if (hasOwn.call(one_map, key)) {
          if (!isArray(one_map[key])) {
            if (one_map[key] !== two_map[key]) {
              return false;
            }
          } else if (!arraysEqual(one_map[key], two_map[key])) {
            return false;
          }

          checked[key] = true;
        }
      }

      for (key in two_map) {
        if (hasOwn.call(two_map, key)) {
          if (!checked[key]) {
            // two contains a parameter not present in one
            return false;
          }
        }
      }

      return true;
    }; // state


    p.duplicateQueryParameters = function (v) {
      this._parts.duplicateQueryParameters = !!v;
      return this;
    };

    p.escapeQuerySpace = function (v) {
      this._parts.escapeQuerySpace = !!v;
      return this;
    };

    return URI;
  });
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collection_helpers.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/collection_helpers.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tapi18n.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/tapi18n.coffee                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/core.coffee                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Workflow = {};
this.ImageSign = {};
this.TracesHandler = {};
this.TracesTemplate = {};
this.InstanceformTemplate = {};
this.InstanceAttachmentTemplate = {};
this.InstanceSignText = {};
this.RelatedInstances = {};
this.RelatedRecords = {};
this.InstanceMacro = {
  context: {}
};
this.TracesManager = {};

InstanceSignText.isOpinionField_from_string = function (field_formula) {
  return (field_formula != null ? field_formula.indexOf("{traces.") : void 0) > -1 || (field_formula != null ? field_formula.indexOf("{signature.traces.") : void 0) > -1 || (field_formula != null ? field_formula.indexOf("{yijianlan:") : void 0) > -1 || (field_formula != null ? field_formula.indexOf("{\"yijianlan\":") : void 0) > -1 || (field_formula != null ? field_formula.indexOf("{'yijianlan':") : void 0) > -1;
};

InstanceSignText.includesOpinionField = function (form, form_version) {
  var _form_version, field_formulas, fields;

  field_formulas = new Array();
  _form_version = {};

  if (Meteor.isServer) {
    _form_version = uuflowManager.getFormVersion(db.forms.findOne({
      _id: form
    }), form_version);
  } else {
    _form_version = db.form_versions.findOne({
      _id: form_version,
      form: form
    });
  }

  fields = (_form_version != null ? _form_version.fields : void 0) || [];
  fields.forEach(function (f) {
    var ref;

    if (f.type === 'table') {
      return console.log('ignore opinion field in table');
    } else if (f.type === 'section') {
      return f != null ? (ref = f.fields) != null ? ref.forEach(function (f1) {
        return field_formulas.push(f1.formula);
      }) : void 0 : void 0;
    } else {
      return field_formulas.push(f.formula);
    }
  });
  return _.some(field_formulas, function (field_formula) {
    return InstanceformTemplate.helpers.isOpinionField_from_string(field_formula);
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"models":{"forms.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/forms.coffee                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flows.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/flows.coffee                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_roles.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/flow_roles.coffee                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_positions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/flow_positions.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instances.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/instances.coffee                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categories.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/categories.coffee                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"spaces.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/spaces.coffee                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"deleted_instances.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/deleted_instances.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"auth_tokens.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/auth_tokens.coffee                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
db.auth_tokens = new Meteor.Collection('auth_tokens');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"webhooks.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/webhooks.coffee                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"space_user_signs.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/space_user_signs.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"space_users.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/models/space_users.coffee                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"cfs":{"instances.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/cfs/instances.coffee                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"admin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/lib/admin.coffee                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"client":{"lib":{"instance_readonly_template.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/lib/instance_readonly_template.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _getLocale, _getRequiredFields, _getStartStepEditableFields, _getStartStepRequiredFields, _getTemplateData, _getViewHtml, getLinkText, marked;

marked = require("marked");
InstanceReadOnlyTemplate = {};
InstanceReadOnlyTemplate.instance_attachment = "<tr>\n	<td class=\"ins-attach-view\">\n		<a href=\"{{ins_attach_download_url _id absolute}}\" class=\"ins_attach_href\" target=\"_parent\" data-name=\"{{this.name}}\" data-type=\"{{this.original.type}}\" data-id=\"{{_id}}\">{{this.name}}</a>\n	</td>\n</tr>";
InstanceReadOnlyTemplate.afSelectUserRead = "<div class='selectUser form-control ins_applicant'>{{value}}</div>";
InstanceReadOnlyTemplate.afFormGroupRead = "<div class='form-group'>\n	{{#with getField this.name}}\n		{{#if equals type 'section'}}\n				<div class='section callout callout-default'>\n					<label class=\"control-label\">{{f_label this}}</label>\n					<p>{{{description}}}</p>\n				</div>\n		{{else}}\n			{{#if equals type 'table'}}\n				<div class=\"panel panel-default steedos-table\">\n					<div class=\"panel-body\" style=\"padding:0px;\">\n						<div class=\"panel-heading\" >\n							<label class='control-label'>{{getLabel code}}</label>\n							<span class=\"description\">{{{description}}}</span>\n						</div>\n						<div class=\"readonly-table\" style=\"padding:0px;overflow-x:auto;\">\n								<table type='table' class=\"table table-bordered table-condensed autoform-table\" style='margin-bottom:0px;' {{this.atts}} id=\"{{this.code}}Table\" name=\"{{this.code}}\" data-schema-key=\"{{this.name}}\">\n									<thead id=\"{{this.name}}Thead\" name=\"{{this.name}}Thead\">\n										{{{getTableThead this}}}\n									</thead>\n									<tbody id=\"{{this.name}}Tbody\" name=\"{{this.name}}Tbody\">\n										{{{getTableBody this}}}\n									</tbody>\n								</table>\n						</div>\n					</div>\n				</div>\n			{{else}}\n				{{#if showLabel}}\n					<label>{{getLabel code}}</label>\n				{{/if}}\n				<div class='{{getCfClass this}} form-control' readonly disabled>{{{getValue code}}}</div>\n			{{/if}}\n		{{/if}}\n	{{/with}}\n</div>";
InstanceReadOnlyTemplate.afFormGroup = "\n{{#with getField this.name}}\n		{{#if equals type 'section'}}\n			<div class=\"form-group\">\n				<div class='section callout callout-default'>\n					<label class=\"control-label\">{{f_label this}}</label>\n					<p>{{{description}}}</p>\n				</div>\n  				</div>\n		{{else}}\n			{{#if equals type 'table'}}\n				<div class=\"panel panel-default steedos-table\">\n					<div class=\"panel-body\" style=\"padding:0px;\">\n						<div class=\"panel-heading\" >\n							<label class='control-label'>{{getLabel code}}</label>\n							<span class=\"description\">{{{description}}}</span>\n						</div>\n						<div class=\"readonly-table\" style=\"padding:0px;overflow-x:auto;\">\n								<table type='table' class=\"table table-bordered table-condensed autoform-table\" style='margin-bottom:0px;' {{this.atts}} id=\"{{this.code}}Table\" name=\"{{this.code}}\" data-schema-key=\"{{this.name}}\">\n									<thead id=\"{{this.name}}Thead\" name=\"{{this.name}}Thead\">\n										{{{getTableThead this}}}\n									</thead>\n									<tbody id=\"{{this.name}}Tbody\" name=\"{{this.name}}Tbody\">\n										{{{getTableBody this}}}\n									</tbody>\n								</table>\n						</div>\n					</div>\n				</div>\n			{{else}}\n				{{#if equals type 'input'}}\n					<div class=\"form-group\" data-required=\"{{#if is_required}}true{{/if}}\">\n						<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n						{{#if is_textarea}}\n							<textarea title=\"{{getLabel code}}\" name=\"{{code}}\" {{getPermissions code}} data-schema-key=\"{{getLabel code}}\" class=\"form-control\"></textarea>\n						{{/if}}\n						{{#unless is_textarea}}\n							<input type=\"text\" title=\"{{getLabel code}}\" name=\"{{code}}\" {{getPermissions code}} data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n						{{/unless}}\n					</div>\n				{{else}}\n					{{#if equals type 'number'}}\n						<div class=\"form-group\">\n							<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n							<input type=\"number\" title=\"{{getLabel code}}\" name=\"{{code}}\" data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n						</div>\n					{{else}}\n						{{#if equals type 'date'}}\n							<div class=\"form-group\">\n								<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n								<input type=\"text\" title=\"{{getLabel code}}\" name=\"{{code}}\" data-type=\"date\" data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n							</div>\n						{{else}}\n							{{#if equals type 'dateTime'}}\n								<div class=\"form-group\">\n									<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n									<input type=\"text\" title=\"{{getLabel code}}\" name=\"{{code}}\" data-type='datetime' data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n								</div>\n							{{else}}\n								{{#if equals type 'password'}}\n									<div class=\"form-group\">\n										<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n										<input type=\"password\" title=\"{{getLabel code}}\" name=\"{{code}}\" data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n									</div>\n								{{else}}\n									{{#if equals type 'select'}}\n										<div class=\"form-group\">\n											<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n											<select name=\"{{code}}\" data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n												{{#each options this}}\n													<option value=\"{{value}}\">{{label}}</option>\n												{{/each}}\n											</select>\n										</div>\n									{{else}}\n										{{#if equals type 'radio'}}\n											<div class=\"form-group\">\n												<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n												<div class=\"af-radio-group\" data-schema-key=\"{{getLabel code}}\">\n													{{#each options this}}\n        												<label class=\"radio-inline fix-indent\"><input type=\"radio\" value=\"{{value}}\" name=\"{{../code}}\" class=\"radio-inline fix-indent\"> {{label}}</label>\n    													{{/each}}\n    												</div>\n											</div>\n										{{else}}\n											{{#if equals type 'multiSelect'}}\n												<div class=\"form-group\">\n													<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n													<div class=\"af-checkbox-group\" data-schema-key=\"{{getLabel code}}\">\n														{{#each options this}}\n														<label class=\"checkbox-inline fix-indent\"><input type=\"checkbox\" value=\"{{value}}\" name=\"{{../code}}\" class=\"checkbox-inline fix-indent\"> {{label}}</label>\n														{{/each}}\n													</div>\n												</div>\n											{{else}}\n												{{#if equals type 'url'}}\n													<div class=\"form-group\">\n														<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n														<input type=\"url\" title=\"{{getLabel code}}\" name=\"{{code}}\" data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n													</div>\n												{{else}}\n													{{#if equals type 'email'}}\n														<div class=\"form-group\">\n															<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n															<input type=\"email\" title=\"{{getLabel code}}\" name=\"{{code}}\" data-schema-key=\"{{getLabel code}}\" class=\"form-control\">\n														</div>\n													{{else}}\n														{{#if equals type 'checkbox'}}\n															<div class=\"form-group\">\n																<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n																<div class=\"checkbox\" data-schema-key=\"{{getLabel code}}\">\n																	<label style=\"width: 100%;\"><input type=\"checkbox\" value=\"true\" name=\"{{code}}\" class=\"checkbox-inline fix-indent\"></label>\n																</div>\n															</div>\n														{{else}}\n															<div class=\"form-group\">\n																<label for=\"7ZQnDsXBGohZMetA5\" class=\"control-label\">{{getLabel code}}</label>\n																<div class='{{getCfClass this}} form-control' readonly disabled>{{{getValue code}}}</div>\n															</div>\n														{{/if}}\n													{{/if}}\n												{{/if}}\n											{{/if}}\n										{{/if}}\n									{{/if}}\n								{{/if}}\n							{{/if}}\n						{{/if}}\n					{{/if}}\n				{{/if}}\n			{{/if}}\n		{{/if}}\n	{{/with}}";

InstanceReadOnlyTemplate.create = function (tempalteName, steedosData) {
  var template, templateCompiled, templateRenderFunction;
  template = InstanceReadOnlyTemplate[tempalteName];
  templateCompiled = SpacebarsCompiler.compile(template, {
    isBody: true
  });
  templateRenderFunction = eval(templateCompiled);
  Template[tempalteName] = new Blaze.Template(tempalteName, templateRenderFunction);
  Template[tempalteName].steedosData = steedosData;
  return Template[tempalteName].helpers(InstanceformTemplate.helpers);
};

InstanceReadOnlyTemplate.createInstanceSignText = function (steedosData) {
  var instanceSignTextCompiled, instanceSignTextHtml, instanceSignTextRenderFunction;
  instanceSignTextHtml = _getViewHtml('client/views/instance/instance_sign_text.html');
  instanceSignTextCompiled = SpacebarsCompiler.compile(instanceSignTextHtml, {
    isBody: true
  });
  instanceSignTextRenderFunction = eval(instanceSignTextCompiled);
  Template.instanceSignText = new Blaze.Template("instanceSignText", instanceSignTextRenderFunction);
  Template.instanceSignText.steedosData = steedosData;
  return Template.instanceSignText.helpers(InstanceSignText.helpers);
};

InstanceReadOnlyTemplate.createImageSign = function (steedosData) {
  var imageSignCompiled, imageSignHtml, imageSignRenderFunction;
  imageSignHtml = _getViewHtml('client/views/instance/image_sign.html');
  imageSignCompiled = SpacebarsCompiler.compile(imageSignHtml, {
    isBody: true
  });
  imageSignRenderFunction = eval(imageSignCompiled);
  Template.imageSign = new Blaze.Template("imageSign", imageSignRenderFunction);
  Template.imageSign.steedosData = steedosData;
  return Template.imageSign.helpers(ImageSign.helpers);
};

InstanceReadOnlyTemplate.createTracesHanlder = function (steedosData) {
  var tracesHanlderCompiled, tracesHanlderHtml, tracesHanlderRenderFunction;
  tracesHanlderHtml = _getViewHtml('client/views/instance/traces_handler.html');
  tracesHanlderCompiled = SpacebarsCompiler.compile(tracesHanlderHtml, {
    isBody: true
  });
  tracesHanlderRenderFunction = eval(tracesHanlderCompiled);
  Template.instance_traces_handler = new Blaze.Template("instance_traces_handler", tracesHanlderRenderFunction);
  Template.instance_traces_handler.steedosData = steedosData;
  return Template.instance_traces_handler.helpers(TracesHandler.helpers);
};

InstanceReadOnlyTemplate.init = function (steedosData) {
  InstanceReadOnlyTemplate.create("afSelectUserRead", steedosData);

  if (Meteor.isServer) {
    InstanceReadOnlyTemplate.create("afFormGroup", steedosData);
  }

  InstanceReadOnlyTemplate.create("afFormGroupRead", steedosData);

  if (Meteor.isServer) {
    InstanceReadOnlyTemplate.create("instance_attachment", {
      absolute: steedosData.absolute
    });
    InstanceReadOnlyTemplate.createImageSign(steedosData);
    InstanceReadOnlyTemplate.createTracesHanlder(steedosData);
    return InstanceReadOnlyTemplate.createInstanceSignText(steedosData);
  }
};

getLinkText = function (item, label, detail_url) {
  if (detail_url) {
    detail_url = detail_url.replace("{_id}", item._id);

    if (!/^http(s?):\/\//.test(detail_url)) {
      detail_url = Steedos.absoluteUrl(detail_url);
    }

    return '<a href="' + detail_url + '" target="_blank">' + label + '</a>';
  } else {
    return label;
  }
};

InstanceReadOnlyTemplate.getValue = function (value, field, locale, utcOffset) {
  var date, detail_url, e, fieldOptions, hours, month, seconds, selectedOption, selectedOptions, splitedValues, t, t0, t1, year;

  if (!value && value !== false) {
    return '';
  }

  if (["select", "multiSelect", "radio"].indexOf(field.type) > -1) {
    fieldOptions = field.options.split("\n").map(function (n) {
      var itemSplits;
      itemSplits = n.split(":");
      return {
        label: itemSplits[0],
        value: itemSplits[1] || n
      };
    });
  }

  switch (field.type) {
    case 'email':
      value = value ? '<a href=\'mailto:' + value + '\'>' + value + '</a>' : '';
      break;

    case 'url':
      if (value) {
        if (value.indexOf("http") === 0) {
          try {
            value = "<a href='" + encodeURI(value) + "' target='_blank'>" + value + "</a>";
          } catch (error) {
            e = error;
            value = "<a href='' target='_blank'>" + value + "</a>";
          }
        } else {
          value = "<a href='http://" + encodeURI(value) + "' target='_blank'>" + value + "</a>";
        }
      } else {
        value = '';
      }

      break;

    case 'group':
      if (field.is_multiselect) {
        value = value != null ? value.getProperty("fullname").toString() : void 0;
      } else {
        value = value != null ? value.fullname : void 0;
      }

      break;

    case 'user':
      if (field.is_multiselect) {
        value = value != null ? value.getProperty("name").toString() : void 0;
      } else {
        value = value != null ? value.name : void 0;
      }

      break;

    case 'password':
      value = '******';
      break;

    case 'checkbox':
      if (value && value !== 'false') {
        value = TAPi18n.__("form_field_checkbox_yes", {}, locale);
      } else {
        value = TAPi18n.__("form_field_checkbox_no", {}, locale);
      }

      break;

    case 'dateTime':
      if (value && value.length === 16) {
        t = value.split("T");
        t0 = t[0].split("-");
        t1 = t[1].split(":");
        year = t0[0];
        month = t0[1];
        date = t0[2];
        hours = t1[0];
        seconds = t1[1];
        value = new Date(year, month - 1, date, hours, seconds);
      } else {
        value = new Date(value);
      }

      value = InstanceReadOnlyTemplate.formatDate(value, utcOffset);
      break;

    case 'input':
      if (field.is_textarea) {
        value = Spacebars.SafeString(marked.parse(value));
      }

      break;

    case 'select':
      selectedOption = fieldOptions.find(function (item) {
        return item.value === value;
      });

      if (selectedOption) {
        value = selectedOption.label;
      }

      break;

    case 'radio':
      selectedOption = fieldOptions.find(function (item) {
        return item.value === value;
      });

      if (selectedOption) {
        value = selectedOption.label;
      }

      break;

    case 'multiSelect':
      splitedValues = value.split(",");
      selectedOptions = fieldOptions.filter(function (item) {
        return splitedValues.indexOf(item.value) > -1;
      });

      if (selectedOptions.length) {
        value = selectedOptions.map(function (item) {
          return item.label;
        }).join(",");
      }

      break;

    case 'number':
      if (value || value === 0) {
        value = Steedos.numberToString(value, field.digits);
      }

      break;

    case 'odata':
      detail_url = field.detail_url;

      if (field.is_multiselect) {
        value = _.map(value, function (item) {
          return getLinkText(item, item['@label'], detail_url);
        });
      } else {
        value = getLinkText(value, value['@label'], detail_url);
      }

      break;

    case 'html':
      value = value ? "<div class=\"steedos-html\">" + value + "</div>" : '';
  }

  return value;
};

InstanceReadOnlyTemplate.getLabel = function (fields, code) {
  var field;
  field = fields.findPropertyByPK("code", code);

  if (field) {
    if (field.name) {
      return field.name;
    } else {
      return field.code;
    }
  }
};

InstanceReadOnlyTemplate.getInstanceFormVersion = function (instance) {
  var form, form_fields, form_version;
  form = db.forms.findOne(instance.form);
  form_version = {};
  form_fields = [];

  if (form.current._id === instance.form_version) {
    form_version = form.current;
  } else {
    form_version = _.where(form.historys, {
      _id: instance.form_version
    })[0];
  }

  form_version.fields.forEach(function (field) {
    if (field.type === 'section') {
      form_fields.push(field);

      if (field.fields) {
        return field.fields.forEach(function (f) {
          return form_fields.push(f);
        });
      }
    } else if (field.type === 'table') {
      field['sfields'] = field['fields'];
      delete field['fields'];
      return form_fields.push(field);
    } else {
      return form_fields.push(field);
    }
  });
  form_version.fields = form_fields;
  return form_version;
};

InstanceReadOnlyTemplate.getFlowVersion = function (instance) {
  var flow, flow_version;
  flow = db.flows.findOne(instance.flow);
  flow_version = {};

  if (flow.current._id === instance.flow_version) {
    flow_version = flow.current;
  } else {
    flow_version = _.where(flow.historys, {
      _id: instance.flow_version
    })[0];
  }

  return flow_version;
};

_getViewHtml = function (path) {
  var viewHtml;
  viewHtml = Assets.getText(path);

  if (viewHtml) {
    viewHtml = viewHtml.replace(/<template[\w\s\"\=']+>/i, "").replace(/<\/template>/i, "");
  }

  return viewHtml;
};

_getLocale = function (user) {
  var locale, ref, ref1;

  if ((user != null ? (ref = user.locale) != null ? ref.toLocaleLowerCase() : void 0 : void 0) === 'zh-cn') {
    locale = "zh-CN";
  } else if ((user != null ? (ref1 = user.locale) != null ? ref1.toLocaleLowerCase() : void 0 : void 0) === 'en-us') {
    locale = "en";
  } else {
    locale = "zh-CN";
  }

  return locale;
};

_getRequiredFields = function (fields, rev) {
  if (!rev) {
    rev = [];
  }

  fields.forEach(function (field) {
    if (field.type === 'section') {
      return _getRequiredFields(field.fields, rev);
    } else if (field.type === 'table') {} else {
      if (field.is_required) {
        return rev.push(field.code);
      }
    }
  });
  return rev;
};

_getStartStepEditableFields = function (fields, steps) {
  var editableCode, startStep;
  startStep = steps.findPropertyByPK("step_type", "start");
  editableCode = [];

  _.keys(startStep.permissions).forEach(function (key) {
    if (startStep.permissions[key] === 'editable') {
      return editableCode.push(key);
    }
  });

  return editableCode;
};

_getStartStepRequiredFields = function (fields, steps) {
  var editableCode, requiredFields;
  requiredFields = _getRequiredFields(fields);
  editableCode = _getStartStepEditableFields(fields, steps);
  return _.intersection(requiredFields, editableCode);
};

_getTemplateData = function (user, space, instance, options) {
  var flow, form, form_version, locale, steedosData;

  if (Meteor.isServer) {
    form_version = InstanceReadOnlyTemplate.getInstanceFormVersion(instance);
  } else {
    form_version = WorkflowManager.getInstanceFormVersion(instance);
  }

  locale = _getLocale(user);
  steedosData = {};

  if (Meteor.isClient) {
    steedosData = _.clone(WorkflowManager_format.getAutoformSchemaValues());
    steedosData.insname = instance.name;
    steedosData.ins_state = instance.state;
    steedosData.ins_final_decision = instance.ins_final_decision;
    steedosData.ins_code = instance.code;
    steedosData.ins_is_archived = instance.is_archived;
    steedosData.ins_is_deleted = instance.ins_is_deleted;
    steedosData.applicant_name = instance.applicant_name;
    steedosData.applicantContext = instance.applicant_name;
  }

  steedosData.instance = instance;
  steedosData.form_version = form_version;
  steedosData.locale = locale;
  steedosData.utcOffset = user.utcOffset;
  steedosData.space = instance.space;
  steedosData.sessionUserId = user._id;

  if (Meteor.isServer) {
    if (options != null ? options.editable : void 0) {
      form = db.forms.findOne({
        _id: instance.form
      });
      flow = db.flows.findOne({
        _id: instance.flow
      });
      steedosData.startStepEditableFields = _getStartStepEditableFields(form.current.fields, flow.current.steps);
    }
  }

  return steedosData;
};

InstanceReadOnlyTemplate.formatDate = function (date, utcOffset) {
  var passing;

  if (Meteor.isServer) {
    passing = false;
  } else {
    passing = true;
  }

  if (!utcOffset && utcOffset !== 0) {
    utcOffset = 8;
  }

  return moment(date).utcOffset(utcOffset, passing).format("YYYY-MM-DD HH:mm");
};

InstanceReadOnlyTemplate.getInstanceView = function (user, space, instance, options) {
  var body, instanceCompiled, instanceRenderFunction, instanceTemplate, steedosData;
  steedosData = _getTemplateData(user, space, instance, options);
  steedosData.absolute = false;

  if (options != null ? options.absolute : void 0) {
    steedosData.absolute = true;
  }

  instanceTemplate = TemplateManager.getTemplate(instance, options != null ? options.templateName : void 0);
  instanceTemplate = instanceTemplate.replace(/afSelectUser/g, "afSelectUserRead");

  if (!(options != null ? options.editable : void 0)) {
    instanceTemplate = instanceTemplate.replace(/afFormGroup/g, "afFormGroupRead");
  }

  instanceCompiled = SpacebarsCompiler.compile(instanceTemplate, {
    isBody: true
  });
  instanceRenderFunction = eval(instanceCompiled);
  Template.instance_readonly_view = new Blaze.Template("instance_readonly_view", instanceRenderFunction);
  Template.instance_readonly_view.steedosData = steedosData;
  Template.instance_readonly_view.helpers(InstanceformTemplate.helpers);
  InstanceReadOnlyTemplate.init(steedosData);
  body = Blaze.toHTMLWithData(Template.instance_readonly_view, steedosData);
  return "<div id='instanceform' >\n	" + body + "\n</div>";
};

InstanceReadOnlyTemplate.getTracesView = function (user, space, instance, options) {
  var body, form, steedosData, traceCompiled, traceRenderFunction, tracesHtml;
  steedosData = _getTemplateData(user, space, instance);
  form = db.forms.findOne(instance.form);

  if (form.instance_style === "table" || (options != null ? options.templateName : void 0) === "table") {
    tracesHtml = _getViewHtml('client/views/instance/traces_table.html');
  } else {
    tracesHtml = _getViewHtml('client/views/instance/traces.html');
  }

  traceCompiled = SpacebarsCompiler.compile(tracesHtml, {
    isBody: true
  });
  traceRenderFunction = eval(traceCompiled);
  Template.trace_readonly_view = new Blaze.Template("trace_readonly_view", traceRenderFunction);
  Template.trace_readonly_view.steedosData = steedosData;
  Template.trace_readonly_view.helpers(TracesTemplate.helpers);
  body = Blaze.toHTMLWithData(Template.trace_readonly_view, instance.traces);
  return body;
};

InstanceReadOnlyTemplate.getAttachmentView = function (user, space, instance) {
  var attachmentCompiled, attachmentHtml, attachmentRenderFunction, body, steedosData;
  steedosData = _getTemplateData(user, space, instance);
  attachmentHtml = _getViewHtml('client/views/instance/instance_attachments.html');
  attachmentCompiled = SpacebarsCompiler.compile(attachmentHtml, {
    isBody: true
  });
  attachmentRenderFunction = eval(attachmentCompiled);
  Template.attachments_readonly_view = new Blaze.Template("attachments_readonly_view", attachmentRenderFunction);
  Template.attachments_readonly_view.steedosData = steedosData;
  Template.attachments_readonly_view.helpers(InstanceAttachmentTemplate.helpers);
  body = Blaze.toHTMLWithData(Template.attachments_readonly_view);
  return body;
};

InstanceReadOnlyTemplate.getRelatedInstancesView = function (user, space, instance, options) {
  var body, relatedInstancesCompiled, relatedInstancesHtml, relatedInstancesRenderFunction, steedosData;
  steedosData = _getTemplateData(user, space, instance);
  steedosData.absolute = false;

  if (options != null ? options.absolute : void 0) {
    steedosData.absolute = true;
  }

  relatedInstancesHtml = _getViewHtml('client/views/instance/related_instances.html');
  relatedInstancesCompiled = SpacebarsCompiler.compile(relatedInstancesHtml, {
    isBody: true
  });
  relatedInstancesRenderFunction = eval(relatedInstancesCompiled);
  Template.related_instances_view = new Blaze.Template("related_instances_view", relatedInstancesRenderFunction);
  Template.related_instances_view.steedosData = steedosData;
  Template.related_instances_view.helpers(RelatedInstances.helpers);
  body = Blaze.toHTMLWithData(Template.related_instances_view, steedosData);
  return body;
};

InstanceReadOnlyTemplate.getRelatedRecordsView = function (user, space, instance, options) {
  var body, relatedRecordsCompiled, relatedRecordsHtml, relatedRecordsRenderFunction, steedosData;
  steedosData = _getTemplateData(user, space, instance);
  steedosData.absolute = false;

  if (options != null ? options.absolute : void 0) {
    steedosData.absolute = true;
  }

  relatedRecordsHtml = _getViewHtml('client/views/instance/related_records.html');
  relatedRecordsCompiled = SpacebarsCompiler.compile(relatedRecordsHtml, {
    isBody: true
  });
  relatedRecordsRenderFunction = eval(relatedRecordsCompiled);
  Template.related_records_view = new Blaze.Template("related_records_view", relatedRecordsRenderFunction);
  Template.related_records_view.steedosData = steedosData;
  Template.related_records_view.helpers(RelatedRecords.helpers);
  body = Blaze.toHTMLWithData(Template.related_records_view, steedosData);
  return body;
};

InstanceReadOnlyTemplate.getOnLoadScript = function (instance) {
  var form_script, form_version;
  form_version = WorkflowManager.getFormVersion(instance.form, instance.form_version);
  form_script = form_version.form_script;

  if (form_script && form_script.replace(/\n/g, "").replace(/\s/g, "").length > 0) {
    form_script = "CoreForm = {};CoreForm.instanceform = {};" + form_script;
    return form_script += ";if(CoreForm.form_OnLoad){window.onload = CoreForm.form_OnLoad();}";
  } else {
    return form_script = "";
  }
};

InstanceReadOnlyTemplate.getInstanceHtml = function (user, space, instance, options) {
  var allCssLink, attachment, body, creatorService, cssHref, form, formDescription, formDescriptionHtml, html, ins_record_ids, instanceBoxStyle, instance_style, locale, onLoadScript, openFileScript, ref, ref1, related_instances, related_records, showTracesBtn, showTracesScript, trace, traceCheck, width;
  body = InstanceReadOnlyTemplate.getInstanceView(user, space, instance, options);
  onLoadScript = InstanceReadOnlyTemplate.getOnLoadScript(instance);
  creatorService = (ref = Meteor.settings["public"].webservices) != null ? (ref1 = ref.creator) != null ? ref1.url : void 0 : void 0;
  ins_record_ids = instance.record_ids;
  locale = _getLocale(user);
  openFileScript = "if(window.isNode && isNode()){\n	attachs = document.getElementsByClassName(\"ins_attach_href\");\n	for(var i = 0; i < attachs.length; i++){\n		attach = attachs[i];\n		attach.addEventListener(\"click\", function(e){\n			if(isImage(this.dataset.type) || isHtml(this.dataset.type)){\n				e.preventDefault();\n				openWindow(\"/api/files/instances/\" + this.dataset.id);\n			}else if(nw_core.canOpenFile(this.dataset.name)){\n				e.preventDefault();\n				nw_core.openFile(this.href, this.dataset.name)\n			}\n		});\n	}\n}\n\nvar flow = \"" + instance.flow + "\";\nvar space = \"" + instance.space + "\";\n\nfunction getCookie(name){\n	let pattern = RegExp(name + \"=.[^;]*\")\n	let matched = document.cookie.match(pattern)\n	if(matched){\n		let cookie = matched[0].split('=')\n		return cookie[1]\n	}\n	return ''\n}\n\nvar records = document.getElementsByClassName(\"ins-related-records\");\nfor(var i = 0; i < records.length; i++){\n		var record = records[i];\n		record.addEventListener(\"click\", function(e){\n			var creatorService = \"" + creatorService + "\"\n			var ins_record_ids = " + JSON.stringify(ins_record_ids) + "\n			if(creatorService && ins_record_ids && ins_record_ids.length > 0){\n				var objcetName = ins_record_ids[0].o\n				var id = ins_record_ids[0].ids[0]\n				var uobj = {};\n				uobj[\"X-User-Id\"] = getCookie(\"X-User-Id\");\n				uobj[\"X-Auth-Token\"] = getCookie(\"X-Auth-Token\");\n				redirectUrl = creatorService + \"app/-/\" + objcetName + \"/view/\" + id + \"?\" + $.param(uobj);\n				openWindow(redirectUrl);\n			}\n		});\n	}\n";

  if (!Steedos.isMobile()) {
    form = db.forms.findOne(instance.form);

    if ((form != null ? form.instance_style : void 0) === 'table') {
      instance_style = "instance-table";
    }
  }

  if ((options != null ? options.templateName : void 0) === 'table') {
    instance_style = "instance-table";
  }

  if (options != null ? options.instance_style : void 0) {
    instance_style = options.instance_style;
  }

  if (!options || options.showTrace === true) {
    trace = InstanceReadOnlyTemplate.getTracesView(user, space, instance);
  } else {
    trace = "";
  }

  instanceBoxStyle = "";

  if (instance && instance.final_decision) {
    if (instance.final_decision === "approved") {
      instanceBoxStyle = "box-success";
    } else if (instance.final_decision === "rejected") {
      instanceBoxStyle = "box-danger";
    }
  }

  if (!options || options.showAttachments === true) {
    attachment = InstanceReadOnlyTemplate.getAttachmentView(user, space, instance);
    related_instances = InstanceReadOnlyTemplate.getRelatedInstancesView(user, space, instance, options);
    related_records = InstanceReadOnlyTemplate.getRelatedRecordsView(user, space, instance, options);
  } else {
    attachment = "";
    related_instances = "";
    related_records = "";
  }

  width = "960px";

  if (options != null ? options.width : void 0) {
    width = "";
  }

  cssHref = Meteor.absoluteUrl("steedos-css");
  allCssLink = "<link rel=\"stylesheet\" type=\"text/css\" class=\"__meteor-css__\" href=\"" + cssHref + "\">";
  traceCheck = "";

  if (!_.isEmpty(trace)) {
    traceCheck = "checked";
  }

  if ((options != null ? options.tagger : void 0) === 'email' || (options != null ? options.editable : void 0)) {
    showTracesBtn = "";
  } else {
    showTracesBtn = "<div class=\"navigation-bar btn-group no-print\" style=\"min-width: 600px; z-index: 999\">\n	<div class=\"print-tool\">\n		<label class=\"cbx-label\"><input type=\"checkbox\" class=\"cbx-print cbx-print-attachments\" id=\"cbx-print-attachments\" checked=\"checked\"><span>" + TAPi18n.__('instance_attachment', {}, locale) + "</span></label>\n		<label class=\"cbx-label\"><input type=\"checkbox\" class=\"cbx-print cbx-print-traces\" id=\"cbx-print-traces\" checked=\"" + traceCheck + "\"><span>" + TAPi18n.__('instance_approval_history', {}, locale) + "</span></label>\n	</div>\n</div>";
  }

  showTracesScript = "$( document ).ready(function(){\n	var b = document.getElementById('cbx-print-traces');\n	var t = document.getElementsByClassName('instance-traces')[0];\n	if (b && b.checked && t){\n		t.style = 'display: block;'\n	} else if(t){\n		t.style = 'display: none;'\n	}\n	if(b){\n		b.addEventListener('change', function(e){\n			if (e.target.checked){\n				t.style = 'display: block;'\n			} else {\n				t.style = 'display: none;'\n			}\n		});\n	}\n\n\n	var attachmentsCheckbox = document.getElementById('cbx-print-attachments');\n	var attachmentsView = document.getElementsByClassName('attachments-section')[0];\n	if (attachmentsCheckbox && attachmentsCheckbox.checked && attachmentsView){\n		attachmentsView.style = 'display: block;'\n	} else if(attachmentsView){\n		attachmentsView.style = 'display: none;'\n	}\n	if(attachmentsCheckbox){\n		attachmentsCheckbox.addEventListener('change', function(e){\n			if (e.target.checked){\n				attachmentsView.style = 'display: block;'\n			} else {\n				attachmentsView.style = 'display: none;'\n			}\n		});\n	}\n});\n";

  if (options != null ? options.styles : void 0) {
    allCssLink = "";
  }

  form = db.forms.findOne({
    _id: instance.form
  });
  formDescriptionHtml = "";

  if (form) {
    formDescription = form.description;

    if (formDescription) {
      formDescription = formDescription.replace(/\n/g, "<br/>");
      formDescriptionHtml = "<div class=\"box-header  with-border instance-header\">\n	<div>\n		" + formDescription + "\n	</div>\n</div>";
    }
  }

  html = "<!DOCTYPE html>\n<html>\n	<head>\n		<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>\n		" + allCssLink + "\n		<script src=\"https://www.steedos.com/website/libs/jquery.min.js\" type=\"text/javascript\"></script>\n		<script src=\"/js/nw_core.js\" type=\"text/javascript\"></script>\n		" + (options.plugins || "") + "\n\n		<style>\n			.steedos{\n				width: " + width + ";\n				margin-left: auto;\n				margin-right: auto;\n			}\n\n			.instance-view .instance-name{\n				display: inline !important\n			}\n			.box-tools{\n				display: none;\n			}\n			.box.collapsed-box .box-body,.box.collapsed-box .box-footer {\n			  display: block;\n			}\n\n			body{\n				background: azure !important;\n			}\n\n			.instance-view .instance-traces{\n				padding-left: 15px;\n				padding-right: 15px;\n			}\n\n			" + ((options != null ? options.styles : void 0) || "") + "\n		</style>\n	</head>\n	<body>\n		<div class=\"steedos workflow instance-print\">\n			<div class=\"skin-green skin-admin-lte\">\n				<div class=\"wrapper\">\n					<div class=\"content-wrapper\">\n						" + showTracesBtn + "\n						<div class=\"instance-print\">\n							<div class=\"instance " + instance_style + "\">\n								<form name=\"instanceForm\">\n									<div class=\"instance-form box " + instanceBoxStyle + "\">\n										" + formDescriptionHtml + "\n										<div class=\"box-body\">\n											<div class=\"col-md-12\">\n												<div class='attachments-section'>\n													" + attachment + "\n													" + related_instances + "\n													" + related_records + "\n												</div>\n												" + body + "\n											</div>\n										</div>\n									</div>\n								</form>\n								" + trace + "\n							</div>\n\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</body>\n	<script>" + openFileScript + ";" + onLoadScript + ";" + showTracesScript + "</script>\n</html>";
  return html;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/lib/template_manager.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var formId;
TemplateManager = {};
formId = 'instanceform';

TemplateManager.instance_title = function () {
  var pageTitle, pageTitleTrClass, val;
  pageTitle = "{{instance.name}}";
  pageTitleTrClass = "instance-name";

  if (typeof CoreForm !== "undefined" && CoreForm !== null ? CoreForm.pageTitleFieldName : void 0) {
    pageTitle = "{{> afFormGroup name=\"" + CoreForm.pageTitleFieldName + "\" label=false}}";
    pageTitleTrClass = "";
  }

  if (typeof CoreForm !== "undefined" && CoreForm !== null ? CoreForm.pageTitle : void 0) {
    pageTitle = "" + CoreForm.pageTitle;
    pageTitleTrClass = "";
  }

  val = {
    pageTitle: pageTitle,
    pageTitleTrClass: pageTitleTrClass
  };
  return val;
};

TemplateManager.handleTableTemplate = function (instance, _export) {
  var table_fields, template;
  template = "<div class='instance-template'>\n	<table class=\"table-page-title form-table no-border text-align-center\" style=\"width: 100%;display: inline-table;\">\n		<tr class=\"" + this.instance_title().pageTitleTrClass + "\">\n			<td class=\"instance-table-name-td page-title\">\n				" + this.instance_title().pageTitle + "\n			</td>\n		</tr>\n\n	</table>\n	<table class=\"table-page-body form-table\">\n			<tr style=\"height:0px\">\n				<th style='width: 16%'></th>\n				<th></th>\n				<th style='width: 16%'></th>\n				<th></th>\n			</tr>";
  table_fields = InstanceformTemplate.helpers.table_fields(instance);
  table_fields.forEach(function (table_field) {
    var field_permission, pureCode, required, title_permission;
    required = "";

    if (!(typeof CoreForm !== "undefined" && CoreForm !== null ? CoreForm.pageTitleFieldName : void 0) || (typeof CoreForm !== "undefined" && CoreForm !== null ? CoreForm.pageTitleFieldName : void 0) !== table_field.code) {
      if (table_field.is_required) {
        required = "is-required";
      }

      if (_export) {
        required = "";
      }

      pureCode = Steedos.removeSpecialCharacter(table_field.code);

      if (InstanceformTemplate.helpers.isOpinionField(table_field)) {
        template += table_field.tr_start;
        template += "<td class=\"td-title " + required + "\">\n	{{afFieldLabelText name=\"" + table_field.code + "\"}}\n</td>\n<td class=\"td-field opinion-field opinion-field-" + pureCode + " automatic\" colspan = \"" + table_field.td_colspan + "\">\n	{{> instanceSignText name=\"" + table_field.code + "\"}}\n</td>";
        return template += table_field.tr_end;
      } else {
        if (InstanceformTemplate.helpers.includes(table_field.type, 'section,table')) {
          template += table_field.tr_start;
          template += "<td class=\"td-childfield td-childfield-" + pureCode + "\" colspan = \"" + table_field.td_colspan + "\">\n   {{> afFormGroup name=\"" + table_field.code + "\" label=false}}\n</td>";
          return template += table_field.tr_end;
        } else {
          template += table_field.tr_start;

          if (_export) {
            title_permission = "";
            field_permission = "";
          } else {
            title_permission = "title-" + table_field.permission;
            field_permission = "field-" + table_field.permission;
          }

          template += "<td class=\"td-title td-title-" + pureCode + " " + title_permission + " " + required + "\">\n	{{afFieldLabelText name=\"" + table_field.code + "\"}}\n</td>\n<td class=\"td-field td-field-" + pureCode + " " + field_permission + "\" colspan = \"" + table_field.td_colspan + "\">\n	{{> afFormGroup name=\"" + table_field.code + "\" label=false}}\n</td>";
          return template += table_field.tr_end;
        }
      }
    }
  });
  template += "	</table>\n\n	<table class=\"table-page-footer form-table no-border\">\n		<tr class=\"applicant-wrapper\">\n			<td class=\"nowrap\">\n				<div class='inline-left'>\n					<label class=\"control-label\">{{_t \"instance_initiator\"}}：</label>\n				</div>\n				<div class='instance-table-wrapper-td inline-left'>\n					{{>Template.dynamic  template=\"afSelectUser\" data=applicantContext}}\n				</div>\n			</td>\n			<td class=\"nowrap\">\n				<div class='pull-left'>\n					<div class='inline-left'>\n						<label>{{_t \"instance_submit_date\"}}：</label>\n					</div>\n					<div class='inline-right'>\n						<div class=\"form-group\">\n							{{formatDate instance.submit_date '{\"format\":\"YYYY-MM-DD\"}'}}\n						</div>\n					</div>\n				</div>\n			</td>\n		</tr>\n	</table>\n</div>";
  return template;
};

TemplateManager._template = {
  "default": function (instance) {
    var template;
    template = "<div class=\"with-border col-md-12\">\n	<div class=\"instance-name\">\n		<h3 class=\"box-title\">" + TemplateManager.instance_title().pageTitle + "</h3>\n		<span class=\"help-block\"></span>\n	</div>\n	<span class=\"help-block\"></span>\n</div>\n{{#each steedos_form.fields}}\n	{{#if isOpinionField this}}\n		<div class=\"{{#if this.is_wide}}col-md-12{{else}}col-md-6{{/if}} field-{{this.code}}\">\n			<div class=\"form-group automatic opinion-field-{{this.code}}\">\n				<label class=\"control-label\">{{afFieldLabelText name=this.code}}</label>\n\n				{{> instanceSignText name=this.code}}\n			</div>\n		</div>\n	{{else}}\n		{{#if includes this.type 'section,table'}}\n			<div class=\"col-md-12 field-{{this.code}}\">\n				{{> afFormGroup name=this.code label=false}}\n			</div>\n		{{else}}\n			<div class=\"{{#if this.is_wide}}col-md-12{{else}}col-md-6{{/if}} field-{{this.code}}\">\n			{{> afFormGroup name=this.code}}\n			</div>\n		{{/if}}\n	{{/if}}\n{{/each}}\n<div class=\"col-md-12\">\n	<div class=\"applicant-wrapper form-group form-horizontal\">\n	<div class=\"input-group\">\n		<div class=\"input-group-addon\">\n		  {{_t \"instance_initiator\"}}&nbsp;:\n		</div>\n		{{>Template.dynamic  template=\"afSelectUser\" data=applicantContext}}\n	  </div>\n	</div>\n</div>";
    return template;
  },
  table: function (instance) {
    return TemplateManager.handleTableTemplate(instance);
  }
};
TemplateManager._templateHelps = {
  applicantContext: function () {
    var data, steedos_instance;
    steedos_instance = WorkflowManager.getInstance();
    data = {
      name: 'ins_applicant',
      atts: {
        name: 'ins_applicant',
        id: 'ins_applicant',
        "class": 'selectUser form-control',
        style: 'padding:6px 12px;width:140px;display:inline'
      }
    };
    data.atts.disabled = true;
    return data;
  }
};
({
  instanceId: function () {
    return 'instanceform';
  },
  form_types: function () {
    if (ApproveManager.isReadOnly()) {
      return 'disabled';
    } else {
      return 'method';
    }
  },
  steedos_form: function () {
    var form_version;
    form_version = WorkflowManager.getInstanceFormVersion();

    if (form_version) {
      return form_version;
    }
  },
  innersubformContext: function (obj) {
    var doc_values;
    doc_values = WorkflowManager_format.getAutoformSchemaValues();
    obj["tableValues"] = doc_values ? doc_values[obj.code] : [];
    obj["formId"] = formId;
    return obj;
  },
  instance: function () {
    var steedos_instance;
    Session.get("change_date");

    if (Session.get("instanceId")) {
      steedos_instance = WorkflowManager.getInstance();
      return steedos_instance;
    }
  },
  equals: function (a, b) {
    return a === b;
  },
  includes: function (a, b) {
    return b.split(',').includes(a);
  },
  fields: function () {
    var form_version;
    form_version = WorkflowManager.getInstanceFormVersion();

    if (form_version) {
      return new SimpleSchema(WorkflowManager_format.getAutoformSchema(form_version));
    }
  },
  doc_values: function () {
    return WorkflowManager_format.getAutoformSchemaValues();
  },
  instance_box_style: function () {
    var box, ins, judge;
    box = Session.get("box");

    if (box === "inbox" || box === "draft") {
      judge = Session.get("judge");

      if (judge) {
        if (judge === "approved") {
          return "box-success";
        } else if (judge === "rejected") {
          return "box-danger";
        }
      }
    }

    ins = WorkflowManager.getInstance();

    if (ins && ins.final_decision) {
      if (ins.final_decision === "approved") {
        return "box-success";
      } else if (ins.final_decision === "rejected") {
        return "box-danger";
      }
    }
  }
});

TemplateManager.getTemplate = function (instance, templateName) {
  var flow, form;
  flow = db.flows.findOne(instance.flow);
  form = db.forms.findOne(instance.form);

  if (templateName) {
    if (templateName === 'table') {
      return TemplateManager._template.table(instance);
    }

    return TemplateManager._template["default"](instance);
  }

  if (typeof Session !== "undefined" && Session !== null ? Session.get("instancePrint") : void 0) {
    if (flow != null ? flow.print_template : void 0) {
      return "<div class='instance-template'>" + flow.print_template + "</div>";
    } else {
      if (flow != null ? flow.instance_template : void 0) {
        return "<div class='instance-template'>" + flow.instance_template + "</div>";
      } else {
        return TemplateManager._template.table(instance);
      }
    }
  } else {
    if (Steedos.isMobile()) {
      return TemplateManager._template["default"](instance);
    }

    if (flow != null ? flow.instance_template : void 0) {
      return "<div class='instance-template'>" + flow.instance_template + "</div>";
    }

    if (form != null ? form.instance_style : void 0) {
      if (form.instance_style === 'table') {
        return TemplateManager._template.table(instance);
      }

      return TemplateManager._template["default"](instance);
    } else {
      return TemplateManager._template["default"](instance);
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"coreform":{"inputTypes":{"coreform-table":{"steedos-table.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/coreform/inputTypes/coreform-table/steedos-table.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
SteedosTable = {};
SteedosTable.formId = "instanceform";

SteedosTable.checkItem = function (field, item_index) {
  var fieldObj = SteedosTable.getField(field);
  var fieldVal = SteedosTable.getItemModalValue(field, item_index);
  var sf_name = '';
  var rev = true;
  fieldObj.sfields.forEach(function (sf) {
    if (sf.permission == 'editable') {
      sf_name = fieldObj.code + "." + sf.code;

      if (!InstanceManager.checkFormFieldValue($("[name='" + sf_name + "']")[0], sf_name, fieldVal[sf.code])) {
        rev = false;
      }
    }
  });
  return rev;
};

SteedosTable.setTableItemValue = function (field, item_index, item_value) {
  var tableValue = SteedosTable.getTableValue(field);
  tableValue[item_index] = item_value;
};

SteedosTable.getTableItemValue = function (field, item_index) {
  return SteedosTable.getTableValue(field)[item_index];
};

SteedosTable.removeTableItem = function (field, item_index) {
  var item_value = SteedosTable.getTableItemValue(field, item_index);
  item_value.removed = true;
};

SteedosTable.setTableValue = function (field, value) {
  $("table[name='" + field + "']").val({
    val: value
  });
};

SteedosTable.getTableValue = function (field) {
  return $("table[name='" + field + "']").val().val;
};

SteedosTable.getValidValue = function (field) {
  var value = SteedosTable.getTableValue(field);

  if (!value) {
    return;
  }

  var validValue = [];
  value.forEach(function (v) {
    if (!v.removed) {
      validValue.push(v);
    }
  });
  return validValue;
};

SteedosTable.handleData = function (field, values) {
  if (!values || !(values instanceof Array)) {
    return values;
  }

  var fieldObj = SteedosTable.getField(field);
  values.forEach(function (v) {
    fieldObj.sfields.forEach(function (f) {
      if (f.type == 'user' || f.type == 'group') {
        var value = v[f.code];

        if (f.is_multiselect) {
          if (value && value.length > 0 && typeof value[0] == 'object') {
            v[f.code] = v[f.code].getProperty("id");
          }
        } else {
          if (value && typeof value == 'object') {
            v[f.code] = v[f.code].id;
          }
        }
      } else if (f.type == 'dateTime') {
        var value = v[f.code];

        if (value) {
          if (value.length == 16) {
            var t = value.split("T");
            var t0 = t[0].split("-");
            var t1 = t[1].split(":");
            year = t0[0];
            month = t0[1];
            date = t0[2];
            hours = t1[0];
            seconds = t1[1];
            value = new Date(year, month - 1, date, hours, seconds);
            v[f.code] = value;
          }
        }
      }
    });
  });
  return values;
};

SteedosTable.getField = function (field) {
  var instanceFields = WorkflowManager.getInstanceFields();
  if (!instanceFields) return;
  var fieldObj = instanceFields.findPropertyByPK("code", field);
  return fieldObj;
};

SteedosTable.getModalData = function (field, index) {
  var data = {};
  var fieldObj = SteedosTable.getField(field);

  if (!fieldObj) {
    return;
  }

  data.field = fieldObj;
  data.field.formula = Form_formula.getFormulaFieldVariable("Form_formula.field_values", fieldObj.sfields);
  data.value = {};
  data.value[field] = SteedosTable.getTableItemValue(field, index);
  data.index = index;
  return data;
};

SteedosTable.getItemModalValue = function (field, item_index) {
  if (!AutoForm.getFormValues("steedos_table_modal_" + field + "_" + item_index)) {
    return {};
  }

  var item_value = AutoForm.getFormValues("steedos_table_modal_" + field + "_" + item_index).insertDoc[field];
  return item_value;
};

SteedosTable.addItem = function (field, index, _item_value) {
  var keys = SteedosTable.getKeys(field);

  var item_value = _item_value || SteedosTable.getItemModalValue(field, index);

  $("tbody[name='" + field + "Tbody']").append(SteedosTable.getTr(keys, item_value, index, field, true));
};

SteedosTable.updateItem = function (field, index, _item_value) {
  var item = $("tr[name='" + field + "_item_" + index + "']");

  var item_value = _item_value || SteedosTable.getItemModalValue(field, index);

  if (item && item.length > 0) {
    var keys = SteedosTable.getKeys(field);
    var tds = SteedosTable.getRemoveTd(field, index);
    var sfields = SteedosTable.getField(field).sfields;
    keys.forEach(function (key) {
      var sfield = sfields.findPropertyByPK("code", key);
      var value = item_value[key];
      tds = tds + SteedosTable.getTd(sfield, index, value);
    });
    item.empty();
    item.append(tds);
  } else {
    SteedosTable.addItem(field, index);
  }

  if (SteedosTable.getTableValue(field)) {
    SteedosTable.setTableItemValue(field, index, item_value); //SteedosTable.valueHash[field][index] = item_value;
  } else {
    //SteedosTable.valueHash[field] = [item_value];
    SteedosTable.setTableValue(field, [item_value]);
  } //执行主表公式计算


  InstanceManager.runFormula(field);
};

SteedosTable.removeItem = function (field, index) {
  $("tr[name='" + field + "_item_" + index + "']").hide();
  SteedosTable.removeTableItem(field, index);
  InstanceManager.runFormula(field);
};

SteedosTable.showModal = function (field, index, method) {
  var modalData = SteedosTable.getModalData(field, index);
  modalData.method = method;
  Modal.show("steedosTableModal", modalData);
};

SteedosTable.getKeys = function (field) {
  if (!AutoForm.getCurrentDataForForm(SteedosTable.formId)) {
    return [];
  }

  var ss = AutoForm.getFormSchema(SteedosTable.formId);
  var keys = [];

  if (ss.schema(field + ".$").type === Object) {
    keys = ss.objectKeys(SimpleSchema._makeGeneric(field) + '.$');
  }

  return keys;
};

SteedosTable.getThead = function (field, editable) {
  var fieldObj = field;
  if (!_.isObject(field)) fieldObj = SteedosTable.getField(field);

  if (!fieldObj) {
    return '';
  }

  var thead = '',
      trs = '',
      label = '',
      width = 100;

  if (editable) {
    // trs = "<th class='removed'></th>"
    trs = "";
  }

  var sfields = fieldObj.sfields;

  if (!sfields) {
    return thead;
  }

  var sf_length = sfields.length;

  if (sf_length > 0) {
    var wide_fields = sfields.filterProperty("is_wide", true);
    width = 100 / (sf_length + wide_fields.length);
  }

  sfields.forEach(function (sf, index) {
    label = sf.name != null && sf.name.length > 0 ? sf.name : sf.code;
    trs = trs + "<td "; // nowrap='nowrap'

    trs = trs + " class='title " + sf.type + "'";

    if (index != sf_length - 1) {
      if (sf.is_wide) {
        trs = trs + "style='width:" + width * 2 + "%'";
      } else {
        trs = trs + "style='width:" + width + "%'";
      }
    }

    trs = trs + ">" + label + "</td>";
  });
  thead = '<tr>' + trs + '</tr>';
  return thead;
};

SteedosTable.getTbody = function (keys, field, values, editable, sfieldsEditable) {
  var tbody = "";

  if (values instanceof Array) {
    values.forEach(function (value, index) {
      tbody = tbody + SteedosTable.getTr(keys, value, index, field, editable, sfieldsEditable);
    });
  }

  return tbody;
};

SteedosTable.getTr = function (keys, item_value, index, field, editable, sfieldsEditable) {
  var fieldObj = field;
  if (!_.isObject(field)) fieldObj = SteedosTable.getField(field);
  var tr = "<tr id='" + fieldObj.code + "_item_" + index + "' name='" + fieldObj.code + "_item_" + index + "' data-index='" + index + "'";

  if (editable || sfieldsEditable) {
    tr = tr + "' class='item edit'";
  } else {
    if (Steedos.isMobile()) {
      tr = tr + " class='item item-readonly'";
    } else {
      tr = tr + " class='item '";
    }
  }

  if (item_value.removed) {
    tr = tr + " style='display:none' ";
  }

  tr = tr + "'>";
  var tds = "";

  if (editable) {
    tds = SteedosTable.getRemoveTd(fieldObj.code, index);
  }

  var sfields = fieldObj.sfields;
  keys.forEach(function (key) {
    var sfield = sfields.findPropertyByPK("code", key);
    var value = item_value[key];
    tds = tds + SteedosTable.getTd(sfield, index, value);
  });
  tr = tr + tds + "</tr>";
  return tr;
};

SteedosTable.getRemoveTd = function (field, index) {
  // return "<td class='steedosTable-item-remove removed' data-index='" + index + "'><i class='fa fa-times' aria-hidden='true'></td>";
  return "";
};

SteedosTable.getTd = function (field, index, value) {
  var td = "<td ";
  td = td + " class='steedosTable-item-field " + field.type + "' ";
  var td_value = "";

  if (Meteor.isClient) {
    td_value = SteedosTable.getTDValue(field, value);
  } else {
    locale = Template.instance().view.template.steedosData.locale;
    utcOffset = Template.instance().view.template.steedosData.utcOffset;
    td_value = InstanceReadOnlyTemplate.getValue(value, field, locale, utcOffset);
  }

  td = td + " data-index='" + index + "'>" + td_value + "</td>";
  return td;
};

SteedosTable.getTDValue = function (field, value) {
  var td_value = "";

  if (!field) {
    return td_value;
  }

  try {
    var fieldOptions = [];

    if (["select", "multiSelect", "radio"].indexOf(field.type) > -1) {
      fieldOptions = field.options.split("\n").map(function (n) {
        var itemSplits = n.split(":");
        return {
          label: itemSplits[0],
          value: itemSplits[1] || n
        };
      });
    }

    switch (field.type) {
      case 'user':
        if (value) {
          if (field.is_multiselect) {
            if (value.length > 0) {
              if ("string" == typeof value[0]) {
                td_value = CFDataManager.getFormulaSpaceUsers(value).getProperty("name").toString();
              } else {
                td_value = value.getProperty("name").toString();
              }
            }
          } else {
            if ("string" == typeof value) {
              var u = CFDataManager.getFormulaSpaceUsers(value);
              td_value = u ? u.name : '';
            } else {
              td_value = value.name;
            }
          }
        }

        break;

      case 'group':
        if (value) {
          if (field.is_multiselect) {
            if (value.length > 0) {
              if ("string" == typeof value[0]) {
                td_value = CFDataManager.getFormulaOrganizations(value).getProperty("name").toString();
              } else {
                td_value = value.getProperty("name").toString();
              }
            }
          } else {
            if ("string" == typeof value) {
              var o = CFDataManager.getFormulaOrganization(value);
              td_value = o ? o.name : '';
            } else {
              td_value = value.name;
            }
          }
        }

        break;

      case 'checkbox':
        if (value === true || value == 'true') {
          td_value = TAPi18n.__("form_field_checkbox_yes");
        } else {
          td_value = TAPi18n.__("form_field_checkbox_no");
        }

        break;

      case 'email':
        td_value = value ? "<a href='mailto:" + value + "'>" + value + "</a>" : "";
        break;

      case 'url':
        if (value) {
          if (value.indexOf("http") == 0) {
            try {
              td_value = "<a href='" + encodeURI(value) + "' target='_blank'>" + value + "</a>";
            } catch (e) {
              td_value = "<a href='' target='_blank'>" + value + "</a>";
            }
          } else {
            td_value = "<a href='http://" + encodeURI(value) + "' target='_blank'>http://" + value + "</a>";
          }
        } else {
          td_value = "";
        }

        break;

      case 'password':
        td_value = '******';
        break;

      case 'date':
        if (value) {
          if (value.length == 10) {
            var t = value.split("-");
            year = t[0];
            month = t[1];
            date = t[2];
            value = new Date(year, month - 1, date);
          } else {
            value = new Date(value);
          }

          td_value = $.format.date(value, 'yyyy-MM-dd');
        }

        break;

      case 'dateTime':
        if (value) {
          if (value.length == 16) {
            var t = value.split("T");
            var t0 = t[0].split("-");
            var t1 = t[1].split(":");
            year = t0[0];
            month = t0[1];
            date = t0[2];
            hours = t1[0];
            seconds = t1[1];
            value = new Date(year, month - 1, date, hours, seconds);
          } else {
            value = new Date(value);
          }

          td_value = $.format.date(value, 'yyyy-MM-dd HH:mm');
        }

        break;

      case 'select':
        var selectedOption = fieldOptions.find(function (item) {
          return item.value == value;
        });

        if (selectedOption) {
          td_value = selectedOption.label;
        }

        break;

      case 'radio':
        var selectedOption = fieldOptions.find(function (item) {
          return item.value == value;
        });

        if (selectedOption) {
          td_value = selectedOption.label;
        }

        break;

      case 'multiSelect':
        var splitedValues = value.split(",");
        var selectedOptions = fieldOptions.filter(function (item) {
          return splitedValues.indexOf(item.value) > -1;
        });

        if (selectedOptions.length) {
          td_value = selectedOptions.map(function (item) {
            return item.label;
          }).join(",");
        }

        break;

      case 'number':
        if (value || value == 0) {
          td_value = Steedos.numberToString(value, field.digits);
        }

        break;

      case 'odata':
        if (value) {
          if (field.is_multiselect) {
            td_value = _.pluck(value, '@label').toString();
          } else {
            td_value = value['@label'];
          }
        }

        break;

      default:
        td_value = value ? value : '';
        break;
    }
  } catch (e) {
    e;
    return '';
  }

  return td_value;
};

if (Meteor.isClient) {
  AutoForm.addInputType("table", {
    template: "afTable",
    valueOut: function () {
      var name = this.data("schemaKey");
      return SteedosTable.getValidValue(name);
    },
    valueConverters: {
      "stringArray": AutoForm.valueConverters.stringToStringArray,
      "number": AutoForm.valueConverters.stringToNumber,
      "numerArray": AutoForm.valueConverters.stringToNumberArray,
      "boolean": AutoForm.valueConverters.stringToBoolean,
      "booleanArray": AutoForm.valueConverters.stringToBooleanArray,
      "date": AutoForm.valueConverters.stringToDate,
      "dateArray": AutoForm.valueConverters.stringToDateArray
    },
    contextAdjust: function (context) {
      if (typeof context.atts.maxlength === 'undefined' && typeof context.max === 'number') {
        context.atts.maxlength = context.max;
      }

      return context;
    }
  });
  Template.afTable.events({
    'tap .steedos-table .steedosTable-item-add,.add-item-tr': function (event, template) {
      var name = template.data.name;
      var tableValue = SteedosTable.getTableValue(name);
      var new_item_index = tableValue ? tableValue.length : 0;
      SteedosTable.showModal(name, new_item_index, "add");
    },
    'tap .steedos-table .steedosTable-item-field': function (event, template) {
      if (template.data.atts.editable || template.data.atts.sfieldsEditable) {
        var field = template.data.name;
        var index = event.currentTarget.dataset.index;
        SteedosTable.showModal(field, index, "edit");
      }
    },
    'tap .steedos-table .steedosTable-item-remove': function (event, template) {
      var field = template.data.name;
      var item_index = event.currentTarget.dataset.index;
      Session.set("instance_change", true);
      SteedosTable.removeItem(field, item_index);
    },
    'tap .steedos-table .item-readonly': function (event, template) {
      if (!template.data.atts.editable) {
        var field = template.data.name;
        var index = event.currentTarget.dataset.index;
        SteedosTable.showModal(field, index, "read");
      }
    }
  });

  Template.afTable.rendered = function () {
    var field = this.data.name;
    var sfieldsEditable = this.data.atts.sfieldsEditable;
    var keys = SteedosTable.getKeys(field);
    var validValue = SteedosTable.handleData(field, this.data.value);
    SteedosTable.setTableValue(field, validValue);
    $("thead[name='" + field + "Thead']").html(SteedosTable.getThead(field, this.data.atts.editable));
    $("tbody[name='" + field + "Tbody']").html(SteedosTable.getTbody(keys, field, SteedosTable.getTableValue(field), this.data.atts.editable, sfieldsEditable));
    str = t("steedos_table_add_item");
    addItemTr = "<tr class='add-item-tr'><td colspan='" + keys.length + "'><i class='ion ion-plus-round'></i>" + str + "</td></tr>";

    if (this.data.atts.editable) {
      $("tfoot[name='" + field + "Tfoot']").append(addItemTr);
    }

    var c = InstanceManager.getCurrentStep();

    if (c.step_type == 'counterSign' || InstanceManager.ccHasEditPermission()) {
      this.autorun(function () {
        var data = Template.currentData();
        var field = data.name;
        var keys = SteedosTable.getKeys(field);
        var validValue = SteedosTable.handleData(field, data.value);
        SteedosTable.setTableValue(field, validValue);
        $("tbody[name='" + field + "Tbody']").html(SteedosTable.getTbody(keys, field, SteedosTable.getTableValue(field), data.atts.editable, sfieldsEditable));
      });
    }
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"views":{"instance":{"_image_sign.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_image_sign.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
ImageSign.helpers = {
  spaceUserSign: function (userId) {
    var space, spaceUserSign;
    space = "";

    if (Meteor.isServer) {
      space = Template.instance().view.template.steedosData.space;
    } else {
      space = Session.get("spaceId");
    }

    spaceUserSign = db.space_user_signs.findOne({
      space: space,
      user: userId
    });
    return spaceUserSign;
  },
  imageURL: function (userId) {
    var absolute, spaceUserSign;
    spaceUserSign = ImageSign.helpers.spaceUserSign(userId);
    absolute = false;

    if (Meteor.isServer) {
      absolute = Template.instance().view.template.steedosData.absolute;
    }

    if (spaceUserSign != null ? spaceUserSign.sign : void 0) {
      if (absolute) {
        return Meteor.absoluteUrl("api/files/avatars/" + spaceUserSign.sign);
      } else {
        return Steedos.absoluteUrl("api/files/avatars/" + spaceUserSign.sign);
      }
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_traces_handler.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_traces_handler.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
TracesHandler.helpers = {
  showSignImage: function (handler, is_finished, judge) {
    var spaceUserSign;

    if (!is_finished) {
      return false;
    }

    if (['returned', 'terminated', 'retrieved'].includes(judge)) {
      return false;
    }

    spaceUserSign = ImageSign.helpers.spaceUserSign(handler);

    if (spaceUserSign != null ? spaceUserSign.sign : void 0) {
      return true;
    } else {
      return false;
    }
  },
  objectUrl: function (object_name, record_id, app_id) {
    return Creator.getObjectUrl(object_name, record_id, app_id);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_instance_form.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_instance_form.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
InstanceformTemplate.helpers = {
  applicantContext: function () {
    var data, steedos_instance;
    steedos_instance = WorkflowManager.getInstance();
    data = {
      name: 'ins_applicant',
      atts: {
        name: 'ins_applicant',
        id: 'ins_applicant',
        "class": 'selectUser form-control ins_applicant'
      },
      value: steedos_instance.applicant_name
    };

    if (!steedos_instance || steedos_instance.state !== "draft") {
      data.atts.disabled = true;
    }

    return data;
  },
  instanceId: function () {
    return 'instanceform';
  },
  form_types: function () {
    if (ApproveManager.isReadOnly()) {
      return 'disabled';
    } else {
      return 'method';
    }
  },
  steedos_form: function () {
    var form_version;
    form_version = WorkflowManager.getInstanceFormVersion();

    if (form_version) {
      return form_version;
    }
  },
  innersubformContext: function (obj) {
    var doc_values;
    doc_values = WorkflowManager_format.getAutoformSchemaValues();
    obj["tableValues"] = doc_values ? doc_values[obj.code] : [];
    obj["formId"] = "instanceform";
    return obj;
  },
  instance: function () {
    var steedos_instance;
    Session.get("change_date");

    if (Session.get("instanceId")) {
      steedos_instance = WorkflowManager.getInstance();
      return steedos_instance;
    }
  },
  empty: function (val) {
    if (val) {
      return false;
    } else {
      return true;
    }
  },
  unempty: function (val) {
    if (val) {
      return true;
    } else {
      return false;
    }
  },
  equals: function (a, b) {
    return a === b;
  },
  unequals: function (a, b) {
    return !(a === b);
  },
  includes: function (a, b) {
    return b.split(',').includes(a);
  },
  include: function (a, b) {
    return b.split(',').includes(a);
  },
  fields: function () {
    var form_version;
    form_version = WorkflowManager.getInstanceFormVersion();

    if (form_version) {
      return new SimpleSchema(WorkflowManager_format.getAutoformSchema(form_version));
    }
  },
  formatDate: function (date, options) {
    if (!date) {
      return "";
    }

    if (options && typeof options === 'string') {
      options = JSON.parse(options);
    }

    if (!options.format) {
      options = {
        format: "YYYY-MM-DD HH:mm"
      };
    }

    return moment(date).format(options.format);
  },
  traces: function () {
    var flow, instance, locale, ref, ref1, ref2, ref3, steedosData, steps, traces;

    if (Meteor.isServer) {
      steedosData = (ref = Template.instance()) != null ? (ref1 = ref.view) != null ? (ref2 = ref1.template) != null ? ref2.steedosData : void 0 : void 0 : void 0;
      instance = steedosData != null ? steedosData.instance : void 0;
      flow = InstanceReadOnlyTemplate.getFlowVersion(instance);
      locale = steedosData != null ? steedosData.locale : void 0;

      if (locale.toLocaleLowerCase() === 'zh-cn') {
        locale = "zh-CN";
      }
    } else {
      instance = WorkflowManager.getInstance();
      flow = WorkflowManager.getInstanceFlowVersion();
      locale = Session.get("TAPi18n::loaded_lang");
    }

    if (!instance || !flow) {
      return {};
    }

    steps = flow.steps;
    traces = {};

    if ((ref3 = instance.traces) != null) {
      ref3.forEach(function (trace) {
        var approves, ref4, step;
        step = steps.findPropertyByPK("_id", trace.step);
        approves = [];

        if ((ref4 = trace.approves) != null) {
          ref4.forEach(function (approve) {
            var judge_name;

            if (trace.is_finished === true) {
              if (approve.judge === 'approved') {
                judge_name = TAPi18n.__("Instance State approved", {}, locale);
              } else if (approve.judge === 'rejected') {
                judge_name = TAPi18n.__("Instance State rejected", {}, locale);
              } else if (approve.judge === 'terminated') {
                judge_name = TAPi18n.__("Instance State terminated", {}, locale);
              } else if (approve.judge === 'reassigned') {
                judge_name = TAPi18n.__("Instance State reassigned", {}, locale);
              } else if (approve.judge === 'relocated') {
                judge_name = TAPi18n.__("Instance State relocated", {}, locale);
              } else if (approve.judge === '') {
                judge_name = "";
              } else {
                judge_name = "";
              }
            } else {
              judge_name = TAPi18n.__("Instance State pending", {}, locale);
            }

            return approves.push({
              _id: approve._id,
              handler: approve.user,
              handler_name: approve.handler_name,
              handler_organization_name: approve.handler_organization_name,
              handler_organization_fullname: approve.handler_organization_fullname,
              finish_date: approve.finish_date,
              judge: approve.judge,
              judge_name: judge_name,
              description: approve.description,
              is_finished: approve.is_finished,
              type: approve.type,
              opinion_fields_code: approve.opinion_fields_code,
              sign_field_code: approve.sign_field_code,
              is_read: approve.is_read,
              sign_show: approve.sign_show
            });
          });
        }

        if (step) {
          if (step.name in traces) {
            return traces[step.name] = traces[step.name].concat(approves);
          } else {
            return traces[step.name] = approves;
          }
        }
      });
    }

    return traces;
  },
  doc_values: function () {
    return WorkflowManager_format.getAutoformSchemaValues();
  },
  instance_box_style: function () {
    var box, ins, judge;
    box = Session.get("box");

    if (box === "inbox" || box === "draft") {
      judge = Session.get("judge");

      if (judge) {
        if (judge === "approved") {
          return "box-success";
        } else if (judge === "rejected") {
          return "box-danger";
        }
      }
    }

    ins = WorkflowManager.getInstance();

    if (ins && ins.final_decision) {
      if (ins.final_decision === "approved") {
        return "box-success";
      } else if (ins.final_decision === "rejected") {
        return "box-danger";
      }
    }
  },
  table_fields: function (instance) {
    var fields, form_version;

    if (Meteor.isClient) {
      form_version = WorkflowManager.getInstanceFormVersion();
    } else {
      form_version = WorkflowManager.getFormVersion(instance.form, instance.form_version);
    }

    if (form_version) {
      fields = _.clone(form_version.fields);
      fields.forEach(function (field, index) {
        var after_field, before_field, pre_fields, pre_wide_fields, td_colspan, tr_end, tr_start;
        field.tr_start = "";
        field.tr_end = "";
        td_colspan = 1;

        if ((typeof CoreForm !== "undefined" && CoreForm !== null ? CoreForm.pageTitleFieldName : void 0) === field.code) {
          field.is_wide = true;
        }

        if (field.formula && field.type !== 'odata') {
          field.permission = "readonly";
        }

        if (Steedos.isMobile()) {
          if (field.type === 'section' || field.type === 'table') {
            field.td_colspan = 4;
          } else {
            field.td_colspan = 3;
          }

          if (index !== 0) {
            field.tr_start = "<tr>";
            return field.tr_end = "</tr>";
          }
        } else {
          pre_fields = fields.slice(0, index);
          pre_wide_fields = pre_fields.filterProperty("is_wide", true);
          tr_start = "";
          tr_end = "";
          before_field = null;
          after_field = null;

          if (index > 0) {
            before_field = fields[index - 1];
          }

          if (index < fields.length - 1) {
            after_field = fields[index + 1];
          }

          if (field.type === 'section' || field.type === 'table') {
            td_colspan = 4;
          } else if (field.is_wide) {
            td_colspan = 3;
          } else {
            if (before_field && after_field && before_field.is_wide && after_field.is_wide) {
              field.is_wide = true;
              td_colspan = 3;
            }

            if ((pre_fields.length + pre_wide_fields.length) % 2 === 0 && after_field && after_field.is_wide) {
              field.is_wide = true;
              td_colspan = 3;
            }

            if ((pre_fields.length + pre_wide_fields.length) % 2 === 0 && after_field === null) {
              field.is_wide = true;
              td_colspan = 3;
            }
          }

          field.td_colspan = td_colspan;

          if (index === 0) {
            tr_start = "<tr>";
          } else {
            if ((pre_fields.length + pre_wide_fields.length) % 2 === 0 || field.is_wide) {
              if (field.type === 'table') {
                tr_start = "<tr class = \"tr-child-table\">";
              } else {
                tr_start = "<tr>";
              }
            }
          }

          field.tr_start = tr_start;

          if (index + 1 === fields.length || field.type === 'section' || field.type === 'table' || field.is_wide) {
            tr_end = "</tr>";
          }

          if ((pre_fields.length + pre_wide_fields.length) % 2 !== 0) {
            tr_end = "</tr>";
          }

          return field.tr_end = tr_end;
        }
      });
      return fields;
    }
  },
  sort_approve: function (approves, order) {
    if (!approves) {
      return [];
    }

    if (!approves instanceof Array) {
      return [];
    } else {
      if (order === 'desc') {
        approves.sort(function (p1, p2) {
          var _p1, _p2;

          _p1 = 0;
          _p2 = 0;

          if (p1.finish_date) {
            _p1 = p1.finish_date.getTime();
          }

          if (p2.finish_date) {
            _p2 = p2.finish_date.getTime();
          }

          return _p2 - _p1;
        });
      } else {
        approves.sort(function (p1, p2) {
          var _p1, _p2;

          _p1 = 0;
          _p2 = 0;

          if (p1.finish_date) {
            _p1 = p1.finish_date.getTime();
          }

          if (p2.finish_date) {
            _p2 = p2.finish_date.getTime();
          }

          return _p1 - _p2;
        });
      }
    }

    return approves;
  },
  _t: function (key) {
    return TAPi18n.__(key);
  },
  getField: function (code) {
    var form_version;
    form_version = Template.instance().view.template.steedosData.form_version;

    if (form_version) {
      return form_version.fields.findPropertyByPK("code", code);
    }
  },
  getValue: function (code) {
    var form_version, instance, locale, utcOffset, values;
    instance = Template.instance().view.template.steedosData.instance;
    form_version = Template.instance().view.template.steedosData.form_version;
    locale = Template.instance().view.template.steedosData.locale;
    utcOffset = Template.instance().view.template.steedosData.utcOffset;
    values = instance.values || {};

    if (Meteor.isClient) {
      values = WorkflowManager_format.getAutoformSchemaValues();
    }

    return InstanceReadOnlyTemplate.getValue(values[code], form_version.fields.findPropertyByPK("code", code), locale, utcOffset);
  },
  getLabel: function (code) {
    var form_version;
    form_version = Template.instance().view.template.steedosData.form_version;
    return InstanceReadOnlyTemplate.getLabel(form_version.fields, code);
  },
  getCfClass: function (field) {
    if ((field != null ? field.type : void 0) === "input" && (field != null ? field.is_textarea : void 0)) {
      return "cfTextarea";
    }
  },
  getTableThead: function (field) {
    return SteedosTable.getThead(field, false);
  },
  getTableBody: function (field) {
    var instance, tableValue, values;

    if (Meteor.isServer) {
      instance = Template.instance().view.template.steedosData.instance;
      values = instance.values || {};
    } else {
      values = WorkflowManager_format.getAutoformSchemaValues();
    }

    tableValue = values[field.code];
    return SteedosTable.getTbody(field.sfields.getProperty("code"), field, tableValue, false);
  },
  showLabel: function (field) {
    var templateData;
    templateData = Template.instance().data;

    if (templateData.label === false) {
      return false;
    }

    return true;
  },
  isOpinionField: function (field) {
    return InstanceformTemplate.helpers.isOpinionField_from_string(field.formula);
  },
  isOpinionField_from_string: function (field_formula) {
    return InstanceSignText.isOpinionField_from_string(field_formula);
  },
  includesOpinionField: function (form, form_version) {
    var field_formulas, fields, ref;
    field_formulas = new Array();
    fields = ((ref = db.form_versions.findOne({
      _id: form_version,
      form: form
    })) != null ? ref.fields : void 0) || [];
    fields.forEach(function (f) {
      var ref1;

      if (f.type === 'table') {
        return console.log('ignore opinion field in table');
      } else if (f.type === 'section') {
        return f != null ? (ref1 = f.fields) != null ? ref1.forEach(function (f1) {
          return field_formulas.push(f1.formula);
        }) : void 0 : void 0;
      } else {
        return field_formulas.push(f.formula);
      }
    });
    return _.some(field_formulas, function (field_formula) {
      return InstanceformTemplate.helpers.isOpinionField_from_string(field_formula);
    });
  },
  getOpinionFieldStepsName: function (field_formula, top_keywords) {
    var foo1, opinionFields;
    opinionFields = new Array();

    if (InstanceformTemplate.helpers.isOpinionField_from_string(field_formula)) {
      if (field_formula) {
        foo1 = field_formula.split(";");
        foo1.forEach(function (foo) {
          var json_formula, ref, ref1, s1, sf;
          json_formula = {};

          try {
            json_formula = eval("(" + foo + ")");
          } catch (error1) {
            json_formula = {};
          }

          if (json_formula != null ? json_formula.yijianlan : void 0) {
            sf = {};
            sf.stepName = json_formula.yijianlan.step;
            sf.image_sign = json_formula.yijianlan.image_sign || false;
            sf.only_cc_opinion = json_formula.yijianlan.only_cc || false;
            sf.default_description = json_formula.yijianlan["default"];
            sf.only_handler = json_formula.yijianlan.only_handler;
            sf.top_keywords = json_formula.yijianlan.top_keywords || top_keywords;
            return opinionFields.push(sf);
          } else if ((field_formula != null ? field_formula.indexOf("{traces.") : void 0) > -1 || (field_formula != null ? field_formula.indexOf("{signature.traces.") : void 0) > -1) {
            sf = {
              only_cc_opinion: false,
              image_sign: false,
              top_keywords: top_keywords
            };

            if (foo.indexOf("{signature.") > -1) {
              sf.image_sign = true;
              foo = foo.replace("{signature.", "");
            }

            s1 = foo.replace("{", "").replace("}", "");

            if (s1.split(".").length > 1) {
              sf.stepName = s1.split(".")[1];

              if (opinionFields.filterProperty("stepName", sf.stepName).length > 0) {
                if ((ref = opinionFields.findPropertyByPK("stepName", sf.stepName)) != null) {
                  ref.only_cc_opinion = true;
                }
              } else {
                if (s1.split(".").length > 2) {
                  if (((ref1 = s1.split(".")[2]) != null ? ref1.toLocaleLowerCase() : void 0) === 'cc') {
                    sf.only_cc_opinion = true;
                  }
                }
              }
            }

            return opinionFields.push(sf);
          }
        });
      }
    }

    return opinionFields;
  },
  showCCOpinion: function (field) {
    var ref, ref1, ref2, s1;

    if (((ref = field.formula) != null ? ref.indexOf("{traces.") : void 0) > -1 || ((ref1 = field.formula) != null ? ref1.indexOf("{signature.traces.") : void 0) > -1) {
      s1 = field.formula.replace("{signature.", "").replace("{", "").replace("}", "");

      if (s1.split(".").length > 2) {
        if (((ref2 = s1.split(".")[2]) != null ? ref2.toLocaleLowerCase() : void 0) === 'cc') {
          return true;
        }
      }
    }

    return false;
  },
  markDownToHtml: function (markDownString) {
    if (markDownString) {
      return Spacebars.SafeString(marked.parse(markDownString));
    }
  },
  f_label: function (that) {
    return that.name || that.code;
  }
};

if (Meteor.isServer) {
  InstanceformTemplate.helpers.steedos_form = function () {
    return this.form_version;
  };

  InstanceformTemplate.helpers.isSection = function (code) {
    var form_version;
    form_version = this.form_version;
    return form_version.fields.findPropertyByPK("code", code).type === 'section';
  };

  InstanceformTemplate.helpers.doc_values = function () {
    var instance;
    instance = this.instance;
    return instance.values;
  };

  InstanceformTemplate.helpers.applicantContext = function () {
    var data, instance;
    instance = this.instance;
    return data = {
      name: 'ins_applicant',
      atts: {
        name: 'ins_applicant',
        id: 'ins_applicant',
        "class": 'selectUser form-control ins_applicant'
      },
      value: instance.applicant_name
    };
  };

  InstanceformTemplate.helpers.instance = function () {
    return this.instance;
  };

  InstanceformTemplate.helpers.fields = function () {
    var form_version;
    form_version = this.form_version;

    if (form_version) {
      return new SimpleSchema(WorkflowManager_format.getAutoformSchema(form_version));
    }
  };

  InstanceformTemplate.helpers.form_types = function () {
    return "disabled";
  };

  Template.registerHelper("afFieldLabelText", function (op) {
    var form_version, ref;
    form_version = Template.instance().view.template.steedosData.form_version;
    return InstanceReadOnlyTemplate.getLabel(form_version.fields, op != null ? (ref = op.hash) != null ? ref.name : void 0 : void 0);
  });

  InstanceformTemplate.helpers._t = function (key) {
    var locale;
    locale = this.locale;
    return TAPi18n.__(key, {}, locale);
  };

  InstanceformTemplate.helpers.ins_attach_download_url = function (_id, absolute) {
    if (absolute) {
      return Meteor.absoluteUrl("/api/files/instances/" + _id + "?download=true");
    } else {
      return "/api/files/instances/" + _id + "?download=true";
    }
  };

  InstanceformTemplate.helpers.options = function (field) {
    var options, ref, rev;
    options = field != null ? (ref = field.options) != null ? ref.split("\n") : void 0 : void 0;
    rev = [];

    if (options != null) {
      options.forEach(function (item) {
        return rev.push({
          label: item,
          value: item
        });
      });
    }

    return rev;
  };

  InstanceformTemplate.helpers.getPermissions = function (code) {
    var ref;

    if (!((ref = Template.instance().view.template.steedosData.startStepEditableFields) != null ? ref.includes(code) : void 0)) {
      return "readonly disabled";
    }

    return "";
  };
}

InstanceformTemplate.events = {
  'change .form-control,.checkbox input,.af-radio-group input,.af-checkbox-group input': function (event) {
    return InstanceManager.instanceformChangeEvent(event);
  },
  'typeahead:change .form-control': function (event) {
    return InstanceManager.instanceformChangeEvent(event);
  },
  'click .cfTextarea a': function (event) {
    event.preventDefault();
    return Steedos.openWindow(event.target.href);
  }
};

InstanceformTemplate.onCreated = function () {
  var compiled, e, instance, instanceCustomTemplate, instanceView, renderFunction, template;
  instance = WorkflowManager.getInstance();

  if (!instance) {
    return;
  }

  template = TemplateManager.getTemplate(instance);

  try {
    compiled = SpacebarsCompiler.compile(template, {
      isBody: true
    });
  } catch (error1) {
    e = error1;
    console.log("Instance Template Error", e);
    compiled = SpacebarsCompiler.compile("", {
      isBody: true
    });
  }

  renderFunction = eval(compiled);
  instanceView = new Blaze.View("custom_instance_template", renderFunction);
  instanceCustomTemplate = new Blaze.Template(instanceView.name, renderFunction);
  Template.instance_custom_template = instanceCustomTemplate;
  return Template.instance_custom_template.helpers(InstanceformTemplate.helpers);
};

InstanceformTemplate.onRendered = function () {
  var currentApprove, currentStep, form_version, formula_fields, insertDoc, instance, instanceNumberFields, judge, ref;
  instance = WorkflowManager.getInstance();

  if (!instance) {
    return;
  }

  if ((ref = $("input[name='ins_applicant']")[0]) != null) {
    ref.dataset.values = instance.applicant;
  }

  $("input[name='ins_applicant']").val(instance.applicant_name);
  ApproveManager.error = {
    nextSteps: '',
    nextStepUsers: ''
  };

  if (Session.get("box") === 'inbox' || Session.get("box") === 'draft') {
    InstanceEvent.initEvents(instance.flow);
  }

  if (!ApproveManager.isReadOnly()) {
    currentApprove = InstanceManager.getCurrentApprove();
    instanceNumberFields = $("[data-formula]", $("#instanceform"));
    instanceNumberFields.each(function () {
      var element, schemaKey;
      schemaKey = this.dataset.schemaKey;
      element = $(this);

      if (!$(this).val() && schemaKey && Session.get("instanceId")) {
        return Meteor.call('getInstanceValues', Session.get("instanceId"), function (error, result) {
          var key, ref1;

          if (error) {
            toastr.error(error.reason);
          }

          if (!result[schemaKey]) {
            key = (ref1 = element.data("formula")) != null ? ref1.replace("auto_number(", "").replace(")", "") : void 0;
            key = key.replace(/\"/g, "").replace(/\'/g, "");

            if (key.indexOf("{") > -1) {
              key = key.replace("{", "").replace("}", "");
              key = key.trim();
              key = AutoForm.getFieldValue(key, 'instanceform');
            }

            return InstanceNumberRules.instanceNumberBuilder(element, key);
          } else {
            return element != null ? element.val(result[schemaKey]).trigger("change") : void 0;
          }
        });
      }
    });
    judge = currentApprove.judge;
    currentStep = InstanceManager.getCurrentStep();
    form_version = WorkflowManager.getInstanceFormVersion();
    formula_fields = Form_formula.getFormulaFieldVariable("Form_formula.field_values", form_version.fields);
    insertDoc = AutoForm.getFormValues("instanceform", void 0, void 0, false);
    Form_formula.run("", "", formula_fields, insertDoc, form_version.fields);
    return Session.set("instance_form_values", {
      instanceId: instance._id,
      values: insertDoc
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_instance_attachments.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_instance_attachments.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
InstanceAttachmentTemplate.helpers = {
  showMainTitle: function () {
    return Template.instance().workflowMainAttachTitle.get();
  },
  enabled_add_main_attachment: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false;
    if (Session && Session.get("instancePrint")) return false;

    if (Session.get("box") != "draft" && Session.get("box") != "inbox") {
      return false;
    } // 已经结束的单子不能改附件


    if (ins.state == "completed") {
      return false;
    }

    var current_step = InstanceManager.getCurrentStep();
    if (!current_step) return false; // 分发的正文或者附件不显示转为pdf按钮
    // 如果有正文权限则为正文，否则分发为附件
    // 分发的附件不允许修改 删除 新增版本

    var main_attach_count = cfs.instances.find({
      'metadata.instance': ins._id,
      'metadata.current': true,
      'metadata.main': true
    }).count();
    var distribute_main_attach_count = 0;

    if (ins.distribute_from_instance) {
      var start_step = InstanceManager.getStartStep();

      if (start_step.can_edit_main_attach) {
        var distribute_main_attach_count = cfs.instances.find({
          'metadata.instance': ins.distribute_from_instance,
          'metadata.current': true,
          'metadata.main': true
        }).count();
      }
    }

    if (current_step.can_edit_main_attach == true && main_attach_count < 1 && distribute_main_attach_count < 1) {
      return true;
    } // 正文最多只能有一个


    if (main_attach_count >= 1 || distribute_main_attach_count >= 1) {
      return false;
    } // 开始节点并且设置了可以上传正文才显示上传正文的按钮


    var current_step = InstanceManager.getCurrentStep();
    if (current_step && current_step.step_type == "start" && current_step.can_edit_main_attach == true) return true;
    return false;
  },
  enabled_edit_normal_attachment: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false;
    if (Session && Session.get("instancePrint")) return false;
    var flow = WorkflowManager.getFlow(ins.flow);
    if (!flow) return false; // 分发后的 附件，不可以编辑/删除，也不让上传新的附件, 流程列表：添加属性 ‘被分发后是否允许上传附件’ #1837

    if (ins.distribute_from_instance && !flow.upload_after_being_distributed) return false;

    if (Session.get("box") != "draft" && Session.get("box") != "inbox") {
      return false;
    } // 已经结束的单子不能改附件


    if (ins.state == "completed") {
      return false;
    }

    if (InstanceManager.isCC(ins)) {
      var step = InstanceManager.getCCStep();
      if (step && (step.can_edit_normal_attach == true || step.can_edit_normal_attach == undefined)) return true;
    } else {
      var current_step = InstanceManager.getCurrentStep();
      if (current_step && (current_step.can_edit_normal_attach == true || current_step.can_edit_normal_attach == undefined)) return true;
    }

    return false;
  },
  main_attachment: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false;
    var start_step = InstanceManager.getStartStep(); // 如果是被分发的申请单并且有修改正文的权限，则优先显示原申请单文件

    var main_attach = null;

    if (ins.distribute_from_instance && start_step.can_edit_main_attach == true) {
      main_attach = cfs.instances.findOne({
        'metadata.instance': ins.distribute_from_instance,
        'metadata.current': true,
        'metadata.main': true
      });
    }

    if (!main_attach) {
      main_attach = cfs.instances.findOne({
        'metadata.instance': ins._id,
        'metadata.current': true,
        'metadata.main': true
      });
    }

    return main_attach;
  },
  normal_attachments: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false;
    var selector = {
      'metadata.current': true,
      'metadata.main': {
        $ne: true
      }
    };
    var atts = new Array();

    if (ins.distribute_from_instance) {
      // 如果是被分发的申请单，则显示原申请单文件, 如果选择了将原表单存储为附件也要显示, 同时也要显示新上传的附件
      var dfis = _.clone(ins.distribute_from_instances) || [];
      dfis.push(ins._id);
      selector['metadata.instance'] = {
        $in: dfis
      };
      selector["$or"] = [{
        "metadata.instance": ins._id
      }, {
        "metadata.instance": {
          $in: ins.distribute_from_instances
        },
        "metadata.is_private": {
          $ne: true
        }
      }]; // 如果原申请单有正文但是分发后没有正文权限，则原申请单正文显示在附件栏

      var start_step = InstanceManager.getStartStep();

      if (start_step && start_step.can_edit_main_attach != true) {
        var distribute_main = cfs.instances.findOne({
          'metadata.instance': {
            $in: ins.distribute_from_instances
          },
          'metadata.current': true,
          'metadata.main': true
        });

        if (distribute_main) {
          var firstVersionMain = cfs.instances.findOne(distribute_main.metadata.parent);
          distribute_main.attachmentUploadedAt = firstVersionMain ? firstVersionMain.uploadedAt : distribute_main.uploadedAt;
          atts.push(distribute_main);
        }
      }
    } else {
      selector['metadata.instance'] = ins._id;
    }

    cfs.instances.find(selector).forEach(function (c) {
      var firstVersion = cfs.instances.findOne(c.metadata.parent);
      c.attachmentUploadedAt = firstVersion ? firstVersion.uploadedAt : c.uploadedAt;
      atts.push(c);
    });
    return _.sortBy(atts, 'attachmentUploadedAt');
  },
  showAttachments: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false; // 如果是被分发的申请单，则显示原申请单文件 和分发后申请单文件

    var instanceIds = _.clone(ins.distribute_from_instances) || [];
    instanceIds.push(ins._id);
    var attachments_count = cfs.instances.find({
      'metadata.instance': {
        $in: instanceIds
      },
      'metadata.current': true
    }).count();
    if (Session && Session.get("instancePrint") && attachments_count < 1) return false;
    if (Session.get("box") == "draft" || Session.get("box") == "inbox" || attachments_count > 0) return true;else return false;
  },
  _t: function (key) {
    return TAPi18n.__(key);
  },
  _: function (key) {
    var locale;

    if (Meteor.isClient) {
      return TAPi18n.__(key);
    } else {
      locale = Template.instance().view.template.steedosData.locale;
      return TAPi18n.__(key, {}, locale);
    }
  },
  flow_files: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false;
    return cfs.files.find({
      'metadata.space': ins.space,
      'metadata.object_name': 'flows',
      'metadata.record_id': ins.flow
    });
  },
  isDraftAndFlowfilesExist: function () {
    var ins = WorkflowManager.getInstance();
    if (!ins) return false;
    return Session.get('box') == 'draft' && !!cfs.files.find({
      'metadata.space': ins.space,
      'metadata.object_name': 'flows',
      'metadata.record_id': ins.flow
    }).count();
  }
};

if (Meteor.isServer) {
  InstanceAttachmentTemplate.helpers._t = function (key) {
    locale = Template.instance().view.template.steedosData.locale;
    return TAPi18n.__(key, {}, locale);
  };

  InstanceAttachmentTemplate.helpers.enabled_add_main_attachment = function () {
    return false;
  };

  InstanceAttachmentTemplate.helpers.enabled_edit_normal_attachment = function () {
    return false;
  };

  InstanceAttachmentTemplate.helpers.main_attachment = function () {
    var instance = Template.instance().view.template.steedosData.instance;

    var instanceIds = _.compact([instance.distribute_from_instance, instance._id]);

    var attachment = cfs.instances.findOne({
      'metadata.instance': {
        $in: instanceIds
      },
      'metadata.current': true,
      'metadata.main': true
    });
    return attachment;
  };

  InstanceAttachmentTemplate.helpers.normal_attachments = function () {
    var steedosData = Template.instance().view.template.steedosData;
    var instance = steedosData.instance;
    var instanceIds = _.clone(instance.distribute_from_instances) || [];
    instanceIds.push(instance._id);
    var attachments = cfs.instances.find({
      'metadata.instance': {
        $in: instanceIds
      },
      'metadata.current': true,
      'metadata.main': {
        $ne: true
      },
      $or: [{
        'metadata.is_private': {
          $ne: true
        }
      }, {
        'metadata.is_private': true,
        "metadata.owner": steedosData.userId
      }]
    }).fetch();
    return attachments;
  };

  InstanceAttachmentTemplate.helpers.showAttachments = function () {
    var instance = Template.instance().view.template.steedosData.instance;
    var instanceIds = _.clone(instance.distribute_from_instances) || [];
    instanceIds.push(instance._id);
    var attachments = cfs.instances.find({
      'metadata.instance': {
        $in: instanceIds
      },
      'metadata.current': true
    }).fetch();

    if (attachments && attachments.length > 0) {
      return true;
    }

    return false;
  };

  InstanceAttachmentTemplate.helpers.showMainTitle = function () {
    var instance = Template.instance().view.template.steedosData.instance;

    var instanceIds = _.compact([instance.distribute_from_instance, instance._id]);

    var main_attach_count = cfs.instances.find({
      'metadata.instance': {
        $in: instanceIds
      },
      'metadata.current': true,
      'metadata.main': true
    }).count();
    return main_attach_count > 0;
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_instance_sign_text.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_instance_sign_text.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
InstanceSignText.helpers = {
  show: function (stepName) {
    var instance, myApprove, myTrace, ref;

    if (Meteor.isClient) {
      if (Session.get('instancePrint')) {
        return false;
      }

      if (InstanceManager.isInbox()) {
        myApprove = InstanceManager.getCurrentApprove();

        if (myApprove) {
          instance = WorkflowManager.getInstance();
          myTrace = instance != null ? (ref = instance.traces) != null ? ref.findPropertyByPK("_id", myApprove.trace) : void 0 : void 0;
          return (myTrace != null ? myTrace.name : void 0) === stepName;
        }
      }
    }

    return false;
  },
  defaultDescription: function () {
    return Template.instance().data.default_description;
  },
  traces: function () {
    return InstanceformTemplate.helpers.traces();
  },
  trace: function (stepName, only_cc_opinion, image_sign, top_keywords) {
    var approve_sort, approves, approvesGroup, approves_sorted, completed_date, hasNext, haveDescriptionApprove, instance, is_completed, ref, ref1, ref2, traces;
    instance = InstanceformTemplate.helpers.instance();
    is_completed = (instance != null ? instance.state : void 0) === "completed";
    completed_date = is_completed ? (ref = _.last(instance.traces)) != null ? (ref1 = ref.finish_date) != null ? ref1.getTime() : void 0 : void 0 : 0;

    if (is_completed && instance.finish_date) {
      completed_date = (ref2 = instance.finish_date) != null ? ref2.getTime() : void 0;
    }

    traces = InstanceformTemplate.helpers.traces();
    approves = _.clone(traces[stepName]);

    approve_sort = function (approves, top_keywords) {
      var approves_sorted, top_approves;
      approves_sorted = _.sortBy(approves, function (approve) {
        return -(approve.finish_date || new Date()).getTime();
      });

      if (top_keywords) {
        top_approves = new Array();
        top_keywords.split(",").forEach(function (key) {
          return top_approves = _.union(top_approves, _.filter(approves_sorted, function (approve) {
            var ref3;
            return (approve != null ? (ref3 = approve.handler_name) != null ? ref3.indexOf(key) : void 0 : void 0) > -1;
          }));
        });
        top_approves = _.sortBy(top_approves, function (top_approve) {
          return -(top_approve.finish_date || new Date()).getTime();
        });
        approves_sorted = _.union(top_approves, approves_sorted);
      }

      return approves_sorted || [];
    };

    approves = _.filter(approves, function (a) {
      return a.type !== "forward" && a.type !== "distribute" && a.type !== "terminated";
    });

    if (only_cc_opinion) {
      approves = approves != null ? approves.filterProperty("type", "cc") : void 0;
    }

    approves_sorted = approve_sort(approves, top_keywords);
    approvesGroup = _.groupBy(approves, "handler");

    hasNext = function (approve, approvesGroup) {
      var handlerApproves;
      handlerApproves = approvesGroup[approve.handler];
      return _.indexOf(handlerApproves, approve) + 1 < handlerApproves.length;
    };

    haveDescriptionApprove = function (approve, approvesGroup) {
      var descriptionApproves, handlerApproves;
      handlerApproves = approvesGroup[approve.handler];
      descriptionApproves = _.filter(handlerApproves, function (a) {
        if (a.description) {
          return true;
        }

        return false;
      });

      if (descriptionApproves.length === 0) {
        return false;
      }

      return true;
    };

    approves_sorted.forEach(function (approve) {
      var ref3;

      if (approve.sign_show !== false && (approve.description || !approve.description && !hasNext(approve, approvesGroup) && !approve.is_finished || ((ref3 = Meteor.settings["public"].workflow) != null ? ref3.showBlankApproveDescription : void 0))) {
        if (approve.judge !== 'terminated') {
          return approve._display = true;
        }
      }
    });
    approves_sorted = _.filter(approves_sorted, function (a) {
      var ref3;

      if (is_completed) {
        return a._display === true && a.is_finished && ((ref3 = a.finish_date) != null ? ref3.getTime() : void 0) <= completed_date;
      } else {
        return a._display === true;
      }
    });
    return approves_sorted;
  },
  include: function (a, b) {
    return InstanceformTemplate.helpers.include(a, b);
  },
  unempty: function (val) {
    var ref;
    return InstanceformTemplate.helpers.unempty(val) || ((ref = Meteor.settings["public"].workflow) != null ? ref.showBlankApproveDescription : void 0);
  },
  formatDate: function (date, options) {
    if (!options) {
      options = {
        "format": "YYYY-MM-DD"
      };
    }

    return InstanceformTemplate.helpers.formatDate(date, options);
  },
  isMyApprove: function (approve, only_cc_opinion) {
    var currentApprove, ins;

    if (Meteor.isClient) {
      ins = WorkflowManager.getInstance();
      currentApprove = InstanceManager.getCurrentApprove();

      if (!(approve != null ? approve._id : void 0)) {
        approve = currentApprove;
      }

      if (approve._id === (currentApprove != null ? currentApprove._id : void 0) && (currentApprove != null ? currentApprove.type : void 0) === 'cc' && Template.instance().data.name) {
        if (_.indexOf(currentApprove != null ? currentApprove.opinion_fields_code : void 0, Template.instance().data.name) > -1) {
          return true;
        } else {
          return false;
        }
      }

      if (!((currentApprove != null ? currentApprove.type : void 0) === 'cc') && only_cc_opinion) {
        return false;
      }

      if (currentApprove && approve._id === currentApprove._id) {
        return true;
      }
    }

    return false;
  },
  myApproveDescription: function (approveId) {
    var myApprove, ref, ref1, ref2, ref3;

    if (Meteor.isClient) {
      if (Session.get("box") === 'inbox') {
        myApprove = (ref = Template.instance()) != null ? (ref1 = ref.myApprove) != null ? ref1.get() : void 0 : void 0;

        if (myApprove && myApprove.id === approveId) {
          if (!myApprove.sign_field_code || myApprove.sign_field_code === ((ref2 = Template.instance()) != null ? (ref3 = ref2.data) != null ? ref3.name : void 0 : void 0)) {
            if (!Session.get("instance_my_approve_description")) {
              return (myApprove != null ? myApprove.description : void 0) || "";
            }

            return Session.get("instance_my_approve_description");
          }
        }
      }
    }
  },
  now: function () {
    return new Date();
  },
  isReadOnly: function () {
    if (Meteor.isClient) {
      return ApproveManager.isReadOnly();
    }

    return false;
  },
  isOpinionOfField: function (approve) {
    if (approve.type === "cc" && Template.instance().data.name) {
      if (Template.instance().data.name === approve.sign_field_code) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  markDownToHtml: function (markDownString) {
    if (markDownString) {
      return Spacebars.SafeString(marked.parse(markDownString));
    }
  },
  steps: function (field_formula, step, only_cc_opinion, image_sign) {
    var ref, ref1, ref2, steps;
    steps = [];

    if (!step) {
      if (!field_formula) {
        field_formula = (ref = WorkflowManager.getInstanceFormVersion()) != null ? (ref1 = ref.fields) != null ? ref1.findPropertyByPK("code", this.name).formula : void 0 : void 0;
      }

      steps = InstanceformTemplate.helpers.getOpinionFieldStepsName(field_formula, (ref2 = Template.instance()) != null ? ref2.data.top_keywords : void 0);
    } else {
      steps = [{
        stepName: step,
        only_cc_opinion: only_cc_opinion,
        image_sign: image_sign
      }];
    }

    return steps;
  },
  imageSignData: function (handler) {
    return {
      user: handler
    };
  },
  showSignImage: function (handler, image_sign, judge) {
    var spaceUserSign;

    if (['returned', 'terminated', 'retrieved'].includes(judge)) {
      return false;
    }

    spaceUserSign = ImageSign.helpers.spaceUserSign(handler);

    if ((spaceUserSign != null ? spaceUserSign.sign : void 0) && image_sign) {
      return true;
    } else {
      return false;
    }
  },
  getLastSignApprove: function () {
    var ins;
    ins = WorkflowManager.getInstance();
    return _.last(TracesManager.getHandlerSignShowApproves(ins, Meteor.userId()));
  },
  lastMyApproveDescription: function () {
    var approves, currentStep, ref, traces;
    traces = InstanceformTemplate.helpers.traces();
    currentStep = InstanceManager.getCurrentStep();
    approves = _.clone(traces[currentStep.name]);
    approves = approves.filterProperty("handler", Meteor.userId());

    if (approves.length > 1) {
      return (ref = approves[approves.length - 2]) != null ? ref.description : void 0;
    }

    return "";
  },
  showApprove: function (approve) {
    var ref, ref1;

    if (!approve.sign_field_code || approve.sign_field_code === ((ref = Template.instance()) != null ? (ref1 = ref.data) != null ? ref1.name : void 0 : void 0)) {
      if (approve != null ? approve.is_read : void 0) {
        if (approve.is_finished) {
          return ["approved", "rejected", "submitted", "readed"].includes(approve.judge);
        }
      }
    }

    return false;
  },
  judge_description: function (judge) {
    return t(judge + "_description");
  },
  is_approved: function (judge) {
    return "approved" === judge;
  },
  is_rejected: function (judge) {
    return "rejected" === judge;
  },
  is_readed: function (judge) {
    return ["approved", "rejected", "submitted", "readed"].includes(judge);
  },
  addClass: function () {
    var name, ref, ref1;
    name = (ref = Template.instance()) != null ? (ref1 = ref.data) != null ? ref1.name : void 0 : void 0;
    setTimeout(function () {
      var e, element;

      try {
        element = $(".automatic.opinion-field-" + name);

        if (element.length > 0) {
          if (element != null ? element.is("td") : void 0) {
            return element.addClass('field-editable');
          } else {
            return $(".instance-sign", element).addClass('field-editable');
          }
        }
      } catch (error) {
        e = error;
        return console.log(e);
      }
    }, 1);
    return '';
  }
};

if (Meteor.isServer) {
  InstanceSignText.helpers.defaultDescription = function () {
    var locale;
    locale = Template.instance().view.template.steedosData.locale;
    return Template.instance().data.default_description || TAPi18n.__("instance_default_opinion", {}, locale);
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_traces_help.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_traces_help.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
TracesTemplate.helpers = {
  equals: function (a, b) {
    return a === b;
  },
  empty: function (a) {
    if (a) {
      return a.toString().trim().length < 1;
    } else {
      return true;
    }
  },
  unempty: function (a) {
    if (a) {
      return a.toString().trim().length > 0;
    } else {
      return false;
    }
  },
  append: function (a, b) {
    return a + b;
  },
  dateFormat: function (date) {
    if (Steedos.isMobile() && (date != null ? date.getFullYear() : void 0) === new Date().getFullYear()) {
      return $.format.date(new Date(date), "MM-dd HH:mm");
    } else {
      return $.format.date(new Date(date), "yyyy-MM-dd HH:mm");
    }
  },
  getStepName: function (stepId) {
    var step;
    step = WorkflowManager.getInstanceStep(stepId);

    if (step) {
      return step.name;
    }

    return null;
  },
  showDeleteButton: function (approved) {
    if (approved && approved.type === 'cc' && approved.from_user === Meteor.userId() && approved.is_finished !== true && !Session.get("instancePrint")) {
      return true;
    }

    return false;
  },
  isShowModificationButton: function (approved) {
    var approve_admins, isShow, ref, ref1, ref2;
    approve_admins = (ref = Meteor.settings) != null ? (ref1 = ref["public"]) != null ? (ref2 = ref1.workflow) != null ? ref2.approve_admins : void 0 : void 0 : void 0;

    if (approve_admins != null ? approve_admins.length : void 0) {
      isShow = approve_admins != null ? approve_admins.contains(Meteor.userId()) : void 0;
    }

    if (!isShow) {
      return false;
    }

    return approved.handler === Meteor.userId();
  },
  isEditing: function () {
    var ref;
    return (ref = Template.instance().is_editing) != null ? ref.get() : void 0;
  },
  isShowDescription: function (approved) {
    var ref;

    if (TracesTemplate.helpers.isShowModificationButton(approved)) {
      return true;
    }

    return ((ref = approved.description) != null ? ref.toString().trim().length : void 0) > 0;
  },
  isCC: function (approved) {
    if (approved && approved.type === 'cc') {
      return true;
    }

    return false;
  },
  getApproveStatusIcon: function (approveJudge, autoSubmitted) {
    var approveStatusIcon;

    if (autoSubmitted === true) {
      return 'ion ion-android-alarm-clock';
    }

    approveStatusIcon = void 0;

    switch (approveJudge) {
      case 'approved':
        approveStatusIcon = 'ion ion-checkmark-round';
        break;

      case 'rejected':
        approveStatusIcon = 'ion ion-close-round';
        break;

      case 'terminated':
        approveStatusIcon = 'fa fa-ban';
        break;

      case 'reassigned':
        approveStatusIcon = 'ion ion-android-contact';
        break;

      case 'relocated':
        approveStatusIcon = 'ion ion-arrow-shrink';
        break;

      case 'retrieved':
        approveStatusIcon = 'fa fa-undo';
        break;

      default:
        approveStatusIcon = '';
        break;
    }

    return approveStatusIcon;
  },
  getApproveStatusText: function (approveJudge, autoSubmitted) {
    var approveStatusText, locale;

    if (Meteor.isServer) {
      locale = Template.instance().view.template.steedosData.locale;

      if (locale.toLocaleLowerCase() === 'zh-cn') {
        locale = "zh-CN";
      }
    } else {
      locale = Session.get("TAPi18n::loaded_lang");
    }

    if (autoSubmitted === true) {
      return TAPi18n.__('instance_approve_timeout_auto_submitted', {}, locale);
    }

    approveStatusText = void 0;

    switch (approveJudge) {
      case 'approved':
        approveStatusText = TAPi18n.__('Instance State approved', {}, locale);
        break;

      case 'rejected':
        approveStatusText = TAPi18n.__('Instance State rejected', {}, locale);
        break;

      case 'terminated':
        approveStatusText = TAPi18n.__('Instance State terminated', {}, locale);
        break;

      case 'reassigned':
        approveStatusText = TAPi18n.__('Instance State reassigned', {}, locale);
        break;

      case 'relocated':
        approveStatusText = TAPi18n.__('Instance State relocated', {}, locale);
        break;

      case 'retrieved':
        approveStatusText = TAPi18n.__('Instance State retrieved', {}, locale);
        break;

      case 'returned':
        approveStatusText = TAPi18n.__('Instance State returned', {}, locale);
        break;

      case 'readed':
        approveStatusText = TAPi18n.__('Instance State readed', {}, locale);
        break;

      default:
        approveStatusText = '';
        break;
    }

    return approveStatusText;
  },
  getApproveJudgeClass: function (approveJudge, autoSubmitted) {
    if (autoSubmitted === true) {
      return 'autoSubmitted';
    }

    return approveJudge;
  },
  _t: function (key) {
    return TAPi18n.__(key);
  },
  myApproveDescription: function (approveId) {
    var myApprove, ref, ref1;

    if (Meteor.isClient) {
      if (Session.get("box") === 'inbox') {
        myApprove = (ref = Template.instance()) != null ? (ref1 = ref.myApprove) != null ? ref1.get() : void 0 : void 0;

        if (myApprove && myApprove.id === approveId) {
          if (!Session.get("instance_my_approve_description")) {
            return (myApprove != null ? myApprove.description : void 0) || "";
          }

          return Session.get("instance_my_approve_description");
        }
      }
    }
  },
  isForward: function (approved) {
    if (approved && approved.type === 'forward') {
      return true;
    }

    return false;
  },
  showForwardDeleteButton: function (approve) {
    if (db.instances.find(approve.forward_instance).count() === 0) {
      return false;
    }

    if (approve && approve.type === 'forward' && approve.from_user === Meteor.userId() && !Session.get("instancePrint") && approve.judge !== 'terminated') {
      return true;
    }

    return false;
  },
  markDownToHtml: function (markDownString) {
    if (markDownString) {
      return Spacebars.SafeString(marked.parse(markDownString));
    }
  },
  isDistribute: function (approve) {
    if (approve && approve.type === 'distribute') {
      return true;
    }

    return false;
  },
  showDistributeDeleteButton: function (approve) {
    var ins;

    if (db.instances.find(approve.forward_instance).count() === 0) {
      return false;
    }

    if (approve && approve.type === 'distribute' && !Session.get("instancePrint") && approve.judge !== 'terminated') {
      ins = db.instances.findOne({
        _id: approve.instance
      }, {
        fields: {
          flow: 1,
          space: 1
        }
      });

      if (ins && ins.flow && ins.space) {
        if (WorkflowManager.hasFlowAdminPermission(ins.flow, ins.space, Meteor.userId())) {
          return true;
        }
      }

      if (approve.from_user === Meteor.userId()) {
        return true;
      }
    }

    return false;
  },
  finishDateSchema: function () {
    if (Steedos.isAndroidOrIOS()) {
      return new SimpleSchema({
        finish_date: {
          autoform: {
            type: "datetime-local"
          },
          optional: false,
          type: Date
        }
      });
    } else {
      return new SimpleSchema({
        finish_date: {
          autoform: {
            type: "bootstrap-datetimepicker",
            readonly: true,
            dateTimePickerOptions: {
              format: "YYYY-MM-DD HH:mm",
              ignoreReadonly: true,
              locale: Session.get("TAPi18n::loaded_lang"),
              widgetPositioning: {
                horizontal: 'right'
              }
            }
          },
          optional: false,
          type: Date
        }
      });
    }
  },
  finishDateValues: function () {
    return {
      finish_date: this.finish_date
    };
  },
  /*
     	此函数用于控制是否显示traces view
     	true: 显示traces view,签核历程按钮点击后是直接定位到traces view
     	false: 不显示traces view，签核历程按钮点击后,以Modal 方式显示traces view
   */showTracesView: function (form, form_version) {
    var ref, show_modal_traces_list;
    show_modal_traces_list = ((ref = db.space_settings.findOne({
      space: Session.get("spaceId"),
      key: "show_modal_traces_list"
    })) != null ? ref.values : void 0) || false;
    return !show_modal_traces_list;
  },
  getInstanceStateText: function (instance_id) {
    var ins, locale, text;

    if (Meteor.isServer) {
      locale = Template.instance().view.template.steedosData.locale;

      if (locale.toLocaleLowerCase() === 'zh-cn') {
        locale = "zh-CN";
      }
    } else {
      locale = Session.get("TAPi18n::loaded_lang");
    }

    ins = db.instances.findOne({
      _id: instance_id
    }, {
      fields: {
        state: 1,
        is_read: 1
      }
    });

    if (!ins) {
      return TAPi18n.__('instance_deleted', {}, locale);
    }

    text = '';

    if (ins.state === 'completed') {
      text = TAPi18n.__('completed', {}, locale);
    } else if (ins.state === 'pending') {
      text = TAPi18n.__('pending', {}, locale);
    } else if (ins.state === 'draft') {
      if (ins.is_read) {
        text = TAPi18n.__('instance_approve_read', {}, locale);
      } else {
        text = TAPi18n.__('instance_approve_not_yet_handled', {}, locale);
      }
    }

    return text;
  },
  getInstanceStateColor: function (instance_id) {
    var cla, ins;
    ins = db.instances.findOne({
      _id: instance_id
    }, {
      fields: {
        state: 1,
        is_read: 1
      }
    });

    if (!ins) {
      return "";
    }

    cla = '';

    if (ins.state === 'draft') {
      if (ins.is_read) {
        cla = 'blue';
      } else {
        cla = 'red';
      }
    }

    return cla;
  },
  firstTrace: function (index) {
    return index === 0;
  },
  last_distribute_from: function (instance_id) {
    var dis_info, ins, user;
    ins = db.instances.findOne({
      _id: instance_id,
      distribute_from_instance: {
        $exists: true
      }
    }, {
      fields: {
        created: 1,
        created_by: 1
      }
    });

    if (ins) {
      dis_info = {};
      user = {};

      if (Meteor.isClient) {
        user = UUflow_api.getNameForUser(ins.created_by);
      } else if (Meteor.isServer) {
        user = db.users.findOne({
          _id: ins.created_by
        }, {
          fields: {
            name: 1
          }
        });
      }

      if (user.name) {
        dis_info.from_user = user._id;
        dis_info.from_user_name = user.name;
        dis_info.created = ins.created;
      }

      if (!_.isEmpty(dis_info)) {
        return dis_info;
      }
    }
  },
  isCCOrDistributeOrForwardTerminated: function (approve) {
    if ((approve.type === 'cc' || approve.type === 'distribute' || approve.type === 'forward') && approve.judge === 'terminated') {
      return true;
    }

    return false;
  },
  judgeTerminated: function (judge) {
    return judge === 'terminated';
  },
  instanceExists: function (instance_id) {
    return !!db.instances.find(instance_id).count();
  },
  agentDescription: function (userName) {
    var locale;

    if (Meteor.isServer) {
      locale = Template.instance().view.template.steedosData.locale;

      if (locale.toLocaleLowerCase() === 'zh-cn') {
        locale = "zh-CN";
      }
    } else {
      locale = Session.get("TAPi18n::loaded_lang");
    }

    return TAPi18n.__('process_delegation_rules_description', {
      userName: userName
    }, locale);
  },
  traceName: function (instance_id, traceId) {
    var ref, ref1;
    return (ref = _.find((ref1 = db.instances.findOne(instance_id, {
      fields: {
        traces: 1
      }
    })) != null ? ref1.traces : void 0, function (trace) {
      return trace._id === traceId;
    })) != null ? ref.name : void 0;
  },
  objectUrl: function (object_name, record_id, app_id) {
    return Creator.getObjectUrl(object_name, record_id, app_id);
  }
};

if (Meteor.isServer) {
  TracesTemplate.helpers.dateFormat = function (date) {
    var utcOffset;

    if (date) {
      utcOffset = Template.instance().view.template.steedosData.utcOffset;
      return InstanceReadOnlyTemplate.formatDate(date, utcOffset);
    }
  };

  TracesTemplate.helpers._t = function (key) {
    var locale;
    locale = Template.instance().view.template.steedosData.locale;
    return TAPi18n.__(key, {}, locale);
  };

  TracesTemplate.helpers.showDeleteButton = function (approved) {
    return false;
  };
}

TracesTemplate.events = {
  'click .cc-approve-remove': function (event, template) {
    var approveId, instanceId;
    event.stopPropagation();

    if (event.currentTarget.dataset.calling * 1 !== 1) {
      event.currentTarget.dataset.calling = 1;
      $("i", event.currentTarget).addClass("fa-spin");
      instanceId = Session.get('instanceId');
      approveId = event.target.dataset.approve;
      $("body").addClass("loading");
      Meteor.call('cc_remove', instanceId, approveId, function (err, result) {
        $("body").removeClass("loading");

        if (err) {
          toastr.error(err);
          event.currentTarget.dataset.calling = 0;
          $("i", event.currentTarget).removeClass("fa-spin");
        }

        if (result === true) {
          toastr.success(TAPi18n.__("remove_cc_approve"));

          if ($(".instance-trace-detail-modal").length) {
            Modal.hide("instance_trace_detail_modal");
          }
        }
      });
    }
  },
  'click .instance-trace-detail-modal .btn-cc-approve-remove': function (event, template) {
    var approveId, instanceId;
    instanceId = Session.get('instanceId');
    approveId = event.target.dataset.approve;
    $("body").addClass("loading");
    Meteor.call('cc_remove', instanceId, approveId, function (err, result) {
      $("body").removeClass("loading");

      if (err) {
        toastr.error(err);
      }

      if (result === true) {
        toastr.success(TAPi18n.__("remove_cc_approve"));
        Modal.hide("instance_trace_detail_modal");
      }
    });
  },
  'click .approve-item,.approve-description': function (event, template) {
    if (!$(event.target).closest("a.btn-link").length) {
      return Modal.show("instance_trace_detail_modal", this);
    }
  },
  'taphold .approve-item,.approve-description': function (event, template) {
    if (!$(event.target).closest("a.btn-link").length) {
      return Modal.show("instance_trace_detail_modal", this);
    }
  },
  'click .approve-item a.btn-link,.approve-description a.btn-link,.approve-item-distribute a.btn-link': function (event, template) {
    var ref, userId;

    if (Steedos.isMobile()) {
      userId = (ref = event.target.dataset) != null ? ref.target_user_id : void 0;
      return Creator.openSafeObjectUrl('users', userId);
    }
  },
  'tapend .approve-item,.approve-description': function (event, template) {
    if (!$(event.target).closest("a.btn-link").length) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  },
  'click .instance-trace-detail-modal .btn-forward-approve-remove': function (event, template) {
    var approveId, instanceId, traceId;
    instanceId = Session.get('instanceId');
    approveId = event.target.dataset.approve;
    traceId = event.target.dataset.trace;
    $("body").addClass("loading");
    Meteor.call('forward_remove', instanceId, traceId, approveId, function (err, result) {
      $("body").removeClass("loading");

      if (err) {
        toastr.error(TAPi18n.__(err.reason));
      }

      if (result === true) {
        toastr.success(TAPi18n.__("instance_approve_forward_remove_success"));
        Modal.hide("instance_trace_detail_modal");
      }
    });
  },
  'click .instance-trace-detail-modal .btn-forward-instance-look': function (event, template) {
    var forward_instance, forward_space;
    forward_space = event.target.dataset.forwardspace;
    forward_instance = event.target.dataset.forwardinstance;
    return Steedos.openWindow(Steedos.absoluteUrl("workflow/space/" + forward_space + "/view/readonly/" + forward_instance));
  },
  'click .btn-modification': function (event, template) {
    template.is_editing.set(!template.is_editing.get());

    if (!Steedos.isAndroidOrIOS()) {
      return Tracker.afterFlush(function () {
        return $("#instance_trace_detail_modal #finish_input").on("dp.show", function () {
          return $(".modal-body").scrollTop(100);
        });
      });
    }
  },
  'click .btn-cancelBut': function (event, template) {
    return template.is_editing.set(!template.is_editing.get());
  },
  'click .btn-saveBut': function (event, template) {
    var approveId, finish_input, instanceId, opinion_input, traceId;
    instanceId = Session.get('instanceId');
    approveId = event.target.dataset.approve;
    traceId = event.target.dataset.trace;
    opinion_input = $('#opinion_input').val();
    finish_input = AutoForm.getFieldValue("finish_date", "finishDateAutoForm");
    $("body").addClass("loading");
    return Meteor.call('change_approve_info', instanceId, traceId, approveId, opinion_input, finish_input, function (err, result) {
      $("body").removeClass("loading");

      if (err) {
        toastr.error(TAPi18n.__(err.reason));
      }

      if (result === true) {
        toastr.success(t("instance_approve_modal_modificationsave"));
        Modal.hide("instance_trace_detail_modal");
      }
    });
  },
  'click .instance-trace-detail-modal .btn-distribute-approve-remove': function (event, template) {
    Modal.allowMultiple = true;
    return Modal.show('cancel_distribute_modal');
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_related_instances.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_related_instances.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RelatedInstances.helpers = {
  showRelatedInstaces: function () {
    var ins;

    if (Meteor.isClient) {
      ins = WorkflowManager.getInstance();
    } else {
      ins = this.instance;
    }

    if ((ins != null ? ins.related_instances : void 0) && _.isArray(ins != null ? ins.related_instances : void 0)) {
      if (db.instances.find({
        _id: {
          $in: ins.related_instances
        }
      }, {
        fields: {
          space: 1,
          name: 1
        }
      }).count() > 0) {
        return true;
      }

      return false;
    } else {
      return false;
    }
  },
  related_instaces: function () {
    var ins;

    if (Meteor.isClient) {
      ins = WorkflowManager.getInstance();
    } else {
      ins = this.instance;
    }

    if ((ins != null ? ins.related_instances : void 0) && _.isArray(ins != null ? ins.related_instances : void 0)) {
      return db.instances.find({
        _id: {
          $in: ins.related_instances
        }
      }, {
        fields: {
          space: 1,
          name: 1
        }
      }).fetch();
    }
  },
  related_instace_url: function (ins) {
    var absolute;

    if (Meteor.isClient && (Steedos.isMobile() || Steedos.isCordova())) {
      return '';
    }

    absolute = false;

    if (Meteor.isServer) {
      absolute = this.absolute;
    }

    if (absolute) {
      return Meteor.absoluteUrl("workflow/space/" + ins.space + "/view/readonly/" + ins._id + '?hide_traces=0');
    } else {
      return Steedos.absoluteUrl("workflow/space/" + ins.space + "/view/readonly/" + ins._id + '?hide_traces=0');
    }
  },
  _t: function (key) {
    var locale;

    if (Meteor.isClient) {
      return TAPi18n.__(key);
    } else {
      locale = Template.instance().view.template.steedosData.locale;
      return TAPi18n.__(key, {}, locale);
    }
  },
  show_delete: function () {
    var current_step;

    if (!Meteor.isClient) {
      return false;
    } else {
      if (Session.get("box") === "draft" || Session.get("box") === 'inbox') {
        current_step = InstanceManager.getCurrentStep();

        if (current_step) {
          if (current_step.can_edit_main_attach || current_step.can_edit_normal_attach === true || current_step.can_edit_normal_attach === void 0) {
            return true;
          }
        }
      }
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_related_records.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/client/views/instance/_related_records.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RelatedRecords.helpers = {
  showRelatedRecords: function () {
    var ins;

    if (Meteor.isClient) {
      ins = WorkflowManager.getInstance();
    } else {
      ins = this.instance;
    }

    if (!ins) {
      return false;
    }

    return !_.isEmpty(ins.record_ids);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"routes":{"designer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/designer.coffee                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var DesignerAPI;
DesignerAPI = {
  getAbsoluteUrl: function (url) {
    var rootUrl;
    rootUrl = __meteor_runtime_config__ ? __meteor_runtime_config__.ROOT_URL_PATH_PREFIX : "";

    if (rootUrl) {
      url = rootUrl + url;
    }

    return url;
  },
  writeResponse: function (res, httpCode, body) {
    res.statusCode = httpCode;
    return res.end(body);
  },
  sendInvalidURLResponse: function (res) {
    return this.writeResponse(res, 404, "the param 'url' is required as querys.");
  },
  sendAuthTokenExpiredResponse: function (res) {
    return this.writeResponse(res, 401, "the auth_token has expired.");
  },
  sendHtmlResponse: function (req, res, type) {
    var error_msg, query, title, url;
    query = req.query;
    url = query.url;

    if (url) {
      url = decodeURIComponent(url);
    } else {
      DesignerAPI.sendInvalidURLResponse(res);
    }

    title = query.title;

    if (title) {
      title = decodeURIComponent(title);
    } else {
      title = "Steedos Designer";
    }

    error_msg = "";
    return this.writeResponse(res, 200, "<html>\n	<head>\n		<style>\n			html,body{\n				margin: 0;\n				padding: 0;\n				height: 100%;\n			}\n			body { \n				font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n				text-align: center;\n				background-color: #fff;\n			}\n			.loading{\n				position: absolute;\n				left: 0px;\n				right: 0px;\n				top: 50%;\n				z-index: -1;/*设置为-1，可以在iframe加载出来后自动消失*/\n				text-align: center;\n				margin-top: -30px;\n				font-size: 36px;\n				color: #dfdfdf;\n			}\n			.error-msg{\n				position: absolute;\n				left: 0px;\n				right: 0px;\n				bottom: 20px;\n				z-index: 1100;\n				text-align: center;\n				font-size: 20px;\n				color: #a94442;\n			}\n		</style>\n		<meta charset=\"utf-8\">\n		<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n		<title>" + title + "</title>\n		<link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"" + this.getAbsoluteUrl("/favicons/android-chrome-192x192.png") + "\">\n		<link rel=\"manifest\" href=\"" + this.getAbsoluteUrl("/favicons/manifest.json") + "\">\n		<meta name=\"mobile-web-app-capable\" content=\"yes\">\n		<meta name=\"theme-color\" content=\"#000\">\n		<meta name=\"application-name\">\n		<link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-57x57.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-60x60.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-72x72.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-76x76.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-114x114.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-120x120.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-144x144.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-152x152.png") + "\">\n		<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"" + this.getAbsoluteUrl("/favicons/apple-touch-icon-180x180.png") + "\">\n		<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n		<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\">\n		<meta name=\"apple-mobile-web-app-title\">\n		<link rel=\"icon\" type=\"image/png\" sizes=\"228x228\" href=\"" + this.getAbsoluteUrl("/favicons/coast-228x228.png") + "\">\n		<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"" + this.getAbsoluteUrl("/favicons/favicon-16x16.png") + "\">\n		<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"" + this.getAbsoluteUrl("/favicons/favicon-32x32.png") + "\">\n		<link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"" + this.getAbsoluteUrl("/favicons/favicon-96x96.png") + "\">\n		<link rel=\"icon\" type=\"image/png\" sizes=\"230x230\" href=\"" + this.getAbsoluteUrl("/favicons/favicon-230x230.png") + "\">\n		<link rel=\"shortcut icon\" href=\"" + this.getAbsoluteUrl("/favicons/favicon.ico") + "\">\n		<link rel=\"yandex-tableau-widget\" href=\"" + this.getAbsoluteUrl("/favicons/yandex-browser-manifest.json") + "\">\n		<meta name=\"msapplication-TileColor\" content=\"#fff\">\n		<meta name=\"msapplication-TileImage\" content=\"" + this.getAbsoluteUrl("/favicons/mstile-144x144.png") + "\">\n		<meta name=\"msapplication-config\" content=\"" + this.getAbsoluteUrl("/favicons/browserconfig.xml") + "\">\n		<meta property=\"twitter:image\" content=\"" + this.getAbsoluteUrl("/favicons/twitter.png") + "\">\n		<meta property=\"og:image\" content=\"" + this.getAbsoluteUrl("/favicons/open-graph.png") + "\">\n	</head>\n	<body>\n		<div class = \"loading\">Loading...</div>\n		<div class = \"error-msg\">" + error_msg + "</div>\n		<iframe id=\"ifrDesigner\" src=\"\" width=\"100%\" height=\"100%\" nwdisable=\"true\" frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" allowtransparency=\"yes\"></iframe>\n		<script type=\"text/javascript\" src=\"" + this.getAbsoluteUrl("/lib/jquery/jquery-1.11.2.min.js") + "\"></script>\n		<script type=\"text/javascript\">\n			var designer = {\n				urlQuery:function(name){\n					var reg = new RegExp(\"(^|&)\" + name + \"=([^&]*)(&|$)\");\n					var r = window.location.search.substr(1).match(reg);\n					if (r != null) return unescape(r[2]);\n					return null;\n				},\n				run:function(){\n					var url = this.urlQuery(\"url\");\n					url = decodeURIComponent(url);\n					\n					if(url){\n						$(\"#ifrDesigner\").attr(\"src\",url);\n					}\n					var Steedos = window.opener.Steedos || null;\n					if (Steedos) {\n						Steedos.forbidNodeContextmenu(window);\n					}\n				}\n			};\n			$(function(){\n				designer.run();\n			});\n		</script>\n	<body>\n</html>");
  }
};
JsonRoutes.add('get', '/api/workflow/designer?url=:url', function (req, res, next) {
  return DesignerAPI.sendHtmlResponse(req, res);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getSpaceUsers.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/getSpaceUsers.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
JsonRoutes.add("post", "/api/workflow/getSpaceUsers", function (req, res, next) {
  var userIds = req.body.userIds,
      spaceId = req.query.spaceId,
      spaceUsers = [];

  if (!userIds || !spaceId) {
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '缺少参数'
      }
    });
  }

  spaceUsers = WorkflowManager.getUsers(spaceId, userIds);
  JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      'spaceUsers': spaceUsers
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getFormulaUserObjects.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/getFormulaUserObjects.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
JsonRoutes.add("post", "/api/workflow/getFormulaUserObjects", function (req, res, next) {
  var userIds = req.body.userIds,
      spaceId = req.query.spaceId,
      spaceUsers = [];

  if (!userIds || !spaceId) {
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '缺少参数'
      }
    });
  }

  var users = WorkflowManager.getFormulaUserObject(spaceId, userIds);
  JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      'spaceUsers': users
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"init_formula_values.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/init_formula_values.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
JsonRoutes.add("post", "/api/workflow/init_formula_values", function (req, res, next) {
  var fields = req.body.fields,
      autoFormDoc = req.body.autoFormDoc,
      approver = req.body.approver,
      applicant = req.body.applicant,
      spaceId = req.query.spaceId,
      spaceUsers = [];

  if (!fields || !spaceId || !autoFormDoc || !approver || !applicant) {
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '缺少参数'
      }
    });
    return;
  }

  formula_values = Form_formula.init_formula_values(fields, autoFormDoc, approver, applicant, spaceId);
  JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      'formula_values': formula_values
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getNameForUser.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/getNameForUser.coffee                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("post", "/api/workflow/getNameForUser", function (req, res, next) {
  var e, user, userId;

  try {
    userId = req.body.userId;

    if (!userId) {
      JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          'errors': '缺少参数'
        }
      });
    }

    user = WorkflowManager.getNameForUser(userId);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        user: user
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_designer_startup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_designer_startup.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('get', '/api/designer/startup', function (req, res, next) {
  var categories, companyId, current_user, current_user_info, e, flows, forms, org, organizations, positions, query, ref, result, roles, spaceIds, spaceUsers, spaces, spacesQuery, userIds, users;

  try {
    current_user_info = uuflowManager.check_authorization(req);
    current_user = current_user_info._id;
    companyId = ((ref = req.query) != null ? ref.companyId : void 0) || '';
    spacesQuery = {
      admins: current_user
    };

    if (companyId) {
      org = db.organizations.findOne(companyId, {
        fields: {
          space: 1
        }
      });

      if (!org) {
        throw new Meteor.Error('error', 'companyId is invalid');
      }

      spacesQuery = {
        _id: org.space
      };
    }

    spaces = db.spaces.find(spacesQuery).fetch();
    spaceIds = _.pluck(spaces, '_id');
    query = {
      space: {
        $in: spaceIds
      }
    };

    if (companyId) {
      query.company_id = companyId;
    }

    spaceUsers = db.space_users.find(query).fetch();
    forms = db.forms.find(query, {
      fields: {
        name: 1,
        state: 1,
        is_deleted: 1,
        is_valid: 1,
        space: 1,
        description: 1,
        help_text: 1,
        created: 1,
        created_by: 1,
        current: 1,
        category: 1,
        instance_style: 1,
        company_id: 1
      }
    }).fetch();
    flows = db.flows.find(query, {
      fields: {
        name: 1,
        name_formula: 1,
        code_formula: 1,
        space: 1,
        description: 1,
        is_valid: 1,
        form: 1,
        flowtype: 1,
        state: 1,
        is_deleted: 1,
        created: 1,
        created_by: 1,
        help_text: 1,
        current_no: 1,
        current: 1,
        perms: 1,
        error_message: 1,
        distribute_optional_users: 1,
        company_id: 1
      }
    }).fetch();
    roles = db.flow_roles.find(query).fetch();
    organizations = db.organizations.find(query).fetch();
    positions = db.flow_positions.find(query).fetch();
    categories = db.categories.find({
      space: {
        $in: spaceIds
      }
    }).fetch();
    userIds = _.pluck(spaceUsers, 'user');
    users = db.users.find({
      _id: {
        $in: userIds
      }
    }, {
      fields: {
        name: 1
      }
    }).fetch();
    result = {};
    result.SpaceUsers = spaceUsers;
    result.Users = users;
    result.Forms = forms;
    result.Flows = flows;
    result.Organizations = organizations;
    result.Positions = positions;
    result.Roles = roles;
    result.Categories = categories;
    result.Spaces = spaces;
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: result
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_drafts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_drafts.coffee                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('post', '/api/workflow/drafts', function (req, res, next) {
  var current_user, current_user_info, e, hashData, inserted_instances;

  try {
    current_user_info = uuflowManager.check_authorization(req);
    current_user = current_user_info._id;
    hashData = req.body;
    inserted_instances = new Array();

    _.each(hashData['Instances'], function (instance_from_client) {
      var new_ins, new_ins_id;
      new_ins_id = uuflowManager.create_instance(instance_from_client, current_user_info);
      new_ins = db.instances.findOne({
        _id: new_ins_id
      }, {
        fields: {
          space: 1,
          flow: 1,
          flow_version: 1,
          form: 1,
          form_version: 1
        }
      });
      return inserted_instances.push(new_ins);
    });

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        inserts: inserted_instances
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_remove.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_remove.coffee                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('post', '/api/workflow/remove', function (req, res, next) {
  var current_user, current_user_info, e, hashData, inserted_instances;

  try {
    current_user_info = uuflowManager.check_authorization(req);
    current_user = current_user_info._id;
    hashData = req.body;
    inserted_instances = new Array();

    _.each(hashData['Instances'], function (instance_from_client) {
      var cc_users, delete_obj, flow, inbox_users, instance, space, spaceUserOrganizations, space_id, space_user, user_ids;
      instance = uuflowManager.getInstance(instance_from_client["_id"]);
      space_id = instance.space;
      space = uuflowManager.getSpace(space_id);
      space_user = uuflowManager.getSpaceUser(space_id, current_user);
      flow = db.flows.findOne({
        _id: instance.flow
      });
      spaceUserOrganizations = db.organizations.find({
        _id: {
          $in: space_user.organizations
        }
      }).fetch();

      if (instance.submitter !== current_user && !space.admins.includes(current_user) && !WorkflowManager.canAdmin(flow, space_user, spaceUserOrganizations)) {
        throw new Meteor.Error('error!', "您不能删除此申请单。");
      }

      delete_obj = db.instances.findOne(instance_from_client["_id"]);
      delete_obj.deleted = new Date();
      delete_obj.deleted_by = current_user;
      db.deleted_instances.insert(delete_obj);
      db.instances.remove(instance_from_client["_id"]);

      if (delete_obj.state !== "draft") {
        inbox_users = delete_obj.inbox_users ? delete_obj.inbox_users : [];
        cc_users = delete_obj.cc_users ? delete_obj.cc_users : [];
        user_ids = _.uniq(inbox_users.concat(cc_users));

        _.each(user_ids, function (u_id) {
          return pushManager.send_message_to_specifyUser("terminate_approval", u_id);
        });

        return pushManager.send_instance_notification("monitor_delete_applicant", delete_obj, "", current_user_info);
      }
    });

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        inserts: inserted_instances
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_reassign.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_reassign.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('post', '/api/workflow/reassign', function (req, res, next) {
  var current_user, current_user_info, e, hashData;

  try {
    current_user_info = uuflowManager.check_authorization(req);
    current_user = current_user_info._id;
    hashData = req.body;

    _.each(hashData['Instances'], function (instance_from_client) {
      var _users, approve_users_handlers, assignee_appr, current_space_user, current_user_organization, i, inbox_users, inbox_users_from_client, ins, instance, instance_id, last_trace, last_trace_from_client, new_inbox_users, not_in_inbox_users, now, permissions, r, reassign_reason, setObj, space, space_id;

      instance_id = instance_from_client['_id'];
      instance = uuflowManager.getInstance(instance_id);
      space_id = instance.space;
      uuflowManager.isInstancePending(instance);
      last_trace_from_client = _.last(instance_from_client["traces"]);
      last_trace = _.find(instance.traces, function (t) {
        return t._id === last_trace_from_client["_id"];
      });

      if (last_trace.is_finished === true) {
        return;
      }

      permissions = permissionManager.getFlowPermissions(instance.flow, current_user);
      space = db.spaces.findOne({
        _id: space_id
      }, {
        fields: {
          admins: 1
        }
      });

      if (!permissions.includes("admin") && !space.admins.includes(current_user)) {
        throw new Meteor.Error('error!', "用户没有对当前流程的管理权限");
      }

      inbox_users = instance.inbox_users;
      inbox_users_from_client = instance_from_client["inbox_users"];
      reassign_reason = instance_from_client["reassign_reason"];
      not_in_inbox_users = _.difference(inbox_users, inbox_users_from_client);
      new_inbox_users = _.difference(inbox_users_from_client, inbox_users);

      if (not_in_inbox_users.length === 0 && new_inbox_users.length === 0) {
        return;
      }

      setObj = new Object();
      now = new Date();
      i = 0;
      approve_users_handlers = [];

      while (i < last_trace.approves.length) {
        if (not_in_inbox_users.includes(last_trace.approves[i].handler)) {
          if (last_trace.approves[i].is_finished === false && last_trace.approves[i].type !== "cc" && last_trace.approves[i].type !== "distribute") {
            last_trace.approves[i].is_finished = true;
            last_trace.approves[i].finish_date = now;
            last_trace.approves[i].judge = "terminated";
            last_trace.approves[i].description = "";
            last_trace.approves[i].cost_time = last_trace.approves[i].finish_date - last_trace.approves[i].start_date;
            approve_users_handlers.push(last_trace.approves[i].user);
            approve_users_handlers.push(last_trace.approves[i].handler);
          }
        }

        i++;
      }

      current_space_user = uuflowManager.getSpaceUser(space_id, current_user);
      current_user_organization = db.organizations.findOne({
        _id: current_space_user.organization
      }, {
        fields: {
          name: 1,
          fullname: 1
        }
      });
      assignee_appr = new Object();
      assignee_appr._id = new Mongo.ObjectID()._str;
      assignee_appr.instance = last_trace.instance;
      assignee_appr.trace = last_trace._id;
      assignee_appr.is_finished = true;
      assignee_appr.user = current_user;
      assignee_appr.user_name = current_user_info.name;
      assignee_appr.handler = current_user;
      assignee_appr.handler_name = current_user_info.name;
      assignee_appr.handler_organization = current_space_user.organization;
      assignee_appr.handler_organization_name = current_user_organization.name;
      assignee_appr.handler_organization_fullname = current_user_organization.fullname;
      assignee_appr.start_date = now;
      assignee_appr.finish_date = now;
      assignee_appr.due_date = last_trace.due_date;
      assignee_appr.read_date = now;
      assignee_appr.judge = "reassigned";
      assignee_appr.is_read = true;
      assignee_appr.description = reassign_reason;
      assignee_appr.is_error = false;
      assignee_appr.values = new Object();
      assignee_appr.cost_time = assignee_appr.finish_date - assignee_appr.start_date;
      last_trace.approves.push(assignee_appr);

      _.each(new_inbox_users, function (user_id) {
        var agent, handler_id, handler_info, new_appr, new_user, space_user, user_organization;
        new_user = db.users.findOne(user_id, {
          fields: {
            name: 1
          }
        });
        space_user = uuflowManager.getSpaceUser(space_id, user_id);
        user_organization = db.organizations.findOne(space_user.organization, {
          fields: {
            name: 1,
            fullname: 1
          }
        });
        new_appr = new Object();
        new_appr._id = new Mongo.ObjectID()._str;
        new_appr.instance = last_trace.instance;
        new_appr.trace = last_trace._id;
        new_appr.is_finished = false;
        new_appr.user = user_id;
        new_appr.user_name = new_user.name;
        handler_id = user_id;
        handler_info = new_user;
        agent = uuflowManager.getAgent(space_id, user_id);

        if (agent) {
          inbox_users_from_client[inbox_users_from_client.indexOf(user_id)] = agent;
          handler_id = agent;
          handler_info = db.users.findOne({
            _id: agent
          }, {
            fields: {
              name: 1
            }
          });
          new_appr.agent = agent;
        }

        new_appr.handler = handler_id;
        new_appr.handler_name = handler_info.name;
        new_appr.handler_organization = space_user.organization;
        new_appr.handler_organization_name = user_organization.name;
        new_appr.handler_organization_fullname = user_organization.fullname;
        new_appr.from_user = current_user;
        new_appr.from_user_name = current_user_info.name;
        new_appr.type = "reassign";
        new_appr.start_date = now;
        new_appr.due_date = last_trace.due_date;
        new_appr.is_read = false;
        new_appr.is_error = false;
        new_appr.values = new Object();
        uuflowManager.setRemindInfo(instance.values, new_appr);
        return last_trace.approves.push(new_appr);
      });

      instance.outbox_users.push(current_user);
      instance.outbox_users = instance.outbox_users.concat(approve_users_handlers);
      setObj.outbox_users = _.uniq(instance.outbox_users);
      setObj.inbox_users = inbox_users_from_client;
      setObj.modified = now;
      setObj.modified_by = current_user;
      setObj["traces.$.approves"] = last_trace.approves;
      r = db.instances.update({
        _id: instance_id,
        "traces._id": last_trace._id
      }, {
        $set: setObj
      });

      if (r) {
        ins = uuflowManager.getInstance(instance_id);
        pushManager.send_message_current_user(current_user_info);

        _.each(not_in_inbox_users, function (user_id) {
          if (user_id !== current_user) {
            return pushManager.send_message_to_specifyUser("current_user", user_id);
          }
        });

        _users = new Array();

        _users.push(ins.applicant);

        _users.push(ins.submitter);

        _users = _.uniq(_users.concat(ins.outbox_users));

        _.each(_users, function (user_id) {
          return pushManager.send_message_to_specifyUser("current_user", user_id);
        });

        pushManager.send_instance_notification("reassign_new_inbox_users", ins, reassign_reason, current_user_info);
        return pushManager.triggerWebhook(ins.flow, ins, {}, 'reassign', current_user, ins.inbox_users);
      }
    });

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {}
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_archive.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_archive.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('post', '/api/workflow/archive', function (req, res, next) {
  var current_user, current_user_info, e, hashData;

  try {
    current_user_info = uuflowManager.check_authorization(req);
    current_user = current_user_info._id;
    hashData = req.body;

    _.each(hashData['Instances'], function (instance_from_client) {
      var instance, instance_id, setObj, space, space_id, space_user;
      instance_id = instance_from_client["_id"];
      instance = uuflowManager.getInstance(instance_id);
      space_id = instance.space;
      space = uuflowManager.getSpace(space_id);
      uuflowManager.isInstanceFinishedAndNotArchieved(instance);
      space_user = uuflowManager.getSpaceUser(space_id, current_user);
      uuflowManager.isInstanceSubmitterOrApplicantOrSpaceAdmin(instance, current_user, space);
      setObj = new Object();
      setObj.is_archived = true;
      setObj.modified = new Date();
      setObj.modified_by = current_user;
      return db.instances.update({
        _id: instance_id
      }, {
        $set: setObj
      });
    });

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {}
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_export.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_export.coffee                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {
  return WebApp.connectHandlers.use("/api/workflow/export/instances", function (req, res, next) {
    var current_user_info, e, ejs, end_date, fields, fileName, flow, flow_id, flow_ids, form, form_name, formatDate, ins_to_xls, lang, last_month_date, now, query, ret, selector, space, space_id, start_date, str, table_fields, template, timezoneoffset, type, uid, utcOffset;

    try {
      current_user_info = uuflowManager.check_authorization(req);
      query = req.query;
      space_id = query.space_id;
      flow_id = query.flow_id;
      type = parseInt(query.type);
      timezoneoffset = parseInt(query.timezoneoffset);
      flow = db.flows.findOne({
        _id: flow_id
      }, {
        fields: {
          form: 1
        }
      });
      form = db.forms.findOne({
        _id: flow.form
      }, {
        fields: {
          name: 1,
          'current.fields': 1
        }
      });
      form_name = form.name;
      fields = form.current.fields;
      table_fields = new Array();

      _.each(form.current.fields, function (field) {
        if (field.type === "table") {
          return table_fields.push(field);
        }
      });

      ins_to_xls = new Array();
      start_date = null;
      end_date = null;
      now = new Date();
      selector = {
        space: space_id,
        flow: flow_id
      };
      selector.state = {
        $in: ["pending", "completed"]
      };
      uid = current_user_info._id;
      space = db.spaces.findOne(space_id);

      if (!space) {
        selector.state = "none";
      }

      if (!space.admins.includes(uid)) {
        flow_ids = WorkflowManager.getMyAdminOrMonitorFlows(space_id, uid);

        if (!flow_ids.includes(selector.flow)) {
          selector.$or = [{
            submitter: uid
          }, {
            applicant: uid
          }, {
            inbox_users: uid
          }, {
            outbox_users: uid
          }];
        }
      }

      if (type === 0) {
        start_date = new Date(now.getFullYear(), now.getMonth(), 1);
        selector.submit_date = {
          $gte: start_date
        };
        ins_to_xls = db.instances.find(selector, {
          sort: {
            submit_date: 1
          }
        }).fetch();
      } else if (type === 1) {
        last_month_date = new Date(new Date(now.getFullYear(), now.getMonth(), 1) - 1000 * 60 * 60 * 24);
        start_date = new Date(last_month_date.getFullYear(), last_month_date.getMonth(), 1);
        end_date = new Date(now.getFullYear(), now.getMonth(), 1);
        selector.submit_date = {
          $gte: start_date,
          $lte: end_date
        };
        ins_to_xls = db.instances.find(selector, {
          sort: {
            submit_date: 1
          }
        }).fetch();
      } else if (type === 2) {
        start_date = new Date(now.getFullYear(), 0, 1);
        selector.submit_date = {
          $gte: start_date
        };
        ins_to_xls = db.instances.find(selector, {
          sort: {
            submit_date: 1
          }
        }).fetch();
      } else if (type === 3) {
        ins_to_xls = db.instances.find(selector, {
          sort: {
            submit_date: 1
          }
        }).fetch();
      }

      ejs = require('ejs');
      str = Assets.getText('server/ejs/export_instances.ejs');
      template = ejs.compile(str);
      lang = 'en';

      if (current_user_info.locale === 'zh-cn') {
        lang = 'zh-CN';
      }

      utcOffset = timezoneoffset / -60;

      formatDate = function (date, formater) {
        return moment(date).utcOffset(utcOffset).format(formater);
      };

      ret = template({
        lang: lang,
        formatDate: formatDate,
        form_name: form_name,
        fields: fields,
        table_fields: table_fields,
        ins_to_xls: ins_to_xls
      });
      fileName = "SteedOSWorkflow_" + moment().format('YYYYMMDDHHmm') + ".xls";
      res.setHeader("Content-type", "application/octet-stream");
      res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
      return res.end(ret);
    } catch (error) {
      e = error;
      console.error(e.stack);
      return res.end(e.message);
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_space_changeset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_space_changeset.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('get', '/uf/space/changeset', function (req, res, next) {
  var auth_token, data, e, formids, is_admin, query, sync_token;

  try {
    query = req.query;
    auth_token = db.auth_tokens.findOne({
      auth_token: query.auth_token
    });

    if (!auth_token || !auth_token.enabled) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    sync_token = query["sync_token"];
    formids = query["formids"];
    is_admin = query["is_admin"];
    data = uuflowManager.get_SpaceChangeSet(formids, is_admin, sync_token);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: data
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_retrieve.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_retrieve.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('post', '/api/workflow/retrieve', function (req, res, next) {
  var current_user, current_user_info, e, hashData;

  try {
    current_user_info = uuflowManager.check_authorization(req);
    current_user = current_user_info._id;
    hashData = req.body;

    _.each(hashData['Instances'], function (instance_from_client) {
      var cc_users, flow, handler_info, i, ins, instance, instance_id, last_trace, last_trace_id, newApprove, newTrace, now, old_inbox_users, org_info, previous_step, previous_trace, previous_trace_approves, previous_trace_id, previous_trace_name, previous_trace_step_id, r, retrieve_approve, retrieve_comment, retrieve_type, setObj, space_id, space_user, the_trace, traces;
      instance = uuflowManager.getInstance(instance_from_client["_id"]);
      retrieve_comment = instance_from_client['retrieve_comment'];

      if (!instance.outbox_users.includes(current_user) && instance.submitter !== current_user && instance.applicant !== current_user) {
        throw new Meteor.Error('error', '当前用户不符合取回条件');
      }

      retrieve_type = "";
      traces = instance.traces;
      last_trace = _.last(traces);
      last_trace_id = last_trace._id;
      previous_trace_id = last_trace.previous_trace_ids[0];
      previous_trace = _.find(traces, function (t) {
        return t._id === previous_trace_id;
      });
      previous_trace_step_id = previous_trace.step;
      previous_trace_name = previous_trace.name;
      flow = uuflowManager.getFlow(instance.flow);
      previous_step = uuflowManager.getStep(instance, flow, previous_trace_step_id);

      if (previous_step.step_type === "counterSign") {
        throw new Meteor.Error('error', '会签不能取回');
      }

      previous_trace_approves = _.filter(previous_trace.approves, function (a) {
        return a.type !== 'cc' && a.type !== 'distribute' && a.type !== 'forward' && ['approved', 'submitted', 'rejected'].includes(a.judge);
      });

      if (previous_trace_approves.length === 1 && (previous_trace_approves[0].user === current_user || previous_trace_approves[0].handler === current_user)) {
        retrieve_type = 'normal';
      }

      i = traces.length;
      retrieve_approve = {};

      while (i > 0) {
        _.each(traces[i - 1].approves, function (a) {
          if (a.type === 'cc' && a.is_finished === true && a.user === current_user) {
            retrieve_type = 'cc';
            return retrieve_approve = a;
          }
        });

        if (retrieve_type === 'cc') {
          break;
        }

        i--;
      }

      if (retrieve_type === 'normal') {
        flow = uuflowManager.getFlow(instance.flow);
        previous_step = uuflowManager.getStep(instance, flow, previous_trace_step_id);
        space_id = instance.space;
        instance_id = instance._id;
        old_inbox_users = instance.inbox_users;
        setObj = new Object();
        now = new Date();

        _.each(traces, function (t) {
          var current_space_user, current_user_organization, retrieve_appr;

          if (t._id === last_trace_id) {
            if (!t.approves) {
              t.approves = new Array();
            }

            _.each(t.approves, function (appr) {
              if (appr.is_finished === false && appr.type !== "cc") {
                appr.start_date = now;
                appr.finish_date = now;
                appr.read_date = now;
                appr.is_error = false;
                appr.is_read = true;
                appr.is_finished = true;
                appr.judge = "terminated";
                return appr.cost_time = appr.finish_date - appr.start_date;
              }
            });

            current_space_user = uuflowManager.getSpaceUser(space_id, current_user);
            current_user_organization = db.organizations.findOne(current_space_user.organization, {
              fields: {
                name: 1,
                fullname: 1
              }
            });
            retrieve_appr = new Object();
            retrieve_appr._id = new Mongo.ObjectID()._str;
            retrieve_appr.instance = instance_id;
            retrieve_appr.trace = t._id;
            retrieve_appr.is_finished = true;
            retrieve_appr.user = current_user;
            retrieve_appr.user_name = current_user_info.name;
            retrieve_appr.handler = current_user;
            retrieve_appr.handler_name = current_user_info.name;
            retrieve_appr.handler_organization = current_space_user.organization;
            retrieve_appr.handler_organization_name = current_user_organization.name;
            retrieve_appr.handler_organization_fullname = current_user_organization.fullname;
            retrieve_appr.start_date = now;
            retrieve_appr.finish_date = now;
            retrieve_appr.due_date = t.due_date;
            retrieve_appr.read_date = now;
            retrieve_appr.judge = "retrieved";
            retrieve_appr.is_read = true;
            retrieve_appr.description = retrieve_comment;
            retrieve_appr.is_error = false;
            retrieve_appr.values = new Object();
            retrieve_appr.cost_time = retrieve_appr.finish_date - retrieve_appr.start_date;
            t.approves.push(retrieve_appr);
            t.is_finished = true;
            t.finish_date = now;
            return t.judge = "retrieved";
          }
        });

        newTrace = new Object();
        newTrace._id = new Mongo.ObjectID()._str;
        newTrace.instance = instance_id;
        newTrace.previous_trace_ids = [last_trace_id];
        newTrace.is_finished = false;
        newTrace.step = previous_trace_step_id;
        newTrace.name = previous_trace_name;
        newTrace.start_date = now;
        newTrace.due_date = uuflowManager.getDueDate(previous_step.timeout_hours, space_id);
        newTrace.approves = [];
        newApprove = new Object();
        newApprove._id = new Mongo.ObjectID()._str;
        newApprove.instance = instance_id;
        newApprove.trace = newTrace._id;
        newApprove.is_finished = false;
        newApprove.user = current_user;
        handler_info = db.users.findOne(current_user, {
          fields: {
            name: 1
          }
        });
        newApprove.user_name = handler_info.name;
        newApprove.handler = current_user;
        newApprove.handler_name = handler_info.name;
        space_user = uuflowManager.getSpaceUser(space_id, current_user);
        org_info = uuflowManager.getSpaceUserOrgInfo(space_user);
        newApprove.handler_organization = org_info["organization"];
        newApprove.handler_organization_name = org_info["organization_name"];
        newApprove.handler_organization_fullname = org_info["organization_fullname"];
        newApprove.start_date = now;
        newApprove.due_date = newTrace.due_date;
        newApprove.is_read = false;
        newApprove.is_error = false;
        newApprove.values = new Object();
        uuflowManager.setRemindInfo(instance.values, newApprove);
        newTrace.approves.push(newApprove);
        setObj.inbox_users = [current_user];
        setObj.modified = now;
        setObj.modified_by = current_user;
        traces.push(newTrace);
        setObj.traces = traces;
        setObj.state = "pending";
        setObj.is_archived = false;
        setObj.current_step_name = previous_trace_name;
        setObj.current_step_auto_submit = uuflowManager.getCurrentStepAutoSubmit(flow.timeout_auto_submit, previous_step.lines);
        r = db.instances.update({
          _id: instance_id
        }, {
          $set: setObj
        });

        if (r) {
          pushManager.send_message_current_user(current_user_info);

          _.each(old_inbox_users, function (user_id) {
            if (user_id !== current_user) {
              return pushManager.send_message_to_specifyUser("current_user", user_id);
            }
          });

          ins = uuflowManager.getInstance(instance_id);
          return pushManager.triggerWebhook(ins.flow, ins, {}, 'retrieve', current_user, ins.inbox_users);
        }
      } else if (retrieve_type === 'cc') {
        setObj = new Object();
        now = new Date();
        instance_id = instance._id;
        the_trace = _.find(traces, function (t) {
          return t._id === retrieve_approve.trace;
        });

        _.each(the_trace.approves, function (a) {
          if (a._id === retrieve_approve._id) {
            a.is_finished = false;
            a.finish_date = void 0;
            a.judge = void 0;
            return a.cost_time = void 0;
          }
        });

        cc_users = instance.cc_users;
        cc_users.push(current_user);
        setObj.modified = now;
        setObj.modified_by = current_user;
        setObj.state = "pending";
        setObj.is_archived = false;
        setObj.cc_users = cc_users;
        setObj['traces.$.approves'] = the_trace.approves;
        r = db.instances.update({
          _id: instance_id,
          'traces._id': retrieve_approve.trace
        }, {
          $set: setObj
        });

        if (r) {
          pushManager.send_message_current_user(current_user_info);
        }

        ins = uuflowManager.getInstance(instance_id);
        return pushManager.triggerWebhook(ins.flow, ins, {}, 'retrieve', current_user, [current_user]);
      }
    });

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {}
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_forward.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_forward.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
JsonRoutes.add('post', '/api/workflow/forward', function (req, res, next) {
  try {
    var current_user_info = uuflowManager.check_authorization(req);
    var current_user_id = current_user_info._id;
    var hashData = req.body;
    var instance_id = hashData.instance_id;
    var space_id = hashData.space_id;
    var flow_id = hashData.flow_id;
    var hasSaveInstanceToAttachment = hashData.hasSaveInstanceToAttachment;
    var description = hashData.description;
    var isForwardAttachments = hashData.isForwardAttachments;
    var selectedUsers = hashData.selectedUsers;
    var action_type = hashData.action_type;
    var related = hashData.related;
    var from_approve_id = hashData.from_approve_id;
    check(instance_id, String);
    check(space_id, String);
    check(flow_id, String);
    check(hasSaveInstanceToAttachment, Boolean);
    check(description, String);
    check(isForwardAttachments, Boolean);
    check(selectedUsers, Array);
    check(action_type, Match.OneOf('forward', 'distribute'));
    if (action_type == "distribute") check(from_approve_id, String);
    var ins = db.instances.findOne(instance_id);
    var old_space_id = ins.space;
    var flow = db.flows.findOne(flow_id);
    var space = db.spaces.findOne(space_id);

    if (!ins || !flow || !space) {
      throw new Meteor.Error('params error!', 'record not exists!');
    }

    var forward_users = new Array();

    if (_.isEmpty(selectedUsers)) {
      forward_users = [current_user_id];
    } else {
      forward_users = selectedUsers;
    } // 校验分发对象是否有分发流程的提交权限


    var no_permission_user_ids = new Array();

    _.each(forward_users, function (uid) {
      var permissions = permissionManager.getFlowPermissions(flow_id, uid);

      if (!permissions.includes("add")) {
        // throw new Meteor.Error('error!', "该申请人没有提交此申请单的权限。")
        no_permission_user_ids.push(uid);
      }
    });

    if (!_.isEmpty(no_permission_user_ids)) {
      var no_permission_users_name = new Array();
      db.users.find({
        _id: {
          $in: no_permission_user_ids
        }
      }, {
        fields: {
          name: 1
        }
      }).forEach(function (u) {
        no_permission_users_name.push(u.name);
      });
      throw new Meteor.Error('no_permission', "该提交人没有提交此申请单的权限。", no_permission_users_name.join(','));
    }

    var new_ins_ids = new Array();
    var current_trace = null;

    if (action_type == "distribute") {
      _.each(ins.traces, function (t) {
        if (!current_trace) {
          _.each(t.approves, function (a) {
            if (!current_trace) {
              if (a._id == from_approve_id) current_trace = t;
            }
          });
        }
      });
    } else {
      current_trace = _.last(ins.traces);
    }

    var current_trace_id = current_trace._id;
    var forward_approves = [];
    var from_user_name = db.users.findOne(current_user_id, {
      fields: {
        name: 1
      }
    }).name;
    var set_obj = new Object(); // 计算values

    var old_values = ins.values,
        new_values = {};
    var form = db.forms.findOne(flow.form);
    var fields = form.current.fields || [];
    var old_form = db.forms.findOne(ins.form);
    var old_form_version = ins.form_version,
        old_fields = [],
        common_fields = [];
    var select_to_input_fields = [];

    if (old_form.current._id == old_form_version) {
      old_fields = old_form.current.fields;
    } else {
      if (old_form.historys) {
        old_form.historys.forEach(function (h) {
          if (h._id == old_form_version) old_fields = h.fields;
        });
      }
    }

    fields.forEach(function (field) {
      var exists_field = _.find(old_fields, function (f) {
        return f.type == field.type && f.code == field.code;
      });

      if (exists_field) common_fields.push(field);

      var select_input_field = _.find(old_fields, function (f) {
        return f.type == 'select' && field.type == 'input' && f.code == field.code;
      });

      if (select_input_field) select_to_input_fields.push(select_input_field);
    });
    select_to_input_fields.forEach(function (field) {
      if (old_values[field.code]) {
        new_values[field.code] = old_values[field.code];
      }
    });
    common_fields.forEach(function (field) {
      if (field.type == 'section') {
        if (field.fields) {
          field.fields.forEach(function (f) {
            // 跨工作区转发不复制选人选组
            if (['group', 'user'].includes(f.type) && old_space_id != space_id) {
              return;
            }

            var key = f.code;
            var old_v = old_values[key];

            if (old_v) {
              var fieldOptions = f.options && f.options.split && f.options.split("\n").map(function (n) {
                var itemSplits = n.split(":");
                return {
                  label: itemSplits[0],
                  value: itemSplits[1] || n
                };
              }); // 校验 单选，多选，下拉框 字段值是否在新表单对应字段的可选值范围内

              if (f.type == 'select' || f.type == 'radio') {
                var selectedOption = fieldOptions.find(function (item) {
                  return item.value === old_v;
                });

                if (!selectedOption) {
                  return;
                }
              }

              if (f.type == 'multiSelect') {
                var old_multiSelected = old_v.split(',');

                var new_multiSelected = _.intersection(fieldOptions.map(function (n) {
                  return n.value;
                }), old_multiSelected);

                old_v = new_multiSelected.join(',');
              }

              new_values[key] = old_v;
            }
          });
        }
      } else if (field.type == 'table') {
        if (!_.isEmpty(old_values[field.code])) {
          new_values[field.code] = new Array();
          old_values[field.code].forEach(function (old_table_row_values) {
            var new_table_row_values = {};

            if (!_.isEmpty(field.fields)) {
              field.fields.forEach(function (f) {
                // 跨工作区转发不复制选人选组
                if (['group', 'user'].includes(f.type) && old_space_id != space_id) {
                  return;
                }

                var key = f.code;
                var old_v = old_table_row_values[key];

                if (old_v) {
                  var fieldOptions = f.options && f.options.split && f.options.split("\n").map(function (n) {
                    var itemSplits = n.split(":");
                    return {
                      label: itemSplits[0],
                      value: itemSplits[1] || n
                    };
                  }); // 校验 单选，多选，下拉框 字段值是否在新表单对应字段的可选值范围内

                  if (f.type == 'select' || f.type == 'radio') {
                    var selectedOption = fieldOptions.find(function (item) {
                      return item.value === old_v;
                    });

                    if (!selectedOption) {
                      return;
                    }
                  }

                  if (f.type == 'multiSelect') {
                    var old_multiSelected = old_v.split(',');

                    var new_multiSelected = _.intersection(fieldOptions.map(function (n) {
                      return n.value;
                    }), old_multiSelected);

                    old_v = new_multiSelected.join(',');
                  }

                  new_table_row_values[key] = old_v;
                }
              });
            }

            if (old_table_row_values._id) {
              new_table_row_values._id = new Mongo.ObjectID()._str;
            }

            if (!_.isEmpty(new_table_row_values)) {
              new_values[field.code].push(new_table_row_values);
            }
          });
        }
      } else {
        // 跨工作区转发不复制选人选组
        if (['group', 'user'].includes(field.type) && old_space_id != space_id) {
          return;
        }

        var key = field.code;
        var old_v = old_values[key];

        if (old_v) {
          // 校验 单选，多选，下拉框 字段值是否在新表单对应字段的可选值范围内
          var fieldOptions = field.options && field.options.split && field.options.split("\n").map(function (n) {
            var itemSplits = n.split(":");
            return {
              label: itemSplits[0],
              value: itemSplits[1] || n
            };
          });

          if (field.type == 'select' || field.type == 'radio') {
            var selectedOption = fieldOptions.find(function (item) {
              return item.value === old_v;
            });

            if (!selectedOption) {
              return;
            }
          }

          if (field.type == 'multiSelect') {
            var old_multiSelected = old_v.split(',');

            var new_multiSelected = _.intersection(fieldOptions.map(function (n) {
              return n.value;
            }), old_multiSelected);

            old_v = new_multiSelected.join(',');
          }

          new_values[key] = old_v;
        }
      }
    }); //如果是分发，则value中的record_need、FONDSID不需要分发到新申请单中

    if (action_type === 'distribute') {
      delete new_values.record_need;
      delete new_values.FONDSID;
    } // 计算申请单标题


    var instance_name = "";
    var name_forumla = form.current.name_forumla;

    if (name_forumla) {
      try {
        var iscript = name_forumla.replace(/\{/g, "(new_values['").replace(/\}/g, "'] || '')");
        var rev = eval(iscript);
        instance_name = rev || flow.name;
      } catch (error) {
        throw new Meteor.Error('caculate_instance_name', "计算申请单标题出错请检查表单标题脚本。");
      }
    } else {
      instance_name = flow.name;
    } // instance中记录当前步骤名称 #1314


    var start_step = _.find(flow.current.steps, function (step) {
      return step.step_type == 'start';
    }); // 新建申请单时，instances记录流程名称、流程分类名称 #1313


    var category_name = "";

    if (form.category) {
      var category = uuflowManager.getCategory(form.category);
      if (category) category_name = category.name;
    }

    _.each(forward_users, function (user_id) {
      var user_info = db.users.findOne(user_id);
      var space_user = db.space_users.findOne({
        space: space_id,
        user: user_id
      }, {
        fields: {
          organization: 1
        }
      });
      var space_user_org_info = db.organizations.findOne({
        _id: space_user.organization
      }, {
        fields: {
          name: 1,
          fullname: 1
        }
      });
      var now = new Date();
      var ins_obj = {};
      var agent = uuflowManager.getAgent(space_id, user_id);
      var handler_id = user_id;
      var handler_info = user_info;
      var handler_space_user = space_user;
      var handler_org_info = space_user_org_info;

      if (agent) {
        handler_id = agent;
        handler_info = db.users.findOne(agent);
        handler_space_user = uuflowManager.getSpaceUser(space_id, agent);
        handler_org_info = uuflowManager.getSpaceUserOrgInfo(handler_space_user);
      }

      ins_obj._id = db.instances._makeNewID();
      ins_obj.space = space_id;
      ins_obj.flow = flow_id;
      ins_obj.flow_version = flow.current._id;
      ins_obj.form = flow.form;
      ins_obj.form_version = flow.current.form_version;
      ins_obj.name = instance_name;
      ins_obj.submitter = handler_id;
      ins_obj.submitter_name = handler_info.name;
      ins_obj.applicant = user_id;
      ins_obj.applicant_name = user_info.name;
      ins_obj.applicant_organization = space_user.organization;
      ins_obj.applicant_organization_name = space_user_org_info.name;
      ins_obj.applicant_organization_fullname = space_user_org_info.fullname;
      ins_obj.state = "draft";
      ins_obj.code = "";
      ins_obj.is_archived = false;
      ins_obj.is_deleted = false;
      ins_obj.created = now;
      ins_obj.created_by = current_user_id;
      ins_obj.modified = now;
      ins_obj.modified_by = current_user_id;
      ins_obj.inbox_users = [handler_id];
      ins_obj.values = new_values;

      if (action_type == 'distribute') {
        // 解决多次分发看不到正文、附件问题
        if (ins.distribute_from_instance) {
          ins_obj.distribute_from_instance = ins.distribute_from_instance;
        } else {
          ins_obj.distribute_from_instance = instance_id;
        }

        ins_obj.distribute_from_instances = _.clone(ins.distribute_from_instances) || [];
        ins_obj.distribute_from_instances.push(instance_id);

        if (related) {
          ins_obj.related_instances = [instance_id];
        }
      } else if (action_type == 'forward') {
        ins_obj.forward_from_instance = instance_id;
      } // 新建Trace


      var trace_obj = {};
      trace_obj._id = new Mongo.ObjectID()._str;
      trace_obj.instance = ins_obj._id;
      trace_obj.is_finished = false; // 当前最新版flow中开始节点的step_id

      var step_id, step_name, can_edit_main_attach, can_edit_normal_attach;
      flow.current.steps.forEach(function (step) {
        if (step.step_type == "start") {
          step_id = step._id;
          step_name = step.name;
          can_edit_main_attach = step.can_edit_main_attach;
          can_edit_normal_attach = step.can_edit_normal_attach;
        }
      });
      trace_obj.step = step_id;
      trace_obj.start_date = now;
      trace_obj.name = step_name; // 新建Approve

      var appr_obj = {};
      appr_obj._id = new Mongo.ObjectID()._str;
      appr_obj.instance = ins_obj._id;
      appr_obj.trace = trace_obj._id;
      appr_obj.is_finished = false;
      appr_obj.user = user_id;
      appr_obj.user_name = user_info.name;
      appr_obj.handler = handler_id;
      appr_obj.handler_name = handler_info.name;
      appr_obj.handler_organization = handler_space_user.organization;
      appr_obj.handler_organization_name = handler_org_info.name;
      appr_obj.handler_organization_fullname = handler_org_info.fullname;
      appr_obj.type = "draft";
      appr_obj.start_date = now;
      appr_obj.read_date = now;
      appr_obj.is_read = false;
      appr_obj.is_error = false;
      appr_obj.values = new_values;

      if (agent) {
        appr_obj.agent = agent;
      }

      trace_obj.approves = [appr_obj];
      ins_obj.traces = [trace_obj];
      if (flow.auto_remind == true) ins_obj.auto_remind = true;
      ins_obj.current_step_name = start_step.name;
      ins_obj.flow_name = flow.name;

      if (category_name) {
        ins_obj.category_name = category.name;
        ins_obj.category = category._id;
      }

      new_ins_id = db.instances.insert(ins_obj); // 复制附件

      var collection = cfs.instances; //将原表单内容存储为第一个附件

      if (hasSaveInstanceToAttachment) {
        // try {
        instanceHtml = InstanceReadOnlyTemplate.getInstanceHtml(user_info, space_id, ins, {
          absolute: true,
          showTrace: true
        });
        var instanceFile = new FS.File();
        instanceFile.attachData(Buffer.from(instanceHtml, "utf-8"), {
          type: "text/html"
        }, function (error) {
          if (error) {
            throw new Meteor.Error(error.error, error.reason);
          }

          instanceFile.name(ins.name + ".html");
          instanceFile.size(instanceHtml.length);
          var metadata = {
            owner: user_id,
            owner_name: user_info.name,
            space: space_id,
            instance: new_ins_id,
            approve: appr_obj._id,
            current: true
          };
          instanceFile.metadata = metadata;
          var fileObj = collection.insert(instanceFile);
          fileObj.update({
            $set: {
              'metadata.parent': fileObj._id
            }
          });
        }); // } catch (e) {
        //     console.error(e);
        // }
      }

      if (isForwardAttachments && action_type == 'forward') {
        var files = collection.find({
          'metadata.instance': instance_id,
          'metadata.current': true
        });
        files.forEach(function (f) {
          // 判断新的流程开始节点是否有编辑正文和编辑附件权限
          if (f.metadata.main == true) {
            if (can_edit_main_attach != true && can_edit_normal_attach != true) return;
          } else {
            if (can_edit_normal_attach != true) return;
          }

          var newFile = new FS.File();
          newFile.attachData(f.createReadStream('instances'), {
            type: f.original.type
          }, function (err) {
            if (err) {
              throw new Meteor.Error(err.error, err.reason);
            }

            newFile.name(f.name());
            newFile.size(f.size());
            var metadata = {
              owner: user_id,
              owner_name: user_info.name,
              space: space_id,
              instance: new_ins_id,
              approve: appr_obj._id,
              current: true
            };

            if (f.metadata.main == true && can_edit_main_attach == true) {
              metadata.main = true;
            }

            newFile.metadata = metadata;
            var fileObj = collection.insert(newFile);
            fileObj.update({
              $set: {
                'metadata.parent': fileObj._id
              }
            });
          });
        });
      }

      if (action_type === 'distribute') {
        // 给当前的申请单增加分发记录
        var appr = {
          '_id': new Mongo.ObjectID()._str,
          'instance': instance_id,
          'trace': current_trace_id,
          'is_finished': true,
          'user': user_id,
          'user_name': user_info.name,
          'handler': user_id,
          'handler_name': user_info.name,
          'handler_organization': space_user.organization,
          'handler_organization_name': space_user_org_info.name,
          'handler_organization_fullname': space_user_org_info.fullname,
          'type': action_type,
          'start_date': new Date(),
          'finish_date': new Date(),
          'is_read': false,
          'judge': 'submitted',
          'from_user': current_user_id,
          'from_user_name': from_user_name,
          'forward_space': space_id,
          'forward_instance': new_ins_id,
          'description': description,
          'from_approve_id': from_approve_id
        };
        forward_approves.push(appr);
      }

      new_ins_ids.push(new_ins_id);
      pushManager.send_message_to_specifyUser("current_user", user_id);
    });

    if (!_.isEmpty(forward_approves)) {
      set_obj.modified = new Date();
      set_obj.modified_by = current_user_id;
      var r = db.instances.update({
        _id: instance_id,
        "traces._id": current_trace_id
      }, {
        $set: set_obj,
        $addToSet: {
          'traces.$.approves': {
            $each: forward_approves
          }
        }
      });
    }

    if (r) {
      _.each(current_trace.approves, function (a, idx) {
        if (a._id == from_approve_id) {
          var update_read = {};
          update_read["traces.$.approves." + idx + ".read_date"] = new Date();
          db.instances.update({
            _id: instance_id,
            "traces._id": current_trace_id
          }, {
            $set: update_read
          });
        }
      });
    }

    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        new_ins_ids: new_ins_ids
      }
    });
  } catch (e) {
    console.error(e.stack);
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [e]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_instance.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_instance.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add('get', '/api/workflow/instance/:instanceId', function (req, res, next) {
  var box, current_user_id, current_user_info, e, flowId, ins, insId, permissions, redirectTo, redirectToUrl, ref, ref1, ref2, req_async, space, spaceId;

  try {
    current_user_info = uuflowManager.check_authorization(req, res);
    current_user_id = current_user_info._id;
    req_async = _.has(req.query, 'async');
    insId = req.params.instanceId;
    ins = db.instances.findOne(insId, {
      fields: {
        space: 1,
        flow: 1,
        state: 1,
        inbox_users: 1,
        cc_users: 1,
        outbox_users: 1,
        submitter: 1,
        applicant: 1
      }
    });

    if (!ins) {
      throw new Meteor.Error('error', 'instanceId is wrong or instance not exists.');
    }

    spaceId = ins.space;
    flowId = ins.flow;

    if (db.space_users.find({
      space: spaceId,
      user: current_user_id
    }).count() === 0) {
      throw new Meteor.Error('error', 'user is not belong to this space.');
    }

    box = '';

    if (((ref = ins.inbox_users) != null ? ref.includes(current_user_id) : void 0) || ((ref1 = ins.cc_users) != null ? ref1.includes(current_user_id) : void 0)) {
      box = 'inbox';
    } else if ((ref2 = ins.outbox_users) != null ? ref2.includes(current_user_id) : void 0) {
      box = 'outbox';
    } else if (ins.state === 'draft' && ins.submitter === current_user_id) {
      box = 'draft';
    } else if (ins.state === 'pending' && (ins.submitter === current_user_id || ins.applicant === current_user_id)) {
      box = 'pending';
    } else if (ins.state === 'completed' && ins.submitter === current_user_id) {
      box = 'completed';
    } else {
      permissions = permissionManager.getFlowPermissions(flowId, current_user_id);
      space = db.spaces.findOne(spaceId, {
        fields: {
          admins: 1
        }
      });

      if (!permissions.includes("admin") && !space.admins.includes(current_user_id)) {
        throw new Meteor.Error('error', "no permission.");
      }

      box = 'monitor';
    }

    redirectTo = "workflow/space/" + spaceId + "/" + box + "/" + insId;
    redirectToUrl = Meteor.absoluteUrl(redirectTo);

    if (req_async) {
      return res.status(200).send({
        "status": 302,
        "redirect": redirectTo
      });
    } else {
      res.setHeader("Location", redirectToUrl);
      res.writeHead(302);
      res.end();
    }
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_pending.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_pending.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
@api {get} /api/workflow/open/pending 获取待办文件

@apiDescription 获取当前用户的待办事项列表

@apiName getInbox

@apiGroup Workflow

@apiParam {String} access_token User API Token

@apiHeader {String} X-Space-Id	工作区Id

@apiHeaderExample {json} Header-Example:
	{
		"X-Space-Id": "wsw1re12TdeP223sC"
	}

@apiSuccessExample {json} Success-Response:
	{
		"status": "success",
		"data": [
			{
				"id": "g7wokXNkR9yxHvA4D",
				"start_date": "2017-11-23T02:28:53.164Z",
				"flow_name": "正文流程",
				"space_name": "审批王",
				"name": "正文流程 1",
				"applicant_name": null,
				"applicant_organization_name": "审批王",
				"submit_date": "2017-07-25T06:36:48.492Z",
				"step_name": "开始",
				"space_id": "kfDsMv7gBewmGXGEL",
				"modified": "2017-11-23T02:28:53.164Z",
				"is_read": false,
				"values": {}
			},
			{
				"id": "WqKSrWQoywgJaMp9k",
				"start_date": "2017-08-17T07:38:35.420Z",
				"flow_name": "正文\n",
				"space_name": "审批王",
				"name": "正文\n 1",
				"applicant_name": "殷亮辉",
				"applicant_organization_name": "审批王",
				"submit_date": "2017-06-27T10:26:19.468Z",
				"step_name": "开始",
				"space_id": "kfDsMv7gBewmGXGEL",
				"modified": "2017-08-17T07:38:35.421Z",
				"is_read": true,
				"values": {}
			}
		]
	}
 */JsonRoutes.add('get', '/api/workflow/open/pending', function (req, res, next) {
  var attach, e, is_read, limit, no_limit_count, query, ref, ref1, ref2, ref3, ref4, ref5, result_instances, space, space_id, space_names, special_user_id, start_date, u, uid, user_id, userid, username, workflow_categories;

  try {
    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    space_id = req.headers['x-space-id'] || ((ref = req.query) != null ? ref.spaceId : void 0);

    if (!space_id) {
      throw new Meteor.Error('error', 'need space_id');
    }

    user_id = req.userId;

    if (!user_id) {
      throw new Meteor.Error('error', 'Not logged in');
    }

    if (db.users.find({
      _id: user_id
    }).count() === 0) {
      throw new Meteor.Error('error', 'can not find user');
    }

    limit = ((ref1 = req.query) != null ? ref1.limit : void 0) || 500;
    limit = parseInt(limit);
    username = (ref2 = req.query) != null ? ref2.username : void 0;
    userid = (ref3 = req.query) != null ? ref3.userid : void 0;
    attach = (ref4 = req.query) != null ? ref4.attach : void 0;
    workflow_categories = (ref5 = req.query) != null ? ref5.workflow_categories : void 0;
    space = uuflowManager.getSpace(space_id);
    special_user_id;

    if (space.admins.includes(user_id)) {
      if (userid) {
        if (db.users.find({
          _id: userid
        }).count() < 1) {
          throw new Meteor.Error('error', "can not find user by userid: " + userid);
        }

        special_user_id = userid;
      } else if (username) {
        u = db.users.findOne({
          username: username
        }, {
          fields: {
            _id: 1
          }
        });

        if (_.isEmpty(u)) {
          throw new Meteor.Error('error', "can not find user by username: " + username);
        }

        special_user_id = u._id;
      }
    }

    result_instances = new Array();
    is_read = false;
    start_date = '';
    uid = user_id;
    query = {
      $or: [{
        inbox_users: user_id
      }, {
        cc_users: user_id
      }]
    };

    if (special_user_id) {
      uid = special_user_id;
      query = {
        space: space_id,
        $or: [{
          inbox_users: special_user_id
        }, {
          cc_users: special_user_id
        }]
      };
    }

    if (workflow_categories) {
      query.category = {
        $in: workflow_categories.split(',')
      };
    }

    space_names = {};
    space_names[space._id] = space.name;

    if (limit > 0) {
      db.instances.find(query, {
        sort: {
          modified: -1
        },
        limit: limit
      }).forEach(function (i) {
        var h, ref6, ref7;

        if ((ref6 = i.inbox_users) != null ? ref6.includes(uid) : void 0) {
          _.each(i.traces, function (t) {
            if (t.is_finished === false) {
              return _.each(t.approves, function (a) {
                if (a.user === uid && a.type !== 'cc' && !a.is_finished) {
                  is_read = a.is_read;
                  return start_date = a.start_date;
                }
              });
            }
          });
        } else {
          _.each(i.traces, function (t) {
            if (!start_date && t.approves) {
              return _.each(t.approves, function (a) {
                if (!start_date && a.user === uid && a.type === 'cc' && !a.is_finished) {
                  is_read = a.is_read;
                  return start_date = a.start_date;
                }
              });
            }
          });
        }

        if (!space_names[i.space]) {
          space_names[i.space] = (ref7 = db.spaces.findOne(i.space, {
            fields: {
              name: 1
            }
          })) != null ? ref7.name : void 0;
        }

        h = new Object();
        h["id"] = i["_id"];
        h["start_date"] = start_date;
        h["flow_name"] = i.flow_name;
        h["space_name"] = space_names[i.space];
        h["name"] = i["name"];
        h["applicant_name"] = i["applicant_name"];
        h["applicant_organization_name"] = i["applicant_organization_name"];
        h["submit_date"] = i["submit_date"];
        h["step_name"] = i.current_step_name;
        h["space_id"] = i.space;
        h["modified"] = i["modified"];
        h["is_read"] = is_read;
        h["values"] = i["values"];

        if (attach === 'true') {
          h.attachments = cfs.instances.find({
            'metadata.instance': i._id,
            'metadata.current': true,
            "metadata.is_private": {
              $ne: true
            }
          }, {
            fields: {
              copies: 0
            }
          }).fetch();
        }

        return result_instances.push(h);
      });
    }

    no_limit_count = db.instances.find(query).count();
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: result_instances,
        count: no_limit_count
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.reason
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"export_table_template.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/export_table_template.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Cookies;
Cookies = require("cookies");
Meteor.startup(function () {
  return WebApp.connectHandlers.use("/api/workflow/export/talbe_template", function (req, res, next) {
    var authToken, cookies, data, fileName, flow, flowId, form, ref, ref1, space, userId;
    cookies = new Cookies(req, res);

    if (req.body) {
      userId = req.body["X-User-Id"];
      authToken = req.body["X-Auth-Token"];
    }

    if (!userId || !authToken) {
      userId = cookies.get("X-User-Id");
      authToken = cookies.get("X-Auth-Token");
    }

    if (!(userId && authToken)) {
      res.writeHead(401);
      res.end(JSON.stringify({
        "error": "Validate Request -- Missing X-Auth-Token",
        "success": false
      }));
      return;
    }

    flowId = (ref = req.query) != null ? ref.flow : void 0;
    flow = db.flows.findOne({
      _id: flowId
    }, {
      fields: {
        space: 1,
        form: 1,
        name: 1
      }
    });
    form = db.forms.findOne({
      _id: flow.form
    }, {
      fields: {
        space: 1,
        "current._id": 1
      }
    });

    if (_.isEmpty(flow)) {
      res.writeHead(401);
      res.end(JSON.stringify({
        "error": "Validate Request -- Invalid formId",
        "success": false
      }));
      return;
    } else {
      if (!Steedos.isSpaceAdmin(flow.space, userId)) {
        res.writeHead(401);
        res.end(JSON.stringify({
          "error": "Validate Request -- No permission",
          "success": false
        }));
        return;
      }

      space = db.spaces.findOne(flow.space, {
        fields: {
          is_paid: 1
        }
      });

      if (!space) {
        JsonRoutes.sendResult(res, {
          code: 404,
          data: {
            "error": "Validate Request -- No permission",
            "success": false
          }
        });
        return;
      }
    }

    data = TemplateManager.handleTableTemplate({
      form: flow.form,
      form_version: form != null ? (ref1 = form.current) != null ? ref1._id : void 0 : void 0
    }, true);
    fileName = flow.name;
    res.setHeader('Content-type', 'application/x-msdownload');
    res.setHeader('Content-Disposition', 'attachment;filename=' + encodeURI(fileName) + '.html');
    return res.end(data);
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_drafts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_drafts.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
@api {post} /api/workflow/open/drafts 新建申请单

@apiName createInstance

@apiGroup Workflow

@apiPermission 工作区管理员

@apiParam {String} access_token User API Token

@apiHeader {String} X-Space-Id	工作区Id

@apiHeaderExample {json} Header-Example:
{
	"X-Space-Id": "wsw1re12TdeP223sC"
}

@apiParamExample {json} Request Payload:
{
    "flow": 流程Id,
    "applicant": 申请人Id,
    "values": {
        "fields1" : 字段值,
        "fields2" : 字段值,
        ...
    }
}

@apiSuccessExample {json} Success-Response:
{
    "status": "success",
    "data": {instance}
}

@apiErrorExample {json} error-Response:
{
    "status": "error",
    "data": {...}
}
 */JsonRoutes.add('post', '/api/workflow/open/drafts', function (req, res, next) {
  var applicant, applicantInfo, applicant_id, applicant_username, approve, approves, current_user_info, e, flow, flow_id, hashData, instance_from_client, new_ins, new_ins_id, space_id, space_user, space_user_org_info, trace, traces, user_id;

  try {
    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    user_id = req.userId;
    current_user_info = db.users.findOne({
      _id: user_id
    });
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header x_space_id');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user_info._id);
    hashData = req.body;

    if (!hashData["flow"]) {
      throw new Meteor.Error('error', 'flow is null');
    }

    flow_id = hashData["flow"];
    applicant_id = hashData["applicant"];
    applicant_username = hashData["applicant_username"];
    instance_from_client = new Object();
    flow = db.flows.findOne({
      _id: flow_id
    }, {
      fields: {
        space: 1,
        'current._id': 1
      }
    });

    if (!flow) {
      throw new Meteor.Error('error', 'flow is not exists');
    }

    if (space_id !== flow.space) {
      throw new Meteor.Error('error', 'flow is not belong to this space');
    }

    if (db.space_users.find({
      space: space_id,
      user: current_user_info._id
    }).count() === 0) {
      throw new Meteor.Error('error', 'auth_token is not a member of this space');
    }

    instance_from_client["space"] = space_id;
    instance_from_client["flow"] = flow_id;
    instance_from_client["flow_version"] = flow.current._id;
    applicant = null;

    if (applicant_id || applicant_username) {
      if (applicant_id) {
        applicant = db.users.findOne({
          _id: applicant_id
        }, {
          fields: {
            name: 1
          }
        });

        if (!applicant) {
          throw new Meteor.Error('error', 'applicant is wrong');
        }
      } else if (applicant_username) {
        applicant = db.users.findOne({
          username: applicant_username
        }, {
          fields: {
            name: 1
          }
        });

        if (!applicant) {
          throw new Meteor.Error('error', 'applicant_username is wrong');
        }
      }

      space_user = db.space_users.findOne({
        space: space_id,
        user: applicant._id
      });

      if (!space_user) {
        throw new Meteor.Error('error', 'applicant is not a member of this space');
      }

      if (space_user.user_accepted !== true) {
        throw new Meteor.Error('error', 'applicant is disabled in this space');
      }

      space_user_org_info = uuflowManager.getSpaceUserOrgInfo(space_user);
      instance_from_client["applicant"] = applicant._id;
      instance_from_client["applicant_name"] = applicant.name;
      instance_from_client["applicant_organization"] = space_user_org_info["organization"];
      instance_from_client["applicant_organization_fullname"] = space_user_org_info["organization_fullname"];
      instance_from_client["applicant_organization_name"] = space_user_org_info["organization_name"];
    }

    applicantInfo = applicant || current_user_info;
    traces = [];
    trace = new Object();
    approves = [];
    approve = new Object();
    approve["values"] = hashData["values"];
    approves.push(approve);
    trace["approves"] = approves;
    traces.push(trace);
    instance_from_client["traces"] = traces;
    instance_from_client["inbox_users"] = [applicantInfo._id];
    new_ins_id = uuflowManager.create_instance(instance_from_client, applicantInfo);
    new_ins = db.instances.findOne(new_ins_id);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: new_ins
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_get.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_get.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
@api {get} /api/workflow/open/get/:ins_id 查看申请单详情

@apiName getInstance

@apiGroup Workflow

@apiPermission 工作区的管理员

@apiParam {String} ins_id 申请单Id
@apiParam {String} access_token User API Token

@apiHeader {String} X-Space-Id	工作区Id

@apiHeaderExample {json} Header-Example:
{
	"X-Space-Id": "wsw1re12TdeP223sC"
}

@apiSuccessExample {json} Success-Response:
{
    "status": "success",
    "data": {instance}
}
 */JsonRoutes.add('get', '/api/workflow/open/get/:ins_id', function (req, res, next) {
  var current_user, e, ins_id, instance, perm_users, permissions, space, space_id;

  try {
    ins_id = req.params.ins_id;

    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    instance = db.instances.findOne(ins_id);

    if (!instance) {
      throw new Meteor.Error('error', 'can not find instance');
    }

    if (db.space_users.find({
      space: instance.space,
      user: current_user
    }).count() === 0) {
      throw new Meteor.Error('error', 'auth_token is wrong');
    }

    perm_users = new Array();
    perm_users.push(instance.submitter);
    perm_users.push(instance.applicant);

    if (instance.outbox_users) {
      perm_users = perm_users.concat(instance.outbox_users);
    }

    if (instance.inbox_users) {
      perm_users = perm_users.concat(instance.inbox_users);
    }

    space = db.spaces.findOne({
      _id: instance.space
    }, {
      fields: {
        admins: 1
      }
    });
    perm_users = perm_users.concat(space.admins);
    permissions = permissionManager.getFlowPermissions(instance.flow, current_user);

    if (!perm_users.includes(current_user) && !permissions.includes("monitor") && !permissions.includes("admin")) {
      throw new Meteor.Error('error', 'no permission');
    }

    instance.attachments = cfs.instances.find({
      'metadata.instance': instance._id,
      'metadata.current': true,
      "metadata.is_private": {
        $ne: true
      }
    }, {
      fields: {
        copies: 0
      }
    }).fetch();
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: instance
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_submit.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_submit.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
@api {put} /api/workflow/open/submit/:ins_id 提交申请单

@apiDescription 暂不支持开始节点下一节点为条件的情况

@apiName submitInstance

@apiGroup Workflow

@apiPermission 工作区管理员

@apiParam {String} access_token User API Token

@apiHeader {String} X-Space-Id	工作区Id

@apiHeaderExample {json} Header-Example:
    {
		"X-Space-Id": "wsw1re12TdeP223sC"
	}

@apiSuccessExample {json} Success-Response:
    {
		"status": "success",
		"data": {instance}
	}
 */JsonRoutes.add('put', '/api/workflow/open/submit/:ins_id', function (req, res, next) {
  var current_user, current_user_info, e, flow, form, ins_id, instance, nextSteps, next_step_id, next_user_ids, r, require_but_empty_fields, result, space_id, step, submitter, values;

  try {
    ins_id = req.params.ins_id;

    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    current_user_info = db.users.findOne(current_user);

    if (!current_user_info) {
      throw new Meteor.Error('error', 'can not find user');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    instance = uuflowManager.getInstance(ins_id);
    uuflowManager.isInstanceDraft(instance);

    if (space_id !== instance["space"]) {
      throw new Meteor.Error('error', 'instance is not belong to this space');
    }

    values = instance["traces"][0]["approves"][0].values;
    form = uuflowManager.getForm(instance.form);
    require_but_empty_fields = uuflowManager.checkValueFieldsRequire(values, form, instance.form_version);

    if (require_but_empty_fields.length > 0) {
      if (require_but_empty_fields.length > 1) {
        throw new Meteor.Error('error', 'fields <' + require_but_empty_fields.join(",") + '> are required');
      } else if (require_but_empty_fields.length = 1) {
        throw new Meteor.Error('error', 'field <' + require_but_empty_fields.join(",") + '> is required');
      }
    }

    flow = uuflowManager.getFlow(instance.flow);
    step = uuflowManager.getStep(instance, flow, instance["traces"][0].step);
    nextSteps = uuflowManager.getNextSteps(instance, flow, step, "submitted");

    if (nextSteps.length < 1) {
      throw new Meteor.Error('error', 'can not find next steps');
    }

    if (nextSteps.length > 1) {
      throw new Meteor.Error('error', 'next step not uniq');
    }

    next_step_id = nextSteps[0];
    next_user_ids = getHandlersManager.getHandlers(ins_id, next_step_id, current_user) || [];

    if (next_user_ids.length > 1) {
      throw new Meteor.Error('error', 'next step handler not uniq');
    }

    instance["traces"][0]["approves"][0]["next_steps"] = [{
      'step': next_step_id,
      'users': next_user_ids
    }];
    result = new Object();
    submitter = db.users.findOne(instance.submitter);

    if (!submitter) {
      throw new Meteor.Error('error', 'can not find submitter');
    }

    r = uuflowManager.submit_instance(instance, submitter);

    if (r.alerts) {
      result = r;
    } else {
      result = db.instances.findOne(ins_id);

      if (result) {
        result.attachments = cfs.instances.find({
          'metadata.instance': ins_id,
          'metadata.current': true,
          "metadata.is_private": {
            $ne: true
          }
        }, {
          fields: {
            copies: 0
          }
        }).fetch();
      }
    }

    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: result
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_save.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_save.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
@api {put} /api/workflow/open/save/:ins_id 暂存申请单

@apiName saveInstances

@apiGroup Workflow

@apiPermission 工作区管理员

@apiParam {String} access_token User API Token

@apiHeader {String} X-Space-Id	工作区Id

@apiHeaderExample {json} Header-Example:
    {
		"X-Space-Id": "wsw1re12TdeP223sC"
	}

@apiSuccessExample {json} Success-Response:
    {
		"status": "success",
		"data": {instance}
	}
 */JsonRoutes.add('put', '/api/workflow/open/save/:ins_id', function (req, res, next) {
  var current_step, current_trace, current_user, current_user_info, e, flow, ins_id, instance, result, setObj, space_id, values;

  try {
    ins_id = req.params.ins_id;

    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    current_user_info = db.users.findOne(current_user);

    if (!current_user_info) {
      throw new Meteor.Error('error', 'can not find user');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    values = req.body;

    if (!values) {
      throw new Meteor.Error('error', 'need values');
    }

    current_trace = null;
    setObj = new Object();
    instance = uuflowManager.getInstance(ins_id);
    flow = uuflowManager.getFlow(instance.flow);

    _.each(instance.traces, function (t) {
      if (t.is_finished !== true) {
        return current_trace = t;
      }
    });

    current_step = uuflowManager.getStep(instance, flow, current_trace.step);

    if (current_step.step_type === "counterSign") {
      throw new Meteor.Error('error', '会签步骤不能修改表单值');
    }

    _.each(current_trace.approves, function (a) {
      if (a.is_finished !== true && a.type !== "cc") {
        return a.values = values;
      }
    });

    setObj.modified = new Date();
    setObj["traces.$.approves"] = current_trace.approves;
    db.instances.update({
      _id: ins_id,
      'traces._id': current_trace._id
    }, {
      $set: setObj
    });
    result = new Object();
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: result
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_get_by_stepname.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_get_by_stepname.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
@api {post} /api/workflow/open/getbystepname 根据步骤名称获取申请单

@apiName getInstanceByStepName

@apiGroup Workflow

@apiPermission 工作区管理员

@apiParam {String} access_token User API Token

@apiHeader {String} X-Space-Id	工作区Id

@apiHeaderExample {json} Header-Example:
{
	"X-Space-Id": "wsw1re12TdeP223sC"
}

@apiParamExample {json} Request Payload:
{
    "flow": 流程Id,
    "stepname": 步骤名称
}

@apiSuccessExample {json} Success-Response:
{
	"status": "success",
	"data": [
		{
			instance
		},
		{
			instance
		}
	]
}
 */JsonRoutes.add('post', '/api/workflow/open/getbystepname', function (req, res, next) {
  var current_user, current_user_info, e, flow, hashData, instances, space_id, stepname;

  try {
    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    current_user_info = db.users.findOne(current_user);

    if (!current_user_info) {
      throw new Meteor.Error('error', 'can not find user');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    hashData = req.body;
    stepname = hashData["stepname"];
    flow = hashData["flow"];

    if (!stepname) {
      throw new Meteor.Error('error', 'need stepname');
    }

    if (!flow) {
      throw new Meteor.Error('error', 'need flow');
    }

    instances = db.instances.find({
      space: space_id,
      flow: flow,
      state: 'pending',
      traces: {
        $elemMatch: {
          is_finished: false,
          name: stepname
        }
      }
    }, {
      fields: {
        inbox_uers: 0,
        cc_users: 0,
        outbox_users: 0,
        attachments: 0,
        traces: 0
      }
    }).fetch();
    instances.forEach(function (instance) {
      return instance.attachments = cfs.instances.find({
        'metadata.instance': instance._id,
        'metadata.current': true,
        "metadata.is_private": {
          $ne: true
        }
      }, {
        fields: {
          copies: 0
        }
      }).fetch();
    });
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: instances
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_open_cfs.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_open_cfs.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
Content-Type：application/json
form-data 格式:
fd = new FormData;
fd.append("file", file);

fd.append("is_private", false);

if (isAddVersion) {
	fd.append("isAddVersion", isAddVersion);
	fd.append("parent", attach_parent_id);
}

if (isMainAttach) {
	fd.append("main", true);
}
 */JsonRoutes.add('post', '/api/workflow/open/cfs/:ins_id', function (req, res, next) {
  var approve_id, current_user, current_user_info, e, ins_id, instance, space_id;

  try {
    ins_id = req.params.ins_id;

    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    current_user_info = db.users.findOne(current_user);

    if (!current_user_info) {
      throw new Meteor.Error('error', 'can not find user');
    }

    instance = uuflowManager.getInstance(ins_id);

    if (instance.state !== "draft") {
      throw new Meteor.Error('error', '申请单草稿状态时才能上传');
    }

    approve_id = instance.traces[0].approves[0]._id;
    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    return JsonRoutes.parseFiles(req, res, function () {
      var collection, newFile;
      collection = cfs.instances;

      if (req.files && req.files[0]) {
        if (req.files[0].data.length > 100 * 1024 * 1024) {
          JsonRoutes.sendResult(res, {
            code: 200,
            data: {
              errors: [{
                errorMessage: "超过上传附件大小限制(100M)"
              }]
            }
          });
          return;
        }

        newFile = new FS.File();
        return newFile.attachData(req.files[0].data, {
          type: req.files[0].mimeType
        }, function (err) {
          var body, e, fileObj, filename, metadata, parent, r, result, size;
          filename = req.files[0].filename;

          if (["image.jpg", "image.gif", "image.jpeg", "image.png"].includes(filename.toLowerCase())) {
            filename = "image-" + moment(new Date()).format('YYYYMMDDHHmmss') + "." + filename.split('.').pop();
          }

          body = req.body;
          body['owner'] = instance.submitter;
          body['owner_name'] = instance.submitter_name;
          body['space'] = space_id;
          body['instance'] = ins_id;
          body['approve'] = approve_id;

          try {
            if (body && (body['upload_from'] === "IE" || body['upload_from'] === "node")) {
              filename = decodeURIComponent(filename);
            }
          } catch (error) {
            e = error;
            console.error(filename);
            console.error(e);
            filename = filename.replace(/%/g, "-");
          }

          newFile.name(filename);

          if (body && body['owner'] && body['owner_name'] && body['space'] && body['instance'] && body['approve']) {
            parent = '';
            metadata = {
              owner: body['owner'],
              owner_name: body['owner_name'],
              space: body['space'],
              instance: body['instance'],
              approve: body['approve'],
              current: true
            };

            if (body["is_private"] && body["is_private"].toLocaleLowerCase() === "true") {
              metadata.is_private = true;
            } else {
              metadata.is_private = false;
            }

            if (body['main'] === "true") {
              metadata.main = true;
            }

            if (body['isAddVersion'] && body['parent']) {
              parent = body['parent'];
            }

            if (parent) {
              r = collection.update({
                'metadata.parent': parent,
                'metadata.current': true
              }, {
                $unset: {
                  'metadata.current': ''
                }
              });

              if (r) {
                metadata.parent = parent;

                if (body['locked_by'] && body['locked_by_name']) {
                  metadata.locked_by = body['locked_by'];
                  metadata.locked_by_name = body['locked_by_name'];
                }

                newFile.metadata = metadata;
                fileObj = collection.insert(newFile);

                if (body["overwrite"] && body["overwrite"].toLocaleLowerCase() === "true") {
                  collection.remove({
                    'metadata.instance': body['instance'],
                    'metadata.parent': parent,
                    'metadata.owner': body['owner'],
                    'metadata.approve': body['approve'],
                    'metadata.current': {
                      $ne: true
                    }
                  });
                }
              }
            } else {
              newFile.metadata = metadata;
              fileObj = collection.insert(newFile);
              fileObj.update({
                $set: {
                  'metadata.parent': fileObj._id
                }
              });
            }
          } else {
            fileObj = collection.insert(newFile);
          }

          size = fileObj.original.size;

          if (!size) {
            size = 1024;
          }

          result = new Object();
          result = {
            attach_id: fileObj._id,
            size: size
          };
          res.setHeader("x-amz-version-id", fileObj._id);
          return JsonRoutes.sendResult(res, {
            code: 200,
            data: {
              status: "success",
              data: result
            }
          });
        });
      } else {
        JsonRoutes.sendResult(res, {
          code: 200,
          data: {
            errors: [{
              errorMessage: "need file"
            }]
          }
        });
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
JsonRoutes.add("delete", "/api/workflow/open/cfs/:ins_id", function (req, res, next) {
  var attach_id, collection, current_user, current_user_info, e, file, hashData, ins_id, instance, result, space_id;

  try {
    ins_id = req.params.ins_id;

    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    current_user_info = db.users.findOne(current_user);

    if (!current_user_info) {
      throw new Meteor.Error('error', 'can not find user');
    }

    instance = uuflowManager.getInstance(ins_id);

    if (instance.state !== "draft") {
      throw new Meteor.Error('error', '申请单草稿状态时才能删除附件');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    hashData = req.body || {};
    attach_id = hashData["attach_id"];

    if (!attach_id) {
      throw new Meteor.Error('error', 'can not find attach_id');
    }

    collection = cfs.instances;
    file = collection.findOne({
      _id: attach_id,
      'metadata.instance': ins_id
    });

    if (file) {
      file.remove();
    } else {
      throw new Meteor.Error('error', '此附件不属于此申请单，或已被删除');
    }

    result = new Object();
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        status: "success",
        data: result
      }
    });
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
JsonRoutes.add("get", "/api/workflow/open/cfs/:attach_id", function (req, res, next) {
  var attach_id, current_user, current_user_info, e, space_id;

  try {
    attach_id = req.params.attach_id;

    if (!Steedos.APIAuthenticationCheck(req, res)) {
      return;
    }

    current_user = req.userId;
    space_id = req.headers['x-space-id'];

    if (!space_id) {
      throw new Meteor.Error('error', 'need header X_Space_Id');
    }

    current_user_info = db.users.findOne(current_user);

    if (!current_user_info) {
      throw new Meteor.Error('error', 'can not find user');
    }

    uuflowManager.getSpace(space_id);
    uuflowManager.isSpaceAdmin(space_id, current_user);
    res.statusCode = 302;
    res.setHeader("Location", Steedos.absoluteUrl("api/files/instances/") + attach_id + "?download=true");
    return res.end();
  } catch (error) {
    e = error;
    console.error(e.stack);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [{
          errorMessage: e.message
        }]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_forward_refill.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_forward_refill.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("post", "/api/workflow/forward_refill", function (req, res, next) {
  var approve, columns, forward_ins, forward_ins_values, original_ins, original_ins_fields, original_ins_form, original_ins_id, original_subtable_fields, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, row_data, subTable, table_data, trace, traces;
  console.log("=========回填子表==========");
  console.log("req?.query?.subTable", req != null ? (ref = req.query) != null ? ref.subTable : void 0 : void 0);
  console.log("=========分发回填的列==========");
  console.log("req?.query?.column", req != null ? (ref1 = req.query) != null ? ref1.column : void 0 : void 0);
  columns = req != null ? (ref2 = req.query) != null ? ref2.column.split(';') : void 0 : void 0;
  console.log("columns", columns);
  forward_ins = req != null ? (ref3 = req.body) != null ? ref3.instance : void 0 : void 0;
  subTable = req != null ? (ref4 = req.query) != null ? ref4.subTable : void 0 : void 0;

  if ((forward_ins != null ? forward_ins.state : void 0) === "completed" && (forward_ins != null ? (ref5 = forward_ins.distribute_from_instances) != null ? ref5.length : void 0 : void 0) > 0 && subTable && columns) {
    forward_ins_values = forward_ins != null ? forward_ins.values : void 0;
    original_ins_id = _.last(forward_ins != null ? forward_ins.distribute_from_instances : void 0);
    original_ins = db.instances.findOne(original_ins_id);
    original_ins_form = db.forms.findOne(original_ins != null ? original_ins.form : void 0);
    original_ins_fields = [];
    original_subtable_fields = [];
    console.log("original_ins_form?.current?._id", original_ins_form != null ? (ref6 = original_ins_form.current) != null ? ref6._id : void 0 : void 0);
    console.log("original_ins?.form_version", original_ins != null ? original_ins.form_version : void 0);

    if ((original_ins != null ? original_ins.form_version : void 0) === (original_ins_form != null ? (ref7 = original_ins_form.current) != null ? ref7._id : void 0 : void 0)) {
      original_ins_fields = (ref8 = original_ins_form.current) != null ? ref8.fields : void 0;
      original_ins_fields.forEach(function (original_ins_field) {
        console.log("original_ins_field", original_ins_field != null ? original_ins_field.code : void 0);

        if ((original_ins_field != null ? original_ins_field.code : void 0) === subTable && (original_ins_field != null ? original_ins_field.type : void 0) === 'table') {
          return original_subtable_fields = original_ins_field != null ? original_ins_field.fields : void 0;
        }
      });
    } else {
      if ((original_ins_form != null ? (ref9 = original_ins_form.historys) != null ? ref9.length : void 0 : void 0) > 0) {
        original_ins_form.historys.forEach(function (oh) {
          if ((original_ins != null ? original_ins.form_version : void 0) === oh._id) {
            original_ins_fields = oh != null ? oh.fields : void 0;
            return original_ins_fields.forEach(function (original_ins_field) {
              if ((original_ins_field != null ? original_ins_field.code : void 0) === subTable && (original_ins_field != null ? original_ins_field.type : void 0) === 'table') {
                return original_subtable_fields = original_ins_field != null ? original_ins_field.fields : void 0;
              }
            });
          }
        });
      }
    }

    console.log("original_subtable_fields", original_subtable_fields != null ? original_subtable_fields.length : void 0);

    if (original_subtable_fields) {
      traces = original_ins != null ? original_ins.traces : void 0;
      trace = traces[traces.length - 1];
      approve = trace != null ? trace.approves[0] : void 0;
      table_data = (approve != null ? approve.values[subTable] : void 0) || [];
      row_data = {};
      columns.forEach(function (column) {
        return row_data[column] = forward_ins_values[column] || "";
      });

      if (row_data && row_data !== {}) {
        table_data.push(row_data);
        traces[traces.length - 1].approves[0].values[subTable] = table_data;
        console.log(traces[traces.length - 1].approves[0].values[subTable]);
        db.instances.update(original_ins_id, {
          $set: {
            'traces': traces
          }
        });
        return JsonRoutes.sendResult(res, {
          code: 200,
          data: {
            'success': '回填成功'
          }
        });
      } else {
        return JsonRoutes.sendResult(res, {
          code: 200,
          data: {
            'info': '回填数据为空'
          }
        });
      }
    } else {
      return JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          'error': '原申请单无相关子表'
        }
      });
    }
  } else {
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'success': '申请单未结束'
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_workflow_forward_table_refill.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_workflow_forward_table_refill.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("post", "/api/workflow/forward_table_refill", function (req, res, next) {
  var a_table, a_table_values, approve, column_list, columns, d_ins, d_ins_fields, d_ins_form, d_ins_values, d_match_col, d_match_col_field, d_match_col_fields, d_subtable_fields, d_table, d_table_values, e, o_ins, o_ins_fields, o_ins_form, o_ins_id, o_match_col, o_match_col_field, o_match_col_fields, o_subtable_fields, o_table, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref3, ref4, ref5, ref6, ref7, ref8, ref9, table_data, trace, traces;

  try {
    console.log("=========原表子表==========");
    console.log("req?.query?.oTable", req != null ? (ref = req.query) != null ? ref.oTable : void 0 : void 0);
    console.log("=========现表子表==========");
    console.log("req?.query?.dTable", req != null ? (ref1 = req.query) != null ? ref1.dTable : void 0 : void 0);
    console.log("=========原表单的子表匹配列==========");
    console.log("req?.query?.oMatchCol", req != null ? (ref2 = req.query) != null ? ref2.oMatchCol : void 0 : void 0);
    console.log("=========现表单的子表匹配列==========");
    console.log("req?.query?.dMatchCol", req != null ? (ref3 = req.query) != null ? ref3.dMatchCol : void 0 : void 0);
    console.log("=========需要回填的列==========");
    console.log("req?.query?.refillCol", req != null ? (ref4 = req.query) != null ? ref4.refillCol : void 0 : void 0);
    d_ins = req != null ? (ref5 = req.body) != null ? ref5.instance : void 0 : void 0;

    if ((d_ins != null ? d_ins.state : void 0) === "completed") {
      if (req != null ? (ref6 = req.query) != null ? ref6.oTable : void 0 : void 0) {
        o_table = req != null ? (ref7 = req.query) != null ? ref7.oTable : void 0 : void 0;

        if (req != null ? (ref8 = req.query) != null ? ref8.dTable : void 0 : void 0) {
          d_table = req != null ? (ref9 = req.query) != null ? ref9.dTable : void 0 : void 0;
        } else {
          d_table = o_table;
        }

        if (req != null ? (ref10 = req.query) != null ? ref10.aTable : void 0 : void 0) {
          a_table = req != null ? (ref11 = req.query) != null ? ref11.aTable : void 0 : void 0;
        }

        if (req != null ? (ref12 = req.query) != null ? ref12.oMatchCol : void 0 : void 0) {
          o_match_col = req != null ? (ref13 = req.query) != null ? ref13.oMatchCol : void 0 : void 0;

          if (req != null ? (ref14 = req.query) != null ? ref14.dMatchCol : void 0 : void 0) {
            d_match_col = req != null ? (ref15 = req.query) != null ? ref15.dMatchCol : void 0 : void 0;
          } else {
            d_match_col = o_match_col;
          }

          columns = (req != null ? (ref16 = req.query) != null ? ref16.refillCol.split(';') : void 0 : void 0) || [];
          console.log("columns", columns);

          if (columns || columns.length < 1) {
            console.log("======================");
            console.log(d_table, o_match_col, columns);
            d_ins_values = d_ins != null ? d_ins.values : void 0;
            o_ins_id = _.last(d_ins != null ? d_ins.distribute_from_instances : void 0);
            o_ins = db.instances.findOne(o_ins_id);
            o_ins_form = db.forms.findOne(o_ins != null ? o_ins.form : void 0);
            d_ins_form = db.forms.findOne(d_ins != null ? d_ins.form : void 0);
            o_ins_fields = [];
            o_subtable_fields = [];
            d_ins_fields = [];
            d_subtable_fields = [];
            column_list = [];
            d_table_values = [];

            if ((o_ins != null ? o_ins.form_version : void 0) === (o_ins_form != null ? (ref17 = o_ins_form.current) != null ? ref17._id : void 0 : void 0)) {
              o_ins_fields = o_ins_form != null ? (ref18 = o_ins_form.current) != null ? ref18.fields : void 0 : void 0;
              o_ins_fields.forEach(function (o_ins_field) {
                if ((o_ins_field != null ? o_ins_field.type : void 0) === 'table' && (o_ins_field != null ? o_ins_field.code : void 0) === o_table) {
                  return o_subtable_fields = o_ins_field != null ? o_ins_field.fields : void 0;
                }
              });
            } else {
              if ((o_ins_form != null ? (ref19 = o_ins_form.historys) != null ? ref19.length : void 0 : void 0) > 0) {
                o_ins_form.historys.forEach(function (oh) {
                  if ((o_ins != null ? o_ins.form_version : void 0) === oh._id) {
                    o_ins_fields = oh != null ? oh.fields : void 0;
                    return o_ins_fields.forEach(function (o_ins_field) {
                      if ((o_ins_field != null ? o_ins_field.type : void 0) === 'table' && (o_ins_field != null ? o_ins_field.code : void 0) === o_table) {
                        return o_subtable_fields = o_ins_field != null ? o_ins_field.fields : void 0;
                      }
                    });
                  }
                });
              }
            }

            if ((d_ins != null ? d_ins.form_version : void 0) === (d_ins_form != null ? (ref20 = d_ins_form.current) != null ? ref20._id : void 0 : void 0)) {
              d_ins_fields = d_ins_form != null ? (ref21 = d_ins_form.current) != null ? ref21.fields : void 0 : void 0;
              d_ins_fields.forEach(function (d_ins_field) {
                if ((d_ins_field != null ? d_ins_field.type : void 0) === 'table' && (d_ins_field != null ? d_ins_field.code : void 0) === d_table || a_table && (d_ins_field != null ? d_ins_field.type : void 0) === 'table' && (d_ins_field != null ? d_ins_field.code : void 0) === a_table) {
                  return d_subtable_fields = d_subtable_fields.concat(d_ins_field != null ? d_ins_field.fields : void 0);
                }
              });
            } else {
              if ((d_ins_form != null ? (ref22 = d_ins_form.historys) != null ? ref22.length : void 0 : void 0) > 0) {
                d_ins_form.historys.forEach(function (dh) {
                  if ((d_ins != null ? d_ins.form_version : void 0) === dh._id) {
                    d_ins_fields = dh != null ? dh.fields : void 0;
                    return d_ins_fields.forEach(function (d_ins_field) {
                      if ((d_ins_field != null ? d_ins_field.type : void 0) === 'table' && (d_ins_field != null ? d_ins_field.code : void 0) === d_table || a_table && (d_ins_field != null ? d_ins_field.type : void 0) === 'table' && (d_ins_field != null ? d_ins_field.code : void 0) === a_table) {
                        return d_subtable_fields = d_subtable_fields.concat(d_ins_field != null ? d_ins_field.fields : void 0);
                      }
                    });
                  }
                });
              }
            }

            if (o_subtable_fields.length === 0) {
              console.log("o_subtable_fields", o_subtable_fields);
              throw new Meteor.Error('forward table refill error!', '原申请单无对应子表');
            }

            if (d_subtable_fields.length === 0) {
              throw new Meteor.Error('forward table refill error!', '分发的申请单无对应子表');
            }

            d_table_values = (d_ins != null ? d_ins.values[d_table] : void 0) || [];

            if (a_table) {
              a_table_values = (d_ins != null ? d_ins.values[a_table] : void 0) || [];

              if (a_table_values && (a_table_values != null ? a_table_values.length : void 0) === (d_table_values != null ? d_table_values.length : void 0)) {
                a_table_values.forEach(function (a_row, index) {
                  var key, results, value;
                  results = [];

                  for (key in meteorBabelHelpers.sanitizeForInObject(a_row)) {
                    value = a_row[key];
                    results.push(d_table_values[index][key] = value);
                  }

                  return results;
                });
              }
            }

            if (d_table_values.length === 0) {
              throw new Meteor.Error('forward table refill error!', '分发的申请单子表数据为空');
            }

            o_match_col_fields = o_subtable_fields.filter(function (m) {
              return m.code === o_match_col;
            });
            d_match_col_fields = d_subtable_fields.filter(function (m) {
              return m.code === d_match_col;
            });

            if (o_match_col_fields.length === 0) {
              throw new Meteor.Error('forward table refill error!', '原申请单子表无对应匹配列');
            }

            if (d_match_col_fields.length === 0) {
              throw new Meteor.Error('forward table refill error!', '分发的申请单子表无对应匹配列');
            }

            o_match_col_field = o_match_col_fields[0];
            d_match_col_field = d_match_col_fields[0];

            if ((o_match_col_field != null ? o_match_col_field.type : void 0) !== (d_match_col_field != null ? d_match_col_field.type : void 0)) {
              throw new Meteor.Error('forward table refill error!', '分发的申请单和原申请单子表的匹配列字段不一致');
            }

            columns.forEach(function (column) {
              var col, cols, d_col, d_col_fields, o_col, o_col_fields;
              cols = column.split('-') || [];

              if (cols.length === 2) {
                o_col = cols[0];
                d_col = cols[1];
                o_col_fields = o_subtable_fields.filter(function (m) {
                  return m.code === o_col;
                });
                d_col_fields = d_subtable_fields.filter(function (m) {
                  return m.code === d_col;
                });

                if (o_col_fields.length === 0) {
                  throw new Meteor.Error('forward table refill error!', '原申请单子表无对应回填列');
                }

                if (d_col_fields.length === 0) {
                  throw new Meteor.Error('forward table refill error!', '分发的申请单子表无对应回填列');
                }

                if ((o_col_fields != null ? o_col_fields.type : void 0) !== (d_col_fields != null ? d_col_fields.type : void 0)) {
                  throw new Meteor.Error('forward table refill error!', '回填列字段类型不一致');
                }

                col = {
                  o_col: o_col,
                  d_col: d_col
                };
                return column_list.push(col);
              } else {
                throw new Meteor.Error('forward table refill error!', '回填列不匹配');
              }
            });
            traces = o_ins != null ? o_ins.traces : void 0;
            trace = traces[traces.length - 1];
            approve = trace != null ? trace.approves[0] : void 0;
            table_data = (approve != null ? approve.values[o_table] : void 0) || [];
            d_table_values.forEach(function (d_row) {
              var count, has_obj, row_data;
              has_obj = false;
              count = -1;
              table_data.forEach(function (o_row, index) {
                if (o_row[o_match_col] === d_row[d_match_col]) {
                  has_obj = true;
                  return count = index;
                }
              });

              if (has_obj === true) {
                return column_list.forEach(function (col) {
                  return table_data[count][col != null ? col.o_col : void 0] = d_row[col != null ? col.d_col : void 0];
                });
              } else {
                row_data = {};
                row_data[o_match_col] = d_row[d_match_col];
                column_list.forEach(function (col) {
                  return row_data[col != null ? col.o_col : void 0] = d_row[col != null ? col.d_col : void 0];
                });
                return table_data.push(row_data);
              }
            });
            traces[traces.length - 1].approves[0].values = o_ins != null ? o_ins.values : void 0;
            traces[traces.length - 1].approves[0].values[o_table] = table_data;
            db.instances.update(o_ins_id, {
              $set: {
                'traces': traces
              }
            });
            JsonRoutes.sendResult(res, {
              code: 200,
              data: {
                'success': '回填成功'
              }
            });
          } else {
            throw new Meteor.Error('forward table refill error!', 'webhook未配置子表回填列字段 columns 值');
          }
        } else {
          throw new Meteor.Error('forward table refill error!', 'webhook未配置匹配列字段 oMatchCol 值');
        }
      } else {
        throw new Meteor.Error('forward table refill error!', 'webhook未配置原表单子表 oTable 值');
      }
    } else {
      throw new Meteor.Error('forward table refill error!', '申请单未结束');
    }
  } catch (error) {
    e = error;
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [e]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_sub_table_sort.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_sub_table_sort.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("post", "/api/workflow/sub_table_sort", function (req, res, next) {
  var e, ins, new_table_values, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, sort_col, sub_table, sub_table_values, sum_col;

  try {
    console.log("=========子表==========");
    console.log("req?.query?.subTable", req != null ? (ref = req.query) != null ? ref.subTable : void 0 : void 0);
    console.log("=========子表总分列==========");
    console.log("req?.query?.sumCol", req != null ? (ref1 = req.query) != null ? ref1.sumCol : void 0 : void 0);
    console.log("=========子表排序列==========");
    console.log("req?.query?.sortCol", req != null ? (ref2 = req.query) != null ? ref2.sortCol : void 0 : void 0);
    console.log("=========子表单列需要计算的和==========");
    console.log("req?.query?.singleCols", req != null ? (ref3 = req.query) != null ? ref3.singleCols : void 0 : void 0);
    sub_table = req != null ? (ref4 = req.query) != null ? ref4.subTable : void 0 : void 0;

    if (!sub_table) {
      console.log("=====sub_table======");
      throw new Meteor.Error('table sort error!', 'webhook 未配置 subTable 字段');
    }

    sum_col = req != null ? (ref5 = req.query) != null ? ref5.sumCol : void 0 : void 0;

    if (!sum_col) {
      console.log("=====sum_col======");
      throw new Meteor.Error('table sort error!', 'webhook 未配置 sumCol 字段');
    }

    sort_col = req != null ? (ref6 = req.query) != null ? ref6.sortCol : void 0 : void 0;

    if (!sort_col) {
      console.log("=====sort_col======");
      throw new Meteor.Error('table sort error!', 'webhook 未配置 sortCol 字段');
    }

    ins = req != null ? (ref7 = req.body) != null ? ref7.instance : void 0 : void 0;
    sub_table_values = ins.values[sub_table];

    if ((sub_table_values != null ? sub_table_values.length : void 0) > 0) {
      var JsonSort = function (jsonArr, key, asc) {
        for (var j = 1, jl = jsonArr.length; j < jl; j++) {
          var temp = jsonArr[j],
              val = Number(temp[key]),
              i = j - 1;

          if (asc == true) {
            while (i >= 0 && Number(jsonArr[i][key]) > val) {
              jsonArr[i + 1] = jsonArr[i];
              i = i - 1;
            }
          } else {
            while (i >= 0 && Number(jsonArr[i][key]) < val) {
              jsonArr[i + 1] = jsonArr[i];
              i = i - 1;
            }
          }

          jsonArr[i + 1] = temp;
        }

        return jsonArr;
      };

      ;
      new_table_values = JsonSort(sub_table_values, sum_col, false);
      console.log("new_table_values", new_table_values);
      new_table_values.forEach(function (obj, index) {
        if (sort_col && obj[sum_col]) {
          return obj[sort_col] = (index + 1).toString();
        }
      });
      console.log("new_table_values", new_table_values);
      ins.values[sub_table] = new_table_values;
      db.instances.update(ins._id, {
        $set: {
          'values': ins.values
        }
      });
      console.log("success");
      return JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          'success': '计算排序成功'
        }
      });
    } else {
      throw new Meteor.Error('table sort error!', '子表数据为空');
    }
  } catch (error) {
    e = error;
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        errors: [e]
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"test_webhook.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/test_webhook.coffee                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (process.env.CREATOR_NODE_ENV === 'development') {
  JsonRoutes.add('post', '/test/webhook', function (req, res, next) {
    var e, hashData;

    try {
      hashData = req.body;
      console.log('action: ', hashData.action);
      console.log('from_user: ', hashData.from_user);
      console.log('to_users: ', hashData.to_users);
      return JsonRoutes.sendResult(res, {
        code: 200,
        data: {}
      });
    } catch (error) {
      e = error;
      console.error(e.stack);
      return JsonRoutes.sendResult(res, {
        code: 200,
        data: {
          errors: [{
            errorMessage: e.message
          }]
        }
      });
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_formula_users.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_formula_users.coffee                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("post", "/api/formula/users", function (req, res, next) {
  var current_user, current_user_info, spaceId, spaceUsers, space_user, userIds;
  current_user_info = uuflowManager.check_authorization(req);
  current_user = current_user_info._id;
  userIds = req.body.userIds;
  spaceId = req.body.spaceId;
  spaceUsers = [];
  space_user = db.space_users.findOne({
    user: current_user,
    space: spaceId
  }, {
    fields: {
      _id: 1
    }
  });

  if (!space_user) {
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '无权限'
      }
    });
  }

  if (!userIds || !spaceId) {
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '缺少参数'
      }
    });
  }

  spaceUsers = WorkflowManager.getFormulaUserObjects(spaceId, userIds);
  return JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      'spaceUsers': spaceUsers
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"api_formula_organizations.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/routes/api_formula_organizations.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("post", "/api/formula/orgs", function (req, res, next) {
  var current_user, current_user_info, orgIds, orgs, spaceId, space_user;
  current_user_info = uuflowManager.check_authorization(req);
  current_user = current_user_info._id;
  orgIds = req.body.orgIds;
  spaceId = req.body.spaceId;
  space_user = db.space_users.findOne({
    user: current_user,
    space: spaceId
  }, {
    fields: {
      _id: 1
    }
  });

  if (!space_user) {
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '无权限'
      }
    });
  }

  if (!orgIds || !spaceId) {
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        'errors': '缺少参数'
      }
    });
  }

  orgs = WorkflowManager.getFormulaOrgObjects(orgIds);
  return JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      'orgs': orgs
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"methods":{"set_instance_step_approve.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/set_instance_step_approve.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  set_instance_step_approve: function (ins_id, step_approve, stepsApprovesOptions) {
    var _keys1, _keys2, ins, keys, stepsApproves;

    if (!this.userId) {
      return;
    }

    ins = db.instances.findOne({
      _id: ins_id
    }, {
      fields: {
        state: 1
      }
    });

    if (ins.state !== 'draft') {
      return;
    }

    _keys1 = _.keys(step_approve);
    _keys2 = _.keys(stepsApprovesOptions);
    keys = _.compact(_.union(_keys1, _keys2));
    stepsApproves = {};

    _.each(keys, function (stepId) {
      var stepApproves, stepsApproveOptions;
      stepApproves = step_approve[stepId];
      stepsApproveOptions = stepsApprovesOptions[stepId];

      if (stepApproves) {
        stepsApproves[stepId] = stepApproves;

        if (stepsApproveOptions) {
          if (_.isArray(stepApproves)) {
            stepsApproveOptions = stepApproves.concat(stepsApproveOptions);
          } else {
            stepsApproveOptions.push(stepApproves);
          }
        }
      }

      if (stepsApproveOptions) {
        return stepsApproves[stepId + '_options'] = _.uniq(stepsApproveOptions);
      }
    });

    return db.instances.update({
      _id: ins_id
    }, {
      $set: {
        step_approve: stepsApproves
      }
    });
  },
  set_instance_skip_steps: function (ins_id, stepId, action) {
    if (action === 'pull') {
      return db.instances.update({
        _id: ins_id
      }, {
        $pull: {
          skip_steps: stepId
        }
      });
    } else if (action === 'push') {
      return db.instances.update({
        _id: ins_id
      }, {
        $push: {
          skip_steps: stepId
        }
      });
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"get_instance_data.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/get_instance_data.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({
  get_instance_data: function (instance_id, formCached, flowCached) {
    check(instance_id, String);
    check(formCached, Boolean);
    check(flowCached, Boolean);
    var instance = db.instances.findOne(instance_id);
    if (!instance) return {
      instance: null
    };
    if (formCached && flowCached) return {
      instance: instance
    };

    if (!formCached) {
      var form = db.forms.findOne(instance.form);
      var form_version = {};

      if (form.current._id == instance.form_version) {
        form_version = form.current;
      } else {
        form_version = _.where(form.historys, {
          _id: instance.form_version
        })[0];
      }
    }

    if (!flowCached) {
      var flow = db.flows.findOne(instance.flow);
      var flow_version = {};

      if (flow.current._id == instance.flow_version) {
        flow_version = flow.current;
      } else {
        flow_version = _.where(flow.historys, {
          _id: instance.flow_version
        })[0];
      }
    }

    return {
      instance: instance,
      form_version: form_version,
      flow_version: flow_version
    };
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"save_instance.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/save_instance.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({
  draft_save_instance: function (ins) {
    if (!this.userId) return;
    return uuflowManager.draft_save_instance(ins, this.userId);
  },
  inbox_save_instance: function (approve) {
    if (!this.userId) return;
    var setObj = {};
    var index = 0;
    var ins_id = approve.instance;
    var trace_id = approve.trace;
    var approve_id = approve.id;
    var values = approve.values;
    var next_steps = approve.next_steps;
    var description = approve.description;
    var judge = approve.judge;
    var instance = db.instances.findOne(ins_id, {
      fields: {
        traces: 1,
        flow_version: 1,
        flow: 1,
        state: 1,
        form: 1,
        form_version: 1,
        values: 1,
        code: 1
      }
    });
    var traces = instance.traces;

    var current_trace = _.find(traces, function (t) {
      return t._id == trace_id;
    });

    var current_approve = _.find(current_trace.approves, function (a) {
      return a._id == approve_id;
    }); // 判断一个instance是否为审核中状态


    var current_user = db.users.findOne({
      _id: this.userId
    }, {
      fields: {
        locale: 1
      }
    });
    var lang = current_user.locale == 'zh-cn' ? 'zh-CN' : 'en';

    try {
      uuflowManager.isInstancePending(instance, lang); // 判断一个trace是否为未完成状态

      uuflowManager.isTraceNotFinished(current_trace); // 判断一个approve是否为未完成状态

      uuflowManager.isApproveNotFinished(current_approve); // 判断当前用户是否approve 对应的处理人或代理人

      uuflowManager.isHandlerOrAgent(current_approve, this.userId);
    } catch (e) {
      console.log(e.stack);
      return true;
    }

    var flow_version = instance.flow_version;
    var flow_id = instance.flow;
    var step_id = "";
    step_id = current_trace.step;
    var flow = db.flows.findOne(flow_id, {
      fields: {
        current: 1,
        historys: 1
      }
    });
    var step = null;

    if (flow.current._id == flow_version) {
      flow.current.steps.forEach(function (s) {
        if (s._id == step_id) step = s;
      });
    } else {
      flow.historys.forEach(function (h) {
        h.steps.forEach(function (s) {
          if (s._id == step_id) step = s;
        });
      });
    }

    if (!step) return false;
    var step_type = step.step_type;
    current_trace.approves.forEach(function (a, idx) {
      if (a._id == approve_id) {
        index = idx;
      }
    });
    var key_str = 'traces.$.approves.' + index + '.';
    var permissions_values = uuflowManager.getApproveValues(approve.values, step.permissions, instance.form, instance.form_version);
    var change_values = approveManager.getChangeValues(instance.values, permissions_values);
    setObj.values = _.extend(instance.values || {}, permissions_values);

    if (!_.isEmpty(change_values)) {
      values_history = current_approve.values_history || [];
      values_history.push({
        values: change_values,
        create: new Date()
      });
      setObj[key_str + 'values_history'] = values_history;
    }

    setObj[key_str + 'is_read'] = true;
    setObj[key_str + 'read_date'] = new Date();
    setObj[key_str + 'values'] = setObj.values;
    setObj[key_str + 'description'] = description;
    setObj[key_str + 'next_steps'] = next_steps;

    if (step_type == "submit" || step_type == "start") {
      setObj[key_str + 'judge'] = "submitted";
    } else {
      setObj[key_str + 'judge'] = judge;
    }

    setObj.modified = new Date();
    setObj.modified_by = this.userId; // 计算申请单标题

    var form = db.forms.findOne(instance.form);
    var form_v = uuflowManager.getFormVersion(form, instance.form_version);
    var name_forumla = form_v.name_forumla;

    if (name_forumla) {
      setObj.name = uuflowManager.getInstanceName(instance, setObj.values);
    }

    db.instances.update({
      _id: ins_id,
      "traces._id": trace_id
    }, {
      $set: setObj
    });
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"trace_approve_cc.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/trace_approve_cc.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({
  cc_do: function (approve, cc_user_ids, description) {
    var setObj = {};
    var ins_id = approve.instance;
    var trace_id = approve.trace;
    var approve_id = approve._id;
    var instance = db.instances.findOne(ins_id, {
      fields: {
        space: 1,
        traces: 1,
        cc_users: 1,
        values: 1
      }
    });
    var current_user_id = this.userId;
    var space_id = instance.space;
    var new_approves = [];
    var from_user_name = db.users.findOne(current_user_id, {
      fields: {
        name: 1
      }
    }).name;
    cc_user_ids.forEach(function (userId, idx) {
      var user = db.users.findOne(userId, {
        fields: {
          name: 1
        }
      });
      var space_user = db.space_users.findOne({
        space: space_id,
        user: userId
      }, {
        fields: {
          organization: 1
        }
      });
      var org_id = space_user.organization;
      var organization = db.organizations.findOne(org_id, {
        fields: {
          name: 1,
          fullname: 1
        }
      });
      var agent = uuflowManager.getAgent(space_id, userId);
      var handler_id = userId;
      var handler_info = user;
      var handler_space_user = space_user;
      var handler_org_info = organization;

      if (agent) {
        handler_id = agent;
        handler_info = db.users.findOne(agent, {
          fileds: {
            name: 1
          }
        });
        handler_space_user = uuflowManager.getSpaceUser(space_id, agent);
        handler_org_info = uuflowManager.getSpaceUserOrgInfo(handler_space_user);
        cc_user_ids[idx] = agent;
      }

      var appr = {
        '_id': new Mongo.ObjectID()._str,
        'instance': ins_id,
        'trace': trace_id,
        'is_finished': false,
        'user': userId,
        'user_name': user.name,
        'handler': handler_id,
        'handler_name': handler_info.name,
        'handler_organization': handler_space_user.organization,
        'handler_organization_name': handler_org_info.name,
        'handler_organization_fullname': handler_org_info.fullname,
        'type': 'cc',
        'start_date': new Date(),
        'is_read': false,
        'from_user': current_user_id,
        'from_user_name': from_user_name,
        'opinion_fields_code': approve.opinion_fields_code,
        'sign_field_code': approve.opinion_fields_code && approve.opinion_fields_code.length == 1 ? approve.opinion_fields_code[0] : "",
        'from_approve_id': approve_id,
        'cc_description': description
      };

      if (agent) {
        appr.agent = agent;
      }

      uuflowManager.setRemindInfo(instance.values, appr);
      new_approves.push(appr);
    });
    setObj.modified = new Date();
    setObj.modified_by = this.userId;
    db.instances.update({
      _id: ins_id,
      'traces._id': trace_id
    }, {
      $set: setObj,
      $addToSet: {
        'traces.$.approves': {
          $each: new_approves
        }
      },
      $push: {
        cc_users: {
          $each: cc_user_ids
        }
      }
    });
    instance = db.instances.findOne(ins_id);
    current_user_info = db.users.findOne(current_user_id);
    pushManager.send_instance_notification("trace_approve_cc", instance, "", current_user_info, cc_user_ids);
    flow_id = instance.flow;
    approve.cc_user_ids = cc_user_ids; // 记录下本次传阅的人员ID作为hook接口中的参数
    // 如果已经配置webhook并已激活则触发

    pushManager.triggerWebhook(flow_id, instance, approve, 'cc_do', current_user_id, cc_user_ids);
    return true;
  },
  cc_read: function (approve) {
    var setObj = {};
    var ins_id = approve.instance;
    var trace_id = approve.trace;
    var instance = db.instances.findOne(ins_id, {
      fields: {
        traces: 1
      }
    });
    var current_user_id = this.userId;

    var current_trace = _.find(instance.traces, function (t) {
      return t._id == trace_id;
    });

    var index = 0;
    current_trace.approves.forEach(function (a, idx) {
      if (a.type == 'cc' && a.handler == current_user_id && !a.is_read) {
        index = idx;
      }
    });
    setObj['traces.$.approves.' + index + '.is_read'] = true;
    setObj['traces.$.approves.' + index + '.read_date'] = new Date();
    setObj.traces = traces;
    db.instances.update({
      _id: ins_id,
      'traces._id': trace_id
    }, {
      $set: setObj
    });
    return true;
  },
  cc_submit: function (ins_id, description, myApprove, ccHasEditPermission) {
    var setObj = {};
    var instance = db.instances.findOne(ins_id);
    var traces = instance.traces;
    var current_user_id = this.userId;
    var flow = uuflowManager.getFlow(instance.flow);
    var values = myApprove.values || {};
    var approve_id = myApprove._id;
    var myTrace;

    for (let tidx = 0; tidx < traces.length; tidx++) {
      const t = traces[tidx];

      if (t.approves) {
        for (let aidx = 0; aidx < t.approves.length; aidx++) {
          const a = t.approves[aidx];

          if (a.type == 'cc' && a.handler == current_user_id && a.is_finished == false) {
            var upobj = {};
            var key_str = 'traces.$.approves.' + aidx + '.';
            upobj[key_str + 'is_finished'] = true;
            upobj[key_str + 'is_read'] = true;
            upobj[key_str + 'finish_date'] = new Date();
            upobj[key_str + 'judge'] = "submitted";
            upobj[key_str + 'cost_time'] = new Date() - a.start_date;

            if (approve_id == a._id && !t.is_finished && ccHasEditPermission) {
              myTrace = t;
              var step = uuflowManager.getStep(instance, flow, t.step);
              upobj[key_str + "values"] = uuflowManager.getApproveValues(values, step["permissions"], instance.form, instance.form_version);
            } //设置意见，意见只添加到最后一条approve中


            if (approve_id == a._id) {
              upobj[key_str + 'description'] = description;
            }

            db.instances.update({
              _id: ins_id,
              'traces._id': t._id
            }, {
              $set: upobj
            });
          }
        }
      }
    }

    if (myApprove) {
      setObj.modified = new Date();
      setObj.modified_by = this.userId;

      if (ccHasEditPermission && myApprove && !myTrace.is_finished) {
        var ins = uuflowManager.getInstance(ins_id);
        var updated_values = uuflowManager.getUpdatedValues(ins, approve_id);
        setObj.values = updated_values;
        setObj.name = uuflowManager.getInstanceName(instance);
      }

      db.instances.update({
        _id: ins_id,
        'traces._id': myApprove.trace
      }, {
        $set: setObj,
        $pull: {
          cc_users: current_user_id
        },
        $addToSet: {
          outbox_users: {
            $each: [current_user_id, myApprove.user]
          }
        }
      });
      instance = db.instances.findOne(ins_id);
      current_user_info = db.users.findOne(current_user_id); //传阅提交不通知传阅者

      if (false && description && myApprove && myApprove.from_user) {
        pushManager.send_instance_notification("trace_approve_cc_submit", instance, "", current_user_info, [myApprove.from_user]);
      }

      pushManager.send_message_to_specifyUser("current_user", current_user_id);
      flow_id = instance.flow; // 如果已经配置webhook并已激活则触发

      pushManager.triggerWebhook(flow_id, instance, myApprove, 'cc_submit', current_user_id, []);
    }

    return true;
  },
  cc_remove: function (instanceId, approveId) {
    var setObj = {};
    var instance = db.instances.findOne(instanceId, {
      fields: {
        traces: 1,
        cc_users: 1
      }
    });
    var traces = instance.traces;
    var trace_id,
        remove_user_id,
        multi = false;
    traces.forEach(function (t) {
      if (t.approves) {
        t.approves.forEach(function (a, idx) {
          if (a._id == approveId) {
            trace_id = a.trace;
            remove_user_id = a.handler;
            setObj['traces.$.approves.' + idx + '.judge'] = 'terminated';
            setObj['traces.$.approves.' + idx + '.is_finished'] = true;
            setObj['traces.$.approves.' + idx + '.finish_date'] = new Date();
            setObj['traces.$.approves.' + idx + '.is_read'] = true;
            setObj['traces.$.approves.' + idx + '.read_date'] = new Date();
          }
        });
      }
    });
    if (!trace_id || !remove_user_id) return;
    var multi = 0;
    traces.forEach(function (t) {
      if (t.approves) {
        t.approves.forEach(function (a) {
          if (a.handler == remove_user_id && a.type == 'cc' && a.is_finished == false) {
            multi++;
          }
        });
      }
    });
    setObj.modified = new Date();
    setObj.modified_by = this.userId;

    if (multi > 1) {
      db.instances.update({
        _id: instanceId,
        'traces._id': trace_id
      }, {
        $set: setObj
      });
    } else {
      db.instances.update({
        _id: instanceId,
        'traces._id': trace_id
      }, {
        $set: setObj,
        $pull: {
          cc_users: remove_user_id
        }
      });
    }

    pushManager.send_message_to_specifyUser("current_user", remove_user_id);
    return true;
  },
  cc_save: function (ins_id, description, myApprove, ccHasEditPermission) {
    var setObj = {};
    var instance = db.instances.findOne(ins_id);
    var traces = instance.traces;
    var current_user_id = this.userId;
    var myTrace;
    traces.forEach(function (t) {
      if (t.approves) {
        t.approves.forEach(function (a, idx) {
          if (a.handler == current_user_id && a.type == 'cc' && a.is_finished == false) {
            var upobj = {};
            upobj['traces.$.approves.' + idx + '.judge'] = "submitted";
            upobj['traces.$.approves.' + idx + '.read_date'] = new Date();
            db.instances.update({
              _id: ins_id,
              'traces._id': t._id
            }, {
              $set: upobj
            });
          }
        });
      }
    });
    var index = 0;
    var currentStepId; //设置意见，意见只添加到最后一条approve中

    traces.forEach(function (t) {
      if (myApprove && t._id === myApprove.trace) {
        currentStepId = t.step;
        myTrace = t;

        if (t.approves) {
          t.approves.forEach(function (a, idx) {
            if (a._id === myApprove._id) {
              index = idx;
            }
          });
        }
      }
    });
    setObj['traces.$.approves.' + index + '.description'] = description;
    var updateObj = {};

    if (ccHasEditPermission && myApprove && !myTrace.is_finished) {
      var key_str = 'traces.$.approves.' + index + '.';
      var flow = uuflowManager.getFlow(instance.flow);
      var step = uuflowManager.getStep(instance, flow, currentStepId);
      var permissions_values = uuflowManager.getApproveValues(myApprove.values, step.permissions, instance.form, instance.form_version);
      var change_values = approveManager.getChangeValues(instance.values, permissions_values);
      setObj.values = _.extend(instance.values || {}, permissions_values);

      if (!_.isEmpty(change_values)) {
        var pushObj = {};
        pushObj[key_str + 'values_history'] = {
          values: change_values,
          create: new Date()
        };
        updateObj.$push = pushObj;
      }

      setObj.name = uuflowManager.getInstanceName(instance);
    }

    updateObj.$set = setObj;
    db.instances.update({
      _id: ins_id,
      'traces._id': myApprove.trace
    }, updateObj);
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"forward_instance.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/forward_instance.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({
  // 改为通过api调用
  forward_instance: function (instance_id, space_id, flow_id, hasSaveInstanceToAttachment, description, isForwardAttachments, selectedUsers, action_type, related, from_approve_id) {
    if (!this.userId) throw new Meteor.Error('not-authorized');
    return;
  },
  forward_remove: function (instance_id, trace_id, approve_id) {
    check(instance_id, String);
    check(trace_id, String);
    check(approve_id, String);
    var ins = db.instances.findOne(instance_id);

    if (!ins) {
      throw new Meteor.Error('params error!', 'record not exists!');
    }

    var trace = _.find(ins.traces, function (t) {
      return t._id == trace_id;
    });

    var approve = _.find(trace.approves, function (appr) {
      return appr._id == approve_id;
    });

    var hasAdminPermission = WorkflowManager.hasFlowAdminPermission(ins.flow, ins.space, this.userId);

    if (!approve || !['forward', 'distribute'].includes(approve.type) || !approve.forward_instance) {
      if (!hasAdminPermission) {
        if (approve.from_user != this.userId) throw new Meteor.Error('error!', 'instance_forward_cannot_cancel');
      }
    }

    var forward_instance_id = approve.forward_instance;
    var forward_instance = db.instances.findOne(forward_instance_id);

    if (forward_instance) {
      if (forward_instance.state != "draft") {
        if (!hasAdminPermission) throw new Meteor.Error('error!', 'instance_forward_instance_state_changed');
      }

      var inbox_users = forward_instance.inbox_users || [];
      forward_instance.deleted = new Date();
      forward_instance.deleted_by = this.userId;
      var deleted_forward_instance_id = db.deleted_instances.insert(forward_instance);

      if (deleted_forward_instance_id) {
        db.instances.remove({
          _id: forward_instance_id
        }); // 删除申请单后重新计算inbox_users的badge

        _.each(inbox_users, function (u_id) {
          pushManager.send_message_to_specifyUser("current_user", u_id);
        });
      }
    }

    var set_obj = new Object();
    set_obj.modified = new Date();
    set_obj.modified_by = this.userId;

    _.each(trace.approves, function (appr, idx) {
      if (appr._id == approve_id) {
        set_obj['traces.$.approves.' + idx + '.judge'] = 'terminated';
        set_obj['traces.$.approves.' + idx + '.is_finished'] = true;
        set_obj['traces.$.approves.' + idx + '.finish_date'] = new Date();
        set_obj['traces.$.approves.' + idx + '.is_read'] = true;
        set_obj['traces.$.approves.' + idx + '.read_date'] = new Date();
      }
    });

    db.instances.update({
      _id: instance_id,
      "traces._id": trace_id
    }, {
      $set: set_obj
    });
    return true;
  },
  cancelDistribute: function (instance_id, approve_ids) {
    check(instance_id, String);
    check(approve_ids, Array);
    var ins = db.instances.findOne(instance_id);

    if (!ins) {
      throw new Meteor.Error('params error!', 'record not exists!');
    }

    userId = this.userId;
    var hasAdminPermission = WorkflowManager.hasFlowAdminPermission(ins.flow, ins.space, userId);

    _.each(ins.traces, function (t) {
      if (t.approves) {
        var exists = false;
        var set_obj = new Object();

        _.each(t.approves, function (a, idx) {
          if (approve_ids.includes(a._id) && (a.from_user == userId || hasAdminPermission) && 'distribute' == a.type && a.forward_instance) {
            var forward_instance_id = a.forward_instance;
            var forward_instance = db.instances.findOne(forward_instance_id);

            if (forward_instance) {
              if (forward_instance.state != "draft") {
                return;
              }

              var inbox_users = forward_instance.inbox_users || [];
              forward_instance.deleted = new Date();
              forward_instance.deleted_by = userId;
              var deleted_forward_instance_id = db.deleted_instances.insert(forward_instance);

              if (deleted_forward_instance_id) {
                db.instances.remove({
                  _id: forward_instance_id
                }); // 删除申请单后重新计算inbox_users的badge

                _.each(inbox_users, function (u_id) {
                  pushManager.send_message_to_specifyUser("current_user", u_id);
                });
              }

              set_obj['traces.$.approves.' + idx + '.judge'] = 'terminated';
              set_obj['traces.$.approves.' + idx + '.is_finished'] = true;
              set_obj['traces.$.approves.' + idx + '.finish_date'] = new Date();
              set_obj['traces.$.approves.' + idx + '.is_read'] = true;
              set_obj['traces.$.approves.' + idx + '.read_date'] = new Date();
            }

            exists = true;
          }
        });

        if (!exists) return;
        set_obj.modified = new Date();
        set_obj.modified_by = userId;
        db.instances.update({
          _id: instance_id,
          "traces._id": t._id
        }, {
          $set: set_obj
        });
      }
    });

    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cfs_instances.js":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/cfs_instances.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({
  cfs_instances_remove: function (file_id) {
    check(file_id, String);
    cfs.instances.remove(file_id);
    return true;
  },
  cfs_instances_set_current: function (file_id) {
    check(file_id, String);
    cfs.instances.update({
      _id: file_id
    }, {
      $set: {
        'metadata.current': true
      }
    });
    return true;
  },
  cfs_instances_lock: function (file_id, user_id, user_name) {
    cfs.instances.update({
      _id: file_id
    }, {
      $set: {
        'metadata.locked_by': user_id,
        'metadata.locked_by_name': user_name,
        'metadata.locked_time': new Date()
      }
    });
    return true;
  },
  cfs_instances_unlock: function (file_id) {
    cfs.instances.update({
      _id: file_id
    }, {
      $unset: {
        'metadata.locked_by': '',
        'metadata.locked_by_name': '',
        'metadata.locked_time': ''
      }
    });
    return true;
  },
  download_space_instance_attachments_to_disk: function (spaceId, cfsRecordIds) {
    if (!this.userId) return "不符合执行条件";
    if (Meteor.users.find({
      _id: this.userId,
      is_cloudadmin: true
    }).count() < 1) return "不符合执行条件";
    check(spaceId, String);
    var store = "instances";

    var fs = require('fs');

    var path = require('path');

    var mkdirp = require('mkdirp');

    var pathname = path.join(__meteor_bootstrap__.serverDir, '../../../cfs/spaceInstanceAttachments'); // Set absolute path

    var absolutePath = path.resolve(pathname); // Ensure the path exists

    mkdirp.sync(absolutePath);
    console.log('absolutePath: ', absolutePath);
    console.time('download_space_instance_attachments_to_disk');
    var query = {
      'metadata.space': spaceId
    };

    if (cfsRecordIds) {
      query._id = {
        $in: cfsRecordIds
      };
    }

    var downloadFailedRecordIds = [];
    cfs.instances.find(query).forEach(function (c) {
      try {
        var fileName = store + '-' + c._id + '-' + c.name();
        var filePath = path.join(absolutePath, fileName);
        Meteor.wrapAsync(function (callback) {
          try {
            var writer = fs.createWriteStream(filePath);
            writer.on('finish', function () {
              if (callback && _.isFunction(callback)) callback();
              return;
            });
            var reader = c.createReadStream(store);
            reader.on('error', function (error) {
              downloadFailedRecordIds.push(c._id);
              console.error('download_space_instance_attachments_to_disk: ', c._id);
              console.error(error.stack);
              if (callback && _.isFunction(callback)) callback();
              return;
            });
            reader.pipe(writer);
          } catch (error) {
            console.error('download_space_instance_attachments_to_disk: ', c._id);
            console.error(error.stack);
            if (callback && _.isFunction(callback)) callback();
            return;
          }
        })();
      } catch (error) {
        console.error('download_space_instance_attachments_to_disk: ', c._id);
        console.error(error.stack);
      }
    });

    if (downloadFailedRecordIds.length > 0) {
      console.error('downloadFailedRecordIds: ');
      console.error(downloadFailedRecordIds);
    }

    console.timeEnd('download_space_instance_attachments_to_disk');
    return downloadFailedRecordIds;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_approve.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_approve.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  set_approve_have_read: function (instanceId, traceId, approveId) {
    var instance, ref, self, setObj, trace;

    if (!this.userId) {
      return;
    }

    self = this;
    instance = db.instances.findOne({
      _id: instanceId,
      "traces._id": traceId
    }, {
      fields: {
        "traces.$": 1
      }
    });

    if ((instance != null ? (ref = instance.traces) != null ? ref.length : void 0 : void 0) > 0) {
      trace = instance.traces[0];
      setObj = {
        modified: new Date(),
        modified_by: self.userId
      };
      trace.approves.forEach(function (approve, idx) {
        if (approve._id === approveId && !approve.is_read) {
          setObj["traces.$.approves." + idx + ".is_read"] = true;
          return setObj["traces.$.approves." + idx + ".read_date"] = new Date();
        }
      });

      if (!_.isEmpty(setObj)) {
        db.instances.update({
          _id: instanceId,
          "traces._id": traceId
        }, {
          $set: setObj
        });
      }

      return true;
    }
  },
  change_approve_info: function (instanceId, traceId, approveId, description, finish_date) {
    var instance, ref, setObj, trace;

    if (!this.userId) {
      return;
    }

    check(instanceId, String);
    check(traceId, String);
    check(approveId, String);
    check(description, String);
    check(finish_date, Date);
    instance = db.instances.findOne({
      _id: instanceId,
      "traces._id": traceId
    }, {
      fields: {
        "traces.$": 1
      }
    });

    if ((instance != null ? (ref = instance.traces) != null ? ref.length : void 0 : void 0) > 0) {
      trace = instance.traces[0];
      setObj = {};
      trace.approves.forEach(function (approve, idx) {
        if (approve._id === approveId) {
          setObj["traces.$.approves." + idx + ".description"] = description;
          setObj["traces.$.approves." + idx + ".finish_date"] = finish_date;
          setObj["traces.$.approves." + idx + ".cost_time"] = new Date() - approve.start_date;
          return setObj["traces.$.approves." + idx + ".read_date"] = new Date();
        }
      });

      if (!_.isEmpty(setObj)) {
        db.instances.update({
          _id: instanceId,
          "traces._id": traceId
        }, {
          $set: setObj
        });
      }

      return true;
    }
  },
  update_approve_sign: function (instanceId, traceId, approveId, sign_field_code, description, sign_type, lastSignApprove) {
    var currentApproveDescription, currentStep, currentTrace, ins, instance, ref, ref1, ref2, ref3, session_userId, showBlankApproveDescription, trace, traces, trimDescription, upObj;
    check(instanceId, String);
    check(traceId, String);
    check(approveId, String);
    check(sign_field_code, String);
    check(description, String);

    if (!this.userId) {
      return;
    }

    trimDescription = description.trim();
    showBlankApproveDescription = (ref = Meteor.settings["public"].workflow) != null ? ref.showBlankApproveDescription : void 0;
    session_userId = this.userId;

    if (lastSignApprove) {
      if (((ref1 = Meteor.settings["public"].workflow) != null ? ref1.keepLastSignApproveDescription : void 0) !== false) {
        if (lastSignApprove.custom_sign_show) {
          return;
        }
      }
    }

    instance = db.instances.findOne({
      _id: instanceId,
      "traces._id": traceId
    }, {
      fields: {
        "traces.$": 1
      }
    });

    if ((instance != null ? (ref2 = instance.traces) != null ? ref2.length : void 0 : void 0) > 0) {
      trace = instance.traces[0];
      upObj = {};
      currentApproveDescription = '';
      trace.approves.forEach(function (approve, idx) {
        if (approve._id === approveId) {
          currentApproveDescription = approve.description;

          if (sign_field_code) {
            upObj["traces.$.approves." + idx + ".sign_field_code"] = sign_field_code;
          }

          upObj["traces.$.approves." + idx + ".description"] = description;
          upObj["traces.$.approves." + idx + ".sign_show"] = trimDescription || showBlankApproveDescription ? true : false;
          upObj["traces.$.approves." + idx + ".modified"] = new Date();
          upObj["traces.$.approves." + idx + ".modified_by"] = session_userId;
          return upObj["traces.$.approves." + idx + ".read_date"] = new Date();
        }
      });

      if (((ref3 = Meteor.settings["public"].workflow) != null ? ref3.keepLastSignApproveDescription : void 0) === false && (!!currentApproveDescription !== !!trimDescription || showBlankApproveDescription)) {
        ins = db.instances.findOne({
          _id: instanceId
        }, {
          fields: {
            "traces": 1
          }
        });
        traces = ins.traces;
        currentTrace = _.find(traces, function (t) {
          return t._id === traceId;
        });
        currentStep = currentTrace.step;
        traces.forEach(function (t, tIdx) {
          if (t.step === currentStep) {
            return t != null ? t.approves.forEach(function (appr, aIdx) {
              if (appr.handler === session_userId && appr.is_finished && appr._id !== approveId && !_.has(appr, 'custom_sign_show')) {
                if (trimDescription && appr.sign_show === true && (sign_field_code === "" || !appr.sign_field_code || sign_field_code === appr.sign_field_code) || showBlankApproveDescription) {
                  upObj["traces." + tIdx + ".approves." + aIdx + ".sign_show"] = false;
                  return upObj["traces." + tIdx + ".approves." + aIdx + ".keepLastSignApproveDescription"] = approveId;
                } else if (appr.keepLastSignApproveDescription === approveId) {
                  upObj["traces." + tIdx + ".approves." + aIdx + ".sign_show"] = true;
                  return upObj["traces." + tIdx + ".approves." + aIdx + ".keepLastSignApproveDescription"] = null;
                }
              }
            }) : void 0;
          }
        });
      }

      if (!_.isEmpty(upObj)) {
        db.instances.update({
          _id: instanceId,
          "traces._id": traceId
        }, {
          $set: upObj
        });
      }

      return true;
    }
  },
  update_sign_show: function (objs, myApprove_id) {
    objs.forEach(function (obj, index) {
      var instance, ref, setObj, trace;
      instance = db.instances.findOne({
        _id: obj.instance,
        "traces._id": obj.trace
      }, {
        fields: {
          "traces.$": 1
        }
      });

      if ((instance != null ? (ref = instance.traces) != null ? ref.length : void 0 : void 0) > 0) {
        trace = instance.traces[0];
        setObj = {};
        trace.approves.forEach(function (approve, idx) {
          if (approve._id === obj._id) {
            setObj["traces.$.approves." + idx + ".sign_show"] = obj.sign_show;
            setObj["traces.$.approves." + idx + ".custom_sign_show"] = obj.sign_show;
            setObj["traces.$.approves." + idx + ".read_date"] = new Date();
          }

          if (approve._id === myApprove_id) {
            return setObj["traces.$.approves." + idx + ".read_date"] = new Date();
          }
        });

        if (!_.isEmpty(setObj)) {
          return db.instances.update({
            _id: obj.instance,
            "traces._id": obj.trace
          }, {
            $set: setObj
          });
        }
      }
    });
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_return.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_return.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  instance_return: function (approve, reason) {
    var approve_values, b, current_step, current_user, current_user_info, flow, ins, instance, instance_id, last_trace, newTrace, new_inbox_users, now, pre_step, pre_trace, r, rest_counter_users, setObj, space_id, traces;
    check(approve, Object);
    current_user = this.userId;
    instance_id = approve.instance;
    ins = uuflowManager.getInstance(instance_id);
    space_id = ins.space;

    if (ins.state !== "pending" || !ins.inbox_users.includes(current_user)) {
      throw new Meteor.Error('error!', "不符合退回条件");
    }

    if (approve.type === "cc" && ins.cc_users.includes(current_user)) {
      throw new Meteor.Error('error!', "不符合退回条件");
    }

    if (ins.traces.length < 2) {
      throw new Meteor.Error('error!', "不符合退回条件");
    }

    flow = uuflowManager.getFlow(ins.flow);
    pre_trace = ins.traces[ins.traces.length - 2];
    pre_step = uuflowManager.getStep(ins, flow, pre_trace.step);

    if (pre_step.step_type === "counterSign") {
      throw new Meteor.Error('error!', "不符合退回条件");
    }

    last_trace = _.last(ins.traces);
    current_step = uuflowManager.getStep(ins, flow, last_trace.step);

    if (current_step.step_type !== "submit" && current_step.step_type !== "sign" && current_step.step_type !== "counterSign") {
      throw new Meteor.Error('error!', "不符合退回条件");
    }

    if (approve.trace !== last_trace._id) {
      throw new Meteor.Error('error!', "不符合退回条件");
    }

    new_inbox_users = new Array();

    _.each(pre_trace.approves, function (a) {
      if ((!a.type || a.type === "draft" || a.type === "reassign") && (!a.judge || a.judge === "submitted" || a.judge === "approved" || a.judge === "rejected")) {
        return new_inbox_users.push(a.user);
      }
    });

    if (_.isEmpty(new_inbox_users)) {
      throw new Meteor.Error('error!', "未找到下一步处理人，退回失败");
    }

    traces = ins.traces;
    approve_values = uuflowManager.getApproveValues(approve.values || {}, current_step.permissions, ins.form, ins.form_version);
    setObj = new Object();
    now = new Date();
    rest_counter_users = new Array();

    _.each(traces, function (t) {
      if (t._id === last_trace._id) {
        if (!t.approves) {
          t.approves = new Array();
        }

        _.each(t.approves, function (a, idx) {
          if ((!a.type || a.type === "reassign") && (!a.judge || a.judge === "submitted" || a.judge === "approved" || a.judge === "rejected" || a.judge === "readed") && a.is_finished !== true) {
            setObj['traces.$.approves.' + idx + '.finish_date'] = now;
            setObj['traces.$.approves.' + idx + '.read_date'] = now;
            setObj['traces.$.approves.' + idx + '.is_error'] = false;
            setObj['traces.$.approves.' + idx + '.is_read'] = true;
            setObj['traces.$.approves.' + idx + '.is_finished'] = true;
            setObj['traces.$.approves.' + idx + '.cost_time'] = now - a.start_date;
            setObj['traces.$.approves.' + idx + '.values'] = approve_values;

            if (a.handler === current_user) {
              setObj['traces.$.approves.' + idx + '.judge'] = "returned";
              return setObj['traces.$.approves.' + idx + '.description'] = reason;
            } else {
              return rest_counter_users.push(a.handler);
            }
          }
        });

        setObj['traces.$.is_finished'] = true;
        setObj['traces.$.finish_date'] = true;
        return setObj['traces.$.judge'] = "returned";
      }
    });

    ins.values = _.extend(ins.values || {}, approve_values);
    newTrace = new Object();
    newTrace._id = new Mongo.ObjectID()._str;
    newTrace.instance = instance_id;
    newTrace.previous_trace_ids = [last_trace._id];
    newTrace.is_finished = false;
    newTrace.step = pre_trace.step;
    newTrace.name = pre_trace.name;
    newTrace.start_date = now;
    newTrace.due_date = uuflowManager.getDueDate(pre_step.timeout_hours, space_id);
    newTrace.approves = [];

    _.each(new_inbox_users, function (next_step_user_id, idx) {
      var agent, handler_id, handler_info, newApprove, next_step_space_user, next_step_user_org_info, user_info;
      newApprove = new Object();
      newApprove._id = new Mongo.ObjectID()._str;
      newApprove.instance = instance_id;
      newApprove.trace = newTrace._id;
      newApprove.is_finished = false;
      newApprove.user = next_step_user_id;
      user_info = db.users.findOne(next_step_user_id, {
        fields: {
          name: 1
        }
      });
      newApprove.user_name = user_info.name;
      handler_id = next_step_user_id;
      handler_info = user_info;
      agent = uuflowManager.getAgent(space_id, next_step_user_id);

      if (agent) {
        new_inbox_users[idx] = agent;
        handler_id = agent;
        handler_info = db.users.findOne({
          _id: agent
        }, {
          fields: {
            name: 1
          }
        });
        newApprove.agent = agent;
      }

      newApprove.handler = handler_id;
      newApprove.handler_name = handler_info.name;
      next_step_space_user = uuflowManager.getSpaceUser(space_id, handler_id);
      next_step_user_org_info = uuflowManager.getSpaceUserOrgInfo(next_step_space_user);
      newApprove.handler_organization = next_step_user_org_info["organization"];
      newApprove.handler_organization_name = next_step_user_org_info["organization_name"];
      newApprove.handler_organization_fullname = next_step_user_org_info["organization_fullname"];
      newApprove.start_date = now;
      newApprove.is_read = false;
      newApprove.is_error = false;
      newApprove.values = new Object();
      uuflowManager.setRemindInfo(ins.values, newApprove);
      return newTrace.approves.push(newApprove);
    });

    setObj.inbox_users = new_inbox_users;
    setObj.state = "pending";
    ins.outbox_users.push(current_user);
    setObj.outbox_users = _.uniq(ins.outbox_users);
    setObj.modified = now;
    setObj.modified_by = current_user;
    setObj.values = ins.values;
    setObj.current_step_name = pre_trace.name;
    r = db.instances.update({
      _id: instance_id,
      'traces._id': last_trace._id
    }, {
      $set: setObj
    });
    b = db.instances.update({
      _id: instance_id
    }, {
      $push: {
        traces: newTrace
      }
    });

    if (r && b) {
      pushManager.send_message_to_specifyUser("current_user", current_user);
      instance = uuflowManager.getInstance(instance_id);
      current_user_info = db.users.findOne(current_user);
      pushManager.send_instance_notification("return_pending_inbox", instance, reason, current_user_info);

      _.each(rest_counter_users, function (user_id) {
        return pushManager.send_message_to_specifyUser("current_user", user_id);
      });

      pushManager.triggerWebhook(instance.flow, instance, {}, 'return', current_user, instance.inbox_users);
    }

    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_remind.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_remind.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  instance_remind: function (remind_users, remind_count, remind_deadline, instance_id, action_types, trace_id) {
    var current_user_id, ins, last_remind_users, now, priority, trace;
    check(remind_users, Array);
    check(remind_count, Match.OneOf('single', 'multi'));
    check(remind_deadline, Date);
    check(instance_id, String);
    check(action_types, Array);
    check(trace_id, String);
    current_user_id = this.userId;
    last_remind_users = new Array();
    ins = db.instances.findOne({
      _id: instance_id
    }, {
      fields: {
        name: 1,
        traces: 1,
        values: 1,
        space: 1
      }
    });

    if (action_types.includes('admin')) {
      if (remind_count === 'single') {
        _.each(ins.traces, function (t) {
          return _.each(t.approves, function (ap) {
            if (remind_users.includes(ap.user) && ap.is_finished !== true) {
              return last_remind_users.push(ap.user);
            }
          });
        });
      } else if (remind_count === 'multi') {
        now = new Date();
        priority = ins.values.priority;

        _.each(ins.traces, function (t) {
          return _.each(t.approves, function (ap) {
            var caculate_date;

            if (remind_users.includes(ap.user) && ap.is_finished !== true) {
              last_remind_users.push(ap.user);
              ap.manual_deadline = remind_deadline;

              if (priority === "普通" || !priority) {} else if (priority === "办文") {
                if (Steedos.caculatePlusHalfWorkingDay(now) > remind_deadline) {
                  return ap.remind_date = Steedos.caculatePlusHalfWorkingDay(now, true);
                } else if (Steedos.caculateWorkingTime(now, 1) > remind_deadline) {
                  caculate_date = function (base_date) {
                    var plus_halfday_date;
                    plus_halfday_date = Steedos.caculatePlusHalfWorkingDay(base_date);

                    if (plus_halfday_date > remind_deadline) {
                      ap.remind_date = base_date;
                    } else {
                      caculate_date(Steedos.caculatePlusHalfWorkingDay(base_date, true));
                    }
                  };

                  return caculate_date(now);
                }
              } else if (priority === "紧急") {
                if (Steedos.caculatePlusHalfWorkingDay(now) > remind_deadline) {
                  return ap.remind_date = Steedos.caculatePlusHalfWorkingDay(now, true);
                } else if (Steedos.caculateWorkingTime(now, 1) > remind_deadline) {
                  caculate_date = function (base_date) {
                    var plus_halfday_date;
                    plus_halfday_date = Steedos.caculatePlusHalfWorkingDay(base_date);

                    if (plus_halfday_date > remind_deadline) {
                      ap.remind_date = base_date;
                    } else {
                      caculate_date(Steedos.caculatePlusHalfWorkingDay(base_date, true));
                    }
                  };

                  return caculate_date(now);
                }
              } else if (priority === "特急") {
                if (Steedos.caculatePlusHalfWorkingDay(now) > remind_deadline) {
                  return ap.remind_date = Steedos.caculatePlusHalfWorkingDay(now, true);
                } else if (Steedos.caculateWorkingTime(now, 1) > remind_deadline) {
                  caculate_date = function (base_date) {
                    var plus_halfday_date;
                    plus_halfday_date = Steedos.caculatePlusHalfWorkingDay(base_date);

                    if (plus_halfday_date > remind_deadline) {
                      ap.remind_date = base_date;
                    } else {
                      caculate_date(Steedos.caculatePlusHalfWorkingDay(base_date, true));
                    }
                  };

                  return caculate_date(now);
                }
              }
            }
          });
        });

        if (!_.isEmpty(last_remind_users)) {
          db.instances.update({
            _id: instance_id
          }, {
            $set: {
              'traces': ins.traces
            }
          });
        }
      }
    } else if (action_types.includes('applicant')) {
      trace = _.find(ins.traces, function (t) {
        return t._id === trace_id;
      });

      _.each(trace.approves, function (ap) {
        if (remind_users.includes(ap.user) && ap.is_finished !== true) {
          return last_remind_users.push(ap.user);
        }
      });
    } else if (action_types.includes('cc')) {
      _.each(ins.traces, function (t) {
        return _.each(t.approves, function (ap) {
          if (remind_users.includes(ap.user) && ap.is_finished !== true && ap.type === 'cc' && ap.from_user === current_user_id) {
            return last_remind_users.push(ap.user);
          }
        });
      });
    }

    uuflowManager.sendRemindSMS(ins.name, remind_deadline, last_remind_users, ins.space, ins._id);
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"next_step_users_not_found.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/next_step_users_not_found.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  next_step_users_not_found: function (deal_type, step_name, params) {
    var approver_roles, lang, roles, roles_name, str, user;
    check(deal_type, String);
    check(step_name, String);
    check(params, Object);
    str = "";
    user = db.users.findOne({
      _id: this.userId
    }, {
      fields: {
        locale: 1
      }
    });
    lang = 'en';

    if (user.locale === 'zh-cn') {
      lang = 'zh-CN';
    }

    if (deal_type === 'applicantRole') {
      approver_roles = params.approver_roles;
      roles = db.flow_roles.find({
        _id: {
          $in: approver_roles
        }
      }, {
        fields: {
          name: 1
        }
      }).fetch();
      roles_name = _.pluck(roles, 'name').toString();
      str = TAPi18n.__('next_step_users_not_found.applicant_role', {
        step_name: step_name,
        role_name: roles_name
      }, lang);
    }

    return str;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_number_rules.coffee":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_number_rules.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _eval;

_eval = require('eval');
Meteor.methods({
  instanceNumberBuilder: function (spaceId, name) {
    var _NUMBER, _YYYY, context, date, e, numberRules, padding, res, rules, script;

    numberRules = db.instance_number_rules.findOne({
      space: spaceId,
      name: name
    });

    if (!numberRules) {
      throw new Meteor.Error('error!', "" + name);
    }

    date = new Date();
    context = {};
    context._ = _;
    _YYYY = date.getFullYear();
    _NUMBER = (numberRules.number || 0) + 1;
    context.YYYY = _.clone(_YYYY);
    context.MM = date.getMonth() + 1;
    context.mm = date.getMonth() + 1;

    if (context.MM < 10) {
      context.MM = "0" + context.MM;
    }

    context.DD = date.getDate();
    context.dd = date.getDate();

    if (context.DD < 10) {
      context.DD = "0" + context.DD;
    }

    if (context.YYYY !== numberRules.year) {
      _NUMBER = numberRules.first_number || 1;
    }

    padding = function (num, length) {
      var diff, len;
      len = (num + '').length;
      diff = length - len;

      if (diff > 0) {
        return Array(diff + 1).join('0') + num;
      }

      return num;
    };

    context.NUMBER = padding(_.clone(_NUMBER), 5);
    rules = numberRules.rules.replace("{YYYY}", "' + YYYY + '").replace("{MM}", "' + MM + '").replace("{NUMBER}", "' + NUMBER + '");
    script = "var newNo = '" + rules + "'; exports.newNo = newNo";

    try {
      res = _eval(script, "newNo", context, false).newNo;
      db.instance_number_rules.update({
        _id: numberRules._id
      }, {
        $set: {
          year: _YYYY,
          number: _NUMBER
        }
      });
      console.log(this.userId, res);
    } catch (error) {
      e = error;
      res = {
        _error: e
      };
    }

    return res;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"check_main_attach.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/check_main_attach.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  check_main_attach: function (ins_id, name) {
    check(ins_id, String);
    uuflowManager.checkMainAttach(ins_id, name);
    return 'success';
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"related_instances.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/related_instances.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  remove_related: function (ins_id, re_ins_id) {
    var index, ins, res, set_obj;
    check(ins_id, String);
    check(re_ins_id, String);

    if (!this.userId) {
      return;
    }

    ins = db.instances.findOne({
      _id: ins_id
    }, {
      fields: {
        related_instances: 1
      }
    });

    if (ins) {
      res = ins.related_instances || [];
      index = res.indexOf(re_ins_id);

      if (index > -1) {
        res.remove(index);
      }

      set_obj = new Object();
      set_obj.modified = new Date();
      set_obj.modified_by = this.userId;
      set_obj.related_instances = res;
      return db.instances.update({
        _id: ins_id
      }, {
        $set: set_obj
      });
    }
  },
  update_instance_related: function (ins_id, related_instances) {
    var ins, set_obj;
    check(ins_id, String);
    check(related_instances, Array);

    if (!this.userId) {
      return;
    }

    ins = db.instances.findOne({
      _id: ins_id,
      $or: [{
        submitter: this.userId
      }, {
        applicant: this.userId
      }, {
        inbox_users: this.userId
      }, {
        cc_users: this.userId
      }]
    }, {
      fields: {
        state: 1
      }
    });

    if (ins) {
      set_obj = new Object();
      set_obj.modified = new Date();
      set_obj.modified_by = this.userId;
      set_obj.related_instances = related_instances;
      db.instances.update({
        _id: ins_id
      }, {
        $set: set_obj
      });
    }

    return db.instances.find({
      _id: {
        $in: related_instances
      }
    }, {
      fields: {
        _id: 1,
        values: 1
      }
    }).fetch();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"edit_flow_positions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/edit_flow_positions.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  updateFlowPosition: function (data) {
    return db.flow_positions.update({
      _id: data._id
    }, {
      $set: {
        role: data.role,
        users: data.users,
        org: data.org
      }
    });
  },
  updateFlowRole: function (data) {
    console.log(data._id);
    console.log(data.name);
    return db.flow_roles.update({
      _id: data._id
    }, {
      $set: {
        name: data.name
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"start_flow.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/start_flow.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  start_flow: function (space, flowId, start) {
    var keyValue, start_flows;
    keyValue = db.steedos_keyvalues.findOne({
      space: space,
      user: this.userId,
      key: 'start_flows'
    }, {
      fields: {
        value: 1
      }
    });
    start_flows = (keyValue != null ? keyValue.value : void 0) || [];

    if (start) {
      start_flows.push(flowId);
      start_flows = _.uniq(start_flows);
    } else {
      start_flows.remove(start_flows.indexOf(flowId));
    }

    if (keyValue) {
      return db.steedos_keyvalues.update({
        _id: keyValue._id
      }, {
        space: space,
        user: this.userId,
        key: 'start_flows',
        value: start_flows
      });
    } else {
      return db.steedos_keyvalues.insert({
        space: space,
        user: this.userId,
        key: 'start_flows',
        value: start_flows
      });
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_traces.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_traces.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  get_instance_traces: function (ins_id) {
    var ins, miniApproveFields;

    if (!this.userId) {
      return;
    }

    miniApproveFields = ['_id', 'is_finished', 'user', 'handler', 'handler_name', 'type', 'start_date', 'description', 'is_read', 'judge', 'finish_date', 'from_user_name', 'from_user', 'cc_description'];
    ins = db.instances.findOne({
      _id: ins_id
    }, {
      fields: {
        "traces._id": 1,
        "traces.is_finished": 1,
        "traces.step": 1,
        "traces.start_date": 1,
        "traces.name": 1,
        "traces.finish_date": 1,
        "traces.judge": 1,
        "traces.approves._id": 1,
        "traces.approves.is_finished": 1,
        "traces.approves.user": 1,
        "traces.approves.handler": 1,
        "traces.approves.handler_name": 1,
        "traces.approves.handler_organization_fullname": 1,
        "traces.approves.type": 1,
        "traces.approves.start_date": 1,
        "traces.approves.description": 1,
        "traces.approves.is_read": 1,
        "traces.approves.judge": 1,
        "traces.approves.finish_date": 1,
        "traces.approves.from_user_name": 1,
        "traces.approves.from_user": 1,
        "traces.approves.cc_description": 1,
        "traces.approves.trace": 1,
        "traces.approves.forward_space": 1,
        "traces.approves.forward_instance": 1
      }
    });

    if (!ins) {
      return;
    }

    return ins != null ? ins.traces : void 0;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_batch.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_batch.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  'get_batch_instances': function (space, categoryId, flowIds) {
    var _batch_instances;

    if (!this.userId) {
      return;
    }

    if (!space) {
      return;
    }

    _batch_instances = InstanceManager.getBatchInstances(space, categoryId, flowIds, this.userId);
    return _batch_instances;
  },
  'get_batch_instances_count': function (space, categoryId, flowIds) {
    var _batch_instances;

    if (!this.userId) {
      return;
    }

    if (!space) {
      return;
    }

    _batch_instances = InstanceManager.getBatchInstances(space, categoryId, flowIds, this.userId);
    return (_batch_instances != null ? _batch_instances.length : void 0) || 0;
  },
  'get_my_approves': function (instanceIds) {
    var myApproves, that;
    that = this;

    if (!that.userId) {
      return;
    }

    myApproves = new Array();
    instanceIds.forEach(function (insId) {
      var my_approve;
      my_approve = InstanceManager.getMyApprove(insId, that.userId);

      if (my_approve) {
        return myApproves.push(my_approve);
      }
    });
    return myApproves;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/flow.coffee                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  change_flow_state: function (flows) {
    var _userId;

    check(flows, Array);
    _userId = this.userId;

    if (!_userId) {
      return;
    }

    return flows.forEach(function (flow) {
      var _flows, _flows_state, flowId, form, formId, form_current_fields_code, now, spaceId, state;

      spaceId = flow.space;
      formId = flow.form;
      flowId = flow.id;
      state = flow.state;

      if (!Steedos.isSpaceAdmin(spaceId, _userId)) {
        throw Meteor.Error(401, "No permission");
      }

      form = db.forms.findOne({
        _id: formId
      }, {
        fields: {
          historys: 0
        }
      });
      flow = db.flows.findOne({
        _id: flowId
      }, {
        fields: {
          historys: 0
        }
      });

      if (state !== 'enabled' && state !== 'disabled') {
        throw new Meteor.Error(500, "state无效");
      }

      if (!form) {
        throw new Meteor.Error(500, "form无效");
      }

      if (!flow) {
        throw new Meteor.Error(500, "flow无效");
      }

      if (!form.is_valid) {
        throw new Meteor.Error(500, "流程引用的表单[" + form.name + "]验证未通过，请打开流程设计器检查表单设置");
      }

      if (!flow.is_valid) {
        throw new Meteor.Error(500, "流程验证未通过，请打开流程设计器检查流程设置");
      }

      if (!['new', 'modify', 'delete'].includes(flow.flowtype)) {
        throw new Meteor.Error(500, "流程验证未通过，flowtype值必须是new、modify、delete其中之一");
      }

      if (!_.isArray(flow.current.steps)) {
        throw new Meteor.Error(500, "流程验证未通过，流程的步骤不能为空");
      }

      if (_.uniq(flow.current.steps, 'name').length !== flow.current.steps.length) {
        throw new Meteor.Error(500, "流程验证未通过，同一个流程下的步骤的名称不能重复");
      }

      now = new Date();

      if (state === 'enabled') {
        flow.current.steps.forEach(function (step) {
          var specifyStep;

          if (['specifyStepUser', 'specifyStepRole'].includes(step.deal_type)) {
            if (!step.approver_step) {
              throw new Meteor.Error(500, "步骤[" + step.name + "]中的指定历史步骤不存在。");
            } else {
              specifyStep = _.find(flow.current.steps, function (_step) {
                return step.approver_step === _step._id;
              });

              if (!specifyStep) {
                throw new Meteor.Error(500, "步骤[" + step.name + "]中的指定历史步骤不存在。");
              }
            }
          }
        });
        form_current_fields_code = form.current.fields.getProperty("code");
        flow.current.steps.forEach(function (step) {
          return step.fields_modifiable = _.intersection(step.fields_modifiable, form_current_fields_code);
        });

        if (form.state === 'disabled') {
          db.forms.update({
            _id: form._id
          }, {
            $set: {
              "state": "enabled",
              "current.start_date": now,
              "current.modified": now,
              "current.modified_by": _userId
            }
          });
        }

        flow.current.modified = now;
        flow.current.start_date = now;
        flow.current.modified_by = _userId;
        return db.flows.update({
          _id: flow._id
        }, {
          $set: {
            "state": "enabled",
            "current": flow.current
          }
        });
      } else {
        db.flows.update({
          _id: flow._id
        }, {
          $set: {
            "state": "disabled",
            "current.modified": now,
            "current.start_date": now,
            "current.modified_by": _userId
          }
        });
        _flows = db.flows.find({
          form: form._id
        }, {
          fields: {
            _id: 1,
            state: 1
          }
        }).fetch();
        _flows_state = _flows.getProperty("state");

        if (!_flows_state.includes('enabled')) {
          return db.forms.update({
            _id: form._id
          }, {
            $set: {
              "state": "disabled",
              "current.modified": now,
              "current.start_date": now,
              "current.modified_by": _userId
            }
          });
        }
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"distribute.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/distribute.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hide_instance.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/hide_instance.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  hide_instance: function (insId, is_hidden) {
    var instance, permissions, space, userId;

    if (!this.userId) {
      return;
    }

    check(insId, String);
    check(is_hidden, Boolean);
    userId = this.userId;
    instance = db.instances.findOne(insId, {
      fields: {
        state: 1,
        flow: 1,
        space: 1
      }
    });

    if (!instance) {
      throw new Meteor.Error('error!', "未找到申请单");
    }

    if (instance.state !== 'completed') {
      throw new Meteor.Error('error!', "申请单状态不是已结束");
    }

    permissions = permissionManager.getFlowPermissions(instance.flow, userId);
    space = db.spaces.findOne(instance.space, {
      fields: {
        admins: 1
      }
    });

    if (!permissions.includes("admin") && !space.admins.includes(userId)) {
      throw new Meteor.Error('error!', "用户没有对当前流程的管理权限");
    }

    db.instances.update(insId, {
      $set: {
        is_hidden: is_hidden
      }
    });
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_value.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/methods/instance_value.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  getInstanceValues: function (insId) {
    var ref;

    if (!this.userId) {
      return;
    }

    return (ref = db.instances.findOne({
      _id: insId
    }, {
      fields: {
        values: 1
      }
    })) != null ? ref.values : void 0;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes":{"instance.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/routes/instance.coffee                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Cookies, getInstanceReadOnly;
Cookies = require("cookies");

getInstanceReadOnly = function (req, res, next, options) {
  var _hasPermission, _locale, _parent_instances, dataBuf, error, hide_traces, html, instance, instanceId, ref, ref1, space, spaceId, spaceUserCount, user, userId;

  user = Steedos.getAPILoginUser(req, res);

  if (req != null ? (ref = req.query) != null ? ref.access_token : void 0 : void 0) {
    userId = Steedos.getUserIdFromAccessToken(req.query.access_token);

    if (userId) {
      user = Meteor.users.findOne({
        _id: userId
      });
    }
  }

  spaceId = req.params.space;
  instanceId = req.params.instance_id;
  instance = db.instances.findOne({
    _id: instanceId
  });
  space = db.spaces.findOne({
    _id: spaceId
  });
  hide_traces = (ref1 = req.query) != null ? ref1.hide_traces : void 0;

  if (!options) {
    options = {
      showTrace: true
    };
  } else {
    options.showTrace = true;
  }

  if (hide_traces === "1") {
    if (options) {
      options.showTrace = false;
    } else {
      options = {
        showTrace: false
      };
    }
  }

  if (!options.showAttachments) {
    options.showAttachments = true;
  }

  if (!space) {
    JsonRoutes.sendResult(res, {
      code: 401,
      data: {
        "error": "Validate Request -- Missing space",
        "success": false
      }
    });
    return;
  }

  if (!instance) {
    JsonRoutes.sendResult(res, {
      code: 401,
      data: {
        "error": "Validate Request -- Missing instance",
        "success": false
      }
    });
    return;
  }

  if (!user) {
    JsonRoutes.sendResult(res, {
      code: 401,
      data: {
        "error": "Validate Request -- Missing X-Auth-Token,X-User-Id",
        "success": false
      }
    });
    return;
  }

  if (instance.space !== spaceId) {
    JsonRoutes.sendResult(res, {
      code: 401,
      data: {
        "error": "Validate Request -- Missing space or instance",
        "success": false
      }
    });
    return;
  }

  spaceUserCount = db.space_users.find({
    user: user._id,
    space: spaceId
  }).count();

  if (spaceUserCount === 0) {
    if (!space) {
      JsonRoutes.sendResult(res, {
        code: 401,
        data: {
          "error": "Validate Request -- Missing sapceUser",
          "success": false
        }
      });
      return;
    }
  }

  _hasPermission = WorkflowManager.hasInstancePermissions(user, instance);

  if (!_hasPermission && instance.distribute_from_instance) {
    _parent_instances = _.union([instance.distribute_from_instance], instance.distribute_from_instances || []);
    _hasPermission = _.find(_parent_instances, function (_parent_id) {
      var _parent_ins;

      _parent_ins = db.instances.findOne({
        _id: _parent_id
      }, {
        fields: {
          traces: 0
        }
      });
      return WorkflowManager.hasInstancePermissions(user, _parent_ins);
    });
  }

  if (!_hasPermission) {
    _locale = Steedos.locale(user._id, true);
    error = TAPi18n.__("instance_permissions_error", {}, _locale);
    res.charset = "utf-8";
    JsonRoutes.sendResult(res, {
      code: 401,
      data: {
        "error": error,
        "success": false
      }
    });
    return;
  }

  html = InstanceReadOnlyTemplate.getInstanceHtml(user, space, instance, options);
  dataBuf = new Buffer(html);
  res.setHeader('content-length', dataBuf.length);
  res.setHeader('content-range', "bytes 0-" + (dataBuf.length - 1) + "/" + dataBuf.length);
  res.statusCode = 200;
  return res.end(html);
};

JsonRoutes.add("get", "/workflow/space/:space/view/readonly/:instance_id", getInstanceReadOnly);
JsonRoutes.add("get", "/workflow/space/:space/view/readonly/:instance_id/:instance_name", function (req, res, next) {
  var options;
  res.setHeader('Content-type', 'application/x-msdownload');
  res.setHeader('Content-Disposition', 'attachment;filename=' + encodeURI(req.params.instance_name));
  res.setHeader('Transfer-Encoding', '');
  options = {
    absolute: true
  };
  return getInstanceReadOnly(req, res, next, options);
}); /*
    	获取申请单列表：
        final_decision：审批结果
        state: 申请单状态
     */
JsonRoutes.add("get", "/api/workflow/instances", function (req, res, next) {
  var f, flowId, flowIds, flows, i, instances, query, ref, ref1, ref2, ref3, ret_sync_token, spaceId, spaceUser, spaceUserOrganizations, sync_token, user_id;

  if (!Steedos.APIAuthenticationCheck(req, res)) {
    return;
  }

  user_id = req.userId;
  spaceId = req.headers["x-space-id"];

  if (!spaceId) {
    JsonRoutes.sendResult(res, {
      code: 401,
      data: {
        "error": "Validate Request -- Missing X-Space-Id",
        "success": false
      }
    });
    return;
  }

  flowId = (ref = req.query) != null ? ref.flowId : void 0;

  if (!flowId) {
    JsonRoutes.sendResult(res, {
      code: 400,
      data: {
        "error": "Validate Request -- Missing flowId",
        "success": false
      }
    });
    return;
  }

  query = {};
  ret_sync_token = new Date().getTime();
  flowIds = flowId.split(",");
  flows = db.flows.find({
    _id: {
      $in: flowIds
    }
  }).fetch();
  i = 0;

  while (i < flows.length) {
    f = flows[i];
    spaceUser = db.space_users.findOne({
      space: f.space,
      user: user_id
    });

    if (!spaceUser) {
      JsonRoutes.sendResult(res, {
        code: 401,
        data: {
          "error": "Validate Request -- No permission, flow is " + f._id,
          "success": false
        }
      });
      return;
    } else {}

    if (!Steedos.isSpaceAdmin(spaceId, user_id)) {
      spaceUserOrganizations = db.organizations.find({
        _id: {
          $in: spaceUser.organizations
        }
      }).fetch();

      if (!WorkflowManager.canMonitor(f, spaceUser, spaceUserOrganizations) && !WorkflowManager.canAdmin(f, spaceUser, spaceUserOrganizations)) {
        JsonRoutes.sendResult(res, {
          code: 401,
          data: {
            "error": "Validate Request -- No permission, flow is " + f._id,
            "success": false
          }
        });
        return;
      }
    }

    i++;
  }

  query.flow = {
    $in: flowIds
  };
  query.space = spaceId;

  if ((ref1 = req.query) != null ? ref1.sync_token : void 0) {
    sync_token = new Date(Number(req.query.sync_token));
    query.modified = {
      $gt: sync_token
    };
  }

  if ((ref2 = req.query) != null ? ref2.final_decision : void 0) {
    query.final_decision = {
      $in: req.query.final_decision.split(",")
    };
  } else {
    query.final_decision = {
      $nin: ["terminated", "rejected"]
    };
  }

  if ((ref3 = req.query) != null ? ref3.state : void 0) {
    query.state = {
      $in: req.query.state.split(",")
    };
  } else {
    query.state = "completed";
  }

  instances = db.instances.find(query, {
    fields: {
      inbox_uers: 0,
      cc_users: 0,
      outbox_users: 0,
      traces: 0,
      attachments: 0
    },
    skip: 0,
    limit: 500
  }).fetch();
  instances.forEach(function (instance) {
    var attachments;
    attachments = cfs.instances.find({
      'metadata.instance': instance._id,
      'metadata.current': true,
      "metadata.is_private": {
        $ne: true
      }
    }, {
      fields: {
        copies: 0
      }
    }).fetch();
    return instance.attachments = attachments;
  });
  JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      "status": "success",
      "sync_token": ret_sync_token,
      "data": instances
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steedos_css.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/routes/steedos_css.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("get", "/steedos-css", function (req, res, next) {
  var allCss, allCssLink;
  allCss = WebApp.getRefreshableAssets();
  allCssLink = "";
  allCss.forEach(function (css) {
    var cssHref, rootUrl;

    if (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX) {
      rootUrl = __meteor_runtime_config__.ROOT_URL;

      if (rootUrl.endsWith("/")) {
        cssHref = rootUrl.replace(__meteor_runtime_config__.ROOT_URL_PATH_PREFIX + "/", "") + css.url;
      } else {
        cssHref = rootUrl.replace(__meteor_runtime_config__.ROOT_URL_PATH_PREFIX, "") + css.url;
      }
    } else {
      cssHref = Meteor.absoluteUrl(css.url);
    }

    return allCssLink += "@import url(" + cssHref + ");";
  });
  res.statusCode = 200;
  return res.end(allCssLink);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_draft_view.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/routes/instance_draft_view.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
JsonRoutes.add("get", "/api/workflow/space/:space/view/draft/:flow", function (req, res, next) {
  var dataBuf, flow, flowId, form, html, instance, options, space, spaceId, user, user_id;

  if (!Steedos.APIAuthenticationCheck(req, res)) {
    return;
  }

  user_id = req.userId;
  user = db.users.findOne({
    _id: user_id
  });
  spaceId = req.params.space;
  flowId = req.params.flow;
  space = db.spaces.findOne({
    _id: spaceId
  });
  flow = db.flows.findOne({
    _id: flowId
  }, {
    fields: {
      name: 1,
      'current._id': 1,
      form: 1
    }
  });
  form = db.forms.findOne({
    _id: flow.form
  }, {
    fields: {
      'current._id': 1
    }
  });
  options = {
    showTrace: false,
    showAttachments: false,
    templateName: "default",
    editable: true,
    width: "100%",
    instance_style: "instance-default",
    plugins: "\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\" />\n<meta name=\"format-detection\" content=\"telephone=no\">\n<meta http-equiv=\"x-rim-auto-match\" content=\"none\">\n<title>" + flow.name + "</title>\n<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />\n<meta name=\"viewport\" content=\"width=device-width\" />\n\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css\">\n\n<script src=\"/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js\" type=\"text/javascript\"></script>\n\n<script src=\"/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js\" type=\"text/javascript\" charset=\"UTF-8\"></script>\n\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/plugins/toastr/toastr.min.css\">\n<script src=\"/plugins/toastr/toastr.min.js\" type=\"text/javascript\"></script>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/js/workflow_client.css\">\n<script src=\"/js/workflow_client.js\" type=\"text/javascript\"></script>"
  };
  instance = {
    flow: flow._id,
    flow_version: flow.current._id,
    form: form._id,
    form_version: form.current._id,
    values: {},
    name: flow.name,
    space: spaceId
  };
  html = InstanceReadOnlyTemplate.getInstanceHtml(user, space, instance, options);
  dataBuf = new Buffer(html);
  res.setHeader('content-length', dataBuf.length);
  res.setHeader('content-range', "bytes 0-" + (dataBuf.length - 1) + "/" + dataBuf.length);
  res.statusCode = 200;
  return res.end(html);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"1_form_formula.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/1_form_formula.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Array.prototype.filterProperty = function (h, l) {
  var g = [];
  this.forEach(function (t) {
    var m = t ? t[h] : null;
    var d = false;

    if (m instanceof Array) {
      d = m.includes(l);
    } else {
      d = l === undefined ? false : m == l;
    }

    if (d) {
      g.push(t);
    }
  });
  return g;
};

Array.prototype.getProperty = function (k) {
  var v = new Array();
  this.forEach(function (t) {
    var m = t ? t[k] : null;
    v.push(m);
  });
  return v;
};

Array.prototype.getEach = function (code) {
  var rev = [];

  for (var i = 0; i < this.length; i++) {
    rev.push(this[i][code]);
  }

  return rev;
};

Array.prototype.uniq = function () {
  var a = [];
  this.forEach(function (b) {
    if (a.indexOf(b) < 0) {
      a[a.length] = b;
    }
  });
  return a;
};

Form_formula = {};

Form_formula.mixin = function (dest, src) {
  for (var key in src) {
    dest[key] = src[key];
  }

  return dest;
};

Form_formula.handerUserObject = function (u) {
  if (u instanceof Array) {
    var user = {};
    user.name = u.getProperty("name");
    user.organization = {};
    user.organization.name = u.getProperty("organization").getProperty("name");
    user.organization.fullname = u.getProperty("organization").getProperty("fullname");
    user.hr = u.getProperty("hr");
    user.sort_no = u.getProperty("sort_no");
    user.mobile = u.getProperty("mobile");
    user.work_phone = u.getProperty("work_phone");
    user.position = u.getProperty("position");
    var userRoles = u.getProperty("roles");
    var roles = new Array();
    userRoles.forEach(function (i) {
      roles = roles.concat(i);
    });
    roles.uniq();
    user.roles = roles;
    return user;
  } else {
    return u;
  }
};

Form_formula.handerOrgObject = function (o) {
  if (o instanceof Array) {
    var org = {};
    org.id = o.getProperty("_id");
    org.name = o.getProperty("name");
    org.fullname = o.getProperty("fullname");
    return org;
  } else {
    return o;
  }
};
/**
    * 获得公式需要用到的初始值
    * 输入：fields, values, applicant
    * 输出：__values
**/


Form_formula.init_formula_values = function (fields, autoFormDoc, approver, applicant, spaceId) {
  var __values = {}; //申请单中填的值处理

  if (fields && fields.length && autoFormDoc) {
    //debugger;
    fields.forEach(function (field) {
      var type = field.type;

      if (type) {
        if (type === 'table') {
          /*
          * 将表格字段的值进行转换后传入__values中
          * values中表格的值格式为
          * [{"a":1,"b":4},{"a":2,"b":5},{"a":3,"b":6}]
          * __values需要转化为下面格式且和主表的值一样放到第一层
          * {"a":[1,2,3],"b":[4,5,6]}
          **/
          var tableFields = field.sfields,
              tableValues = autoFormDoc[field.code],
              formulaTableValues = [],
              __tableValues = {}; //按公式的格式转换值为__tableValues

          if (tableFields && tableFields.length && tableValues && tableValues instanceof Array) {
            tableValues.forEach(function (tableValue) {
              formulaTableValues.push(Form_formula.init_formula_values(tableFields, tableValue));
            }, this); //按主表的格式转换__tableValues加到

            tableFields.forEach(function (tablefield) {
              __tableValues[tablefield.code] = formulaTableValues.getEach(tablefield.code);
            });
            __values = Form_formula.mixin(__values, __tableValues);
          }
        } else if (type == 'user') {
          __values[field.code] = Form_formula.handerUserObject(WorkflowManager.getFormulaUserObjects(spaceId, autoFormDoc[field.code]));
        } else if (type == 'group') {
          __values[field.code] = Form_formula.handerOrgObject(WorkflowManager.getFormulaOrgObjects(autoFormDoc[field.code]));
        } else if (type == 'odata') {
          __values[field.code] = autoFormDoc[field.code] || {};
        } else {
          //此处传spaceId给选人控件的旧数据计算roles和organization
          __values[field.code] = autoFormDoc[field.code];
        }
      }
    }, this);
  } //当前处理人


  __values["approver"] = WorkflowManager.getFormulaUserObject(spaceId, approver); //申请人

  __values["applicant"] = WorkflowManager.getFormulaUserObject(spaceId, applicant);
  return __values;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"get_handlers_manager.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/get_handlers_manager.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var excuteTriggers, serviceWorkflow;
serviceWorkflow = require('@steedos/service-workflow');
getHandlersManager = {};

getHandlersManager.getHandlersByUsersAndRoles = function (user_ids, role_ids, space_id) {
  var approve_users;
  approve_users = new Array();

  _.each(user_ids, function (user_id) {
    var users;

    if (db.users.find({
      _id: user_id
    }).count() > 0) {
      users = getHandlersManager.getHandlersByUserAndRoles(user_id, role_ids, space_id);

      if (users.length > 0) {
        return approve_users = approve_users.concat(users);
      }
    } else {
      throw new Meteor.Error('error!', "user_id不合法不合法");
    }
  });

  approve_users = _.uniq(approve_users);
  return approve_users;
};

getHandlersManager.getHandlersByUserAndRoles = function (user_id, role_ids, space_id) {
  var user_ids;
  user_ids = new Array();

  _.each(role_ids, function (role_id) {
    var users;

    if (db.flow_roles.find({
      _id: role_id
    }).count() > 0) {
      users = getHandlersManager.getHandlersByUserAndRole(user_id, role_id, space_id);

      if (users.length > 0) {
        return user_ids = user_ids.concat(users);
      }
    } else {
      throw new Meteor.Error('error!', "role_id已经被删除");
    }
  });

  if (user_ids.length > 0) {
    user_ids = _.uniq(user_ids);
    return user_ids;
  } else {
    throw new Meteor.Error('error!', "根据user_id和role_ids没查到对应的处理人");
  }
};

getHandlersManager.getHandlersByUserAndRole = function (user_id, role_id, space_id) {
  var orgs, user_ids;
  orgs = db.organizations.find({
    space: space_id,
    users: user_id
  }, {
    fields: {
      _id: 1
    }
  }).fetch();
  user_ids = new Array();

  _.each(orgs, function (org) {
    var users;
    users = getHandlersManager.getHandlersByOrgAndRole(org._id, role_id, space_id);

    if (users.length > 0) {
      return user_ids = user_ids.concat(users);
    }
  });

  user_ids = _.uniq(user_ids);
  return user_ids;
};

getHandlersManager.getHandlersByOrgsAndRoles = function (org_ids, role_ids, space_id) {
  var user_ids;
  user_ids = new Array();

  _.each(org_ids, function (org_id) {
    var users;
    users = getHandlersManager.getHandlersByOrgAndRoles(org_id, role_ids, space_id);

    if (users.length > 0) {
      return user_ids = user_ids.concat(users);
    }
  });

  user_ids = _.uniq(user_ids);
  return user_ids;
};

getHandlersManager.getHandlersByOrgAndRoles = function (org_id, role_ids, space_id) {
  var user_ids;
  user_ids = new Array();

  _.each(role_ids, function (role_id) {
    var users;
    users = getHandlersManager.getHandlersByOrgAndRole(org_id, role_id, space_id);

    if (users.length > 0) {
      return user_ids = user_ids.concat(users);
    }
  });

  if (user_ids.length > 0) {
    user_ids = _.uniq(user_ids);
    return user_ids;
  } else {
    throw new Meteor.Error('error!', "根据org_id和role_ids没查到对应的处理人");
  }
};

getHandlersManager.getHandlersByOrgAndRole = function (org_id, role_id, space_id) {
  var org, parents, positions, user_ids;
  org = db.organizations.findOne({
    _id: org_id
  }, {
    fields: {
      parents: 1
    }
  });
  user_ids = new Array();
  positions = db.flow_positions.find({
    space: space_id,
    org: org_id,
    role: role_id
  }, {
    fields: {
      users: 1
    }
  }).fetch();

  _.each(positions, function (position) {
    return user_ids = user_ids.concat(position.users);
  });

  if (user_ids.length === 0) {
    parents = org.parents;

    _.each(parents, function (parent_id) {
      positions = db.flow_positions.find({
        space: space_id,
        org: parent_id,
        role: role_id
      }, {
        fields: {
          users: 1
        }
      }).fetch();

      if (positions.length > 0) {
        return _.each(positions, function (position) {
          return user_ids = user_ids.concat(position.users);
        });
      }
    });
  }

  user_ids = _.uniq(user_ids);
  return user_ids;
};

getHandlersManager.getHandlers = function (instance_id, step_id, login_user_id) {
  var _approve, _space_user, _trace, applicant, applicantSuperiors, approveHrRoleIds, approve_users, approver_org_field, approver_org_ids, approver_step, approver_user_field, approver_user_ids, current, current_flow, current_flow_version, current_form, current_step, current_steps, deal_type, field_code, finished_traces, flow_id, flow_rev, form, form_fields, form_id, form_rev, handlers, instance, max_startDate_trace, new_approver_user_ids, new_org_user_ids, newest_values, next_step_users, org_ids, org_ids_names, org_user_ids, space_id, space_user_count, submitter, submitter_user_count, unfinished_trace, user_ids, user_ids_names, users, valid_approver_org_ids;

  instance = db.instances.findOne(instance_id);

  if (instance.step_approve && !_.isEmpty(instance.step_approve[step_id + "_options"])) {
    return instance.step_approve[step_id + "_options"];
  }

  approve_users = new Array();
  space_id = instance.space;
  flow_id = instance.flow;
  flow_rev = instance.flow_version;
  current_flow = db.flows.findOne(flow_id);
  current_step = null;
  current_steps = new Array();

  if (current_flow.current._id === flow_rev) {
    current_steps = current_flow.current.steps;
  } else {
    current = _.find(current_flow.historys, function (history) {
      return history._id === flow_rev;
    });
    current_steps = current.steps;
  }

  current_step = _.find(current_steps, function (step) {
    return step._id === step_id;
  });

  if (current_step.step_type === "condition") {
    unfinished_trace = _.find(instance.traces, function (trace) {
      return trace.is_finished === false;
    });
    return new Array(unfinished_trace.approves[0].user);
  }

  if (current_step.step_type === "start") {
    handlers = new Array();
    handlers.push(instance.applicant);
    handlers.push(instance.submitter);
    handlers = _.uniq(handlers);
    return handlers;
  }

  deal_type = current_step.deal_type;
  users = new Array();

  if (deal_type === "applicantRole") {
    applicant = instance.applicant;

    if (applicant) {
      space_user_count = db.space_users.find({
        space: space_id,
        user: applicant
      }).count();

      if (space_user_count === 0) {
        throw new Meteor.Error('error!', "提交人已经被删除或不属于当前space");
      }

      if (current_step.approver_roles && current_step.approver_roles.length > 0) {
        _.each(current_step.approver_roles, function (approver_role) {
          var role_count;
          role_count = db.flow_roles.find({
            _id: approver_role
          }).count();

          if (role_count === 0) {
            throw new Meteor.Error('error!', "角色已经被删除");
          }
        });

        users = getHandlersManager.getHandlersByUserAndRoles(applicant, current_step.approver_roles, space_id);
      } else {
        throw new Meteor.Error('error!', "审批岗位未指定");
      }
    } else {
      throw new Meteor.Error('error!', "Instance的提交人为空");
    }
  } else if (deal_type === "hrRole") {
    approveHrRoleIds = current_step.approver_hr_roles;

    if (approveHrRoleIds) {
      users = _.pluck(WorkflowManager.getHrRolesUsers(space_id, approveHrRoleIds), 'user');
    } else {
      throw new Meteor.Error('error!', "角色未指定");
    }
  } else if (deal_type === "applicant") {
    applicant = instance.applicant;
    space_user_count = db.space_users.find({
      space: space_id,
      user: applicant
    }).count();

    if (space_user_count === 0) {
      throw new Meteor.Error('error!', "提交人已经被删除或不属于当前space");
    } else {
      users = new Array(applicant);
    }
  } else if (deal_type === "orgFieldRole") {
    form_id = current_flow.form;
    form_rev = null;

    if (flow_rev === current_flow.current._id) {
      form_rev = current_flow.current.form_version;
    } else {
      current_flow_version = _.find(current_flow.historys, function (current_flow_history) {
        return current_flow_history._id === flow_rev;
      });

      if (current_flow_version) {
        form_rev = current_flow_version.form_version;
      }
    }

    form = db.forms.findOne(form_id);
    current_form = null;

    if (form_rev === form.current._id) {
      current_form = form.current;
    } else {
      current_form = _.find(form.historys, function (form_history) {
        return form_history._id === form_rev;
      });
    }

    approver_org_field = current_step.approver_org_field;
    form_fields = current_form.fields;
    field_code = null;

    _.each(form_fields, function (form_field) {
      if (form_field._id === approver_org_field) {
        return field_code = form_field.code;
      }
    });

    newest_values = uuflowManager.getUpdatedValues(instance);
    org_ids = new Array();
    org_ids_names = new Array();

    if (newest_values[field_code]) {
      if (newest_values[field_code] instanceof Array) {
        org_ids_names = newest_values[field_code];
      } else {
        org_ids_names.push(newest_values[field_code]);
      }
    }

    _.each(org_ids_names, function (org) {
      var check_org_count;
      check_org_count = db.organizations.find({
        _id: org["id"]
      }).count();

      if (check_org_count === 0) {
        throw new Meteor.Error('error!', "组织ID不合法");
      }

      return org_ids.push(org["id"]);
    });

    if (current_step.approver_roles && current_step.approver_roles.length > 0) {
      _.each(current_step.approver_roles, function (approver_role) {
        var role_count;
        role_count = db.flow_roles.find({
          _id: approver_role
        }).count();

        if (role_count === 0) {
          throw new Meteor.Error('error!', approver_role + "已经被删除");
        }
      });

      users = getHandlersManager.getHandlersByOrgsAndRoles(org_ids, current_step.approver_roles, instance.space);
    } else {
      throw new Meteor.Error('error!', "流程步骤" + current_step.name + "审批岗位未指定");
    }
  } else if (deal_type === "orgField") {
    form_id = current_flow.form;
    form_rev = null;

    if (flow_rev === current_flow.current._id) {
      form_rev = current_flow.current.form_version;
    } else {
      current_flow_version = _.find(current_flow.historys, function (current_flow_history) {
        return current_flow_history._id === flow_rev;
      });

      if (current_flow_version) {
        form_rev = current_flow_version.form_version;
      }
    }

    form = db.forms.findOne(form_id);
    current_form = null;

    if (form_rev === form.current._id) {
      current_form = form.current;
    } else {
      current_form = _.find(form.historys, function (form_history) {
        return form_history._id === form_rev;
      });
    }

    approver_org_field = current_step.approver_org_field;
    form_fields = current_form.fields;
    field_code = null;

    _.each(form_fields, function (form_field) {
      if (form_field._id === approver_org_field) {
        return field_code = form_field.code;
      }
    });

    newest_values = uuflowManager.getUpdatedValues(instance);
    org_ids = new Array();
    org_ids_names = new Array();

    if (newest_values[field_code]) {
      if (newest_values[field_code] instanceof Array) {
        org_ids_names = newest_values[field_code];
      } else {
        org_ids_names.push(newest_values[field_code]);
      }
    }

    _.each(org_ids_names, function (org) {
      var check_org_count;
      check_org_count = db.organizations.find({
        _id: org["id"]
      }).count();

      if (check_org_count === 0) {
        throw new Meteor.Error('error!', "组织ID不合法");
      }

      return org_ids.push(org["id"]);
    });

    user_ids = new Array();

    _.each(org_ids, function (org_id) {
      var check_orgs, org, org_children, org_users;
      org = db.organizations.findOne({
        _id: org_id
      }, {
        fields: {
          users: 1
        }
      });
      org_children = db.organizations.find({
        space: space_id,
        parents: org_id
      }, {
        fields: {
          users: 1
        }
      }).fetch();
      org_children.unshift(org);
      check_orgs = org_children;
      org_users = new Array();

      _.each(check_orgs, function (check_org_user) {
        if (check_org_user.users) {
          _.each(check_org_user.users, function (org_user) {
            if (db.space_users.find({
              space: space_id,
              user: org_user
            }).count() === 0) {
              throw new Meteor.Error('error!', "space下不存在此user");
            }
          });
        }

        user_ids = user_ids.concat(check_org_user.users);
        return org_users = org_users.concat(check_org_user.users);
      });

      if (org_users.length === 0) {
        throw new Meteor.Error('error!', "组织" + org_id + "不存在处理人");
      }
    });

    users = _.uniq(user_ids);
  } else if (deal_type === "userFieldRole") {
    form_id = current_flow.form;
    form_rev = null;

    if (flow_rev === current_flow.current._id) {
      form_rev = current_flow.current.form_version;
    } else {
      current_flow_version = _.find(current_flow.historys, function (current_flow_history) {
        return current_flow_history._id === flow_rev;
      });

      if (current_flow_version) {
        form_rev = current_flow_version.form_version;
      }
    }

    form = db.forms.findOne(form_id);
    current_form = null;

    if (form_rev === form.current._id) {
      current_form = form.current;
    } else {
      current_form = _.find(form.historys, function (form_history) {
        return form_history._id === form_rev;
      });
    }

    approver_user_field = current_step.approver_user_field;
    form_fields = current_form.fields;
    field_code = null;

    _.each(form_fields, function (form_field) {
      if (form_field._id === approver_user_field) {
        return field_code = form_field.code;
      }
    });

    newest_values = uuflowManager.getUpdatedValues(instance);
    user_ids_names = new Array();

    if (newest_values[field_code]) {
      if (newest_values[field_code] instanceof Array) {
        user_ids_names = newest_values[field_code];
      } else {
        user_ids_names.push(newest_values[field_code]);
      }
    }

    user_ids = new Array();

    _.each(user_ids_names, function (user) {
      var check_user_count;
      check_user_count = db.space_users.find({
        space: space_id,
        user: user["id"]
      }).count();

      if (check_user_count === 0) {
        throw new Meteor.Error('error!', "人员ID不合法");
      }

      return user_ids.push(user["id"]);
    });

    user_ids = _.uniq(user_ids);

    if (current_step.approver_roles && current_step.approver_roles.length > 0) {
      _.each(current_step.approver_roles, function (approver_role) {
        var role_count;
        role_count = db.flow_roles.find({
          _id: approver_role
        }).count();

        if (role_count === 0) {
          throw new Meteor.Error('error!', approver_role + "已经被删除");
        }
      });

      users = getHandlersManager.getHandlersByUsersAndRoles(user_ids, current_step.approver_roles, instance.space);
    } else {
      throw new Meteor.Error('error!', "流程步骤" + current_step.name + "审批岗位未指定");
    }
  } else if (deal_type === "userField") {
    form_id = current_flow.form;
    form_rev = null;

    if (flow_rev === current_flow.current._id) {
      form_rev = current_flow.current.form_version;
    } else {
      current_flow_version = _.find(current_flow.historys, function (current_flow_history) {
        return current_flow_history._id === flow_rev;
      });

      if (current_flow_version) {
        form_rev = current_flow_version.form_version;
      }
    }

    form = db.forms.findOne(form_id);
    current_form = null;

    if (form_rev === form.current._id) {
      current_form = form.current;
    } else {
      current_form = _.find(form.historys, function (form_history) {
        return form_history._id === form_rev;
      });
    }

    approver_user_field = current_step.approver_user_field;
    form_fields = current_form.fields;
    field_code = null;

    _.each(form_fields, function (form_field) {
      if (form_field._id === approver_user_field) {
        return field_code = form_field.code;
      }
    });

    newest_values = uuflowManager.getUpdatedValues(instance);
    user_ids_names = new Array();

    if (newest_values[field_code]) {
      if (newest_values[field_code] instanceof Array) {
        user_ids_names = newest_values[field_code];
      } else {
        user_ids_names.push(newest_values[field_code]);
      }
    }

    user_ids = new Array();

    _.each(user_ids_names, function (user) {
      var check_user_count;
      check_user_count = db.space_users.find({
        space: space_id,
        user: user["id"]
      }).count();

      if (check_user_count === 0) {
        throw new Meteor.Error('error!', "人员ID不合法");
      }

      return user_ids.push(user["id"]);
    });

    users = _.uniq(user_ids);
  } else if (deal_type === "specifyStepRole") {
    approver_step = current_step.approver_step;
    finished_traces = new Array();

    _.each(instance.traces, function (trace) {
      if (trace.step === approver_step) {
        return finished_traces.push(trace);
      }
    });

    max_startDate_trace = _.max(finished_traces, function (t) {
      return t.start_date;
    });
    approve_users = _.pluck(max_startDate_trace.approves, "user");

    if (current_step.approver_roles) {
      _.each(current_step.approver_roles, function (approver_role) {
        var role_count;
        role_count = db.flow_roles.find({
          _id: approver_role
        }).count();

        if (role_count === 0) {
          throw new Meteor.Error('error!', "角色已经被删除");
        }
      });
    }

    _.each(approve_users, function (approve_user) {
      if (db.space_users.find({
        space: space_id,
        user: approve_user
      }).count() === 0) {
        throw new Meteor.Error('error!', "指定步骤的处理人已经变更");
      }
    });

    users = getHandlersManager.getHandlersByUsersAndRoles(approve_users, current_step.approver_roles, space_id);
  } else if (deal_type === "specifyStepUser") {
    approver_step = current_step.approver_step;
    finished_traces = new Array();

    _.each(instance.traces, function (trace) {
      if (trace.step === approver_step) {
        return finished_traces.push(trace);
      }
    });

    max_startDate_trace = _.max(finished_traces, function (t) {
      return t.start_date;
    });
    approve_users = _.pluck(max_startDate_trace.approves, "user");

    _.each(approve_users, function (approve_user) {
      var check_approve_user_count;
      check_approve_user_count = db.space_users.find({
        space: space_id,
        user: approve_user
      }).count();

      if (check_approve_user_count === 0) {
        throw new Meteor.Error('error!', "指定步骤的处理人已经变更");
      }
    });

    users = _.uniq(approve_users);
  } else if (deal_type === "submitterRole") {
    submitter = instance.submitter;

    if (!submitter) {
      submitter_user_count = db.space_users.find({
        space: space_id,
        user: submitter
      }).count();

      if (submitter_user_count === 0) {
        throw new Meteor.Error('error!', "提交人已经被删除或不属于当前工作区");
      } else {
        if (current_step.approver_roles && current_step.approver_roles.length > 0) {
          _.each(current_step.approver_roles, function (approver_role) {
            var role_count;
            role_count = db.flow_roles.find({
              _id: approver_role
            }).count();

            if (role_count === 0) {
              throw new Meteor.Error('error!', approver_role + "已经被删除");
            }
          });

          users = getHandlersManager.getHandlersByUserAndRoles(submitter, current_step.approver_roles, space_id);
        } else {
          throw new Meteor.Error('error!', "流程步骤" + current_step.name + "审批岗位未指定");
        }
      }
    } else {
      throw new Meteor.Error('error!', "申请单的提交人为空");
    }
  } else if (deal_type === "submitter") {
    submitter = instance.submitter;
    submitter_user_count = db.space_users.find({
      space: space_id,
      user: submitter
    }).count();

    if (submitter_user_count === 0) {
      throw new Meteor.Error('error!', "提交人已经被删除或不属于当前工作区");
    } else {
      users = new Array(submitter);
    }
  } else if (deal_type === "specifyOrg") {
    approver_org_ids = current_step.approver_orgs;

    if (!approver_org_ids || approver_org_ids.length === 0) {
      throw new Meteor.Error('error!', "未定义用于查找下一步处理人的部门，请联系管理员调查流程图的配置是否正确");
    }

    valid_approver_org_ids = new Array();

    _.each(approver_org_ids, function (approver_org_id) {
      if (db.organizations.find({
        _id: approver_org_id
      }).count() > 0) {
        return valid_approver_org_ids.unshift(approver_org_id);
      }
    });

    org_user_ids = new Array();

    _.each(valid_approver_org_ids, function (valid_approver_org_id) {
      var child_orgs, valid_approver_org;
      valid_approver_org = db.organizations.findOne({
        _id: valid_approver_org_id
      }, {
        fields: {
          users: 1
        }
      });

      if (valid_approver_org.users) {
        org_user_ids = org_user_ids.concat(valid_approver_org.users);
      }

      child_orgs = db.organizations.find({
        space: space_id,
        parents: valid_approver_org_id
      }, {
        fields: {
          users: 1
        }
      }).fetch();
      return _.each(child_orgs, function (child_org) {
        if (child_org.users) {
          return org_user_ids = org_user_ids.concat(child_org.users);
        }
      });
    });

    org_user_ids = _.uniq(org_user_ids);
    new_org_user_ids = new Array();

    _.each(org_user_ids, function (org_user_id) {
      var space_user_info_count;
      space_user_info_count = db.space_users.find({
        space: space_id,
        user: org_user_id
      }).count();

      if (space_user_info_count > 0) {
        return new_org_user_ids.push(org_user_id);
      }
    });

    users = new_org_user_ids;
  } else if (deal_type === "specifyUser") {
    approver_user_ids = current_step.approver_users;
    approver_user_ids = _.uniq(approver_user_ids);
    new_approver_user_ids = new Array();

    _.each(approver_user_ids, function (approver_user_id) {
      var space_user_info_count;
      space_user_info_count = db.space_users.find({
        space: space_id,
        user: approver_user_id
      }).count();

      if (space_user_info_count > 0) {
        return new_approver_user_ids.push(approver_user_id);
      }
    });

    users = new_approver_user_ids;
  } else if (deal_type === "pickupAtRuntime") {
    next_step_users = new Array();
    _trace = _.find(instance.traces, function (_tr) {
      return _tr.is_finished === false;
    });
    _approve = _.find(_trace.approves, function (_app) {
      return _app.is_finished === false && _app.type !== 'cc';
    });

    if (_approve.next_steps) {
      if (_approve.next_steps[0]["users"]) {
        next_step_users = _approve.next_steps[0]["users"];
      }
    }

    users = next_step_users;
  } else if (deal_type === "applicantSuperior") {
    applicantSuperiors = new Array();
    _space_user = db.space_users.findOne({
      space: space_id,
      user: instance.applicant
    }, {
      fields: {
        manager: 1
      }
    });

    if (_space_user.manager) {
      applicantSuperiors.push(_space_user.manager);
    }

    users = applicantSuperiors;
  }

  if (serviceWorkflow) {
    excuteTriggers(login_user_id, flow_id, instance_id, current_step, users);
  }

  return users;
};

excuteTriggers = function (userId, flowId, insId, nextStep, nextUserIds) {
  return Meteor.wrapAsync(function (userId, flowId, insId, nextStep, nextUserIds, cb) {
    return serviceWorkflow.settings.excuteTriggers({
      when: 'cacluateNextStepUsers',
      userId: userId,
      flowId: flowId,
      insId: insId,
      nextStep: nextStep,
      nextUserIds: nextUserIds
    }).then(function (resolve, reject) {
      return cb(reject, resolve);
    });
  })(userId, flowId, insId, nextStep, nextUserIds);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"permission_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/permission_manager.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
permissionManager = {};

permissionManager.getFlowPermissions = function (flow_id, user_id) {
  var flow, my_permissions, org_ids, organizations, orgs_can_add, orgs_can_admin, orgs_can_monitor, space_id, users_can_add, users_can_admin, users_can_monitor;
  flow = uuflowManager.getFlow(flow_id);
  space_id = flow.space;
  org_ids = new Array();
  organizations = db.organizations.find({
    space: space_id,
    users: user_id
  }, {
    fields: {
      parents: 1
    }
  }).fetch();

  _.each(organizations, function (org) {
    org_ids.push(org._id);

    if (org.parents) {
      return _.each(org.parents, function (parent_id) {
        return org_ids.push(parent_id);
      });
    }
  });

  org_ids = _.uniq(org_ids);
  my_permissions = new Array();

  if (flow.perms) {
    if (flow.perms.users_can_add) {
      users_can_add = flow.perms.users_can_add;

      if (users_can_add.includes(user_id)) {
        my_permissions.push("add");
      }
    }

    if (flow.perms.orgs_can_add) {
      orgs_can_add = flow.perms.orgs_can_add;

      _.each(org_ids, function (org_id) {
        if (orgs_can_add.includes(org_id)) {
          return my_permissions.push("add");
        }
      });
    }

    if (flow.perms.users_can_monitor) {
      users_can_monitor = flow.perms.users_can_monitor;

      if (users_can_monitor.includes(user_id)) {
        my_permissions.push("monitor");
      }
    }

    if (flow.perms.orgs_can_monitor) {
      orgs_can_monitor = flow.perms.orgs_can_monitor;

      _.each(org_ids, function (org_id) {
        if (orgs_can_monitor.includes(org_id)) {
          return my_permissions.push("monitor");
        }
      });
    }

    if (flow.perms.users_can_admin) {
      users_can_admin = flow.perms.users_can_admin;

      if (users_can_admin.includes(user_id)) {
        my_permissions.push("admin");
      }
    }

    if (flow.perms.orgs_can_admin) {
      orgs_can_admin = flow.perms.orgs_can_admin;

      _.each(org_ids, function (org_id) {
        if (orgs_can_admin.includes(org_id)) {
          return my_permissions.push("admin");
        }
      });
    }
  }

  my_permissions = _.uniq(my_permissions);
  return my_permissions;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"approve_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/approve_manager.coffee                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
approveManager = {}; /*
                         对比approve_values与last_values 对象， 返回approve_values比last_values多出的或者改变的部分
                      */

approveManager.getChangeValues = function (last_values, approve_values) {
  var approve_values_keys, changeValues, last_values_keys;
  changeValues = {};
  last_values_keys = _.keys(last_values);
  approve_values_keys = _.keys(approve_values);
  approve_values_keys.forEach(function (key) {
    if (_.contains(last_values_keys, key)) {
      if (!_.isEqual(last_values[key], approve_values[key])) {
        return changeValues[key] = approve_values[key];
      }
    } else {
      if (approve_values[key] !== '') {
        return changeValues[key] = approve_values[key];
      }
    }
  });
  return changeValues;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/flow_manager.coffee                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
flowManager = {};

flowManager.getCategoriesFlows = function (spaceId, categorieId, fields) {
  var categoriesForms;
  categoriesForms = formManager.getCategoriesForms(spaceId, categorieId, {
    _id: 1
  }).fetch();
  return db.flows.find({
    form: {
      $in: categoriesForms.getProperty("_id")
    }
  });
};

flowManager.getUnCategoriesFlows = function (spaceId, fields) {
  var unCategoriesForms;
  unCategoriesForms = formManager.getUnCategoriesForms(spaceId, {
    _id: 1
  }).fetch();
  return db.flows.find({
    form: {
      $in: unCategoriesForms.getProperty("_id")
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"form_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/form_manager.coffee                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
formManager = {};

formManager.getCategoriesForms = function (spaceId, categorieId, fields) {
  var _fields;

  if (fields) {
    _fields = {
      fields: fields
    };
  }

  return db.forms.find({
    space: spaceId,
    category: categorieId,
    state: "enabled"
  }, _fields);
};

formManager.getUnCategoriesForms = function (spaceId, fields) {
  var _fields;

  if (fields) {
    _fields = {
      fields: fields
    };
  }

  return db.forms.find({
    space: spaceId,
    category: {
      $in: [null, ""]
    },
    state: "enabled"
  }, _fields);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"step_manager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/step_manager.coffee                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
stepManager = {};

stepManager.allowBatch = function (step) {
  return step.allowBatch;
};

stepManager.getStep = function (instance, flow, step_id) {
  var flow_rev, isExistStep;
  flow_rev = instance.flow_version;
  isExistStep = null;

  if (flow.current._id === flow_rev) {
    isExistStep = _.find(flow.current.steps, function (step) {
      return step._id === step_id;
    });
  } else {
    _.each(flow.historys, function (history) {
      if (history._id === flow_rev) {
        return isExistStep = _.find(history.steps, function (step) {
          return step._id === step_id;
        });
      }
    });
  }

  if (!isExistStep) {
    throw new Meteor.Error('error!', "不能获取step");
  }

  return isExistStep;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_manager.coffee":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/lib/instance_manager.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _eval, logger;

_eval = require('eval');
InstanceManager = {};
logger = new Logger('Workflow -> InstanceManager');

InstanceManager.handlerInstanceByFieldMap = function (ins, field_map) {
  var context, e, flow, res, script;
  res = ins;

  if (ins) {
    if (!field_map) {
      flow = db.flows.findOne({
        _id: ins.flow
      }, {
        fields: {
          field_map: 1
        }
      });

      if (flow != null ? flow.field_map : void 0) {
        field_map = flow.field_map;
      }
    }

    if (field_map) {
      context = _.clone(ins);
      context._ = _;
      script = "var instances = " + field_map + "; exports.instances = instances";

      try {
        res = _eval(script, "handlerInstanceByFieldMap", context, false).instances;
      } catch (error) {
        e = error;
        res = {
          _error: e
        };
        logger.error(e);
      }
    }
  }

  return res;
};

InstanceManager.getCurrentApprove = function (instance, handler) {
  var currentApprove, currentApproves, currentTraces;

  if (!instance || !instance.traces || instance.traces.length < 1) {
    return;
  }

  currentTraces = instance.traces.filterProperty('is_finished', false);

  if (currentTraces.length) {
    currentApproves = currentTraces[0].approves.filterProperty('is_finished', false).filterProperty('handler', handler);
    currentApprove = currentApproves.length > 0 ? currentApproves[0] : null;
  }

  if (!currentApprove || currentApprove.type === 'cc') {
    _.each(instance.traces, function (t) {
      _.each(t.approves, function (a) {
        if (a.type === 'cc' && a.user === handler && a.is_finished === false) {
          currentApprove = a;
        }
      });
    });
  }

  if (!currentApprove) {
    return;
  }

  return currentApprove;
};

InstanceManager.getCurrentTrace = function (instance, traceId) {
  return instance.traces.findPropertyByPK("_id", traceId);
};

InstanceManager.getMyApprove = function (instanceId, userId) {
  var flow, instance, judge, my_approve, nextSteps, next_user_ids, step, step_type, trace;
  instance = db.instances.findOne({
    _id: instanceId
  });
  flow = uuflowManager.getFlow(instance.flow);
  my_approve = InstanceManager.getCurrentApprove(instance, userId);

  if (my_approve) {
    trace = InstanceManager.getCurrentTrace(instance, my_approve.trace);
    step = uuflowManager.getStep(instance, flow, trace.step);
    step_type = step.step_type;
    judge = step_type === "sign" ? "approved" : "";
    nextSteps = uuflowManager.getNextSteps(instance, flow, step, judge);

    if (nextSteps.length === 1) {
      if (step_type === "sign" || step_type === "counterSign") {
        my_approve.judge = 'approved';
      }

      next_user_ids = getHandlersManager.getHandlers(instance._id, nextSteps[0], userId);

      if (!next_user_ids) {
        my_approve.next_steps = [{
          step: nextSteps[0],
          users: []
        }];
        return my_approve;
      }

      if (next_user_ids.length === 1) {
        my_approve.next_steps = [{
          step: nextSteps[0],
          users: next_user_ids
        }];
        return my_approve;
      }
    }
  }
};

InstanceManager.getBatchInstances = function (space, categoryId, flowIds, inbox_user) {
  var FIELDS, _batch_instances, categoryFlows, inbox_instances, query, unCategoryFlows;

  _batch_instances = new Array();
  query = {
    space: space,
    inbox_users: inbox_user
  };
  FIELDS = {
    name: 1,
    applicant_name: 1,
    submit_date: 1,
    flow_version: 1,
    "traces.step": 1,
    flow: 1,
    current_step_name: 1,
    flow_name: 1
  };

  if (categoryId) {
    if (categoryId === '-1') {
      unCategoryFlows = flowManager.getUnCategoriesFlows(space, {
        _id: 1
      }).fetch().getProperty("_id");
      query.flow = {
        $in: unCategoryFlows
      };
    } else {
      categoryFlows = flowManager.getCategoriesFlows(space, categoryId, {
        _id: 1
      }).fetch().getProperty("_id");
      query.flow = {
        $in: categoryFlows
      };
    }
  }

  if (flowIds) {
    query.flow = {
      $in: flowIds
    };
  }

  inbox_instances = db.instances.find(query, {
    fields: FIELDS,
    skip: 0,
    limit: 100
  });
  inbox_instances.forEach(function (ins) {
    var currentStep, currentStepId, flow, myApprove;
    currentStepId = _.last(ins.traces).step;
    flow = db.flows.findOne({
      _id: ins.flow
    });
    currentStep = stepManager.getStep(ins, flow, currentStepId);
    myApprove = InstanceManager.getMyApprove(ins._id, inbox_user);

    if (stepManager.allowBatch(currentStep) && myApprove) {
      delete ins.flow_version;
      delete ins.traces;
      delete ins.flow;
      ins.approve_start_date = myApprove.start_date;
      return _batch_instances.push(ins);
    }
  });
  return _batch_instances;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"categories.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/categories.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('categories', function (spaceId) {
  check(spaceId, String);

  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  return db.categories.find({
    space: spaceId
  }, {
    fields: {
      name: 1,
      space: 1,
      sort_no: 1,
      app: 1
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cfs_instances.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/cfs_instances.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('cfs_instances', function (instanceIds) {
  check(instanceIds, Array);

  if (!this.userId) {
    return this.ready();
  }

  if (!instanceIds) {
    return this.ready();
  }

  return cfs.instances.find({
    'metadata.instance': {
      $in: instanceIds
    },
    $or: [{
      'metadata.is_private': {
        $ne: true
      }
    }, {
      'metadata.is_private': true,
      "metadata.owner": this.userId
    }]
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_positions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/flow_positions.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('flow_positions', function (spaceId) {
  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  return db.flow_positions.find({
    space: spaceId
  }, {
    fields: {
      role: 1,
      users: 1,
      org: 1
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_positions_tabular.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/flow_positions_tabular.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publishComposite('flow_positions_tabular', function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  if (!this.userId) {
    return this.ready();
  }

  this.unblock();
  return {
    find: function () {
      this.unblock();
      return db.flow_positions.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
    children: [{
      find: function (position) {
        this.unblock();
        return db.flow_roles.find({
          _id: position.role
        }, {
          fields: {
            name: 1
          }
        });
      }
    }, {
      find: function (position) {
        this.unblock();
        return db.organizations.find({
          _id: position.org
        }, {
          fields: {
            fullname: 1
          }
        });
      }
    }, {
      find: function (position) {
        this.unblock();
        return db.space_users.find({
          space: position.space,
          user: {
            $in: position.users
          }
        }, {
          fields: {
            space: 1,
            user: 1,
            name: 1
          }
        });
      }
    }]
  };
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_roles.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/flow_roles.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('flow_roles', function (spaceId) {
  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  return db.flow_roles.find({
    space: spaceId
  }, {
    fields: {
      name: 1
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flows.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/flows.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('flows', function (spaceId) {
  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  if (db.flows.find({
    space: spaceId
  }).count() === 0) {
    db.spaces.createTemplateFormAndFlow(spaceId);
  }

  return db.flows.find({
    space: spaceId
  }, {
    fields: {
      name: 1,
      form: 1,
      state: 1,
      perms: 1,
      space: 1,
      company_id: 1,
      sort_no: 1,
      distribute_optional_users: 1,
      distribute_to_self: 1
    }
  });
});
Meteor.publish('flow_version', function (spaceId, flowId, versionId) {
  var getFlowVersion, handle, self;

  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  if (!flowId) {
    return this.ready();
  }

  if (!versionId) {
    return this.ready();
  }

  self = this;

  getFlowVersion = function (id, versionId) {
    var flow, flow_version;
    flow = db.flows.findOne({
      _id: id
    });

    if (flow) {
      flow_version = flow.current;
      flow_version.latest = true;

      if (flow_version._id !== versionId) {
        flow_version = flow.historys.findPropertyByPK("_id", versionId);
        flow_version.latest = false;
      }

      return flow_version;
    }
  };

  handle = db.flows.find({
    _id: flowId
  }, {
    fields: {
      _id: 1,
      "current.modified": 1
    }
  }).observeChanges({
    changed: function (id) {
      return self.changed("flow_versions", versionId, getFlowVersion(id, versionId));
    }
  });
  self.added("flow_versions", versionId, getFlowVersion(flowId, versionId));
  self.ready();
  return self.onStop(function () {
    return handle.stop();
  });
});
Meteor.publish('distribute_optional_flows', function (flow_ids) {
  if (!this.userId) {
    return this.ready();
  }

  if (!flow_ids) {
    return this.ready();
  }

  return db.flows.find({
    _id: {
      $in: flow_ids
    }
  }, {
    fields: {
      name: 1,
      form: 1,
      state: 1,
      perms: 1,
      space: 1,
      distribute_optional_users: 1,
      distribute_to_self: 1,
      distribute_end_notification: 1,
      company_id: 1
    }
  });
});
Meteor.publish('flow', function (spaceId, flowId) {
  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  if (!flowId) {
    return this.ready();
  }

  return db.flows.find({
    _id: flowId,
    space: spaceId
  }, {
    fields: {
      print_template: 1,
      instance_template: 1,
      events: 1,
      distribute_optional_users: 1,
      distribute_to_self: 1,
      upload_after_being_distributed: 1,
      distribute_end_notification: 1,
      company_id: 1,
      allow_select_step: 1
    }
  });
});
Meteor.publish('flow_files', function (spaceId, flowId) {
  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  if (!flowId) {
    return this.ready();
  }

  return cfs.files.find({
    'metadata.space': spaceId,
    'metadata.object_name': 'flows',
    'metadata.record_id': flowId
  });
});
Meteor.publishComposite('flows_tabular', function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  if (!this.userId) {
    return this.ready();
  }

  this.unblock();
  return {
    find: function () {
      this.unblock();
      return db.flows.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
    children: [{
      find: function (flow) {
        this.unblock();
        return db.space_users.find({
          space: flow.space,
          user: flow.current.modified_by
        }, {
          fields: {
            space: 1,
            user: 1,
            name: 1
          }
        });
      }
    }, {
      find: function (flow) {
        this.unblock();
        return db.forms.find({
          space: flow.space,
          _id: flow.form
        }, {
          fields: {
            space: 1,
            _id: 1,
            name: 1,
            category: 1
          }
        });
      }
    }, {
      find: function (flow) {
        this.unblock();
        return db.categories.find({
          space: flow.space
        }, {
          fields: {
            space: 1,
            _id: 1,
            name: 1
          }
        });
      }
    }]
  };
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"forms.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/forms.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('forms', function (spaceId) {
  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  return db.forms.find({
    space: spaceId
  }, {
    fields: {
      name: 1,
      category: 1,
      state: 1,
      description: 1,
      instance_style: 1
    }
  });
});
Meteor.publish('form_version', function (spaceId, formId, versionId) {
  var getFormVersion, handle, self;

  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  if (!formId) {
    return this.ready();
  }

  if (!versionId) {
    return this.ready();
  }

  self = this;

  getFormVersion = function (id, versionId) {
    var form, form_version;
    form = db.forms.findOne({
      _id: id
    });

    if (!form) {
      return {};
    }

    form_version = form.current;
    form_version.latest = true;

    if (form_version._id !== versionId) {
      form_version = form.historys.findPropertyByPK("_id", versionId);
      form_version.latest = false;
    }

    return form_version;
  };

  handle = db.forms.find({
    _id: formId
  }, {
    fields: {
      _id: 1,
      "current.modified": 1
    }
  }).observeChanges({
    changed: function (id) {
      return self.changed("form_versions", versionId, getFormVersion(id, versionId));
    }
  });
  self.added("form_versions", versionId, getFormVersion(formId, versionId));
  self.ready();
  return self.onStop(function () {
    return handle.stop();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_data.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/instance_data.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('instance_data', function (instanceId, box) {
  var getMiniInstance, getMyapproveModified, handle, instance, instance_fields_0, miniApproveFields, needChange, self, triggerChangeFields, triggerChangeFieldsValues;

  if (!this.userId) {
    return this.ready();
  }

  if (!(instanceId && db.instances.find({
    _id: instanceId
  }).count())) {
    return this.ready();
  }

  self = this;
  miniApproveFields = ['_id', 'is_finished', 'user', 'handler', 'handler_name', 'type', 'start_date', 'description', 'is_read', 'judge', 'finish_date', 'from_user_name', 'from_user', 'cc_description', 'auto_submitted'];
  triggerChangeFields = ['form_version', 'flow_version', 'related_instances', '_my_approve_read_dates', 'values'];
  triggerChangeFieldsValues = {};
  instance_fields_0 = {
    "record_synced": 0,
    "traces.approves.handler_organization_name": 0,
    "traces.approves.handler_organization": 0,
    "traces.approves.cost_time": 0,
    "traces.approves.is_error": 0,
    "traces.approves.deadline": 0,
    "traces.approves.remind_date": 0,
    "traces.approves.reminded_count": 0,
    "traces.approves.modified_by": 0,
    "traces.approves.modified": 0,
    "traces.approves.geolocation": 0,
    "traces.approves.cc_users": 0,
    "traces.approves.from_approve_id": 0,
    "traces.approves.values_history": 0
  };

  getMyapproveModified = function (traces) {
    var myApproveModifieds;
    myApproveModifieds = new Array();

    if (traces != null) {
      traces.forEach(function (trace) {
        var ref;
        return trace != null ? (ref = trace.approves) != null ? ref.forEach(function (approve) {
          if (approve.user === self.userId || approve.handler === self.userId) {
            return myApproveModifieds.push(approve.read_date);
          }
        }) : void 0 : void 0;
      });
    }

    return myApproveModifieds;
  };

  getMiniInstance = function (_instanceId) {
    var instance, ref, ref1, show_modal_traces_list, traces;
    instance = db.instances.findOne({
      _id: _instanceId
    }, {
      fields: instance_fields_0
    });

    if (instance) {
      triggerChangeFields.forEach(function (key) {
        if (key === '_my_approve_read_dates') {
          return triggerChangeFieldsValues[key] = getMyapproveModified(instance.traces);
        } else {
          return triggerChangeFieldsValues[key] = instance[key];
        }
      });
      show_modal_traces_list = ((ref = db.space_settings.findOne({
        space: instance.space,
        key: "show_modal_traces_list"
      }, {
        fields: {
          values: 1
        }
      })) != null ? ref.values : void 0) || false;

      if (show_modal_traces_list) {
        traces = new Array();

        if (instance != null) {
          if ((ref1 = instance.traces) != null) {
            ref1.forEach(function (trace) {
              var _trace, approves, ref2;

              _trace = _.clone(trace);
              approves = new Array();

              if (trace != null) {
                if ((ref2 = trace.approves) != null) {
                  ref2.forEach(function (approve) {
                    if (approve.type !== 'cc' || approve.user === self.userId || approve.handler === self.userId || !_.isEmpty(approve.sign_field_code)) {
                      return approves.push(approve);
                    }
                  });
                }
              }

              _trace.approves = approves;
              return traces.push(_trace);
            });
          }
        }

        instance.traces = traces;
      }
    }

    return instance;
  };

  needChange = function (changeFields) {
    var _change, _rev;

    if (changeFields) {
      _change = false;
      _rev = _.find(triggerChangeFields, function (key) {
        var _key, _my_approve_modifieds;

        _key = key;

        if (key === '_my_approve_read_dates') {
          _key = 'traces';
        }

        if (_.has(changeFields, _key)) {
          if (key === '_my_approve_read_dates') {
            _my_approve_modifieds = getMyapproveModified(changeFields.traces);
            return !_.isEqual(triggerChangeFieldsValues[key], _my_approve_modifieds);
          } else {
            return !_.isEqual(triggerChangeFieldsValues[key], changeFields[key]);
          }
        }
      });

      if (_rev) {
        _change = true;
      }

      return _change;
    }

    return true;
  };

  handle = db.instances.find({
    _id: instanceId
  }).observeChanges({
    changed: function (id, fields) {
      if (box !== 'inbox' || needChange(fields)) {
        return self.changed("instances", id, getMiniInstance(id));
      }
    },
    removed: function (id) {
      return self.removed("instances", id);
    }
  });
  instance = getMiniInstance(instanceId);
  self.added("instances", instance != null ? instance._id : void 0, instance);
  self.ready();
  return self.onStop(function () {
    return handle.stop();
  });
});
Meteor.publish('instance_traces', function (instanceId) {
  var getInstanceTraces, handle, self;

  if (!this.userId) {
    return this.ready();
  }

  if (!instanceId) {
    return this.ready();
  }

  self = this;

  getInstanceTraces = function (_insId) {
    return db.instances.findOne({
      _id: _insId
    }, {
      fields: {
        _id: 1,
        traces: 1
      }
    });
  };

  handle = db.instances.find({
    _id: instanceId
  }).observeChanges({
    changed: function (id) {
      return self.changed("instance_traces", instanceId, getInstanceTraces(instanceId));
    }
  });
  self.added("instance_traces", instanceId, getInstanceTraces(instanceId));
  self.ready();
  return self.onStop(function () {
    return handle.stop();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_list.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/instance_list.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('instances_list', function (spaceId, box, flowId) {
  var query;

  if (!this.userId) {
    return this.ready();
  }

  if (!spaceId) {
    return this.ready();
  }

  query = {
    space: spaceId
  };

  if (box === "inbox") {
    query.inbox_users = this.userId;
  } else if (box === "outbox") {
    query.outbox_users = this.userId;
  } else if (box === "draft") {
    query.submitter = this.userId;
    query.state = "draft";
  } else if (box === "pending") {
    query.submitter = this.userId;
    query.state = "pending";
  } else if (box === "completed") {
    query.submitter = this.userId;
    query.state = "completed";
  } else if (box === "monitor") {
    query.flow = flowId;
    query.state = {
      $in: ["pending", "completed"]
    };
  } else {
    query.state = "none";
  }

  return db.instances.find(query, {
    fields: {
      name: 1,
      created: 1,
      form: 1,
      flow: 1,
      space: 1,
      modified: 1,
      applicant: 1,
      is_archived: 1,
      form_version: 1,
      flow_version: 1
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_tabular.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/instance_tabular.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var asyncLastFinishedApprove, lastFinishedApproveAggregate;

lastFinishedApproveAggregate = function (instanceid, userId, dataMap, callback) {
  var operation;
  operation = [{
    "$match": {
      "_id": instanceid
    }
  }, {
    "$project": {
      "name": 1,
      "_approve": "$traces.approves"
    }
  }, {
    "$unwind": "$_approve"
  }, {
    "$unwind": "$_approve"
  }, {
    "$match": {
      "_approve.is_finished": true,
      $or: [{
        "_approve.handler": userId
      }, {
        "_approve.user": userId
      }]
    }
  }, {
    "$group": {
      "_id": "$_id",
      "finish_date": {
        "$last": "$_approve.finish_date"
      }
    }
  }];
  return db.instances.rawCollection().aggregate(operation).toArray(function (err, data) {
    if (err) {
      throw new Error(err);
    }

    data.forEach(function (doc) {
      return dataMap.push(doc);
    });

    if (callback && _.isFunction(callback)) {
      callback();
    }
  });
};

asyncLastFinishedApprove = Meteor.wrapAsync(lastFinishedApproveAggregate);
Meteor.publish("instance_tabular", function (tableName, ids, fields) {
  var getMyApprove, getMyLastFinishedApprove, getStepCurrentName, handle, self;

  if (!this.userId) {
    return this.ready();
  }

  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  fields.cc_users = 1;
  self = this;

  getMyLastFinishedApprove = function (userId, instanceId) {
    var data;
    data = [];
    asyncLastFinishedApprove(instanceId, userId, data);

    if (data.length > 0) {
      return data[0];
    }
  };

  getMyApprove = function (userId, instanceId) {
    var approve, approves, instance, is_read, myApprove, notFinishedTraces;
    instance = db.instances.findOne({
      _id: instanceId
    }, {
      fields: {
        traces: 1
      }
    });
    myApprove = null;

    if (!instance) {
      return;
    }

    if (!instance.traces || instance.traces.length < 1) {
      return;
    }

    notFinishedTraces = instance.traces.filterProperty("is_finished", false);

    if (notFinishedTraces.length > 0) {
      approves = notFinishedTraces[0].approves.filterProperty("is_finished", false).filterProperty("handler", userId);

      if (approves.length > 0) {
        approve = approves[0];
        myApprove = {
          id: approve._id,
          instance: approve.instance,
          trace: approve.trace,
          is_read: approve.is_read,
          start_date: approve.start_date,
          agent: approve.agent,
          user_name: approve.user_name
        };
      }
    }

    if (!myApprove) {
      is_read = false;
      instance.traces.forEach(function (trace) {
        var ref;
        return trace != null ? (ref = trace.approves) != null ? ref.forEach(function (approve) {
          if (approve.type === 'cc' && approve.user === userId && approve.is_finished === false) {
            if (approve.is_read) {
              is_read = true;
            }

            return myApprove = {
              id: approve._id,
              is_read: is_read,
              start_date: approve.start_date,
              agent: approve.agent,
              user_name: approve.user_name
            };
          }
        }) : void 0 : void 0;
      });
    }

    return myApprove;
  };

  getStepCurrentName = function (instanceId) {
    var instance, ref, ref1, stepCurrentName;
    instance = db.instances.findOne({
      _id: instanceId
    }, {
      fields: {
        "traces.name": 1,
        "traces": {
          $slice: -1
        }
      }
    });

    if (instance) {
      stepCurrentName = (ref = instance.traces) != null ? (ref1 = ref[0]) != null ? ref1.name : void 0 : void 0;
    }

    return stepCurrentName;
  };

  handle = db.instances.find({
    _id: {
      $in: ids
    }
  }, {
    fields: {
      traces: 0
    }
  }).observeChanges({
    changed: function (id) {
      var error, instance, myApprove, myLastFinishedApprove, ref, ref1;
      instance = db.instances.findOne({
        _id: id
      }, {
        fields: fields
      });

      if (!instance) {
        return;
      }

      myApprove = getMyApprove(self.userId, id);
      myLastFinishedApprove = getMyLastFinishedApprove(self.userId, id);

      if (myApprove) {
        instance.is_read = myApprove.is_read;
        instance.start_date = myApprove.start_date;

        if (myApprove.agent) {
          instance.agent_user_name = myApprove.user_name;
        }
      } else {
        instance.is_read = true;
      }

      if (myLastFinishedApprove) {
        instance.my_finish_date = myLastFinishedApprove.finish_date;
      }

      instance.is_cc = ((ref = instance.cc_users) != null ? ref.includes(self.userId) : void 0) || false;
      instance.cc_count = ((ref1 = instance.cc_users) != null ? ref1.length : void 0) || 0;
      delete instance.cc_users;

      try {
        return self.changed("instances", id, instance);
      } catch (error1) {
        error = error1;
        console.log('instance observeChanges error: ', error.message);
        console.log('self.userId: ', self.userId);
        console.log('tableName: ', tableName);
        console.log('ids: ', JSON.stringify(ids));
        return console.log('myApprove: ', JSON.stringify(myApprove));
      }
    },
    removed: function (id) {
      return self.removed("instances", id);
    }
  });
  ids.forEach(function (id) {
    var instance, myApprove, myLastFinishedApprove, ref, ref1;
    instance = db.instances.findOne({
      _id: id
    }, {
      fields: fields
    });

    if (!instance) {
      return;
    }

    myApprove = getMyApprove(self.userId, id);
    myLastFinishedApprove = getMyLastFinishedApprove(self.userId, id);

    if (myApprove) {
      instance.is_read = myApprove.is_read;
      instance.start_date = myApprove.start_date;

      if (myApprove.agent) {
        instance.agent_user_name = myApprove.user_name;
      }
    } else {
      instance.is_read = true;
    }

    if (myLastFinishedApprove) {
      instance.my_finish_date = myLastFinishedApprove.finish_date;
    }

    instance.is_cc = ((ref = instance.cc_users) != null ? ref.includes(self.userId) : void 0) || false;
    instance.cc_count = ((ref1 = instance.cc_users) != null ? ref1.length : void 0) || 0;
    delete instance.cc_users;
    return self.added("instances", id, instance);
  });
  self.ready();
  return self.onStop(function () {
    return handle.stop();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instance_draft.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/instance_draft.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('instances_draft', function (spaceId) {
  var userId;
  check(spaceId, String);

  if (!this.userId) {
    return this.ready();
  }

  userId = this.userId;
  return db.instances.find({
    state: "draft",
    space: spaceId,
    submitter: userId,
    $or: [{
      inbox_users: {
        $exists: false
      }
    }, {
      inbox_users: []
    }]
  }, {
    fields: {
      _id: 1,
      state: 1,
      space: 1,
      submitter: 1,
      inbox_users: 1,
      modified: 1,
      name: 1
    },
    sort: {
      modified: -1
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"distributed_instances_state_by_ids.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/distributed_instances_state_by_ids.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('distributed_instances_state_by_ids', function (instance_ids) {
  var handle, self;
  check(instance_ids, Array);

  if (!this.userId) {
    return this.ready();
  }

  if (!instance_ids) {
    return this.ready();
  }

  if (_.isEmpty(instance_ids)) {
    return this.ready();
  }

  self = this;
  handle = db.instances.find({
    _id: {
      $in: instance_ids
    }
  }, {
    fields: {
      state: 1,
      traces: {
        $slice: 1
      }
    }
  }).observeChanges({
    added: function (id, fields) {
      return self.added('instances', id, {
        state: fields.state,
        is_read: fields.traces[0].approves[0].is_read
      });
    },
    changed: function (id, fields) {
      if (fields.state) {
        self.changed('instances', id, {
          state: fields.state
        });
      }

      if (fields.traces) {
        return self.changed('instances', id, {
          is_read: fields.traces[0].approves[0].is_read
        });
      }
    }
  });
  this.ready();
  return this.onStop(function () {
    return handle.stop();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"related_instaces.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/related_instaces.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('related_instaces', function (instanceId, related_instances) {
  var ref, related_instance_ids;

  if (!this.userId) {
    return this.ready();
  }

  if (!instanceId) {
    return this.ready();
  }

  related_instance_ids = (ref = db.instances.findOne(instanceId, {
    fields: {
      related_instances: 1
    }
  })) != null ? ref.related_instances : void 0;

  if (related_instance_ids && _.isArray(related_instance_ids)) {
    return db.instances.find({
      _id: {
        $in: related_instance_ids
      }
    }, {
      fields: {
        _id: 1,
        name: 1,
        space: 1
      }
    });
  } else {
    return this.ready();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"space_user_signs.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/space_user_signs.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {
  Meteor.publish('space_user_signs', function (spaceId) {
    check(spaceId, String);

    if (!this.userId) {
      return this.ready();
    }

    return db.space_user_signs.find({
      space: spaceId
    }, {
      fields: {
        created_by: 0,
        created: 0,
        modified_by: 0
      }
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user_inbox_instance.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/user_inbox_instance.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
Meteor.publishComposite "user_inbox_instance", ()->
	unless this.userId
		return this.ready()

	userSpaceIds = db.space_users.find({
		user: this.userId,
		user_accepted: true
	}, {fields: {space: 1}}).fetch().getEach("space");
	query = {space: {$in: userSpaceIds}}

	query.$or = [{inbox_users: this.userId}, {cc_users: this.userId}]

	find: ->
		db.instances.find(query, {
			fields: {
				space: 1,
				applicant_name: 1,
				flow: 1,
				inbox_users: 1,
				cc_users: 1,
				state: 1,
				name: 1,
				modified: 1,
				form: 1
			}, sort: {modified: -1}, skip: 0, limit: 200
		});
	children: [
		{
			find: (instance, post)->
				db.flows.find({_id: instance.flow}, {fields: {name: 1, space: 1}});
		}
	]
 */ /*
    Meteor.publish 'my_inbox_instances', (spaceId)->
    	unless this.userId
    		return this.ready()
    
    	self = this;
    
    	 *	userSpaceIds = db.space_users.find({
    	 *		user: this.userId,
    	 *		user_accepted: true
    	 *	}, {fields: {space: 1}}).fetch().getEach("space");
    
    	query = {space: spaceId}
    
    	query.$or = [{inbox_users: this.userId}, {cc_users: this.userId}]
    
    	fields = {
    		space: 1,
     *		applicant_name: 1,
    		flow: 1,
    		inbox_users: 1,
    		cc_users: 1,
    		state: 1,
     *		name: 1,
     *		modified: 1,
    		form: 1
    	}
    
    	handle = db.instances.find(query, {sort: {modified: -1}, skip: 0, limit: 500}).observeChanges {
    		added: (id)->
    			instance = db.instances.findOne({_id: id}, {fields: fields})
    			return if not instance
    			instance.is_cc = instance.cc_users?.includes(self.userId) || false
    			delete instance.cc_users
    			self.added("instances", id, instance)
    		changed: (id)->
    			instance = db.instances.findOne({_id: id}, {fields: fields})
    			return if not instance
    			instance.is_cc = instance.cc_users?.includes(self.userId) || false
    			delete instance.cc_users
    			self.changed("instances", id, instance);
    		removed: (id)->
    			self.removed("instances", id);
    	}
    
    	self.ready();
    	self.onStop ()->
    		handle.stop()
     */var _async_get_flow_instances_aggregate, _get_flow_instances_aggregate;

_get_flow_instances_aggregate = function (spaceId, userId, _items, callback) {
  return db.instances.rawCollection().aggregate([{
    $match: {
      space: spaceId,
      $or: [{
        inbox_users: userId
      }, {
        cc_users: userId
      }]
    }
  }, {
    $group: {
      _id: {
        flow: "$flow",
        category: "$category"
      },
      count: {
        $sum: 1
      }
    }
  }]).toArray(function (err, data) {
    if (err) {
      throw new Error(err);
    }

    data.forEach(function (doc) {
      return _items.push(doc);
    });

    if (callback && _.isFunction(callback)) {
      callback();
    }
  });
};

_async_get_flow_instances_aggregate = Meteor.wrapAsync(_get_flow_instances_aggregate);
Meteor.publish('my_inbox_flow_instances_count', function (spaceId) {
  var _changeData, _flowsData, _init, data, handle, query, self;

  if (!this.userId) {
    return this.ready();
  }

  self = this;
  query = {
    space: spaceId
  };
  query.$or = [{
    inbox_users: this.userId
  }, {
    cc_users: this.userId
  }];
  data = [];

  _async_get_flow_instances_aggregate(spaceId, self.userId, data);

  _flowsData = [];

  _.each(data, function (dataItem) {
    return _flowsData.push({
      _id: dataItem._id.flow,
      category: dataItem._id.category,
      count: dataItem.count
    });
  });

  self.added("flow_instances", spaceId, {
    flows: _flowsData
  });

  _changeData = function (doc, action) {
    var flow_instance;
    flow_instance = _.find(_flowsData, function (f) {
      return f._id === doc.flow;
    });

    if (flow_instance) {
      if (action === "added") {
        flow_instance.count++;
      } else if (action === "removed") {
        flow_instance.count--;
      }
    } else if (action === "added") {
      _flowsData.push({
        _id: doc.flow,
        category: doc.category,
        count: 1
      });
    }

    return self.changed("flow_instances", spaceId, {
      flows: _flowsData
    });
  };

  _init = true;
  handle = db.instances.find(query, {
    fields: {
      _id: 1,
      inbox_users: 1,
      cc_users: 1,
      flow: 1,
      category: 1
    }
  }).observe({
    added: function (doc) {
      if (!_init) {
        return _changeData(doc, "added");
      }
    },
    removed: function (doc) {
      if (!_init) {
        return _changeData(doc, "removed");
      }
    }
  });
  _init = false;
  self.ready();
  return self.onStop(function () {
    return handle.stop();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flow_main_attach_template.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/publications/flow_main_attach_template.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('flow_main_attach_template', function (spaceId, flowId) {
  check(spaceId, String);
  check(flowId, String);

  if (!this.userId) {
    return this.ready();
  }

  if (!(spaceId && flowId)) {
    return this.ready();
  }

  return Creator.getCollection('cms_files').find({
    space: spaceId,
    'parent.o': 'flows',
    'parent.ids': flowId,
    name: '正文.docx'
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"flow-template":{"workflow_template.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/flow-template/workflow_template.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
workflowTemplate = {};
workflowTemplate["en"] = [];
workflowTemplate["zh-CN"] = [];
Meteor.startup(function () {
  var absolute_path_cn, absolute_path_us, filesList_cn, filesList_us, fs, mime, path, path_cn, path_us, readFileList, ref, ref1;
  fs = require('fs');
  path = require('path');
  mime = require('mime');

  readFileList = function (pathDir, filesList) {
    var files;
    files = fs.readdirSync(pathDir);
    return files.forEach(function (name, index) {
      var obj, stat;
      stat = fs.statSync(path.join(pathDir, name));

      if (stat.isDirectory()) {
        return readFileList(path.join(pathDir, name), filesList);
      } else {
        obj = {};
        obj.path = pathDir;
        obj.name = name;
        return filesList.push(obj);
      }
    });
  };

  filesList_cn = [];
  path_cn = (ref = Meteor.settings.workflowTemplates) != null ? ref.path_cn : void 0;

  if (path_cn) {
    absolute_path_cn = path.resolve(path_cn);
    console.log("absolute_path_cn", absolute_path_cn);

    if (fs.existsSync(absolute_path_cn)) {
      readFileList(absolute_path_cn, filesList_cn);
      filesList_cn.forEach(function (file) {
        var data, e;

        try {
          if (mime.getType(file.name) === "application/json") {
            data = fs.readFileSync(path.join(file.path, file.name), 'utf8');
            return workflowTemplate["zh-CN"].push(JSON.parse(data));
          }
        } catch (error) {
          e = error;
          console.error("获取zh-cn文件夹下的所有文件", path.join(file.path, file.name));
          return console.error(e.stack);
        }
      });
    }
  }

  filesList_us = [];
  path_us = (ref1 = Meteor.settings.workflowTemplates) != null ? ref1.path_us : void 0;

  if (path_us) {
    absolute_path_us = path.resolve(path_us);
    console.log("absolute_path_us", absolute_path_us);

    if (fs.existsSync(absolute_path_us)) {
      readFileList(absolute_path_us, filesList_us);
      return filesList_us.forEach(function (file) {
        var data, e;

        try {
          if (mime.getType(file.name) === "application/json") {
            data = fs.readFileSync(path.join(file.path, file.name), 'utf8');
            return workflowTemplate["en"].push(JSON.parse(data));
          }
        } catch (error) {
          e = error;
          console.error("获取en-us文件夹下的所有文件", path.join(file.path, file.name));
          return console.error(e.stack);
        }
      });
    }
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/startup.coffee                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"schedule":{"auto_finish_process_delegation.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/schedule/auto_finish_process_delegation.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */Meteor.startup(function () {
  var go_next, ref, rule, schedule;

  if ((ref = Meteor.settings.cron) != null ? ref.auto_finish_process_delegation : void 0) {
    schedule = require('node-schedule');
    rule = Meteor.settings.cron.auto_finish_process_delegation;
    go_next = true;
    return schedule.scheduleJob(rule, Meteor.bindEnvironment(function () {
      var e, now;

      try {
        if (!go_next) {
          return;
        }

        go_next = false;
        console.time('auto_finish_process_delegation');
        now = new Date();
        db.process_delegation_rules.update({
          enabled: true,
          end_time: {
            $lte: now
          }
        }, {
          $set: {
            enabled: false
          }
        }, {
          multi: true
        });
        console.timeEnd('auto_finish_process_delegation');
        return go_next = true;
      } catch (error) {
        e = error;
        console.error("AUTO AUTO_FINISH_PROCESS_DELEGATION ERROR: ");
        console.error(e.stack);
        return go_next = true;
      }
    }, function (e) {
      console.log('Failed to bind environment: auto_finish_process_delegation.coffee');
      return console.log(e.stack);
    }));
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"timeout_auto_submit.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/server/schedule/timeout_auto_submit.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */Meteor.startup(function () {
  var go_next, ref, rule, schedule;

  if ((ref = Meteor.settings.cron) != null ? ref.timeout_auto_submit : void 0) {
    schedule = require('node-schedule');
    rule = Meteor.settings.cron.timeout_auto_submit;
    go_next = true;
    return schedule.scheduleJob(rule, Meteor.bindEnvironment(function () {
      var e;

      try {
        if (!go_next) {
          return;
        }

        go_next = false;
        console.time('timeout_auto_submit');
        uuflowManager.timeoutAutoSubmit();
        console.timeEnd('timeout_auto_submit');
        return go_next = true;
      } catch (error) {
        e = error;
        console.error("AUTO TIMEOUT_AUTO_SUBMIT ERROR: ");
        console.error(e.stack);
        return go_next = true;
      }
    }, function (e) {
      console.log('Failed to bind environment: timeout_auto_submit.coffee');
      return console.log(e.stack);
    }));
  }
});
Meteor.methods({
  timeout_auto_submit: function (ins_id) {
    uuflowManager.timeoutAutoSubmit(ins_id);
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"related_instances_tabular.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/related_instances_tabular.coffee                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {
  return TabularTables.related_instances_tabular = new Tabular.Table({
    name: "related_instances_tabular",
    collection: db.instances,
    columns: [{
      data: "_id",
      title: '<input type="checkbox" name="reverse" id="reverse">',
      orderable: false,
      width: '1px',
      render: function (val, type, doc) {
        var input, ref;
        input = '<input type="checkbox" class="related-instances-list-checkbox" name="related_instances_ids" id="related_instances_ids" value="' + doc._id + '"';

        if ((ref = TabularTables.related_instances_tabular.related_instances) != null ? ref.includes(doc._id) : void 0) {
          input += " checked ";
        }

        input += ">";
        return input;
      }
    }, {
      data: "name",
      orderable: false,
      width: '45%',
      render: function (val, type, doc) {
        var absolute, href;
        href = '';

        if (Meteor.isClient && (Steedos.isMobile() || Steedos.isCordova())) {
          href = '';
        }

        absolute = false;

        if (Meteor.isServer) {
          absolute = this.absolute;
        }

        if (absolute) {
          href = Meteor.absoluteUrl("workflow/space/" + doc.space + "/view/readonly/" + doc._id + '?hide_traces=0');
        } else {
          href = Steedos.absoluteUrl("workflow/space/" + doc.space + "/view/readonly/" + doc._id + '?hide_traces=0');
        }

        return "<a data-id='" + doc._id + "' target='_blank' href='" + href + "'>" + doc.name + "</a>";
      }
    }, {
      data: "applicant_name",
      title: t("instances_applicant_name"),
      orderable: false
    }, {
      data: "flow_name",
      title: t("instances_flow"),
      orderable: false
    }, {
      data: "current_step_name",
      title: t("instances_flow"),
      render: function (val, type, doc) {
        var judge, step_current_name;

        if (doc.state === "completed") {
          judge = doc.final_decision || "approved";
        }

        step_current_name = doc.current_step_name || '';
        return "<div class=\"step-current-state " + judge + "\">" + step_current_name + "</div>";
      }
    }],
    dom: "tp",
    lengthChange: false,
    extraFields: ["state", "final_decision", "space", "keywords"],
    pageLength: 10,
    info: false,
    searching: true,
    responsive: {
      details: false
    },
    autoWidth: false,
    changeSelector: function (selector, userId) {
      var curSpaceUser, flow_ids, flows, organizations, ref, ref1, space, spaceId;

      if (!userId) {
        return {
          _id: -1
        };
      }

      spaceId = selector.space;

      if (!spaceId) {
        if ((selector != null ? (ref = selector.$and) != null ? ref.length : void 0 : void 0) > 0) {
          spaceId = selector.$and.getProperty('space')[0];
        }
      }

      if (!spaceId) {
        return {
          _id: -1
        };
      }

      space = db.spaces.findOne(spaceId);

      if (!space) {
        selector.state = "none";
      }

      if (!space.admins.includes(userId)) {
        flow_ids = [];
        curSpaceUser = db.space_users.findOne({
          space: spaceId,
          'user': userId
        });

        if (curSpaceUser) {
          organizations = db.organizations.find({
            _id: {
              $in: curSpaceUser.organizations
            }
          }).fetch();
          flows = db.flows.find({
            space: spaceId
          });
          flows.forEach(function (fl) {
            if (WorkflowManager.canMonitor(fl, curSpaceUser, organizations) || WorkflowManager.canAdmin(fl, curSpaceUser, organizations)) {
              return flow_ids.push(fl._id);
            }
          });
        }

        if ((selector != null ? (ref1 = selector.$and) != null ? ref1.length : void 0 : void 0) > 0) {
          selector.$and[0].$or = [{
            submitter: userId
          }, {
            applicant: userId
          }, {
            inbox_users: userId
          }, {
            outbox_users: userId
          }, {
            cc_users: userId
          }, {
            flow: {
              $in: flow_ids
            }
          }];
        } else {
          _.extend(selector, {
            $or: [{
              submitter: userId
            }, {
              applicant: userId
            }, {
              inbox_users: userId
            }, {
              outbox_users: userId
            }, {
              cc_users: userId
            }, {
              flow: {
                $in: flow_ids
              }
            }]
          });
        }
      }

      return selector;
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tabular.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steedos_workflow/tabular.coffee                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var GetBoxInstancesTabularOptions, _get_inbox_instances_tabular_options, _get_outbox_instances_tabular_options, _handleListFields, instancesListTableTabular, newInstancesListTabular, updateTabularTitle;

Steedos.subs["InstanceTabular"] = new SubsManager();

_handleListFields = function (fields) {
  var ins_fields;
  ins_fields = new Array();

  if (fields != null) {
    fields.forEach(function (f) {
      var ref;

      if (f.type === 'table') {
        return console.log('ignore opinion field in table');
      } else if (f.type === 'section') {
        return f != null ? (ref = f.fields) != null ? ref.forEach(function (f1) {
          return ins_fields.push(f1);
        }) : void 0 : void 0;
      } else {
        return ins_fields.push(f);
      }
    });
  }

  return ins_fields;
};

updateTabularTitle = function () {};

instancesListTableTabular = function (flowId, fields) {
  var ins_fields, key, options;
  options = {
    name: "instances",
    collection: db.instances,
    pub: "instance_tabular",
    onUnload: function () {
      return Meteor.setTimeout(Template.instance_list._tableColumns, 150);
    },
    drawCallback: function (settings) {
      var ellipsisLink, emptyTd, title;
      emptyTd = $(".dataTables_empty");

      if (emptyTd.length) {
        emptyTd[0].colSpan = "6";
      }

      if (!Steedos.isMobile() && !Steedos.isPad()) {
        Meteor.setTimeout(Template.instance_list._tableColumns, 150);
        $(".instance-list").scrollTop(0).ready(function () {
          return $(".instance-list").perfectScrollbar("update");
        });
      } else {
        $(".instance-list").scrollTop(0);
      }

      title = t("pager_input_hint");
      ellipsisLink = settings.oInstance.parent().find('.paging_numbers .pagination .disabled a');
      return ellipsisLink.attr("title", title).css("cursor", "pointer").click(function () {
        var goPage, input;

        if (!$(this).find('input').length) {
          input = $('<input class="paginate_input form-control input-sm" type="text" style="border: none; padding:0 2px;"/>');

          if (Steedos.isMobile()) {
            input.css({
              width: "52px",
              height: "20px"
            });
          } else {
            input.css({
              width: "52px",
              height: "16px"
            });
          }

          input.attr("title", title).attr("placeholder", title);
          $(this).empty().append(input);

          goPage = function (index) {
            var pages;

            if (index > 0) {
              pages = Math.ceil(settings.fnRecordsDisplay() / settings._iDisplayLength);

              if (index > pages) {
                index = pages;
              }

              index--;
              return settings.oInstance.DataTable().page(index).draw('page');
            }
          };

          input.blur(function (e) {
            var currentPage;
            currentPage = $(this).val();
            goPage(currentPage);
            return $(this).parent().html('...');
          });
          return input.keydown(function (e) {
            var currentPage;

            if (e.keyCode.toString() === "13") {
              currentPage = $(this).val();
              return goPage(currentPage);
            }
          });
        }
      });
    },
    createdRow: function (row, data, dataIndex) {
      if (Meteor.isClient) {
        if (data._id === FlowRouter.current().params.instanceId) {
          return row.setAttribute("class", "selected");
        }
      }
    },
    columns: [{
      data: "_id",
      orderable: false,
      render: function (val, type, doc) {
        var agent_view, cc_view, flow_name, instanceNamePriorityClass, isFavoriteSelected, modified, modifiedFromNow, modifiedString, priorityIcon, priorityIconClass, priorityValue, ref, ref1, step_current_name_view, unread;
        modifiedString = moment(doc.modified).format('YYYY-MM-DD');
        modified = doc.modified;

        if (Session.get("box") === 'inbox' && doc.state !== 'draft') {
          modified = doc.start_date || doc.modified;
        }

        if (Session.get("box") === 'outbox' || Session.get("box") === 'monitor') {
          modified = doc.submit_date || doc.submit_date;
        }

        modifiedFromNow = Steedos.momentReactiveFromNow(modified);
        flow_name = doc.flow_name;
        cc_view = "";
        step_current_name_view = "";

        if (doc.is_cc && !((ref = doc.inbox_users) != null ? ref.includes(Meteor.userId()) : void 0) && Session.get("box") === 'inbox') {
          cc_view = "<label class='cc-label'>(" + TAPi18n.__("instance_cc_title") + ")</label> ";
          step_current_name_view = "<div class='flow-name'>" + flow_name + "<span>(" + doc.current_step_name + ")</span></div>";
        } else {
          if (Session.get("box") !== 'draft' && doc.current_step_name) {
            step_current_name_view = "<div class='flow-name'>" + flow_name + "<span>(" + doc.current_step_name + ")</span></div>";
          } else {
            step_current_name_view = "<div class='flow-name'>" + flow_name + "</div>";
          }
        }

        agent_view = "";

        if (doc.agent_user_name && Session.get("box") === 'inbox') {
          agent_view = "<label class='cc-label'>(" + TAPi18n.__('process_delegation_rules_description', {
            userName: doc.agent_user_name
          }) + ")</label>";
        }

        unread = '';
        isFavoriteSelected = Favorites.isRecordSelected("instances", doc._id);

        if (Favorites.isRecordSelected("instances", doc._id)) {
          unread = '<i class="ion ion-ios-star-outline instance-favorite-selected"></i>';
        } else if (Session.get("box") === 'inbox' && doc.is_read === false) {
          unread = '<i class="ion ion-record unread"></i>';
        } else if (Session.get("box") === 'monitor' && doc.is_hidden === true) {
          unread = '<i class="fa fa-lock"></i>';
        }

        priorityIcon = "";
        priorityIconClass = "";
        priorityValue = (ref1 = doc.values) != null ? ref1.priority : void 0;

        switch (priorityValue) {
          case "特急":
            priorityIconClass = "danger";
            break;

          case "紧急":
            priorityIconClass = "warning";
            break;

          case "办文":
            priorityIconClass = "muted";
        }

        if (priorityIconClass) {
          instanceNamePriorityClass = "color-priority color-priority-" + priorityIconClass;
        }

        return "<div class='instance-read-bar'>" + unread + "</div>\n<div class='instance-name " + instanceNamePriorityClass + "'>" + doc.name + cc_view + agent_view + "\n	<span>" + doc.applicant_name + "</span>\n</div>\n<div class='instance-detail'>" + step_current_name_view + "\n	<span class='instance-modified' title='" + modifiedString + "'>" + modifiedFromNow + "</span>\n</div>";
      }
    }, {
      data: "applicant_organization_name",
      title: t("instances_applicant_organization_name"),
      visible: false
    }, {
      data: "name",
      title: t("instances_name"),
      render: function (val, type, doc) {
        var agent_view, cc_view, instanceNamePriorityClass, priorityIconClass, priorityValue, ref, ref1, step_current_name_view, unread;
        cc_view = "";
        step_current_name_view = "";

        if (doc.is_cc && !((ref = doc.inbox_users) != null ? ref.includes(Meteor.userId()) : void 0) && Session.get("box") === 'inbox') {
          cc_view = "<label class='cc-label'>(" + TAPi18n.__("instance_cc_title") + ")</label> ";
        }

        agent_view = "";

        if (doc.agent_user_name) {
          agent_view = "<label class='cc-label'>(" + TAPi18n.__('process_delegation_rules_description', {
            userName: doc.agent_user_name
          }) + ")</label>";
        }

        unread = '';

        if (Session.get("box") === 'inbox' && doc.is_read === false) {
          unread = '<i class="ion ion-record unread"></i>';
        } else if (Session.get("box") === 'monitor' && doc.is_hidden === true) {
          unread = '<i class="fa fa-lock"></i>';
        }

        priorityIconClass = "";
        priorityValue = (ref1 = doc.values) != null ? ref1.priority : void 0;

        switch (priorityValue) {
          case "特急":
            priorityIconClass = "danger";
            break;

          case "紧急":
            priorityIconClass = "warning";
            break;

          case "办文":
            priorityIconClass = "muted";
        }

        if (priorityIconClass) {
          instanceNamePriorityClass = "color-priority color-priority-" + priorityIconClass;
        }

        return "<div class='instance-read-bar'>" + unread + "</div>\n<div class='instance-name " + instanceNamePriorityClass + "'>" + doc.name + cc_view + agent_view + "</div>";
      },
      visible: false,
      orderable: false
    }, {
      data: "applicant_name",
      title: t("instances_applicant_name"),
      visible: false,
      orderable: false
    }, {
      data: "submit_date",
      title: t("instances_submit_date"),
      render: function (val, type, doc) {
        if (doc.submit_date) {
          return moment(doc.submit_date).format('YYYY-MM-DD HH:mm');
        }
      },
      visible: false,
      orderable: true
    }, {
      data: "flow_name",
      title: t("instances_flow"),
      visible: false,
      orderable: false
    }, {
      data: "current_step_name",
      title: t("instances_step_current_name"),
      render: function (val, type, doc) {
        var cc_tag, judge, step_current_name;

        if (doc.state === "completed") {
          judge = doc.final_decision || "approved";
        }

        step_current_name = doc.current_step_name || '';
        cc_tag = '';

        if (doc.cc_count > 0) {
          cc_tag = TAPi18n.__('cc_tag');
        }

        return "<div class=\"step-current-state " + judge + "\">" + step_current_name + cc_tag + "</div>";
      },
      visible: false,
      orderable: false
    }, {
      data: "modified",
      title: t("instances_modified"),
      render: function (val, type, doc) {
        return moment(doc.modified).format('YYYY-MM-DD HH:mm');
      },
      visible: false,
      orderable: true
    }, {
      data: "start_date",
      title: t("instances_start_date"),
      render: function (val, type, doc) {
        if (doc.start_date) {
          return moment(doc.start_date).format('YYYY-MM-DD HH:mm');
        }
      },
      visible: false,
      orderable: true
    }, {
      data: "my_finish_date",
      render: function (val, type, doc) {
        if (doc.my_finish_date) {
          return moment(doc.my_finish_date).format('YYYY-MM-DD HH:mm');
        }
      },
      visible: false,
      orderable: true
    }, {
      data: "modified",
      visible: false
    }, {
      data: "keywords",
      visible: false
    }, {
      data: "is_archived",
      render: function (val, type, doc) {
        var ref;

        if ((doc != null ? (ref = doc.values) != null ? ref.record_need : void 0 : void 0) && doc.values.record_need === "true") {
          if (doc != null ? doc.is_archived : void 0) {
            return t("YES");
          }

          return t("NO");
        }
      },
      visible: false,
      orderable: false
    }],
    dom: function () {
      if (Steedos.isMobile()) {
        return 'tp';
      } else {
        return 'tpl';
      }
    }(),
    order: [[4, "desc"]],
    extraFields: ["form", "flow", "inbox_users", "state", "space", "applicant", "form_version", "flow_version", "is_cc", "cc_count", "is_read", "current_step_name", "values", "keywords", "final_decision", "flow_name", "is_hidden", "agent_user_name"],
    lengthChange: true,
    lengthMenu: [10, 15, 20, 25, 50, 100],
    pageLength: 10,
    info: false,
    searching: true,
    responsive: {
      details: false
    },
    autoWidth: false,
    changeSelector: function (selector, userId) {
      var ref, space, space_user;

      if (!userId) {
        return {
          _id: -1
        };
      }

      space = selector.space;

      if (!space) {
        if ((selector != null ? (ref = selector.$and) != null ? ref.length : void 0 : void 0) > 0) {
          space = selector.$and.getProperty('space')[0];
        }
      }

      if (!space) {
        return {
          _id: -1
        };
      }

      space_user = db.space_users.findOne({
        user: userId,
        space: space
      }, {
        fields: {
          _id: 1
        }
      });

      if (!space_user) {
        return {
          _id: -1
        };
      }

      return selector;
    },
    pagingType: "numbers"
  };

  if (flowId) {
    key = "instanceFlow" + flowId;
    options.name = key;
    TabularTables.instances.fields = fields;
    ins_fields = _handleListFields(TabularTables.instances.fields);
    ins_fields.forEach(function (f) {
      if (f.type !== 'table' && f.is_list_display) {
        return options.columns.push({
          data: f.name || f.code,
          title: t(f.name || f.code),
          visible: false,
          orderable: false,
          render: function (val, type, doc) {
            var value, values;
            values = doc.values || {};
            value = values[f.code];

            switch (f.type) {
              case 'user':
                value = value != null ? value.name : void 0;
                break;

              case 'group':
                value = value != null ? value.fullname : void 0;
                break;

              case 'date':
                if (value) {
                  value = moment(value).format('YYYY-MM-DD');
                }

                break;

              case 'dateTime':
                if (value) {
                  value = moment(value).format('YYYY-MM-DD HH:mm');
                }

                break;

              case 'checkbox':
                if (value === true || value === 'true') {
                  value = TAPi18n.__("form_field_checkbox_yes");
                } else {
                  value = TAPi18n.__("form_field_checkbox_no");
                }

                break;

              case 'odata':
                if (value) {
                  if (_.isArray(value)) {
                    value = _.pluck(value, '@label').toString();
                  } else {
                    value = value['@label'];
                  }
                }

            }

            return value;
          }
        });
      }
    });
  }

  return options;
};

Meteor.startup(function () {
  return TabularTables.instances = new Tabular.Table(instancesListTableTabular());
});

GetBoxInstancesTabularOptions = function (box, flowId, fields) {
  var key, options;
  key = "instanceFlow" + box + flowId;

  if (box === "inbox") {
    options = _get_inbox_instances_tabular_options(flowId, fields);
  } else if (box === "outbox") {
    options = _get_outbox_instances_tabular_options(flowId, fields);
  } else {
    options = instancesListTableTabular(flowId, fields);

    if (!flowId) {
      options.name = "inbox_instances";
    }
  }

  if (flowId) {
    options.name = key;
  }

  return options;
};

_get_inbox_instances_tabular_options = function (flowId, fields) {
  var options;
  options = instancesListTableTabular(flowId, fields);

  if (!flowId) {
    options.name = "inbox_instances";
  }

  options.order = [[8, "desc"]];

  options.filteredRecordIds = function (table, selector, sort, skip, limit, old_filteredRecordIds, userId, findOptions) {
    var ag_sort, aggregate, aggregate_operation, async_aggregate, filteredRecordIds, s1, s1_0, s1_1;
    aggregate_operation = [{
      $match: selector
    }, {
      $project: {
        name: 1,
        "_approve": '$traces.approves'
      }
    }, {
      $unwind: "$_approve"
    }, {
      $unwind: "$_approve"
    }, {
      $match: {
        '_approve.is_finished': false,
        '_approve.handler': userId
      }
    }];

    if (sort && sort.length > 0) {
      s1 = sort[0];
      s1_0 = s1[0];
      s1_1 = s1[1];

      if (s1_0 === 'start_date') {
        findOptions.sort = [['modified', s1_1]];
        aggregate_operation.push({
          $group: {
            _id: "$_id",
            "approve_start_date": {
              $first: "$_approve.start_date"
            }
          }
        });
        ag_sort = {
          'approve_start_date': s1_1 === 'asc' ? 1 : -1
        };
        aggregate_operation.push({
          $sort: ag_sort
        });
        aggregate_operation.push({
          $skip: skip
        });
        aggregate_operation.push({
          $limit: limit
        });
        filteredRecordIds = new Array();

        aggregate = function (table, aggregate_operation, filteredRecordIds, cb) {
          table.collection.rawCollection().aggregate(aggregate_operation).toArray(function (err, data) {
            if (err) {
              throw new Error(err);
            }

            data.forEach(function (doc) {
              filteredRecordIds.push(doc._id);
            });

            if (cb) {
              cb();
            }
          });
        };

        async_aggregate = Meteor.wrapAsync(aggregate);
        async_aggregate(table, aggregate_operation, filteredRecordIds);
        return filteredRecordIds.uniq();
      } else {
        return old_filteredRecordIds;
      }
    }
  };

  return options;
};

Meteor.startup(function () {
  return TabularTables.inbox_instances = new Tabular.Table(GetBoxInstancesTabularOptions("inbox"));
});

_get_outbox_instances_tabular_options = function (flowId, fields) {
  var options;
  options = instancesListTableTabular(flowId, fields);

  if (!flowId) {
    options.name = "outbox_instances";
  }

  options.order = [[9, "desc"]];

  options.filteredRecordIds = function (table, selector, sort, skip, limit, old_filteredRecordIds, userId, findOptions) {
    var ag_sort, aggregate, aggregate_operation, async_aggregate, filteredRecordIds, s1, s1_0, s1_1;
    aggregate_operation = [{
      $match: selector
    }, {
      $project: {
        name: 1,
        "_approve": '$traces.approves'
      }
    }, {
      $unwind: "$_approve"
    }, {
      $unwind: "$_approve"
    }, {
      $match: {
        '_approve.is_finished': true,
        $or: [{
          '_approve.handler': userId
        }, {
          '_approve.user': userId
        }]
      }
    }];

    if (sort && sort.length > 0) {
      s1 = sort[0];
      s1_0 = s1[0];
      s1_1 = s1[1];

      if (s1_0 === 'my_finish_date') {
        findOptions.sort = [['modified', s1_1]];
        aggregate_operation.push({
          $group: {
            _id: "$_id",
            "approve_finish_date": {
              $last: "$_approve.finish_date"
            }
          }
        });
        ag_sort = {
          'approve_finish_date': s1_1 === 'asc' ? 1 : -1
        };
        aggregate_operation.push({
          $sort: ag_sort
        });
        aggregate_operation.push({
          $skip: skip
        });
        aggregate_operation.push({
          $limit: limit
        });
        filteredRecordIds = new Array();

        aggregate = function (table, aggregate_operation, filteredRecordIds, cb) {
          table.collection.rawCollection().aggregate(aggregate_operation).toArray(function (err, data) {
            if (err) {
              throw new Error(err);
            }

            data.forEach(function (doc) {
              filteredRecordIds.push(doc._id);
            });

            if (cb) {
              cb();
            }
          });
        };

        async_aggregate = Meteor.wrapAsync(aggregate);
        async_aggregate(table, aggregate_operation, filteredRecordIds);
        return filteredRecordIds.uniq();
      } else {
        return old_filteredRecordIds;
      }
    }
  };

  return options;
};

Meteor.startup(function () {
  return TabularTables.outbox_instances = new Tabular.Table(GetBoxInstancesTabularOptions("outbox"));
});

if (Meteor.isClient) {
  TabularTables.flowInstances = new ReactiveVar();
}

Meteor.startup(function () {
  return Tracker.autorun(function (c) {
    if (Meteor.isClient && !Steedos.isMobile()) {
      if (Session.get("flowId") && Session.get("box") !== 'draft') {
        return Meteor.call("newInstancesListTabular", Session.get("box"), Session.get("flowId"), function (error, result) {
          newInstancesListTabular(Session.get("box"), Session.get("flowId"), result);
          return Template.instance_list._changeOrder();
        });
      }
    }
  });
});

newInstancesListTabular = function (box, flowId, fields) {
  var flow, key, ref, ref1, ref2;

  if (!fields) {
    flow = db.flows.findOne({
      _id: flowId
    }, {
      fields: {
        form: 1
      }
    });
    fields = (ref = db.forms.findOne({
      _id: flow != null ? flow.form : void 0
    }, {
      fields: {
        'current.fields': 1
      }
    })) != null ? (ref1 = ref.current) != null ? ref1.fields : void 0 : void 0;
  }

  fields = _handleListFields(fields);

  if ((fields != null ? (ref2 = fields.filterProperty("is_list_display", true)) != null ? ref2.length : void 0 : void 0) > 0) {
    key = "instanceFlow" + box + flowId;

    if (Meteor.isClient) {
      TabularTables.flowInstances.set(new Tabular.Table(GetBoxInstancesTabularOptions(box, flowId, fields)));
    } else {
      new Tabular.Table(GetBoxInstancesTabularOptions(box, flowId, fields));
    }

    return console.log("new TabularTables ", key);
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    newInstancesListTabular: function (box, flowId) {
      var fields, flow, ref, ref1;
      newInstancesListTabular(box, flowId);
      flow = db.flows.findOne({
        _id: flowId
      }, {
        fields: {
          form: 1
        }
      });
      fields = (ref = db.forms.findOne({
        _id: flow != null ? flow.form : void 0
      }, {
        fields: {
          'current.fields': 1
        }
      })) != null ? (ref1 = ref.current) != null ? ref1.fields : void 0 : void 0;
      return fields;
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

require("/node_modules/meteor/steedos:workflow/checkNpm.js");
require("/node_modules/meteor/steedos:workflow/lib/URI.js");
require("/node_modules/meteor/steedos:workflow/lib/collection_helpers.js");
require("/node_modules/meteor/steedos:workflow/lib/tapi18n.coffee");
require("/node_modules/meteor/steedos:workflow/lib/core.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/forms.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/flows.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/flow_roles.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/flow_positions.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/instances.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/categories.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/spaces.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/deleted_instances.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/auth_tokens.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/webhooks.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/space_user_signs.coffee");
require("/node_modules/meteor/steedos:workflow/lib/models/space_users.coffee");
require("/node_modules/meteor/steedos:workflow/lib/cfs/instances.coffee");
require("/node_modules/meteor/steedos:workflow/client/lib/instance_readonly_template.coffee");
require("/node_modules/meteor/steedos:workflow/client/lib/template_manager.coffee");
require("/node_modules/meteor/steedos:workflow/client/coreform/inputTypes/coreform-table/steedos-table.js");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_image_sign.coffee");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_traces_handler.coffee");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_instance_form.coffee");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_instance_attachments.js");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_instance_sign_text.coffee");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_traces_help.coffee");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_related_instances.coffee");
require("/node_modules/meteor/steedos:workflow/client/views/instance/_related_records.coffee");
require("/node_modules/meteor/steedos:workflow/routes/designer.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/set_instance_step_approve.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/get_instance_data.js");
require("/node_modules/meteor/steedos:workflow/server/methods/save_instance.js");
require("/node_modules/meteor/steedos:workflow/server/methods/trace_approve_cc.js");
require("/node_modules/meteor/steedos:workflow/server/methods/forward_instance.js");
require("/node_modules/meteor/steedos:workflow/server/methods/cfs_instances.js");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_approve.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_return.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_remind.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/next_step_users_not_found.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_number_rules.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/check_main_attach.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/related_instances.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/edit_flow_positions.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/start_flow.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_traces.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_batch.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/flow.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/distribute.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/hide_instance.coffee");
require("/node_modules/meteor/steedos:workflow/server/methods/instance_value.coffee");
require("/node_modules/meteor/steedos:workflow/server/routes/instance.coffee");
require("/node_modules/meteor/steedos:workflow/server/routes/steedos_css.coffee");
require("/node_modules/meteor/steedos:workflow/server/routes/instance_draft_view.coffee");
require("/node_modules/meteor/steedos:workflow/routes/getSpaceUsers.js");
require("/node_modules/meteor/steedos:workflow/routes/getFormulaUserObjects.js");
require("/node_modules/meteor/steedos:workflow/routes/init_formula_values.js");
require("/node_modules/meteor/steedos:workflow/routes/getNameForUser.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_designer_startup.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_drafts.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_remove.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_reassign.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_archive.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_export.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_space_changeset.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_retrieve.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_forward.js");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_instance.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_pending.coffee");
require("/node_modules/meteor/steedos:workflow/routes/export_table_template.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_drafts.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_get.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_submit.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_save.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_get_by_stepname.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_open_cfs.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_forward_refill.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_workflow_forward_table_refill.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_sub_table_sort.coffee");
require("/node_modules/meteor/steedos:workflow/routes/test_webhook.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/1_form_formula.js");
require("/node_modules/meteor/steedos:workflow/server/lib/get_handlers_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/permission_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/approve_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/flow_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/form_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/step_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/categories.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/cfs_instances.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/flow_positions.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/flow_positions_tabular.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/flow_roles.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/flows.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/forms.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/instance_data.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/instance_list.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/instance_tabular.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/instance_draft.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/distributed_instances_state_by_ids.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/related_instaces.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/space_user_signs.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/user_inbox_instance.coffee");
require("/node_modules/meteor/steedos:workflow/server/publications/flow_main_attach_template.coffee");
require("/node_modules/meteor/steedos:workflow/lib/admin.coffee");
require("/node_modules/meteor/steedos:workflow/related_instances_tabular.coffee");
require("/node_modules/meteor/steedos:workflow/tabular.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_formula_users.coffee");
require("/node_modules/meteor/steedos:workflow/routes/api_formula_organizations.coffee");
require("/node_modules/meteor/steedos:workflow/server/flow-template/workflow_template.coffee");
require("/node_modules/meteor/steedos:workflow/server/startup.coffee");
require("/node_modules/meteor/steedos:workflow/server/lib/instance_manager.coffee");
require("/node_modules/meteor/steedos:workflow/server/schedule/auto_finish_process_delegation.coffee");
require("/node_modules/meteor/steedos:workflow/server/schedule/timeout_auto_submit.coffee");

/* Exports */
Package._define("steedos:workflow", {
  InstanceManager: InstanceManager,
  WorkflowManager_format: WorkflowManager_format,
  Workflow: Workflow,
  SteedosTable: SteedosTable,
  InstanceReadOnlyTemplate: InstanceReadOnlyTemplate,
  TemplateManager: TemplateManager,
  CoreForm: CoreForm,
  InstanceNumberRules: InstanceNumberRules,
  getHandlersManager: getHandlersManager,
  permissionManager: permissionManager,
  workflowTemplate: workflowTemplate,
  approveManager: approveManager,
  stepManager: stepManager,
  flowManager: flowManager,
  formManager: formManager
});

})();

//# sourceURL=meteor://💻app/packages/steedos_workflow.js