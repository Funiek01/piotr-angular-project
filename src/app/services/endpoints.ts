const baseUrl = 'https://test-marketplace-api.labs.techsphere.io/api/';

export const endpoints = {
    userList: `${baseUrl}user/list`,
    getUserDetails: (id: string) => `${baseUrl}user/get/${id}`,
    editUserDetails: (id: string) => `${baseUrl}user/edit/${id}`,
    registration: `${baseUrl}user/signup`,
    login: `${baseUrl}user/signin`

}

export type EndpointKeys = keyof typeof endpoints;
export type Lambda = (param:any) => string;

// https://test-marketplace-api.labs.techsphere.io/api/user/list