package fullstack.asshare.repository;


import fullstack.asshare.model.DBFile;
import fullstack.asshare.model.Reward;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardDAO extends CrudRepository<Reward, Long> {

    List<Reward> findByUserIdEquals(Long userId);

    @Query(nativeQuery = true, value = "SELECT fileid FROM DBFile WHERE userId = :uid ORDER BY timestamp DESC LIMIT :count")
    List<String> getLastNRewards(@Param("uid") Long uid,
                                 @Param("count") Long count);
}