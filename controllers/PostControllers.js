import PostModel from '../models/Post.js'

export const getAll = async (req,res) => {
    try{
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'get post error '
        })
    }
}

export const getOne = async (req,res) => {
    try{
        const postId = req.params.id
       
        PostModel.findOneAndUpdate({
            _id: postId,
        },{
            $inc:{
                viewsCount: 1
            }
        },{
            returnDocument: 'after'
        },(err,doc) => {
            if(err){
                console.log(err)
                 return res.status(500).json({
                    message: 'cant return post '
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'post does not axist'
                })
            }
            res.json(doc)
        }
        )
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'get post error '
        })
    }
}

export const create = async (req,res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post  = await doc.save()

        res.json(post)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'create post error'
        })
    }
}

export const remove = async (req,res) => {
    try{
        const postId = req.params.id
       
        PostModel.findByIdAndDelete(
            {
            _id: postId,
        },
        (err,doc) => {
            if(err){
                console.log(err)
                 return res.status(500).json({
                    message: 'cant delete post '
                })
            }

            if(!doc){
                return res.status(404).json({
                    message: 'post does not axist'
                })
            }

            res.json({
                success: true
            })
        }
    )
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'del post error '
        })
    }
}

export const update = async (req,res) => {
    try{
        const postId = req.params.id
       await  PostModel.findByIdAndUpdate(
           {
            _id: postId,
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        }
    )
    res.json({
        success: true
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'update post error '
        })
    }
}