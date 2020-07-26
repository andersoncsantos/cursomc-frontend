import { CredenciaisDTO } from "../models/credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    authenticate(credenciais: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, { observe: "response", responseType: "text" });
    }

    successfulLogin(authorizationValue: string) {
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}
