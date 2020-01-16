package fullstack.asshare.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reward")
public class Reward {

    @Id
    @GeneratedValue()
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "fileId", nullable = false)
    private String fileId;

    @Column(name = "timestamp", nullable = false)
    private String timestamp;


    protected Reward() {}

    public Reward(
            Long userId,
            String fileId
    ) {
        this.userId = userId;
        this.fileId = fileId;
        this.timestamp = LocalDateTime.now().toString();
    }

    public Long getId() { return id; }

    public Long getUserId() {
        return userId;
    }

    public String getFileId() { return fileId; }

    public String getTimestamp() {
        return timestamp;
    }

}