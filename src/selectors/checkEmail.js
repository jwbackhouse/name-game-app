const checkEmail = email => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};
  
export default checkEmail;