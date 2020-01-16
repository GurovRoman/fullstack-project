package fullstack.asshare.security.services;


import fullstack.asshare.model.User;
import fullstack.asshare.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserDAO userDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
    	
        List<User> users = userDAO.findByUsernameEquals(username);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("User Not Found with -> username or email : " + username);
        }

        return UserPrincipal.build(users.get(0));
    }
}