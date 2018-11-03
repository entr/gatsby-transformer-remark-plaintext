## Description

This is **NOT** a replacement of the official [`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) plugin. It just creates a new graphql field `plainText` on every MarkdownRemark node using the [`strip-markdown`](https://github.com/remarkjs/strip-markdown) remark plugin.

`plainText` will contain simple paragraphs without formatting. Alt text will be used to replace images.

### Dependencies

Gatsby 2.x

[`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)

## How to install

`$ npm install --save gatsby-transformer-remark-plaintext`

## When do I use this plugin?

You might find it useful for creating JSON-LD for Structured Data or other meta based on your markdown sources. 

## Examples of usage

In `gatsby-config.js` after `gatsby-transformer-remark`:

```js
plugins: [
    `gatsby-transformer-remark`,
    `gatsby-transformer-remark-plaintext`,
]
```

Restart `$ gatsby develop`.

Now you can add the `plainText` field to your queries.

## How to query for data

```graphql
{
  allMarkdownRemark(
    limit: 10
  ) {
    edges {
      node {
        frontmatter {
          title
        }
        html
        plainText
      }
    }
  }
}
```
