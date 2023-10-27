import UserSchema from "../models/user.js";

const profileInfo = async (req, res) => {
<<<<<<< HEAD

=======
>>>>>>> 8ca597076e89c4bf61b692bbf3fb6f0566d73299
    // get email from the req
    const { email } = req.body;

    try {
<<<<<<< HEAD

=======
>>>>>>> 8ca597076e89c4bf61b692bbf3fb6f0566d73299
        const existingUser = await UserSchema.findOne({ _id: email });
        // get all the information of the user
        const response = {
            Email: existingUser.Email,
            Username: existingUser.Username,
            ProfileImage: existingUser.PhoneNo,
            Password: existingUser.Password,
            Year: existingUser.Year,
            Branch: existingUser.Branch,
            Plan: existingUser.Plan,
            Events: existingUser.Events,
            message: "Success",
        };

        return res.send(response);
    }
    catch (error) {
        const response = {
            message: "Failure",
        };
        return res.send(response);
    }
}

export { profileInfo };