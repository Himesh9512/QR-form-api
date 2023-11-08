const { uniqueNamesGenerator, NumberDictionary } = require("unique-names-generator");
const passwordGenerator = require("generate-password");

exports.generate_branchId = (branchName) => {
	const numberDictionary = NumberDictionary.generate({ min: 1000, max: 9999 });
	const branchId = uniqueNamesGenerator({
		dictionaries: [[branchName], numberDictionary],
		length: 2,
		separator: "",
		style: "lowerCase",
	});

	return branchId;
};

exports.generate_password = () => {
	const password = passwordGenerator.generate({
		length: 8,
		excludeSimilarCharacters: true,
		numbers: true,
	});

	return password;
};
