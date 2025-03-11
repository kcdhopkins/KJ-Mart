type callSignInTypes = {
    email : string,
    password: string
}

type callCreateAccountTypes = {
    email : string,
    password: string,
    firstName: string,
    lastName: string
}

const baseUrl = 'http://localhost:4000'

export const callSignIn = async ({email, password} : callSignInTypes) => {
    try {
        const response = await fetch(`${baseUrl}/api/account/sign-in`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
          })
        return {status: response.status, userInfo:{name:'fuzzy bear'}}
    } catch (err) {
        throw new Error('calling sign in failed')
    }
}

export const callCreateAccount = async ({firstName, lastName, email, password}:callCreateAccountTypes) => {
    try{
        const response = await fetch(`${baseUrl}/api/account/create-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
    
        return response.json()
    } catch (err){
        throw new Error('callCreateAccount has throw an error')
    }
}