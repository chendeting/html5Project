package com.cj.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface KaijiangBkService {

    Map<String,Object> queryNow(String kjstatue);

    void updateStatue(String kjstatue,Integer qs);
}
