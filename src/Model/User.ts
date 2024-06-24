// @ts-ignore
import {BaseURL} from "./APIURL.ts";

export default class User {
    id:number
    name: string
    mdp: string

    constructor(id: number, name: string, mdp: string) {
        this.id = id;
        this.name = name;
        this.mdp = mdp;
    }
    static async inscription(name: string, mdp: string) {
        var data=new User(-100,name,mdp)
        const response = await fetch(BaseURL() + "utilisateur/inscription", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(data)
        })
        return response.ok;
    }

    static async login(name: string, mdp: string) {
        var data=new User(-100,name,mdp)
        const response = await fetch(BaseURL() + "utilisateur/login", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return new User(responseData.id,responseData.name,responseData.mdp);
    }

}