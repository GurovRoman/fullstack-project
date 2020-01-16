package fullstack.asshare.controller;


import fullstack.asshare.model.DBFile;
import fullstack.asshare.model.Reward;
import fullstack.asshare.repository.DBFileDAO;
import fullstack.asshare.model.User;
import fullstack.asshare.repository.RewardDAO;
import fullstack.asshare.repository.UserDAO;
import fullstack.asshare.security.jwt.JwtProvider;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private DBFileDAO dbFileDAO;

    @Autowired
    private RewardDAO rewardDAO;

    @Autowired
    private JwtProvider tokenProvider;


    @PostMapping(value = "/upload")
    public String handleFormUpload(@RequestParam("file") MultipartFile file,
                                   @RequestHeader(value = "Authorization") String auth) throws IOException {
        JSONObject response = new JSONObject();
        if (!file.isEmpty()) {
            String username = tokenProvider.getUserNameFromJwtToken(auth.replace("Bearer ", ""));
            User user = userDAO.findByUsernameEquals(username).get(0);

            DBFile img = new DBFile(user.getId(), file.getContentType(), file.getBytes());
            dbFileDAO.save(img);

            String rewardId = dbFileDAO.getRandomReward(user.getId());
            response.put("reward_id", rewardId);

            Reward reward = new Reward(user.getId(), rewardId);
            rewardDAO.save(reward);
        }
        return response.toString();
    }

    @GetMapping(value = "/getRewards")
    public String listRewards(@RequestHeader(value = "Authorization") String auth) {
        String username = tokenProvider.getUserNameFromJwtToken(auth.replace("Bearer ", ""));
        User user = userDAO.findByUsernameEquals(username).get(0);

        List<String> rewards = rewardDAO.getLastNRewards(user.getId(), 25L);

        JSONObject response = new JSONObject();
        response.put("rewards", new JSONArray(rewards));

        return response.toString();
    }

    @GetMapping("/getImage/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        // Load file from database
        DBFile dbFile = dbFileDAO.findById(fileId).orElse(new DBFile(0L, "", null));

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .body(new ByteArrayResource(dbFile.getData()));
    }

}