const GenerateRSAPGP = async (password,rsaBits) => {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa', // Type of the key
        rsaBits: rsaBits, // RSA key size (defaults to 4096 bits)
        userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
        passphrase: password // protects the private key
    })

    return {
        publicKey: publicKey
        ,privateKey: privateKey
    };
};