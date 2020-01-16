package fullstack.asshare.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DBFile")
public class DBFile {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "timestamp", nullable = false)
    private String timestamp;

    private String fileType;

    @Lob
    private byte[] data;

    protected DBFile() {}

    public DBFile(
            Long userId,
            String fileType,
            byte[] data
    ) {
        this.userId = userId;
        this.fileType = fileType;
        this.data = data;
        this.timestamp = LocalDateTime.now().toString();
    }

    public String getId() { return id; }

    public Long getUserId() {
        return userId;
    }

    public String getFileType() { return fileType; }

    public String getTimestamp() {
        return timestamp;
    }

    public byte[] getData() {
        return data;
    }
}