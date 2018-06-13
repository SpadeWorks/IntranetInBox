(function() {
    if (!window["NP"]) {
        window["NP"] = {};
    }
    NP.Namespace = {
        Register: function(namespace) {
            var parts,
                context,
                nsPath,
                partsLength;

            parts = namespace.split(".");
            partsLength = parts.length;
            context = window;
            nsPath = "";
            for (var i = 0, l = partsLength; i < l; ++i) {
                var name = parts[i];
                if (!context[name]) {
                    context[name] = {};
                    context[name].__namespace = name;
                }
                nsPath += name + ".";
                context = context[name];
                if (!context.__namespace) {
                    context.__namespace = nsPath.substring(0, nsPath.length - 1);
                }
            }
            return context;
        }
    };
})();

/**
 * This namespace contains utility functions used across application.
 */
(function() {
    NP.Namespace.Register("NP");
    NP.Namespace.Register("NP.UTILS");

    /**
     * This namespace contains enums used across application.
     */

    NP.ENUM = (function() {
        var scriptType = { CSOM: 1, Taxonomy: 2, UserProfile: 3, UserProfileCSOM: 4, Search: 5, WebTaggingUI: 6, RTE: 7, Dialog: 8, Publishing: 9, AjaxControlToolKit: 10, Ribbon: 11 };

        return {
            ScriptType: scriptType
        };
    })();

    /**
     * This namespace contains constants used across application.
     */

    NP.Constant = (function() {
        var EVENT_NBS_SP_INIT = "NBSSPINIT",
            WIZARD_WAIT_MESSAGE = "Creating a new {0}",
            REDIRECT_EDIT_MODE_URL = "?ControlMode=Edit&DisplayMode=Design",
            PAGE_LAYOUT_PATH = "/_catalogs/masterpage/PharmaAuthor/{0}",
            URL_ASSETPORTALBROWSER_ASPX = "AssetPortalBrowser.aspx?AssetType={1}",
            URL_RTEUPLOADDIALOG_ASPX = "RteUploadDialog.aspx?LCID=1033&Dialog={0}&UseDivDialog=true&Source={1}&AssetPageFolder=true&Title={2}",
            URL_UPLOAD_ASPX = "Upload.aspx?List={{0}}&RootFolder={1}&Source={2}",
            UPLOAD_FROM_LIBRARY = "Click here to insert a picture from existing SharePoint Library.",
            UPLOAD_FROM_COMPUTER = "Click here to insert a picture from your computer.",
            GTM_PAGE_TYPE_NEWS_DETAIL = "News Detail",
            GTM_PAGE_TYPE_Home_Page = "Home Page",
            GTM_PAGE_TYPE_NEWS_ARCHIVE = "News Archive",
            GTM_PAGE_TYPE_TOOLSET_SEARCH = "Toolset Search",
            GTM_PAGE_TYPE_TOOLSET_DETAIL = "Toolset Detail",
            GTM_PAGE_TYPE_ORGANIZATION = "Organization",
            GTM_PAGE_TYPE_SYSTEM_PAGE = "System Page",
            GTM_ALL_COUNTRIES = "All Countries",
            GTM_NOT_APPLICABLE = "Not Applicable",
            GTM_GLOBAL_NEWS = "Global News",
            GTM_LOCAL_NEWS = "Local News",
            GTM_HOME_PAGE = "Home Page",
            GTM_CE_SEARCH = "ce.search",
            GTM_SEARCH_CATEGORY_TOOLSET = "Toolset",
            GTM_SEARCH_CATEGORY_NEWS = "News",
            GTM_SEARCH_CATEGORY_GLOBAL = "Global Search",
            GTM_SEARCH_CATEGORY_PEOPLE = "People Search",
            GTM_SEARCH_SCOPE_ONSITE = "Onsite",
            GTM_SEARCH_SCOPE_OFFSITE = "Offsite",
            GTM_SEARCH_EVENT_CLICK = "Click",
            GTM_SEARCH_EVENT__KEYPRESS = "Keypress",
            GTM_SEARCH_EVENT_SUGGESTIONS = "Suggestions",
            GTM_BEST_BETS = "Best Bet",
            GTM_SEARCH_CATEGORY_NBS_SERVICES = "gtmServiceSearch";


        return {
            EVENT_NBS_SP_INIT: EVENT_NBS_SP_INIT,
            WIZARD_WAIT_MESSAGE: WIZARD_WAIT_MESSAGE,
            REDIRECT_EDIT_MODE_URL: REDIRECT_EDIT_MODE_URL,
            PAGE_LAYOUT_PATH: PAGE_LAYOUT_PATH,
            URL_ASSETPORTALBROWSER_ASPX: URL_ASSETPORTALBROWSER_ASPX,
            URL_RTEUPLOADDIALOG_ASPX: URL_RTEUPLOADDIALOG_ASPX,
            URL_UPLOAD_ASPX: URL_UPLOAD_ASPX,
            UPLOAD_FROM_LIBRARY: UPLOAD_FROM_LIBRARY,
            UPLOAD_FROM_COMPUTER: UPLOAD_FROM_COMPUTER,
            GTM_PAGE_TYPE_NEWS_DETAIL: GTM_PAGE_TYPE_NEWS_DETAIL,
            GTM_PAGE_TYPE_Home_Page: GTM_PAGE_TYPE_Home_Page,
            GTM_PAGE_TYPE_NEWS_ARCHIVE: GTM_PAGE_TYPE_NEWS_ARCHIVE,
            GTM_PAGE_TYPE_TOOLSET_SEARCH: GTM_PAGE_TYPE_TOOLSET_SEARCH,
            GTM_PAGE_TYPE_TOOLSET_DETAIL: GTM_PAGE_TYPE_TOOLSET_DETAIL,
            GTM_PAGE_TYPE_ORGANIZATION: GTM_PAGE_TYPE_ORGANIZATION,
            GTM_PAGE_TYPE_SYSTEM_PAGE: GTM_PAGE_TYPE_SYSTEM_PAGE,
            GTM_ALL_COUNTRIES: GTM_ALL_COUNTRIES,
            GTM_NOT_APPLICABLE: GTM_NOT_APPLICABLE,
            GTM_GLOBAL_NEWS: GTM_GLOBAL_NEWS,
            GTM_LOCAL_NEWS: GTM_LOCAL_NEWS,
            GTM_HOME_PAGE: GTM_HOME_PAGE,
            GTM_CE_SEARCH: GTM_CE_SEARCH,
            GTM_SEARCH_CATEGORY_TOOLSET: GTM_SEARCH_CATEGORY_TOOLSET,
            GTM_SEARCH_CATEGORY_NEWS: GTM_SEARCH_CATEGORY_NEWS,
            GTM_SEARCH_CATEGORY_GLOBAL: GTM_SEARCH_CATEGORY_GLOBAL,
            GTM_SEARCH_CATEGORY_PEOPLE: GTM_SEARCH_CATEGORY_PEOPLE,
            GTM_SEARCH_SCOPE_ONSITE: GTM_SEARCH_SCOPE_ONSITE,
            GTM_SEARCH_SCOPE_OFFSITE: GTM_SEARCH_SCOPE_OFFSITE,
            GTM_SEARCH_EVENT_CLICK: GTM_SEARCH_EVENT_CLICK,
            GTM_SEARCH_EVENT__KEYPRESS: GTM_SEARCH_EVENT__KEYPRESS,
            GTM_SEARCH_EVENT_SUGGESTIONS: GTM_SEARCH_EVENT_SUGGESTIONS,
            GTM_BEST_BETS: GTM_BEST_BETS,
            GTM_SEARCH_CATEGORY_NBS_SERVICES: GTM_SEARCH_CATEGORY_NBS_SERVICES
        };

    })();

    NP.UTILS = {
        loadedScripts: [],
        qs: null,

        /*
         * Logs the exception message in browser console
         * @param {string} message - Exception Message
         */
        ClientLog: function(message) {
            if (typeof console === "undefined" || typeof message === "undefined") {
                return;
            }

            console.log(message);
        },

        /* Loads scripts and returns a promise object.
         *  @scriptName {string} Script to be loaded.
         */
        LoadScript: function(scriptName) {

            var deferred = $.Deferred(),
                scriptbase = _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/";

            scriptName = scriptName.toLowerCase();

            if ($("script[src*='" + scriptName + "']").length === 0 && $.inArray(scriptName, NP.UTILS.loadedScripts) === -1) {
                $.getScript(scriptbase + scriptName, function() {
                    NP.UTILS.loadedScripts.push(scriptName);
                    return deferred.resolve();
                });
            } else {
                return deferred.resolve();
            }

            return deferred.promise();
        },

        /* Retrieves query string value by key from the current URL.
         *  @key {string} Query string key to be retrieved.
         */
        QS: function(key) {
            var match, pl, search, decode, query;

            if (!this.qs) {
                pl = /\+/g;
                search = /([^&=]+)=?([^&]*)/g;
                decode = function(enc) { return decodeURIComponent(enc.replace(pl, " ")); };
                query = window.location.search.substring(1);

                this.qs = {};

                // Intentional shortcut assignment and condition matching.
                while (match = search.exec(query)) {
                    this.qs[decode(match[1])] = decode(match[2]);
                }
            }

            return this.qs[key] ? this.qs[key] : "";
        },

        /* Contains methods for encoding and decoding strings to/from Base64. */
        Base64: {
            // Private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // Public method for encoding
            encode: function(input) {
                var output = "",
                    chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

                input = this._utf8_encode(input);

                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                }

                return output;
            },

            // Public method for decoding
            decode: function(input) {
                var output = "",
                    chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }

                output = this._utf8_decode(output);

                return output;
            },

            // Private method for UTF-8 encoding
            _utf8_encode: function(string) {
                var utftext = "",
                    n, c;
                string = string.replace(/\r\n/g, "\n");

                for (n = 0; n < string.length; n++) {
                    c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode: function(utftext) {
                var string = "",
                    i = 0,
                    c1,
                    c2,
                    c;

                c = c1 = c2 = 0;

                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }

                return string;
            }
        },


        /*Set cookie*/
        SetCookie: function(cname, cvalue, exdays) {
            var expires,
                d = new Date();

            if (exdays) {
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                expires = "expires=" + d.toUTCString();
            }

            if (expires) {
                document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
            } else {
                document.cookie = cname + "=" + cvalue + "; path=/";
            }
        },

        /*Get cookie*/
        GetCookie: function(cname) {
            var i, c,
                name = cname + "=",
                ca = document.cookie.split(';');

            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        },

        GetLayoutsFolderUrl: function() { return _spPageContextInfo.siteServerRelativeUrl + "/_layouts/15/"; },


        /*
         * Asynchronously loads OOTB SharePoint on-demand script as required.
         * @param {number} - type - Type of script to load - CSOM, Taxonomy or User Profile.
         * @returns {object} - Promise object.
         */
        LoadSODScript: function(type) {
            var deferred = $.Deferred();

            switch (type) {
                case NP.ENUM.ScriptType.CSOM:
                    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.Taxonomy:
                    SP.SOD.registerSod("sp.taxonomy.js", NP.UTILS.GetLayoutsFolderUrl() + "sp.taxonomy.js");
                    SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy.TaxonomySession", function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.UserProfile:
                    SP.SOD.executeFunc("userprofile", "SP.UserProfiles.PeopleManager", function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.UserProfileCSOM:
                    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function() { SP.SOD.executeFunc("userprofile", "SP.UserProfiles.js", function() { deferred.resolve(); }); });
                    break;
                case NP.ENUM.ScriptType.Search:
                    SP.SOD.executeFunc("", "", function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.WebTaggingUI:
                    SP.SOD.executeFunc("scriptforwebtaggingui.js", "Microsoft.SharePoint.Taxonomy", function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.RTE:
                    SP.SOD.executeFunc("sp.ui.rte.publishing.js", null, function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.Dialog:
                    SP.SOD.executeFunc("sp.ui.dialog.js", "SP.ClientContext", function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.Publishing:
                    SP.SOD.registerSod("SP.ClientContext", SP.Utilities.Utility.getLayoutsPageUrl("sp.js"));
                    SP.SOD.registerSod("SP.Publishing.PublishingWeb", SP.Utilities.Utility.getLayoutsPageUrl("sp.publishing.js"));
                    SP.SOD.loadMultiple(["SP.ClientContext", "SP.Publishing.PublishingWeb"], function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.AjaxControlToolKit:
                    SP.SOD.registerSod("ajaxtoolkit.js", null, function() { deferred.resolve(); });
                    break;
                case NP.ENUM.ScriptType.Ribbon:
                    SP.SOD.executeOrDelayUntilScriptLoaded(function() { deferred.resolve(); }, "sp.ribbon.js");
                    break;
            }

            return deferred.promise();
        },

        /*
         * Simulates .NET framework's string.Format method to format a string with one or more replaceable tokens.
         * @param {object} arguments - A default array of arguments with the first argument being the tokenized string.
         * @returns {string} - Formatted value.
         */
        FormatString: function() {
            var paramStr = arguments[0] || "",
                re = null,
                counter,
                argLength = arguments.length - 1;

            for (counter = 0; counter < argLength; counter++) {
                re = new RegExp("\\{" + counter + "\\}", "igm");
                paramStr = paramStr.replace(re, arguments[counter + 1]);
            }

            return paramStr;
        },

        /* functions added for 6.0 functionalyti - End */

        /*Set Navigation Type*/
        Enum: {
            NavigationType: {
                PharmaNavigation: "PharmaNavigation",
                DivisionNavigation: "DivisionNavigation",
                LocalNavigation: "LocalNavigation",
                GlobalNavigation: "GlobalNavigation"
            }
        }
    };
})();

/**
 * This namespace contains Term sore functions used across application.
 */
(function() {
    NP.Namespace.Register("NP.CLIENT");
    NP.Namespace.Register("NP.CLIENT.MMS");
    NP.CLIENT.MMS = (function() {
        function getTermSet(id) {
            var deferred = $.Deferred();
            try {
                var ctx = SP.ClientContext.get_current();
                var taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
                var termStore = taxonomySession.getDefaultSiteCollectionTermStore();
                var termSet = termStore.getTermSet(id);
                var terms = termSet.getAllTerms();

                ctx.load(terms);
                ctx.executeQueryAsync(function() {
                    deferred.resolve(terms);
                }, function(sender, args) {
                    deferred.reject(args);
                });
            } catch (e) {
                Utils.clientLog(e);
            }
            return deferred.promise();
        }

        function getTermSetAsTree(id, termSetName) {
            var deferred = $.Deferred();
            getTermSet(id).then(function(terms) {
                var termsEnumerator = terms.getEnumerator(),
                    tree = {
                        name: termSetName,
                        guid: id,
                        term: terms,
                        children: []
                    };

                // Loop through each term
                while (termsEnumerator.moveNext()) {
                    var currentTerm = termsEnumerator.get_current();
                    var currentTermPath = currentTerm.get_pathOfTerm().split(';');
                    var children = tree.children;

                    // Loop through each part of the path
                    for (var i = 0; i < currentTermPath.length; i++) {
                        var foundNode = false;

                        for (var j = 0; j < children.length; j++) {
                            if (children[j].name === currentTermPath[i]) {
                                foundNode = true;
                                break;
                            }
                        }

                        // Select the node, otherwise create a new one
                        var term = foundNode ? children[j] : { name: currentTermPath[i], children: [] };

                        // If we're a child element, add the term properties
                        if (i === currentTermPath.length - 1) {
                            term.term = currentTerm;
                            term.title = currentTerm.get_name();
                            term.guid = currentTerm.get_id().toString();
                        }
                        // If we're a child element, add the term properties
                        if (i === currentTermPath.length - 1) {
                            term.term = currentTerm;
                            term.title = currentTerm.get_name();
                            term.guid = currentTerm.get_id().toString();
                        }

                        // If the node did exist, let's look there next iteration
                        if (foundNode) {
                            children = term.children;
                        }
                        // If the segment of path does not exist, create it
                        else {
                            children.push(term);

                            // Reset the children pointer to add there next iteration
                            if (i !== currentTermPath.length - 1) {
                                children = term.children;
                            }
                        }
                    }
                }

                tree = sortTermsFromTree(tree);
                deferred.resolve(tree);
            });
            return deferred.promise();
        }

        function sortTermsFromTree(tree) {
            // Check to see if the get_customSortOrder function is defined. If the term is actually a term collection,
            // there is nothing to sort.
            if (tree.children.length && tree.term.get_customSortOrder) {
                var sortOrder = null;

                if (tree.term.get_customSortOrder()) {
                    sortOrder = tree.term.get_customSortOrder();
                }

                // If not null, the custom sort order is a string of GUIDs, delimited by a :
                if (sortOrder) {
                    sortOrder = sortOrder.split(':');

                    tree.children.sort(function(a, b) {
                        var indexA = sortOrder.indexOf(a.guid);
                        var indexB = sortOrder.indexOf(b.guid);

                        if (indexA > indexB) {
                            return 1;
                        } else if (indexA < indexB) {
                            return -1;
                        }

                        return 0;
                    });
                }
                // If null, terms are just sorted alphabetically
                else {
                    tree.children.sort(function(a, b) {
                        if (a.title > b.title) {
                            return 1;
                        } else if (a.title < b.title) {
                            return -1;
                        }

                        return 0;
                    });
                }
            }

            for (var i = 0; i < tree.children.length; i++) {
                tree.children[i] = sortTermsFromTree(tree.children[i]);
            }
            return tree;
        }
        return {
            GetTermSetAsTree: getTermSetAsTree,
        };
    })();
})();

/************** METHOD RELATED TO CACHING ***************/
(function() {
    NP.Namespace.Register("NP.CLIENT.CACHE");
    NP.CLIENT.CACHE = function() {

        /*
         * Setting Cache for applictaion settings
         *
         * @param {string} cacheKey - cache Key
         * @param {number} cacheValue - cache Value
         * @param {object} expirationMin - expiration Mininute
         */
        function setCache(cacheKey, cacheValue, expirationMin) {
            var expirationMS,
                record;

            if (!cacheKey || !cacheValue || !expirationMin) {
                return null;
            }

            try {
                expirationMS = parseInt(expirationMin) * 60 * 1000;
                record = {
                    value: JSON.stringify(cacheValue),
                    timestamp: new Date().getTime() + expirationMS
                };

                localStorage.setItem(getStorageKey(cacheKey), JSON.stringify(record));
            } catch (e) {
                NP.UTILS.ClientLog(e.message);
            }
        }

        /*
         * get cached Appsettings from local storage
         *
         *  @param {Array} options - options is an array of cacheKey,ListTitle and context.
         */
        function getCache(options) {
            var settings, services, record,
                deferred = $.Deferred();
            settings = { cacheKey: "App_Settings", ListTitle: "Application Configuration" }; //, context: SP.ClientContext.get_current() };
            $.extend(settings, options);
            services = new NP.SERVICES();

            try {

                if (options.cacheKey == "App_Settings") {

                    settings = { cacheKey: "App_Settings", ListTitle: "Application Configuration" }; //, context: SP.ClientContext.get_current() };
                    $.extend(settings, options);
                    services = new NP.SERVICES();
                    record = JSON.parse(localStorage.getItem(getStorageKey(settings.cacheKey)));

                    if (!record) {
                        services.GetListItem(settings.ListTitle).then(function() {
                            record = JSON.parse(localStorage.getItem(getStorageKey(settings.cacheKey)));
                            deferred.resolve(JSON.parse(record.value));
                        }, function(sender, args) {
                            NP.UTILS.ClientLog(args.get_message());
                        });

                    } else {

                        if (new Date().getTime() < record.timestamp) {
                            deferred.resolve(JSON.parse(record.value));
                        } else {

                            localStorage.removeItem(getStorageKey(settings.cacheKey));
                            services.GetListItem(settings.ListTitle).then(function() {
                                record = JSON.parse(localStorage.getItem(getStorageKey(settings.cacheKey)));
                                deferred.resolve(JSON.parse(record.value));
                            }, function(sender, args) {
                                NP.UTILS.ClientLog(args.get_message());
                            });

                        }
                    }
                } else if (options.cacheKey == "Terms_ArrayList") {
                    record = JSON.parse(localStorage.getItem(getStorageKey(options.cacheKey)));

                    if (!record) {
                        deferred.resolve();

                    } else {

                        if (new Date().getTime() < record.timestamp) {
                            deferred.resolve(JSON.parse(record.value));
                        } else {

                            localStorage.removeItem(getStorageKey(options.cacheKey));
                            deferred.resolve();
                        }
                    }
                } else {
                    record = JSON.parse(localStorage.getItem(getStorageKey(options.cacheKey)));

                    if (record) {

                        if (new Date().getTime() < record.timestamp) {
                            deferred.resolve(JSON.parse(record.value));
                        } else {

                            localStorage.removeItem(getStorageKey(options.cacheKey));
                            deferred.resolve();
                        }
                    } else {
                        deferred.resolve();

                    }

                }
                return deferred.promise();
            } catch (e) {

                NP.UTILS.ClientLog(e.message);
            }
        }

        function getStorageKey(key) {
            return _spPageContextInfo.siteAbsoluteUrl.replace(/\W/g, '_') + "_" + key;
        }

        return {
            SetCache: setCache,
            GetCache: getCache
        };
    };
})();


$(function() {
    NP.UTILS.LoadSODScript(NP.ENUM.ScriptType.CSOM).then(function() {
        NP.UTILS.LoadSODScript(NP.ENUM.ScriptType.Taxonomy).then(function() {
            NP.CLIENT.MMS.GetTermSetAsTree("a8cf1c14-343c-4750-bd3a-a478dbc58ba8", "Global Naivation").then(function(termsetTree) {
                console.log(termsetTree);
            });
        });
    });
});