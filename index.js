const InitPGPToolPage = () => {
};

const ShineParent = (element) => {
    element = element.parentElement;
    //repeat animation
    element.classList.remove('fx-shine1');
    element.classList.add('fx-shine1');
    //https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element
    element.style.animation = 'none';
    element.offsetHeight; /* trigger reflow */
    element.style.animation = null; 
};

const ClickGenerate = async () => {
    //get result
    const result = await GenerateRSAPGP(Password.value, 2048 * 2);
    //apply
    PublicKey.value = result.publicKey;
    PrivateKey.value = result.privateKey; 
    //shine
    ShineParent(Password);
    ShineParent(PublicKey);
    ShineParent(PrivateKey);
};

const ClickEncrypt = async () => {

};

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