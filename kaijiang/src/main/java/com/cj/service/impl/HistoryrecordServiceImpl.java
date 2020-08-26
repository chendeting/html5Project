package com.cj.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.baomidou.mybatisplus.plugins.Page;
import com.cj.dao.HistoryrecordMapper;
import com.cj.dao.ReferenceMapper;
import com.cj.service.HistoryrecordService;
import com.cj.utils.PageFactory;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class HistoryrecordServiceImpl implements HistoryrecordService {
    Logger logger = LoggerFactory.getLogger(HistoryrecordServiceImpl.class);

    @Autowired
    private HistoryrecordMapper historyrecordMapper;
    @Autowired
    private ReferenceMapper referenceMapper;

    @Override
    public Page<Map<String,Object>> selectPage(int curPage, int limit, Map map) {
        Page<Map<String,Object>> page = new PageFactory<Map<String,Object>>().setPage(limit, (curPage-1)*limit);
        PageHelper.startPage(curPage, limit);
        List<Map<String,Object>> historyrecords = historyrecordMapper.selectPageByParam(map);
        List list = new ArrayList();
        historyrecords.stream().forEach(historyrecord ->{
            JSONArray kaijaingRes = new JSONArray();
            constractHm((String) historyrecord.get("hm1"),kaijaingRes);
            constractHm((String) historyrecord.get("hm2"),kaijaingRes);
            constractHm((String) historyrecord.get("hm3"),kaijaingRes);
            constractHm((String) historyrecord.get("hm4"),kaijaingRes);
            constractHm((String) historyrecord.get("hm5"),kaijaingRes);
            constractHm((String) historyrecord.get("hm6"),kaijaingRes);
            constractHm((String) historyrecord.get("hm7"),kaijaingRes);
            Map obj = new HashMap();
            obj.put("qs",historyrecord.get("qs"));
            obj.put("years",historyrecord.get("years"));
            obj.put("kjdate",historyrecord.get("kjdate"));
            obj.put("hm",kaijaingRes);
            list.add(obj);
        });
        PageInfo<Map<String,Object>> pageInfo = new PageInfo<>(historyrecords);
        page.setTotal((int) pageInfo.getTotal());
        page.setRecords(list);
        return page;
    }

    private void constractHm(String hm,JSONArray kaijaingRes) {
        hm = hm.length() == 1 ? "0"+ hm : hm;
        Map<String,Object> hmDetails = referenceMapper.selectByHm(hm);
        kaijaingRes.add(hmDetails);
    }
}
