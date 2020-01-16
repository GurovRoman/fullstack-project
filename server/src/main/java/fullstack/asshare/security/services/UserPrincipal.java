package fullstack.asshare.security.services;


import com.fasterxml.jackson.annotation.JsonIgnore;
import fullstack.asshare.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserPrincipal implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

    private String username;

    @JsonIgnore
    private String password;

    private HashSet<GrantedAuthority> authorities = new HashSet<>();

    public UserPrincipal(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    }

    public static UserPrincipal build(User user) {

        return new UserPrincipal(
                user.getId(),
                user.getUsername(),
                user.getPassword()
        );
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        UserPrincipal user = (UserPrincipal) o;
        return Objects.equals(id, user.id);
    }
}