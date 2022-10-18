//const bcrypt = require('bcryptjs');

const db = require('_helpers/db');
const mailer = require('nodemailer');
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const transporter = mailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'martine93@ethereal.email',
        pass: 'UVMBCykRgF9WBtnP1K'
    }
});
async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }
    const user = new db.User(params);
    // hash password
    //user.passwordHash = await bcrypt.hash(params.password, 10);
    // save user
     await user.save();
     sendEmail(user.email);
}
function sendEmail(userEmail){
    //sending the email
    transporter.sendMail({
        from: '"OIC Conference" <kennydudez2@gmail.com>',
        to: userEmail,
        subject: 'Successful Submission of form',
        text: '"Dear Pelumi,<br>Thank you for volunteering to serve at this years OIC.<br> We are delighted and looking forward to having you give yourself <br>to God as He grants you grace. We pray that the Lord keeps you steadfast in Jesus’ name, Amen! <br> With Love,OCPC Volunteer Coordinator, <br>OIC 2022"'
    })
        .then(_ => {console.log("Email sent on " + new Date())})
        .catch(error => {console.log(error)});
}
async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
   // if (params.password) {
    //    params.passwordHash = await bcrypt.hash(params.password, 10);
   // }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
