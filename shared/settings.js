Settings = {
	MessageShowCount: 10,
	Security: {
		encryptPasswords: true,
		XSSSecure: true,
		CSRFSecure: true,
		SQLInjectSecure: true, //Passwords are only insecure if encryptPassword is also disabled
		ParameterTampSecure: true 
	}
}