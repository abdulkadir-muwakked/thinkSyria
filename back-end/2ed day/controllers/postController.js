const data = [
    {id: 1, content: "this the 1st post for us", deletedAt: null},
    {id: 2, content: "this the 2ed post for us", deletedAt: null},
]

const getALlPosts = (req, res) => {
    const allposts = data.filter(post => post.deletedAt == null)
    
    return res.send({
        success: true,
        msg: "you get all posts",
        data: allposts.map(post => {
            return {id: post.id, content: post.content}
        })
    })
}

const getSinglePost  = (req, res) => {
     const postId = req.params.id
     const post = data.find(post => post.id == postId)
     if(!post)  
        return res.send({ success: false, msg: "not found !", data : [] })
     if(post.deletedAt != null)
        return res.send({ success: false, msg: "not found !", data : [] })
     return res.send({
        success: true,
        msg: "you get single post",
        data : post
    })
}

const createPost = (req, res) => {
    const {content} = req.body
    if(content.length > 10) {
        data.push({
            id: data.length + 1,
            content,
            deletedAt: null
        })
        return res.send({
            success: true,
            msg: "post is created !",
            data : data[data.length - 1]
        })
    }
    return res.send({
        success: false,
        msg: "conten is less than 10 chars",
        data : []
    })
}

const deletePost = (req, res) => {
    const { id } = req.params
    const index = data.findIndex(item => item.id == id)
    if(index != -1) {
        if(data[index].deletedAt) {
            return res.send({
                success: false,
                msg: "not found",
                data : []
            })
        }else {
            data[index].deletedAt = Date.now() 
            return res.send({
                success: true,
                msg: "post has deleted",
                data : []
            })
        }
    }
    return res.send({
        success: false,
        msg: "not found",
        data : []
    })
}

const updatePost = () => {

}


module.exports = {
    getALlPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}