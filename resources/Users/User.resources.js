const UserSchema = require("./User.schema");

module.exports = class UserResources {
    async createOne(data) {
        console.log("UserResources@createOne")
        if (!data || data === '')
            throw new Error;
        let results
        try {
            results = await UserSchema.create(data)
        } catch (error) {
            console.log("Error@createOne", error)
            return false
        }
        if (!results)
            return false
        return results
    }
    async findById(userId) {
        console.log("UserResources@createOne")
        if (!userId || userId === '')
            throw new Error;
        let results
        try {
            results = await UserSchema.findById(userId).select("-password")
        } catch (error) {
            console.log("Error@createOne", error)
            return false
        }
        if (!results)
            return false
        return results
    }
    async findOneEmail(email) {
        console.log("UserResources@findOneEmail")
        if (!email || email === "")
            throw new Error("email is required")
        let results
        try {
            results = await UserSchema.findOne({ email })
        } catch (error) {
            console.log(error.message)
            return false;
        }
        if (!results)
            return false;
        return results;
    }
    async findAll() {
        console.log("UserResources@findAll")
        let results
        try {
            results = await UserSchema.find()
        } catch (error) {
            console.log(error.message)
            return false;
        }
        if (!results)
            return false;
        return results;
    }
}