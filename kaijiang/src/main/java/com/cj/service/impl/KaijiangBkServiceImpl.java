package com.cj.service.impl;

import com.cj.dao.KaijiangBkMapper;
import com.cj.service.KaijiangBkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class KaijiangBkServiceImpl implements KaijiangBkService {
    @Autowired
    private KaijiangBkMapper kaijiangBkMapper;

    @Override
    public Map<String,Object> queryNow(String kjstatue) {
        return kaijiangBkMapper.selectdetail(kjstatue);
    }

    @Override
    public void updateStatue(String kjstatue,Integer qs) {
        kaijiangBkMapper.updateStatue(kjstatue,qs);
    }
}
