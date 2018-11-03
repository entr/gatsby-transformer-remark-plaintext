"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const Remark = require(`remark`);

const strip = require(`strip-markdown`);

const _require = require(`gatsby/graphql`),
      GraphQLString = _require.GraphQLString;

const Promise = require(`bluebird`);

let pathPrefixCacheStr = ``;

const plainTextCacheKey = node => `transformer-remark-markdown-plaintext-${node.internal.contentDigest}-${pathPrefixCacheStr}`;

module.exports = ({
  type,
  pathPrefix,
  cache
}) => {
  if (type.name !== `MarkdownRemark`) {
    return {};
  }

  pathPrefixCacheStr = pathPrefix || ``;
  return new Promise((resolve, reject) => {
    function getPlainText(_x) {
      return _getPlainText.apply(this, arguments);
    }

    function _getPlainText() {
      _getPlainText = (0, _asyncToGenerator2.default)(function* (markdownNode) {
        const cacheKey = plainTextCacheKey(markdownNode);
        let plainText = yield cache.get(cacheKey);

        if (typeof plainText === 'undefined') {
          plainText = ``;

          if (markdownNode.rawMarkdownBody) {
            plainText = yield Remark().use(strip).process(markdownNode.rawMarkdownBody);
            cache.set(cacheKey, String(plainText));
          }
        }

        return plainText;
      });
      return _getPlainText.apply(this, arguments);
    }

    return resolve({
      plainText: {
        type: GraphQLString,

        resolve(markdownNode) {
          return getPlainText(markdownNode);
        }

      }
    });
  });
};