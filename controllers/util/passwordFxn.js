const bcrypt = require('bcrypt');

export const genHash = async (password) => {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        return hashPassword;
} 

