package fullstack.asshare.repository;


import fullstack.asshare.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDAO extends CrudRepository<User, String> {
    List<User> findByUsernameEquals(String username);

    Boolean existsByUsernameEquals(String username);
}
