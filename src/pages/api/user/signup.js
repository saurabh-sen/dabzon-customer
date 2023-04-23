import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
    if(req.method === 'POST'){
        try {
            const userData = await req.body;
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("user");
            //check if user already exist by email
            const response1 = await collection.findOne({"email":userData.email},{"active":1,"_id":0});
            if(response1 && response1.active === true){
                if(response1.googleAuth === false && userData.googleAuth === true){
                    await collection.updateOne({"email":userData.email},{$set : {googleAuth:true}});
                }
                else if(response1.customAuth === false && userData.customAuth === true){
                    await collection.updateOne({"email":userData.email},{$set : {customAuth:true,password:userData.password}});
                    return res.status(200).json({email:userData.email, msg: "user is created"});
                }
                return res.status(200).json({email:userData.email, msg: "user is already present"});
            }
            else{
                // if not present the create
                delete userData.confirmPassword;
                userData['active']=true;
                const response2 = await collection.insertOne({...userData, 'image': null, 'number':null, gender:null});
                if(response2.acknowledged){
                    return res.status(200).json({email:userData.email, msg: "user is created"});  
                }
                else{
                    return res.status(501).json({ msg: "can't create user" });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg:error })
        }
    }
}