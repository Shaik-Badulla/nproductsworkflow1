package com.ensar.config;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EnsarSecrets {

    private String jwtSecretKey;

    private String emailUserName;

    private String emailUserPwd;

    private String quickSightAccessKey;

    private String quickSightSecretKey;

}
