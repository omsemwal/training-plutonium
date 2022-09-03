
const { default: axios } = require("axios")


let getMemes = async function (req, res) {
    try {
        let options = {
            method: 'get',
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options);
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let creatememes=async function (req,res){
    try{
        let template_id=req.query.template_id
        let text0 =req.query.text0
       let text1 =req.query.text1
       let username =req.query.username
       let password = req.query.password

       let options={
        method:"post",
        url:`https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
       }
       let meme=await axios(options)
       res.status(200).send({msg:meme.data})
    }catch(error){
        console.log(error)
        res.status(400).send({msg:error.message})
    }
}
module.exports.getMemes = getMemes
module.exports.creatememes=creatememes