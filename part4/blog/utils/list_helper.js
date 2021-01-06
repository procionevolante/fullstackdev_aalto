const dummy = (blogs) => (
  1
)

const totalLikes = (blogs) => (
  blogs.map(b => b.likes).reduce((acc, cur) => cur + acc)
)

module.exports = {
  dummy,
  totalLikes,
}
