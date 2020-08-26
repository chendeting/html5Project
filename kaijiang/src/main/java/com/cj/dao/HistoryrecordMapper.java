package com.cj.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.cj.model.Historyrecord;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface HistoryrecordMapper extends BaseMapper<Historyrecord> {

    List<Map<String,Object>> selectPageByParam(@Param("map") Map map);
}
