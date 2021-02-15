'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropModal = function (_Component) {
  _inherits(PropModal, _Component);

  function PropModal(props) {
    _classCallCheck(this, PropModal);

    var _this = _possibleConstructorReturn(this, (PropModal.__proto__ || Object.getPrototypeOf(PropModal)).call(this, props));

    _this.state = {
      show: _this.props.show
    };

    _this.modalWrapper = {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1500'
    };

    _this.modalContent = {
      position: 'fixed',
      padding: '2rem 1rem',
      background: 'white'
    };

    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  _createClass(PropModal, [{
    key: 'handleClose',
    value: function handleClose() {
      this.setState({ show: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return this.state.show ? _react2.default.createElement(
        'div',
        {
          className: 'modalWrapper',
          style: this.modalWrapper,
          onClick: function onClick() {
            return _this2.handleClose();
          }
        },
        _react2.default.createElement(
          'div',
          {
            className: 'modalContent',
            style: this.modalContent,
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          },
          this.props.children
        )
      ) : null;
    }
  }]);

  return PropModal;
}(_react.Component);

exports.default = PropModal;