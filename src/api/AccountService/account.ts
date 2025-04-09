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
            credentials: 'include',
            body: JSON.stringify({email, password})
          })
        return response.json()
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
            credentials: 'include',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
    
        return response.json()
    } catch (err){
        throw new Error('callCreateAccount has thrown an error')
    }
}

export const callAutoAuth = async ()=>{
    try{
        const response = await fetch('http://localhost:4000/api/account/autoAuth', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include'
        })

        const result = await response.json()
        delete result.status
        return result
    } catch(err){
        throw new Error('Error calling autoAuth')
    }
}

export const callLogoutUser = async ()=>{
    try{
        const response = await fetch('http://localhost:4000/api/account/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include'
        })

        const result = await response.json()
        return result
    } catch(err){
        throw new Error('Error calling logout')
    }
}

export const editAccountInfo = async (phone : string, city: string, state: string, zip:string, street:string) => {
    try{
        const response = await fetch(`${baseUrl}/api/account/edit-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                phone,
                city,
                state,
                zip,
                street
            })
        })
    
        return response.json()
    } catch (err){
        throw new Error('editAccountInfo has thrown an error')
    }
}

export const getSearchInventory = async (searchTerm:string) => {
    try{
        const response = await fetch(`${baseUrl}/api/inventory/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                searchTerm
            })
        })
    
        return response.json()
    } catch (err){
        throw new Error('getSearchInventory has thrown an error')
    }
}

// export const searchItem = async (searchTerm:string) => {
//     try{
//         const response = await fetch(`${baseUrl}/api/shop/create-account`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 firstName,
//                 lastName,
//                 email,
//                 password
//             })
//         })
    
//         return response.json()
//     } catch (err){
//         throw new Error('callCreateAccount has thrown an error')
//     }
// }

