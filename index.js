const InitPGPToolPage = () => {
};

const CopyText = (txt) => {
    navigator.clipboard.writeText(txt);
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
    //get result
    const result = await EncryptMessage(PublicKey.value, Message.value);
    //apply
    console.log(result);
    Output.value = result;
    //shine
    ShineParent(PublicKey);
    ShineParent(Message);
    ShineParent(Output);
};

const ClickDecrypt = async () => {
    //get result
    const result = await DecryptMessage(Password.value, PrivateKey.value, Message.value);
    //apply
    console.log(result);
    Output.value = result.data;
    //shine
    ShineParent(PrivateKey);
    ShineParent(Password);
    ShineParent(Message);
    ShineParent(Output);
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

const EncryptMessage = async (publicKeyArmored, messageArmored) => {
    return await openpgp.encrypt({
        message: await openpgp.createMessage({ text: messageArmored })
        ,encryptionKeys: await openpgp.readKey({ armoredKey: publicKeyArmored })
    });
};

const DecryptMessage = async (password, privateKeyArmored , messageArmored) => {

    const privateKey  = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        password
    });

    const message = await openpgp.readMessage({
        armoredMessage: messageArmored
    });

    return await openpgp.decrypt({
        message
        ,decryptionKeys: privateKey
    });
};