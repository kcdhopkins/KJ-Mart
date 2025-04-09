export const isValidEmail = (email: string): boolean => {
    if (!email) {
        return false;
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(email);
}

export const isValidPassword = (password: string | undefined): boolean => {
    if (!password) {
        return false;
    }

    if (password.length <= 5) {
        return false
    } 
    
    return true 
}

export const isValidPhone = (phone: string ): boolean => {
    if (!phone) {
        return false;
    }

    const isValidNumber = Number(phone)
    if (isNaN(isValidNumber)) {
        return false
    }

    if(phone.length !== 10) {
        return false
    }
    return true
}

export const isValidStreet = (street: string): boolean => {
    if (!street) {
        return false;
    }

    const streetFormat = /^[0-9]+[ ]([a-zA-Z0-9]+[ ]?)+$/
    return streetFormat.test(street)
}