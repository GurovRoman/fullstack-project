package fullstack.asshare.repository;


import fullstack.asshare.model.DBFile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DBFileDAO extends CrudRepository<DBFile, String> {

    List<DBFile> findByUserIdEquals(Long userId);

    @Query(nativeQuery = true, value = "SELECT id FROM DBFile ORDER BY RAND() limit 1")
    String getRandomReward(@Param("userId") Long uid);
}