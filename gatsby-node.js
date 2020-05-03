const Promise = require('bluebird')
const path = require('path')
var s3 = require('s3')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    graphql(
      `
        {
          allContentfulBlogPost {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `
    )
      .then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges

        posts.forEach((post, index) => {
          const a = createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
        resolve()
      })
      .catch((e) => {
        console.log(e)
        reject(e)
      })
  })
}

exports.onPostBuild = function (pages) {
  // perform actions on pages here
  return new Promise((resolve, reject) => {
    if (
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_S3_BUCKET
    ) {
      // Init S3 client
      var client = s3.createClient({
        s3RetryCount: 6,
        s3RetryDelay: 30,
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          signatureVersion: 'v4',
          region: process.env.AWS_REGION,
        },
      })

      // Sync dir
      var params = {
        localDir: 'public',
        deleteRemoved: true,
        s3Params: {
          Bucket: process.env.AWS_S3_BUCKET,
          Prefix: process.env.AWS_S3_BUCKET_PREFIX,
        },
      }
      var uploader = client.uploadDir(params)
      uploader.on('error', function (err) {
        console.error('unable to sync:', err.stack)
        reject(err)
      })
      uploader.on('progress', function (p) {
        const iterator = parseInt(
          (parseInt(uploader.progressMd5Amount) /
            parseInt(uploader.progressMd5Total)) *
            100
        )
        const dots = '='.repeat(iterator)
        const left = 100 - (iterator > 0 ? iterator : 0)
        const empty = ' '.repeat(left)
        process.stdout.write(
          `\rUploading constent to S3 [${dots}${empty}] ${iterator}%`
        )
      })
      uploader.on('end', function () {
        console.log(`Content uploaded to S3 [${'='.repeat(100)}] 100%`)
        resolve()
      })
    } else {
      resolve()
    }
  })
}
