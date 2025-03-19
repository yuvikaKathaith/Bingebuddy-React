export const checkValidDataForSignIn = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email); //true or false
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isEmailValid) return "Please enter a valid Email address.";
    if(!isPasswordValid) return "Please enter a valid password of Minimum 8 characters, at least 1 letter & a number.";
    return null;
} 

export const checkValidDataForSignUp = (email, password, name) => {
    const isEmailValid = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email); //true or false
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    if(!isEmailValid) return "Please enter a valid Email address.";
    if(!isPasswordValid) return "Please enter a valid password of Minimum 8 characters, a capital letter, a special character & a number.";
    if(!isNameValid) return "Name is not valid.";
    return null;
} 
