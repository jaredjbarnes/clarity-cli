"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MySystem = function () {
    function MySystem() {
        _classCallCheck(this, MySystem);
    }

    _createClass(MySystem, [{
        key: "activatedAsync",
        value: function activatedAsync(dispatcher) {}
    }, {
        key: "approveEntityRemovalAsync",
        value: function approveEntityRemovalAsync(entity) {}
    }, {
        key: "deactivatedAsync",
        value: function deactivatedAsync() {}
    }, {
        key: "disposedAsync",
        value: function disposedAsync() {}
    }, {
        key: "entityAddedAsync",
        value: function entityAddedAsync(entity) {}
    }, {
        key: "entityRemovedAsync",
        value: function entityRemovedAsync(entity) {}
    }, {
        key: "entityRetrievedAsync",
        value: function entityRetrievedAsync(entity) {}
    }, {
        key: "entityUpdatedAsync",
        value: function entityUpdatedAsync(oldEntity, updatedEntity) {}
    }, {
        key: "logError",
        value: function logError(error) {}
    }, {
        key: "logMessage",
        value: function logMessage(message) {}
    }, {
        key: "logWarning",
        value: function logWarning(warning) {}
    }, {
        key: "initializeAsync",
        value: function initializeAsync(dispatcher) {}
    }, {
        key: "serviceRemovedAsync",
        value: function serviceRemovedAsync(name) {}
    }, {
        key: "validateEntityAsync",
        value: function validateEntityAsync(entity) {}
    }]);

    return MySystem;
}();

exports.default = MySystem;
//# sourceMappingURL=index.js.map