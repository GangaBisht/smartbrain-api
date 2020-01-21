const handleProfileGet = (req, res, db, bcrypt) => {

	const { id } = req.body;

	
	db('users').where({id: id}) 
			.returning('*')
			.then(user =>{res.json(user[0]);})
			.catch(err => res.status(400).json('invalid credential ') );
}

module.exports = {
	handleProfileGet: handleProfileGet

};