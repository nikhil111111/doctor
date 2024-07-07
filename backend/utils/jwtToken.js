export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? 'adminToken' : 'patientToken';  //naam isiliye de rhe h beacuse we have 2 frontend 
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    })
        .json({
            success: true,
            message,
            user,
            token,
        });
};