export default {
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference', // going to connect to different documents
  to: [{type:'user'}] // one user could post multiple comments
}
