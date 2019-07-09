export default function validate(values) {

    let errors = {};
    
    if(!values.username){
      errors.username = 'Required firstname';
    }
  
    if (!values.email) {
  
      errors.email = 'Required Email';
  
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  
      errors.email = 'Invalid Email';
  
    }
  
    if(!values.password) {
      errors.password = 'Invalid password';
    }
  
  
    return errors;
  };