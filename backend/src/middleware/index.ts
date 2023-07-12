const admin = require('../config/firebase-config.js');
class Middleware {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
                console.log(decodeValue);
				// return decoded value to the next middleware
				// req.body.uid = decodeValue.uid;
				res.locals.userUuid = decodeValue.uid;
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}
}
module.exports = new Middleware();