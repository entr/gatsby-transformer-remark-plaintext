const Remark = require(`remark`)
const strip = require(`strip-markdown`)
const { GraphQLString } = require(`gatsby/graphql`)
const Promise = require(`bluebird`)

let pathPrefixCacheStr = ``

const plainTextCacheKey = node =>
  `transformer-remark-markdown-plaintext-${
    node.internal.contentDigest
  }-${pathPrefixCacheStr}`


module.exports = (
  { type, pathPrefix, cache }
) => {
  if (type.name !== `MarkdownRemark`) {
    return {}
  }

  pathPrefixCacheStr = pathPrefix || ``

  return new Promise((resolve, reject) => {

    async function getPlainText(markdownNode) {
      const cacheKey = plainTextCacheKey(markdownNode)
      
      let plainText = await cache.get(cacheKey)

      if (typeof plainText === 'undefined') {
        plainText = ``
        
        if ( markdownNode.rawMarkdownBody ) {
          plainText = await Remark().use(strip).process(markdownNode.rawMarkdownBody)
          cache.set(cacheKey, String(plainText))
        }
      }

      return plainText
    }

    return resolve({
      plainText: {
        type: GraphQLString,
        resolve(markdownNode) {
          return getPlainText(markdownNode)
        },
      }
    })
  })
}
