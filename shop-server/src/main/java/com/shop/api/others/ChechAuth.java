package com.shop.api.others;
import org.springframework.stereotype.Service;
import com.shop.api.auth.JwtService;
import com.shop.api.users.records.GetUserReponseDto;
import com.shop.api.users.services.UserService;



@Service
public class ChechAuth {
 
    private final JwtService jwtService;
    private final UserService userService;
    public ChechAuth(JwtService jwtService,UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public boolean   checkAuth(String authHeader,String uid) {
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String userFromToken = jwtService.extractUsername(token);
            GetUserReponseDto user = userService.getSpecificUser(uid);
            if(!userFromToken.equals(user.email())) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
