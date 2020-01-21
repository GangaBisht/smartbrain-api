const handleSignin = (req, res, db, bcrypt) => {

	const { email, password } = req.body;

	if( !email || !password){
		return res.status(400).json('incorrect form submission');
	}

	const hash = bcrypt.hashSync(password);

	db('login').where(	'email', '=' , email ) 
			.returning('*')
			.then(user =>{res.json(user[0])})
			.catch(err => res.status(400).json('invalid credential ') )
}

module.exports = {
	handleSignin: handleSignin

};