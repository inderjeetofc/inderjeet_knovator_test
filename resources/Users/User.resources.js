const UserSchema = require("./User.schema");

module.exports = class UserResources {
    async createOne(data) {
        if (!data || data === '')
            throw new Error;
        let results
        try {
            results = await UserSchema(data)
        } catch (error) {
            console.log("Eroor@createOne", error)
        }
        if (!results)
            return false
        results.save()
        return results

    }
}